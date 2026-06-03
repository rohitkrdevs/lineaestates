import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        bone: "var(--bone)",
        champagne: "var(--champagne)",
        smoke: "var(--smoke)"
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "Avenir Next", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.32)"
      }
    }
  },
  plugins: []
};

export default config;
