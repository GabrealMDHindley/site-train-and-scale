"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";
import { installs } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// A pinned, scroll-scrubbed cascade — the section holds in place while
// tiles stagger into place in step with the wheel (scrub, never
// scroll-jacked: position always matches scroll exactly).
export default function InstallGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || isMobile) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-install-card]");
      gsap.set(cards, { opacity: 0, y: 70, scale: 0.9, rotateX: -8 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=80",
          end: "+=1600",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      }).to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        stagger: 0.18,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="installs"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="What We Install"
          title="A complete client-acquisition system, run for you"
          description="Every piece is built, staffed, and managed by our team — not handed to you as a template."
        />

        <div
          ref={gridRef}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1200 }}
        >
          {installs.map((tile, i) => (
            <div key={tile.title} data-install-card style={{ transformStyle: "preserve-3d" }}>
              <Tilt className="glass-card h-full overflow-hidden p-7 sm:p-8">
                <span className="mono-num text-xs text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium sm:text-xl">
                  {tile.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">
                  {tile.description}
                </p>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
