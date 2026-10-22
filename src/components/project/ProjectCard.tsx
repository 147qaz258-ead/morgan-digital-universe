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

const statusTone: Record<Project["status"], "signal" | "accent" | "neutral"> = {
  "active-research": "signal",
  prototype: "accent",
  partial: "accent",
  planned: "neutral",
  completed: "accent",
};

export function FeaturedProjectCard({ project }: { project: Project }) {
  const isPublished = project.publicationStatus === "published";
  const projectHero = project.media.hero?.status !== "pending" ? project.media.hero : null;
  const atmosphere = projectAtmosphere[project.slug];
  return (
    <EvidenceComposition
      reverse={Number(project.index) % 2 === 0}
      index={(
        <div className="flex items-start justify-between gap-4 md:flex-col">
          <ProjectIndex value={project.index} />
          <StatusPill
            label={isPublished ? project.status : "publication review"}
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
            transitionName={`project-media-${project.slug}`}
          />
        ) : atmosphere ? (
          <AtmosphereFrame media={atmosphere} aspect="3/2" transitionName={`project-media-${project.slug}`} />
        ) : <ProjectSignalPlate project={project} compact />}
      content={(
        <div className="flex h-full flex-col items-start justify-center">
        <Meta className="text-ink-secondary">{project.category}</Meta>
        <H3 className="mt-4 max-w-md">{project.shortTitle}</H3>
        <Body className="mt-4 max-w-sm text-ink-secondary">{project.oneLine}</Body>
        <Link
          href={`/experiments/${project.slug}`}
          transitionTypes={["project-forward"]}
          className="mt-8 inline-flex items-center gap-2 border-b border-accent/30 pb-1 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-accent transition-colors hover:border-accent"
        >
          Open case
          <ArrowRight size={15} aria-hidden />
        </Link>
        </div>
      )}
    />
  );
}

export function ArchiveProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/experiments/${project.slug}`}
      className="group grid min-w-0 gap-5 border-b border-line py-6 transition-colors duration-200 hover:bg-surface/60 md:grid-cols-[140px_minmax(0,1fr)] md:items-center md:gap-6 md:px-4"
    >
      {project.media.hero ? (
        <MediaFrame
          media={project.media.hero}
          alt={project.media.hero.alt}
          aspect="16/9"
          fit={project.media.hero.height > project.media.hero.width ? "contain" : "cover"}
          className="w-full"
        />
      ) : <span className="hidden md:block" />}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <ProjectIndex value={project.index} />
          <StatusPill label={project.status.replaceAll("-", " ")} tone={statusTone[project.status]} />
        </div>
        <span className="mt-3 block text-[18px] font-semibold text-ink">{project.shortTitle}</span>
        <span className="mt-2 block max-w-2xl text-[14px] leading-relaxed text-ink-secondary">{project.oneLine}</span>
      </div>
    </Link>
  );
}
