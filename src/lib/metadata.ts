import type { Metadata } from "next";
import type { Project } from "@/content/types";
import type { RouteMetadataEntry } from "@/content/metadata";
import { getRouteMetadata } from "@/content/metadata";
import type { Locale } from "@/i18n/config";
import { localeMeta, localePath } from "@/i18n/config";

function languageAlternates(path: string) {
  return {
    en: localePath("en", path),
    "zh-CN": localePath("zh", path),
    "x-default": localePath("en", path),
  };
}

export function createPageMetadata(locale: Locale, entry: RouteMetadataEntry): Metadata {
  const canonical = localePath(locale, entry.route);
  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical,
      languages: languageAlternates(entry.route),
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: canonical,
      images: [{ url: entry.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [entry.ogImage],
    },
  };
}

export function createProjectMetadata(locale: Locale, project: Project): Metadata {
  const metadata = createPageMetadata(locale, {
    route: `/experiments/${project.slug}`,
    title: project.shortTitle,
    description: project.oneLine,
    ogImage: getRouteMetadata(locale).home.ogImage,
  });
  if (project.publicationStatus === "pending") {
    metadata.robots = { index: false, follow: false };
  }
  return metadata;
}
