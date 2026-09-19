"use client";

// Code-only fallback for the logo-reveal preloader (no OpenArt video yet, or
// prefers-reduced-motion): the three ascending chevrons from the mark draw in
// sequence, then the wordmark fades in. Pure CSS/SVG, no video dependency.
export default function LogoDrawIn() {
  const chevrons = [
    "M20 78 L50 50 L80 78",
    "M20 58 L50 30 L80 58",
    "M20 38 L50 10 L80 38",
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        {chevrons.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              animation: `draw-chevron 0.55s ease-out ${0.15 + i * 0.18}s forwards`,
            }}
          />
        ))}
      </svg>
      <p
        className="font-display text-sm font-medium uppercase tracking-[0.35em] text-ink opacity-0"
        style={{ animation: "fade-up 0.5s ease-out 0.85s forwards" }}
      >
        Train &amp; Scale
      </p>
      <style>{`
        @keyframes draw-chevron {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
