import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ImageOff, RotateCw } from 'lucide-react';
import { CardSide, CharacterCard } from '../types/game';
import {
  CharacterGraphicBackdrop,
  getCharacterVisualTheme,
  getRarityFrameStyle,
  RaritySymbol,
} from './cardVisualThemes';

interface CharacterCardViewProps {
  card: CharacterCard;
  side: CardSide;
  onFlip?: () => void;
  size?: 'md' | 'lg';
}

function BlueLockPentagonMark({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <polygon
        points="8,1.2 14.5,5.9 12,13.6 4,13.6 1.5,5.9"
        stroke={color}
        strokeWidth="1.5"
        fill="#050811"
      />
      <polygon points="8,4.2 11.4,6.7 10.1,10.8 5.9,10.8 4.6,6.7" fill={color} fillOpacity="0.35" />
    </svg>
  );
}

function CornerBrackets({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      <span
        className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2"
        style={{ borderColor: color }}
      />
      <span
        className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2"
        style={{ borderColor: color }}
      />
    </div>
  );
}

export function CharacterCardView({
  card,
  side,
  onFlip,
  size = 'md',
}: CharacterCardViewProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImgFailed(false);
    setImgLoaded(false);
  }, [card.id, card.portrait]);

  const theme = getCharacterVisualTheme(card.id, card.position, card.rarity);
  const rarityFrame = getRarityFrameStyle(card.rarity);
  const isBack = side === 'back';
  const hasPortrait = Boolean(card.portrait) && !imgFailed;

  const dimensions =
    size === 'lg'
      ? 'w-[274px] sm:w-[300px] h-[412px] sm:h-[444px]'
      : 'w-[240px] sm:w-[258px] h-[360px] sm:h-[386px]';

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-py * 7).toFixed(2)),
      ry: Number((px * 7).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const miniStats = [
    { code: 'MND', val: card.attributes.mind },
    { code: 'SPD', val: card.attributes.speed },
    { code: 'STR', val: card.attributes.strength },
    { code: 'DRB', val: card.attributes.dribbling },
    { code: 'KCK', val: card.attributes.kick },
  ];

  const backStatRows = [
    { label: 'MIND', value: card.attributes.mind },
    { label: 'SPEED', value: card.attributes.speed },
    { label: 'STRENGTH', value: card.attributes.strength },
    { label: 'DRIBBLING', value: card.attributes.dribbling },
    { label: 'KICK', value: card.attributes.kick },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-perspective ${dimensions} select-none`}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <div
          role={onFlip ? 'button' : undefined}
          tabIndex={onFlip ? 0 : undefined}
          aria-label={
            onFlip
              ? `${card.name}, showing ${isBack ? 'back statistics' : 'front profile'}. Press to flip card.`
              : undefined
          }
          onClick={onFlip}
          onKeyDown={(e) => {
            if (onFlip && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onFlip();
            }
          }}
          className={`relative w-full h-full card-preserve-3d transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isBack ? 'card-rotate-y-180' : ''
          } ${onFlip ? 'cursor-pointer' : ''}`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className={`card-backface-hidden absolute inset-0 rounded-xl bg-[#070A12] border ${rarityFrame.outerBorder} ${rarityFrame.outerGlow} overflow-hidden flex flex-col`}
          >
            {/* Animated Epic / Mythic edge aura overlay */}
            {rarityFrame.isAnimated && (
              <div
                aria-hidden="true"
                className="animate-rarity-aura pointer-events-none absolute inset-0 z-10 rounded-xl border"
                style={{
                  borderColor: theme.secondaryHex,
                  boxShadow: `inset 0 0 18px ${theme.primaryHex}40`,
                }}
              />
            )}

            {/* Mythic cinematic light sweep */}
            {rarityFrame.isMythic && (
              <div
                aria-hidden="true"
                className="animate-mythic-sweep pointer-events-none absolute inset-y-0 w-20 z-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            )}

            <CornerBrackets color={rarityFrame.cornerColor} />

            {/* Top Rarity Energy Hairline */}
            <div className={`h-[3px] w-full ${rarityFrame.topAccentBar} shrink-0 z-20`} />

            {/* TOP BAR: Number · Blue Lock ID · Rarity Symbol */}
            <div className="relative z-20 px-3 py-2 bg-[#090D17]/95 border-b border-white/[0.08] flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="font-mono tabular-nums text-xs font-bold px-1.5 py-0.5 bg-[#0E172A] border border-white/15 text-[#F8FAFC]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0 100%)' }}
                >
                  #{card.number}
                </span>
                <BlueLockPentagonMark color={theme.secondaryHex} />
                <span className="font-[family-name:var(--font-condensed)] text-[11px] font-bold tracking-[0.14em] text-[#E2E8F0] uppercase truncate">
                  {card.universe}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <RaritySymbol rarity={card.rarity} />
                <span
                  className={`font-[family-name:var(--font-condensed)] text-[11px] font-bold tracking-[0.1em] uppercase ${rarityFrame.badgeText}`}
                >
                  {rarityFrame.label}
                </span>
              </div>
            </div>

            {/* CENTER (~68–72%): Portrait + Character Aura + Angular Graphics + Bold Name */}
            <div className="relative flex-1 overflow-hidden bg-[#06080F]">
              <CharacterGraphicBackdrop theme={theme} />

              {hasPortrait ? (
                <img
                  src={card.portrait!}
                  alt={`${card.name} — Blue Lock`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgFailed(true)}
                  className={`relative z-10 w-full h-full object-cover object-top transition-opacity duration-300 ${
                    imgLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  draggable={false}
                />
              ) : (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 text-center">
                  <div className="w-11 h-11 rounded bg-[#0E1422] border border-white/15 flex items-center justify-center text-[#94A3B8] mb-2.5">
                    <ImageOff className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="text-xs font-semibold text-[#CBD5E1]">
                    Portrait Asset Unavailable
                  </div>
                  <div className="mt-1 text-[10.5px] text-[#64748B] break-all font-mono">
                    {card.assetPath}
                  </div>
                </div>
              )}

              {/* Subtle diagonal anime slash line across lower frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-10 bg-gradient-to-t from-[#060911] via-[#060911]/82 to-transparent"
              />

              {onFlip && (
                <span className="absolute top-2 right-2.5 z-20 inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#060911]/85 border border-white/15 text-[10px] font-medium text-[#CBD5E1]">
                  <RotateCw className="w-2.5 h-2.5" aria-hidden="true" />
                  Flip
                </span>
              )}

              {/* Bold Condensed Character Name Anchored at Base of Center Art */}
              <div className="absolute inset-x-0 bottom-0 z-20 px-3.5 pb-2">
                <div
                  className="h-[2px] w-10 mb-1"
                  style={{ backgroundColor: theme.secondaryHex }}
                  aria-hidden="true"
                />
                <h3 className="font-[family-name:var(--font-condensed)] text-[25px] sm:text-[27px] font-extrabold italic uppercase tracking-[0.03em] text-[#F8FAFC] leading-none truncate drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {card.name}
                </h3>
              </div>
            </div>

            {/* BOTTOM: Position · Overall Power Rating · Compact Attribute Indicators */}
            <div className="relative z-20 bg-[#080C16] border-t border-white/10 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
              {/* Position & OVR Power */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div
                  className="px-2 py-1 bg-[#0F1A31] border border-[#2563EB]/45 text-center"
                  style={{ clipPath: 'polygon(6% 0, 100% 0, 94% 100%, 0 100%)' }}
                >
                  <div className="text-[8.5px] font-mono text-[#94A3B8] leading-none">
                    POS
                  </div>
                  <div className="font-[family-name:var(--font-condensed)] text-xs font-bold text-[#F8FAFC] tracking-wide leading-tight mt-0.5">
                    {card.position}
                  </div>
                </div>

                <div className="leading-none">
                  <div className="text-[8.5px] font-mono text-[#94A3B8] uppercase">
                    Power
                  </div>
                  <div
                    className={`font-[family-name:var(--font-condensed)] text-[26px] font-extrabold italic leading-none tabular-nums ${theme.accentTextClass}`}
                  >
                    {card.power}
                  </div>
                </div>
              </div>

              {/* Small 5-Attribute Strip */}
              <div className="grid grid-cols-5 gap-1.5 text-center border-l border-white/[0.08] pl-2.5">
                {miniStats.map((st) => (
                  <div key={st.code} className="leading-none">
                    <div className="text-[8px] font-mono text-[#64748B]">{st.code}</div>
                    <div className="font-mono tabular-nums text-[11px] font-bold text-[#E2E8F0] mt-0.5">
                      {st.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div
            className={`card-backface-hidden card-rotate-y-180 absolute inset-0 rounded-xl bg-[#070A12] border ${rarityFrame.outerBorder} ${rarityFrame.outerGlow} overflow-hidden flex flex-col justify-between`}
          >
            <CharacterGraphicBackdrop theme={theme} />
            <CornerBrackets color={rarityFrame.cornerColor} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className={`h-[3px] w-full ${rarityFrame.topAccentBar} shrink-0`} />

                {/* Card Back Header */}
                <div className="px-3.5 pt-2.5 pb-2 bg-[#090D18]/90 border-b border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#94A3B8]">
                      <span>#{card.number}</span>
                      <span aria-hidden="true">/</span>
                      <span>{card.position}</span>
                      <span aria-hidden="true">/</span>
                      <span className={rarityFrame.badgeText}>{rarityFrame.label}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-condensed)] text-xl font-extrabold italic uppercase tracking-[0.03em] text-[#F8FAFC] leading-tight truncate mt-0.5">
                      {card.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0 pl-2 border-l border-white/10">
                    <div className="text-[9px] font-mono text-[#94A3B8] uppercase leading-none">
                      Power
                    </div>
                    <div
                      className={`font-[family-name:var(--font-condensed)] text-2xl font-extrabold italic tabular-nums leading-none mt-0.5 ${theme.accentTextClass}`}
                    >
                      {card.power}
                    </div>
                  </div>
                </div>

                {/* Futuristic Angular Stat Bars */}
                <div className="px-3.5 py-2.5 space-y-1.5">
                  {backStatRows.map((stat) => (
                    <div key={stat.label} className="space-y-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-semibold tracking-wider text-[#CBD5E1]">
                          {stat.label}
                        </span>
                        <span className="font-mono tabular-nums font-bold text-[#F8FAFC]">
                          {stat.value}
                        </span>
                      </div>
                      <div
                        className="h-1.5 w-full bg-[#0E1422] overflow-hidden"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 98.5% 100%, 0 100%)' }}
                      >
                        <div
                          className={`h-full ${theme.statBarColor}`}
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Weapon, Special Ability & Description */}
              <div className="px-3.5 pb-3 pt-2 bg-[#080C15]/95 border-t border-white/10 space-y-1.5">
                <div>
                  <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#64748B]">
                    Signature Weapon
                  </div>
                  <div
                    className={`font-[family-name:var(--font-condensed)] text-[13px] font-bold tracking-wide uppercase truncate ${theme.accentTextClass}`}
                  >
                    {card.signatureWeapon}
                  </div>
                </div>

                <div className="pt-1 border-t border-white/[0.06]">
                  <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#93C5FD]">
                    Special Ability
                  </div>
                  <p className="text-[11px] leading-snug text-[#E2E8F0] line-clamp-2">
                    {card.specialAbility}
                  </p>
                </div>

                <p className="text-[10.5px] leading-snug text-[#94A3B8] pt-1 border-t border-white/[0.06] line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
