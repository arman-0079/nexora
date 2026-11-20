import { Rarity } from '../types/game';

export type GraphicPattern =
  | 'spatial-grid'
  | 'icy-shards'
  | 'kinetic-waves'
  | 'minimal-frost'
  | 'crimson-slash'
  | 'speed-streaks'
  | 'imperial-gold'
  | 'precision-arcs'
  | 'wild-flare'
  | 'hex-shield'
  | 'world-apex';

export interface CharacterVisualTheme {
  pattern: GraphicPattern;
  primaryHex: string;
  secondaryHex: string;
  auraGradient: string;
  accentTextClass: string;
  statBarColor: string;
}

const SPECIFIC_THEMES: Record<string, CharacterVisualTheme> = {
  'yoichi-isagi': {
    pattern: 'spatial-grid',
    primaryHex: '#2563EB',
    secondaryHex: '#38BDF8',
    auraGradient:
      'radial-gradient(circle at 52% 42%, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.16) 45%, rgba(5, 8, 16, 0) 75%)',
    accentTextClass: 'text-[#60A5FA]',
    statBarColor: 'bg-gradient-to-r from-[#2563EB] to-[#38BDF8]',
  },
  'rin-itoshi': {
    pattern: 'icy-shards',
    primaryHex: '#0284C7',
    secondaryHex: '#67E8F9',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(14, 165, 233, 0.30) 0%, rgba(15, 61, 122, 0.22) 48%, rgba(5, 8, 16, 0) 78%)',
    accentTextClass: 'text-[#7DD3FC]',
    statBarColor: 'bg-gradient-to-r from-[#0369A1] to-[#67E8F9]',
  },
  'meguru-bachira': {
    pattern: 'kinetic-waves',
    primaryHex: '#EAB308',
    secondaryHex: '#3B82F6',
    auraGradient:
      'radial-gradient(circle at 48% 42%, rgba(234, 179, 8, 0.24) 0%, rgba(37, 99, 235, 0.18) 50%, rgba(5, 8, 16, 0) 78%)',
    accentTextClass: 'text-[#FACC15]',
    statBarColor: 'bg-gradient-to-r from-[#2563EB] to-[#FACC15]',
  },
  'seishiro-nagi': {
    pattern: 'minimal-frost',
    primaryHex: '#CBD5E1',
    secondaryHex: '#60A5FA',
    auraGradient:
      'radial-gradient(circle at 50% 38%, rgba(226, 232, 240, 0.22) 0%, rgba(96, 165, 250, 0.14) 48%, rgba(5, 8, 16, 0) 76%)',
    accentTextClass: 'text-[#E2E8F0]',
    statBarColor: 'bg-gradient-to-r from-[#64748B] to-[#E2E8F0]',
  },
  'shoei-barou': {
    pattern: 'crimson-slash',
    primaryHex: '#DC2626',
    secondaryHex: '#1E293B',
    auraGradient:
      'radial-gradient(circle at 50% 42%, rgba(220, 38, 38, 0.28) 0%, rgba(127, 29, 29, 0.18) 46%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#F87171]',
    statBarColor: 'bg-gradient-to-r from-[#991B1B] to-[#EF4444]',
  },
  'hyoma-chigiri': {
    pattern: 'speed-streaks',
    primaryHex: '#F43F5E',
    secondaryHex: '#FB7185',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(244, 63, 94, 0.28) 0%, rgba(190, 18, 60, 0.16) 46%, rgba(5, 7, 11, 0) 76%)',
    accentTextClass: 'text-[#FB7185]',
    statBarColor: 'bg-gradient-to-r from-[#E11D48] to-[#FDA4AF]',
  },
  'michael-kaiser': {
    pattern: 'imperial-gold',
    primaryHex: '#1D4ED8',
    secondaryHex: '#F59E0B',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(29, 78, 216, 0.30) 0%, rgba(245, 158, 11, 0.18) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#FBBF24]',
    statBarColor: 'bg-gradient-to-r from-[#1D4ED8] to-[#F59E0B]',
  },
  'sae-itoshi': {
    pattern: 'precision-arcs',
    primaryHex: '#BE123C',
    secondaryHex: '#38BDF8',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(190, 18, 60, 0.26) 0%, rgba(30, 64, 175, 0.22) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#FDA4AF]',
    statBarColor: 'bg-gradient-to-r from-[#1E40AF] to-[#FB7185]',
  },
  'ryusei-shidou': {
    pattern: 'wild-flare',
    primaryHex: '#C026D3',
    secondaryHex: '#3B82F6',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(192, 38, 211, 0.26) 0%, rgba(37, 99, 235, 0.20) 48%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#E879F9]',
    statBarColor: 'bg-gradient-to-r from-[#4F46E5] to-[#E879F9]',
  },
  'oliver-aiku': {
    pattern: 'hex-shield',
    primaryHex: '#10B981',
    secondaryHex: '#2563EB',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.22) 0%, rgba(30, 58, 138, 0.20) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#6EE7B7]',
    statBarColor: 'bg-gradient-to-r from-[#1D4ED8] to-[#10B981]',
  },
  'don-lorenzo': {
    pattern: 'crimson-slash',
    primaryHex: '#D97706',
    secondaryHex: '#4F46E5',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(217, 119, 6, 0.24) 0%, rgba(67, 56, 202, 0.18) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#FCD34D]',
    statBarColor: 'bg-gradient-to-r from-[#4338CA] to-[#F59E0B]',
  },
};

