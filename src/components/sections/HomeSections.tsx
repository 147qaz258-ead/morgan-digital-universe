import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPageCopy } from "@/content/pages";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";
import { getOriginStages } from "@/content/origin";
import { getCapabilityGroups } from "@/content/capabilities";
import { getLabItems } from "@/content/lab";
import { getVisionStages } from "@/content/vision";
import { getProjects } from "@/content/projects";
import { Body, H2, Meta } from "@/components/ui/typography";
import { RevealOnScroll } from "@/components/motion/Reveal";

/**
 * 首页单页滚动的章节。每节都是「编号 + 标题 + 内容」同一套网格，
 * 与独立路由页共用内容层，但只呈现摘要，完整细节留在 /origin 等页面。
 */

function SectionShell({
  id,
  index,
  eyebrow,
  title,
  href,
  linkLabel,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-[var(--page-gutter)]">
        <RevealOnScroll className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <div className="flex items-baseline gap-3">
              <Meta className="text-signal tabular-nums">{index}</Meta>
              <Meta className="text-ink-secondary">{eyebrow}</Meta>
            </div>
            <H2 id={`${id}-title`} className="mt-5 max-w-sm">
              {title}
            </H2>
            {href && linkLabel ? (
              <Link
                href={href}
                className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-line pb-1 font-mono text-2xs uppercase tracking-[0.12em] text-ink-secondary transition-colors duration-300 ease-lab hover:border-accent hover:text-accent active:translate-y-px"
              >
                {linkLabel}
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            ) : null}
          </div>
          <div className="md:col-span-7 md:col-start-6">{children}</div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function ProjectIndexSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pageCopy = getPageCopy(locale);
  const projects = getProjects(locale);

  return (
    <SectionShell
      id="index"
      index="02"
      eyebrow={pageCopy.experiments.eyebrow}
      title={pageCopy.experiments.title}
      href={localePath(locale, "/experiments")}
      linkLabel={t.home.openIndex}
    >
      <div className="border-t border-line">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={localePath(locale, `/experiments/${project.slug}`)}
            className="group grid grid-cols-[32px_minmax(0,1fr)] items-baseline gap-3 border-b border-line py-5 transition-colors duration-300 ease-lab hover:bg-surface/70 md:grid-cols-[48px_minmax(0,1fr)_auto] md:gap-5"
          >
            <Meta className="text-signal tabular-nums">{project.index}</Meta>
            <span className="min-w-0">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-lg font-semibold leading-snug text-ink transition-colors duration-300 ease-lab group-hover:text-accent">
                  {project.shortTitle}
                </span>
                <Meta className="hidden text-ink-secondary md:inline">{project.category}</Meta>
              </span>
              <span className="mt-1 block max-w-xl text-sm leading-relaxed text-ink-secondary text-pretty">
                {project.oneLine}
              </span>
              {/* 手机上把状态放到正文下面，避免右列把描述挤成窄条 */}
              <span className="mt-3 flex items-center gap-2 md:hidden">
                <Meta className="text-ink-secondary">{t.status[project.status]}</Meta>
                <ArrowUpRight size={14} aria-hidden className="text-ink-secondary" />
              </span>
            </span>
            <span className="hidden items-center gap-2 md:flex">
              <Meta className="text-ink-secondary">{t.status[project.status]}</Meta>
              <ArrowUpRight
                size={14}
                aria-hidden
                className="text-ink-secondary transition-transform duration-300 ease-lab group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </span>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

export function OriginSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pageCopy = getPageCopy(locale);
  const stages = getOriginStages(locale);

  return (
    <SectionShell
      id="origin"
      index="03"
      eyebrow={pageCopy.origin.eyebrow}
      title={pageCopy.origin.title}
      href={localePath(locale, "/origin")}
      linkLabel={t.home.viewOrigin}
    >
      <div className="border-t border-line">
        {stages.map((stage) => (
          <div key={stage.id} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-line py-6 md:grid-cols-[48px_minmax(0,1fr)_72px] md:gap-5">
            <Meta className="text-signal tabular-nums">{stage.label}</Meta>
            <div className="min-w-0">
              <p className="text-lg font-semibold leading-snug text-ink">{stage.title}</p>
              <Body className="mt-2 max-w-xl text-sm text-ink-secondary">{stage.oneLine}</Body>
            </div>
            <Meta className="hidden text-ink-secondary md:block md:text-right">
              {stage.yearRange ?? t.home.openYear}
            </Meta>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function CapabilitiesSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pageCopy = getPageCopy(locale);
  const groups = getCapabilityGroups(locale);

  return (
    <SectionShell
      id="capabilities"
      index="04"
      eyebrow={pageCopy.capabilities.eyebrow}
      title={pageCopy.capabilities.title}
      href={localePath(locale, "/capabilities")}
      linkLabel={t.home.sectionOpen}
    >
      <div className="grid gap-10 sm:grid-cols-2">
        {groups.map((group, groupIndex) => (
          <div key={group.id} className="border-t border-line pt-5">
            <div className="flex items-baseline gap-3">
              <Meta className="text-signal tabular-nums">{String(groupIndex + 1).padStart(2, "0")}</Meta>
              <p className="text-base font-semibold text-ink">{group.title}</p>
            </div>
            <Meta className="mt-2 block text-ink-secondary">{group.subtitle}</Meta>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 last:border-b-0">
                  <span className="text-sm leading-relaxed text-ink text-pretty">{item.name}</span>
                  {item.proofProjectSlug ? (
                    <Link
                      href={localePath(locale, `/experiments/${item.proofProjectSlug}`)}
                      className="shrink-0 font-mono text-2xs uppercase tracking-[0.1em] text-accent transition-colors duration-300 ease-lab hover:text-ink active:translate-y-px"
                    >
                      {t.capabilities.proofPrefix}
                    </Link>
                  ) : (
                    <Meta className="shrink-0 text-ink-secondary">{t.capabilities.evidencePending}</Meta>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function LabSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pageCopy = getPageCopy(locale);
  const items = getLabItems(locale);

  return (
    <SectionShell
      id="lab"
      index="05"
      eyebrow={pageCopy.lab.eyebrow}
      title={pageCopy.lab.title}
      href={localePath(locale, "/lab")}
      linkLabel={t.home.sectionOpen}
    >
      {items.length > 0 ? (
        <div className="border-t border-line">
          {items.map((item, index) => (
            <div key={item.id} className="border-b border-line py-6">
              <div className="flex flex-wrap items-baseline gap-3">
                <Meta className="text-signal tabular-nums">{String(index + 1).padStart(2, "0")}</Meta>
                <Meta className="text-ink-secondary">{t.lab.categories[item.category]}</Meta>
                <Meta className="text-ink-secondary">{item.date ?? "—"}</Meta>
              </div>
              <p className="mt-3 text-lg font-semibold leading-snug text-ink">{item.title}</p>
              <Body className="mt-2 max-w-2xl text-sm text-ink-secondary">{item.summary}</Body>
            </div>
          ))}
        </div>
      ) : (
        <Body className="border-t border-line pt-6 text-ink-secondary">{pageCopy.lab.empty}</Body>
      )}
    </SectionShell>
  );
}

export function VisionSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pageCopy = getPageCopy(locale);
  const stages = getVisionStages(locale);

  return (
    <SectionShell
      id="vision"
      index="06"
      eyebrow={pageCopy.vision.eyebrow}
      title={pageCopy.vision.title}
      href={localePath(locale, "/vision")}
      linkLabel={t.home.sectionOpen}
    >
      <div className="border-t border-line">
        {stages.map((stage, index) => (
          <div key={stage.id} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 border-b border-line py-7 md:grid-cols-[48px_minmax(0,1fr)] md:gap-5">
            <Meta className="text-signal tabular-nums">{String(index + 1).padStart(2, "0")}</Meta>
            <div className="min-w-0">
              <Meta className="text-ink-secondary">{stage.label}</Meta>
              <p className="mt-2 max-w-2xl text-lg leading-relaxed text-ink text-pretty md:text-xl">{stage.narrative}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
