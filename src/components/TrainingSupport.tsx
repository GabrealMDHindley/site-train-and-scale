import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { support } from "@/data/site";

export default function TrainingSupport() {
  return (
    <section className="border-t border-white/5 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Training & Support"
          title="You're never doing this alone"
        />

        <Reveal className="mt-14">
          <ul className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {support.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-ground p-5 text-sm text-ink-dim"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
