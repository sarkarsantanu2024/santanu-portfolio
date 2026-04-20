"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-theme");
    const preferred =
      saved ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(preferred);
    document.documentElement.classList.toggle("dark", preferred === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("site-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-ink/15 text-ink hover:bg-ink/10 dark:border-white/15 dark:text-white dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="material-icons">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
