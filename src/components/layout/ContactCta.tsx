import { ArrowUpRight } from "lucide-react";
import { getProfile } from "@/content/profile";
import { getShowcaseCopy } from "@/content/showcase";
import type { Locale } from "@/i18n/config";
import { TrackClick } from "../motion/Track";
import styles from "./ContactCta.module.css";

export function ContactCta({ locale }: { locale: Locale }) {
  const profile = getProfile(locale);
  const copy = getShowcaseCopy(locale);
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <p className={styles.eyebrow}><span />{copy.contactEyebrow}</p>
      <div className={styles.grid}>
        <h2 id="contact-title">{copy.contactTitle[0]}<br /><span>{copy.contactTitle[1]}</span></h2>
        <div className={styles.side}>
          <p>{copy.contactIntro}</p>
          {profile.email ? <TrackClick event="contact_click" detail={{ channel: "email" }}><a className={styles.action} href={`mailto:${profile.email}`}>{copy.contactAction}<ArrowUpRight size={20} aria-hidden /></a></TrackClick> : null}
          {profile.github ? <TrackClick event="github_click"><a className={styles.github} href={profile.github} target="_blank" rel="noopener noreferrer">{copy.contactGithub}<ArrowUpRight size={16} aria-hidden /></a></TrackClick> : null}
        </div>
      </div>
    </section>
  );
}
