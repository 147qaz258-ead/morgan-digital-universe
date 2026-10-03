import type { OriginStage } from "./types";
import { evidenceIds } from "./projects";

export const originStages: OriginStage[] = [
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

export const originTurningPoint = {
  line: "AI should not stop at the screen.",
  zh: null,
};
