# Project content confirmation — candidate V0.1

> Prepared from the 2026-09-28 local/GitHub source audit.  
> This is the exact English content direction proposed for `src/content/`. It is not published until the approval block at the end is confirmed.

## 01 — PhysicalLink

**Proposed title**  
`PhysicalLink — AI as a Hardware Participant`

**Status**  
`Active research`

**Homepage summary — 20 words**  
`Researching how AI can become a first-class participant in real hardware systems, with physical outcomes as the final acceptance layer.`

### Problem

General AI can know hardware in the abstract while remaining blind to the live state, topology, constraints and relationships of the specific system in front of it. An API call or successful code path does not prove that the physical outcome occurred.

### Idea

Treat AI as a formal participant in the hardware system instead of an external operator. The research asks what context, interfaces, constraints and verification signals are needed before an AI can act on a real device responsibly.

### Current work

The current phase defines the problem, rejects premature product categories and uses physical outcomes as the acceptance boundary. No protocol, hardware module or system architecture is presented as final.

### Evidence

The current source is a V0.1 research and product-definition document. Concept interface screens are labelled as concept visuals and are not hardware Evidence.

### Failure / limitation

Naming a protocol, SDK, operating system or hardware layer too early would turn an unresolved systems question into a misleading product claim. The project does not yet have a verified physical implementation.

### Result

`Active research` — a bounded thesis and acceptance principle are documented; the first concrete problem and implementation remain to be selected.

### Lesson

Physical AI needs evidence from the device and environment. Software success is only an intermediate signal.

### Next

Select one concrete hardware task, define observable success and failure, then design the smallest implementation that can be tested against that physical acceptance gate.

### Evidence allowed after confirmation

- Selected, redacted excerpts from the V0.1 definition document.
- Clearly labelled concept UI as atmosphere only.
- No prototype, PCB, device or performance claims until real Evidence exists.

## 02 — AI-Native Hardware Workspace

**Proposed title**  
`AI-Native Hardware Workspace — Auditable Hardware Design with Agents`

**Status**  
`Prototype`

**Homepage summary — 21 words**  
`A prototype workspace that turns hardware briefs into auditable component graphs, checks, revisions and build artifacts through a constrained agent runtime.`

### Problem

Hardware-agent workflows often separate the user's intent, component data, generated changes, checks and execution history. That makes it difficult to understand what changed, why it changed and whether a result came from a real tool or a simulated shortcut.

### Idea

Keep the project state in a versioned `ProjectArtifact`. Let the agent use constrained hardware tools, then project every accepted change, check and revision into a canvas-first workspace with a persistent event history.

### System

`Project brief → Runtime session → Constrained hardware tools → ProjectArtifact revision → Workbench projection → Design checks / build / export`

SQLite-backed session and event records support replay and recovery. The browser renders project history, module data, graph state, checks and agent activity without holding provider credentials.

### Build

The inspected repository uses React 19.1, TypeScript, Vite, React Flow and tscircuit packages, with separate runtime API and worker workspaces. The UI includes project chat, a breadboard canvas, catalog-backed modules, an inspector, revision activity, design checks and build/export entry points.

### Evidence

A real browser capture shows a catalog-backed OV2640 module and inspector data. A scoped agent bench passed 31 assertions across recovery, cancellation, tool projection, permissions, revisions and context control.

### Failure / limitation

The 31-assertion bench uses a deterministic model adapter, so it does not prove live-model or real-device completion. A historical full-suite report recorded 1,288 passed and 42 failed tests. A browser capture also shows an invalid graph patch being rejected rather than reported as success.

### Result

`Prototype` — the repository demonstrates an auditable hardware-design workspace and scoped runtime behavior. No located evidence yet proves that a natural-language request produced a successful result on a real physical device.

### Lessons

- A design check is not electrical simulation.
- A deterministic adapter is not a live-model result.
- UI activity should expose rejected mutations and incomplete states instead of compressing them into success.

### Next

Record one continuous run from project brief through live provider execution, accepted artifact revision and a visible real-device result. Re-run the full current test suite and retain the exact report used for the public claim.

