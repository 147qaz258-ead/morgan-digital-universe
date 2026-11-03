import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import { getProjects, getProject, getAdjacentProjects } from "@/content/projects";
import { getPageCopy } from "@/content/pages";
import { PageContainer, Section } from "@/components/layout/PageContainer";
import { H1, H2, H3, Body, BodyLarge, Meta } from "@/components/ui/typography";
import { ProjectIndex, StatusPill } from "@/components/ui/StatusPill";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { DocumentationStatus, PendingEvidenceList } from "@/components/ui/DocumentationStatus";
import { TrackEvent, TrackClick } from "@/components/motion/Track";
import { isVerifiedEvidence } from "@/lib/evidence";
import { SystemDiagram } from "@/components/project/SystemDiagram";
import { ProjectSignalPlate } from "@/components/project/ProjectSignalPlate";
import { createProjectMetadata } from "@/lib/metadata";
import type { Project } from "@/content/types";
import { AtmosphereFrame } from "@/components/ui/AtmosphereFrame";
import { motionAtmosphere, projectAtmosphere } from "@/content/atmosphere";
import { EditorialCaseLayout, SectionIndex, type SectionIndexItem } from "@/components/layout/LabInterface";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, localePath, type Locale } from "@/i18n/config";

const statusTone: Record<Project["status"], "signal" | "accent" | "neutral"> = {
  "active-research": "signal",
  prototype: "accent",
  partial: "accent",
  planned: "neutral",
  completed: "accent",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects("en").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};
  return createProjectMetadata(locale, project);
}

