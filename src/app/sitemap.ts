import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site-url";
import { staticRouteMetadata } from "@/content/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    ...staticRouteMetadata.map((entry) => ({
      url: `${siteUrl}${entry.route === "/" ? "" : entry.route}`,
      lastModified: new Date(),
    })),
    ...projects.filter((project) => project.publicationStatus === "published").map((p) => ({
      url: `${siteUrl}/experiments/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
