# Project content intake

Complete one copy of this checklist for each flagship experiment. Unknown information should stay blank. Nothing in this file is published automatically.

## Intake packages

| ID | Project | Fact package | Evidence manifest | User confirmation | Publish state |
|---|---|---|---|---|---|
| CONTENT-PL-01 | PhysicalLink | NORMALIZED | NORMALIZED | PENDING | BLOCKED_CONFIRMATION_AND_ASSET |
| CONTENT-HW-01 | AI-Native Hardware Workspace | NORMALIZED | NORMALIZED | PENDING | BLOCKED_CONFIRMATION_AND_ASSET |
| CONTENT-BCI-01 | BCI × Dexterous Hand | NORMALIZED | NORMALIZED | PENDING | BLOCKED_CONFIRMATION_AND_ASSET |

Lifecycle: `SUBMITTED → NORMALIZED → USER_CONFIRMED → PUBLISHED`. The public content source may only use `USER_CONFIRMED` fields.

Source audit: [`LOCAL_PROJECT_SOURCE_AUDIT.md`](./LOCAL_PROJECT_SOURCE_AUDIT.md). The local/GitHub pass has located implementation material and normalized candidate facts, but it does not replace ownership, publication-permission or final-wording confirmation.

## Normalized project fact packages

### PhysicalLink — candidate V0.1

- Date or date range: active as of 2026-09-25; start date pending confirmation.
- Current state: active research / product definition; final label pending user choice.
- Team size / Morgan's role: pending.
- Confirmed problem: general AI lacks timely, relational knowledge of the specific physical system; software/API success is not physical-world acceptance.
- Confirmed boundary: not yet a protocol, hardware OS, IoT platform, robotics middleware, SDK, compatibility layer or finished hardware module.
- Current verified result: a documented research and product-definition thesis, not a verified hardware implementation.
- Candidate public one-line: `Researching how AI can become a first-class participant in real hardware systems, with physical outcomes as the final acceptance layer.`
- Source: `E:\C_Projects\ai硬件\PhysicalLink_讨论上下文母文档_V0.1.docx`.
- Evidence status: the definition document is located; real prototype, PCB, device, build and demo Evidence remain missing.

### AI-Native Hardware Workspace — candidate V0.1

- Date range: 2026-07-16 to present, based on local Git history; user confirmation pending.
- Current state: prototype / partial.
- Team size / Morgan's role: pending.
- Confirmed system: project brief → runtime session and constrained tools → `ProjectArtifact` revisions → canvas / design checks / build or export surfaces.
- Confirmed stack: React 19.1, TypeScript, Vite, React Flow, tscircuit, Vitest; runtime API and worker packages are present.
- Confirmed evidence: a real browser workbench screenshot, a 31/31 scoped agent-bench report, an honest invalid-patch failure capture and a historical full-suite report.
- Verified boundary: the 31/31 report uses a deterministic model adapter test double; the historical full run contains 42 failed tests; real device output has not been located.
- Candidate public one-line: `A prototype workspace that turns hardware briefs into auditable component graphs, checks, revisions and build artifacts through a constrained agent runtime.`
- Public source link: none; the local repository has no configured remote.

### BCI × Dexterous Hand — candidate V0.1

- Date range: 2026-09-09 to 2026-09-10 for the inspected integration and capture set; broader project dates pending.
- Current state: prototype / partial.
- Team size / Morgan's role: pending.
- Confirmed system: Mind Link → direct RFCOMM bridge → EEG parser / dwell gate → eligibility and safety checks → LinkerHand O6 official SDK → observed position state.
- Confirmed stack: Python BCI runtime, .NET bridge, TypeScript web interface and official/vendor LinkerHand SDK code.
- Confirmed result: a real-data commissioning run recorded 17,289 EEG frames, emitted one eligible O6 position move 201 ms after the BCI control event, observed the target pose 1,977 ms after command emission and recorded release 1,759 ms later.
- Confirmed boundary: the decoder is experimental; the command is explicitly position-only, not a proven grasp; the installed hand has no tactile configuration.
- Candidate public one-line: `A real-data commissioning prototype that converts a Mind Link attention gate into an observed LinkerHand O6 position move and release.`
- Evidence status: calibration, control and failure logs are located; real setup photography and a continuous input-to-motion video remain missing.

