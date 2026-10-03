# Local project source audit

> Audit date: 2026-09-28  
> Scope: local repositories under `E:\C_Projects` and the public GitHub account `147qaz258-ead`.  
> Purpose: establish a factual source layer before any project claim is published on the website.

## Publication rule

- `LOCATED` means a source exists and has been inspected. It does not grant public permission.
- `NORMALIZED` means the source has been converted into a candidate fact or evidence row.
- `USER_CONFIRMED` is still required before a candidate fact enters `src/content/` as a public claim.
- Hardware identifiers, Bluetooth identifiers, local ports, credentials, personal data and absolute local paths must be removed from public derivatives.
- A screenshot of a concept interface proves only that the interface exists. It does not prove a physical prototype, connected device, successful command or measured result.

## Repository discovery

| Source | Location / URL | Repository state | Use in V1.1 |
|---|---|---|---|
| Website | `E:\C_Projects\个人网站` | Local Git repository; no remote configured | Current implementation |
| AI Hardware Workspace | `E:\C_Projects\ai硬件` | Local Git repository; no remote configured; commits from 2026-07-16 to 2026-09-26 | Flagship project source |
| BCI × Dexterous Hand | `E:\C_Projects\机械臂` | Local working directory; no project-level Git history | Flagship project source |
| PhysicalLink definition | `E:\C_Projects\ai硬件\PhysicalLink_讨论上下文母文档_V0.1.docx` | Local source document | Flagship project definition source |
| Physical Task Agent | `E:\C_Projects\ai眼睛` / <https://github.com/147qaz258-ead/physical-task-agent> | Public Apache-2.0 repository; one public commit at audit time | Possible archive / Origin proof; not automatically a flagship replacement |
| Public GitHub account | <https://github.com/147qaz258-ead> | Public repositories inspected through GitHub API | Discovery only |

The public account contains adjacent physical-computing work, including `physical-task-agent`, `plc-ai-agent`, `capsule-defect-detection` and `insta360-hackathon`. No public repository matching the local AI Hardware Workspace or BCI runtime was found during this audit. Public availability of adjacent repositories does not establish authorship, team role or permission to republish local media.

## PhysicalLink

### Normalized finding

PhysicalLink is currently a research and product-definition track about treating general AI as a first-class participant in physical systems. The source document explicitly rejects premature claims that it is already a protocol, hardware operating system, IoT platform, robotics middleware, SDK, compatibility layer or finished hardware module.

The strongest current formulation is:

> Most hardware was not designed with general AI as a formal participant. An AI can know hardware in general while still lacking timely, relational knowledge of the specific physical system in front of it. Software or API success is not sufficient evidence of physical success.

### What the source supports

- Status: active research / product definition.
- Problem: the gap between model-level knowledge and the current state, topology and constraints of a real device.
- Acceptance principle: real-world physical outcomes are the final acceptance layer.
- Next step: select the first concrete problem, lock a first-stage product scope and define measurable acceptance before technical architecture is frozen.

### What the source does not support

- A completed “AI-native hardware layer”.
- A fabricated PCB, finished device, deployed protocol or verified hardware-control result.
- Performance, adoption, team-size or delivery claims.
- Using `physical-link-home.png` or `physical-link-agent.png` as hardware Evidence. They are interface/concept visuals only.

### Located sources

| Source | SHA-256 | Classification | Public use |
|---|---|---|---|
| `E:\C_Projects\ai硬件\PhysicalLink_讨论上下文母文档_V0.1.docx` | `f2602aba022262ad9ce421255fb4e7a1fd8d9a1885db8b2f4306ceddb49681b4` | Product-definition source | Pending user confirmation and redaction review |
| `E:\C_Projects\机械臂\physical-link-home.png` | `212b102eb45ae3111fdf53e5b8ec447535acad77f13cbfbc9547864a8fd5dc52` | Concept UI | Atmosphere / concept only; never Evidence |
| `E:\C_Projects\机械臂\physical-link-agent.png` | `85ff1fe582c3ef374710e3d4a12bcbb7ba97fece17909521e91de8958ff94e7f` | Concept UI | Atmosphere / concept only; never Evidence |

### Required correction before publication

The current public candidate title and one-line in `src/content/projects.ts` are stronger than the source permits. They should be rewritten as an active research thesis after user confirmation, or the project should remain unpublished until a concrete implementation and real Evidence exist.

