import type { MetadataRoute } from "next";
import { getProjects } from "@/content/projects";
import { siteUrl } from "@/lib/site-url";
import { getStaticRouteMetadata } from "@/content/metadata";
import { locales, type Locale } from "@/i18n/config";

function localizedUrl(locale: Locale, route: string): string {
  const path = route === "/" ? "" : route;
  return `${siteUrl}/${locale}${path}`;
}

function alternates(route: string) {
  return {
    languages: Object.fromEntries(locales.map((locale) => [locale, localizedUrl(locale, route)])) as Record<string, string>,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const staticRoutes = getStaticRouteMetadata("en");
  const publishedProjects = getProjects("en").filter((project) => project.publicationStatus === "published");

  return locales.flatMap((locale) => [
    ...staticRoutes.map((entry) => ({
      url: localizedUrl(locale, entry.route),
      lastModified: new Date(),
      alternates: alternates(entry.route),
    })),
    ...publishedProjects.map((project) => ({
      url: localizedUrl(locale, `/experiments/${project.slug}`),
      lastModified: new Date(),
      alternates: alternates(`/experiments/${project.slug}`),
    })),
  ]);
}
