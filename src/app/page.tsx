import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeScrollDirector } from "@/components/home/HomeScrollDirector";
import { ContactCta } from "@/components/layout/ContactCta";
import { StatusPill } from "@/components/ui/StatusPill";
import { profile } from "@/content/profile";

const focusTone = { ACTIVE: "accent", BUILDING: "signal", EXPLORING: "neutral" } as const;

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/posters/home-lab-video-poster-01.webp"
        media="(max-width: 1023px)"
        fetchPriority="high"
      />
      <HomeScrollDirector />

      <div id="now" className="lab-page-shell bg-bg">
        <section className="grid gap-12 py-[var(--section-space)] md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="lab-kicker text-signal">Now / active systems</p>
            <h2 className="mt-5 max-w-sm text-[42px] font-semibold leading-[0.95] tracking-[-0.045em] text-ink md:text-[56px]">
              Work in progress, kept visible.
            </h2>
          </div>
          <div className="border-t border-line md:col-span-7 md:col-start-6">
            {profile.currentFocus.map((item, index) => (
              <div key={item.label} className="grid min-h-24 grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-line">
                <span className="lab-kicker text-signal">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[17px] font-semibold text-ink">{item.label}</span>
                <StatusPill label={item.status} tone={focusTone[item.status]} />
              </div>
            ))}
            <div className="flex items-center justify-between gap-5 border-b border-line py-7">
              <p className="max-w-md text-[14px] leading-relaxed text-ink-secondary">Project facts and real evidence are published only after verification.</p>
              <Link href="/lab" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:text-signal">
                Open lab index <ArrowUpRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </section>
        <ContactCta />
      </div>
    </>
  );
}