## AI-Native Hardware Workspace

### Normalized finding

The local repository implements a browser-based hardware-agent workspace for turning a project brief into an auditable `ProjectArtifact`: graph changes, catalog-backed modules, validation, revisions, session history and export/build operations are projected into a canvas-first workbench.

Repository history begins on 2026-07-16 and the latest inspected commit is `83046cf` from 2026-09-26. The repository has no configured remote, so it has no publishable source link yet.

### Confirmed implementation surface

- React 19.1, TypeScript, Vite, React Flow and tscircuit packages are declared in the current `package.json`.
- The current architecture includes a web workspace plus runtime API and runtime worker workspaces.
- The repository contains SQLite-backed session/event recovery, revision transactions, provider/runtime integration, catalog lookup, permission levels and browser UI projections.
- The interface includes project chat, project history, a breadboard canvas, catalog suggestions, an inspector, activity records, design checks and export/build entry points.
- The repository's own status document describes the product as an in-progress product-validation build, not a finished product.

### Test evidence and limits

- `verification/agent-bench/runs/2026-09-13-multi-provider-catalog-v2/report.json` reports 31/31 assertions passing across six dimensions: session recovery, steer/cancel, tool projection, permissions, revision and context budget.
- That report explicitly uses the production `DshHarnessEngine` with a deterministic `LlmAdapter` test double. It does not prove a live model or real device completed an end-to-end task.
- `verification/full-vitest-2026-09-12.json` records 1,288 passed and 42 failed tests out of 1,333 total; 403 of 434 suites passed. Therefore the site must not claim that the historical full test run was all green.
- The inspected UI evidence proves the workspace and catalog projection. No located source proves a real device response, upload, flash or serial result.

### Located evidence candidates

| Candidate | SHA-256 | Claim supported | Limitation / action |
|---|---|---|---|
| `verification/artifacts/workbench-with-module-1440.png` | `246cf3d5cc535ca07c866b3c06cddc46b4ef91b2650289a7c735933b816ffaf4` | A real browser workbench renders a catalog-backed module and inspector data | Candidate hero after public-permission confirmation |
| `verification/agent-bench/runs/2026-09-13-multi-provider-catalog-v2/report.json` | `109a613f186fecb837ac7346863e8467a765bc7dff33aad8f7c3f4e105c280ac` | Six scoped runtime dimensions passed 31 assertions | Must disclose deterministic adapter test double |
| `verification/artifacts/live-agent-write-graph-after-session-guard.png` | `133fb6d3c2c20b736fc43010cb45788c0b92631c950e042a5d2d86ed55292af7` | Honest failure state: catalog search ran, an invalid graph patch was rejected | Failure archive only; not a success image |
| `verification/full-vitest-2026-09-12.json` | `e5048ee8da72e35068298adfd368b908da0033b5502af68328602c98952b0779` | Historical full-suite baseline with both passes and failures | Internal evidence; summarize, do not publish raw paths |

### Publishable result boundary

Current state should be presented as `Prototype` or `Partial`, not `Completed`. A defensible result is that the repository demonstrates an auditable hardware-design workspace and scoped runtime behaviors. The phrase “natural language becomes real, running hardware” still requires a continuous recording or log that includes actual device output.

## BCI × Dexterous Hand

### Normalized finding

The local workspace contains a Python BCI runtime, a .NET Bluetooth RFCOMM bridge for Mind Link, a TypeScript web control surface, and the official/vendor LinkerHand SDKs. The strongest verified event is a real-data commissioning run on 2026-09-10 that connected a Mind Link stream to a LinkerHand O6 position move and release.

This is a prototype commissioning result. It is not evidence of semantic thought decoding, tactile grasping, adaptive manipulation or a trained production BCI decoder.

### Real signal capture

`bci-calibration-real-s3-20260910-103026.jsonl` records a 60-second, two-cycle REST / FOCUS / transition session with `fakeDataUsed=false`. Its final session summary reports:

- Direct RFCOMM bridge transport.
- 255,217 bytes, 31,685 valid packets, zero invalid packets and 31,623 raw samples.
- An observed raw-sample rate near 514.37 Hz during that capture.
- 24,704 valid labelled frames in the paired capture report.

This proves a real stream was captured and labelled. It does not prove that REST and FOCUS were separable with a validated model.

### Real one-shot control event

