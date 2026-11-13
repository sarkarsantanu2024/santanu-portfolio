/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#172033",
          deep: "#111827",
          soft: "#1B2538",
          card: "#1F2A3F",
          raised: "#283650",
          line: "#344362",
        },
        amber: {
          brand: "#38BDF8",
          warm: "#0EA5E9",
          deep: "#0284C7",
        },
        paper: {
          DEFAULT: "#F5F8FC",
          soft: "#FFFFFF",
          line: "#E2E8F0",
        },
        navy: {
          DEFAULT: "#111827",
          light: "#283650",
        },
        brand: {
          DEFAULT: "#38BDF8",
          dark: "#0284C7",
        },
        muted: {
          DEFAULT: "#71717A",
          dark: "#52525B",
        },
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(45, 46, 65, 0.08) 1px, transparent 0)",
        "dot-grid-dark":
          "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.06) 1px, transparent 0)",
      },
      backgroundSize: {
        "dot-grid": "22px 22px",
      },
    },
  },
  plugins: [],
};