## Identity

- Project title:
- Date or date range:
- Current state: completed / prototype / partial / planned / active
- Team size:
- Morgan's role:
- Public links:
- Third-party contributors and what they owned:
- Fields that must remain private:

## Problem and context

- What was broken or missing?
- Who experienced the problem?
- Why did it matter?
- What constraints shaped the work?

## System

- Inputs:
- Processing / intelligence layer:
- Hardware or device layer:
- Outputs:
- Protocols and interfaces:
- Confirmed software stack:
- Confirmed hardware stack:

## Build and ownership

- What Morgan designed:
- What Morgan implemented:
- What came from collaborators or third parties:
- Most important technical decision:

## Failure and result

- What failed or remained limited:
- Why:
- What changed:
- Current verified result:
- Metrics and their source:
- What was learned:

## Evidence inventory

For every item, provide file name, capture date, caption, publication permission, and whether it directly proves a claim.

- Hero photo or screenshot:
- PCB / wiring / mechanical photos:
- Architecture or data-flow source:
- Demo video:
- Test log:
- Source or document link:

Use one row per file:

| Evidence ID | Suggested file name | Original file | Capture date | Caption | Claim proved | Owner | Public permission | Redaction needed | Status |
|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |  | SUBMITTED |

### Normalized evidence candidates from the local/GitHub audit

These rows are candidates, not public assets. `Owner` and `Public permission` remain pending until the user confirms them. Absolute paths are intake-only and must never be rendered on the site.

| Evidence ID | Suggested file name | Original file | Capture date | Candidate caption | Claim proved | Owner | Public permission | Redaction needed | Status |
|---|---|---|---|---|---|---|---|---|---|
| EVIDENCE-PL-11 | `physical-link-definition-source-01.pdf` | `E:\C_Projects\ai硬件\PhysicalLink_讨论上下文母文档_V0.1.docx` | 2026-09-25 | `PhysicalLink V0.1 frames the problem of making AI a formal participant in physical systems.` | Research scope and non-claims only | PENDING | PENDING | Yes — convert selected pages/sections only | NORMALIZED |
| EVIDENCE-HW-01 | `hardware-workspace-hero-screenshot-01.webp` | `E:\C_Projects\ai硬件\verification\artifacts\workbench-with-module-1440.png` | 2026-07-28 | `The canvas-first workbench renders a catalog-backed camera module with its ports, electrical limits and capabilities.` | Real product UI and catalog projection | PENDING | PENDING | Review identifiers; crop/convert to WebP | NORMALIZED |
| EVIDENCE-HW-04 | `hardware-workspace-agent-bench-summary-01.svg` | `E:\C_Projects\ai硬件\verification\agent-bench\runs\2026-09-13-multi-provider-catalog-v2\report.json` | 2026-09-13 | `A scoped runtime bench passed 31 assertions across recovery, cancellation, projection, permissions, revisions and context control.` | Scoped runtime behavior | PENDING | PENDING | Remove local paths; disclose deterministic adapter | NORMALIZED |
| EVIDENCE-HW-05 | `hardware-workspace-invalid-patch-01.webp` | `E:\C_Projects\ai硬件\verification\artifacts\live-agent-write-graph-after-session-guard.png` | 2026-07-30 | `The runtime exposed and rejected an invalid graph patch instead of presenting a false success state.` | Real failure state and rejection | PENDING | PENDING | Review task text and identifiers | NORMALIZED |
| EVIDENCE-BCI-02 | `bci-hand-signal-record-01.svg` | `E:\C_Projects\机械臂\bci-runtime\captures\bci-calibration-real-s3-20260910-103026.jsonl` | 2026-09-10 | `A 60-second real Mind Link session captured labelled REST and FOCUS intervals with no synthetic data.` | Real labelled EEG stream | PENDING | PENDING | Yes — Bluetooth identifiers, local port and path | NORMALIZED |
| EVIDENCE-BCI-04 | `bci-hand-control-timeline-01.svg` | `E:\C_Projects\机械臂\bci-runtime\captures\real-bci-o6-one-shot-20260910-100026-report.json` | 2026-09-10 | `An experimental attention dwell gate led to an observed O6 position move and release in one commissioning run.` | Signal gate → command → observed target → release | PENDING | PENDING | Yes — device identifiers, local port and path | NORMALIZED |
| EVIDENCE-BCI-04 | `bci-hand-tactile-gate-failure-01.svg` | `E:\C_Projects\机械臂\bci-runtime\captures\o6-tactile-gate-s0-final-20260910.json` | 2026-09-10 | `The tactile gate failed because the installed O6 configuration has no tactile sensing hardware.` | Explicit limitation and prohibited claims | PENDING | PENDING | Yes — serial and version details as needed | NORMALIZED |
| EVIDENCE-BCI-08 | `bci-hand-one-shot-report-01.json` | `E:\C_Projects\机械臂\bci-runtime\captures\real-bci-o6-one-shot-20260910-100026-report.json` | 2026-09-10 | `Machine-readable commissioning report for the real-data one-shot position-control run.` | Source record for metrics and state trace | PENDING | PENDING | Yes — local path, port and identifiers | NORMALIZED |

