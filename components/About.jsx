"use client";
import { useEffect, useRef } from "react";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function About({ about }) {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".about-hdr > *", {
          scrollTrigger: { trigger: ".about-hdr", start: "top 88%", once: true },
          y: 22,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".about-para", {
          scrollTrigger: { trigger: "#about", start: "top 80%", once: true },
          y: 22,
          opacity: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".about-highlight", {
          scrollTrigger: { trigger: "#about", start: "top 85%", once: true },
          y: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
        });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 md:py-32 bg-paper dark:bg-ink border-t border-ink/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-10">
        <div className="about-hdr">
          <SectionHeading label={about.sectionLabel} title={about.title} />
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 xl:gap-16 mt-4">
          <div className="space-y-5 text-base md:text-lg text-ink/80 dark:text-slate-300 leading-[1.8]">
            {about.description.map((paragraph, index) => (
              <p key={index} className="about-para">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="bg-white dark:bg-ink-card rounded-2xl p-8 border border-ink/5 dark:border-transparent">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-brand mb-6">
              Focus
            </p>
            <ul className="space-y-4">
              {about.highlights.map((item) => (
                <li
                  key={item}
                  className="about-highlight flex items-start gap-3 text-base text-ink dark:text-white leading-relaxed"
                >
                  <span className="text-amber-brand pt-0.5 shrink-0 material-icons sm">
                    check
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