### Proposed system diagram

| Node | Kind | Detail |
|---|---|---|
| Project brief | Input | User goal, constraints and known hardware |
| Runtime session | Processing | Provider-neutral session and event lifecycle |
| Hardware tool runtime | Interface | Catalog queries, graph patches, checks and gated actions |
| ProjectArtifact | Processing | Versioned graph, modules, source drafts and reports |
| SQLite event store | Boundary | Persistent sessions, events and recovery |
| Web workbench | Output | Canvas, inspector, activity, checks and export surfaces |
| Real device | Hardware | Pending end-to-end evidence |

## 03 — BCI × Dexterous Hand

**Proposed title**  
`BCI × Dexterous Hand — A Real-Data Control Commissioning Loop`

**Status**  
`Partial prototype`

**Homepage summary — 20 words**  
`A real-data commissioning prototype that converts a Mind Link attention gate into an observed LinkerHand O6 position move and release.`

### Problem

A noisy consumer EEG stream should not drive a hand from a single unqualified value. The control path needs signal-quality gates, dwell logic, hardware preflight, explicit command semantics and observed device state before an action can be treated as real.

### Idea

Use a narrow commissioning task: accept a real Mind Link stream, wait for a sustained attention condition, verify control eligibility, command one conservative O6 axis move and confirm the position through official SDK readback before release.

### System

`Mind Link → RFCOMM bridge → ThinkGear parser → Attention dwell gate → Eligibility / hardware preflight → O6 position command → Official SDK observation → Release`

The path uses a .NET Bluetooth bridge, a Python BCI runtime, the vendor/official LinkerHand SDK and structured JSONL evidence.

### Build

A 60-second real calibration capture recorded REST, FOCUS and transition intervals without synthetic data. The inspected one-shot run logged 17,289 EEG frames, 36 O6 observations and a complete control-state trace.

### Evidence

The commissioning run emitted an eligible O6 position command 201 ms after the BCI control event. The target pose was observed 1,977 ms after command emission, and the released state was recorded 1,759 ms after release was commanded.

### Failure / limitation

The decoder is an experimental attention-dwell gate, not a trained intent decoder. The command is explicitly `POSITION_MOVE_ONLY_NOT_GRIP`. The installed O6 has no tactile configuration, so tactile contact, adaptive grasp and per-finger contact claims are prohibited. A longer daemon log also records a device disconnect and 95 retry attempts.

### Result

`Partial` — one real-data commissioning run connected the signal gate to an observed hand position move and release. It does not establish reliable intent decoding, tactile grasping or production BCI performance.

### Lessons

- Signal quality and dwell gating must be explicit.
- Command issuance is not proof of movement; readback closes the minimum loop.
- Capability detection must prevent tactile claims when the hardware has no tactile sensors.

### Next

Train and evaluate a subject-specific decoder, define repeatable success metrics across multiple trials, add appropriate sensing if contact is required, and record an uncut wide-angle run showing the input process and the hand together.

### Proposed system diagram

| Node | Kind | Detail |
|---|---|---|
| Mind Link | Input | Real EEG/eSense stream |
| RFCOMM bridge | Interface | Bluetooth Classic stream transport |
| Parser and dwell gate | Processing | Packet parsing, signal-quality gate and sustained threshold |
| Eligibility and preflight | Boundary | Hardware state and command-safety checks |
| O6 SDK command | Interface | Position-only command |
| LinkerHand O6 | Hardware | Six-axis hand; installed unit has no tactile configuration |
| Position observation | Output | Official SDK readback and controller state trace |

## Approval block

To move this copy into `src/content/` and convert the located sources into public Evidence, the user must confirm:

- [ ] The two local projects and their inspected logs/screenshots are Morgan's work or Morgan has permission to present them.
- [ ] The proposed titles, statuses and English summaries accurately describe the projects.
- [ ] The measured BCI timing and scoped Hardware Workspace test results may be published with the stated limitations.
- [ ] Redacted derivatives of the located files may be copied into the website repository.
- [ ] Any collaborators, team sizes and Morgan's exact role have been added before final publication.

