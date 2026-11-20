import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutGrid, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { CHARACTER_DECK, shuffleDeck } from './data/characters';
import {
  getCachedPortraits,
  PortraitMap,
  resolveBlueLockPortraits,
} from './assets/characters/portraitResolver';
import {
  CardSide,
  CharacterCard,
  GamePhase,
  MatchResult,
  PlayerId,
  PlayerSlots,
  SlotIndex,
} from './types/game';
import { soundEngine } from './utils/sound';
import { TitleScreen } from './components/TitleScreen';
import { PlayerArea } from './components/PlayerArea';
import { CenterDeckZone } from './components/CenterDeckZone';
import { CardInspectorModal } from './components/CardInspectorModal';
import { MatchResultModal } from './components/MatchResultModal';
import { CardsGalleryTab, PlayerCardsModal } from './components/PlayerCardsModal';
import { ArenaBackdrop } from './components/ArenaBackdrop';
import { AnimatedNumber } from './components/AnimatedNumber';

const EMPTY_SLOTS = (): PlayerSlots => [null, null, null, null, null];

function calculatePower(slots: PlayerSlots): number {
  return slots.reduce((sum, card) => sum + (card ? card.power : 0), 0);
}

function attachPortrait(card: CharacterCard, portraits: PortraitMap): CharacterCard {
  const resolved = portraits[card.id];
  if (resolved && resolved !== card.portrait) {
    return { ...card, portrait: resolved };
  }
  return card;
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('TITLE');
  const [portraits, setPortraits] = useState<PortraitMap>(() => getCachedPortraits());
  const [deck, setDeck] = useState<CharacterCard[]>([]);
  const [currentTurn, setCurrentTurn] = useState<PlayerId>(1);
  const [playerOneSlots, setPlayerOneSlots] = useState<PlayerSlots>(EMPTY_SLOTS);
  const [playerTwoSlots, setPlayerTwoSlots] = useState<PlayerSlots>(EMPTY_SLOTS);
  const [drawnCard, setDrawnCard] = useState<CharacterCard | null>(null);
  const [drawnCardSide, setDrawnCardSide] = useState<CardSide>('front');
  const [inspectedCard, setInspectedCard] = useState<CharacterCard | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [cardsGalleryTab, setCardsGalleryTab] = useState<CardsGalleryTab | null>(null);
  const [muted, setMuted] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearPendingTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearPendingTimers();
  }, [clearPendingTimers]);

  useEffect(() => {
    let active = true;
    resolveBlueLockPortraits().then((resolvedMap) => {
      if (!active) return;
      setPortraits(resolvedMap);
      setDeck((prev) => prev.map((c) => attachPortrait(c, resolvedMap)));
      setPlayerOneSlots(
        (prev) =>
          prev.map((c) => (c ? attachPortrait(c, resolvedMap) : null)) as PlayerSlots,
      );
      setPlayerTwoSlots(
        (prev) =>
          prev.map((c) => (c ? attachPortrait(c, resolvedMap) : null)) as PlayerSlots,
      );
      setDrawnCard((prev) => (prev ? attachPortrait(prev, resolvedMap) : null));
      setInspectedCard((prev) => (prev ? attachPortrait(prev, resolvedMap) : null));
    });
    return () => {
      active = false;
    };
  }, []);

  const scheduleTimer = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== id);
      fn();
    }, delayMs);
    timersRef.current.push(id);
  }, []);

  const playerOnePower = useMemo(() => calculatePower(playerOneSlots), [playerOneSlots]);
  const playerTwoPower = useMemo(() => calculatePower(playerTwoSlots), [playerTwoSlots]);

  const allRosterWithPortraits = useMemo(
    () => CHARACTER_DECK.map((c) => attachPortrait(c, portraits)),
    [portraits],
  );

  const drawsCompleted = useMemo(() => {
    const p1Count = playerOneSlots.filter(Boolean).length;
    const p2Count = playerTwoSlots.filter(Boolean).length;
    return p1Count + p2Count;
  }, [playerOneSlots, playerTwoSlots]);

  const startNewGame = useCallback(() => {
    clearPendingTimers();
    const deckWithPortraits = CHARACTER_DECK.map((c) => attachPortrait(c, portraits));
    const freshlyShuffled = shuffleDeck(deckWithPortraits);
    setDeck(freshlyShuffled);
    setPlayerOneSlots(EMPTY_SLOTS());
    setPlayerTwoSlots(EMPTY_SLOTS());
    setCurrentTurn(1);
    setDrawnCard(null);
    setDrawnCardSide('front');
    setInspectedCard(null);
    setMatchResult(null);
    setShowSummaryModal(false);
    setPhase('SHUFFLING');
    soundEngine.playShuffle();

    scheduleTimer(() => {
      setPhase('AWAITING_DRAW');
    }, 460);
  }, [clearPendingTimers, portraits, scheduleTimer]);

  const placeCardIntoSlot = useCallback(
    (
      cardToPlace: CharacterCard,
      targetPlayerId: PlayerId,
      slotIndex: SlotIndex,
      baseP1Slots: PlayerSlots,
      baseP2Slots: PlayerSlots,
    ) => {
      const currentSlots = targetPlayerId === 1 ? baseP1Slots : baseP2Slots;
      const placedCountForPlayer = currentSlots.filter(Boolean).length;
      if (placedCountForPlayer >= 5 || currentSlots[slotIndex] !== null) {
        return;
      }

      const updatedSlots: PlayerSlots = [...currentSlots] as PlayerSlots;
      updatedSlots[slotIndex] = cardToPlace;

      const nextP1Slots = targetPlayerId === 1 ? updatedSlots : baseP1Slots;
      const nextP2Slots = targetPlayerId === 2 ? updatedSlots : baseP2Slots;

      if (targetPlayerId === 1) {
        setPlayerOneSlots(updatedSlots);
      } else {
        setPlayerTwoSlots(updatedSlots);
      }

      soundEngine.playPlace();
      setDrawnCard(null);

      const totalPlaced =
        nextP1Slots.filter(Boolean).length + nextP2Slots.filter(Boolean).length;

      if (totalPlaced >= 10) {
        const finalP1Power = calculatePower(nextP1Slots);
        const finalP2Power = calculatePower(nextP2Slots);
        const winner: PlayerId | 'DRAW' =
          finalP1Power > finalP2Power ? 1 : finalP2Power > finalP1Power ? 2 : 'DRAW';
        const powerDifference = Math.abs(finalP1Power - finalP2Power);

        setMatchResult({
          playerOnePower: finalP1Power,
          playerTwoPower: finalP2Power,
          winner,
          powerDifference,
        });
        setPhase('MATCH_COMPLETE');

        scheduleTimer(() => {
          soundEngine.playVictory(winner === 'DRAW');
          setShowSummaryModal(true);
        }, 320);
      } else {
        setCurrentTurn(targetPlayerId === 1 ? 2 : 1);
        setPhase('AWAITING_DRAW');
      }
    },
    [scheduleTimer],
  );

  const handleDrawCard = useCallback(() => {
    if (phase !== 'AWAITING_DRAW' || drawsCompleted >= 10 || deck.length === 0) {
      return;
    }

    const activeSlots = currentTurn === 1 ? playerOneSlots : playerTwoSlots;
    const nextEmptyIndex = activeSlots.findIndex((slot) => slot === null);
    if (nextEmptyIndex === -1) {
      return;
    }

    const [nextCard, ...remainingDeck] = deck;
    const turnOwner = currentTurn;
    const snapshotP1 = playerOneSlots;
    const snapshotP2 = playerTwoSlots;

    setDeck(remainingDeck);
    setDrawnCard(nextCard);
    setDrawnCardSide('front');
    setPhase('DRAWING_REVEAL');
    soundEngine.playDraw();

    scheduleTimer(() => {
      setDrawnCardSide('back');
      soundEngine.playFlip();
      setPhase('INSPECT_AND_PLACE');
    }, 450);

    scheduleTimer(() => {
      placeCardIntoSlot(
        nextCard,
        turnOwner,
        nextEmptyIndex as SlotIndex,
        snapshotP1,
        snapshotP2,
      );
    }, 1050);
  }, [
    phase,
    drawsCompleted,
    deck,
    currentTurn,
    playerOneSlots,
    playerTwoSlots,
    scheduleTimer,
    placeCardIntoSlot,
  ]);

  const handleFlipDrawnCard = useCallback(() => {
    if (phase !== 'INSPECT_AND_PLACE' || !drawnCard) return;
    soundEngine.playFlip();
    setDrawnCardSide((prev) => (prev === 'front' ? 'back' : 'front'));
  }, [phase, drawnCard]);

  const handleSelectSlot = useCallback(
    (targetPlayerId: PlayerId, slotIndex: SlotIndex) => {
      if (phase !== 'INSPECT_AND_PLACE' || !drawnCard) return;
      if (targetPlayerId !== currentTurn) return;
      clearPendingTimers();
      placeCardIntoSlot(
        drawnCard,
        targetPlayerId,
        slotIndex,
        playerOneSlots,
        playerTwoSlots,
      );
    },
    [
      phase,
      drawnCard,
      currentTurn,
      clearPendingTimers,
      placeCardIntoSlot,
      playerOneSlots,
      playerTwoSlots,
    ],
  );

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      soundEngine.setMuted(next);
      return next;
    });
  }, []);

  // Keyboard shortcuts during active play
  useEffect(() => {
    if (phase === 'TITLE' || inspectedCard || showSummaryModal || cardsGalleryTab) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (phase === 'AWAITING_DRAW' && (e.key === ' ' || e.key === 'Enter')) {
        if (activeTag !== 'button') {
          e.preventDefault();
          handleDrawCard();
        }
      } else if (phase === 'INSPECT_AND_PLACE' && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        handleFlipDrawnCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, inspectedCard, showSummaryModal, cardsGalleryTab, handleDrawCard, handleFlipDrawnCard]);

  if (phase === 'TITLE') {
    return <TitleScreen onStartGame={startNewGame} />;
  }

  const activePlayerSlots = currentTurn === 1 ? playerOneSlots : playerTwoSlots;
  const headerTurnText =
    phase === 'MATCH_COMPLETE'
      ? 'COMPLETE'
      : phase === 'SHUFFLING'
        ? 'SHUFFLING'
        : currentTurn === 1
          ? 'P1 TURN'
          : 'P2 TURN';

  return (
    <div className="relative min-h-screen w-full bg-[#050811] text-[#F1F5F9] flex flex-col overflow-x-hidden">
      <ArenaBackdrop />

      {/* Compact Blue Lock Gaming Header */}
      <header className="relative z-20 w-full border-b border-[#2563EB]/25 bg-[#060913]/90 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left: NEXORA Logo + BLUE LOCK Universe Label */}
          <div className="flex items-center gap-2.5 min-w-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <polygon
                points="14,2 25.5,10.2 21.2,24 6.8,24 2.5,10.2"
                fill="#091022"
                stroke="#2563EB"
                strokeWidth="1.5"
              />
              <path
                d="M10.5 18.5V9.5L17.5 18.5V9.5"
                stroke="#F8FAFC"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex items-baseline gap-2 min-w-0">
              <h1 className="font-[family-name:var(--font-condensed)] text-xl sm:text-2xl font-extrabold italic uppercase tracking-[0.06em] text-[#F8FAFC] leading-none whitespace-nowrap">
                NEXORA
              </h1>
              <span className="hidden sm:inline font-mono text-[10.5px] tracking-[0.18em] text-[#60A5FA] whitespace-nowrap">
                · BLUE LOCK
              </span>
            </div>
          </div>

          {/* Center: Compact Arena Telemetry (Scores · Turn · Remaining Cards) */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-[#60A5FA] font-semibold">P1</span>
              <span className="tabular-nums font-bold text-[#F8FAFC]">
                <AnimatedNumber value={playerOnePower} />
              </span>
            </div>
            <span className="text-[#334155]" aria-hidden="true">
              /
            </span>
            <span
              className={`font-semibold tracking-wider ${
                phase === 'MATCH_COMPLETE'
                  ? 'text-[#38BDF8]'
                  : currentTurn === 1
                    ? 'text-[#60A5FA]'
                    : 'text-[#A78BFA]'
              }`}
            >
              {headerTurnText}
            </span>
            <span className="text-[#334155]" aria-hidden="true">
              /
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#A78BFA] font-semibold">P2</span>
              <span className="tabular-nums font-bold text-[#F8FAFC]">
                <AnimatedNumber value={playerTwoPower} />
              </span>
            </div>
            <span className="text-[#334155]" aria-hidden="true">
              ·
            </span>
            <span className="tabular-nums text-[#94A3B8]">{deck.length} LEFT</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setCardsGalleryTab(drawsCompleted > 0 ? 'drafted' : 'roster')}
              className="min-h-[40px] px-3.5 py-2 rounded-lg bg-[#0C1220] hover:bg-[#141E33] border border-white/10 text-xs font-medium text-[#CBD5E1] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
              <span>All Cards</span>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute game audio' : 'Mute game audio'}
              className="min-h-[40px] min-w-[40px] px-3 py-2 rounded-lg bg-[#0C1220] hover:bg-[#141E33] border border-white/10 text-xs font-medium text-[#CBD5E1] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#60A5FA]" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{muted ? 'Muted' : 'Audio'}</span>
            </button>

            <button
              type="button"
              onClick={startNewGame}
              className="min-h-[40px] px-4 py-2 rounded-lg bg-[#0E172A] hover:bg-[#152440] border border-[#2563EB]/60 hover:border-[#38BDF8] text-xs sm:text-sm font-semibold text-[#F8FAFC] inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
              Restart
            </button>
          </div>
        </div>
      </header>

      {/* Main Draft Arena */}
      <main className="relative z-10 animate-arena-enter flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px_1fr] xl:grid-cols-[1fr_360px_1fr] gap-4 sm:gap-5 items-stretch">
          {/* Left: Player One */}
          <div className="order-2 lg:order-1 flex flex-col">
            <PlayerArea
              playerId={1}
              slots={playerOneSlots}
              totalPower={playerOnePower}
              isActiveTurn={currentTurn === 1}
              phase={phase}
              winner={matchResult?.winner ?? null}
              onSelectSlot={handleSelectSlot}
              onInspectCard={setInspectedCard}
              onViewAllCards={(pid) => setCardsGalleryTab(pid === 1 ? 'p1' : 'p2')}
            />
          </div>

          {/* Center: Shared Deck, Draw Button & Turn Controls */}
          <div className="order-1 lg:order-2 flex flex-col">
            <CenterDeckZone
              phase={phase}
              currentTurn={currentTurn}
              drawsCompleted={drawsCompleted}
              remainingDeckCount={deck.length}
              drawnCard={drawnCard}
              drawnCardSide={drawnCardSide}
              activePlayerSlots={activePlayerSlots}
              matchResult={matchResult}
              onDrawCard={handleDrawCard}
              onFlipDrawnCard={handleFlipDrawnCard}
              onSelectSlot={handleSelectSlot}
              onOpenSummaryModal={() => setShowSummaryModal(true)}
              onPlayAgain={startNewGame}
            />
          </div>

          {/* Right: Player Two */}
          <div className="order-3 lg:order-3 flex flex-col">
            <PlayerArea
              playerId={2}
              slots={playerTwoSlots}
              totalPower={playerTwoPower}
              isActiveTurn={currentTurn === 2}
              phase={phase}
              winner={matchResult?.winner ?? null}
              onSelectSlot={handleSelectSlot}
              onInspectCard={setInspectedCard}
              onViewAllCards={(pid) => setCardsGalleryTab(pid === 1 ? 'p1' : 'p2')}
            />
          </div>
        </div>
      </main>

      {/* Placed Card Dual-Side Inspector Modal */}
      <CardInspectorModal
        card={inspectedCard}
        onClose={() => setInspectedCard(null)}
      />

      {/* All Player Cards Gallery Modal */}
      <PlayerCardsModal
        isOpen={cardsGalleryTab !== null}
        initialTab={cardsGalleryTab ?? 'drafted'}
        playerOneSlots={playerOneSlots}
        playerTwoSlots={playerTwoSlots}
        allRosterCards={allRosterWithPortraits}
        onClose={() => setCardsGalleryTab(null)}
      />

      {/* Match Complete 10-Card Breakdown Modal */}
      <MatchResultModal
        isOpen={showSummaryModal}
        result={matchResult}
        playerOneSlots={playerOneSlots}
        playerTwoSlots={playerTwoSlots}
        onInspectCard={(card) => setInspectedCard(card)}
        onPlayAgain={startNewGame}
        onClose={() => setShowSummaryModal(false)}
      />
    </div>
  );
}
