import Depth from "./Depth";
import { guarantee } from "@/data/site";

export default function Guarantee() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 50%, rgba(79,143,247,0.14) 0%, rgba(5,7,10,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
        <Depth>
          <div className="glass-card px-8 py-14 text-center sm:px-16 sm:py-20">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep">
              The Guarantee
            </p>
            <h2 className="glow-text text-balance font-display text-3xl font-medium leading-tight sm:text-5xl">
              {guarantee.headline}
            </h2>
            <p className="mt-5 text-balance text-ink-dim">{guarantee.sub}</p>
            <p className="mx-auto mt-8 max-w-lg text-balance text-xs text-ink-dim/70">
              {guarantee.disclaimer}
            </p>
          </div>
        </Depth>
      </div>
    </section>
  );
}
