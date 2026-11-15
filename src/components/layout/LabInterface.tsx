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
    <header className={`grid gap-10 pb-14 pt-28 md:grid-cols-12 md:items-end md:pb-20 md:pt-36 ${className}`}>
      <div className="md:col-span-8">
        <p className="sticker">{eyebrow}</p>
        <h1 className="heading-1 mt-6 max-w-3xl text-ink">
          {title}
        </h1>
      </div>
      <div className="md:col-span-4">
        {intro ? <div className="max-w-md border-l-[3px] border-ink pl-4 text-base leading-[1.6] text-ink-secondary md:text-lg">{intro}</div> : null}
        {meta ? <div className="mt-7 border-t-[3px] border-ink pt-3">{meta}</div> : null}
      </div>
    </header>
  );
}

export function SectionIndex({ items, label = "Section index" }: { items: SectionIndexItem[]; label?: string }) {
  return (
    <nav aria-label={label} className="border-t-[3px] border-ink">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="group grid grid-cols-[44px_1fr] items-center gap-3 border-b-[2px] border-ink py-3 transition-colors duration-150 ease-lab hover:bg-sticker">
          <span className="font-mono text-2xs font-bold tracking-[0.1em] text-ink">{item.number}</span>
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
    <div className="grid gap-3 border-y-[3px] border-ink py-4 sm:grid-cols-[74px_1fr_auto] sm:items-center">
      <span className="sticker sticker--ink justify-self-start">{number}</span>
      <span className="text-base font-bold text-ink">{title}</span>
      <span className="lab-kicker text-ink-secondary">{role}</span>
    </div>
  );
}

export function ProgressRail({ label = "Scroll / 01" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="lab-kicker whitespace-nowrap text-current">{label}</span>
      <span className="relative h-1.5 min-w-24 flex-1 overflow-hidden border-[2px] border-current">
        <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-[var(--home-progress,0)] bg-current will-change-transform" />
      </span>
    </div>
  );
}
