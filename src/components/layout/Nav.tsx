"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { getSite, type NavItem } from "@/content/site";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";
import { LocaleSwitch } from "./LocaleSwitch";

export function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const site = getSite(locale);
  const t = getDictionary(locale).nav;
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [chapter, setChapter] = useState(t.idleChapter);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sectionRank, setSectionRank] = useState<{ index: number; total: number; label: string } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const homePath = localePath(locale, "/");
  const isHome = pathname === homePath || pathname === `${homePath}/`;

  const routeHref = (item: NavItem) => localePath(locale, item.href);
  const isActive = (item: NavItem) => {
    if (isHome) {
      if (item.anchor) return activeSection === item.anchor;
      return item.href === "/" && activeSection === null;
    }
    return item.href === "/" ? pathname === homePath : pathname.startsWith(routeHref(item));
  };
  const activeIndex = site.nav.findIndex((item) => isActive(item));
  // 首页是单页滚动，位置读数以章节为准（与页面里的 01–07 编号同一套）；
  // 其余路由退回导航项序号。
  const rank = isHome && sectionRank
    ? sectionRank
    : { index: Math.max(activeIndex + 1, 1), total: site.nav.length };
  const readout = isHome ? sectionRank?.label ?? chapter : site.nav[Math.max(activeIndex, 0)]?.label ?? t.indexLabel;

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
    const updateSection = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string | null; label?: string; index?: number; total?: number }>).detail;
      setActiveSection(detail?.id ?? null);
      setSectionRank(
        detail?.id && detail.index && detail.total
          ? { index: detail.index, total: detail.total, label: detail.label ?? "" }
          : null,
      );
    };
    window.addEventListener("lab:chapter", updateChapter);
    window.addEventListener("lab:section", updateSection);
    return () => {
      window.removeEventListener("lab:chapter", updateChapter);
      window.removeEventListener("lab:section", updateSection);
    };
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
      <div className={`pointer-events-none absolute inset-x-0 top-0 border-b transition-all duration-300 ease-lab ${compact || open ? "h-12 border-line bg-bg" : "h-24 border-transparent bg-gradient-to-b from-bg/92 to-transparent"}`} />
      <div className={`pointer-events-auto relative z-50 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 transition-[height] duration-300 ease-lab md:px-8 lg:px-[var(--page-gutter)] ${compact ? "h-12" : "h-16"}`}>
        <Link href={homePath} onClick={() => setOpen(false)} className="group flex min-h-11 items-center gap-3 font-mono text-2xs font-semibold tracking-[0.18em] text-ink">
          <span className="h-2 w-2 bg-signal-bright transition-transform duration-300 ease-lab group-hover:rotate-45" aria-hidden />
          <span className="hidden sm:inline">{t.brandFull}</span>
          <span className="sm:hidden">{t.brandShort}</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <span className="hidden items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-ink-secondary sm:flex" aria-live="polite">
            <span className="h-1.5 w-1.5 bg-signal-bright" aria-hidden />
            {readout}
          </span>
          <LocaleSwitch locale={locale} />
          <button
            ref={triggerRef}
            type="button"
            className="flex min-h-11 items-center gap-3 border-l border-ink/20 pl-4 font-mono text-2xs uppercase tracking-[0.14em] text-ink transition-colors duration-300 ease-lab hover:text-signal active:translate-y-px"
            aria-expanded={open}
            aria-controls="site-index"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="hidden sm:inline">{t.indexLabel} {String(rank.index).padStart(2, "0")} / {String(rank.total).padStart(2, "0")}</span>
            <span className="sm:hidden">{t.indexLabel}</span>
            {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div ref={panelRef} id="site-index" role="dialog" aria-modal="true" aria-label={t.siteIndexAria} className="pointer-events-auto fixed inset-0 z-40 overflow-y-auto bg-bg pt-20">
          <nav aria-label={t.primaryAria} className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-[1440px] gap-10 px-5 pb-10 md:grid-cols-12 md:px-8 lg:px-[var(--page-gutter)]">
            <div className="md:col-span-3">
              <p className="font-mono text-2xs uppercase tracking-[0.16em] text-signal">{t.panelTitle}</p>
              <p className="mt-5 max-w-52 text-sm leading-relaxed text-ink-secondary">{t.panelBody}</p>
              <p className="mt-10 font-mono text-2xs uppercase tracking-[0.14em] text-ink-secondary">{t.panelHint}</p>
            </div>
            <div className="border-t border-line md:col-span-8 md:col-start-5">
              {site.nav.map((item, index) => {
                const anchorHref = isHome && item.anchor ? `#${item.anchor}` : null;
                const href = anchorHref ?? routeHref(item);
                return (
                  <Link
                    key={item.href}
                    href={href}
                    onClick={(event) => {
                      if (anchorHref && item.anchor) {
                        event.preventDefault();
                        const id = item.anchor;
                        setOpen(false);
                        requestAnimationFrame(() => {
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        });
                        return;
                      }
                      setOpen(false);
                    }}
                    aria-current={isActive(item) ? "true" : undefined}
                    className="group grid grid-cols-[44px_1fr_auto] items-center gap-4 border-b border-line py-5 md:py-6"
                  >
                    <span className="font-mono text-2xs tracking-[0.12em] text-signal">{String(index + 1).padStart(2, "0")}</span>
                    <span className={`text-3xl font-semibold tracking-tight transition-transform duration-300 ease-lab group-hover:translate-x-2 md:text-4xl ${isActive(item) ? "text-ink" : "text-ink-secondary"}`}>{item.label}</span>
                    <span className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-secondary">{t.open}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
