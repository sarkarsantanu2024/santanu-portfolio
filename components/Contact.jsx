"use client";
import { useEffect, useRef } from "react";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function Contact({ contact }) {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".contact-inner > *", {
          scrollTrigger: { trigger: "#contact", start: "top 82%", once: true },
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".contact-stat", {
          scrollTrigger: {
            trigger: ".contact-stats",
            start: "top 85%",
            once: true,
          },
          y: 20,
          opacity: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="py-28 md:py-32 bg-paper dark:bg-ink border-t border-ink/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-10 contact-inner">
        <SectionHeading label={contact.sectionLabel} title={contact.title} />

        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-end mt-4">
          <div>
            <p className="text-lg sm:text-xl text-ink/80 dark:text-slate-300 leading-snug max-w-2xl mb-10">
              {contact.description}
            </p>

            <a
              href={contact.primaryCta.href}
              className="inline-flex items-baseline gap-3 contact-huge font-display text-ink dark:text-white hover:text-amber-brand transition-colors break-all"
            >
              {contact.primaryCta.label}
              <span className="material-icons md self-center text-amber-brand">
                arrow_outward
              </span>
            </a>
          </div>

          <div className="contact-stats flex gap-10 lg:gap-12 pb-3">
            <div className="contact-stat">
              <div className="font-display font-bold text-4xl md:text-5xl text-amber-brand leading-none">
                10<span className="text-ink dark:text-white">+</span>
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-ink/60 dark:text-slate-400 mt-2">
                Years of
                <br />
                Experience
              </div>
            </div>
            <div className="contact-stat">
              <div className="font-display font-bold text-4xl md:text-5xl text-amber-brand leading-none">
                20<span className="text-ink dark:text-white">+</span>
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-ink/60 dark:text-slate-400 mt-2">
                Shipped
                <br />
                Projects
              </div>
            </div>
          </div>
        </div>

        <dl className="grid sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-ink/10 dark:border-white/10">
          {contact.items.map((item) => (
            <div key={item.label} className="bg-white dark:bg-ink-card border border-ink/5 dark:border-transparent rounded-2xl p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-brand mb-2">
                <span className="material-icons sm">{item.icon}</span>
                {item.label}
              </dt>
              <dd className="text-base text-ink dark:text-white">
                {item.href ? (
                  <a
                    href={item.href}
                    className="hover:text-amber-brand transition-colors break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <a
            href={contact.secondaryCta.href}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-base font-medium text-ink/70 dark:text-slate-300 hover:text-amber-brand transition-colors"
          >
            Also on {contact.secondaryCta.label}
            <span className="material-icons sm">arrow_outward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
