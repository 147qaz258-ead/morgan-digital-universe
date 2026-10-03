"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [chapter, setChapter] = useState("INDEX");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const activeIndex = site.nav.findIndex((item) => isActive(item.href));

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > window.innerHeight * 0.72;
      setCompact((current) => (current === next ? current : next));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const updateChapter = (event: Event) => {
      const detail = (event as CustomEvent<{ label?: string }>).detail;
      if (detail?.label) setChapter(detail.label);
    };
    window.addEventListener("lab:chapter", updateChapter);
    return () => window.removeEventListener("lab:chapter", updateChapter);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className={`pointer-events-none absolute inset-x-0 top-0 border-b transition-all duration-300 ${compact || open ? "h-12 border-line bg-bg" : "h-24 border-transparent bg-gradient-to-b from-bg/92 to-transparent"}`} />
      <div className={`pointer-events-auto relative z-50 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 transition-[height] duration-300 md:px-8 lg:px-[var(--page-gutter)] ${compact ? "h-12" : "h-16"}`}>
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.18em] text-ink md:text-[11px]">
          <span className="h-2 w-2 bg-signal-bright transition-transform group-hover:rotate-45" aria-hidden />
          <span className="hidden sm:inline">MORGAN / DIGITAL LAB</span>
          <span className="sm:hidden">M / DL</span>
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-secondary sm:flex" aria-live="polite">
            <span className="h-1.5 w-1.5 bg-signal-bright" aria-hidden />
            {pathname === "/" ? chapter : site.nav[Math.max(activeIndex, 0)]?.label ?? "Index"}
          </span>
          <button
            ref={triggerRef}
            type="button"
            className="flex min-h-11 items-center gap-3 border-l border-ink/20 pl-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-signal"
            aria-expanded={open}
            aria-controls="site-index"
            aria-label={open ? "Close navigation index" : "Open navigation index"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="hidden sm:inline">Index {String(Math.max(activeIndex + 1, 1)).padStart(2, "0")} / 07</span>
            <span className="sm:hidden">Index</span>
            {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div ref={panelRef} id="site-index" role="dialog" aria-modal="true" aria-label="Site index" className="pointer-events-auto fixed inset-0 z-40 overflow-y-auto bg-bg pt-20">
          <nav aria-label="Primary" className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-[1440px] gap-10 px-5 pb-10 md:grid-cols-12 md:px-8 lg:px-[var(--page-gutter)]">
            <div className="md:col-span-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">Navigation index</p>
              <p className="mt-5 max-w-52 text-[14px] leading-relaxed text-ink-secondary">A running index of AI, robotics, hardware, and physical systems.</p>
              <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-secondary">Esc to close / Tab to move</p>
            </div>
            <div className="border-t border-line md:col-span-8 md:col-start-5">
              {site.nav.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group grid grid-cols-[44px_1fr_auto] items-center gap-4 border-b border-line py-5 md:py-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] text-signal">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`text-[28px] font-semibold tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 md:text-[38px] ${isActive(item.href) ? "text-ink" : "text-ink-secondary"}`}>{item.label}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-secondary">Open</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
