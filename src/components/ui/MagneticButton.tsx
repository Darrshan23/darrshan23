"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

const MotionButton = motion.create("button");
const MotionAnchor = motion.create("a");

export function MagneticButton({
  children,
  className,
  as = "button",
  ...props
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  [key: string]: any;
}) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const MotionComponent = as === "a" ? MotionAnchor : MotionButton;

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
