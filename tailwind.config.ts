import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0908",
        surface: "#121110",
        line: "#26221d",
        ink: "#f4efe4",
        muted: "#9a9187",
        blood: {
          DEFAULT: "#c81111",
          bright: "#e11d1d",
          deep: "#7d0a0a",
        },
        bronze: {
          DEFAULT: "#c8a24b",
          light: "#e3c785",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        shell: "1400px",
      },
      keyframes: {
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
