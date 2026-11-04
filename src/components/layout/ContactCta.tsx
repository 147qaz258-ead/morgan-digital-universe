import { ArrowUpRight, Mail } from "lucide-react";
import { getSite } from "@/content/site";
import { getProfile } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { H2 } from "../ui/typography";
import { Section } from "./PageContainer";
import { TrackClick } from "../motion/Track";

export function ContactCta({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const profile = getProfile(locale);
  const t = getDictionary(locale).contact;
  return (
    <Section className="py-12 md:py-16">
      <div className="grid gap-9 border-y border-line py-9 md:grid-cols-[160px_1fr_auto] md:items-center md:py-11">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-signal-bright" aria-hidden />
          <p className="font-mono text-2xs uppercase tracking-[0.16em] text-signal">{t.label}</p>
        </div>
        <div>
          <H2 className="!text-3xl md:!text-4xl">{site.contactCta}</H2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-secondary">{site.contactBody}</p>
          {profile.email ? null : (
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-ink-secondary">
              <span className="h-px w-6 bg-ink/30" aria-hidden />
              {site.contactPending}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          {profile.email ? (
            <TrackClick event="contact_click" detail={{ channel: "email" }}>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-surface transition-colors duration-300 ease-lab hover:bg-brand active:translate-y-px"
              >
                <Mail size={16} aria-hidden /> {t.email}
              </a>
            </TrackClick>
          ) : null}
          {profile.github ? (
            <TrackClick event="github_click">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ease-lab active:translate-y-px ${
                  profile.email
                    ? "border border-line text-ink hover:border-ink/35"
                    : "bg-ink text-surface hover:bg-brand"
                }`}
              >
                <ArrowUpRight size={16} aria-hidden /> GitHub
              </a>
            </TrackClick>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
