"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1200px] px-[5%] py-28 border-t border-border">
      <SectionHeading number="01" title="Work Experience" />

      <div className="relative pl-8">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-green/25 via-violet/15 to-transparent" />

        {experience.map((item, i) => (
          <Reveal key={item.company} direction={i % 2 === 0 ? "left" : "right"} className="relative mb-10 last:mb-0">
            <TimelineDot />
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-colors duration-300 hover:border-border-glow hover:bg-surface-hover hover:shadow-[0_8px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,255,102,0.1)]"
            >
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-green via-violet to-transparent transition-transform duration-300 group-hover:scale-x-100" />

              <div className="mb-5 flex flex-wrap items-center gap-5">
                {item.logo ? (
                  <div className="h-[52px] w-[52px] flex-shrink-0 overflow-hidden rounded-xl border border-border bg-white p-1">
                    <Image src={item.logo} alt={item.company} width={52} height={52} className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-[#4c1d95] text-sm font-bold text-white">
                    {item.logoInitials}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-[1.1rem] font-bold tracking-tight text-ink-1">{item.role}</h3>
                  <p className="text-sm font-semibold text-green">
                    {item.company}
                    {item.location ? ` — ${item.location}` : ""}
                  </p>
                  <span className="font-mono text-[0.78rem] text-ink-3">{item.date}</span>
                </div>
                {item.current && (
                  <span className="flex-shrink-0 rounded-full border border-signal/30 bg-signal/10 px-3.5 py-1.5 text-xs font-semibold text-signal">
                    Current
                  </span>
                )}
              </div>

              <ul className="space-y-3">
                {item.bullets.map((b) => (
                  <li key={b.label} className="relative pl-6 text-[0.925rem] leading-relaxed text-ink-2">
                    <span className="absolute left-0 top-1 text-[0.7rem] text-green">▸</span>
                    <strong className="font-semibold text-ink-1">{b.label}:</strong> {b.text}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-green/15 bg-green/10 px-2.5 py-1 font-mono text-[0.72rem] text-green"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TimelineDot() {
  return (
    <span className="absolute -left-[2.55rem] top-6 h-3 w-3 rounded-full border-2 border-green bg-bg shadow-[0_0_10px_rgba(0,255,102,0.5)]" />
  );
}
