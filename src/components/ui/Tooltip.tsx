"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={150} skipDelayDuration={200}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export function InfoTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={8}
          className="z-[150] max-w-[220px] rounded-md border border-green/25 bg-[#040706] px-3 py-1.5 font-mono text-[0.7rem] text-green shadow-glow"
        >
          {label}
          <TooltipPrimitive.Arrow className="fill-[#040706]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
