"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-amber-brand text-ink shadow-xl transition-opacity duration-300 hover:bg-white ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <span className="material-icons">keyboard_double_arrow_up</span>
    </button>
  );
}
