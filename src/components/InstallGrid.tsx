import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { installs } from "@/data/site";

export default function InstallGrid() {
  return (
    <section id="installs" className="border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="What We Install"
          title="A complete client-acquisition system, run for you"
          description="Every piece is built, staffed, and managed by our team — not handed to you as a template."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {installs.map((tile, i) => (
            <Reveal key={tile.title} delay={(i % 3) * 0.06} className="bg-surface p-7 sm:p-8">
              <span className="mono-num text-xs text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-medium sm:text-xl">
                {tile.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">
                {tile.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
