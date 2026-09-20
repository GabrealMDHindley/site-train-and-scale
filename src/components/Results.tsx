import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import KineticText from "./KineticText";
import { Stagger, StaggerItem } from "./Stagger";
import Tilt from "./Tilt";
import VimeoEmbed from "./VimeoEmbed";
import { testimonials, testimonialsReel } from "@/data/site";

export default function Results() {
  return (
    <section id="results" className="border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Results"
          title="Our clients speak for us"
        />

        {testimonialsReel.vimeoId && (
          <div className="mx-auto mt-12 max-w-3xl">
            <KineticText
              as="p"
              text={testimonialsReel.title}
              className="mb-4 text-center font-display text-lg font-medium text-ink"
            />
            <Reveal delay={0.15}>
              <VimeoEmbed vimeoId={testimonialsReel.vimeoId} title={testimonialsReel.title} />
            </Reveal>
          </div>
        )}

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <Tilt className="glass-card h-full overflow-hidden">
                {t.vimeoId && (
                  <VimeoEmbed
                    vimeoId={t.vimeoId}
                    title={`${t.name} — client testimonial`}
                    className="rounded-none border-0 border-b border-white/10"
                  />
                )}
                <div className="p-8">
                  <p className="glow-text mono-num text-2xl font-medium text-accent sm:text-3xl">
                    {t.stat}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-dim">{t.quote}</p>
                  <p className="mt-6 font-display text-sm font-medium text-ink">
                    — {t.name}
                  </p>
                </div>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
