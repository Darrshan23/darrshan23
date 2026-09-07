import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  duration = 6,
  colorFrom = "#00ff66",
  colorTo = "#00e5ff",
}: {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)}
    >
      <div
        className="absolute inset-0 rounded-[inherit] p-px [mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 8%, ${colorTo} 16%, transparent 26%)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}
