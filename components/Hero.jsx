"use client";
import { useEffect, useRef } from "react";

export default function Hero({ hero }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
            immediateRender: false,
            clearProps: "all",
          },
          delay: 0.1,
        });
        tl.from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.5 })
          .from(
            ".hero-line",
            { y: 48, opacity: 0, duration: 0.85, stagger: 0.1 },
            "-=0.2",
          )
          .from(".hero-image", { scale: 0.92, opacity: 0, duration: 0.9 }, "<")
          .from(".hero-role", { y: 18, opacity: 0, duration: 0.55 }, "-=0.5")
          .from(".hero-desc", { y: 16, opacity: 0, duration: 0.55 }, "-=0.45")
          .from(
            ".hero-cta-btn",
            { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 },
            "-=0.35",
          )
          .from(
            ".hero-service-card",
            { y: 24, opacity: 0, duration: 0.5, stagger: 0.1 },
            "-=0.3",
          );
      }, sectionRef);
    })();
    return () => ctx?.revert();
  }, []);

  const services = [
    { title: "Frontend", subtitle: "Architecture", count: "10+ yrs" },
    { title: "Next.js", subtitle: "+ Headless CMS", count: "20+ Projects" },
    { title: "UI Systems", subtitle: "React · Vue", count: "On-going" },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-10 overflow-hidden bg-paper dark:bg-ink"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 w-full flex-1 flex flex-col justify-center">
        <p className="hero-eyebrow inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-amber-brand mb-8">
          <span className="w-6 h-px bg-amber-brand" />
          {hero.eyebrow}
        </p>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <h1 className="hero-name font-display text-ink dark:text-white mb-8">
              <span className="hero-line block">Santanu</span>
              <span className="hero-line block">
                Sarkar<span className="text-amber-brand">.</span>
              </span>
            </h1>

            <p className="hero-role text-lg sm:text-xl text-ink/70 dark:text-slate-300 mb-4 max-w-xl leading-snug">
              {hero.subheading}
            </p>
            <p className="hero-desc max-w-xl text-base leading-[1.75] text-ink/60 dark:text-slate-400 mb-10">
              {hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={hero.buttonHref}
                className="hero-cta-btn inline-flex items-center gap-2 px-6 py-3.5 bg-amber-brand text-ink text-base font-semibold rounded-full hover:bg-white transition-colors"
              >
                {hero.buttonLabel}
                <span className="material-icons sm">arrow_forward</span>
              </a>
              <a
                href={hero.secondaryHref}
                className="hero-cta-btn inline-flex items-center gap-2 px-6 py-3.5 border border-ink/20 text-ink hover:bg-ink/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10 text-base font-semibold rounded-full transition-colors"
              >
                <span className="material-icons sm">mail_outline</span>
                {hero.secondaryLabel}
              </a>
            </div>
          </div>

          <div className="hero-image relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5]">
              <div className="hero-highlight" />
              <img
                src={hero.imageSrc}
                alt={hero.heading}
                className="relative z-10 w-full h-full object-cover rounded-t-[14px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 w-full mt-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`hero-service-card rounded-2xl p-6 transition-all ${
                i === 0
                  ? "bg-amber-brand text-ink"
                  : "bg-white text-ink hover:bg-paper-line dark:bg-ink-card dark:text-white dark:hover:bg-ink-raised"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-6 ${
                  i === 0
                    ? "bg-ink text-amber-brand"
                    : "bg-ink/10 text-amber-brand dark:bg-white/10"
                }`}
              >
                <span className="material-icons sm">
                  {i === 0 ? "code" : i === 1 ? "auto_awesome" : "grid_view"}
                </span>
              </div>
              <div className="font-display font-bold text-lg leading-tight">
                {s.title}
              </div>
              <div
                className={`text-base mb-6 ${
                  i === 0 ? "text-ink/80" : "text-ink/60 dark:text-slate-400"
                }`}
              >
                {s.subtitle}
              </div>
              <div
                className={`text-xs font-medium ${
                  i === 0 ? "text-ink/70" : "text-ink/50 dark:text-slate-500"
                }`}
              >
                {s.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
