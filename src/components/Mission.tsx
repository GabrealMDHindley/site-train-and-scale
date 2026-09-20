import Depth from "./Depth";
import KineticText from "./KineticText";

export default function Mission() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
      <Depth>
        <KineticText
          as="p"
          stagger={0.03}
          text="Built for agencies, coaches, and consultants who are done building their pipeline alone — and ready to have setters, closers, content, and ads installed and run for them."
          className="text-balance font-display text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl"
        />
      </Depth>
    </section>
  );
}
