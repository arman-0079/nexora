const AMBIENT_PARTICLES = [
  { left: '12%', top: '24%', delay: '0s', size: 2 },
  { left: '26%', top: '72%', delay: '1.4s', size: 2 },
  { left: '44%', top: '18%', delay: '2.8s', size: 3 },
  { left: '58%', top: '82%', delay: '0.9s', size: 2 },
  { left: '74%', top: '28%', delay: '3.6s', size: 2 },
  { left: '86%', top: '64%', delay: '2.1s', size: 3 },
];

export function ArenaBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#050811]"
    >
      {/* Deep midnight navy to matte black atmospheric base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 18%, rgba(23, 55, 115, 0.24) 0%, rgba(10, 20, 44, 0.35) 45%, rgba(4, 6, 12, 0.96) 100%)',
        }}
      />

      {/* Subtle player-side ambient illumination (Electric Blue left / Subtle Violet right) */}
      <div
        className="absolute -left-24 top-1/4 w-[420px] h-[420px] rounded-full opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(37, 99, 235, 0) 70%)',
        }}
      />
      <div
        className="absolute -right-24 top-1/4 w-[420px] h-[420px] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0) 70%)',
        }}
      />

      {/* Faint technical facility grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(96, 165, 250, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(96, 165, 250, 0.4) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Architectural Blue Lock angular shapes & diagonal energy lines */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-[0.14]"
      >
        <defs>
          <linearGradient id="arenaDiagBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central architectural pentagon outline */}
        <polygon
          points="720,90 1050,330 924,720 516,720 390,330"
          fill="none"
          stroke="#2563EB"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
        <polygon
          points="720,160 980,350 880,655 560,655 460,350"
          fill="none"
          stroke="#60A5FA"
          strokeOpacity="0.18"
          strokeWidth="0.9"
          strokeDasharray="10 8"
        />

        {/* Large low-opacity angular corner trusses */}
        <polygon points="0,0 320,0 140,210 0,210" fill="#0F244D" fillOpacity="0.24" />
        <polygon points="1440,0 1120,0 1300,210 1440,210" fill="#1E1845" fillOpacity="0.22" />

        {/* Subtle diagonal arena lines */}
        <line x1="0" y1="740" x2="540" y2="200" stroke="url(#arenaDiagBlue)" strokeWidth="1" />
        <line x1="1440" y1="740" x2="900" y2="200" stroke="url(#arenaDiagBlue)" strokeWidth="1" />
      </svg>

      {/* Restrained floating micro-particles */}
      {AMBIENT_PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className="animate-particle-drift absolute rounded-full bg-[#60A5FA]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Soft perimeter vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 55%, rgba(2, 4, 9, 0.72) 100%)',
        }}
      />
    </div>
  );
}
