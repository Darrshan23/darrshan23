"use client";

import { useEffect, useState } from "react";

export function TypedRoles({ roles }: { roles: string[] }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const current = roles[phraseIdx];
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = false;
          timeout = setTimeout(() => {
            deleting = true;
            tick();
          }, 2200);
          return;
        }
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % roles.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 45 : 85);
    }

    timeout = setTimeout(tick, 900);
    return () => clearTimeout(timeout);
  }, [roles]);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[1.05rem] text-ink-2">
      <span className="text-[0.7rem] text-green">•</span>
      <span className="font-medium text-ink-1">{text}</span>
      <span className="animate-blink text-green">|</span>
    </span>
  );
}
