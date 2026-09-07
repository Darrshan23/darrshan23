import { Reveal } from "@/components/ui/Reveal";
import { DecryptedText } from "@/components/ui/DecryptedText";

export function SectionHeading({
  number,
  title,
  command,
}: {
  number: string;
  title: string;
  command?: string;
}) {
  return (
    <Reveal className="mb-14">
      <p className="mb-2 font-mono text-[0.78rem] text-ink-3">
        <span className="text-green">root@dem</span>
        <span>:~$ </span>
        <span>{command ?? `cat ${title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.log`}</span>
      </p>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm tracking-[0.15em] text-green/70">{number}</span>
        <h2 className="relative text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-tight text-ink-1">
          <DecryptedText text={title} triggerOnView />
          <span className="mt-2.5 block h-[3px] w-10 rounded-full bg-gradient-to-r from-green to-violet" />
        </h2>
      </div>
    </Reveal>
  );
}
