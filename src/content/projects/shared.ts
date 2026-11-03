import type { Evidence, EvidenceId, EvidenceType } from "../types";

export const evidenceIds = {
  physicalLink: {
    hero: "evidence-physical-link-hero",
    pcb: "evidence-physical-link-pcb",
    demo: "evidence-physical-link-demo",
  },
  hardwareWorkspace: {
    hero: "evidence-ai-native-hardware-workspace-hero",
    flow: "evidence-ai-native-hardware-workspace-flow",
    deviceOutput: "evidence-ai-native-hardware-workspace-device-output",
  },
  bciDexterousHand: {
    experiment: "evidence-bci-dexterous-hand-experiment",
    controlTest: "evidence-bci-dexterous-hand-control-test",
  },
} as const satisfies Record<string, Record<string, EvidenceId>>;

export function pendingEvidence(id: EvidenceId, title: string, type: EvidenceType): Evidence {
  return {
    id,
    title,
    type,
    asset: null,
    caption: null,
    verification: {
      state: "pending",
      publicPermission: "pending",
      userConfirmed: false,
      claim: null,
      captureDate: null,
      owner: null,
      redactionRequired: null,
    },
    isVerified: false,
  };
}
