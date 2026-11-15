import { ArrowUpRight, Mail } from "lucide-react";
import { getSite } from "@/content/site";
import { getProfile } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { Meta } from "../ui/typography";

/** 页脚 = 全站唯一黑底区块，用来给纸张页面收边。 */
export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const site = getSite(locale);
  const profile = getProfile(locale);
  const t = getDictionary(locale);
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-10 md:px-8 lg:px-[var(--page-gutter)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl leading-none tracking-[-0.03em] text-bg md:text-3xl">{site.brandName}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bg/70">{site.mission}</p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-bg/45">{t.footer.legal}</p>
          </div>
          <div className="flex items-center gap-3">
            {profile.github ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="brut-lift inline-flex min-h-11 items-center gap-1.5 border-[3px] border-bg bg-ink px-3 font-mono text-2xs font-bold uppercase tracking-[0.1em] text-bg shadow-[3px_3px_0_var(--sticker)] hover:bg-sticker hover:text-ink"
              >
                GITHUB <ArrowUpRight size={14} aria-hidden />
              </a>
            ) : null}
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                aria-label={t.contact.email}
                className="brut-lift flex h-11 w-11 items-center justify-center border-[3px] border-bg bg-ink text-bg shadow-[3px_3px_0_var(--signal)] hover:bg-signal hover:text-ink"
              >
                <Mail size={17} />
              </a>
            ) : null}
          </div>
        </div>
        <hr className="my-7 border-0 border-t-[2px] border-bg/25" aria-hidden />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Meta className="text-bg/60">© {year} {site.brandName}</Meta>
          <Meta className="text-bg/60">{t.footer.focusLine}</Meta>
        </div>
      </div>
    </footer>
  );
}
