import { useEffect, useState } from 'react';
import { ArenaBackdrop } from './ArenaBackdrop';

interface TitleScreenProps {
  onStartGame: () => void;
}

export function TitleScreen({ onStartGame }: TitleScreenProps) {
  const [bgFailed, setBgFailed] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStartGame]);

  return (
    <main className="relative min-h-screen w-full bg-[#050811] flex flex-col items-center justify-center p-6 overflow-hidden">
      <ArenaBackdrop />

      {/* Atmospheric Tabletop Layer */}
      {!bgFailed && (
        <img
          src="/src/assets/images/nexora_table_backdrop_1795160307356.jpg"
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none z-0"
        />
      )}

      {/* Centered Blue Lock Ego Arena Lockup */}
      <div className="animate-arena-enter relative z-10 w-full max-w-xl flex flex-col items-center text-center">
        {/* Bespoke Blue Lock Pentagon + Nexora Emblem */}
        <div className="relative mb-6 flex items-center justify-center">
          <svg
            width="84"
            height="84"
            viewBox="0 0 84 84"
            fill="none"
            aria-hidden="true"
          >
            <polygon
              points="42,5 77,30 64,72 20,72 7,30"
              fill="#080E1C"
              stroke="#2563EB"
              strokeWidth="1.6"
            />
            <polygon
              points="42,15 67,33 58,63 26,63 17,33"
              fill="none"
              stroke="#38BDF8"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <path
              d="M32 52V31L52 52V31"
              stroke="#F8FAFC"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#60A5FA] mb-2">
          BLUE LOCK · EGO ARENA
        </div>

        <h1 className="font-[family-name:var(--font-condensed)] text-5xl sm:text-6xl font-extrabold italic uppercase tracking-[0.04em] text-[#F8FAFC] leading-none [text-wrap:balance]">
          Nexora Card Draft
        </h1>
        <p className="mt-3.5 text-sm sm:text-base text-[#94A3B8] max-w-md leading-relaxed">
          Enter the two-player Blue Lock draft arena. Alternate draws from one shared
          shuffled deck and assemble the highest-power five-card squad.
        </p>

        {/* Clean 3-Step Arena Protocol */}
        <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="rounded-lg bg-[#0B101D]/90 border border-[#2563EB]/30 p-3.5">
            <div className="font-mono text-[11px] text-[#60A5FA]">01. SHARED DECK</div>
            <p className="mt-1 text-xs text-[#CBD5E1] leading-relaxed">
              38 Blue Lock characters shuffled cleanly with zero duplicates.
            </p>
          </div>
          <div className="rounded-lg bg-[#0B101D]/90 border border-[#2563EB]/30 p-3.5">
            <div className="font-mono text-[11px] text-[#60A5FA]">02. AUTO-LOCK</div>
            <p className="mt-1 text-xs text-[#CBD5E1] leading-relaxed">
              Players alternate drawing cards directly into five chambers each.
            </p>
          </div>
          <div className="rounded-lg bg-[#0B101D]/90 border border-[#7C3AED]/35 p-3.5">
            <div className="font-mono text-[11px] text-[#A78BFA]">03. TOTAL POWER</div>
            <p className="mt-1 text-xs text-[#CBD5E1] leading-relaxed">
              After ten draws, the higher combined team power claims victory.
            </p>
          </div>
        </div>

        {/* Metallic Electric-Blue Start CTA */}
        <div className="mt-8">
          <button
            type="button"
            onClick={onStartGame}
            className="min-h-[50px] px-9 py-3 rounded-lg bg-gradient-to-b from-[#111D35] to-[#080F1E] hover:from-[#162747] hover:to-[#0C172D] active:scale-[0.98] border border-[#2563EB] hover:border-[#38BDF8] shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:shadow-[0_0_32px_rgba(56,189,248,0.5)] font-[family-name:var(--font-condensed)] text-xl font-extrabold tracking-[0.14em] uppercase text-white transition-all cursor-pointer whitespace-nowrap"
          >
            Start New Game
          </button>
        </div>

        {/* Single Flat Control-Hint Line */}
        <p className="mt-6 text-xs text-[#64748B] tracking-wide">
          Enter or Space to Draw · Click Any Placed Card to Flip · Esc to Close Modals
        </p>
      </div>
    </main>
  );
}
