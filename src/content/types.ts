export type EvidenceType =
  | "demo"
  | "source"
  | "hardware"
  | "pcb"
  | "architecture"
  | "test"
  | "screenshot"
  | "video"
  | "document";

export type AssetProvenance =
  | "user-evidence"
  | "generated-atmosphere"
  | "self-authored-3d"
  | "system-diagram";

export type AssetStatus = "pending" | "ready" | "verified";

export type EvidenceId = `evidence-${string}`;
export type DiagramId = `diagram-${string}`;
export type EvidenceVerificationState =
  | "pending"
  | "submitted"
  | "normalized"
  | "user-confirmed"
  | "verified";
export type PublicationPermission = "pending" | "granted" | "denied";

export interface MediaAsset {
  id: string;
  src: string | null;
  kind: "image" | "video" | "model" | "diagram";
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  caption?: string | null;
  poster?: string | null;
  captions?: string | null;
  provenance: AssetProvenance;
  status: AssetStatus;
}

export interface HomeExperienceChapter {
  id: string;
  label: string;
  range: readonly [number, number];
  projectSlug: string | null;
  media: MediaAsset | null;
}

export interface ExperienceState {
  progress: number;
  activeChapter: string;
  reducedMotion: boolean;
  mode: "poster" | "video" | "webgl";
  quality: "low" | "medium" | "high";
}

export type EvidenceMediaAsset = MediaAsset & {
  provenance: "user-evidence";
};

export type GeneratedAtmosphereAsset = MediaAsset & {
  provenance: "generated-atmosphere";
  /** Optional keyframe-dense derivative used only for scroll-controlled seeking. */
  scrubSrc?: string | null;
};

export interface EvidenceVerification {
  state: EvidenceVerificationState;
  publicPermission: PublicationPermission;
  userConfirmed: boolean;
  claim: string | null;
  captureDate: string | null;
  owner: string | null;
  redactionRequired: boolean | null;
}

export interface Evidence {
  /** Stable public anchor. Never reuse an ID for a different file or claim. */
  id: EvidenceId;
  title: string;
  type: EvidenceType;
  /** Evidence can only reference user-provided media. Generated atmosphere is kept separate. */
  asset: EvidenceMediaAsset | null;
  caption: string | null;
  verification: EvidenceVerification;
  /** Must stay false until every verification field and the referenced file pass the content audit. */
  isVerified: boolean;
}

export type SystemNodeKind =
  | "input"
  | "processing"
  | "interface"
  | "hardware"
  | "output"
  | "boundary";

export interface SystemDiagramNode {
  id: string;
  label: string;
  kind: SystemNodeKind;
  detail: string | null;
}

export interface SystemDiagramConnection {
  id: string;
  from: string;
  to: string;
  label: string | null;
  protocol: string | null;
  direction: "forward" | "bidirectional";
}

export interface SystemDiagram {
  id: DiagramId;
  title: string;
  status: "pending" | "confirmed";
  nodes: SystemDiagramNode[];
  connections: SystemDiagramConnection[];
  boundaryNotes: string[];
}

export type ProjectStatus =
  | "active-research"
  | "prototype"
  | "partial"
  | "planned"
  | "completed";

export type PublicationStatus = "pending" | "published";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectMedia {
  hero: MediaAsset | null;
  gallery: MediaAsset[];
  video: MediaAsset | null;
}

export interface FailureEntry {
  what: string;
  why: string;
  change: string | null;
  lesson: string | null;
}

export interface Project {
  slug: string;
  /** 首页/详情编号，如 "01" */
  index: string;
  title: string;
  shortTitle: string;
  status: ProjectStatus;
  publicationStatus: PublicationStatus;
  year: number | null;
  dateRange: string | null;
  teamSize: string | null;
  contributors: string[];
  category: string;
  oneLine: string;
  problem: string[];
  insight: string | null;
  solution: string[];
  build: string[];
  myRole: string | null;
  stack: string[];
  systemDiagram: SystemDiagram | null;
  evidence: Evidence[];
  media: ProjectMedia;
  failures: FailureEntry[];
  result: { state: ProjectStatus; summary: string | null };
  lessons: string[];
  next: string | null;
  links: ProjectLink[];
  featured: boolean;
}

export interface OriginStage {
  id: string;
  label: string;
  title: string;
  oneLine: string;
  narrative: string;
  yearRange: string | null;
  skills: string[];
  projectRefs: string[];
  evidenceRefs: EvidenceId[];
  visualType: "digital" | "intelligence" | "hardware" | "physical-ai";
}

export type LabCategory = "failure" | "prototype" | "equipment" | "note";

export interface LabItem {
  id: string;
  title: string;
  date: string | null;
  category: LabCategory;
  summary: string;
  status: string | null;
  media: MediaAsset | null;
  relatedProject: string | null;
}

export interface CapabilityItem {
  name: string;
  proofProjectSlug: string | null;
  proofEvidenceId: EvidenceId | null;
  proofLabel: string | null;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  subtitle: string;
  items: CapabilityItem[];
}

export interface CurrentFocusItem {
  label: string;
  status: "ACTIVE" | "EXPLORING" | "BUILDING";
}

export interface Profile {
  displayName: string;
  brandName: string;
  headline: string;
  subheadline: string;
  location: string | null;
  email: string | null;
  github: string | null;
  portrait: MediaAsset | null;
  socialLinks: ProjectLink[];
  currentFocus: CurrentFocusItem[];
}

export interface VisionStage {
  id: "now" | "next" | "long-term";
  label: string;
  narrative: string;
}
