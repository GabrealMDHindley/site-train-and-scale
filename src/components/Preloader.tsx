"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LogoDrawIn from "./LogoDrawIn";

const SESSION_KEY = "ts-intro-seen";

// Plays once per session before the hero reveals. If the OpenArt logo-reveal
// clip exists (public/videos/brand/logo-reveal.mp4) it plays that; otherwise
// the code-only chevron draw-in ships as the default — never blocked on
// video generation. Skippable, and skipped entirely under
// prefers-reduced-motion.
export default function Preloader({ hasVideo }: { hasVideo: boolean }) {
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    setClosing(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    window.setTimeout(() => setHidden(true), 550);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      // Intentional: the preloader must render on the server/first paint
      // (hidden starts false) so it's never a blank/mismatched hero; this
      // effect immediately corrects it once we can read
      // sessionStorage/matchMedia (browser-only, unknown during SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHidden(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      return;
    }

    const timer = window.setTimeout(finish, hasVideo ? 4500 : 2400);
    return () => window.clearTimeout(timer);
  }, [finish, hasVideo]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ground transition-opacity duration-500 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading Train & Scale"
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          className="h-40 w-auto sm:h-56"
          src="/videos/brand/logo-reveal.mp4"
          poster="/videos/brand/poster.jpg"
          autoPlay
          muted
          playsInline
          onEnded={finish}
        />
      ) : (
        <LogoDrawIn />
      )}

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 right-6 font-mono text-xs uppercase tracking-widest text-ink-dim transition hover:text-ink sm:right-8"
      >
        Skip
      </button>
    </div>
  );
}
