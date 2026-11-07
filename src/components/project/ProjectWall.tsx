"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import {
  getProjectWallItems,
  projectWallCopy,
  projectWallGroups,
  type ProjectWallGroup,
} from "@/content/project-wall";
import { localePath, type Locale } from "@/i18n/config";
import styles from "./ProjectWall.module.css";

export function ProjectWall({ locale, heading = true }: { locale: Locale; heading?: boolean }) {
  const [filter, setFilter] = useState<ProjectWallGroup>("all");
  const copy = projectWallCopy[locale];
  const items = getProjectWallItems(locale);
  const visibleItems = filter === "all" ? items : items.filter((item) => item.cover?.group === filter);

  return (
    <section id="index" aria-label={copy.eyebrow} className={styles.section}>
      <div className={styles.container}>
        {heading ? (
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}><span aria-hidden />{copy.eyebrow}</p>
              <h2 className={styles.heading}>{copy.title}</h2>
            </div>
            <p className={styles.subtitle}>{copy.subtitle}</p>
          </header>
        ) : null}

        <div className={styles.toolbar}>
          <div role="group" aria-label={copy.filtersLabel} className={styles.filters}>
            {projectWallGroups.map((group) => {
              const count = group === "all" ? items.length : items.filter((item) => item.cover?.group === group).length;
              return (
                <button key={group} type="button" aria-pressed={filter === group} onClick={() => setFilter(group)} className={styles.filter}>
                  {copy.groups[group]}<span>{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
          <p className={styles.count} role="status" aria-live="polite">{String(visibleItems.length).padStart(2, "0")} / {String(items.length).padStart(2, "0")} <span>{copy.projectCount}</span></p>
        </div>

        <div className={styles.grid}>
          {visibleItems.map((item) => {
            const cover = item.cover;
            const wide = cover?.wide;
            return (
              <article key={item.slug} className={`${styles.card} ${wide ? styles.wide : ""}`}>
                <Link href={localePath(locale, `/experiments/${item.slug}`)} className={styles.link} aria-label={`${item.title} — ${copy.openProject}`}>
                  <div className={`${styles.media} ${cover?.surface === "dark" ? styles.dark : styles.light} ${cover ? styles[cover.layout] : ""}`}>
                    {cover ? (
                      <div className={styles.imageGroup}>
                        <div className={styles.primaryImage}>
                          <Image src={cover.src} alt={cover.alt[locale]} fill sizes={wide ? "(max-width: 767px) calc(100vw - 40px), (max-width: 1439px) 58vw, 744px" : cover.layout === "phones" ? "(max-width: 767px) 42vw, (max-width: 1439px) 24vw, 310px" : "(max-width: 767px) calc(100vw - 40px), (max-width: 1439px) 44vw, 624px"} className={styles.image} />
                        </div>
                        {cover.secondarySrc ? (
                          <div className={styles.secondaryImage}>
                            <Image src={cover.secondarySrc} alt={cover.secondaryAlt?.[locale] ?? cover.alt[locale]} fill sizes="(max-width: 767px) 42vw, (max-width: 1439px) 24vw, 310px" className={styles.image} />
                          </div>
                        ) : null}
                      </div>
                    ) : <div className={styles.pending} aria-hidden>{item.index}</div>}
                    <span className={`${styles.provenance} ${cover?.source === "concept" ? styles.conceptLabel : ""}`}>
                      {!cover ? copy.pending : cover.source === "concept" ? copy.concept : cover.source === "cgi" ? copy.cgi : copy.projectCapture}
                    </span>
                    {cover?.layout === "film" ? <span className={styles.play} aria-hidden><Play size={22} fill="currentColor" /></span> : null}
                  </div>

                  <div className={styles.body}>
                    <div className={styles.meta}><span>{item.index}</span><span>{item.category}</span></div>
                    <div className={styles.titleRow}><h3>{item.title}</h3><ArrowUpRight size={24} aria-hidden className={styles.arrow} /></div>
                    <p className={styles.summary}>{item.summary}</p>
                    <div className={styles.foot}><span className={styles.status}><span aria-hidden />{copy.status[item.status]}</span><span className={styles.open}>{copy.openProject}</span></div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
