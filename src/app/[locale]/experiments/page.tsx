import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFeaturedProjects, getArchiveProjects } from "@/content/projects";
import { PageContainer } from "@/components/layout/PageContainer";
import { LabPageHeader } from "@/components/layout/LabInterface";
import { FeaturedProjectCard, ArchiveProjectRow } from "@/components/project/ProjectCard";
import { ContactCta } from "@/components/layout/ContactCta";
import { getRouteMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { getPublicRepositories, repositoryUrl } from "@/content/repositories";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, getRouteMetadata(locale).experiments);
}

export default async function ExperimentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale).experiments;
  const featuredProjects = getFeaturedProjects(locale);
  const archiveProjects = getArchiveProjects(locale);
  const publicRepositories = getPublicRepositories(locale);

  return (
    <PageContainer>
      <LabPageHeader
        eyebrow={t.eyebrow}
        title={<>{t.titleTop}<br />{t.titleBottom}</>}
        intro={t.intro}
        meta={(
          <div className="flex items-center justify-between gap-4">
            <span className="lab-kicker text-ink-secondary">{t.recordsLabel}</span>
            <span className="lab-kicker text-signal">{String(featuredProjects.length + archiveProjects.length).padStart(2, "0")}</span>
          </div>
        )}
      />

      <section className="border-t border-line pb-8 pt-10 md:pt-14">
        <div className="flex items-center justify-between">
          <p className="lab-kicker text-signal">{t.selectedLabel} {String(featuredProjects.length).padStart(2, "0")}</p>
          <p className="lab-kicker text-ink-secondary">{t.openRecord}</p>
        </div>
        <div className="mt-8">
          {featuredProjects.map((project) => <FeaturedProjectCard key={project.slug} locale={locale} project={project} />)}
        </div>
      </section>

      <section className="lab-section grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="lab-kicker text-signal">{t.archiveLabel} {String(archiveProjects.length).padStart(2, "0")}</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-ink md:text-5xl">{t.archiveTitle}</h2>
        </div>
        <div className="border-t border-line md:col-span-7 md:col-start-6">
          {archiveProjects.length > 0 ? (
            archiveProjects.map((project) => <ArchiveProjectRow key={project.slug} locale={locale} project={project} />)
          ) : (
            <p className="border-b border-line py-7 text-sm text-ink-secondary">{t.archiveEmpty}</p>
          )}
        </div>
      </section>

      <section className="border-t border-line py-10 md:py-14">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-3 marker:hidden">
            <span>
              <span className="lab-kicker text-signal">{t.githubLabel}</span>
              <span className="mt-3 block text-2xl font-semibold tracking-[-0.035em] text-ink md:text-3xl">{t.browseAllPrefix} {publicRepositories.length} {t.browseAllSuffix}</span>
            </span>
            <span className="font-mono text-2xs uppercase tracking-[0.12em] text-ink-secondary group-open:text-signal">{t.openClose}</span>
          </summary>
          <div className="mt-6 border-t border-line">
            {publicRepositories.map((repository, index) => (
              <div key={repository.name} className="grid gap-2 border-b border-line py-4 md:grid-cols-[52px_minmax(180px,260px)_1fr_110px] md:items-center md:gap-5">
                <span className="lab-kicker text-signal">{String(index + 1).padStart(2, "0")}</span>
                <a href={repositoryUrl(repository.name)} target="_blank" rel="noreferrer" className="font-mono text-xs font-semibold text-ink underline decoration-line underline-offset-4 hover:text-accent">
                  {repository.name}
                </a>
                <p className="text-xs leading-relaxed text-ink-secondary">{repository.description ?? t.publicRepo}</p>
                <span className="lab-kicker text-ink-secondary">{t.githubLink} ↗</span>
              </div>
            ))}
          </div>
        </details>
      </section>

      <ContactCta locale={locale} />
    </PageContainer>
  );
}
