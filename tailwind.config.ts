import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050a12",
        "bg-2": "#090f1c",
        surface: "rgba(255,255,255,0.04)",
        "surface-hover": "rgba(255,255,255,0.07)",
        border: "rgba(255,255,255,0.08)",
        "border-glow": "rgba(0,229,255,0.35)",
        cyan: {
          DEFAULT: "#00e5ff",
          dim: "rgba(0,229,255,0.12)",
          mid: "rgba(0,229,255,0.25)",
        },
        violet: {
          DEFAULT: "#7c3aed",
          dim: "rgba(124,58,237,0.15)",
          light: "#a78bfa",
        },
        ink: {
          1: "#f0f4ff",
          2: "#8892aa",
          3: "#4f5a70",
        },
        signal: "#10dc5a",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(0,229,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.045) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,229,255,0.15)",
        "glow-lg": "0 20px 60px rgba(0,0,0,0.5)",
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
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
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
