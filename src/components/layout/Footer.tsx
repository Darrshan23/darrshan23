import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-2 px-[5%] py-12 text-center">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-3 font-mono text-xl font-semibold text-ink-1">
          <span className="text-green">&lt;</span>DEM<span className="text-green">/&gt;</span>
        </div>
        <p className="text-sm text-ink-3">Built with intention. Secured by design.</p>
        <p className="mt-4 text-[0.78rem] text-ink-3">
          © {new Date().getFullYear()} {profile.name} · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
