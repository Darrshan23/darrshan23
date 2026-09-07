"use client";

import { animated, useSpring } from "@react-spring/web";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

export function TerminalWindow({
  title = "visitor@dem:~",
  children,
  className,
  tilt = true,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [spring, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    config: { mass: 1, tension: 220, friction: 20 },
  }));

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt || reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    api.start({ rotateX: py * -4, rotateY: px * 6 });
  }

  function handleMouseLeave() {
    api.start({ rotateX: 0, rotateY: 0 });
  }

  return (
    <animated.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: spring.rotateX.to(
          (rx) => `perspective(900px) rotateX(${rx}deg) rotateY(${spring.rotateY.get()}deg)`
        ),
      }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-green/20 bg-[#040706]/90 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-green/10 bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 truncate font-mono text-[0.72rem] text-ink-2">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </animated.div>
  );
}
