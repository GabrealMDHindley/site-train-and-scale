import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(79,143,247,0.18) 0%, rgba(5,7,10,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-medium leading-tight sm:text-5xl">
            Ready to have your pipeline built, staffed, and run for you?
          </h2>
          <p className="mt-5 text-ink-dim">
            Book a call and we&rsquo;ll walk you through exactly what gets installed
            for your business.
          </p>
          <a
            href={site.funnel.booking}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-ground transition hover:bg-white"
          >
            Book Your Call
            <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
