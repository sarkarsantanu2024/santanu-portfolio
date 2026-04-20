"use client";
import { useEffect, useRef } from "react";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function Skills({ skills }) {
  const ref = useRef(null);

  const allTags = skills.groups.flatMap((g) => g.items);

  useEffect(() => {
    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".skills-hdr > *", {
          scrollTrigger: { trigger: ".skills-hdr", start: "top 88%", once: true },
          y: 22,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".skill-group", {
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%", once: true },
          y: 22,
          opacity: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-28 md:py-32 bg-paper-soft dark:bg-ink-deep border-t border-ink/5 dark:border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-10">
        <div className="skills-hdr">
          <SectionHeading label={skills.sectionLabel} title={skills.title} />
        </div>

        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {skills.groups.map((group) => (
            <div
              key={group.heading}
              className="skill-group bg-paper dark:bg-ink-card rounded-2xl p-6 border border-ink/5 dark:border-transparent hover:bg-paper-line dark:hover:bg-ink-raised transition-colors"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-amber-brand mb-5">
                {group.heading}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-base font-medium text-ink dark:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-y border-ink/10 dark:border-white/5 py-6 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div
              key={k}
              className="flex items-center shrink-0 pr-12"
              aria-hidden={k === 1}
            >
              {allTags.map((tag) => (
                <span
                  key={`${k}-${tag}`}
                  className="font-display font-bold text-2xl md:text-3xl text-ink dark:text-white px-8 flex items-center gap-8"
                >
                  <span>{tag}</span>
                  <span className="text-amber-brand">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
