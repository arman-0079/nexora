import { useEffect, useMemo, useState } from 'react';
import { RotateCw, X } from 'lucide-react';
import { CardSide, CharacterCard, PlayerSlots } from '../types/game';
import { CharacterCardView } from './CharacterCardView';
import { soundEngine } from '../utils/sound';

export type CardsGalleryTab = 'p1' | 'p2' | 'drafted' | 'roster';

interface PlayerCardsModalProps {
  isOpen: boolean;
  initialTab: CardsGalleryTab;
  playerOneSlots: PlayerSlots;
  playerTwoSlots: PlayerSlots;
  allRosterCards: CharacterCard[];
  onClose: () => void;
}

export function PlayerCardsModal({
  isOpen,
  initialTab,
  playerOneSlots,
  playerTwoSlots,
  allRosterCards,
  onClose,
}: PlayerCardsModalProps) {
  const [activeTab, setActiveTab] = useState<CardsGalleryTab>(initialTab);
  const [cardSides, setCardSides] = useState<Record<string, CardSide>>({});
  const [globalSide, setGlobalSide] = useState<CardSide>('front');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setCardSides({});
      setGlobalSide('front');
    }
  }, [isOpen, initialTab]);

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

  const p1Cards = useMemo(
    () =>
      playerOneSlots
        .map((card, idx) => (card ? { card, slotNumber: idx + 1, owner: 'Player One' } : null))
        .filter((item): item is { card: CharacterCard; slotNumber: number; owner: string } =>
          Boolean(item),
        ),
    [playerOneSlots],
  );

  const p2Cards = useMemo(
    () =>
      playerTwoSlots
        .map((card, idx) => (card ? { card, slotNumber: idx + 1, owner: 'Player Two' } : null))
        .filter((item): item is { card: CharacterCard; slotNumber: number; owner: string } =>
          Boolean(item),
        ),
    [playerTwoSlots],
  );

  const draftedCards = useMemo(() => [...p1Cards, ...p2Cards], [p1Cards, p2Cards]);

  if (!isOpen) return null;

  const visibleItems: { card: CharacterCard; caption: string }[] =
    activeTab === 'p1'
      ? p1Cards.map((item) => ({
          card: item.card,
          caption: `Player One · Slot ${item.slotNumber}`,
        }))
      : activeTab === 'p2'
        ? p2Cards.map((item) => ({
            card: item.card,
            caption: `Player Two · Slot ${item.slotNumber}`,
          }))
        : activeTab === 'drafted'
          ? draftedCards.map((item) => ({
              card: item.card,
              caption: `${item.owner} · Slot ${item.slotNumber}`,
            }))
          : allRosterCards.map((card) => ({
              card,
              caption: `#${card.number} · ${card.position}`,
            }));

  const handleToggleSingleCard = (id: string) => {
    soundEngine.playFlip();
    setCardSides((prev) => {
      const current = prev[id] ?? globalSide;
      return { ...prev, [id]: current === 'front' ? 'back' : 'front' };
    });
  };

  const handleFlipAll = () => {
    soundEngine.playFlip();
    const nextSide: CardSide = globalSide === 'front' ? 'back' : 'front';
    setGlobalSide(nextSide);
    setCardSides({});
  };

  const tabs: { id: CardsGalleryTab; label: string; count: number }[] = [
    { id: 'p1', label: 'Player One', count: p1Cards.length },
    { id: 'p2', label: 'Player Two', count: p2Cards.length },
    { id: 'drafted', label: 'All Drafted', count: draftedCards.length },
    { id: 'roster', label: 'Full Roster', count: allRosterCards.length },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="All Player Cards Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07090D]/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] rounded-2xl bg-[#11141C] border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#F8FAFC] tracking-tight">
              Player Cards Overview
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Click any card to flip between portrait front and Blue Lock stat sheet.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {visibleItems.length > 0 && (
              <button
                type="button"
                onClick={handleFlipAll}
                className="min-h-[40px] px-3.5 py-2 rounded-lg bg-[#1E3A5F] hover:bg-[#274B7A] border border-[#3B68A8]/50 text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                {globalSide === 'front' ? 'Flip All to Stats' : 'Flip All to Portrait'}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close all cards viewer"
              className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg bg-[#181C26] hover:bg-[#222836] border border-white/10 text-[#CBD5E1] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 sm:px-6 py-3 border-b border-white/[0.07] bg-[#0E1118] flex items-center gap-1.5 overflow-x-auto shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? tab.id === 'p2'
                      ? 'bg-[#261E45] text-[#E9D5FF] border border-[#7C6FD6]/60'
                      : 'bg-[#17263F] text-[#F8FAFC] border border-[#3B68A8]/60'
                    : 'bg-[#141720] text-[#94A3B8] hover:text-[#F1F5F9] border border-white/[0.06]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="font-mono tabular-nums text-[11px] opacity-80">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {visibleItems.length === 0 ? (
            <div className="min-h-[260px] flex flex-col items-center justify-center text-center px-4">
              <p className="text-sm font-medium text-[#CBD5E1]">
                No cards have been placed in slots for this view yet.
              </p>
              <p className="mt-1 text-xs text-[#64748B]">
                Draw a card and place it into an empty slot, or switch to Full Roster to browse all Blue Lock cards.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-6">
              {visibleItems.map(({ card, caption }) => {
                const side = cardSides[card.id] ?? globalSide;
                return (
                  <div key={`${activeTab}-${card.id}`} className="flex flex-col items-center gap-2">
                    <span className="font-mono text-[11px] text-[#94A3B8] tracking-wide">
                      {caption}
                    </span>
                    <CharacterCardView
                      card={card}
                      side={side}
                      onFlip={() => handleToggleSingleCard(card.id)}
                      size="md"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
