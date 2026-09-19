"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";
import { packages } from "@/data/site";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path
        d="M5 8.3l2 2 4-4.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Every tab is a real Train & Scale service agreement — tabs mirror the
// Process section's toggle pattern, one per package tier. Switching tabs
// swaps in that agreement's full service list and its own guarantee.
export default function InstallGrid() {
  const [activeId, setActiveId] = useState(packages[0].id);
  const active = packages.find((p) => p.id === activeId) ?? packages[0];
  const reduce = useReducedMotion();

  return (
    <section id="installs" className="border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="What We Install"
          title="Pick your package, see exactly what's installed"
          description="Every tab below is a real Train & Scale service agreement — the higher the tier, the more of the system we build, staff, and run for you."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2 px-2">
          {packages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition sm:px-5 ${
                activeId === p.id
                  ? "border-accent bg-accent text-ground"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
              aria-pressed={activeId === p.id}
            >
              {p.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <p className="text-center font-mono text-xs uppercase tracking-[0.24em] text-ink-dim">
              {active.subtitle}
            </p>

            <Tilt className="glass-card mx-auto mt-6 max-w-xl overflow-hidden px-8 py-7 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-deep">
                The Guarantee
              </p>
              <p className="glow-text mt-2 font-display text-2xl font-semibold sm:text-3xl">
                {active.guarantee.headline}
              </p>
              <p className="mt-2 text-sm text-ink-dim">{active.guarantee.note}</p>
            </Tilt>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {active.groups.map((group) => (
                <Tilt key={group.group} className="glass-card h-full overflow-hidden p-6 sm:p-7">
                  <h3 className="font-display text-base font-medium text-ink sm:text-lg">
                    {group.group}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-dim">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Tilt>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
