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
  const verifiedHero = project.media.hero?.status === "verified" ? project.media.hero : null;
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
      media={verifiedHero ? (
          <MediaFrame
            media={verifiedHero}
            alt={`${project.shortTitle} hero evidence`}
            aspect="16/9"
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
      className="group flex flex-col gap-2 border-b border-line py-6 transition-colors duration-200 hover:bg-surface/60 md:flex-row md:items-center md:gap-8 md:px-4"
    >
      <ProjectIndex value={project.index} className="md:w-20" />
      <span className="text-[18px] font-semibold text-ink md:w-72">{project.shortTitle}</span>
      <span className="flex-1 text-[15px] text-ink-secondary">{project.oneLine}</span>
      <Meta className="text-ink-secondary">{project.dateRange ?? "Review"}</Meta>
    </Link>
  );
}
