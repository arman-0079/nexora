import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { CharacterCard, GamePhase, PlayerId, PlayerSlots, SlotIndex } from '../types/game';
import {
  CharacterGraphicBackdrop,
  getCharacterVisualTheme,
  getRarityFrameStyle,
  RaritySymbol,
} from './cardVisualThemes';
import { AnimatedNumber } from './AnimatedNumber';

interface PlayerAreaProps {
  playerId: PlayerId;
  slots: PlayerSlots;
  totalPower: number;
  isActiveTurn: boolean;
  phase: GamePhase;
  winner: PlayerId | 'DRAW' | null;
  onSelectSlot: (playerId: PlayerId, slotIndex: SlotIndex) => void;
  onInspectCard: (card: CharacterCard) => void;
  onViewAllCards: (playerId: PlayerId) => void;
}

function ChamberBrackets({ color }: { color: string }) {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span
        className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l transition-opacity duration-200"
        style={{ borderColor: color }}
      />
      <span
        className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r transition-opacity duration-200"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l transition-opacity duration-200"
        style={{ borderColor: color }}
      />
      <span
        className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r transition-opacity duration-200"
        style={{ borderColor: color }}
      />
    </span>
  );
}

function PlacedSlotCard({
  card,
  slotIndex,
  onInspect,
}: {
  card: CharacterCard;
  slotIndex: SlotIndex;
  onInspect: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [card.id, card.portrait]);

  const theme = getCharacterVisualTheme(card.id, card.position, card.rarity);
  const rarityFrame = getRarityFrameStyle(card.rarity);
  const hasPortrait = Boolean(card.portrait) && !imgFailed;

  return (
    <button
      type="button"
      onClick={onInspect}
      aria-label={`Inspect ${card.name} in Slot ${slotIndex + 1}, Power ${card.power}`}
      className={`animate-slot-lock group relative w-full h-full rounded-lg bg-[#070A12] border ${rarityFrame.outerBorder} ${rarityFrame.outerGlow} overflow-hidden text-left transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 cursor-pointer`}
    >
      <div className={`absolute top-0 inset-x-0 h-[2px] z-20 ${rarityFrame.topAccentBar}`} />

      <CharacterGraphicBackdrop theme={theme} />

      {hasPortrait ? (
        <img
          src={card.portrait!}
          alt={`${card.name} — Blue Lock`}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="relative z-10 w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.04]"
          draggable={false}
        />
      ) : (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-2 pb-8 text-[#64748B] text-center">
          <ImageOff className="w-4 h-4 mb-1" aria-hidden="true" />
          <span className="text-[10px] font-medium leading-tight">Missing Asset</span>
        </div>
      )}

      {/* Top mini metadata: #Number & Power */}
      <div className="absolute top-1.5 inset-x-1.5 z-20 flex items-center justify-between gap-1">
        <span className="px-1 py-0.5 bg-[#060911]/88 border border-white/15 font-mono tabular-nums text-[9px] font-bold text-[#E2E8F0]">
          #{card.number}
        </span>
        <div className="px-1.5 py-0.5 bg-[#060911]/90 border border-white/15 flex items-center gap-1">
          <RaritySymbol rarity={card.rarity} />
          <span
            className={`font-[family-name:var(--font-condensed)] text-sm font-extrabold italic tabular-nums leading-none ${theme.accentTextClass}`}
          >
            {card.power}
          </span>
        </div>
      </div>

      {/* Bottom condensed identity scrim */}
      <div className="absolute inset-x-0 bottom-0 z-20 pt-8 pb-1.5 px-2 bg-gradient-to-t from-[#05070D] via-[#05070D]/90 to-transparent">
        <div className="font-[family-name:var(--font-condensed)] text-[14px] sm:text-[15px] font-extrabold italic uppercase tracking-[0.02em] text-[#F8FAFC] leading-none truncate">
          {card.name}
        </div>
        <div className="flex items-center justify-between gap-1 mt-1 text-[9.5px] font-mono text-[#94A3B8]">
          <span className="truncate">{card.position}</span>
          <span className={`shrink-0 ${rarityFrame.badgeText}`}>{rarityFrame.label}</span>
        </div>
      </div>
    </button>
  );
}

export function PlayerArea({
  playerId,
  slots,
  totalPower,
  isActiveTurn,
  phase,
  winner,
  onSelectSlot,
  onInspectCard,
  onViewAllCards,
}: PlayerAreaProps) {
  const placedCount = slots.filter(Boolean).length;
  const canPlaceHere = isActiveTurn && phase === 'INSPECT_AND_PLACE';

  const isWinner = winner === playerId;
  const isDraw = winner === 'DRAW';
  const isPlayerOne = playerId === 1;

  // Player One: Electric Blue identity | Player Two: Subtle Violet-Blue identity
  const primaryAccentHex = isPlayerOne ? '#3B82F6' : '#8B5CF6';
  const brightTextClass = isPlayerOne ? 'text-[#60A5FA]' : 'text-[#A78BFA]';
  const topEdgeBar = isPlayerOne
    ? 'bg-gradient-to-r from-[#1D4ED8] via-[#38BDF8] to-transparent'
    : 'bg-gradient-to-r from-[#6D28D9] via-[#818CF8] to-transparent';
  const activeFrameClass = isPlayerOne
    ? 'border-[#2563EB]/75 shadow-[0_0_32px_rgba(37,99,235,0.22),inset_0_1px_0_rgba(96,165,250,0.22)]'
    : 'border-[#7C3AED]/75 shadow-[0_0_32px_rgba(124,58,237,0.22),inset_0_1px_0_rgba(167,139,250,0.22)]';
  const idleFrameClass = isPlayerOne
    ? 'border-[#1E3A5F]/45 shadow-[0_14px_34px_rgba(0,0,0,0.55)]'
    : 'border-[#3B2F6B]/45 shadow-[0_14px_34px_rgba(0,0,0,0.55)]';
  const chamberReadyClass = isPlayerOne
    ? 'border-[#2563EB]/80 bg-[#0A162B]/80 hover:border-[#38BDF8] hover:bg-[#0F203D] hover:shadow-[0_0_18px_rgba(37,99,235,0.35),inset_0_0_14px_rgba(56,189,248,0.18)] hover:-translate-y-0.5 cursor-pointer text-[#E2E8F0]'
    : 'border-[#7C3AED]/80 bg-[#150E2B]/80 hover:border-[#A78BFA] hover:bg-[#1E153D] hover:shadow-[0_0_18px_rgba(124,58,237,0.35),inset_0_0_14px_rgba(167,139,250,0.18)] hover:-translate-y-0.5 cursor-pointer text-[#E2E8F0]';
  const chamberIdleClass = isPlayerOne
    ? 'border-[#1E3A5F]/45 bg-[#070B14]/85 text-[#475569] shadow-[inset_0_0_16px_rgba(15,29,56,0.45)] cursor-default'
    : 'border-[#312659]/45 bg-[#090814]/85 text-[#475569] shadow-[inset_0_0_16px_rgba(35,23,66,0.45)] cursor-default';

  let statusLabel = 'STANDBY';
  let statusColor = 'text-[#64748B]';
  if (phase === 'MATCH_COMPLETE') {
    if (isWinner) {
      statusLabel = 'VICTORY';
      statusColor = brightTextClass;
    } else if (isDraw) {
      statusLabel = 'TIED MATCH';
      statusColor = 'text-[#CBD5E1]';
    } else {
      statusLabel = 'FINAL ROSTER';
      statusColor = 'text-[#64748B]';
    }
  } else if (isActiveTurn) {
    statusLabel = phase === 'INSPECT_AND_PLACE' ? 'LOCKING SLOT' : 'ACTIVE TURN';
    statusColor = brightTextClass;
  }

  const renderSlot = (slotIdx: SlotIndex) => {
    const card = slots[slotIdx];
    const slotNumber = slotIdx + 1;
    const formattedNum = `0${slotNumber}`;

    return (
      <div
        key={slotIdx}
        className="w-[102px] sm:w-[118px] xl:w-[126px] aspect-[3/4] shrink-0"
      >
        {card ? (
          <PlacedSlotCard
            card={card}
            slotIndex={slotIdx}
            onInspect={() => onInspectCard(card)}
          />
        ) : (
          <button
            type="button"
            disabled={!canPlaceHere}
            onClick={() => canPlaceHere && onSelectSlot(playerId, slotIdx)}
            aria-label={
              canPlaceHere
                ? `Place drawn card in Player ${playerId} Slot ${slotNumber}`
                : `Player ${playerId} Slot ${slotNumber} empty`
            }
            className={`group relative w-full h-full min-h-[44px] rounded-lg border flex flex-col items-center justify-center gap-1.5 px-2 overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              canPlaceHere ? chamberReadyClass : chamberIdleClass
            }`}
          >
            <ChamberBrackets
              color={canPlaceHere ? primaryAccentHex : 'rgba(148,163,184,0.28)'}
            />

            {/* Subtle angular chamber hex emblem */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`transition-opacity duration-200 ${
                canPlaceHere ? 'opacity-80' : 'opacity-25'
              }`}
            >
              <polygon
                points="12,2 20,7.5 17,19 7,19 4,7.5"
                stroke={primaryAccentHex}
                strokeWidth="1.2"
              />
            </svg>

            <span className="font-mono tabular-nums text-[11px] font-semibold tracking-wider">
              SLOT {formattedNum}
            </span>
            <span
              className={`font-[family-name:var(--font-condensed)] text-[11px] font-bold tracking-[0.12em] uppercase ${
                canPlaceHere ? brightTextClass : 'text-[#475569]'
              }`}
            >
              {canPlaceHere ? 'LOCK IN' : 'OPEN'}
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <section
      aria-label={`Player ${playerId} Board`}
      className={`relative rounded-xl bg-[#0B0F19]/92 backdrop-blur-sm border overflow-hidden p-4 sm:p-5 transition-all duration-250 flex flex-col justify-between ${
        isWinner || (isActiveTurn && phase !== 'MATCH_COMPLETE')
          ? activeFrameClass
          : idleFrameClass
      }`}
    >
      {/* Top Illuminated Angular Accent Edge */}
      <div className={`absolute top-0 inset-x-0 h-[2px] ${topEdgeBar}`} aria-hidden="true" />
      <ChamberBrackets
        color={
          isActiveTurn || isWinner ? primaryAccentHex : 'rgba(148, 163, 184, 0.22)'
        }
      />

      {/* Player Header & Animated Score */}
      <div className="relative z-10 flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-5 shrink-0"
              style={{ backgroundColor: primaryAccentHex }}
              aria-hidden="true"
            />
            <h2 className="font-[family-name:var(--font-condensed)] text-2xl sm:text-[26px] font-extrabold italic uppercase tracking-[0.04em] text-[#F8FAFC] leading-none whitespace-nowrap">
              Player {isPlayerOne ? 'One' : 'Two'}
            </h2>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] font-mono">
            <span className={`font-semibold tracking-wider ${statusColor}`}>
              {statusLabel}
            </span>
            <span className="text-[#475569]" aria-hidden="true">
              /
            </span>
            <span className="tabular-nums text-[#94A3B8]">{placedCount}/5 DRAFTED</span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] font-mono tracking-wider uppercase text-[#94A3B8]">
            Total Power
          </div>
          <div
            className={`font-[family-name:var(--font-condensed)] text-3xl sm:text-4xl font-extrabold italic tabular-nums leading-none mt-0.5 ${
              totalPower > 0 ? brightTextClass : 'text-[#F8FAFC]'
            }`}
          >
            <AnimatedNumber value={totalPower} />
          </div>
        </div>
      </div>

      {/* Balanced 2 + 3 Formation of Five Character Selection Chambers */}
      <div className="relative z-10 py-5 flex flex-col items-center justify-center gap-3 sm:gap-3.5 flex-1">
        <div className="flex items-center justify-center gap-3 sm:gap-3.5">
          {renderSlot(0)}
          {renderSlot(1)}
        </div>
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap sm:flex-nowrap">
          {renderSlot(2)}
          {renderSlot(3)}
          {renderSlot(4)}
        </div>
      </div>

      {/* Bottom Helper & Show All Cards Action */}
      <div className="relative z-10 pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2 text-[11px] text-[#64748B]">
        <span>
          {placedCount > 0 ? 'Click any card to inspect' : 'Selection chambers ready'}
        </span>
        {placedCount > 0 ? (
          <button
            type="button"
            onClick={() => onViewAllCards(playerId)}
            className={`min-h-[34px] px-3 py-1 rounded border text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
              isPlayerOne
                ? 'bg-[#0C1930] hover:bg-[#132647] border-[#2563EB]/60 text-[#BFDBFE]'
                : 'bg-[#171130] hover:bg-[#221947] border-[#7C3AED]/60 text-[#DDD6FE]'
            }`}
          >
            Show All Cards ({placedCount})
          </button>
        ) : (
          <span className="font-mono tabular-nums">
            {5 - placedCount} {5 - placedCount === 1 ? 'chamber' : 'chambers'} open
          </span>
        )}
      </div>
    </section>
  );
}
