import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a call with Train & Scale or send us a message.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-white/5 px-6 pb-24 pt-40 sm:px-8 md:pb-32">
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep">
            Contact
          </p>
          <h1 className="text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl">
            Let&rsquo;s scale what you&rsquo;ve built.
          </h1>
          <p className="mt-5 max-w-md text-ink-dim">
            The fastest way to talk to us is to book a call directly — you&rsquo;ll
            walk through your offer, your goals, and exactly what we&rsquo;d install
            for your business.
          </p>

          <Link
            href="/book"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ground transition hover:bg-white"
          >
            Book Your Call
            <span aria-hidden="true">&rarr;</span>
          </Link>

          <dl className="mt-14 space-y-5 border-t border-white/10 pt-8 text-sm">
            <div>
              <dt className="text-ink-dim">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-ink transition hover:text-accent">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-surface p-7 sm:p-9">
            <h2 className="font-display text-xl font-medium">Send us a message</h2>
            <p className="mt-2 text-sm text-ink-dim">
              Prefer to write it out first? Drop your details and we&rsquo;ll follow
              up personally.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
