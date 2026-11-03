import type { VisionStage } from "./types";
import type { Locale } from "@/i18n/config";

const en: VisionStage[] = [
  {
    id: "now",
    label: "Now",
    narrative: "AI and hardware prototypes that can run, be measured, and expose their failure modes.",
  },
  {
    id: "next",
    label: "Next",
    narrative: "Physical AI systems that continuously sense, decide, and act through real devices.",
  },
  {
    id: "long-term",
    label: "Long-term",
    narrative: "Machines designed as capabilities that intelligent systems can understand and use.",
  },
];

const zh: VisionStage[] = [
  {
    id: "now",
    label: "现在",
    narrative: "能跑、能测、会暴露自己失败模式的 AI 与硬件原型。",
  },
  {
    id: "next",
    label: "下一步",
    narrative: "持续感知、判断，并通过真实设备行动的物理 AI 系统。",
  },
  {
    id: "long-term",
    label: "长期",
    narrative: "把机器设计成智能系统能理解、能调用的能力。",
  },
];

export const visionStagesByLocale: Record<Locale, VisionStage[]> = { en, zh };

export function getVisionStages(locale: Locale): VisionStage[] {
  return visionStagesByLocale[locale];
}
