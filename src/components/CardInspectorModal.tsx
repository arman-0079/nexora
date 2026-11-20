import { useEffect, useState } from 'react';
import { RotateCw, X } from 'lucide-react';
import { CardSide, CharacterCard } from '../types/game';
import { CharacterCardView } from './CharacterCardView';
import { soundEngine } from '../utils/sound';

interface CardInspectorModalProps {
  card: CharacterCard | null;
  onClose: () => void;
}

export function CardInspectorModal({ card, onClose }: CardInspectorModalProps) {
  const [side, setSide] = useState<CardSide>('front');

  useEffect(() => {
    if (card) {
      setSide('front');
    }
  }, [card]);

  useEffect(() => {
    if (!card) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'f' || e.key === 'F') {
        soundEngine.playFlip();
        setSide((prev) => (prev === 'front' ? 'back' : 'front'));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [card, onClose]);

  if (!card) return null;

  const toggleSide = () => {
    soundEngine.playFlip();
    setSide((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Inspecting ${card.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07090D]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-4 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between text-xs text-[#94A3B8] px-1">
          <span>
            {side === 'front' ? 'Front · Character Portrait' : 'Back · Attributes & Ability'}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close card inspector"
            className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg bg-[#141720] border border-white/10 text-[#CBD5E1] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <CharacterCardView card={card} side={side} onFlip={toggleSide} size="lg" />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSide}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#1E3A5F] hover:bg-[#274B7A] text-sm font-medium text-white inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCw className="w-4 h-4" aria-hidden="true" />
            {side === 'front' ? 'Flip to Attributes' : 'Flip to Portrait'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#181C26] hover:bg-[#212736] border border-white/10 text-sm font-medium text-[#E2E8F0] transition-colors cursor-pointer whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
