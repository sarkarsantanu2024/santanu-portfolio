"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ui/ThemeToggle.jsx";

export default function Navbar({ nav }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".nav-link").forEach((el) => {
              const active = el.getAttribute("href") === `#${entry.target.id}`;
              el.classList.toggle("nav-active", active);
            });
          }
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink/60 dark:bg-ink-deep/80 transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[90vw] max-w-sm bg-paper dark:bg-ink-deep shadow-2xl transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-ink/10 dark:border-white/10">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-xl text-ink dark:text-white">
              Santanu
            </span>
            <span className="font-display font-bold text-xl text-amber-brand">
              Sarkar.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center text-ink dark:text-white"
            aria-label="Close navigation"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-6">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="font-display font-bold text-2xl text-ink dark:text-white hover:text-amber-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            onClick={() => setDrawerOpen(false)}
            className="mt-4 inline-flex self-start items-center gap-2 px-5 py-3 bg-amber-brand text-ink text-base font-semibold rounded-full"
          >
            {nav.cta.label}
            <span className="material-icons sm">arrow_outward</span>
          </a>
        </nav>
      </aside>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "nav-scrolled" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-10">
          <a href="#hero" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-brand text-ink flex items-center justify-center font-display font-bold text-base">
              {nav.logo}
            </div>
            <span className="hidden sm:flex items-baseline gap-1 font-display font-bold text-base">
              <span className="text-ink dark:text-white">Santanu</span>
              <span className="text-amber-brand">Sarkar.</span>
            </span>
          </a>

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-base font-medium text-ink/70 dark:text-slate-300 hover:text-amber-brand transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={nav.cta.href}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-brand text-ink text-base font-semibold hover:bg-white transition-colors"
            >
              {nav.cta.label}
              <span className="material-icons sm">arrow_outward</span>
            </a>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink dark:border-white/15 dark:text-white md:hidden"
              aria-label="Open menu"
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
