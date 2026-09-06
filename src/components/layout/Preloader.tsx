"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = ["establishing secure session...", "loading threat intel modules...", "welcome."];

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("dem-visited")) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("dem-visited", "1");

    const stepTimers = LINES.map((_, i) =>
      setTimeout(() => setLineIdx(i), i * 380)
    );
    const closeTimer = setTimeout(() => setVisible(false), LINES.length * 380 + 400);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(closeTimer);
    };
  }, []);

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
            className="flex flex-col items-center gap-4"
          >
            <div className="font-mono text-2xl font-semibold tracking-tight text-ink-1">
              <span className="text-cyan">&lt;</span>DEM<span className="text-cyan">/&gt;</span>
            </div>
            <p className="h-4 font-mono text-xs tracking-wide text-cyan/80">
              {LINES[lineIdx]}
            </p>
            <div className="h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan to-violet-light"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: LINES.length * 0.38 + 0.3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
