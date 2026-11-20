import { BLUE_LOCK_ASSET_REGISTRY, CharacterAssetEntry } from './registry';

const CACHE_KEY = 'nexora_bluelock_portraits_v1';

export type PortraitMap = Record<string, string | null>;

interface ExternalCharacterRecord {
  name: string;
  nativeName?: string | null;
  alternativeNames?: string[];
  imageUrl: string | null;
}

function normalizeName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u3000\s·•・.,'’"-]/g, '')
    .trim();
}

function isPlaceholderImage(url: string | null | undefined): boolean {
  if (!url) return true;
  const lower = url.toLowerCase();
  return (
    lower.includes('default.jpg') ||
    lower.includes('questionmark') ||
    lower.includes('/qm_') ||
    lower.includes('apple-touch-icon')
  );
}

function buildLookupIndex(entries: CharacterAssetEntry[]): Map<string, string> {
  const index = new Map<string, string>();
  for (const entry of entries) {
    index.set(normalizeName(entry.name), entry.id);
    if (entry.nativeName) {
      index.set(normalizeName(entry.nativeName), entry.id);
    }
    for (const alias of entry.aliases) {
      index.set(normalizeName(alias), entry.id);
    }
  }
  return index;
}

async function fetchAniListCharacters(): Promise<ExternalCharacterRecord[]> {
  const query = `
    query BlueLockCharacters {
      s1p1: Media(idMal: 49596, type: ANIME) {
        characters(page: 1, perPage: 25, sort: [ROLE, ID]) {
          nodes { name { full native alternative } image { large medium } }
        }
      }
      s1p2: Media(idMal: 49596, type: ANIME) {
        characters(page: 2, perPage: 25, sort: [ROLE, ID]) {
          nodes { name { full native alternative } image { large medium } }
        }
      }
      s2p1: Media(idMal: 54865, type: ANIME) {
        characters(page: 1, perPage: 25, sort: [ROLE, ID]) {
          nodes { name { full native alternative } image { large medium } }
        }
      }
      s2p2: Media(idMal: 54865, type: ANIME) {
        characters(page: 2, perPage: 25, sort: [ROLE, ID]) {
          nodes { name { full native alternative } image { large medium } }
        }
      }
      mp1: Media(idMal: 114745, type: MANGA) {
        characters(page: 1, perPage: 25, sort: [ROLE, ID]) {
          nodes { name { full native alternative } image { large medium } }
        }
      }
      mp2: Media(idMal: 114745, type: MANGA) {
        characters(page: 2, perPage: 25, sort: [ROLE, ID]) {
          nodes { name { full native alternative } image { large medium } }
        }
      }
      mp3: Media(idMal: 114745, type: MANGA) {
        characters(page: 3, perPage: 25, sort: [ROLE, ID]) {
          nodes { name { full native alternative } image { large medium } }
        }
      }
    }
  `;

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 7000);
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });
    window.clearTimeout(timeout);

    if (!res.ok) return [];
    const payload = await res.json();
    const data = payload?.data;
    if (!data) return [];

    const records: ExternalCharacterRecord[] = [];
    const buckets = [
      data.s1p1,
      data.s1p2,
      data.s2p1,
      data.s2p2,
      data.mp1,
      data.mp2,
      data.mp3,
    ];

    for (const bucket of buckets) {
      const nodes = bucket?.characters?.nodes;
      if (!Array.isArray(nodes)) continue;
      for (const node of nodes) {
        const img = node?.image?.large || node?.image?.medium || null;
        if (isPlaceholderImage(img)) continue;
        records.push({
          name: node?.name?.full || '',
          nativeName: node?.name?.native || null,
          alternativeNames: Array.isArray(node?.name?.alternative)
            ? node.name.alternative
            : [],
          imageUrl: img,
        });
      }
    }
    return records;
  } catch {
    return [];
  }
}

