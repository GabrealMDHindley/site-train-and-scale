import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import VimeoEmbed from "./VimeoEmbed";
import { testimonials } from "@/data/site";

export default function Results() {
  return (
    <section id="results" className="border-t border-white/5 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Results"
          title="Our clients speak for us"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className="overflow-hidden rounded-2xl border border-white/10 bg-ground"
            >
              {t.vimeoId && (
                <VimeoEmbed
                  vimeoId={t.vimeoId}
                  title={`${t.name} — client testimonial`}
                  className="rounded-none border-0 border-b border-white/10"
                />
              )}
              <div className="p-8">
                <p className="mono-num text-2xl font-medium text-accent sm:text-3xl">
                  {t.stat}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-dim">{t.quote}</p>
                <p className="mt-6 font-display text-sm font-medium text-ink">
                  — {t.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
