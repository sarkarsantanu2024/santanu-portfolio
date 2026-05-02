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
          DEFAULT: "#0E0E12",
          deep: "#08080B",
          soft: "#16161B",
          card: "#1A1A20",
          raised: "#232329",
          line: "#2D2D34",
        },
        amber: {
          brand: "#FFC93C",
          warm: "#F5B942",
          deep: "#E5A82D",
        },
        paper: {
          DEFAULT: "#FAF8F2",
          soft: "#FFFFFF",
          line: "#E8E5DC",
        },
        navy: {
          DEFAULT: "#08080B",
          light: "#232329",
        },
        brand: {
          DEFAULT: "#FFC93C",
          dark: "#E5A82D",
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
