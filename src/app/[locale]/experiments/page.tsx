import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/content/projects";
import { PageContainer } from "@/components/layout/PageContainer";
import { LabPageHeader } from "@/components/layout/LabInterface";
import { ProjectWall } from "@/components/project/ProjectWall";
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
  const projects = getProjects(locale);
  const publicRepositories = getPublicRepositories(locale);

  return (
    <>
    <PageContainer>
      <LabPageHeader
        eyebrow={t.eyebrow}
        title={<>{t.titleTop}<br />{t.titleBottom}</>}
        intro={t.intro}
        meta={(
          <div className="flex items-center justify-between gap-4">
            <span className="lab-kicker text-ink-secondary">{t.recordsLabel}</span>
            <span className="lab-kicker text-signal">{String(projects.length).padStart(2, "0")}</span>
          </div>
        )}
      />

    </PageContainer>
    <ProjectWall locale={locale} heading={false} />
    <PageContainer>
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
    </>
  );
}
