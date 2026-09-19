import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep">
        {eyebrow}
      </p>
      <h2 className="text-balance font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-ink-dim">{description}</p>
      )}
    </Reveal>
  );
}
