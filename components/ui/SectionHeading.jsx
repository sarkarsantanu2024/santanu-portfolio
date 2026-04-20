"use client";

export default function SectionHeading({ label, title }) {
  return (
    <div className="mb-12">
      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-brand mb-5">
        <span className="w-6 h-px bg-amber-brand" />
        {label}
      </p>
      <h2 className="section-heading font-display font-bold text-ink dark:text-white max-w-3xl">
        {title}
      </h2>
    </div>
  );
}
