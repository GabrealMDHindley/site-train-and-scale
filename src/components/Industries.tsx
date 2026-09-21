import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Stagger";
import Tilt from "./Tilt";
import { industries } from "@/data/site";

export default function Industries() {
  return (
    <section className="border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Who We Work With"
          title="Built for high-ticket businesses — whatever you sell"
          description="These are the industries we work with most. Don't see yours? Book a call and we'll tell you honestly whether we're a fit."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {industries.map((group) => (
            <StaggerItem key={group.category} className="h-full">
              <Tilt className="glass-card flex h-full flex-col gap-2 p-6">
                <h3 className="font-display text-base font-medium text-ink">
                  {group.category}
                </h3>
                <p className="text-sm leading-relaxed text-ink-dim">
                  {group.examples.join(", ")} &amp; more
                </p>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
