"use client";
import Link from "next/link";
import SectionHeading from "./ui/SectionHeading.jsx";

const TONE = {
  live: "bg-emerald-400",
  pilot: "bg-amber-brand",
};

export default function CaseStudies({ caseStudies }) {
  return (
    <section
      id="case-studies"
      className="py-28 md:py-32 bg-paper dark:bg-ink border-t border-ink/5 dark:border-white/5 relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label={caseStudies.sectionLabel} title={caseStudies.title} />
        </div>

        <p className="-mt-6 mb-12 max-w-3xl text-base md:text-lg text-ink/70 dark:text-slate-400 leading-[1.8]">
          {caseStudies.intro}
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {caseStudies.items.map((study, i) => (
            <article
              key={study.slug}
              className="group rounded-3xl overflow-hidden bg-paper-soft dark:bg-ink-card border border-ink/5 dark:border-transparent hover:bg-paper-line dark:hover:bg-ink-raised transition-colors flex flex-col"
            >
              <Link href={`/case-studies/${study.slug}`} className="block flex-1 flex flex-col">
                <div
                  className="relative aspect-[16/9] overflow-hidden flex items-center justify-center bg-paper-line dark:bg-ink"
                  style={
                    study.image
                      ? undefined
                      : { background: `radial-gradient(circle at 30% 20%, ${study.accent}55, transparent 60%), linear-gradient(135deg, #0E0E12, #232329)` }
                  }
                >
                  {study.image ? (
                    <img
                      src={study.image}
                      alt={study.imageAlt || `${study.title} cover`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="font-display font-bold text-white/90 transition-transform duration-700 group-hover:scale-110"
                      style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", lineHeight: 1 }}
                      aria-hidden
                    >
                      {study.monogram}
                    </span>
                  )}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(14,14,18,0.35) 0%, transparent 45%)" }} />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-[11px] font-bold uppercase tracking-[0.15em]">
                    <span className={`w-1.5 h-1.5 rounded-full ${TONE[study.statusTone] ?? "bg-white"}`} />
                    {study.status}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-amber-brand text-ink translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    <span className="material-icons sm">arrow_forward</span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.2em] text-amber-brand">
                    <span className="font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="w-6 h-px bg-amber-brand/60" />
                    <span className="text-ink/60 dark:text-slate-400">{study.year}</span>
                  </div>
                  <h3 className="project-title font-display font-bold text-ink dark:text-white mb-2 group-hover:text-amber-brand transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm font-medium text-ink/60 dark:text-slate-400 mb-4">{study.kicker}</p>
                  <p className="text-base text-ink/70 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {study.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10 dark:border-white/5">
                    {study.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-ink/5 dark:bg-white/5 text-ink/70 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-amber-brand group-hover:gap-3 transition-all">
                    Read the case study
                    <span className="material-icons sm">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
