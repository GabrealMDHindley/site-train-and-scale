import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FinalCta from "@/components/FinalCta";
import { guarantee, packages, site } from "@/data/site";

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
            title="Seven packages, each a real service agreement"
            description="The exact mix — organic only, paid ads, setting, closing, or both — is scoped to your business on your onboarding call."
          />
          <Reveal className="mt-12">
            <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
              {packages.map((p) => (
                <li
                  key={p.id}
                  className="flex items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-ground px-5 py-4 text-sm"
                >
                  <span className="text-ink">{p.label}</span>
                  <span className="shrink-0 font-mono text-xs text-ink-dim">
                    {p.subtitle}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link
                href="/#installs"
                className="text-sm text-accent underline underline-offset-4 transition hover:text-white"
              >
                See the full breakdown for each package →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
