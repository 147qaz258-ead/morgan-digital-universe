"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

export interface RailSection {
  id: string;
  label: string;
}

/**
 * 单页滚动的章节导航。用 IntersectionObserver 判定当前章节，
 * 不使用 scroll 监听；同时把当前章节广播给顶部导航。
 * 只用刻度条表达位置，标签在悬停/聚焦时才出现，避免压住正文。
 */
export function SectionRail({ locale, items }: { locale: Locale; items: RailSection[] }) {
  const t = getDictionary(locale).home;
  const [active, setActive] = useState<string | null>(null);
  const key = items.map((item) => item.id).join("|");

  useEffect(() => {
    const nodes = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    let lastId: string | null | undefined;

    // 用一条判定线（视口 48%）所在的章节作为当前章节。
    // 章节首尾相接，除开场的滚动影片外，线上永远只压着一个章节，
    // 比按 intersectionRatio 排序更稳定，也不会出现慢一节的滞后。
    const sync = () => {
      const line = window.innerHeight * 0.48;
      const current = nodes.find((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top <= line && rect.bottom > line;
      });
      const id = current?.id ?? null;
      if (id === lastId) return;
      lastId = id;
      setActive(id);
      const position = id ? items.findIndex((item) => item.id === id) : -1;
      window.dispatchEvent(
        new CustomEvent("lab:section", {
          detail: id
            ? { id, label: items[position]?.label ?? "", index: position + 1, total: items.length }
            : { id: null },
        }),
      );
    };

    const observer = new IntersectionObserver(sync, {
      rootMargin: "-40% 0px -48% 0px",
      threshold: [0, 0.01, 0.25, 0.6],
    });

    nodes.forEach((node) => observer.observe(node));
    sync();
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <nav
      aria-label={t.railAria}
      className={`fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 ease-lab xl:block ${
        active ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <ol className="flex flex-col items-end gap-0.5">
        {items.map((item, index) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={item.label}
                className="group relative flex h-7 items-center justify-end pr-1"
              >
                <span className="pointer-events-none absolute right-7 whitespace-nowrap border border-line bg-bg px-2 py-1 font-mono text-2xs uppercase tracking-[0.14em] text-ink opacity-0 transition-opacity duration-300 ease-lab group-hover:opacity-100 group-focus-visible:opacity-100">
                  {String(index + 1).padStart(2, "0")} {item.label}
                </span>
                <span
                  aria-hidden
                  className={`block h-px transition-all duration-300 ease-lab ${
                    isActive ? "w-6 bg-signal" : "w-3 bg-ink/25 group-hover:w-5 group-hover:bg-ink/45"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
