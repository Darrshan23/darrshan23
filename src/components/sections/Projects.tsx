"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useState } from "react";
import { type Project, projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { cn } from "@/lib/utils";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-[5%] py-28 border-t border-border">
      <SectionHeading number="03" title="Projects" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06} direction="up" className={project.featured ? "md:col-span-2" : ""}>
            <ProjectCard project={project} index={i + 1} onExpand={() => setActive(project)} />
          </Reveal>
        ))}
      </div>

      <Dialog.Root open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[190] bg-black/70 backdrop-blur-sm data-[state=open]:animate-[overlay-in_0.2s_ease-out]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[191] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-[dialog-in_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            {active && (
              <TerminalWindow title={`cat ${active.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.log`} tilt={false}>
                <Dialog.Title className="mb-1 text-[1.15rem] font-bold text-ink-1">
                  {active.title}
                </Dialog.Title>
                <Dialog.Description className="mb-4 font-mono text-xs text-ink-3">
                  {active.date}
                </Dialog.Description>
                <p className="mb-4 text-sm leading-relaxed text-ink-2">{active.description}</p>
                <ul className="mb-4 space-y-2">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-5 text-[0.875rem] leading-relaxed text-ink-2">
                      <span className="absolute left-0 top-1.5 text-[0.7rem] text-green">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-violet/25 bg-violet/[0.15] px-2.5 py-1 font-mono text-[0.7rem] text-violet-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TerminalWindow>
            )}
            <Dialog.Close className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full border border-green/25 bg-[#040706] text-ink-1 transition-colors hover:border-green/50 hover:text-green">
              <X size={15} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onExpand,
}: {
  project: Project;
  index: number;
  onExpand: () => void;
}) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn(
        "group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-border-glow hover:bg-surface-hover",
        project.featured && "border-green/15 bg-gradient-to-br from-green/[0.04] to-violet/[0.04]"
      )}
    >
      <motion.div
        variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1.15 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,255,102,0.18), transparent 70%)" }}
      />

      <button
        onClick={onExpand}
        aria-label={`Expand ${project.title}`}
        className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink-3 opacity-0 transition-all duration-200 hover:border-green/40 hover:text-green group-hover:opacity-100"
      >
        <Maximize2 size={14} />
      </button>

      <motion.div
        variants={{ rest: { y: 0, boxShadow: "0 16px 50px rgba(0,0,0,0)" }, hover: { y: -6, boxShadow: "0 16px 50px rgba(0,0,0,0.4)" } }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col gap-3"
      >
        <span className="font-mono text-[0.72rem] tracking-[0.1em] text-green/60">
          {String(index).padStart(2, "0")}
        </span>

        <div className="flex items-start justify-between gap-4 pr-8">
          <h3 className="text-[1.1rem] font-bold leading-snug tracking-tight text-ink-1">
            {project.title}
          </h3>
          <span className="flex-shrink-0 whitespace-nowrap font-mono text-[0.72rem] text-ink-3">
            {project.date}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-2">{project.description}</p>

        <ul className="flex-1 space-y-2">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="relative pl-5 text-[0.875rem] leading-relaxed text-ink-2">
              <span className="absolute left-0 top-1.5 text-[0.7rem] text-green">▸</span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-violet/25 bg-violet/[0.15] px-2.5 py-1 font-mono text-[0.7rem] text-violet-light"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
