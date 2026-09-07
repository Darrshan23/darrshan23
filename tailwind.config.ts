import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern:
        /^(bg|text|border|ring|fill|stroke)-(emerald|green|teal|cyan|slate|gray)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050807",
        "bg-2": "#080c0a",
        surface: "rgba(0,255,102,0.035)",
        "surface-hover": "rgba(0,255,102,0.065)",
        border: "rgba(0,255,102,0.12)",
        "border-glow": "rgba(0,255,102,0.4)",
        green: {
          DEFAULT: "#00ff66",
          dim: "rgba(0,255,102,0.12)",
          mid: "rgba(0,255,102,0.28)",
          bright: "#7CFFB2",
        },
        cyan: {
          DEFAULT: "#00e5ff",
          dim: "rgba(0,229,255,0.12)",
          mid: "rgba(0,229,255,0.25)",
        },
        violet: {
          DEFAULT: "#a855f7",
          dim: "rgba(168,85,247,0.15)",
          light: "#c9a9ff",
        },
        amber: {
          DEFAULT: "#ffb800",
          dim: "rgba(255,184,0,0.12)",
        },
        danger: "#ff3b3b",
        ink: {
          1: "#eafff1",
          2: "#7fa88f",
          3: "#3f5749",
        },
        signal: "#10dc5a",
        // Tremor's own token names, redefined to our dark/green palette so its
        // components render in-theme without needing a separate light/dark toggle.
        tremor: {
          brand: {
            faint: "rgba(0,255,102,0.06)",
            muted: "rgba(0,255,102,0.18)",
            subtle: "rgba(0,255,102,0.4)",
            DEFAULT: "#00ff66",
            emphasis: "#7cffb2",
            inverted: "#050807",
          },
          background: {
            muted: "#070b09",
            subtle: "#0a0f0c",
            DEFAULT: "#050807",
            emphasis: "#c9ffe0",
          },
          border: { DEFAULT: "rgba(0,255,102,0.14)" },
          ring: { DEFAULT: "rgba(0,255,102,0.14)" },
          content: {
            subtle: "#3f5749",
            DEFAULT: "#7fa88f",
            emphasis: "#d7ffe8",
            strong: "#eafff1",
            inverted: "#050807",
          },
        },
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(0,255,102,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.05) 1px, transparent 1px)",
        scanlines:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,255,102,0.18)",
        "glow-lg": "0 20px 60px rgba(0,0,0,0.6)",
        "glow-cyan": "0 0 40px rgba(0,229,255,0.18)",
        "tremor-input": "0 1px 2px 0 rgba(0,0,0,0.4)",
        "tremor-card": "0 1px 3px 0 rgba(0,0,0,0.5), 0 1px 2px -1px rgba(0,0,0,0.4)",
        "tremor-dropdown": "0 4px 6px -1px rgba(0,0,0,0.5), 0 2px 4px -2px rgba(0,0,0,0.4)",
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scan: {
          "0%": { backgroundPosition: "0 -100vh" },
          "100%": { backgroundPosition: "0 100vh" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.6" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.8" },
          "97%": { opacity: "1" },
        },
        "glitch-a": {
          "0%, 94%, 100%": { transform: "translate(0,0)", opacity: "0" },
          "95%": { transform: "translate(-2px,1px)", opacity: "0.8" },
          "96%": { transform: "translate(2px,-1px)", opacity: "0.8" },
          "97%": { transform: "translate(0,0)", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        flicker: "flicker 6s linear infinite",
        "glitch-a": "glitch-a 4s linear infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