const ROLE_FALLBACK_THEMES: Record<string, CharacterVisualTheme> = {
  world: {
    pattern: 'world-apex',
    primaryHex: '#2563EB',
    secondaryHex: '#F59E0B',
    auraGradient:
      'radial-gradient(circle at 50% 40%, rgba(37, 99, 235, 0.28) 0%, rgba(245, 158, 11, 0.14) 52%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#FDE68A]',
    statBarColor: 'bg-gradient-to-r from-[#2563EB] to-[#F59E0B]',
  },
  defender: {
    pattern: 'hex-shield',
    primaryHex: '#1D4ED8',
    secondaryHex: '#64748B',
    auraGradient:
      'radial-gradient(circle at 50% 42%, rgba(29, 78, 216, 0.24) 0%, rgba(51, 65, 85, 0.18) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#93C5FD]',
    statBarColor: 'bg-gradient-to-r from-[#1E40AF] to-[#60A5FA]',
  },
  speedster: {
    pattern: 'speed-streaks',
    primaryHex: '#0EA5E9',
    secondaryHex: '#6366F1',
    auraGradient:
      'radial-gradient(circle at 50% 42%, rgba(14, 165, 233, 0.26) 0%, rgba(99, 102, 241, 0.16) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#38BDF8]',
    statBarColor: 'bg-gradient-to-r from-[#0284C7] to-[#818CF8]',
  },
  playmaker: {
    pattern: 'precision-arcs',
    primaryHex: '#3B82F6',
    secondaryHex: '#A78BFA',
    auraGradient:
      'radial-gradient(circle at 50% 42%, rgba(59, 130, 246, 0.24) 0%, rgba(139, 92, 246, 0.16) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#A5B4FC]',
    statBarColor: 'bg-gradient-to-r from-[#2563EB] to-[#A78BFA]',
  },
  striker: {
    pattern: 'icy-shards',
    primaryHex: '#1D4ED8',
    secondaryHex: '#38BDF8',
    auraGradient:
      'radial-gradient(circle at 50% 42%, rgba(29, 78, 216, 0.26) 0%, rgba(56, 189, 248, 0.15) 50%, rgba(5, 7, 11, 0) 78%)',
    accentTextClass: 'text-[#60A5FA]',
    statBarColor: 'bg-gradient-to-r from-[#1D4ED8] to-[#38BDF8]',
  },
};

export function getCharacterVisualTheme(
  id: string,
  position: string,
  rarity: Rarity,
): CharacterVisualTheme {
  if (SPECIFIC_THEMES[id]) {
    return SPECIFIC_THEMES[id];
  }
  if (rarity === 'Mythic') {
    return ROLE_FALLBACK_THEMES.world;
  }
  if (position.includes('CB') || position.includes('GK') || position.includes('CDM')) {
    return ROLE_FALLBACK_THEMES.defender;
  }
  if (position.includes('LW') || position.includes('RW') || position.includes('WB')) {
    return ROLE_FALLBACK_THEMES.speedster;
  }
  if (position.includes('CM') || position.includes('CAM') || position.includes('DIR')) {
    return ROLE_FALLBACK_THEMES.playmaker;
  }
  return ROLE_FALLBACK_THEMES.striker;
}

export interface RarityFrameStyle {
  label: string;
  outerBorder: string;
  outerGlow: string;
  topAccentBar: string;
  badgeText: string;
  cornerColor: string;
  isAnimated: boolean;
  isMythic: boolean;
}

