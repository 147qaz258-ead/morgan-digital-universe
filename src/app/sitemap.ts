import type { MetadataRoute } from "next";
import { getProjects } from "@/content/projects";
import { siteUrl } from "@/lib/site-url";
import { getStaticRouteMetadata } from "@/content/metadata";
import { locales, localeMeta, type Locale } from "@/i18n/config";

function localizedUrl(locale: Locale, route: string): string {
  const path = route === "/" ? "" : route;
  return `${siteUrl}/${locale}${path}`;
}

/**
 * hreflang 用的是语言码（en / zh-CN），不是路由段（en / zh）—— 页面里的
 * alternates 就是这么写的，两处必须一致，否则 Google 会当成两套标注。
 */
function alternates(route: string) {
  const languages = Object.fromEntries(locales.map((locale) => [localeMeta[locale].htmlLang, localizedUrl(locale, route)]));
  return { languages: { ...languages, "x-default": localizedUrl("en", route) } };
}

export default function sitemap(): MetadataRoute.Sitemap {
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
