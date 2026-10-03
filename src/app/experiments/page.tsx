import type { Metadata } from "next";
import { featuredProjects, archiveProjects } from "@/content/projects";
import { pageCopy } from "@/content/pages";
import { PageContainer } from "@/components/layout/PageContainer";
import { LabPageHeader } from "@/components/layout/LabInterface";
import { FeaturedProjectCard, ArchiveProjectRow } from "@/components/project/ProjectCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { routeMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(routeMetadata.experiments);

export default function ExperimentsPage() {
  return (
    <PageContainer>
      <LabPageHeader
        eyebrow="Index / active experiments"
        title={<>Experiment<br />Index</>}
        intro="Three active systems, presented as working records rather than product cards. Verified evidence remains separate from concept atmosphere."
        meta={(
          <div className="flex items-center justify-between gap-4">
            <span className="lab-kicker text-ink-secondary">Active records</span>
            <span className="lab-kicker text-signal">03</span>
          </div>
        )}
      />

      <section className="border-t border-line pb-8 pt-10 md:pt-14">
        <div className="flex items-center justify-between">
          <p className="lab-kicker text-signal">Selected work / 03</p>
          <p className="lab-kicker text-ink-secondary">Open case to inspect</p>
        </div>
        <div className="mt-8">
          {featuredProjects.map((project) => <FeaturedProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="lab-section grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="lab-kicker text-signal">Archive / field records</p>
          <h2 className="mt-5 text-[38px] font-semibold leading-[0.96] tracking-[-0.04em] text-ink md:text-[52px]">Unfinished work belongs in the index.</h2>
        </div>
        <div className="border-t border-line md:col-span-7 md:col-start-6">
          {archiveProjects.length > 0 ? (
            archiveProjects.map((project) => <ArchiveProjectRow key={project.slug} project={project} />)
          ) : (
            <div className="grid grid-cols-[54px_1fr] gap-4 border-b border-line py-7">
              <span className="lab-kicker text-signal">00</span>
              <div>
                <p className="text-[15px] font-semibold text-ink">Archive records are awaiting publication review.</p>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ink-secondary">{pageCopy.experiments.archivePending}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactCta />
    </PageContainer>
  );
}