export function getRarityFrameStyle(rarity: Rarity): RarityFrameStyle {
  switch (rarity) {
    case 'Mythic':
      return {
        label: 'MYTHIC',
        outerBorder: 'border-[#60A5FA]/80',
        outerGlow:
          'shadow-[0_0_28px_rgba(37,99,235,0.42),0_0_12px_rgba(245,158,11,0.28)]',
        topAccentBar: 'bg-gradient-to-r from-[#38BDF8] via-[#FBBF24] to-[#818CF8]',
        badgeText: 'text-[#FDE68A]',
        cornerColor: '#FBBF24',
        isAnimated: true,
        isMythic: true,
      };
    case 'Legendary':
      return {
        label: 'LEGENDARY',
        outerBorder: 'border-[#F59E0B]/75',
        outerGlow:
          'shadow-[0_0_22px_rgba(245,158,11,0.28),0_0_16px_rgba(37,99,235,0.32)]',
        topAccentBar: 'bg-gradient-to-r from-[#F59E0B] via-[#60A5FA] to-[#F59E0B]',
        badgeText: 'text-[#FCD34D]',
        cornerColor: '#F59E0B',
        isAnimated: false,
        isMythic: false,
      };
    case 'Epic':
      return {
        label: 'EPIC',
        outerBorder: 'border-[#818CF8]/75',
        outerGlow: 'shadow-[0_0_20px_rgba(99,102,241,0.35)]',
        topAccentBar: 'bg-gradient-to-r from-[#6366F1] via-[#38BDF8] to-[#818CF8]',
        badgeText: 'text-[#C4B5FD]',
        cornerColor: '#818CF8',
        isAnimated: true,
        isMythic: false,
      };
    case 'Rare':
      return {
        label: 'RARE',
        outerBorder: 'border-[#3B82F6]/70',
        outerGlow: 'shadow-[0_0_16px_rgba(37,99,235,0.28)]',
        topAccentBar: 'bg-gradient-to-r from-[#1D4ED8] to-[#38BDF8]',
        badgeText: 'text-[#93C5FD]',
        cornerColor: '#3B82F6',
        isAnimated: false,
        isMythic: false,
      };
    case 'Common':
    default:
      return {
        label: 'COMMON',
        outerBorder: 'border-white/18',
        outerGlow: 'shadow-[0_14px_30px_rgba(0,0,0,0.55)]',
        topAccentBar: 'bg-[#64748B]',
        badgeText: 'text-[#CBD5E1]',
        cornerColor: '#64748B',
        isAnimated: false,
        isMythic: false,
      };
  }
}

export function RaritySymbol({ rarity }: { rarity: Rarity }) {
  if (rarity === 'Mythic') {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2 12L3.5 5L6.5 8L8 3L9.5 8L12.5 5L14 12H2Z"
          fill="#FBBF24"
          stroke="#FDE68A"
          strokeWidth="1"
        />
      </svg>
    );
  }
  if (rarity === 'Legendary') {
    return (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <polygon
          points="8,1.5 10.2,5.8 14.8,6.5 11.4,9.8 12.2,14.5 8,12.2 3.8,14.5 4.6,9.8 1.2,6.5 5.8,5.8"
          fill="#F59E0B"
        />
      </svg>
    );
  }
  if (rarity === 'Epic') {
    return (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <polygon
          points="8,1.5 14,8 8,14.5 2,8"
          fill="#6366F1"
          stroke="#A5B4FC"
          strokeWidth="1.2"
        />
      </svg>
    );
  }
  if (rarity === 'Rare') {
    return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <polygon
          points="8,2 13.5,8 8,14 2.5,8"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="1.8"
        />
      </svg>
    );
  }
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="8" height="8" stroke="#94A3B8" strokeWidth="1.6" />
    </svg>
  );
}

