"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const NAV_ITEMS = [
  { id: "hero", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "education", label: "Education", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 30);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id: string) {
    setOpen(false);
    scrollTo(`#${id}`);
  }

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[100] flex h-[72px] items-center justify-between border-b border-transparent px-[5%] transition-all duration-400",
        scrolled &&
          "border-border bg-[rgba(5,10,18,0.85)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      )}
    >
      <button
        onClick={() => go("hero")}
        className="font-mono text-[1.3rem] font-semibold tracking-tight text-ink-1 transition-colors hover:text-cyan"
      >
        <span className="text-cyan">&lt;</span>DEM<span className="text-cyan">/&gt;</span>
      </button>

      <ul className="hidden items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => go(item.id)}
              className={cn(
                "group flex items-center rounded-lg px-3.5 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink-1",
                active === item.id && "text-cyan"
              )}
            >
              <span
                className={cn(
                  "mr-0 w-0 overflow-hidden font-mono text-[0.7rem] text-cyan opacity-0 transition-all duration-200 group-hover:mr-1.5 group-hover:w-4 group-hover:opacity-100",
                  active === item.id && "mr-1.5 w-4 opacity-100"
                )}
              >
                {item.index}
              </span>
              {item.label}
            </button>
          </li>
        ))}
        <li>
          <a
            href="/Darrshan_Erettai_Muniandy_Resume.pdf"
            download
            className="ml-3 inline-flex items-center rounded-full border border-cyan/35 bg-cyan/10 px-5 py-2 text-sm font-semibold text-cyan transition-all hover:-translate-y-0.5 hover:bg-cyan/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]"
          >
            Resume
          </a>
        </li>
      </ul>

      <button
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-ink-1 transition-colors hover:bg-surface-hover md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-[72px] flex flex-col gap-1 border-b border-border bg-[rgba(5,10,18,0.97)] px-[5%] pb-8 pt-6 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={cn(
                  "w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink-1",
                  active === item.id && "text-cyan"
                )}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Darrshan_Erettai_Muniandy_Resume.pdf"
              download
              className="mt-2 w-full rounded-lg border border-cyan/35 bg-cyan/10 px-4 py-3 text-center text-sm font-semibold text-cyan"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
