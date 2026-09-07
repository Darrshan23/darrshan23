# Developing this portfolio

Technical notes for working on the Next.js app in this repo. (`README.md` is the GitHub
profile page shown at [github.com/Darrshan23](https://github.com/Darrshan23) — this file is
for anyone building or contributing to the code.)

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | File-based routing, a route handler for the contact API. |
| Styling | Tailwind CSS | Design tokens (`tailwind.config.ts`) mirror the original site's CSS variables. |
| 3D hero | React Three Fiber + drei + postprocessing | A reactive particle constellation + a distorted, bloom-lit icosahedron core, parallaxing with the pointer. Disabled under `prefers-reduced-motion`, scaled down on mobile. |
| Motion | Framer Motion | Scroll-triggered reveals, staggered lists, hover/tap micro-interactions, animated form states. |
| Smooth scroll | Lenis | Inertial scrolling synced with the scroll progress bar; disabled under reduced motion. |
| Forms | react-hook-form + zod | Client-side validation with a schema shared with the API route. |
| Email delivery | Resend (Next.js Route Handler) | `POST /api/contact` validates and sends mail. Without `RESEND_API_KEY` it returns `503` and the UI falls back to a pre-filled `mailto:` link. |
| Text/scroll FX | GSAP + ScrambleTextPlugin | Terminal-style decrypt/scramble text reveals (boot sequence, headings, hero name). Framer Motion owns component enter/exit and hover/tap; GSAP is scoped to scramble-text only, so the two never fight over the same properties. |
| Headless UI | Radix UI (Dialog, Tooltip) | Accessible, unstyled primitives skinned as terminal windows — the project detail modal and cert-name tooltips. This is the same foundation shadcn/ui is built on. |
| Dashboard widgets | Tremor | The "Capability Index" panel (cert timeline tracker, skill-domain bar list) — all numbers are derived live from `src/data/*`, never hardcoded. |
| List transitions | @formkit/auto-animate | Smooth FLIP animation when the certifications grid is filtered by issuer. |
| Tilt effect | @react-spring/web | A single contained use: the 3D tilt-on-hover for `TerminalWindow`. |
| Icons | lucide-react | |

Aceternity UI / Magic UI / React Bits are not npm runtime dependencies here — they're copy-paste effect recipes, so their signature patterns (terminal window chrome, spotlight, decrypted text, animated border beam, matrix rain) are hand-built in `src/components/ui` and `src/components/hero` using the stack above, which is how those libraries are meant to be consumed anyway. Full competing component systems (MUI, Chakra UI, Mantine, Ant Design, HeroUI, DaisyUI, Park UI) were deliberately left out — stacking multiple theme engines/CSS runtimes in one app fights itself (bundle bloat, conflicting resets, no coherent visual language) rather than helping.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
```

### Contact form email delivery

The contact form works out of the box with a `mailto:` fallback. To have it actually send mail:

1. Create a free account at [resend.com](https://resend.com) and grab an API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` (and optionally `CONTACT_FROM`
   once you've verified a sending domain in Resend).
3. Restart the dev server / redeploy.

## Project structure

```
src/
  app/
    layout.tsx          Root layout: fonts, Preloader, ScrollProgress, Navbar, Footer
    page.tsx             Composes Hero + all sections
    globals.css          Tailwind entry + Lenis/scrollbar/selection base styles
    api/contact/route.ts Contact form email handler (Resend, graceful no-key fallback)
  components/
    hero/                HeroScene (R3F canvas), ParticleNetwork, CoreNode, TypedRoles, Hero
    layout/               Navbar, Footer, SmoothScrollProvider (Lenis), Preloader,
                          ScrollProgress, NoiseOverlay
    sections/             Experience, Skills, Projects, Education, Contact
    ui/                   Reveal/RevealGroup (scroll-triggered motion), SectionHeading,
                          MagneticButton
  data/                   Typed content: profile, experience, skills, projects, education
  hooks/                  useActiveSection, useMousePosition, useReducedMotion/useIsMobile
  lib/                    cn() class helper, contact-schema (zod)
public/
  images/                 Company/cert logos + profile photo
  Darrshan_Erettai_Muniandy_Resume.pdf
legacy/                   The original static HTML/CSS/JS site, kept for reference
```

## Performance & accessibility notes

- The R3F scene is `next/dynamic`-imported with `ssr: false` and only mounts client-side.
- `prefers-reduced-motion: reduce` disables the 3D scene, Lenis smooth scrolling, and collapses
  all CSS transitions/animations to near-zero duration.
- Particle count, device pixel ratio, and bloom post-processing are all reduced/disabled below
  the `md` breakpoint to protect mobile frame rate.
- All scroll reveals use `whileInView` with `viewport={{ once: true }}` so they don't re-trigger
  and don't block initial paint.

## Deployment

This app needs a Node runtime for `/api/contact` (a Route Handler), so it's deployed on
**Vercel** (https://darrshan23.vercel.app/) rather than static GitHub Pages hosting — push to
`main` and Vercel redeploys automatically. No configuration needed beyond the optional
`RESEND_API_KEY` env var.
