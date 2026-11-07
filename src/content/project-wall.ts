import { getProjects } from "./projects";
import type { ProjectStatus } from "./types";
import type { Locale } from "@/i18n/config";

export type ProjectWallGroup = "all" | "physical" | "software" | "worlds";
export type ProjectWallLayout = "concept" | "screen" | "photo" | "phones" | "film";

interface WallCover {
  group: Exclude<ProjectWallGroup, "all">;
  src: string;
  secondarySrc?: string;
  alt: Record<Locale, string>;
  secondaryAlt?: Record<Locale, string>;
  layout: ProjectWallLayout;
  surface: "light" | "dark";
  source: "project" | "concept" | "cgi";
  wide?: boolean;
}

// 封面只描述现有素材；生成概念视觉与用户提供的项目材料分开标记。
export const projectWallCovers: Record<string, WallCover> = {
  "physical-link": {
    group: "physical", layout: "concept", surface: "light", source: "concept", wide: true,
    src: "/images/physical-link-concept-atmosphere-01.webp",
    alt: { en: "Conceptual rendering of a physical AI interface on a laboratory bench.", zh: "实验台上的物理 AI 接口概念渲染，并非实物证据。" },
  },
  "ai-native-hardware-workspace": {
    group: "software", layout: "screen", surface: "dark", source: "project",
    src: "/images/projects/ai-native-hardware-workspace/ai-native-workspace-01.webp",
    alt: { en: "Hardware design workspace with a canvas, module catalog, and inspector.", zh: "硬件设计工作台，包含画布、模块目录和属性检查器。" },
  },
  "bci-dexterous-hand": {
    group: "physical", layout: "photo", surface: "light", source: "project",
    src: "/images/projects/bci-dexterous-hand/bci-dexterous-hand-01.webp",
    alt: { en: "Experiment bench with a signal dashboard, electronics, and dexterous hand.", zh: "实验台上的信号界面、电子线路与灵巧手。" },
  },
  "capsule-surface-inspection": {
    group: "physical", layout: "photo", surface: "light", source: "project",
    src: "/images/projects/capsule-surface-inspection/capsule-surface-inspection-02.webp",
    alt: { en: "Capsule inspection interface running beside the prototype electronics and camera.", zh: "胶囊检测界面与原型电路、相机设备同框。" },
  },
  cozmio: {
    group: "software", layout: "screen", surface: "light", source: "project",
    src: "/images/projects/cozmio/cozmio-01.webp",
    alt: { en: "Cozmio application interface.", zh: "Cozmio 应用界面。" },
  },
  "turbo-editor": {
    group: "software", layout: "phones", surface: "dark", source: "project",
    src: "/images/projects/turbo-editor/turbo-editor-01.webp",
    secondarySrc: "/images/projects/turbo-editor/turbo-editor-05.webp",
    alt: { en: "Turbo Editor running on HarmonyOS, first interface view.", zh: "Turbo Editor 在 HarmonyOS 上的第一组界面。" },
    secondaryAlt: { en: "A second Turbo Editor interface on HarmonyOS.", zh: "Turbo Editor 在 HarmonyOS 上的另一组界面。" },
  },
  "youyuan-jingmeng": {
    group: "worlds", layout: "screen", surface: "dark", source: "project",
    src: "/images/projects/youyuan-jingmeng/youyuan-jingmeng-01.webp",
    alt: { en: "Youyuan Jingmeng game capture.", zh: "《游园惊梦》游戏画面。" },
  },
  "emotional-habitat": {
    group: "software", layout: "phones", surface: "light", source: "project",
    src: "/images/projects/emotional-habitat/emotional-habitat-01.webp",
    secondarySrc: "/images/projects/emotional-habitat/emotional-habitat-02.webp",
    alt: { en: "Emotional Habitat mobile conversational interface.", zh: "Emotional Habitat 移动对话界面。" },
    secondaryAlt: { en: "Emotional Habitat project presentation at the Douyin AI Innovation Plan event.", zh: "Emotional Habitat 在抖音 AI 创新计划活动的项目展示现场。" },
  },
  "tripo-cgi-film": {
    group: "worlds", layout: "film", surface: "dark", source: "cgi",
    src: "/posters/tripo-cgi-film-poster-01.webp",
    alt: { en: "A rendered frame from the thirty second Tripo CGI robot film.", zh: "Tripo 三十秒机器人 CGI 影片的渲染画面。" },
  },
  "touchsight-tactile-vision": {
    group: "physical", layout: "photo", surface: "light", source: "project", wide: true,
    src: "/images/projects/touchsight/touchsight-01.webp",
    alt: { en: "Physical tactile display apparatus and articulated robot on a workshop bench.", zh: "工作台上的实体触觉显示装置与关节机器人。" },
  },
};

const en = {
  eyebrow: "The project wall",
  title: "An open archive.",
  subtitle: "Physical systems, software, interactive worlds, and the experiments in between. Every project has a place here.",
  filtersLabel: "Filter the project wall",
  groups: { all: "All", physical: "Physical systems", software: "Software", worlds: "Worlds & film" } satisfies Record<ProjectWallGroup, string>,
  openProject: "Open project",
  projectCount: "project records",
  concept: "Concept / not evidence",
  projectCapture: "Project material",
  pending: "Evidence pending",
  cgi: "CGI / 00:30",
  status: {
    "active-research": "Active research", prototype: "Prototype", partial: "Partial prototype", planned: "Planned", completed: "Completed",
  } satisfies Record<ProjectStatus, string>,
};

const zh: typeof en = {
  eyebrow: "项目墙",
  title: "每一个想法，都留下作品。",
  subtitle: "物理系统、软件、交互世界，以及它们之间的实验。每个项目，都在这里展开。",
  filtersLabel: "筛选项目墙",
  groups: { all: "全部", physical: "物理系统", software: "软件", worlds: "世界与影像" },
  openProject: "打开项目",
  projectCount: "项项目记录",
  concept: "概念视觉 / 非实物证据",
  projectCapture: "项目素材",
  pending: "素材待补充",
  cgi: "CGI / 00:30",
  status: { "active-research": "研究中", prototype: "原型", partial: "部分实现", planned: "计划中", completed: "已完成" },
};

export const projectWallCopy: Record<Locale, typeof en> = { en, zh };
export const projectWallGroups: ProjectWallGroup[] = ["all", "physical", "software", "worlds"];

export function getProjectWallItems(locale: Locale) {
  return getProjects(locale).map((project) => ({
    slug: project.slug,
    index: project.index,
    title: project.shortTitle,
    category: project.category,
    summary: project.oneLine,
    status: project.status,
    cover: projectWallCovers[project.slug],
  }));
}
