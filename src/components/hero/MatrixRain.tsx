"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const GLYPHS =
  "アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&";

export function MatrixRain({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 15;
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let lastFrame = 0;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      columns = Math.floor(canvas!.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    }

    function draw(time: number) {
      raf = requestAnimationFrame(draw);
      if (time - lastFrame < 55) return;
      lastFrame = time;

      ctx!.fillStyle = "rgba(5, 8, 7, 0.16)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${fontSize}px var(--font-jetbrains), monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx!.fillStyle = Math.random() > 0.94 ? "#c8ffe0" : "rgba(0, 255, 102, 0.75)";
        ctx!.fillText(char, x, y);

        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ opacity }}
    />
  );
}
