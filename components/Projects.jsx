"use client";
import { useEffect, useRef } from "react";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function Projects({ projects }) {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".proj-hdr > *", {
          scrollTrigger: { trigger: ".proj-hdr", start: "top 88%", once: true },
          y: 22,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".project-featured", {
          scrollTrigger: { trigger: ".project-featured", start: "top 85%", once: true },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".project-card", {
          scrollTrigger: { trigger: ".proj-grid", start: "top 85%", once: true },
          y: 30,
          opacity: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  const [featured, ...rest] = projects.items;

  return (
    <section
      id="projects"
      ref={ref}
      className="py-28 md:py-32 bg-paper-soft dark:bg-ink-deep border-t border-ink/5 dark:border-white/5 relative overflow-hidden"
    >
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none"
        style={{ background: "#FFC93C" }}
      />

      <div className="max-w-6xl mx-auto px-5 lg:px-10 relative">
        <div className="proj-hdr flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label={projects.sectionLabel} title={projects.title} />
          <a
            href="mailto:sarkarsantanu69@gmail.com"
            className="mb-12 hidden md:inline-flex items-center gap-2 text-base font-medium text-amber-brand hover:text-ink dark:hover:text-white transition-colors"
          >
            More on request
            <span className="material-icons sm">arrow_outward</span>
          </a>
        </div>

        {featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener"
            className="project-featured group block mt-4 bg-paper dark:bg-ink-card border border-ink/5 dark:border-transparent rounded-3xl overflow-hidden hover:bg-paper-line dark:hover:bg-ink-raised transition-colors"
          >
            <div className="grid lg:grid-cols-2 gap-0 items-stretch">
              <div className="relative overflow-hidden aspect-[16/11] lg:aspect-auto bg-paper-line dark:bg-ink">
                <img
                  src={featured.image}
                  alt={`${featured.title} cover`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-brand text-ink text-[11px] font-bold uppercase tracking-[0.15em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                  Featured
                </div>
              </div>

              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.2em] text-ink/60 dark:text-slate-400">
                    <span className="text-amber-brand font-bold">01</span>
                    <span className="w-8 h-px bg-amber-brand/60" />
                    <span>{featured.year}</span>
                  </div>
                  <h3 className="project-title font-display font-bold text-ink dark:text-white mb-4 group-hover:text-amber-brand transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-base text-ink/80 dark:text-slate-300 leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-ink/5 dark:bg-white/5 text-ink/80 dark:text-slate-200 border border-ink/10 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-base font-semibold text-amber-brand self-start group-hover:gap-3 transition-all">
                  Visit live site
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-brand text-ink">
                    <span className="material-icons sm">arrow_outward</span>
                  </span>
                </div>
              </div>
            </div>
          </a>
        )}

        <div className="proj-grid grid md:grid-cols-2 gap-5 mt-5">
          {rest.map((p, i) => (
            <article
              key={p.title}
              className="project-card group rounded-3xl overflow-hidden bg-paper dark:bg-ink-card border border-ink/5 dark:border-transparent hover:bg-paper-line dark:hover:bg-ink-raised transition-colors"
            >
              <a href={p.url} target="_blank" rel="noopener" className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-line dark:bg-ink">
                  <img
                    src={p.image}
                    alt={`${p.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(36,37,58,0.85) 100%)",
                    }}
                  />
                  <div className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-amber-brand text-ink translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    <span className="material-icons sm">arrow_outward</span>
                  </div>
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-icons" style={{ fontSize: 13 }}>
                      link
                    </span>
                    {new URL(p.url).hostname.replace("www.", "")}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-amber-brand">
                      <span className="font-bold">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <span className="w-6 h-px bg-amber-brand/60" />
                      <span className="text-ink/60 dark:text-slate-400">{p.year}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-ink/50 dark:text-slate-500">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      />
                      Live
                    </span>
                  </div>
                  <h3 className="project-title font-display font-bold text-ink dark:text-white mb-3 group-hover:text-amber-brand transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-base text-ink/70 dark:text-slate-400 leading-relaxed mb-5">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10 dark:border-white/5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-ink/5 dark:bg-white/5 text-ink/70 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </article>
          ))}

          <a
            href="mailto:sarkarsantanu69@gmail.com"
            className="project-card group rounded-3xl overflow-hidden bg-paper dark:bg-ink-card border border-ink/5 dark:border-transparent hover:bg-amber-brand dark:hover:bg-amber-brand transition-colors flex items-center justify-center min-h-[260px] p-8"
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-amber-brand group-hover:bg-ink text-ink group-hover:text-amber-brand flex items-center justify-center transition-colors">
                <span className="material-icons">add</span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink dark:text-white group-hover:text-ink transition-colors mb-2">
                More projects
              </h3>
              <p className="text-sm text-ink/60 dark:text-slate-400 group-hover:text-ink/70 max-w-[220px] mx-auto transition-colors mb-5">
                Case studies and commercial work available on request.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-brand group-hover:text-ink transition-colors">
                Get in touch
                <span className="material-icons sm">arrow_outward</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
