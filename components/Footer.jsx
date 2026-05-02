export default function Footer({ footer }) {
  return (
    <footer className="py-8 bg-paper-soft dark:bg-ink-deep border-t border-ink/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-xs text-ink/60 dark:text-slate-400">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
