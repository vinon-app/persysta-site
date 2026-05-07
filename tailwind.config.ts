import type { Config } from "tailwindcss";

/**
 * Persysta marketing site — paleta corporate (slate + amber accent).
 * Distinta dos produtos (Stores usa wine, Finanças tem sua própria paleta).
 *
 * Quando o user escolher cor oficial Persysta, atualizar aqui.
 */
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
      },
      fontFamily: {
        serif: ['"Newsreader"', "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
