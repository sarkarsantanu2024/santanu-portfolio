"use client";
import { useEffect, useRef } from "react";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function Experience({ experience }) {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".exp-hdr > *", {
          scrollTrigger: { trigger: ".exp-hdr", start: "top 88%", once: true },
          y: 22,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        gsap.fromTo(
          ".tl-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: ".timeline-wrap",
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          },
        );

        gsap.utils.toArray(".tl-item").forEach((item, i) => {
          gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
            y: 32,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.05,
            ease: "power3.out",
            clearProps: "all",
          });
          gsap.from(item.querySelector(".tl-dot"), {
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
            scale: 0,
            opacity: 0,
            duration: 0.6,
            delay: 0.2 + i * 0.05,
            ease: "back.out(2.2)",
            clearProps: "all",
          });
        });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  const parsePeriod = (period) => {
    const parts = period.split("–").map((s) => s.trim());
    return { start: parts[0] || period, end: parts[1] || "" };
  };

  const initialOf = (company) => company.replace(/[^A-Za-z]/g, "").charAt(0);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-28 md:py-32 bg-paper dark:bg-ink border-t border-ink/5 dark:border-white/5 relative overflow-hidden"
    >
      <div
        className="absolute top-40 right-0 w-[460px] h-[460px] rounded-full blur-[130px] opacity-[0.07] pointer-events-none"
        style={{ background: "#FFC93C" }}
      />

      <div className="max-w-6xl mx-auto px-5 lg:px-10 relative">
        <div className="exp-hdr flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label={experience.sectionLabel}
            title={experience.title}
          />
          <div className="mb-12 flex items-center gap-4">
            <div className="font-display font-bold text-4xl md:text-5xl text-amber-brand leading-none">
              13<span className="text-ink dark:text-white">+</span>
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400 max-w-[130px] leading-tight">
              Years across
              <br />
              {experience.roles.length} roles
            </div>
          </div>
        </div>

        <div className="timeline-wrap relative mt-6">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[22px] md:left-[246px] w-px bg-ink/10 dark:bg-white/10"
          />
          <div
            aria-hidden
            className="tl-progress absolute top-0 bottom-0 left-[21px] md:left-[245px] w-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, #FFC93C 0%, #FFC93C 70%, rgba(255,201,60,0.2) 100%)",
            }}
          />

          <ul className="space-y-10 md:space-y-12">
            {experience.roles.map((job, index) => {
              const { start, end } = parsePeriod(job.period);
              return (
                <li key={index} className="tl-item relative">
                  <div className="md:grid md:grid-cols-[200px_44px_1fr] md:gap-x-6 md:items-start">
                    <div className="hidden md:block pt-1 text-right pr-4">
                      <div className="font-display font-bold text-2xl text-ink dark:text-white leading-tight">
                        {start}
                      </div>
                      {end && (
                        <div
                          className={`text-xs uppercase tracking-[0.15em] mt-1 ${
                            job.current ? "text-amber-brand" : "text-ink/60 dark:text-slate-400"
                          }`}
                        >
                          {end}
                        </div>
                      )}
                    </div>

                    <div className="absolute md:static left-0 top-2 md:top-0 flex md:justify-center">
                      <div className="relative tl-dot">
                        {job.current && (
                          <span className="absolute inset-0 rounded-full bg-amber-brand/40 animate-ping" />
                        )}
                        <div
                          className={`relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-display font-bold text-sm shadow-xl ${
                            job.current
                              ? "bg-amber-brand text-ink"
                              : "bg-white dark:bg-ink-raised text-amber-brand border border-amber-brand/40"
                          }`}
                          style={
                            job.current
                              ? { boxShadow: "0 0 0 6px rgba(255,201,60,0.15)" }
                              : undefined
                          }
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    <div className="pl-16 md:pl-0">
                      <div className="md:hidden mb-3">
                        <div className="font-display font-bold text-xl text-ink dark:text-white">
                          {start}
                          {end && (
                            <span
                              className={`ml-2 text-xs uppercase tracking-[0.15em] ${
                                job.current ? "text-amber-brand" : "text-ink/60 dark:text-slate-400"
                              }`}
                            >
                              — {end}
                            </span>
                          )}
                        </div>
                      </div>

                      <article className="group relative bg-white dark:bg-ink-card border border-ink/5 dark:border-transparent rounded-2xl p-6 md:p-7 hover:bg-paper-line dark:hover:bg-ink-raised transition-all hover:-translate-y-0.5 hover:shadow-2xl">
                        <div
                          aria-hidden
                          className="hidden md:block absolute top-7 -left-3 w-3 h-3 rotate-45 bg-white dark:bg-ink-card group-hover:bg-paper-line dark:group-hover:bg-ink-raised transition-colors"
                        />

                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-brand/15 text-amber-brand text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-brand animate-pulse" />
                            Currently
                          </span>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-base ${
                              job.current
                                ? "bg-amber-brand text-ink"
                                : "bg-ink/5 dark:bg-white/5 border border-ink/10 dark:border-white/10 text-amber-brand"
                            }`}
                          >
                            {initialOf(job.company)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-xl md:text-2xl text-ink dark:text-white leading-tight group-hover:text-amber-brand transition-colors truncate">
                              {job.title}
                            </h3>
                            <p className="text-sm text-amber-brand truncate">
                              {job.company}
                            </p>
                          </div>
                        </div>

                        <ul className="space-y-2.5 text-base text-ink/80 dark:text-slate-300 leading-relaxed">
                          {(job.bullets || []).map((pt, j) => (
                            <li key={j} className="flex gap-3">
                              <span
                                className="material-icons text-amber-brand shrink-0 mt-0.5"
                                style={{ fontSize: 16 }}
                              >
                                arrow_right
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 pt-4 border-t border-ink/10 dark:border-white/5 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-ink/50 dark:text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="material-icons"
                              style={{ fontSize: 13 }}
                            >
                              task_alt
                            </span>
                            {job.bullets?.length || 0} highlights
                          </span>
                          {job.current ? (
                            <span className="inline-flex items-center gap-1.5 text-amber-brand">
                              <span className="w-1 h-1 rounded-full bg-amber-brand animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span>Completed</span>
                          )}
                        </div>
                      </article>
                    </div>
                  </div>
                </li>
              );
            })}

            <li className="relative">
              <div className="md:grid md:grid-cols-[200px_44px_1fr] md:gap-x-6 md:items-center">
                <div className="hidden md:block" />
                <div className="absolute md:static left-0 top-1 md:top-0 flex md:justify-center">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-paper dark:bg-ink flex items-center justify-center border border-dashed border-ink/20 dark:border-white/20">
                    <span
                      className="material-icons text-ink/50 dark:text-slate-500"
                      style={{ fontSize: 16 }}
                    >
                      more_horiz
                    </span>
                  </div>
                </div>
                <div className="pl-16 md:pl-0 text-sm text-ink/60 dark:text-slate-400">
                  The rest of the story —{" "}
                  <a
                    href="mailto:sarkarsantanu69@gmail.com"
                    className="text-amber-brand font-medium hover:text-ink dark:hover:text-white transition-colors"
                  >
                    ask for the full CV
                  </a>
                  .
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