An item becomes verified only when the file exists, provenance is `user-evidence`, caption is complete, publication permission is confirmed, the claim mapping is explicit, and the user has approved the final wording.

### Stable public Evidence anchors

These IDs are already reserved in code. They remain pending until their linked source rows pass verification and must not be renamed when files are replaced with a new version.

| Public anchor | Project | Source inventory rows |
|---|---|---|
| `evidence-physical-link-hero` | PhysicalLink | EVIDENCE-PL-01, EVIDENCE-PL-02 |
| `evidence-physical-link-pcb` | PhysicalLink | EVIDENCE-PL-03, EVIDENCE-PL-04 |
| `evidence-physical-link-demo` | PhysicalLink | EVIDENCE-PL-08, EVIDENCE-PL-09, EVIDENCE-PL-10 |
| `evidence-ai-native-hardware-workspace-hero` | AI-Native Hardware Workspace | EVIDENCE-HW-01 |
| `evidence-ai-native-hardware-workspace-flow` | AI-Native Hardware Workspace | EVIDENCE-HW-06, EVIDENCE-HW-07, EVIDENCE-HW-08 |
| `evidence-ai-native-hardware-workspace-device-output` | AI-Native Hardware Workspace | EVIDENCE-HW-03, EVIDENCE-HW-04 |
| `evidence-bci-dexterous-hand-experiment` | BCI × Dexterous Hand | EVIDENCE-BCI-01, EVIDENCE-BCI-02, EVIDENCE-BCI-03 |
| `evidence-bci-dexterous-hand-control-test` | BCI × Dexterous Hand | EVIDENCE-BCI-04, EVIDENCE-BCI-05, EVIDENCE-BCI-06, EVIDENCE-BCI-07 |

## Project-level acceptance

- [ ] Homepage one-line is 18–32 English words.
- [ ] Problem, Idea, System, Build, Evidence, Failure/Limitation, Result, Lessons, and Next are either confirmed or intentionally omitted.
- [ ] Each published section is about 80 English words or less unless a table/diagram carries the detail.
- [ ] Role, stack, protocol, hardware, result, metrics, ownership, and third-party contribution are confirmed.
- [ ] System/data-flow diagram matches the confirmed implementation.
- [ ] Every published claim points to confirmed evidence or an explicit user confirmation.
- [ ] Generated atmosphere and conceptual 3D are not used as Evidence.
- [ ] User approves the final English version before publication.

## Approval log

| Project | Content version | Evidence version | Confirmed by user | Confirmation date | Notes |
|---|---|---|---|---|---|
| PhysicalLink | — | — | No | — | — |
| AI-Native Hardware Workspace | — | — | No | — | — |
| BCI × Dexterous Hand | — | — | No | — | — |
