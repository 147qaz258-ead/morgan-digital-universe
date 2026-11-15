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

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > window.innerHeight * 0.72;
      setCompact((current) => (current === next ? current : next));
    };
    update();
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const updateSection = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string | null; label?: string; index?: number; total?: number }>).detail;
      setActiveSection(detail?.id ?? null);
      setSectionRank(
        detail?.id && detail.index && detail.total
          ? { index: detail.index, total: detail.total, label: detail.label ?? "" }
          : null,
      );
    };
    window.addEventListener("lab:section", updateSection);
    return () => {
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
      <div className="pointer-events-auto relative z-50 border-b-[3px] border-ink bg-bg">
        <div className={`mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 transition-[min-height] duration-150 ease-lab md:px-8 lg:px-[var(--page-gutter)] ${compact && !open ? "min-h-14" : "min-h-16"}`}>
          <Link
            href={homePath}
            onClick={() => setOpen(false)}
            className="group flex min-h-11 items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink"
          >
            <span className="flex h-7 items-center gap-1 border-[3px] border-ink bg-ink px-1.5" aria-hidden>
              <span className="h-3 w-3 bg-signal transition-transform duration-150 ease-lab group-hover:rotate-45" />
              <span className="h-3 w-3 bg-sticker" />
            </span>
            <span className="hidden sm:inline">{t.brandFull}</span>
            <span className="sm:hidden">{t.brandShort}</span>
          </Link>

          <nav aria-label={t.primaryAria} className="hidden items-center gap-1 xl:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={isHome && item.anchor ? `#${item.anchor}` : routeHref(item)}
                aria-current={isActive(item) ? "true" : undefined}
                className={`inline-flex min-h-11 items-center border-[2px] px-2.5 font-mono text-2xs font-bold uppercase tracking-[0.1em] transition-colors duration-150 ease-lab ${
                  isActive(item)
                    ? "border-ink bg-ink text-sticker"
                    : "border-transparent text-ink hover:border-ink hover:bg-sticker"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LocaleSwitch locale={locale} />
            <button
              ref={triggerRef}
              type="button"
              className="brut-lift flex min-h-11 items-center gap-3 border-[3px] border-ink bg-surface px-3 font-mono text-2xs font-bold uppercase tracking-[0.12em] text-ink shadow-[var(--shadow-sm)] hover:bg-sticker xl:hidden"
              aria-expanded={open}
              aria-controls="site-index"
              aria-label={open ? t.menuClose : t.menuOpen}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="hidden sm:inline">{t.indexLabel} {String(rank.index).padStart(2, "0")} / {String(rank.total).padStart(2, "0")}</span>
              <span className="sm:hidden">{t.indexLabel}</span>
              <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden>
                <Menu size={16} className={`absolute transition-[opacity,transform] duration-150 ease-lab ${open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
                <X size={16} className={`absolute transition-[opacity,transform] duration-150 ease-lab ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div ref={panelRef} id="site-index" role="dialog" aria-modal="true" aria-label={t.siteIndexAria} className="pointer-events-auto fixed inset-0 z-40 overflow-y-auto bg-bg pt-16">
          <nav aria-label={t.primaryAria} className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[1440px] gap-10 px-5 pb-10 md:grid-cols-12 md:px-8 lg:px-[var(--page-gutter)]">
            <div className="md:col-span-3">
              <p className="sticker sticker--signal">{t.panelTitle}</p>
              <p className="mt-5 max-w-52 text-sm leading-relaxed text-ink-secondary">{t.panelBody}</p>
              <p className="mt-10 font-mono text-2xs uppercase tracking-[0.14em] text-ink-secondary">{t.panelHint}</p>
            </div>
            <div className="md:col-span-8 md:col-start-5">
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
                          const target = document.getElementById(id);
                          target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
                          if (target) {
                            target.setAttribute("tabindex", "-1");
                            target.focus({ preventScroll: true });
                          }
                        });
                        return;
                      }
                      setOpen(false);
                    }}
                    aria-current={isActive(item) ? "true" : undefined}
                    className="group grid grid-cols-[44px_1fr_auto] items-center gap-4 border-b-[2px] border-ink py-4 transition-colors duration-150 ease-lab hover:bg-sticker md:py-5"
                  >
                    <span className="sticker sticker--ink grid h-9 w-11 place-items-center justify-self-start p-0">{String(index + 1).padStart(2, "0")}</span>
                    <span className={`font-display text-2xl leading-none tracking-[-0.03em] transition-transform duration-150 ease-lab group-hover:translate-x-2 md:text-4xl ${isActive(item) ? "text-signal-ink" : "text-ink"}`}>{item.label}</span>
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
