import type { OriginStage } from "./types";
import { evidenceIds } from "./projects";
import type { Locale } from "@/i18n/config";

const enStages: OriginStage[] = [
  {
    id: "digital-foundations",
    label: "01",
    title: "Digital Foundations",
    oneLine: "Learning how software, networks, and digital systems fit together.",
    narrative:
      "The starting point: understanding how information moves, interfaces cooperate, and complex digital systems can be decomposed.",
    yearRange: null,
    skills: ["Software", "Networks", "Systems"],
    projectRefs: [],
    evidenceRefs: [],
    visualType: "digital",
  },
  {
    id: "intelligence",
    label: "02",
    title: "Intelligence",
    oneLine: "Moving from software execution toward systems that can interpret and decide.",
    narrative:
      "AI, agents, and computer vision shifted the focus from executing instructions to interpreting inputs and making decisions.",
    yearRange: null,
    skills: ["AI", "Agents", "Computer Vision"],
    projectRefs: [],
    evidenceRefs: [],
    visualType: "intelligence",
  },
  {
    id: "building-physical-systems",
    label: "03",
    title: "Building Physical Systems",
    oneLine: "Extending software into embedded systems, PCBs, hardware, and robotics.",
    narrative:
      "Physical systems introduced power, signal, mechanical, and reliability constraints that software alone does not expose.",
    yearRange: null,
    skills: ["Embedded", "PCB", "Hardware", "Robotics"],
    projectRefs: ["physical-link"],
    evidenceRefs: [evidenceIds.physicalLink.pcb, evidenceIds.physicalLink.demo],
    visualType: "hardware",
  },
  {
    id: "physical-ai",
    label: "04",
    title: "Physical AI",
    oneLine: "Bringing the earlier layers together so AI can understand and use real machines.",
    narrative:
      "The direction converges on one question: how can intelligence sense, call, and coordinate physical systems?",
    yearRange: null,
    skills: ["Physical AI", "Robotics", "Systems"],
    projectRefs: ["physical-link", "ai-native-hardware-workspace", "bci-dexterous-hand"],
    evidenceRefs: [
      evidenceIds.physicalLink.demo,
      evidenceIds.hardwareWorkspace.deviceOutput,
      evidenceIds.bciDexterousHand.controlTest,
    ],
    visualType: "physical-ai",
  },
];

const zhStages: OriginStage[] = [
  {
    id: "digital-foundations",
    label: "01",
    title: "数字基础",
    oneLine: "弄明白软件、网络与数字系统怎么拼在一起。",
    narrative: "起点是搞清楚信息怎么流动、界面之间怎么协作、复杂的数字系统怎么拆解。",
    yearRange: null,
    skills: ["软件", "网络", "系统"],
    projectRefs: [],
    evidenceRefs: [],
    visualType: "digital",
  },
  {
    id: "intelligence",
    label: "02",
    title: "智能",
    oneLine: "从执行软件，走到能解读输入、做出判断的系统。",
    narrative: "AI、Agent 与计算机视觉把重心从执行指令，挪到了理解输入并做决策。",
    yearRange: null,
    skills: ["AI", "Agent", "计算机视觉"],
    projectRefs: [],
    evidenceRefs: [],
    visualType: "intelligence",
  },
  {
    id: "building-physical-systems",
    label: "03",
    title: "构建物理系统",
    oneLine: "把软件延伸进嵌入式、PCB、硬件与机器人。",
    narrative: "物理系统带来电源、信号、机械与可靠性约束，这些是纯软件不会暴露的问题。",
    yearRange: null,
    skills: ["嵌入式", "PCB", "硬件", "机器人"],
    projectRefs: ["physical-link"],
    evidenceRefs: [evidenceIds.physicalLink.pcb, evidenceIds.physicalLink.demo],
    visualType: "hardware",
  },
  {
    id: "physical-ai",
    label: "04",
    title: "物理 AI",
    oneLine: "把前面几层接起来，让 AI 能理解并使用真实机器。",
    narrative: "方向收敛到一个问题：智能要怎么感知、调用、协调物理系统？",
    yearRange: null,
    skills: ["物理 AI", "机器人", "系统"],
    projectRefs: ["physical-link", "ai-native-hardware-workspace", "bci-dexterous-hand"],
    evidenceRefs: [
      evidenceIds.physicalLink.demo,
      evidenceIds.hardwareWorkspace.deviceOutput,
      evidenceIds.bciDexterousHand.controlTest,
    ],
    visualType: "physical-ai",
  },
];

const enTurningPoint = { line: "AI should not stop at the screen." };
const zhTurningPoint = { line: "AI 不应该停在屏幕上。" };

export const originStagesByLocale: Record<Locale, OriginStage[]> = { en: enStages, zh: zhStages };
export const originTurningPointByLocale: Record<Locale, { line: string }> = {
  en: enTurningPoint,
  zh: zhTurningPoint,
};

export function getOriginStages(locale: Locale): OriginStage[] {
  return originStagesByLocale[locale];
}

export function getOriginTurningPoint(locale: Locale) {
  return originTurningPointByLocale[locale];
}
