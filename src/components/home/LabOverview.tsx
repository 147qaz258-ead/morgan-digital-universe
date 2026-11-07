import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getShowcaseCopy } from "@/content/showcase";
import { getOriginStages } from "@/content/origin";
import { getCapabilityGroups } from "@/content/capabilities";
import { getLabItems } from "@/content/lab";
import { getProfile } from "@/content/profile";
import { getVisionStages } from "@/content/vision";
import { localePath, type Locale } from "@/i18n/config";
import { RevealOnScroll } from "@/components/motion/Reveal";
import { WordReveal } from "./WordReveal";
import styles from "./LabWorld.module.css";

export function LabOverview({ locale }: { locale: Locale }) {
  const copy = getShowcaseCopy(locale);
  const stages = getOriginStages(locale);
  const groups = getCapabilityGroups(locale);
  const notes = getLabItems(locale);
  const profile = getProfile(locale);
  const vision = getVisionStages(locale);
  return (
    <div className={styles.overview}>
      <section id="origin" className={styles.origin} aria-labelledby="origin-heading">
        <p className={styles.eyebrow}>{copy.originEyebrow}</p>
        <div className={styles.originIntro}>
          <div id="origin-heading"><WordReveal lines={copy.originHeading} /></div>
          <div><p className={styles.secondary}>{copy.originIntro}</p><Link href={localePath(locale, "/origin")} className={styles.textLink}>{copy.originLink}<ArrowUpRight size={16} aria-hidden /></Link></div>
        </div>
        <div className={styles.pathway}>
          {stages.map((stage, index) => <div key={stage.id} className={styles.pathwayStep}><div className={styles.pathwayNumber}><span>{stage.label}</span>{index < stages.length - 1 ? <ArrowRight size={16} aria-hidden /> : <span className={styles.pathwayDot} />}</div><h3>{stage.title}</h3><p>{stage.oneLine}</p></div>)}
        </div>
      </section>
      <section id="capabilities" className={styles.capabilities} aria-labelledby="capabilities-heading">
        <RevealOnScroll>
          <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{copy.capabilitiesEyebrow}</p><h2 id="capabilities-heading">{copy.capabilitiesHeading}</h2></div><p className={styles.secondary}>{copy.capabilitiesIntro}</p></div>
          <div className={styles.toolkit}>{groups.map((group, index) => <div key={group.id} className={styles.tool}><span className={styles.micro}>0{index + 1}</span><h3>{group.title}</h3><p>{group.subtitle}</p><ul>{group.items.map((item) => <li key={item.name}>{item.proofProjectSlug ? <Link href={localePath(locale, `/experiments/${item.proofProjectSlug}`)}>{item.name}<ArrowUpRight size={14} aria-hidden /></Link> : <span>{item.name}</span>}</li>)}</ul></div>)}</div>
        </RevealOnScroll>
      </section>
      <section id="lab" className={styles.lab} aria-labelledby="lab-heading">
        <RevealOnScroll className={styles.labGrid}>
          <div className={styles.labMedia}>{notes[0]?.media?.src ? <Image src={notes[0].media.src} alt={notes[0].media.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /> : null}</div>
          <div className={styles.labCopy}><p className={styles.eyebrow}>{copy.labEyebrow}</p><h2 id="lab-heading">{copy.labHeading}</h2>{notes.map((note) => <div key={note.id} className={styles.fieldNote}><span className={styles.micro}>{note.date}</span><h3>{note.title}</h3><p>{note.summary}</p></div>)}<Link href={localePath(locale, "/lab")} className={styles.textLink}>{copy.labLink}<ArrowUpRight size={16} aria-hidden /></Link></div>
        </RevealOnScroll>
      </section>
      <section id="now" className={styles.now} aria-labelledby="now-heading"><p className={styles.eyebrow}>{copy.nowEyebrow}</p><div className={styles.nowGrid}><h2 id="now-heading">{copy.nowHeading}</h2><div>{profile.currentFocus.map((focus, index) => <div className={styles.focusRow} key={focus.label}><span className={styles.micro}>0{index + 1}</span><h3>{focus.label}</h3><span className={styles.focusStatus}><i aria-hidden />{focus.status}</span></div>)}</div></div></section>
      <section id="vision" className={styles.vision} aria-labelledby="vision-heading"><p className={styles.eyebrow}>{copy.visionEyebrow}</p><h2 id="vision-heading">{copy.visionHeading}</h2><div className={styles.horizon}>{vision.map((stage) => <div key={stage.id}><span className={styles.micro}>{stage.label}</span><p>{stage.narrative}</p></div>)}</div><Link href={localePath(locale, "/vision")} className={styles.textLink}>{copy.visionLink}<ArrowUpRight size={16} aria-hidden /></Link></section>
    </div>
  );
}
