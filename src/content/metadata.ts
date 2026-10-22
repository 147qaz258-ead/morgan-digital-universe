export interface RouteMetadataEntry {
  route: string;
  title: string;
  description: string;
  ogImage: string;
}

const sharedOgImage = "/images/site-og-cover-01.webp";

export const routeMetadata = {
  home: {
    route: "/",
    title: "MORGAN / DIGITAL LAB — Projects in AI, Hardware, and the Physical World",
    description:
      "A personal project archive across AI, robotics, hardware, software, interactive media, and systems entering the physical world.",
    ogImage: sharedOgImage,
  },
  origin: {
    route: "/origin",
    title: "Origin",
    description: "From digital systems to physical intelligence.",
    ogImage: sharedOgImage,
  },
  experiments: {
    route: "/experiments",
    title: "Experiments",
    description:
      "A complete project index across AI, hardware, robotics, HarmonyOS software, interactive games, and digital films, with links to public source repositories.",
    ogImage: sharedOgImage,
  },
  capabilities: {
    route: "/capabilities",
    title: "Capabilities",
    description: "Understand, build, connect, and make physical systems move — linked to project proof.",
    ogImage: sharedOgImage,
  },
  lab: {
    route: "/lab",
    title: "Lab",
    description: "Failure archive, prototypes, equipment, and engineering notes.",
    ogImage: sharedOgImage,
  },
  vision: {
    route: "/vision",
    title: "Vision",
    description: "Now, next, and long-term directions for AI and physical systems.",
    ogImage: sharedOgImage,
  },
  about: {
    route: "/about",
    title: "About",
    description: "Who Morgan is, what matters, and how the work is approached.",
    ogImage: sharedOgImage,
  },
} as const satisfies Record<string, RouteMetadataEntry>;

export const staticRouteMetadata = Object.values(routeMetadata);
