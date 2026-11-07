import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { EvidenceComposition } from "@/components/layout/Compositions";
import { MediaFrame } from "../ui/MediaFrame";
import { ProjectIndex, StatusPill } from "../ui/StatusPill";
import { Meta, H3, Body } from "../ui/typography";
import { ProjectSignalPlate } from "./ProjectSignalPlate";
import { AtmosphereFrame } from "../ui/AtmosphereFrame";
import { projectAtmosphere } from "@/content/atmosphere";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";

const statusTone: Record<Project["status"], "signal" | "accent" | "neutral"> = {
  "active-research": "signal",
  prototype: "accent",
  partial: "accent",
  planned: "neutral",
  completed: "accent",
};

export function FeaturedProjectCard({ locale, project }: { locale: Locale; project: Project }) {
  const t = getDictionary(locale);
  const isPublished = project.publicationStatus === "published";
  const projectHero = project.media.hero?.status !== "pending" ? project.media.hero : null;
  const atmosphere = projectAtmosphere[project.slug];
  return (
    <EvidenceComposition
      reverse={Number(project.index) % 2 === 0}
      index={(
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ProjectIndex value={project.index} />
          <StatusPill
            label={isPublished ? t.status[project.status] : t.status["publication-review"]}
            tone={isPublished ? statusTone[project.status] : "neutral"}
          />
        </div>
      )}
      media={projectHero ? (
          <MediaFrame
            media={projectHero}
            alt={projectHero.alt}
            aspect="16/9"
            fit={projectHero.height > projectHero.width ? "contain" : "cover"}
            locale={locale}
            transitionName={`project-media-${project.slug}`}
          />
        ) : atmosphere ? (
          <AtmosphereFrame media={atmosphere} aspect="3/2" locale={locale} transitionName={`project-media-${project.slug}`} />
        ) : <ProjectSignalPlate project={project} locale={locale} compact />}
      content={(
        <div className="flex h-full flex-col items-start justify-center">
        <Meta className="text-ink-secondary">{project.category}</Meta>
        <H3 className="mt-4 max-w-md">{project.shortTitle}</H3>
        <Body className="mt-4 max-w-sm text-ink-secondary">{project.oneLine}</Body>
        <Link
          href={localePath(locale, `/experiments/${project.slug}`)}
          transitionTypes={["project-forward"]}
          className="mt-8 inline-flex items-center gap-2 border-b border-accent/30 pb-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent transition-colors duration-300 ease-lab hover:border-accent"
        >
          {t.experiments.openCase}
          <ArrowRight size={15} aria-hidden />
        </Link>
        </div>
      )}
    />
  );
}

export function ArchiveProjectRow({ locale, project }: { locale: Locale; project: Project }) {
  const t = getDictionary(locale);
  return (
    <Link
      href={localePath(locale, `/experiments/${project.slug}`)}
      className="group grid min-w-0 gap-5 border-b border-line py-6 transition-colors duration-300 ease-lab hover:bg-surface/60 md:grid-cols-[140px_minmax(0,1fr)] md:items-center md:gap-6 md:px-4"
    >
      {project.media.hero ? (
        <MediaFrame
          media={project.media.hero}
          alt={project.media.hero.alt}
          aspect="16/9"
          fit={project.media.hero.height > project.media.hero.width ? "contain" : "cover"}
          locale={locale}
          className="w-full"
        />
      ) : <span className="hidden md:block" />}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <ProjectIndex value={project.index} />
          <StatusPill label={t.status[project.status]} tone={statusTone[project.status]} />
        </div>
        <span className="mt-3 block text-lg font-semibold text-ink">{project.shortTitle}</span>
        <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink-secondary">{project.oneLine}</span>
      </div>
    </Link>
  );
}
