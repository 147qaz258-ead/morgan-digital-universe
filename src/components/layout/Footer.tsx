import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/content/site";
import { profile } from "@/content/profile";
import { Meta } from "../ui/typography";
import { Divider } from "../ui/StatusPill";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg text-ink">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-9 md:px-8 lg:px-[var(--page-gutter)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Meta className="font-semibold text-ink">MORGAN / DIGITAL LAB</Meta>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-secondary">
              {site.mission}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {profile.github ? (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.08em] text-ink-secondary transition-colors hover:text-ink"
              >
                GITHUB <ArrowUpRight size={14} aria-hidden />
              </a>
            ) : null}
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center border border-line text-ink-secondary transition-colors hover:border-ink/30 hover:text-ink"
              >
                <Mail size={17} />
              </a>
            ) : null}
          </div>
        </div>
        <Divider className="my-7" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Meta className="text-ink-secondary">© {year} {site.brandName}</Meta>
          <Meta className="text-ink-secondary">AI / Robotics / Hardware / Physical systems</Meta>
        </div>
      </div>
    </footer>
  );
}
