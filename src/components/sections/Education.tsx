"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { education, certifications } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { InfoTooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export function Education() {
  const issuers = useMemo(
    () => ["All", ...Array.from(new Set(certifications.map((c) => c.issuer)))],
    []
  );
  const [filter, setFilter] = useState("All");
  const [gridRef] = useAutoAnimate<HTMLDivElement>({ duration: 250 });

  const filtered =
    filter === "All" ? certifications : certifications.filter((c) => c.issuer === filter);

  return (
    <section id="education" className="mx-auto max-w-[1200px] px-[5%] py-28 border-t border-border">
      <SectionHeading number="04" title="Education & Certifications" />

      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.08}>
            <div className="flex h-full items-start gap-5 rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-glow hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl border border-green/15 bg-green/10 text-2xl">
                {edu.icon}
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold tracking-tight text-ink-1">{edu.school}</h3>
                <p className="mb-1 text-sm font-semibold text-green">{edu.degree}</p>
                <p className="mb-3 font-mono text-xs text-ink-3">{edu.period}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.scores.map((score) => (
                    <span
                      key={score}
                      className="rounded-full border border-green/20 bg-green/10 px-3 py-1 font-mono text-[0.8rem] font-bold text-green"
                    >
                      {score}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-[1.3rem] font-semibold tracking-tight text-ink-1">
          Certifications &amp; Licenses
        </h3>
        <div className="flex flex-wrap gap-2">
          {issuers.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setFilter(issuer)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[0.72rem] transition-colors",
                filter === issuer
                  ? "border-green/40 bg-green/15 text-green"
                  : "border-border text-ink-2 hover:border-green/25 hover:text-ink-1"
              )}
            >
              {issuer}
            </button>
          ))}
        </div>
      </Reveal>

      <RevealGroup
        ref={gridRef}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.04}
      >
        {filtered.map((cert) => (
          <RevealItem key={cert.name}>
            <div className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:translate-x-1 hover:border-border-glow hover:bg-surface-hover hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <span className="absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-gradient-to-b from-green to-violet transition-transform duration-300 group-hover:scale-y-100" />
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5">
                <Image src={cert.logo} alt={cert.issuer} width={36} height={36} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <InfoTooltip label={cert.name}>
                  <p className="cursor-default truncate text-[0.82rem] font-semibold leading-tight text-ink-1">
                    {cert.name}
                  </p>
                </InfoTooltip>
                <p className="font-mono text-[0.7rem] font-medium text-green">{cert.issuer}</p>
                <p className="font-mono text-[0.68rem] text-ink-3">{cert.date}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
