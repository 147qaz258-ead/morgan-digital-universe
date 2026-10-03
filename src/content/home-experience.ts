import { motionAtmosphere, projectAtmosphere } from "./atmosphere";
import type { HomeExperienceChapter } from "./types";

export const homeExperienceChapters: HomeExperienceChapter[] = [
  { id: "entry", label: "ENTRY", range: [0, 0.12], projectSlug: null, media: motionAtmosphere.homeLab },
  { id: "identity", label: "IDENTITY", range: [0.12, 0.24], projectSlug: null, media: motionAtmosphere.homeLab },
  { id: "physical-link", label: "PHYSICALLINK", range: [0.24, 0.42], projectSlug: "physical-link", media: motionAtmosphere.physicalLink },
  { id: "ai-native-hardware-workspace", label: "AI WORKSPACE", range: [0.42, 0.53], projectSlug: "ai-native-hardware-workspace", media: projectAtmosphere["ai-native-hardware-workspace"] },
  { id: "bci-dexterous-hand", label: "BCI / HAND", range: [0.53, 0.64], projectSlug: "bci-dexterous-hand", media: projectAtmosphere["bci-dexterous-hand"] },
  { id: "origin-evidence", label: "SIGNAL / ORIGIN", range: [0.64, 0.82], projectSlug: null, media: motionAtmosphere.visionSignal },
  { id: "exit", label: "NOW / EXIT", range: [0.82, 1], projectSlug: null, media: null },
];
