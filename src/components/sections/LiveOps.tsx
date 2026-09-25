"use client";

import { BarList, Card, Metric, Text } from "@tremor/react";
import { useState } from "react";
import { certifications } from "@/data/education";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const toolCount = new Set(skillGroups.flatMap((g) => g.items)).size;

const barListData = [...skillGroups]
  .map((g) => ({ name: g.title, value: g.items.length }))
  .sort((a, b) => b.value - a.value);

// Group certs by year, sorted oldest → newest
const certsByYear: Record<string, typeof certifications> = {};
for (const cert of certifications) {
  const year = cert.date.split(" ").at(-1) ?? "Unknown";
  if (!certsByYear[year]) certsByYear[year] = [];
  certsByYear[year].push(cert);
}
const years = Object.keys(certsByYear).sort();
const maxPerYear = Math.max(...years.map((y) => certsByYear[y].length));

const COLORS = [
  "#22d3a5", // teal-green
  "#34d399", // emerald
  "#4ade80", // green
  "#86efac", // lighter green
  "#6ee7b7", // medium teal
];

export function LiveOps() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stats" className="mx-auto max-w-[1200px] px-[5%] py-20 border-t border-border">
      <Reveal className="mb-10">
        <p className="mb-2 font-mono text-[0.78rem] text-ink-3">
          <span className="text-green">root@dem</span>
          <span>:~$ ./stats.sh --summary</span>
        </p>
        <h2 className="text-[clamp(1.4rem,2.6vw,1.8rem)] font-bold tracking-tight text-ink-1">
          Capability Index
        </h2>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.08}>
        <RevealItem>
          <StatCard label="Certifications & badges" value={certifications.length} />
        </RevealItem>
        <RevealItem>
          <StatCard label="Security tools & platforms tracked" value={toolCount} />
        </RevealItem>
        <RevealItem>
          <StatCard label="Roles in security operations" value={experience.length} />
        </RevealItem>
      </RevealGroup>

      {/* Certification Activity Map */}
      <Reveal delay={0.15} className="mt-5">
        <Card className="!rounded-2xl !border-tremor-border !bg-tremor-background-muted !p-6 !shadow-none">
          <div className="flex items-center justify-between mb-4">
            <Text className="!font-mono !text-[0.72rem] !uppercase !tracking-wide !text-tremor-content">
              Credential activity by year
            </Text>
            <Text className="!font-mono !text-[0.68rem] !text-tremor-content-subtle">
              {certifications.length} total
            </Text>
          </div>

          <div className="flex items-end gap-3 sm:gap-5">
            {years.map((year) => {
              const certs = certsByYear[year];
              return (
                <div key={year} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  {/* Dot stack — each dot = 1 cert */}
                  <div
                    className="flex flex-col-reverse gap-[5px] items-center w-full"
                    style={{ minHeight: `${maxPerYear * 22}px` }}
                  >
                    {certs.map((cert, i) => {
                      const tipKey = `${year}-${i}`;
                      const color = COLORS[i % COLORS.length];
                      return (
                        <div key={cert.name} className="relative group/dot w-full flex justify-center">
                          <div
                            className="h-[14px] w-full max-w-[54px] rounded-sm cursor-default transition-all duration-200 group-hover/dot:scale-110 group-hover/dot:brightness-125"
                            style={{ backgroundColor: color, opacity: 0.75 + (i / certs.length) * 0.25 }}
                            onMouseEnter={() => setHovered(tipKey)}
                            onMouseLeave={() => setHovered(null)}
                          />
                          {/* Tooltip */}
                          {hovered === tipKey && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-max max-w-[200px] rounded-lg border border-border bg-surface px-3 py-2 shadow-xl pointer-events-none">
                              <p className="text-[0.73rem] font-semibold text-ink-1 leading-tight">{cert.name}</p>
                              <p className="mt-0.5 font-mono text-[0.65rem] text-green">{cert.issuer} · {cert.date}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Year label + count */}
                  <div className="text-center">
                    <p className="font-mono text-[0.72rem] font-bold text-ink-1">{year}</p>
                    <p className="font-mono text-[0.62rem] text-ink-3">{certs.length} cert{certs.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.2} className="mt-5">
        <Card className="!rounded-2xl !border-tremor-border !bg-tremor-background-muted !p-6 !shadow-none">
          <Text className="!font-mono !text-[0.72rem] !uppercase !tracking-wide !text-tremor-content">
            Skill domains by tool count
          </Text>
          <BarList data={barListData} color="emerald" className="mt-4" />
        </Card>
      </Reveal>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="!rounded-2xl !border-tremor-border !bg-tremor-background-muted !p-6 !shadow-none">
      <Text className="!font-mono !text-[0.7rem] !uppercase !tracking-wide !text-tremor-content">
        {label}
      </Text>
      <Metric className="!mt-1 !font-mono !text-tremor-content-strong">{value}</Metric>
    </Card>
  );
}
