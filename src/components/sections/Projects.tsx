"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1200px] px-[5%] py-28 border-t border-border">
      <SectionHeading number="03" title="Projects" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06} direction="up" className={project.featured ? "md:col-span-2" : ""}>
            <ProjectCard project={project} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn(
        "group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-border-glow hover:bg-surface-hover",
        project.featured && "border-cyan/15 bg-gradient-to-br from-cyan/[0.04] to-violet/[0.04]"
      )}
    >
      <motion.div
        variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1.15 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.18), transparent 70%)" }}
      />
      <motion.div
        variants={{ rest: { y: 0, boxShadow: "0 16px 50px rgba(0,0,0,0)" }, hover: { y: -6, boxShadow: "0 16px 50px rgba(0,0,0,0.4)" } }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col gap-3"
      >
        <span className="font-mono text-[0.72rem] tracking-[0.1em] text-cyan/60">
          {String(index).padStart(2, "0")}
        </span>

        <div className="flex items-start justify-between gap-4">
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
              <span className="absolute left-0 top-1.5 text-[0.7rem] text-cyan">▸</span>
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
