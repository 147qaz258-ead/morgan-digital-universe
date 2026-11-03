import type { Locale } from "@/i18n/config";
import type { Evidence, EvidenceId, Project } from "../types";
import { localizeMedia } from "../media-copy";
import { enProjects } from "./en";
import { zhProjects } from "./zh";

export { evidenceIds } from "./shared";

function withLocalizedMedia(project: Project, locale: Locale): Project {
  if (locale === "en") return project;
  return {
    ...project,
    media: {
      hero: localizeMedia(project.media.hero, locale),
      gallery: project.media.gallery.map((asset) => localizeMedia(asset, locale) ?? asset),
      video: localizeMedia(project.media.video, locale),
    },
  };
}

const projectsByLocale: Record<Locale, Project[]> = {
  en: enProjects,
  zh: zhProjects.map((project) => withLocalizedMedia(project, "zh")),
};

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale];
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((project) => project.featured);
}

export function getArchiveProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((project) => !project.featured);
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getEvidenceRecord(locale: Locale, id: EvidenceId): { project: Project; evidence: Evidence } | null {
  for (const project of getProjects(locale)) {
    const evidence = project.evidence.find((item) => item.id === id);
    if (evidence) return { project, evidence };
  }
  return null;
}

export function getAdjacentProjects(locale: Locale, slug: string): { prev: Project | null; next: Project | null } {
  const list = getProjects(locale);
  const index = list.findIndex((project) => project.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : null,
  };
}
