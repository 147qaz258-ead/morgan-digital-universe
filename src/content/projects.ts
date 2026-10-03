import type { Evidence, EvidenceId, EvidenceType, Project } from "./types";

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

function pendingEvidence(id: EvidenceId, title: string, type: EvidenceType): Evidence {
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

// 只填写已确定信息；未知结果、数据、成绩一律 null / 空，不编造。
export const projects: Project[] = [
  {
    slug: "physical-link",
    index: "01",
    title: "PhysicalLink — AI as a Hardware Participant",
    shortTitle: "PhysicalLink",
    status: "active-research",
    publicationStatus: "pending",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Hardware / Embedded / AI Interface",
    oneLine:
      "An active research direction examining how AI might participate in hardware systems. Implementation details and evidence remain under publication review.",
    problem: [],
    insight: null,
    solution: [],
    build: [],
    myRole: null,
    stack: [],
    systemDiagram: null,
    evidence: [
      pendingEvidence(evidenceIds.physicalLink.hero, "Prototype hero photo", "hardware"),
      pendingEvidence(evidenceIds.physicalLink.pcb, "PCB front / back", "pcb"),
      pendingEvidence(evidenceIds.physicalLink.demo, "Working demo video", "video"),
    ],
    media: { hero: null, gallery: [], video: null },
    failures: [],
    result: { state: "active-research", summary: null },
    lessons: [],
    next: null,
    links: [],
    featured: true,
  },
  {
    slug: "ai-native-hardware-workspace",
    index: "02",
    title: "AI-Native Hardware Workspace — Natural Language to Real Hardware",
    shortTitle: "AI-Native Hardware Workspace",
    status: "prototype",
    publicationStatus: "pending",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Software / AI / Tooling",
    oneLine:
      "A hardware workspace experiment currently under documentation review. Implementation details, results, and supporting evidence remain unpublished until they are confirmed.",
    problem: [],
    insight: null,
    solution: [],
    build: [],
    myRole: null,
    stack: [],
    systemDiagram: null,
    evidence: [
      pendingEvidence(evidenceIds.hardwareWorkspace.hero, "Product hero screenshot", "screenshot"),
      pendingEvidence(evidenceIds.hardwareWorkspace.flow, "Key flow recording", "video"),
      pendingEvidence(evidenceIds.hardwareWorkspace.deviceOutput, "Real device output", "hardware"),
    ],
    media: { hero: null, gallery: [], video: null },
    failures: [],
    result: { state: "prototype", summary: null },
    lessons: [],
    next: null,
    links: [],
    featured: true,
  },
  {
    slug: "bci-dexterous-hand",
    index: "03",
    title: "BCI × Dexterous Hand — Intent to Physical Action",
    shortTitle: "BCI × Dexterous Hand",
    status: "partial",
    publicationStatus: "pending",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Robotics / BCI / Physical AI",
    oneLine:
      "A brain–computer interface and dexterous hand experiment under documentation review. Control results and supporting evidence remain unpublished until confirmed.",
    problem: [],
    insight: null,
    solution: [],
    build: [],
    myRole: null,
    stack: [],
    systemDiagram: null,
    evidence: [
      pendingEvidence(evidenceIds.bciDexterousHand.experiment, "Experiment scene photo", "hardware"),
      pendingEvidence(evidenceIds.bciDexterousHand.controlTest, "Control test video", "test"),
    ],
    media: { hero: null, gallery: [], video: null },
    failures: [],
    result: { state: "partial", summary: null },
    lessons: [],
    next: null,
    links: [],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getEvidenceRecord(id: EvidenceId): { project: Project; evidence: Evidence } | null {
  for (const project of projects) {
    const evidence = project.evidence.find((item) => item.id === id);
    if (evidence) return { project, evidence };
  }
  return null;
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
}
