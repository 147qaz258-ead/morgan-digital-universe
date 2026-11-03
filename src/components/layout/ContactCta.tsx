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
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">{t.label}</p>
        </div>
        <div>
          <H2 className="!text-[28px] md:!text-[34px]">{site.contactCta}</H2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-secondary">{site.contactBody}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          {profile.email ? (
            <TrackClick event="contact_click" detail={{ channel: "email" }}>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-surface transition-colors hover:bg-brand"
              >
                <Mail size={16} aria-hidden /> {t.email}
              </a>
            </TrackClick>
          ) : (
            <span className="inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-secondary">
              {site.contactPending}
            </span>
          )}
          {profile.github ? (
            <TrackClick event="github_click">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink/35"
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
