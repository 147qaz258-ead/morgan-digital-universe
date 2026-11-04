import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { HomeScrollDirector } from "@/components/home/HomeScrollDirector";
import { SectionRail } from "@/components/home/SectionRail";
import { ContactCta } from "@/components/layout/ContactCta";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatusPill } from "@/components/ui/StatusPill";
import { H2, Meta } from "@/components/ui/typography";
import { RevealOnScroll } from "@/components/motion/Reveal";
import {
  CapabilitiesSection,
  LabSection,
  OriginSection,
  ProjectIndexSection,
  VisionSection,
} from "@/components/sections/HomeSections";
import { getProfile } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, localePath } from "@/i18n/config";

const focusTone = { ACTIVE: "accent", BUILDING: "signal", EXPLORING: "neutral" } as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const profile = getProfile(locale);
  const t = getDictionary(locale).home;

  // 单页滚动的章节索引，顺序与下方渲染顺序一致
  const railItems = [
    { id: "now", label: t.sections.now },
    { id: "index", label: t.sections.index },
    { id: "origin", label: t.sections.origin },
    { id: "capabilities", label: t.sections.capabilities },
    { id: "lab", label: t.sections.lab },
    { id: "vision", label: t.sections.vision },
    { id: "contact", label: t.sections.contact },
  ];

  return (
    <>
      <HomeScrollDirector locale={locale} />
      <SectionRail locale={locale} items={railItems} />

      <div className="bg-bg">
        <section
          id="now"
          aria-labelledby="now-title"
          className="scroll-mt-24 border-t border-line py-20 md:py-28"
        >
          <PageContainer>
            <RevealOnScroll className="grid gap-10 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-4">
                <div className="flex items-baseline gap-3">
                  <Meta className="text-signal tabular-nums">01</Meta>
                  <Meta className="text-ink-secondary">{t.nowEyebrow}</Meta>
                </div>
                <H2 id="now-title" className="mt-5 max-w-sm">
                  {t.nowTitle}
                </H2>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <div className="border-t border-line">
                  {profile.currentFocus.map((item, index) => (
                    <div key={item.label} className="grid min-h-20 grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-line md:grid-cols-[48px_1fr_auto]">
                      <Meta className="text-signal tabular-nums">{String(index + 1).padStart(2, "0")}</Meta>
                      <span className="text-base font-semibold text-ink">{item.label}</span>
                      <StatusPill label={item.status} tone={focusTone[item.status]} />
                    </div>
                  ))}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-6">
                    <p className="max-w-md text-sm leading-relaxed text-ink-secondary text-pretty">{t.archiveNote}</p>
                    <Link
                      href={localePath(locale, "/experiments")}
                      className="inline-flex min-h-11 shrink-0 items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink transition-colors duration-300 ease-lab hover:text-signal active:translate-y-px"
                    >
                      {t.openIndex} <ArrowUpRight size={14} aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </PageContainer>
        </section>

        <ProjectIndexSection locale={locale} />
        <OriginSection locale={locale} />
        <CapabilitiesSection locale={locale} />
        <LabSection locale={locale} />
        <VisionSection locale={locale} />

        <div id="contact" className="scroll-mt-24 border-t border-line">
          <PageContainer>
            <ContactCta locale={locale} />
          </PageContainer>
        </div>
      </div>
    </>
  );
}
