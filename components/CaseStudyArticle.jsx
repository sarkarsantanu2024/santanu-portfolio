import Link from "next/link";
import ThemeToggle from "./ui/ThemeToggle.jsx";

const TONE = {
  live: "bg-emerald-400",
  pilot: "bg-amber-brand",
};

function hostname(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function CaseStudyArticle({ study, roleStatement, all, footer }) {
  const others = all.filter((s) => s.slug !== study.slug);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 nav-scrolled">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-brand text-ink flex items-center justify-center font-display font-bold text-base">
              SS
            </div>
            <span className="hidden sm:flex items-baseline gap-1 font-display font-bold text-base">
              <span className="text-ink dark:text-white">Santanu</span>
              <span className="text-amber-brand">Sarkar.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#case-studies"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-ink/20 text-ink text-sm font-semibold hover:bg-ink hover:text-paper dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-ink transition-colors"
            >
              <span className="material-icons sm">arrow_back</span>
              All case studies
            </Link>
          </div>
        </div>
      </header>

      <main className="bg-paper dark:bg-ink bg-dotted min-h-screen pt-28 pb-24">
        <article className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Title block */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 xl:gap-16 items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-brand mb-5">
                <span className="w-6 h-px bg-amber-brand" />
                Case study · {study.year}
              </p>
              <h1 className="font-display font-bold text-ink dark:text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}>
                {study.title}
              </h1>
              <p className="mt-4 text-xl md:text-2xl font-display font-medium text-ink/70 dark:text-slate-300">
                {study.kicker}
              </p>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-ink/80 dark:text-slate-300 leading-[1.8]">
                {study.summary}
              </p>
            </div>

            <aside className="bg-paper-soft dark:bg-ink-card rounded-3xl p-7 border border-ink/5 dark:border-transparent">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/5 dark:bg-white/5 text-ink dark:text-white text-[11px] font-bold uppercase tracking-[0.15em] mb-6">
                <span className={`w-1.5 h-1.5 rounded-full ${TONE[study.statusTone] ?? "bg-white"}`} />
                {study.status}
              </div>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ink/50 dark:text-slate-500 mb-1">Live</dt>
                  <dd>
                    <a href={study.links.live} target="_blank" rel="noopener" className="font-medium text-amber-brand hover:underline break-all">
                      {hostname(study.links.live)}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ink/50 dark:text-slate-500 mb-1">Source</dt>
                  <dd>
                    <a href={study.links.repo} target="_blank" rel="noopener" className="font-medium text-amber-brand hover:underline break-all">
                      {study.links.repo.replace("https://", "")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-ink/50 dark:text-slate-500 mb-1">Stack</dt>
                  <dd className="text-ink/80 dark:text-slate-300 leading-relaxed">{study.stack}</dd>
                </div>
              </dl>
            </aside>
          </div>

          {/* Role */}
          <div className="mt-14 rounded-3xl border border-amber-brand/40 bg-amber-brand/10 dark:bg-amber-brand/5 p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-brand mb-3">My role</p>
            <p className="text-base md:text-lg text-ink dark:text-white leading-[1.8] max-w-4xl">{roleStatement}</p>
          </div>

          {/* Sections */}
          <div className="mt-16 grid lg:grid-cols-[220px_1fr] gap-10 xl:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28 space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50 dark:text-slate-500 mb-4">On this page</p>
                {study.sections.map((section, i) => (
                  <a
                    key={section.heading}
                    href={`#s-${i + 1}`}
                    className="block text-sm text-ink/70 dark:text-slate-400 hover:text-amber-brand transition-colors"
                  >
                    <span className="font-mono text-amber-brand mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </a>
                ))}
              </div>
            </nav>

            <div className="space-y-14">
              {study.sections.map((section, i) => (
                <section key={section.heading} id={`s-${i + 1}`} className="scroll-mt-28">
                  <div className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.2em] text-amber-brand">
                    <span className="font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="w-8 h-px bg-amber-brand/60" />
                  </div>
                  <h2 className="font-display font-bold text-ink dark:text-white mb-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                    {section.heading}
                  </h2>
                  {section.body?.map((paragraph, j) => (
                    <p key={j} className="text-base md:text-lg text-ink/80 dark:text-slate-300 leading-[1.8] mb-4 max-w-3xl">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-4 max-w-3xl">
                      {section.bullets.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-base text-ink/80 dark:text-slate-300 leading-[1.75]">
                          <span className="text-amber-brand pt-1 shrink-0 material-icons sm">check</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Other case studies */}
          <div className="mt-24 pt-12 border-t border-ink/10 dark:border-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-brand mb-6">More case studies</p>
            <div className="grid md:grid-cols-2 gap-5">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="group rounded-3xl p-7 bg-paper-soft dark:bg-ink-card border border-ink/5 dark:border-transparent hover:bg-paper-line dark:hover:bg-ink-raised transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-xl text-ink dark:text-white group-hover:text-amber-brand transition-colors">
                      {other.title}
                    </h3>
                    <span className="material-icons sm text-amber-brand">arrow_forward</span>
                  </div>
                  <p className="text-sm text-ink/70 dark:text-slate-400">{other.kicker}</p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <footer className="py-8 border-t border-ink/10 dark:border-white/10 bg-paper dark:bg-ink">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/60 dark:text-slate-400">
          <span>{footer.copyright}</span>
          <div className="flex gap-6">
            {footer.links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-amber-brand transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