async function fetchJikanMediaCharacters(
  endpoint: string,
): Promise<ExternalCharacterRecord[]> {
  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6500);
    const res = await fetch(endpoint, { signal: controller.signal });
    window.clearTimeout(timeout);
    if (!res.ok) return [];
    const payload = await res.json();
    const items = payload?.data;
    if (!Array.isArray(items)) return [];

    const records: ExternalCharacterRecord[] = [];
    for (const item of items) {
      const char = item?.character;
      const img =
        char?.images?.webp?.image_url || char?.images?.jpg?.image_url || null;
      if (isPlaceholderImage(img)) continue;
      records.push({
        name: char?.name || '',
        imageUrl: img,
      });
    }
    return records;
  } catch {
    return [];
  }
}

function matchExternalRecords(
  records: ExternalCharacterRecord[],
  lookupIndex: Map<string, string>,
  resolved: PortraitMap,
  usedUrls: Set<string>,
) {
  for (const record of records) {
    if (!record.imageUrl || usedUrls.has(record.imageUrl)) continue;

    const candidates = [
      record.name,
      record.nativeName || '',
      ...(record.alternativeNames || []),
    ].filter(Boolean);

    let matchedId: string | undefined;
    for (const candidate of candidates) {
      // Handle "Last, First" formatting from MyAnimeList
      const normalizedDirect = normalizeName(candidate);
      if (lookupIndex.has(normalizedDirect)) {
        matchedId = lookupIndex.get(normalizedDirect);
        break;
      }
      if (candidate.includes(',')) {
        const parts = candidate.split(',').map((p) => p.trim());
        if (parts.length === 2) {
          const flipped = normalizeName(`${parts[1]} ${parts[0]}`);
          if (lookupIndex.has(flipped)) {
            matchedId = lookupIndex.get(flipped);
            break;
          }
        }
      }
    }

    if (matchedId && !resolved[matchedId]) {
      resolved[matchedId] = record.imageUrl;
      usedUrls.add(record.imageUrl);
    }
  }
}

export function getCachedPortraits(): PortraitMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as PortraitMap;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

async function fetchLocalManifest(): Promise<Record<string, string>> {
  try {
    const res = await fetch('/characters/manifest.json');
    if (!res.ok) return {};
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return {};
    const data = (await res.json()) as Record<string, string>;
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

export async function resolveBlueLockPortraits(): Promise<PortraitMap> {
  const entries = Object.values(BLUE_LOCK_ASSET_REGISTRY);
  const lookupIndex = buildLookupIndex(entries);

  const cached = getCachedPortraits();
  const resolved: PortraitMap = {};
  const usedUrls = new Set<string>();

  const localManifest = await fetchLocalManifest();
  for (const entry of entries) {
    const localUrl = localManifest[entry.id];
    if (localUrl && !usedUrls.has(localUrl)) {
      resolved[entry.id] = localUrl;
      usedUrls.add(localUrl);
      continue;
    }

    const cachedUrl = cached[entry.id];
    if (cachedUrl && !usedUrls.has(cachedUrl)) {
      resolved[entry.id] = cachedUrl;
      usedUrls.add(cachedUrl);
    } else {
      resolved[entry.id] = null;
    }
  }

  const missingBeforeFetch = entries.filter((e) => !resolved[e.id]);
  if (missingBeforeFetch.length === 0) {
    return resolved;
  }

  // 1. Primary official anime/manga portrait query via AniList GraphQL
  const aniListRecords = await fetchAniListCharacters();
  matchExternalRecords(aniListRecords, lookupIndex, resolved, usedUrls);

  // 2. Supplement any remaining characters via Jikan (MyAnimeList)
  const stillMissing = entries.filter((e) => !resolved[e.id]);
  if (stillMissing.length > 0) {
    const [jikanS1, jikanS2, jikanManga] = await Promise.all([
      fetchJikanMediaCharacters('https://api.jikan.moe/v4/anime/49596/characters'),
      fetchJikanMediaCharacters('https://api.jikan.moe/v4/anime/54865/characters'),
      fetchJikanMediaCharacters('https://api.jikan.moe/v4/manga/114745/characters'),
    ]);
    matchExternalRecords(
      [...jikanS1, ...jikanS2, ...jikanManga],
      lookupIndex,
      resolved,
      usedUrls,
    );
  }

  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(resolved));
    } catch {
      // Ignore storage quota errors
    }
  }

  return resolved;
}
