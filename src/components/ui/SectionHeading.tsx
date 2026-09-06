import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <Reveal className="mb-14 flex items-baseline gap-4">
      <span className="font-mono text-sm tracking-[0.15em] text-cyan/70">{number}</span>
      <h2 className="relative text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-tight text-ink-1">
        {title}
        <span className="mt-2.5 block h-[3px] w-10 rounded-full bg-gradient-to-r from-cyan to-violet" />
      </h2>
    </Reveal>
  );
}
