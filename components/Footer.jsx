export default function Footer({ footer }) {
  return (
    <footer className="py-8 bg-paper-soft dark:bg-ink-deep border-t border-ink/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display font-bold text-base text-ink dark:text-white">
            Santanu
          </span>
          <span className="font-display font-bold text-base text-amber-brand">
            Sarkar.
          </span>
        </div>
        <p className="text-xs text-ink/60 dark:text-slate-400">{footer.copyright}</p>
        <div className="flex gap-5">
          {footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener" : undefined}
              className="text-xs font-medium text-ink/70 dark:text-slate-300 hover:text-amber-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
