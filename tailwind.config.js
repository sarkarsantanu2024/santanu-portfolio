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
          DEFAULT: "#2D2E41",
          deep: "#24253A",
          soft: "#363749",
          card: "#363749",
          raised: "#3E3F54",
          line: "#45465C",
        },
        amber: {
          brand: "#FFC93C",
          warm: "#F5B942",
          deep: "#E5A82D",
        },
        paper: {
          DEFAULT: "#F6F4EE",
          soft: "#FFFFFF",
          line: "#E5E2D8",
        },
        navy: {
          DEFAULT: "#24253A",
          light: "#3E3F54",
        },
        brand: {
          DEFAULT: "#FFC93C",
          dark: "#E5A82D",
        },
      },
    },
  },
  plugins: [],
};