export function CharacterGraphicBackdrop({
  theme,
}: {
  theme: CharacterVisualTheme;
}) {
  const p = theme.primaryHex;
  const s = theme.secondaryHex;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Character-specific ambient aura */}
      <div className="absolute inset-0" style={{ background: theme.auraGradient }} />

      {/* Sharp angular SVG graphic composition unique to character/role */}
      <svg
        viewBox="0 0 300 420"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-45"
        aria-hidden="true"
      >
        {theme.pattern === 'spatial-grid' && (
          <g stroke={s} strokeOpacity="0.45" fill="none">
            <path d="M0 90 L300 30 M0 170 L300 110 M0 270 L300 210" strokeWidth="0.7" />
            <path d="M55 0 L15 420 M150 0 L150 420 M245 0 L285 420" strokeWidth="0.6" />
            <polygon points="150,70 215,108 215,182 150,220 85,182 85,108" stroke={p} strokeWidth="1.2" />
            <circle cx="150" cy="145" r="46" stroke={s} strokeDasharray="5 4" strokeWidth="1" />
          </g>
        )}

        {theme.pattern === 'icy-shards' && (
          <g>
            <polygon points="0,40 125,0 45,140" fill={p} fillOpacity="0.18" />
            <polygon points="300,60 185,10 265,185" fill={s} fillOpacity="0.16" />
            <polygon points="20,260 110,190 45,320" fill={p} fillOpacity="0.16" />
            <line x1="0" y1="310" x2="300" y2="95" stroke={s} strokeOpacity="0.45" strokeWidth="1.2" />
            <line x1="40" y1="0" x2="260" y2="420" stroke={p} strokeOpacity="0.35" strokeWidth="0.9" />
          </g>
        )}

        {theme.pattern === 'kinetic-waves' && (
          <g fill="none">
            <path d="M-20 120 Q90 40 180 140 T320 90" stroke={p} strokeWidth="2.2" strokeOpacity="0.48" />
            <path d="M-20 180 Q110 95 200 195 T320 150" stroke={s} strokeWidth="1.6" strokeOpacity="0.45" />
            <path d="M-20 260 Q100 190 210 280 T320 230" stroke={p} strokeWidth="1.2" strokeOpacity="0.35" />
          </g>
        )}

        {theme.pattern === 'minimal-frost' && (
          <g fill="none" stroke={s} strokeOpacity="0.38">
            <polygon points="150,45 245,140 150,235 55,140" strokeWidth="1.1" />
            <polygon points="150,70 220,140 150,210 80,140" stroke={p} strokeWidth="0.8" />
            <line x1="0" y1="140" x2="300" y2="140" strokeOpacity="0.22" />
          </g>
        )}

        {theme.pattern === 'crimson-slash' && (
          <g>
            <polygon points="-20,240 320,65 320,92 -20,267" fill={p} fillOpacity="0.28" />
            <polygon points="-20,285 320,120 320,132 -20,297" fill={p} fillOpacity="0.22" />
            <line x1="25" y1="0" x2="245" y2="420" stroke={p} strokeOpacity="0.4" strokeWidth="1.5" />
          </g>
        )}

        {theme.pattern === 'speed-streaks' && (
          <g strokeLinecap="square">
            <line x1="-20" y1="130" x2="320" y2="55" stroke={p} strokeOpacity="0.55" strokeWidth="2.4" />
            <line x1="-20" y1="165" x2="320" y2="90" stroke={s} strokeOpacity="0.4" strokeWidth="1.4" />
            <line x1="-20" y1="215" x2="320" y2="140" stroke={p} strokeOpacity="0.45" strokeWidth="1.8" />
            <line x1="-20" y1="255" x2="320" y2="180" stroke={s} strokeOpacity="0.3" strokeWidth="1" />
          </g>
        )}

        {theme.pattern === 'imperial-gold' && (
          <g fill="none">
            <polygon points="150,35 260,115 220,255 80,255 40,115" stroke={s} strokeOpacity="0.48" strokeWidth="1.3" />
            <line x1="0" y1="80" x2="300" y2="240" stroke={p} strokeOpacity="0.45" strokeWidth="1.4" />
            <line x1="300" y1="80" x2="0" y2="240" stroke={s} strokeOpacity="0.32" strokeWidth="1" />
          </g>
        )}

        {theme.pattern === 'precision-arcs' && (
          <g fill="none">
            <circle cx="150" cy="145" r="95" stroke={p} strokeOpacity="0.4" strokeWidth="1.2" />
            <circle cx="150" cy="145" r="68" stroke={s} strokeOpacity="0.35" strokeDasharray="8 5" strokeWidth="1" />
            <line x1="0" y1="220" x2="300" y2="70" stroke={s} strokeOpacity="0.4" strokeWidth="1.1" />
          </g>
        )}

        {theme.pattern === 'wild-flare' && (
          <g>
            <polygon points="150,20 175,115 280,105 190,165 245,260 150,195 55,260 110,165 20,105 125,115" fill={p} fillOpacity="0.16" />
            <line x1="0" y1="290" x2="300" y2="40" stroke={s} strokeOpacity="0.42" strokeWidth="1.5" />
          </g>
        )}

        {theme.pattern === 'hex-shield' && (
          <g fill="none" stroke={p} strokeOpacity="0.42">
            <polygon points="150,40 230,85 230,185 150,230 70,185 70,85" strokeWidth="1.4" />
            <polygon points="150,62 210,96 210,174 150,208 90,174 90,96" stroke={s} strokeWidth="0.9" />
          </g>
        )}

        {theme.pattern === 'world-apex' && (
          <g fill="none">
            <polygon points="150,28 258,95 258,215 150,282 42,215 42,95" stroke={s} strokeOpacity="0.48" strokeWidth="1.2" />
            <line x1="0" y1="60" x2="300" y2="270" stroke={p} strokeOpacity="0.45" strokeWidth="1.5" />
            <line x1="300" y1="60" x2="0" y2="270" stroke={s} strokeOpacity="0.38" strokeWidth="1.2" />
          </g>
        )}
      </svg>
    </div>
  );
}
