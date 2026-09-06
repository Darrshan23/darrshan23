"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

type LenisContextValue = {
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
};

const LenisContext = createContext<LenisContextValue>({
  scrollTo: (target) => {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  },
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo: LenisContextValue["scrollTo"] = (target, offset = -88) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>;
}
