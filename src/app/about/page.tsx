import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FinalCta from "@/components/FinalCta";
import { guarantee, installs, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.mission} Learn how Train & Scale installs and runs your client-acquisition system.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/5 px-6 pb-20 pt-40 sm:px-8 md:pb-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep">
              About Train &amp; Scale
            </p>
            <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] sm:text-6xl">
              {site.mission}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 sm:px-8 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              A team, not a template
            </h2>
            <p className="mt-4 text-ink-dim">
              Train & Scale doesn&rsquo;t hand agencies, coaches, and consultants a
              playbook and wish them luck. We install the whole system — the offer,
              the funnel, the CRM, the content, the outreach, and the people who run
              it — and we staff, train, and manage every part of it ourselves for the
              length of your engagement.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              Why the guarantee exists
            </h2>
            <p className="mt-4 text-ink-dim">{guarantee.headline}</p>
            <p className="mt-3 text-sm text-ink-dim/80">{guarantee.disclaimer}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/5 bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="What's Installed"
            title="Every engagement is built around the same core system"
            description="The exact mix — organic only, paid ads, setting, closing, or both — is scoped to your business on your onboarding call."
          />
          <Reveal className="mt-12">
            <ul className="mx-auto grid max-w-3xl gap-x-10 gap-y-3 text-sm text-ink-dim sm:grid-cols-2">
              {installs.map((tile) => (
                <li key={tile.title} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-deep/70" />
                  {tile.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
