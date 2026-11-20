import { RotateCw, Layers, Trophy, Scale } from 'lucide-react';
import {
  CardSide,
  CharacterCard,
  GamePhase,
  MatchResult,
  PlayerId,
  PlayerSlots,
  SlotIndex,
} from '../types/game';
import { CharacterCardView } from './CharacterCardView';
import { AnimatedNumber } from './AnimatedNumber';

interface CenterDeckZoneProps {
  phase: GamePhase;
  currentTurn: PlayerId;
  drawsCompleted: number;
  remainingDeckCount: number;
  drawnCard: CharacterCard | null;
  drawnCardSide: CardSide;
  activePlayerSlots: PlayerSlots;
  matchResult: MatchResult | null;
  onDrawCard: () => void;
  onFlipDrawnCard: () => void;
  onSelectSlot: (playerId: PlayerId, slotIndex: SlotIndex) => void;
  onOpenSummaryModal: () => void;
  onPlayAgain: () => void;
}

function DeckCardBack({ shuffling }: { shuffling: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      {/* Subtle Blue Holographic Rings behind Deck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          className="animate-holo-spin opacity-35"
        >
          <circle
            cx="140"
            cy="140"
            r="128"
            stroke="#2563EB"
            strokeWidth="1"
            strokeDasharray="12 10"
          />
          <circle
            cx="140"
            cy="140"
            r="114"
            stroke="#38BDF8"
            strokeOpacity="0.45"
            strokeWidth="0.8"
          />
        </svg>
        <svg
          width="230"
          height="230"
          viewBox="0 0 230 230"
          fill="none"
          className="absolute animate-holo-spin-reverse opacity-25"
        >
          <polygon
            points="115,10 215,82 177,198 53,198 15,82"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
        </svg>
      </div>

      {/* Volumetric Floor Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 w-56 h-12 rounded-full blur-md opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.42) 0%, rgba(37, 99, 235, 0) 75%)',
        }}
      />

      {/* Stacked Face-Down Deck */}
      <div
        className={`relative z-10 w-[192px] sm:w-[210px] h-[278px] sm:h-[304px] select-none ${
          shuffling ? 'animate-shuffle-card' : ''
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-xl bg-[#070A13] border border-[#1E3A5F]/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl bg-[#0A0F1D] border border-[#2563EB]/45"
        />

        <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#0E1526] to-[#070A13] border border-[#3B82F6]/70 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_24px_rgba(37,99,235,0.22)] flex flex-col items-center justify-center p-5 overflow-hidden">
          <div className="absolute inset-2.5 rounded-lg border border-white/[0.08] pointer-events-none" />
          <div className="absolute inset-4 rounded border border-[#38BDF8]/20 pointer-events-none" />

          {/* Blue Lock Pentagon Crest */}
          <svg
            width="76"
            height="76"
            viewBox="0 0 72 72"
            fill="none"
            aria-hidden="true"
            className="text-[#60A5FA]"
          >
            <polygon
              points="36,5 65,26 54,60 18,60 7,26"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="#060B16"
            />
            <polygon
              points="36,15 55,29 48,51 24,51 17,29"
              stroke="#38BDF8"
              strokeOpacity="0.55"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M27 44V26L45 44V26"
              stroke="#F8FAFC"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="mt-4 font-[family-name:var(--font-condensed)] text-sm font-extrabold tracking-[0.26em] text-[#E2E8F0] uppercase">
            NEXORA
          </span>
          <span className="mt-0.5 font-mono text-[9.5px] tracking-[0.2em] text-[#60A5FA] uppercase">
            BLUE LOCK
          </span>
        </div>
      </div>

      {/* Futuristic Chamfered Pedestal Base */}
      <div
        aria-hidden="true"
        className="relative z-0 -mt-1 w-56 sm:w-64 h-4 bg-gradient-to-b from-[#172542] to-[#0A0E19] border-t border-[#38BDF8]/65 shadow-[0_10px_24px_rgba(0,0,0,0.7)]"
        style={{ clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0 100%)' }}
      />
    </div>
  );
}

export function CenterDeckZone({
  phase,
  currentTurn,
  drawsCompleted,
  remainingDeckCount,
  drawnCard,
  drawnCardSide,
  activePlayerSlots,
  matchResult,
  onDrawCard,
  onFlipDrawnCard,
  onSelectSlot,
  onOpenSummaryModal,
  onPlayAgain,
}: CenterDeckZoneProps) {
  const playerLabel = currentTurn === 1 ? 'Player One' : 'Player Two';
  const canDraw =
    phase === 'AWAITING_DRAW' && drawsCompleted < 10 && remainingDeckCount > 0;

  let turnHeadline = `${playerLabel}'s Turn`;
  let statusText = `Draw ${Math.min(drawsCompleted + 1, 10)} of 10 · Ready to draw`;

  const nextSlotNum = activePlayerSlots.findIndex((s) => s === null) + 1;

  if (phase === 'SHUFFLING') {
    turnHeadline = 'Preparing Arena';
    statusText = 'Shuffling Blue Lock deck';
  } else if (phase === 'DRAWING_REVEAL') {
    turnHeadline = `${playerLabel}'s Turn`;
    statusText = `Revealing card · Auto-adding to Slot ${nextSlotNum}`;
  } else if (phase === 'INSPECT_AND_PLACE') {
    turnHeadline = `${playerLabel}'s Turn`;
    statusText = `Locking into ${playerLabel} Slot ${nextSlotNum}`;
  } else if (phase === 'MATCH_COMPLETE' && matchResult) {
    turnHeadline =
      matchResult.winner === 'DRAW'
        ? 'Match Drawn'
        : `Player ${matchResult.winner === 1 ? 'One' : 'Two'} Wins`;
    statusText = '10 of 10 cards drafted · Match complete';
  }

  return (
    <section
      aria-label="Shared Deck and Turn Controls"
      className="relative flex flex-col items-center justify-between rounded-xl bg-[#0A0E18]/92 backdrop-blur-sm border border-[#2563EB]/30 shadow-[0_16px_45px_rgba(0,0,0,0.65)] p-4 sm:p-5 min-h-[480px] overflow-hidden"
    >
      {/* Top Electric-Blue Accent Hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-80"
      />

      {/* Turn Indicator & Arena Status */}
      <div className="relative z-10 w-full text-center pb-3 border-b border-white/[0.08]">
        <div
          className={`text-[10.5px] font-mono uppercase tracking-[0.18em] font-semibold ${
            phase === 'MATCH_COMPLETE'
              ? 'text-[#38BDF8]'
              : currentTurn === 1
                ? 'text-[#60A5FA]'
                : 'text-[#A78BFA]'
          }`}
        >
          {phase === 'MATCH_COMPLETE' ? 'Final Verdict' : 'Active Turn'}
        </div>
        <h2 className="font-[family-name:var(--font-condensed)] text-2xl sm:text-[26px] font-extrabold italic uppercase tracking-[0.04em] text-[#F8FAFC] leading-none mt-1">
          {turnHeadline}
        </h2>
        <p className="text-xs text-[#94A3B8] mt-1">{statusText}</p>
      </div>

      {/* Main Center Stage */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-3">
        {(phase === 'AWAITING_DRAW' || phase === 'SHUFFLING') && (
          <div className="flex flex-col items-center gap-4 w-full">
            <DeckCardBack shuffling={phase === 'SHUFFLING'} />

            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
                <span className="font-mono tabular-nums">
                  {remainingDeckCount} cards in deck
                </span>
              </div>

              {/* Premium Metallic DRAW CARD CTA */}
              <button
                type="button"
                disabled={!canDraw}
                onClick={onDrawCard}
                className="min-h-[46px] px-8 py-2.5 rounded-lg bg-gradient-to-b from-[#111D35] to-[#080F1E] hover:from-[#162747] hover:to-[#0C172D] active:scale-[0.98] disabled:from-[#121622] disabled:to-[#0D1018] disabled:text-[#475569] disabled:border-white/[0.06] disabled:shadow-none disabled:cursor-not-allowed font-[family-name:var(--font-condensed)] text-lg font-extrabold tracking-[0.16em] uppercase text-[#F8FAFC] border border-[#2563EB] hover:border-[#38BDF8] shadow-[0_0_20px_rgba(37,99,235,0.28)] hover:shadow-[0_0_26px_rgba(56,189,248,0.45)] transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                {phase === 'SHUFFLING' ? 'SHUFFLING...' : 'DRAW CARD'}
              </button>
            </div>
          </div>
        )}

        {(phase === 'DRAWING_REVEAL' || phase === 'INSPECT_AND_PLACE') && drawnCard && (
          <div className="w-full flex flex-col items-center gap-4">
            <div
              key={drawnCard.id}
              className="animate-draw-reveal transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <CharacterCardView
                card={drawnCard}
                side={drawnCardSide}
                onFlip={phase === 'INSPECT_AND_PLACE' ? onFlipDrawnCard : undefined}
                size="md"
              />
            </div>

            <div className="w-full max-w-[300px] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onFlipDrawnCard}
                  disabled={phase !== 'INSPECT_AND_PLACE'}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#121828] hover:bg-[#1A233A] disabled:opacity-50 border border-white/10 text-xs font-medium text-[#E2E8F0] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                  {drawnCardSide === 'front' ? 'Show Stats' : 'Show Portrait'}
                </button>

                <span className="text-[11px] font-mono tabular-nums text-[#94A3B8]">
                  {remainingDeckCount} left in deck
                </span>
              </div>

              <div className="pt-2 border-t border-white/[0.07]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-2 text-center">
                  Locking {playerLabel} · Slot {nextSlotNum}
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {([0, 1, 2, 3, 4] as SlotIndex[]).map((slotIdx) => {
                    const isOccupied = activePlayerSlots[slotIdx] !== null;
                    const disabled = isOccupied || phase !== 'INSPECT_AND_PLACE';
                    return (
                      <button
                        key={slotIdx}
                        type="button"
                        disabled={disabled}
                        onClick={() => onSelectSlot(currentTurn, slotIdx)}
                        aria-label={
                          isOccupied
                            ? `Slot ${slotIdx + 1} occupied`
                            : `Place card in Slot ${slotIdx + 1}`
                        }
                        className={`min-h-[42px] rounded-lg border font-mono tabular-nums text-xs font-semibold transition-colors ${
                          disabled
                            ? 'bg-[#0C101A] border-white/[0.06] text-[#475569] cursor-not-allowed'
                            : currentTurn === 1
                              ? 'bg-[#0F1E38] hover:bg-[#172C52] border-[#2563EB] text-[#F8FAFC] cursor-pointer'
                              : 'bg-[#191336] hover:bg-[#241B4D] border-[#7C3AED] text-[#F8FAFC] cursor-pointer'
                        }`}
                      >
                        S{slotIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                disabled
                aria-label="Draw Card disabled while placing current card"
                className="w-full min-h-[40px] px-4 py-2 rounded-lg bg-[#0E1320] text-[#64748B] border border-white/[0.06] font-[family-name:var(--font-condensed)] text-sm font-bold tracking-[0.12em] uppercase cursor-not-allowed whitespace-nowrap"
              >
                DRAW CARD · AUTO-ADDING TO SLOT {nextSlotNum}
              </button>
            </div>
          </div>
        )}

        {phase === 'MATCH_COMPLETE' && matchResult && (
          <div className="animate-victory-enter w-full max-w-[300px] flex flex-col items-center text-center gap-5 py-2">
            <div className="w-13 h-13 rounded-xl bg-[#0D1A33] border border-[#2563EB]/70 shadow-[0_0_24px_rgba(37,99,235,0.3)] flex items-center justify-center text-[#38BDF8]">
              {matchResult.winner === 'DRAW' ? (
                <Scale className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Trophy className="w-6 h-6" aria-hidden="true" />
              )}
            </div>

            <div>
              <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#94A3B8]">
                Final Power Comparison
              </div>
              <div className="mt-2.5 flex items-center justify-center gap-5 font-[family-name:var(--font-condensed)] italic tabular-nums">
                <div>
                  <div className="text-[11px] font-mono not-italic text-[#60A5FA]">P1</div>
                  <div className="text-3xl font-extrabold text-[#F8FAFC]">
                    <AnimatedNumber value={matchResult.playerOnePower} />
                  </div>
                </div>
                <div className="text-sm font-mono not-italic text-[#475569]">VS</div>
                <div>
                  <div className="text-[11px] font-mono not-italic text-[#A78BFA]">P2</div>
                  <div className="text-3xl font-extrabold text-[#F8FAFC]">
                    <AnimatedNumber value={matchResult.playerTwoPower} />
                  </div>
                </div>
              </div>

              <div className="mt-2.5 text-xs text-[#CBD5E1] font-mono tabular-nums">
                {matchResult.winner === 'DRAW'
                  ? '0 POWER DIFFERENCE · DRAW'
                  : `POWER DIFFERENCE: +${matchResult.powerDifference}`}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onPlayAgain}
                className="w-full min-h-[46px] px-5 py-2.5 rounded-lg bg-gradient-to-b from-[#111D35] to-[#080F1E] hover:from-[#162747] hover:to-[#0C172D] active:scale-[0.98] border border-[#2563EB] hover:border-[#38BDF8] shadow-[0_0_20px_rgba(37,99,235,0.28)] font-[family-name:var(--font-condensed)] text-lg font-extrabold tracking-[0.14em] uppercase text-white transition-all cursor-pointer whitespace-nowrap"
              >
                PLAY AGAIN
              </button>
              <button
                type="button"
                onClick={onOpenSummaryModal}
                className="w-full min-h-[42px] px-5 py-2 rounded-lg bg-[#111625] hover:bg-[#192136] border border-white/10 text-xs font-medium text-[#E2E8F0] transition-colors cursor-pointer whitespace-nowrap"
              >
                View Full Match Breakdown
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Arena Draft Progress */}
      <div className="relative z-10 w-full pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3 text-[11px] font-mono text-[#64748B]">
        <span>DRAFT SEQUENCE</span>
        <span className="tabular-nums text-[#94A3B8]">{drawsCompleted}/10 DRAWN</span>
      </div>
    </section>
  );
}
