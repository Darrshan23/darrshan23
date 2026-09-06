"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { TypedRoles } from "@/components/hero/TypedRoles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
});

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  const { scrollTo } = useLenis();

  return (
    <header id="hero" className="relative isolate flex min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_42%,black_45%,transparent_100%)]">
        <HeroScene />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,58,237,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 15% 80%, rgba(0,229,255,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)] opacity-40" />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center gap-10 px-[5%] pb-16 pt-[calc(72px+2.5rem)] md:flex-row md:items-center md:justify-between md:gap-16 md:pt-[calc(72px+3rem)]">
        <div className="max-w-[640px] text-center md:text-left">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-3 font-mono text-sm uppercase tracking-[0.15em] text-cyan"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-5 text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink-1"
          >
            {profile.firstName}
            <br />
            <span className="bg-gradient-to-br from-cyan to-violet-light bg-clip-text text-transparent">
              {profile.lastName}
            </span>
          </motion.h1>

          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mb-7 flex justify-center md:justify-start">
            <TypedRoles roles={profile.roles} />
          </motion.div>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mb-8 max-w-[560px] text-[1.05rem] text-ink-2 md:mx-0"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-10 flex flex-wrap justify-center gap-2.5 md:justify-start"
          >
            <Badge icon={<MapPin size={14} />} text={profile.location} />
            <Badge icon={<Phone size={14} />} text={profile.phone} />
            <Badge icon={<Mail size={14} />} text={profile.email} />
          </motion.div>

          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 md:justify-start"
          >
            <MagneticButton
              as="a"
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan to-[#0af5c8] px-8 py-3.5 text-sm font-bold text-bg shadow-[0_4px_24px_rgba(0,229,255,0.3)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,229,255,0.45)]"
            >
              <Download size={16} />
              Download Resume
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={() => scrollTo("#experience")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-ink-1 transition-colors hover:border-border-glow hover:bg-surface"
            >
              View My Work
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-shrink-0 flex-col items-center"
        >
          <div className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[310px] md:w-[310px]">
            <div className="animate-[spin_20s_linear_infinite_reverse] absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet/25" />
            <div className="absolute left-1/2 top-1/2 h-[128%] w-[128%] -translate-x-1/2 -translate-y-1/2 animate-[spin_12s_linear_infinite] rounded-full border border-cyan/[0.12]" />
            <div className="group relative z-10 h-full w-full overflow-hidden rounded-full border-[3px] border-cyan/20 shadow-[0_0_0_8px_rgba(0,229,255,0.04),0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.04]">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="310px"
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-full border border-signal/20 bg-signal/[0.08] px-4 py-2 text-sm font-medium text-signal">
            <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-signal shadow-[0_0_8px_#10dc5a]" />
            Available for opportunities
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-3 sm:flex"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-ink-3 to-transparent" />
      </motion.div>
    </header>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-[0.8rem] text-ink-2 transition-colors hover:border-border-glow hover:bg-surface-hover hover:text-ink-1">
      <span className="text-cyan">{icon}</span>
      {text}
    </span>
  );
}
