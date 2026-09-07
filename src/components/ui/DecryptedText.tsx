"use client";

import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#01";

type TagName = "span" | "p" | "div";

export function DecryptedText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  chars = DEFAULT_CHARS,
  triggerOnView = false,
}: {
  text: string;
  as?: TagName;
  className?: string;
  delay?: number;
  chars?: string;
  /** Play the scramble when scrolled into view instead of immediately on mount. */
  triggerOnView?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldPlay = !triggerOnView || inView;

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || !shouldPlay) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        duration: Math.min(2.2, Math.max(0.7, text.length * 0.045)),
        delay,
        ease: "none",
        scrambleText: { text, chars, speed: 0.35, revealDelay: 0 },
      });
    });

    return () => ctx.revert();
  }, [text, chars, delay, reducedMotion, shouldPlay]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
