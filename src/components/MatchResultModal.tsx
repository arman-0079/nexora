import { useEffect, useState } from 'react';
import { ImageOff, RotateCcw, Scale, Trophy, X } from 'lucide-react';
import { CharacterCard, MatchResult, PlayerSlots } from '../types/game';
import { getRarityFrameStyle } from './cardVisualThemes';
import { AnimatedNumber } from './AnimatedNumber';

interface MatchResultModalProps {
  isOpen: boolean;
  result: MatchResult | null;
  playerOneSlots: PlayerSlots;
  playerTwoSlots: PlayerSlots;
  onInspectCard: (card: CharacterCard) => void;
  onPlayAgain: () => void;
  onClose: () => void;
}

function SummaryThumbnail({ card }: { card: CharacterCard }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [card.id, card.portrait]);

  if (!card.portrait || failed) {
    return (
      <div
        aria-label="Portrait unavailable"
        className="w-9 h-11 rounded bg-[#070B14] border border-white/[0.08] flex items-center justify-center text-[#64748B] shrink-0"
      >
        <ImageOff className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={card.portrait}
      alt={`${card.name} — Blue Lock`}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-9 h-11 rounded object-cover object-top shrink-0 bg-[#070B14]"
    />
  );
}

export function MatchResultModal({
  isOpen,
  result,
  playerOneSlots,
  playerTwoSlots,
  onInspectCard,
  onPlayAgain,
  onClose,
}: MatchResultModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !result) return null;

  const isDraw = result.winner === 'DRAW';
  const headline = isDraw
    ? 'MATCH ENDED IN A DRAW'
    : `PLAYER ${result.winner === 1 ? 'ONE' : 'TWO'} VICTORY`;

  const totalCombined = Math.max(result.playerOnePower + result.playerTwoPower, 1);
  const p1Share = Math.round((result.playerOnePower / totalCombined) * 100);

  const renderTeamColumn = (
    playerNum: 1 | 2,
    title: string,
    slots: PlayerSlots,
    totalPower: number,
    isWinner: boolean,
  ) => {
    const isP1 = playerNum === 1;
    const borderClass = isWinner
      ? isP1
        ? 'border-[#2563EB]/80 shadow-[0_0_24px_rgba(37,99,235,0.2)]'
        : 'border-[#7C3AED]/80 shadow-[0_0_24px_rgba(124,58,237,0.2)]'
      : 'border-white/[0.08]';
    const powerText = isP1 ? 'text-[#60A5FA]' : 'text-[#A78BFA]';

    return (
      <div className={`rounded-xl bg-[#0A0E18] border p-4 ${borderClass}`}>
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div>
            <h3 className="font-[family-name:var(--font-condensed)] text-xl font-extrabold italic uppercase tracking-[0.04em] text-[#F8FAFC]">
              {title}
            </h3>
            <span className="font-mono text-[11px] text-[#94A3B8]">
              {isWinner ? 'WINNING TEAM' : isDraw ? 'TIED TOTAL' : 'FINAL ROSTER'}
            </span>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase text-[#94A3B8]">
              Total Power
            </div>
            <div
              className={`font-[family-name:var(--font-condensed)] text-3xl font-extrabold italic tabular-nums leading-none mt-0.5 ${powerText}`}
            >
              <AnimatedNumber value={totalPower} durationMs={520} />
            </div>
          </div>
        </div>

        <ul className="mt-3 space-y-2">
          {slots.map((card, idx) => {
            if (!card) return null;
            const rarityStyle = getRarityFrameStyle(card.rarity);
            return (
              <li key={card.id}>
                <button
                  type="button"
                  onClick={() => onInspectCard(card)}
                  className="w-full min-h-[44px] flex items-center justify-between gap-3 p-2 rounded-lg bg-[#0E1422] hover:bg-[#151E32] border border-white/[0.06] transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <SummaryThumbnail card={card} />
                    <div className="min-w-0">
                      <div className="font-[family-name:var(--font-condensed)] text-base font-bold uppercase tracking-[0.02em] text-[#F8FAFC] leading-tight truncate">
                        {card.name}
                      </div>
                      <div className="text-[10.5px] font-mono text-[#94A3B8] truncate">
                        SLOT 0{idx + 1} <span aria-hidden="true">/</span> {card.position}{' '}
                        <span aria-hidden="true">/</span>{' '}
                        <span className={rarityStyle.badgeText}>{rarityStyle.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-[family-name:var(--font-condensed)] text-xl font-extrabold italic tabular-nums text-[#F8FAFC] shrink-0 pr-1">
                    {card.power}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Match Victory Summary"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#04060C]/86 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="animate-victory-enter relative w-full max-w-3xl rounded-2xl bg-[#0B0F1A] border border-[#2563EB]/45 shadow-[0_28px_72px_rgba(0,0,0,0.85),0_0_40px_rgba(37,99,235,0.18)] p-5 sm:p-7 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Illumination Edge */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#7C3AED]"
        />

        {/* Victory Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#0D1A33] border border-[#2563EB]/70 shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center text-[#38BDF8] shrink-0">
              {isDraw ? (
                <Scale className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Trophy className="w-6 h-6" aria-hidden="true" />
              )}
            </div>
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#60A5FA]">
                BLUE LOCK EGO ARENA · MATCH VERDICT
              </div>
              <h2 className="font-[family-name:var(--font-condensed)] text-2xl sm:text-3xl font-extrabold italic uppercase tracking-[0.03em] text-[#F8FAFC] leading-none mt-1">
                {headline}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close match summary"
            className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg bg-[#111625] hover:bg-[#192136] border border-white/10 text-[#CBD5E1] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Head-to-Head Power Comparison Bar */}
        <div className="mt-4 rounded-xl bg-[#080C15] border border-white/[0.07] p-3.5">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-[#60A5FA] font-semibold tabular-nums">
              P1 · <AnimatedNumber value={result.playerOnePower} durationMs={520} /> PWR
            </span>
            <span className="text-[#E2E8F0] font-semibold tabular-nums">
              {isDraw
                ? '0 POWER DIFFERENCE'
                : `+${result.powerDifference} POWER DIFFERENCE`}
            </span>
            <span className="text-[#A78BFA] font-semibold tabular-nums">
              P2 · <AnimatedNumber value={result.playerTwoPower} durationMs={520} /> PWR
            </span>
          </div>
          <div className="h-2 w-full rounded-sm bg-[#18122B] overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#38BDF8] transition-all duration-500"
              style={{ width: `${p1Share}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] transition-all duration-500"
              style={{ width: `${100 - p1Share}%` }}
            />
          </div>
        </div>

        {/* Both Final Teams (5 Characters Each) */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderTeamColumn(
            1,
            'Player One',
            playerOneSlots,
            result.playerOnePower,
            result.winner === 1,
          )}
          {renderTeamColumn(
            2,
            'Player Two',
            playerTwoSlots,
            result.playerTwoPower,
            result.winner === 2,
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#64748B]">
            Click any character above to flip and inspect both card sides.
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 rounded-lg bg-[#111625] hover:bg-[#192136] border border-white/10 text-xs sm:text-sm font-medium text-[#E2E8F0] transition-colors cursor-pointer whitespace-nowrap"
            >
              Inspect Board
            </button>
            <button
              type="button"
              onClick={onPlayAgain}
              className="min-h-[44px] px-6 py-2 rounded-lg bg-gradient-to-b from-[#111D35] to-[#080F1E] hover:from-[#162747] hover:to-[#0C172D] active:scale-[0.98] border border-[#2563EB] hover:border-[#38BDF8] shadow-[0_0_18px_rgba(37,99,235,0.3)] font-[family-name:var(--font-condensed)] text-base font-extrabold tracking-[0.14em] uppercase text-white inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              PLAY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
