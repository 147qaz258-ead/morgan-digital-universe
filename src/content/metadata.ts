import type { Locale } from "@/i18n/config";

export interface RouteMetadataEntry {
  /** Locale-less route. The locale segment is added when metadata is rendered. */
  route: string;
  title: string;
  description: string;
  ogImage: string;
}

const sharedOgImage = "/images/site-og-cover-01.webp";

const en = {
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
} satisfies Record<string, RouteMetadataEntry>;

const zh: typeof en = {
  home: {
    route: "/",
    title: "MORGAN / DIGITAL LAB — AI、硬件与物理世界项目档案",
    description: "覆盖 AI、机器人、硬件、软件、交互影像，以及正在进入物理世界的系统的个人项目档案。",
    ogImage: sharedOgImage,
  },
  origin: {
    route: "/origin",
    title: "来源",
    description: "从数字系统到物理智能。",
    ogImage: sharedOgImage,
  },
  experiments: {
    route: "/experiments",
    title: "项目",
    description: "覆盖 AI、硬件、机器人、鸿蒙应用、交互游戏与数字影像的完整项目索引，附公开源码仓库链接。",
    ogImage: sharedOgImage,
  },
  capabilities: {
    route: "/capabilities",
    title: "能力",
    description: "理解、构建、连接，让物理系统动起来——每一项能力都挂到项目证据上。",
    ogImage: sharedOgImage,
  },
  lab: {
    route: "/lab",
    title: "实验室",
    description: "失败档案、原型、设备与工程笔记。",
    ogImage: sharedOgImage,
  },
  vision: {
    route: "/vision",
    title: "愿景",
    description: "AI 与物理系统的现在、下一步与长期方向。",
    ogImage: sharedOgImage,
  },
  about: {
    route: "/about",
    title: "关于",
    description: "Morgan 是谁、在意什么、怎么做事。",
    ogImage: sharedOgImage,
  },
};

export const routeMetadataByLocale: Record<Locale, typeof en> = { en, zh };

export function getRouteMetadata(locale: Locale) {
  return routeMetadataByLocale[locale];
}

export function getStaticRouteMetadata(locale: Locale): RouteMetadataEntry[] {
  return Object.values(routeMetadataByLocale[locale]);
}
