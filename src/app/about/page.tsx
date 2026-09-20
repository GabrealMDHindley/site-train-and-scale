import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import KineticText from "@/components/KineticText";
import Eyebrow from "@/components/Eyebrow";
import { Stagger, StaggerItem } from "@/components/Stagger";
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
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep">
            <Eyebrow text="About Train & Scale" immediate origin="left" />
          </p>
          <KineticText
            as="h1"
            immediate
            delay={0.1}
            text={site.mission}
            className="text-balance font-display text-4xl font-medium leading-[1.08] sm:text-6xl"
          />
        </div>
      </section>

      <section className="border-b border-white/5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 sm:px-8 md:grid-cols-2">
          <div>
            <KineticText
              as="h2"
              text="A team, not a template"
              className="font-display text-2xl font-medium sm:text-3xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-4 text-ink-dim">
                Train & Scale doesn&rsquo;t hand agencies, coaches, and consultants a
                playbook and wish them luck. We install the whole system — the offer,
                the funnel, the CRM, the content, the outreach, and the people who run
                it — and we staff, train, and manage every part of it ourselves for the
                length of your engagement.
              </p>
            </Reveal>
          </div>
          <div>
            <KineticText
              as="h2"
              text="Why the guarantee exists"
              delay={0.08}
              className="font-display text-2xl font-medium sm:text-3xl"
            />
            <Reveal delay={0.28}>
              <p className="mt-4 text-ink-dim">{guarantee.headline}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="What's Installed"
            title="Seven packages, each a real service agreement"
            description="The exact mix — organic only, paid ads, setting, closing, or both — is scoped to your business on your onboarding call."
          />
          <Stagger as="ul" className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2" stagger={0.06}>
            {packages.map((p) => (
              <StaggerItem
                as="li"
                key={p.id}
                className="flex items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-ground/50 px-5 py-4 text-sm"
              >
                <span className="text-ink">{p.label}</span>
                <span className="shrink-0 font-mono text-xs text-ink-dim">
                  {p.subtitle}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3}>
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
