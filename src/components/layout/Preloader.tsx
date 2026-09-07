"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

const LINES = [
  "initializing secure session...",
  "loading threat intel modules...",
  "authenticating credentials...",
  "access granted.",
];

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [skip, setSkip] = useState(false);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("dem-visited")) {
      setSkip(true);
      setVisible(false);
      return;
    }
    sessionStorage.setItem("dem-visited", "1");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setTimeout(() => setVisible(false), 400) });
      LINES.forEach((line, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        tl.to(
          el,
          {
            duration: 0.5,
            scrambleText: { text: line, chars: "01#$%&_/\\", speed: 0.4 },
            onStart: () => el.classList.remove("opacity-0"),
          },
          i * 0.42
        );
      });
    });

    return () => ctx.revert();
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
        >
          <motion.div
            exit={{ y: -20, opacity: 0 }}
            className="w-[min(90vw,420px)] rounded-lg border border-green/20 bg-[#040706] p-6 font-mono text-[0.8rem] shadow-glow"
          >
            <div className="mb-4 flex items-center gap-2 border-b border-green/10 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-ink-3">boot.sh</span>
            </div>
            {LINES.map((line, i) => (
              <p
                key={line}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`min-h-[1.4em] opacity-0 transition-opacity ${
                  i === LINES.length - 1 ? "text-green" : "text-ink-2"
                }`}
              />
            ))}
            <span className="mt-1 inline-block animate-blink text-green">▊</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
