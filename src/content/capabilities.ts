import type { CapabilityGroup } from "./types";
import { evidenceIds } from "./projects";

// 能力条目必须有项目证据链接；没有证据的方向不写成"已掌握"。
export const capabilityGroups: CapabilityGroup[] = [
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
