"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroFallback from "./HeroFallback";
import { hasWebGL, prefersReducedMotion } from "@/lib/webgl";
import { site, guarantee } from "@/data/site";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [env, setEnv] = useState<{ webgl: boolean; reducedMotion: boolean } | null>(
    null
  );

  useEffect(() => {
    // Intentional one-time environment read after mount: the first client
    // render must match the server (webgl unknown → HeroFallback) to avoid
    // a hydration mismatch; only after mount can we safely check
    // browser-only WebGL/matchMedia support and swap in the real scene.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnv({ webgl: hasWebGL(), reducedMotion: prefersReducedMotion() });
  }, []);

  const webgl = env?.webgl ?? null;
  const reducedMotion = env?.reducedMotion ?? false;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        progressRef.current = total > 0 ? scrolled / total : 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const canRender3D = webgl === true;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0">
        {webgl === null ? (
          <HeroFallback />
        ) : canRender3D ? (
          <HeroScene progressRef={progressRef} reducedMotion={reducedMotion} />
        ) : (
          <HeroFallback />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,10,0.15) 0%, rgba(5,7,10,0.35) 55%, rgba(5,7,10,0.92) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 sm:px-8 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep"
        >
          {site.tagline}
        </motion.p>

        {reducedMotion ? (
          <h1 className="text-balance max-w-4xl font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            {guarantee.headline}
          </h1>
        ) : (
          <h1
            className="text-balance max-w-4xl font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            style={{ perspective: 800 }}
          >
            {guarantee.headline.split(" ").map((word, i) => (
              <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotateX: 60, opacity: 0 }}
                  animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.05 }}
                  style={{ transformOrigin: "bottom", display: "inline-block" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        )}

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.22 }}
          className="mt-6 max-w-xl text-balance text-lg text-ink-dim"
        >
          {site.mission}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.34 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ground transition hover:bg-white"
          >
            Book Your Call
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-ink transition hover:border-accent/60 hover:text-accent"
          >
            See how it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}