`real-bci-o6-one-shot-20260910-100026-report.json` records a 51.95-second run with `fakeDataUsed=false`:

- 17,289 EEG frames and 16,499 valid-signal frames.
- A commissioning dwell gate produced an experimental `GRASP` intent at attention 61 with good signal.
- Eligibility passed; the O6 position command was emitted 201 ms after the BCI control event.
- The commanded index-axis pose was observed at target 1,977 ms after command emission.
- Release was commanded immediately after the hold state; the released state was recorded 1,759 ms later.
- The runtime recorded 36 hardware observations and completed the state trace `READY → CLOSING → POSE_REACHED → HOLD → RELEASING → RELEASED`.

The report labels the command `POSITION_MOVE_ONLY_NOT_GRIP` and the algorithm `real eSense Attention one-shot commissioning dwell gate; not final trained decoder`. Public copy must preserve both qualifications.

### Failure and safety evidence

- `o6-tactile-gate-s0-final-20260910.json` is a deliberate failed gate: the installed O6 has no tactile configuration, 1,101 sampled frames remained zero, and the source prohibits tactile-contact or tactile closed-loop grasp claims.
- The long-running EEG daemon log reached 1,022,354 valid packets with zero invalid packets, then recorded the configured port disappearing and 95 reconnect attempts. This is useful reliability/failure evidence, not a successful uninterrupted-run claim.
- Raw captures include a device serial number and Bluetooth identifiers. Public derivatives require redaction.

### Located evidence candidates

| Candidate | SHA-256 | Claim supported | Limitation / action |
|---|---|---|---|
| `bci-runtime/captures/bci-calibration-real-s3-20260910-103026.jsonl` | `c517eff98733fe2b3311c481d25b8cd1ad285b84511692e7f6a1eb3a028e0af8` | Real labelled Mind Link stream | Redact device identifiers; derive a compact chart |
| `bci-runtime/captures/real-bci-o6-one-shot-20260910-100026.jsonl` | `d4e1e2bbd1c08c5e5f8a5af6f59c02d775fddf558ec70455ddd7013596577b14` | Real signal-to-position-command-to-release event | Not tactile grasp; redact serial and ports |
| `bci-runtime/captures/real-bci-o6-one-shot-20260910-100026-report.json` | `c23bedc12601beccf8b54c9c6fbbf7423e439a614ed9b1996f4b1f7160a0ca0f` | Concise machine-readable run result | Best source for public metric wording after confirmation |
| `bci-runtime/captures/o6-tactile-gate-s0-final-20260910.json` | `58edd5a699e3fbde3d4e8c708c288ba07ebad94937fdccb8880d418af503b7af` | Missing tactile hardware and prohibited claims | Failure / limitation evidence |
| `bci-runtime/logs/eeg-daemon-20260910-161643.jsonl` | `dd0c4eb5bfc51cfa48bfa9fc34e37691fdb52840d9446621e25e38a775e47e2f` | Streaming volume plus disconnect/retry behavior | Long raw log; derive a redacted summary |

### Missing visual proof

No inspected still image shows the real Mind Link input process and the real O6 hand in the same frame. Existing web screenshots are disconnected or blocked states, and the available edited video has not been accepted as a continuous evidence take. A real wide photograph and one continuous input-to-motion recording remain required for the hero and primary Evidence slots.

## Public GitHub findings

`physical-task-agent` is the only inspected public repository directly adjacent to the site's physical-AI thesis. Its README describes a Windows-first physical-task agent with camera evidence, task packs, an event log and BUILD / CHECK / DEBUG / LEARN modes. It also says real hardware, real model and user testing remain external. It can support an archive or Origin entry after authorship and project-role confirmation, but it cannot close the missing Evidence for the three current flagship projects.

## User confirmations still required

1. Confirm that `E:\C_Projects\ai硬件` and `E:\C_Projects\机械臂` are Morgan's own projects and state any collaborators or third-party ownership.
2. Confirm whether the located screenshots and redacted log derivatives may be published.
3. Confirm the preferred PhysicalLink classification: active research thesis, planned product or unpublished until implementation exists.
4. Confirm the AI Hardware Workspace role, team size and whether a public repository will be created.
5. Confirm whether the BCI one-shot run may be described publicly with the measured timing above.
6. Provide or identify the real device photos and continuous recordings still missing from the Evidence rows.

