"use client";

import { BarList, Card, type Color, Metric, Text, Tracker } from "@tremor/react";
import { certifications } from "@/data/education";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const toolCount = new Set(skillGroups.flatMap((g) => g.items)).size;

const trackerData = [...certifications].reverse().map((cert, i) => ({
  key: cert.name,
  color: (i % 3 === 0 ? "emerald" : i % 3 === 1 ? "green" : "teal") as Color,
  tooltip: `${cert.name} — ${cert.issuer} (${cert.date})`,
}));

const barListData = [...skillGroups]
  .map((g) => ({ name: g.title, value: g.items.length }))
  .sort((a, b) => b.value - a.value);

export function LiveOps() {
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

      <Reveal delay={0.15} className="mt-5">
        <Card className="!rounded-2xl !border-tremor-border !bg-tremor-background-muted !p-6 !shadow-none">
          <Text className="!font-mono !text-[0.72rem] !uppercase !tracking-wide !text-tremor-content">
            Certification acquisition timeline
          </Text>
          {/* Tremor's Tracker opens a hover tooltip per block via floating-ui; on touch
              screens a scroll-drag across 16 adjacent blocks fires rapid enter/leave
              events and the tooltip flickers open/closed. Disabling pointer events
              below `sm` removes that interaction entirely (it was never a real "hover"
              on touch anyway) while keeping it on desktop. */}
          <div className="pointer-events-none sm:pointer-events-auto">
            <Tracker data={trackerData} className="mt-3" />
          </div>
          <Text className="mt-2 !text-[0.7rem] !text-tremor-content-subtle">
            <span className="hidden sm:inline">oldest → most recent, hover a block for details</span>
            <span className="sm:hidden">oldest → most recent</span>
          </Text>
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
