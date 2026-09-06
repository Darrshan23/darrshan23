"use client";

import Image from "next/image";
import { education, certifications } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-[1200px] px-[5%] py-28 border-t border-border">
      <SectionHeading number="04" title="Education & Certifications" />

      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.08}>
            <div className="flex h-full items-start gap-5 rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-glow hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl border border-cyan/15 bg-cyan/10 text-2xl">
                {edu.icon}
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold tracking-tight text-ink-1">{edu.school}</h3>
                <p className="mb-1 text-sm font-semibold text-cyan">{edu.degree}</p>
                <p className="mb-3 font-mono text-xs text-ink-3">{edu.period}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.scores.map((score) => (
                    <span
                      key={score}
                      className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 font-mono text-[0.8rem] font-bold text-cyan"
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

      <Reveal>
        <h3 className="mb-8 text-[1.3rem] font-semibold tracking-tight text-ink-1">
          Certifications &amp; Licenses
        </h3>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
        {certifications.map((cert) => (
          <RevealItem key={cert.name}>
            <div className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:translate-x-1 hover:border-border-glow hover:bg-surface-hover hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <span className="absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-gradient-to-b from-cyan to-violet transition-transform duration-300 group-hover:scale-y-100" />
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5">
                <Image src={cert.logo} alt={cert.issuer} width={36} height={36} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.82rem] font-semibold leading-tight text-ink-1">{cert.name}</p>
                <p className="font-mono text-[0.7rem] font-medium text-cyan">{cert.issuer}</p>
                <p className="font-mono text-[0.68rem] text-ink-3">{cert.date}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
