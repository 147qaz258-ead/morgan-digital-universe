import type { Metadata } from "next";
import { featuredProjects, archiveProjects } from "@/content/projects";
import { PageContainer } from "@/components/layout/PageContainer";
import { LabPageHeader } from "@/components/layout/LabInterface";
import { FeaturedProjectCard, ArchiveProjectRow } from "@/components/project/ProjectCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { routeMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { publicRepositories, repositoryUrl } from "@/content/repositories";

export const metadata: Metadata = createPageMetadata(routeMetadata.experiments);

export default function ExperimentsPage() {
  return (
    <PageContainer>
      <LabPageHeader
        eyebrow="Index / complete project archive"
        title={<>Project<br />Index</>}
        intro="Hardware, AI, robotics, software, games, and digital media — project records paired with the photos, interfaces, and films that document them."
        meta={(
          <div className="flex items-center justify-between gap-4">
            <span className="lab-kicker text-ink-secondary">Project records</span>
            <span className="lab-kicker text-signal">{String(featuredProjects.length + archiveProjects.length).padStart(2, "0")}</span>
          </div>
        )}
      />

      <section className="border-t border-line pb-8 pt-10 md:pt-14">
        <div className="flex items-center justify-between">
          <p className="lab-kicker text-signal">Selected work / {String(featuredProjects.length).padStart(2, "0")}</p>
          <p className="lab-kicker text-ink-secondary">Open project record</p>
        </div>
        <div className="mt-8">
          {featuredProjects.map((project) => <FeaturedProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="lab-section grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="lab-kicker text-signal">Project archive / {String(archiveProjects.length).padStart(2, "0")}</p>
          <h2 className="mt-5 text-[38px] font-semibold leading-[0.96] tracking-[-0.04em] text-ink md:text-[52px]">Every project has a place in the archive.</h2>
        </div>
        <div className="border-t border-line md:col-span-7 md:col-start-6">
          {archiveProjects.length > 0 ? (
            archiveProjects.map((project) => <ArchiveProjectRow key={project.slug} project={project} />)
          ) : (
            <p className="border-b border-line py-7 text-[14px] text-ink-secondary">No image-backed archive entries are available yet.</p>
          )}
        </div>
      </section>

      <section className="border-t border-line py-10 md:py-14">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-3 marker:hidden">
            <span>
              <span className="lab-kicker text-signal">GitHub / public source archive</span>
              <span className="mt-3 block text-[24px] font-semibold tracking-[-0.035em] text-ink md:text-[32px]">Browse all {publicRepositories.length} repositories</span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-secondary group-open:text-signal">Open / Close</span>
          </summary>
          <div className="mt-6 border-t border-line">
            {publicRepositories.map((repository, index) => (
              <div key={repository.name} className="grid gap-2 border-b border-line py-4 md:grid-cols-[52px_minmax(180px,260px)_1fr_110px] md:items-center md:gap-5">
                <span className="lab-kicker text-signal">{String(index + 1).padStart(2, "0")}</span>
                <a href={repositoryUrl(repository.name)} target="_blank" rel="noreferrer" className="font-mono text-[13px] font-semibold text-ink underline decoration-line underline-offset-4 hover:text-accent">
                  {repository.name}
                </a>
                <p className="text-[13px] leading-relaxed text-ink-secondary">{repository.description ?? "Public source repository."}</p>
                <span className="lab-kicker text-ink-secondary">GitHub ↗</span>
              </div>
            ))}
          </div>
        </details>
      </section>

      <ContactCta />
    </PageContainer>
  );
}
