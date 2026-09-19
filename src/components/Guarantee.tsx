import Reveal from "./Reveal";
import { guarantee } from "@/data/site";

export default function Guarantee() {
  return (
    <section className="border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep">
            The Guarantee
          </p>
          <h2 className="text-balance font-display text-3xl font-medium leading-tight sm:text-5xl">
            {guarantee.headline}
          </h2>
          <p className="mt-5 text-balance text-ink-dim">{guarantee.sub}</p>
          <p className="mx-auto mt-8 max-w-lg text-balance text-xs text-ink-dim/70">
            {guarantee.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
