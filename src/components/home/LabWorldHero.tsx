import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { getShowcaseCopy } from "@/content/showcase";
import { getProjects } from "@/content/projects";
import { localePath, type Locale } from "@/i18n/config";
import { SignalSculpture } from "./SignalSculpture";
import styles from "./LabWorld.module.css";

export function LabWorldHero({ locale }: { locale: Locale }) {
  const copy = getShowcaseCopy(locale);
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroCanvas}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span />{copy.eyebrow}</p>
          <h1 id="home-title" className={styles.heroHeading}>{copy.headline[0]}<br /><span>{copy.headline[1]}</span></h1>
          <p className={styles.heroIntro}>{copy.intro}</p>
          <div className={styles.heroActions}>
            <a href="#index" className={styles.primary}>{copy.primary}<ArrowUpRight size={18} aria-hidden /></a>
            <Link href={localePath(locale, "/about")} className={styles.textLink}>{copy.openAbout}<ArrowUpRight size={16} aria-hidden /></Link>
          </div>
          <p className={styles.discipline}>{copy.discipline}</p>
        </div>
        <SignalSculpture locale={locale} />
      </div>
      <div className={styles.heroFooter}>
        <p><span className={styles.archiveCount}>{String(getProjects(locale).length).padStart(2, "0")}</span>{copy.archive}</p>
        <a href="#index" className={styles.scrollLink}>{copy.scroll}<ArrowDown size={16} aria-hidden /></a>
      </div>
    </section>
  );
}
