import { motionAtmosphere, projectAtmosphere } from "./atmosphere";
import type { HomeExperienceChapter } from "./types";
import type { Locale } from "@/i18n/config";

const en: HomeExperienceChapter[] = [
  { id: "entry", label: "ENTRY", range: [0, 0.12], projectSlug: null, media: motionAtmosphere.homeLab },
  { id: "identity", label: "IDENTITY", range: [0.12, 0.24], projectSlug: null, media: motionAtmosphere.homeLab },
  { id: "physical-link", label: "PHYSICALLINK", range: [0.24, 0.42], projectSlug: "physical-link", media: motionAtmosphere.physicalLink },
  { id: "ai-native-hardware-workspace", label: "AI WORKSPACE", range: [0.42, 0.53], projectSlug: "ai-native-hardware-workspace", media: projectAtmosphere["ai-native-hardware-workspace"] },
  { id: "bci-dexterous-hand", label: "BCI / HAND", range: [0.53, 0.64], projectSlug: "bci-dexterous-hand", media: projectAtmosphere["bci-dexterous-hand"] },
  { id: "origin-evidence", label: "SIGNAL / ORIGIN", range: [0.64, 0.82], projectSlug: null, media: motionAtmosphere.visionSignal },
  { id: "exit", label: "NOW / EXIT", range: [0.82, 1], projectSlug: null, media: null },
];

const zh: HomeExperienceChapter[] = [
  { id: "entry", label: "进入", range: [0, 0.12], projectSlug: null, media: motionAtmosphere.homeLab },
  { id: "identity", label: "身份", range: [0.12, 0.24], projectSlug: null, media: motionAtmosphere.homeLab },
  { id: "physical-link", label: "PHYSICALLINK", range: [0.24, 0.42], projectSlug: "physical-link", media: motionAtmosphere.physicalLink },
  { id: "ai-native-hardware-workspace", label: "AI 工作台", range: [0.42, 0.53], projectSlug: "ai-native-hardware-workspace", media: projectAtmosphere["ai-native-hardware-workspace"] },
  { id: "bci-dexterous-hand", label: "BCI / 手", range: [0.53, 0.64], projectSlug: "bci-dexterous-hand", media: projectAtmosphere["bci-dexterous-hand"] },
  { id: "origin-evidence", label: "信号 / 来源", range: [0.64, 0.82], projectSlug: null, media: motionAtmosphere.visionSignal },
  { id: "exit", label: "现在 / 出口", range: [0.82, 1], projectSlug: null, media: null },
];

export const homeExperienceChaptersByLocale: Record<Locale, HomeExperienceChapter[]> = { en, zh };

export function getHomeExperienceChapters(locale: Locale): HomeExperienceChapter[] {
  return homeExperienceChaptersByLocale[locale];
}
