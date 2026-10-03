import type { Metadata } from "next";
import type { Project } from "@/content/types";
import type { RouteMetadataEntry } from "@/content/metadata";
import { routeMetadata } from "@/content/metadata";
import { siteUrl } from "@/lib/site-url";

export function createPageMetadata(entry: RouteMetadataEntry): Metadata {
  return {
    title: entry.title,
    description: entry.description,
    alternates: siteUrl ? { canonical: entry.route } : undefined,
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: "website",
      url: siteUrl ? entry.route : undefined,
      images: siteUrl ? [{ url: entry.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: siteUrl ? [entry.ogImage] : undefined,
    },
  };
}

export function createProjectMetadata(project: Project): Metadata {
  const metadata = createPageMetadata({
    route: `/experiments/${project.slug}`,
    title: project.shortTitle,
    description: project.oneLine,
    ogImage: routeMetadata.home.ogImage,
  });
  if (project.publicationStatus === "pending") {
    metadata.robots = { index: false, follow: false };
  }
  return metadata;
}
