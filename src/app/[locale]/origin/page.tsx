import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getOriginStages, getOriginTurningPoint } from "@/content/origin";
import { getPageCopy } from "@/content/pages";
import { getEvidenceRecord, getProject } from "@/content/projects";
import { PageContainer, Section } from "@/components/layout/PageContainer";
import { H2, Body, Meta } from "@/components/ui/typography";
import { StageVisual } from "@/components/ui/StageVisual";
import { PendingAsset } from "@/components/ui/PendingAsset";
import { TrackOnView } from "@/components/motion/Track";
import { ContactCta } from "@/components/layout/ContactCta";
import { evidenceHref, isVerifiedEvidence } from "@/lib/evidence";
import { getRouteMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { DocumentationStatus } from "@/components/ui/DocumentationStatus";
import type { OriginStage } from "@/content/types";
import { AtmosphereFrame } from "@/components/ui/AtmosphereFrame";
import { originAtmosphere } from "@/content/atmosphere";
import { LabPageHeader, SectionIndex } from "@/components/layout/LabInterface";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, localePath } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, getRouteMetadata(locale).origin);
}

export default async function OriginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale).origin;
  const pageCopy = getPageCopy(locale);
  const originStages = getOriginStages(locale);
  const turningPoint = getOriginTurningPoint(locale);

  const publishedProjectsFor = (stage: OriginStage) =>
    stage.projectRefs
      .map((slug) => getProject(locale, slug))
      .filter((project) => project?.publicationStatus === "published");

  const hasConfirmedTimeline = originStages.some((stage) => Boolean(stage.yearRange));

  return (
    <PageContainer>
      <LabPageHeader eyebrow={pageCopy.origin.eyebrow} title={pageCopy.origin.title} intro={pageCopy.origin.intro} />

      <Section className="border-t border-line !pt-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <SectionIndex items={originStages.map((stage) => ({ id: stage.id, number: stage.label, label: stage.title }))} label={t.stagesLabel} />
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {originStages.map((stage) => (
              <article id={stage.id} key={stage.id} className="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0 md:py-16">
                <div className="grid gap-8 md:grid-cols-[1fr_1.05fr] md:items-center">
                  <div>
                    <Meta className="text-signal">{t.stageLabel} {stage.label}</Meta>
                    <H2 className="mt-4 !text-[30px]">{stage.title}</H2>
                    <Body className="mt-4 font-medium text-ink">{stage.oneLine}</Body>
                    <Body className="mt-4 text-ink-secondary">{stage.narrative}</Body>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
                      {stage.skills.map((skill) => <Meta key={skill} className="text-ink-secondary">{skill}</Meta>)}
                    </div>
                    {publishedProjectsFor(stage).length > 0 ? (
                      <div className="mt-6 flex flex-col items-start gap-2">
                        {publishedProjectsFor(stage).map((project) => project ? (
                            <Link key={project.slug} href={localePath(locale, `/experiments/${project.slug}`)} className="inline-flex items-center gap-2 border-b border-accent/30 pb-1 text-[13px] font-medium text-accent hover:border-accent">
                              {project.shortTitle}<ArrowUpRight size={14} aria-hidden />
                            </Link>
                          ) : null)}
                      </div>
                    ) : null}
                    {stage.evidenceRefs.some((id) => {
                      const record = getEvidenceRecord(locale, id);
                      return Boolean(record && isVerifiedEvidence(record.evidence));
                    }) ? (
                      <div className="mt-4 flex flex-col items-start gap-2 border-t border-line pt-4">
                        {stage.evidenceRefs.map((id) => {
                          const record = getEvidenceRecord(locale, id);
                          return record && isVerifiedEvidence(record.evidence) ? (
                            <Link key={id} href={evidenceHref(locale, record.project.slug, id)} className="inline-flex items-center gap-2 text-[12px] font-medium text-accent">
                              {t.verifiedEvidence}: {record.evidence.title}<ArrowUpRight size={13} aria-hidden />
                            </Link>
                          ) : null;
                        })}
                      </div>
                    ) : null}
                  </div>
                  {stage.id === "intelligence" ? (
                    <AtmosphereFrame media={originAtmosphere.digitalIntelligence} aspect="4/3" locale={locale} />
                  ) : stage.id === "building-physical-systems" ? (
                    <AtmosphereFrame media={originAtmosphere.hardwareRobotics} aspect="4/3" locale={locale} />
                  ) : (
                    <div className="coordinate-corner relative aspect-[4/3] border border-line bg-surface p-6 md:p-8">
                      <StageVisual type={stage.visualType} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Meta className="text-signal">{t.turningPoint}</Meta>
            <H2 className="mt-5 !text-[38px] md:!text-[52px]">“{turningPoint.line}”</H2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <PendingAsset className="aspect-[16/9] w-full" label={t.closeupPending} />
            <Meta className="mt-3 block text-ink-secondary">{t.userEvidenceNote}</Meta>
          </div>
        </div>
      </Section>

      <TrackOnView event="origin_complete">
        {hasConfirmedTimeline ? (
          <div className="grid grid-cols-2 border-y border-line md:grid-cols-4">
            {originStages.filter((stage) => stage.yearRange).map((stage) => (
              <div key={stage.id} className="border-r border-line px-4 py-6 last:border-r-0 md:px-6">
                <Meta className="text-signal">{stage.label}</Meta>
                <p className="mt-3 text-[14px] font-semibold text-ink">{stage.title}</p>
                <Meta className="mt-2 block text-ink-secondary">{stage.yearRange}</Meta>
              </div>
            ))}
          </div>
        ) : (
          <DocumentationStatus
            locale={locale}
            label={t.timelineLabel}
            title={t.timelineTitle}
            body={pageCopy.origin.timelinePending}
          />
        )}
      </TrackOnView>

      <ContactCta locale={locale} />
    </PageContainer>
  );
}
