import type { CapabilityGroup } from "./types";
import { evidenceIds } from "./projects";
import type { Locale } from "@/i18n/config";

// 能力条目必须有项目证据链接；没有证据的方向不写成"已掌握"。
const en: CapabilityGroup[] = [
  {
    id: "understand",
    title: "Understand",
    subtitle: "AI / CV / Agent",
    items: [
      {
        name: "Agent systems",
        proofProjectSlug: "ai-native-hardware-workspace",
        proofEvidenceId: evidenceIds.hardwareWorkspace.flow,
        proofLabel: "Used in AI-Native Hardware Workspace",
      },
      {
        name: "Signal interpretation",
        proofProjectSlug: "bci-dexterous-hand",
        proofEvidenceId: evidenceIds.bciDexterousHand.controlTest,
        proofLabel: "Explored in BCI × Dexterous Hand",
      },
    ],
  },
  {
    id: "build",
    title: "Build",
    subtitle: "Embedded / PCB / Hardware",
    items: [
      {
        name: "Embedded systems & PCB",
        proofProjectSlug: "physical-link",
        proofEvidenceId: evidenceIds.physicalLink.pcb,
        proofLabel: "Built in PhysicalLink",
      },
    ],
  },
  {
    id: "connect",
    title: "Connect",
    subtitle: "Protocol / Integration / System",
    items: [
      {
        name: "Software ↔ hardware integration",
        proofProjectSlug: "physical-link",
        proofEvidenceId: evidenceIds.physicalLink.demo,
        proofLabel: "Connected in PhysicalLink",
      },
      {
        name: "Natural language → device pipeline",
        proofProjectSlug: "ai-native-hardware-workspace",
        proofEvidenceId: evidenceIds.hardwareWorkspace.deviceOutput,
        proofLabel: "Connected in AI-Native Hardware Workspace",
      },
    ],
  },
  {
    id: "make-it-move",
    title: "Make It Move",
    subtitle: "Robotics / Physical AI",
    items: [
      {
        name: "Dexterous manipulation",
        proofProjectSlug: "bci-dexterous-hand",
        proofEvidenceId: evidenceIds.bciDexterousHand.controlTest,
        proofLabel: "Moving in BCI × Dexterous Hand",
      },
    ],
  },
];

const zh: CapabilityGroup[] = [
  {
    id: "understand",
    title: "理解",
    subtitle: "AI / 视觉 / Agent",
    items: [
      {
        name: "Agent 系统",
        proofProjectSlug: "ai-native-hardware-workspace",
        proofEvidenceId: evidenceIds.hardwareWorkspace.flow,
        proofLabel: "用于 AI 原生硬件工作台",
      },
      {
        name: "信号解读",
        proofProjectSlug: "bci-dexterous-hand",
        proofEvidenceId: evidenceIds.bciDexterousHand.controlTest,
        proofLabel: "在 BCI × 灵巧手中验证",
      },
    ],
  },
  {
    id: "build",
    title: "构建",
    subtitle: "嵌入式 / PCB / 硬件",
    items: [
      {
        name: "嵌入式系统与 PCB",
        proofProjectSlug: "physical-link",
        proofEvidenceId: evidenceIds.physicalLink.pcb,
        proofLabel: "在 PhysicalLink 中实现",
      },
    ],
  },
  {
    id: "connect",
    title: "连接",
    subtitle: "协议 / 集成 / 系统",
    items: [
      {
        name: "软件 ↔ 硬件打通",
        proofProjectSlug: "physical-link",
        proofEvidenceId: evidenceIds.physicalLink.demo,
        proofLabel: "在 PhysicalLink 中联通",
      },
      {
        name: "自然语言 → 设备链路",
        proofProjectSlug: "ai-native-hardware-workspace",
        proofEvidenceId: evidenceIds.hardwareWorkspace.deviceOutput,
        proofLabel: "在 AI 原生硬件工作台中联通",
      },
    ],
  },
  {
    id: "make-it-move",
    title: "让它动",
    subtitle: "机器人 / 物理 AI",
    items: [
      {
        name: "灵巧操作",
        proofProjectSlug: "bci-dexterous-hand",
        proofEvidenceId: evidenceIds.bciDexterousHand.controlTest,
        proofLabel: "在 BCI × 灵巧手中动作",
      },
    ],
  },
];

export const capabilityGroupsByLocale: Record<Locale, CapabilityGroup[]> = { en, zh };

export function getCapabilityGroups(locale: Locale): CapabilityGroup[] {
  return capabilityGroupsByLocale[locale];
}
