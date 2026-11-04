import type { ReactNode } from "react";

export interface SectionIndexItem {
  id: string;
  label: string;
  number: string;
}

export function LabPageHeader({
  eyebrow,
  title,
  intro,
  meta,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`grid gap-10 pb-16 pt-32 md:grid-cols-12 md:items-end md:pb-24 md:pt-40 ${className}`}>
      <div className="md:col-span-8">
        <p className="lab-kicker text-signal">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-ink md:text-7xl lg:text-8xl">
          {title}
        </h1>
      </div>
      <div className="md:col-span-4">
        {intro ? <div className="max-w-md text-base leading-[1.65] text-ink-secondary md:text-lg">{intro}</div> : null}
        {meta ? <div className="mt-7 border-t border-line pt-4">{meta}</div> : null}
      </div>
    </header>
  );
}

export function SectionIndex({ items, label = "Section index" }: { items: SectionIndexItem[]; label?: string }) {
  return (
    <nav aria-label={label} className="border-t border-line">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="group grid grid-cols-[42px_1fr] gap-3 border-b border-line py-4">
          <span className="lab-kicker text-signal">{item.number}</span>
          <span className="text-xs font-medium text-ink-secondary transition-colors group-hover:text-ink">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

export function EditorialCaseLayout({ rail, children, className = "" }: { rail: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-12 lg:grid-cols-12 ${className}`}>
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-24">{rail}</div>
      </aside>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </div>
  );
}

export function ProjectLabel({ number, title, role }: { number: string; title: string; role: string }) {
  return (
    <div className="grid gap-3 border-y border-line py-4 sm:grid-cols-[74px_1fr_auto] sm:items-center">
      <span className="lab-kicker text-signal">{number}</span>
      <span className="text-base font-semibold text-ink">{title}</span>
      <span className="lab-kicker text-ink-secondary">{role}</span>
    </div>
  );
}

export function ProgressRail({ label = "Scroll / 01" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="lab-kicker whitespace-nowrap text-current">{label}</span>
      <span className="relative h-px min-w-24 flex-1 overflow-hidden bg-current/25">
        <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-[var(--home-progress,0)] bg-current will-change-transform" />
      </span>
    </div>
  );
}
