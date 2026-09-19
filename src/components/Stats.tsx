import Reveal from "./Reveal";
import Tilt from "./Tilt";
import CountUp from "./CountUp";
import { stats } from "@/data/site";

export default function Stats() {
  return (
    <section className="border-t border-white/5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <Tilt className="glass-card overflow-hidden px-6 py-9 text-center">
                <CountUp
                  target={s.target}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="glow-text font-display text-4xl font-semibold text-ink sm:text-5xl"
                />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
                  {s.label}
                </p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