function SectionBlock({ id, no, title, children }: { id: string; no: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-12 md:py-16">
      <div className="grid gap-7 md:grid-cols-[150px_1fr]">
        <div>
        <Meta className="text-signal">{no}</Meta>
        <H2 className="mt-4 !text-[28px] md:!text-[32px]">{title}</H2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const project = getProject(locale, slug);
  if (!project) notFound();

  const dictionary = getDictionary(locale);
  const t = dictionary.project;
  const statusLabels = dictionary.status;
  const pageCopy = getPageCopy(locale);
  const { prev, next } = getAdjacentProjects(locale, slug);
  const isPublished = project.publicationStatus === "published";
  const verifiedEvidence = project.evidence.filter(isVerifiedEvidence);
  const pendingEvidence = project.evidence.filter((item) => !isVerifiedEvidence(item));
  const publishedHero = project.media.hero?.status !== "pending" ? project.media.hero : null;
  const atmosphere = projectAtmosphere[project.slug];
  const detailAtmosphere = project.slug === "physical-link" ? motionAtmosphere.physicalLink : atmosphere;
  const pendingFields = [
    !project.dateRange ? t.pendingDateRange : null,
    !project.teamSize ? t.pendingTeamSize : null,
    project.contributors.length === 0 ? t.pendingContributors : null,
    project.problem.length === 0 ? t.pendingProblem : null,
    !project.insight ? t.pendingIdea : null,
    project.solution.length === 0 && !project.systemDiagram ? t.pendingSystem : null,
    project.build.length === 0 && project.media.gallery.length === 0 ? t.pendingBuild : null,
    !project.myRole ? t.pendingRole : null,
    project.stack.length === 0 ? t.pendingStack : null,
    project.failures.length === 0 ? t.pendingFailure : null,
    !project.result.summary ? t.pendingResult : null,
    project.lessons.length === 0 ? t.pendingLessons : null,
    !project.next ? t.pendingNext : null,
  ].filter(Boolean) as string[];

  const metadataRows: [string, string][] = isPublished
    ? [
        [t.metaStatus, statusLabels[project.status]],
        [t.metaCategory, project.category],
        project.year ? [t.metaYear, String(project.year)] : null,
        project.dateRange ? [t.metaDate, project.dateRange] : null,
        project.myRole ? [t.metaRole, project.myRole] : null,
        project.teamSize ? [t.metaTeam, project.teamSize] : null,
        project.stack.length > 0 ? [t.metaStack, project.stack.join(" / ")] : null,
      ].filter((item): item is [string, string] => Boolean(item))
    : [
        [t.metaRecord, t.publicationLabel],
        [t.metaEvidence, `${verifiedEvidence.length} ${t.verifiedCount}`],
        [t.metaCategory, project.category],
      ];

  const caseSections: SectionIndexItem[] = [
    !isPublished ? { id: "documentation", number: "01", label: t.sectionDocumentation } : null,
    isPublished && project.problem.length > 0 ? { id: "problem", number: "02", label: t.sectionProblem } : null,
    isPublished && project.insight ? { id: "idea", number: "03", label: t.sectionIdea } : null,
    isPublished && (project.systemDiagram?.status === "confirmed" || project.solution.length > 0) ? { id: "system", number: "04", label: t.sectionSystem } : null,
    isPublished && (project.build.length > 0 || project.media.gallery.length > 0 || project.myRole) ? { id: "build", number: "05", label: t.sectionBuild } : null,
    verifiedEvidence.length > 0 ? { id: "evidence", number: "06", label: t.sectionEvidence } : null,
    isPublished && project.failures.length > 0 ? { id: "failure", number: "07", label: t.sectionFailure } : null,
    isPublished && project.result.summary ? { id: "state", number: "08", label: t.sectionState } : null,
    isPublished && project.lessons.length > 0 ? { id: "lessons", number: "09", label: t.sectionLessons } : null,
    { id: "related", number: "10", label: t.sectionRelated },
  ].filter((item): item is SectionIndexItem => Boolean(item));

  return (
    <PageContainer>
      <TrackEvent event="project_open" detail={{ slug: project.slug }} />
      <Section className="!pb-14 !pt-32 md:!pb-20 md:!pt-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4">
              <ProjectIndex value={project.index} />
              <StatusPill
                label={isPublished ? statusLabels[project.status] : statusLabels["publication-review"]}
                tone={isPublished ? statusTone[project.status] : "neutral"}
              />
              {isPublished && project.dateRange ? <Meta className="text-ink-secondary">{project.dateRange}</Meta> : null}
            </div>
            <H1 className="mt-6 max-w-5xl !text-[46px] !leading-[0.94] !tracking-[-0.05em] md:!text-[72px]">{project.title}</H1>
            <BodyLarge className="mt-6 max-w-2xl text-ink-secondary">{project.oneLine}</BodyLarge>
          </div>
          <dl className="border-t border-line lg:col-span-3 lg:col-start-10">
            {metadataRows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[84px_1fr] gap-4 border-b border-line py-4">
                <dt><Meta className="text-ink-secondary">{label}</Meta></dt>
                <dd className="text-[13px] font-medium leading-relaxed text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-12">
          {publishedHero ? (
            <MediaFrame
              media={publishedHero}
              alt={publishedHero.alt}
              aspect="16/9"
              fit={publishedHero.height > publishedHero.width ? "contain" : "cover"}
              large
              preload
              locale={locale}
              transitionName={`project-media-${project.slug}`}
            />
          ) : detailAtmosphere ? (
            <AtmosphereFrame media={detailAtmosphere} aspect="16/9" large preload locale={locale} transitionName={`project-media-${project.slug}`} />
          ) : (
            <ProjectSignalPlate project={project} locale={locale} />
          )}
        </div>
      </Section>

      <EditorialCaseLayout rail={<SectionIndex items={caseSections} label={`${project.shortTitle} ${t.chaptersSuffix}`} />}>
      {!isPublished ? (
        <SectionBlock id="documentation" no="01" title={t.sectionDocumentation}>
          <DocumentationStatus
            locale={locale}
            label={t.publicationLabel}
            title={t.publicationTitle}
            body={`${pageCopy.home.publicationPending} ${t.publicationAwaiting}: ${pendingFields.join(" · ")}.`}
          />
          <div className="mt-6 grid gap-5 md:grid-cols-[220px_1fr] md:gap-8">
            <Meta className="text-ink-secondary">{t.evidenceManifest}</Meta>
            <PendingEvidenceList evidence={pendingEvidence} locale={locale} />
          </div>
        </SectionBlock>
      ) : null}

      {isPublished && project.problem.length > 0 ? (
        <SectionBlock id="problem" no="02" title={t.sectionProblem}>
          <div className="space-y-5">
            {project.problem.map((problem) => <Body key={problem} className="max-w-3xl text-ink-secondary">{problem}</Body>)}
          </div>
        </SectionBlock>
      ) : null}

      {isPublished && project.insight ? (
        <SectionBlock id="idea" no="03" title={t.sectionIdea}>
          <BodyLarge className="max-w-3xl text-ink">{project.insight}</BodyLarge>
        </SectionBlock>
      ) : null}

      {isPublished && (project.systemDiagram?.status === "confirmed" || project.solution.length > 0) ? (
        <SectionBlock id="system" no="04" title={t.sectionSystem}>
          {project.systemDiagram?.status === "confirmed" ? (
            <SystemDiagram diagram={project.systemDiagram} />
          ) : (
            <div className="border-y border-line">
              {project.solution.map((step, index) => (
                <div key={step} className="grid grid-cols-[52px_1fr_auto] items-center gap-4 border-b border-line py-5 last:border-b-0">
                  <Meta className="text-signal">{String(index + 1).padStart(2, "0")}</Meta>
                  <Body className="text-ink-secondary">{step}</Body>
                  {index < project.solution.length - 1 ? <MoveRight size={16} className="text-ink-secondary/50" aria-hidden /> : null}
                </div>
              ))}
            </div>
          )}
        </SectionBlock>
      ) : null}

      {isPublished && (project.build.length > 0 || project.media.gallery.length > 0 || project.myRole) ? (
        <SectionBlock id="build" no="05" title={t.sectionBuild}>
          {project.myRole ? (
            <div className="mb-8 border-y border-line py-5">
              <Meta className="text-signal">{t.myWork}</Meta>
              <Body className="mt-3 max-w-3xl text-ink">{project.myRole}</Body>
            </div>
          ) : null}
          {project.build.length > 0 ? (
            <div className="mb-8 space-y-4">
              {project.build.map((entry) => <Body key={entry} className="max-w-3xl text-ink-secondary">{entry}</Body>)}
            </div>
          ) : null}
          {project.media.gallery.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.media.gallery.map((media, index) => (
                <MediaFrame
                  key={media.id}
                  media={media}
                  alt={media.alt || `${project.shortTitle} ${t.mediaFallback} ${index + 1}`}
                  aspect={media.height > media.width ? "4/3" : media.aspectRatio}
                  locale={locale}
                />
              ))}
            </div>
          ) : null}
        </SectionBlock>
      ) : null}

      {verifiedEvidence.length > 0 ? (
        <SectionBlock id="evidence" no="06" title={t.sectionEvidence}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {verifiedEvidence.map((evidence) => (
              <TrackClick key={evidence.id} event="evidence_open" detail={{ slug: project.slug, evidence: evidence.id }}>
                <article id={evidence.id} className="scroll-mt-28">
                  <MediaFrame media={evidence.asset} alt={evidence.title} caption={evidence.caption} locale={locale} />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <Meta className="normal-case tracking-normal text-ink-secondary">{evidence.title}</Meta>
                    <Meta className="text-accent">{t.verified}</Meta>
                  </div>
                </article>
              </TrackClick>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {isPublished && project.failures.length > 0 ? (
        <SectionBlock id="failure" no="07" title={t.sectionFailure}>
          <div className="border-t border-line">
            {project.failures.map((failure, index) => (
              <div key={failure.what} className="grid gap-4 border-b border-line py-6 md:grid-cols-[48px_1fr]">
                <Meta className="text-signal">F-{String(index + 1).padStart(2, "0")}</Meta>
                <div>
                  <H3 className="!text-[20px]">{failure.what}</H3>
                  <Body className="mt-3 text-ink-secondary">{t.whyLabel} {failure.why}</Body>
                  {failure.change ? <Body className="mt-2 text-ink-secondary">{t.changedLabel} {failure.change}</Body> : null}
                  {failure.lesson ? <Body className="mt-2 text-ink">{t.learnedLabel} {failure.lesson}</Body> : null}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {isPublished && project.result.summary ? (
        <SectionBlock id="state" no="08" title={t.sectionState}>
          <div className="flex flex-wrap items-center gap-4">
            <StatusPill label={statusLabels[project.result.state]} tone={statusTone[project.result.state]} />
            <Meta className="text-ink-secondary">{t.claimsLimited}</Meta>
          </div>
          <Body className="mt-6 max-w-3xl text-ink-secondary">{project.result.summary}</Body>
        </SectionBlock>
      ) : null}

      {isPublished && project.lessons.length > 0 ? (
        <SectionBlock id="lessons" no="09" title={t.sectionLessons}>
          <div className="border-t border-line">
            {project.lessons.map((lesson, index) => (
              <div key={lesson} className="grid grid-cols-[48px_1fr] gap-4 border-b border-line py-5">
                <Meta className="text-signal">{String(index + 1).padStart(2, "0")}</Meta>
                <Body className="text-ink-secondary">{lesson}</Body>
              </div>
            ))}
          </div>
        </SectionBlock>
      ) : null}

      <SectionBlock id="related" no="10" title={t.sectionRelated}>
        {isPublished && project.next ? <BodyLarge className="mb-10 max-w-3xl text-ink">{project.next}</BodyLarge> : null}
        {project.links.length > 0 ? (
          <div className="mb-8 flex flex-wrap gap-x-8 gap-y-4">
            {project.links.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 border-b border-line font-mono text-[11px] uppercase tracking-[0.1em] text-accent hover:border-accent">
                {item.label} <ArrowUpRight size={14} aria-hidden />
              </a>
            ))}
          </div>
        ) : null}
        <div className="grid gap-6 border-y border-line py-7 md:grid-cols-3 md:items-center">
          {prev ? (
            <Link href={localePath(locale, `/experiments/${prev.slug}`)} className="inline-flex items-center gap-3 text-ink-secondary transition-colors hover:text-ink">
              <ArrowLeft size={18} aria-hidden />
              <span><Meta className="block text-ink-secondary">{t.previous}</Meta><span className="font-semibold">{prev.shortTitle}</span></span>
            </Link>
          ) : <span />}
          <Link href={localePath(locale, "/experiments")} className="text-left font-mono text-[11px] uppercase tracking-[0.1em] text-accent hover:underline md:text-center">{t.returnToIndex}</Link>
          {next ? (
            <Link href={localePath(locale, `/experiments/${next.slug}`)} className="inline-flex items-center gap-3 text-ink-secondary transition-colors hover:text-ink md:justify-end md:text-right">
              <span><Meta className="block text-ink-secondary">{t.next}</Meta><span className="font-semibold">{next.shortTitle}</span></span>
              <ArrowRight size={18} aria-hidden />
            </Link>
          ) : <span />}
        </div>
      </SectionBlock>
      </EditorialCaseLayout>
    </PageContainer>
  );
}
