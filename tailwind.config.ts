import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de marca Herbalvarez: verde bosque + oro + negro-oliva
        bg: "#0c0c05",
        surface: "#14180f",
        line: "#333a22",
        ink: "#f7f1da",
        muted: "#a99f80",
        green: {
          DEFAULT: "#163322",
          deep: "#0e2116",
          olive: "#454c2d",
          light: "#93b17e",
        },
        gold: {
          DEFAULT: "#e5c67e",
          light: "#f0dc9f",
          deep: "#8a6e4a",
          cream: "#f9f2cc",
        },
        ruby: {
          DEFAULT: "#9e2a2b",
          bright: "#bd3b3c",
          deep: "#5e1516",
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
