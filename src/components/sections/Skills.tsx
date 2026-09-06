"use client";

import { type MouseEvent, useRef } from "react";
import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1200px] px-[5%] py-28 border-t border-border">
      <SectionHeading number="02" title="Technical Skills" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 0.05}
            className={cn(
              "lg:col-span-6",
              group.size === "wide" && "sm:col-span-2 lg:col-span-12",
              group.size === "tall" && "lg:col-span-6"
            )}
          >
            <SkillCard group={group} glow={group.size === "wide"} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillCard({ group, glow }: { group: (typeof skillGroups)[number]; glow?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-glow hover:bg-surface-hover hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
        glow && "border-cyan/[0.12] bg-gradient-to-br from-cyan/[0.04] to-violet/[0.04]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,229,255,0.08), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="mb-3 text-2xl">{group.icon}</div>
        <h4 className="mb-4 font-mono text-sm font-bold uppercase tracking-wide text-ink-1">
          {group.title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-[0.78rem] text-ink-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/25 hover:bg-cyan/10 hover:text-cyan"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
