import type { Project } from "../types";
import { projectMedia } from "../project-media";
import { evidenceIds, pendingEvidence } from "./shared";

// 只填写已确定信息；未知结果、数据、成绩一律 null / 空，不编造。
export const enProjects: Project[] = [
  {
    slug: "physical-link",
    index: "01",
    title: "PhysicalLink — AI as a Hardware Participant",
    shortTitle: "PhysicalLink",
    status: "active-research",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Hardware / Embedded / AI Interface",
    oneLine:
      "An active research track exploring how AI can participate in physical systems through explicit interfaces, device context, and observable real-world state.",
    problem: [
      "Most hardware is built for a human hand, a fixed controller, or a vendor SDK. A general AI is none of those, so it enters the system as an uninvited guest.",
      "A model can describe hardware in general and still know nothing about the specific board, firmware revision, or physical constraint in front of it.",
      "Software success gets mistaken for physical success: the call returns a success code while the device does nothing observable.",
    ],
    insight:
      "The interface is not the API. What a model actually needs is the current state, topology, and constraint of one device, plus an acceptance test written in physical outcomes.",
    solution: [
      "State what a system must know about a device before acting on it: current state, topology, limits, and what counts as a physical result.",
      "Separate general hardware knowledge from device-specific knowledge, and make the second one explicit, inspectable and time-stamped.",
      "Judge every action by the physical outcome it produced rather than the call it made, so a failed action reads as failed.",
      "Pick one concrete device-level problem before freezing any architecture, protocol, or name.",
    ],
    build: [
      "This track sits at definition stage: a source document, an explicit list of what the concept does not claim, and one scoped next step.",
      "No protocol, hardware layer, SDK, or finished module has been published from it, and this site does not present one. The interface images are direction, not device evidence.",
    ],
    myRole:
      "Author of the research track: problem framing, the acceptance principle, and the boundary of what remains unbuilt.",
    stack: [],
    systemDiagram: null,
    evidence: [
      pendingEvidence(evidenceIds.physicalLink.hero, "Prototype hero photo", "hardware"),
      pendingEvidence(evidenceIds.physicalLink.pcb, "PCB front / back", "pcb"),
      pendingEvidence(evidenceIds.physicalLink.demo, "Working demo video", "video"),
    ],
    media: { hero: null, gallery: [], video: null },
    failures: [
      {
        what: "Named the concept before anything physical existed.",
        why: "Early drafts described a protocol, an operating system for hardware, and a platform — three artifacts that did not exist yet.",
        change: "The definition now opens with what the concept explicitly does not claim.",
        lesson: "A concept has to earn its name after something physical works.",
      },
    ],
    result: {
      state: "active-research",
      summary:
        "Active research. The public claim stops at the thesis and its acceptance principle; implementation, device evidence and measured results are still missing.",
    },
    lessons: [
      "General knowledge of hardware is cheap. Knowledge of the specific device in front of you is the scarce part.",
      "Writing down what a project does not claim turned out to be more useful than another page of vision.",
    ],
    next:
      "Cut the track down to one device-level problem with a measurable physical outcome, then build the smallest artifact that can prove or kill the thesis.",
    links: [],
    featured: true,
  },
  {
    slug: "ai-native-hardware-workspace",
    index: "02",
    title: "AI-Native Hardware Workspace — Auditable Circuit Authoring",
    shortTitle: "AI-Native Hardware Workspace",
    status: "prototype",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Software / AI / Tooling",
    oneLine:
      "A canvas-first hardware-agent workspace for turning project briefs into inspectable circuit artifacts, catalog-backed modules, revisions, checks, and build outputs.",
    problem: [
      "Hardware design knowledge is scattered across datasheets, part catalogs, schematic tools, and the physical board itself. A model that only sees a chat window sees none of it.",
      "An agent that edits a design has to be auditable. A plausible-looking change nobody can review or roll back is worse than no change.",
      "Most agent demos stop at 'the graph changed'. A real workspace has to show what changed, why it changed, and whether the result still validates.",
    ],
    insight:
      "Model the design as an auditable artifact — revisions, validation, catalog lookups, session history — before letting a model write to it.",
    solution: [
      "Project the whole task into one artifact: graph changes, catalog-backed modules, validation results, revisions and session history.",
      "Constrain agent output to typed patches that the runtime can reject, instead of free-form edits that have to be trusted.",
      "Keep catalog lookup and permission levels inside the runtime, so every suggested part is a real part.",
      "Expose export and build entry points so the artifact can leave the browser as something checkable.",
    ],
    build: [
      "React 19 + TypeScript front end on Vite, with React Flow driving the canvas and tscircuit packages representing the circuit.",
      "A separate runtime API and a runtime worker own sessions, SQLite-backed recovery, revision transactions, provider integration and permission levels.",
      "A scoped runtime bench passed 31 assertions across six dimensions: session recovery, steer/cancel, tool projection, permissions, revision and context budget. It ran a deterministic adapter test double, not a live model.",
      "The historical full suite is not all green: 1,288 passed and 42 failed out of 1,333 tests. That number stays in the record.",
    ],
    myRole:
      "Solo build: workspace interface, runtime, agent integration, and the verification bench behind the numbers above.",
    stack: ["React 19", "TypeScript", "Vite", "React Flow", "tscircuit", "SQLite"],
    systemDiagram: null,
    evidence: [
      pendingEvidence(evidenceIds.hardwareWorkspace.hero, "Product hero screenshot", "screenshot"),
      pendingEvidence(evidenceIds.hardwareWorkspace.flow, "Key flow recording", "video"),
      pendingEvidence(evidenceIds.hardwareWorkspace.deviceOutput, "Real device output", "hardware"),
    ],
    media: { hero: projectMedia.aiNativeHardwareWorkspace[0], gallery: [], video: null },
    failures: [
      {
        what: "The first live agent run wrote an invalid graph patch.",
        why: "Catalog search worked, but the write step had no guard, so a malformed patch reached the canvas.",
        change: "Added a session guard that rejects invalid patches and records the rejection as a visible failure state.",
        lesson: "An agent's writes need a rejection path that shows up on screen, not a retry loop that hides the error.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype. The workspace and its scoped runtime behaviours are demonstrable; no test or capture yet proves a physical device responding to a generated design.",
    },
    lessons: [
      "Auditability is not a feature you add later. It decides what the model is allowed to do at all.",
      "A test bench with a deterministic adapter proves the plumbing, not the intelligence. Naming that difference early saved the project from its own demo.",
    ],
    next:
      "Close the loop from exported artifact to a real board, and record the device output that would make the hardware claim supported rather than aspirational.",
    links: [],
    featured: true,
  },
  {
    slug: "bci-dexterous-hand",
    index: "03",
    title: "BCI × Dexterous Hand — Intent to Physical Action",
    shortTitle: "BCI × Dexterous Hand",
    status: "partial",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Robotics / BCI / Physical AI",
    oneLine:
      "A commissioning prototype connecting EEG attention signals to a single dexterous-hand position move and release; not a trained intent decoder or tactile grasp.",
    problem: [
      "Consumer EEG gives a noisy, low-bandwidth signal, and an attention score is not an intention. The gap between the two is where most BCI demos quietly cheat.",
      "A dexterous hand looks like the easy end of the problem and is the hard one: without tactile feedback there is no closed loop, only an open-loop pose.",
      "Between headset and hand sit three transports — Bluetooth RFCOMM, a Python runtime, a vendor SDK — and any of them can fail without saying so.",
    ],
    insight: "Prove one signal-to-motion event end to end, with timestamps and a state trace, before claiming any decoding.",
    solution: [
      "Bridge Mind Link over Bluetooth RFCOMM into a Python runtime that timestamps every packet and records whether fake data was used.",
      "Gate a command on signal quality and a dwell window, so a single command is an explicit commissioning event rather than a stream of guesses.",
      "Send a position-only move to the LinkerHand O6 and watch the reported state until the target pose is reached.",
      "Log hardware observations throughout, so the delay between intent, command and observed motion can be measured instead of estimated.",
      "Test the tactile path as its own gate and record its failure, rather than assuming the hand can feel.",
    ],
    build: [
      "Calibration capture, 60 seconds, two REST / FOCUS cycles, fake data disabled: 31,685 valid packets, zero invalid packets, 31,623 raw samples at roughly 514 Hz, and 24,704 labelled frames.",
      "One commissioning run, 51.95 seconds: a GRASP intent at attention 61, position command emitted 201 ms after the control event, target pose observed 1,977 ms after emission, release recorded 1,759 ms later, across 36 hardware observations.",
      "The run completed the trace READY → CLOSING → POSE_REACHED → HOLD → RELEASING → RELEASED. The command is labelled POSITION_MOVE_ONLY_NOT_GRIP, and the algorithm is a commissioning dwell gate, not a trained decoder.",
      "The tactile gate failed by design: the installed hand has no tactile configuration and 1,101 sampled frames stayed at zero. The long-run daemon reached 1,022,354 valid packets before the port disappeared and it logged 95 reconnect attempts.",
    ],
    myRole:
      "Solo build: BCI runtime, Bluetooth bridge, web control surface, and the commissioning logs the timings above come from.",
    stack: ["Python", ".NET RFCOMM", "TypeScript", "LinkerHand SDK"],
    systemDiagram: null,
    evidence: [
      pendingEvidence(evidenceIds.bciDexterousHand.experiment, "Experiment scene photo", "hardware"),
      pendingEvidence(evidenceIds.bciDexterousHand.controlTest, "Control test video", "test"),
    ],
    media: { hero: projectMedia.bciDexterousHand[0], gallery: [], video: null },
    failures: [
      {
        what: "The hand cannot feel, and the grasp test assumed it could.",
        why: "The installed O6 has no tactile configuration. A thousand sampled frames stayed at zero while the software kept reporting a closed command.",
        change: "Tactile contact is now a separate gate that must pass before any grasp claim is made, and the failing gate stays published.",
        lesson: "A missing sensor does not fail loudly. It returns zeros, which look exactly like data.",
      },
      {
        what: "A long streaming run ended with the port vanishing.",
        why: "After more than a million valid packets the Bluetooth link dropped and the daemon spent 95 attempts reconnecting.",
        change: "Sessions are now scored on continuity, not volume, and reconnects are counted as part of the result.",
        lesson: "Runtime on paper and runtime for an hour are different projects.",
      },
    ],
    result: {
      state: "partial",
      summary:
        "Partial. One real signal-to-position-move-and-release event is documented with measured timings; semantic decoding, tactile grasp and adaptive control remain unproven.",
    },
    lessons: [
      "The hard part was never the hand. It was proving that the number on screen came from a person's head.",
      "Keeping the failed gates in the record made the successful one mean something.",
    ],
    next:
      "Record a continuous input-to-motion video with the sensor and the hand in frame, then replace the dwell gate with a decoder evaluated on held-out data.",
    links: [],
    featured: true,
  },
  {
    slug: "capsule-surface-inspection",
    index: "04",
    title: "Capsule Surface Inspection",
    shortTitle: "Capsule Inspection",
    status: "prototype",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Computer Vision / Edge Hardware",
    oneLine:
      "A capsule surface inspection demo combining AI vision, embedded hardware, and an operator-facing review interface, documented at a public hackathon showcase.",
    problem: [
      "Capsule surface defects are small, low-contrast and easy to miss. Manual inspection is slow and drifts between operators and between hours.",
      "A vision model that scores 95% on a laptop does not survive a showcase table: the lamp changes, the camera distance changes, and a part keeps moving.",
      "An operator needs to see why a part was rejected. A single pass/fail light teaches nobody anything.",
    ],
    insight:
      "Treat the camera rig and the review surface as part of the same system as the model, and put the evidence in front of the person making the call.",
    solution: [
      "Fix the camera and the lighting over the inspection bench so each capture is comparable to the last.",
      "Run defect detection on the captured frame and keep the frame alongside the decision.",
      "Show the decision and its image in an operator-facing review interface instead of a terminal log.",
      "Put the rig, the screen and the explanation on one table so the demo can be inspected by anyone who walks up.",
    ],
    build: [
      "A bench setup: camera over the inspection area, embedded control board beside it, and a screen running the live interface.",
      "The interface shows the capsule image with the inspection result, plus a separate summary panel for the demonstration table.",
      "The whole system was presented publicly at a hackathon showcase, which is where the documentation photographs come from.",
    ],
    myRole: "Built the inspection bench, the detection pipeline, and the operator review interface for the hackathon entry.",
    stack: ["Computer vision", "Embedded control", "Operator interface"],
    systemDiagram: null,
    evidence: [],
    media: { hero: projectMedia.capsuleSurfaceInspection[0], gallery: projectMedia.capsuleSurfaceInspection.slice(1), video: null },
    failures: [
      {
        what: "The demo worked better than the documentation.",
        why: "The rig and interface were ready for a public table before anyone had recorded what the model actually got right and wrong.",
        change:
          "Results are now described only as what the photographs show: a working bench and a review interface, with no accuracy claim attached.",
        lesson: "A showcase proves the system runs. It never proves the system works.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype. The bench and review interface were demonstrated publicly; accuracy figures, the dataset's rights and the path from detection to a physical sort gate are not yet documented.",
    },
    lessons: [
      "Inspection is a lighting problem before it is a model problem.",
      "The person standing at the bench needs a reason, not a score.",
    ],
    next: "Publish a small labelled sample and a reject-rate curve, then close the loop from a rejected frame to a physical gate that moves.",
    links: [{ label: "GitHub repository", href: "https://github.com/147qaz258-ead/capsule-defect-detection" }],
    featured: false,
  },
  {
    slug: "cozmio",
    index: "05",
    title: "Cozmio — Agent Workspace",
    shortTitle: "Cozmio",
    status: "prototype",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Software / AI Agents",
    oneLine:
      "An agent workspace prototype bringing assistants, project tasks, and activity history into one working surface, documented through product interface captures.",
    problem: [
      "Agent work leaks. A session lives in a tab, the task lives in someone's head, and the evidence that anything ran lives in scrollback nobody reads.",
      "Once more than one agent is involved, the question stops being 'what can it do' and becomes 'who is doing what, and did it actually happen'.",
      "Most agent UIs optimise for the chat turn. Real work is a task with a state, an owner, a history and an outcome.",
    ],
    insight:
      "Give agents a workplace instead of a chat box: an agent roster, a task board, and a run record that outlives the conversation.",
    solution: [
      "Start from a market of specialists, so a task is routed to an agent chosen for it rather than defaulted to a general assistant.",
      "Keep the task as the unit of work — assigned, in progress, blocked, done — visible in one board.",
      "Attach the run record to the task: what was executed, what came back, and what the agent claims it did.",
      "Show the team view, so multi-agent work reads as a set of responsibilities rather than one long transcript.",
    ],
    build: [
      "A specialist market view for discovering and selecting agents, with each entry carrying what it is for.",
      "An agent workspace that holds the running task, the message and task streams, and the execution evidence for the current run.",
      "A team surface that lays out which agent owns which part, so the division of work is visible without reading a log.",
      "Session and task history are kept as first-class records, which is what makes an agent's claim checkable after the fact.",
    ],
    myRole: "Solo build: product structure, workspace interface, agent routing and the run-record model behind the screens.",
    stack: ["Local-first agent runtime", "Desktop workspace UI", "Task and session store"],
    systemDiagram: null,
    evidence: [],
    media: { hero: projectMedia.cozmio[0], gallery: projectMedia.cozmio.slice(1), video: null },
    failures: [
      {
        what: "The first workspace was a chat window with extra panels.",
        why: "Task state lived inside the conversation, so closing a session erased the work with it.",
        change: "Tasks became durable records with their own state, and the chat turned into a view onto them.",
        lesson: "If closing a tab can destroy the work, the product is a conversation, not a workspace.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype, documented through product interface captures. The workspace structure and the task/run record model exist; user testing and cross-session autonomy are still open.",
    },
    lessons: [
      "Visibility is the feature. An agent that cannot show its work cannot be trusted with real work.",
      "The unit of design is the task, not the message.",
    ],
    next:
      "Run the workspace against a week of real tasks and measure how often a run record lets someone reconstruct what happened without asking the agent.",
    links: [
      { label: "Cozmio repository", href: "https://github.com/147qaz258-ead/cozmio" },
      { label: "Cozmio web repository", href: "https://github.com/147qaz258-ead/cozmio-web" },
    ],
    featured: false,
  },
  {
    slug: "turbo-editor",
    index: "06",
    title: "Turbo Editor — HarmonyOS",
    shortTitle: "Turbo Editor",
    status: "prototype",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Software / HarmonyOS",
    oneLine:
      "A HarmonyOS code-editor project documented through mobile screens for coding, file organization, developer tools, and a compact activity dashboard.",
    problem: [
      "Editing code on a phone usually means a text box with a monospace font. Files, history, and any sense of where you are in a project all disappear.",
      "HarmonyOS NEXT has its own runtime, its own layout model, and very little prior art for developer tooling.",
      "A mobile editor has to survive interruptions: the app is backgrounded, the file is still open, and nothing may be lost.",
    ],
    insight:
      "Build a project view first and a text view second — the file tree, the open document and the tooling state should be one surface, not three screens.",
    solution: [
      "Keep a persistent project list as the entry point, so opening the app means returning to work rather than starting from zero.",
      "Give the editor a language-aware surface: line handling, syntax colouring, and indentation that behaves like an editor rather than a text field.",
      "Bundle the small utilities a developer reaches for — file organisation, encoding, and quick inspection — as first-class screens.",
      "Add a compact activity view so the work done in the app is legible at a glance instead of buried in a settings page.",
    ],
    build: [
      "An ArkTS application built against HarmonyOS NEXT, with ArkUI layout throughout and a light, high-contrast editor surface.",
      "The first screen is the project list; opening a file moves into an editor view that keeps the file context visible.",
      "File management, note handling and developer utilities are separate destinations rather than nested menus.",
      "The activity dashboard starts at zero on a fresh install — the screens show the empty state honestly rather than with sample data.",
    ],
    myRole: "Solo build: information architecture, ArkUI implementation, editor surface, and the file and utility screens.",
    stack: ["ArkTS", "HarmonyOS NEXT", "ArkUI"],
    systemDiagram: null,
    evidence: [],
    media: { hero: projectMedia.turboEditor[0], gallery: projectMedia.turboEditor.slice(1), video: null },
    failures: [
      {
        what: "Treated the mobile editor as a small desktop editor.",
        why: "The first layout carried desktop assumptions — toolbars, panels, and a file tree that assumed a mouse — onto a six-inch screen.",
        change:
          "The layout was rebuilt around one primary task per screen, with navigation doing the work the desktop layout did with panel space.",
        lesson: "Porting a layout is not porting an editor. The interaction model has to be rebuilt.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype. The editor, project list, file utilities and activity view are implemented and documented through interface captures; release status and device coverage are not part of this record.",
    },
    lessons: [
      "On a phone, every control you keep costs a line of code the user cannot see.",
      "Empty states are product decisions, not placeholders.",
    ],
    next: "Measure the interruption case properly: kill the app mid-edit, reopen it, and check that nothing entered has to be retyped.",
    links: [{ label: "GitHub repository", href: "https://github.com/147qaz258-ead/turbo-editor" }],
    featured: false,
  },
  {
    slug: "youyuan-jingmeng",
    index: "07",
    title: "Youyuan Jingmeng — Interactive Game Study",
    shortTitle: "Youyuan Jingmeng",
    status: "prototype",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Game / Interactive Media",
    oneLine:
      "An interactive game study documented through in-browser captures and Blender scene work, showing both the playable experience and its visual construction.",
    problem: [
      "A classical Chinese garden is a composition of sightlines: what you see, what is hidden, what appears when you turn a corner. A flat game scene loses all of it.",
      "Building the scene and building the game are usually two different tools, so the atmosphere gets lost in the transfer.",
      "An interactive narrative has to be playable before it can be judged. A beautiful render is not evidence that the thing is worth walking through.",
    ],
    insight:
      "Build the space as architecture with a camera path in mind, then let the playable build prove whether the sightlines actually work.",
    solution: [
      "Model the garden as a set of connected spaces rather than one hero shot, so movement is the point.",
      "Block the level in Blender, checking framing from the player's eye height instead of from a render camera.",
      "Move the scene into a browser-playable build early, while the layout can still be changed cheaply.",
      "Keep the construction captures next to the playable ones, so the work behind the atmosphere stays visible.",
    ],
    build: [
      "Scene and level construction in Blender: geometry blocking, materials and lighting tested from inside the space.",
      "A browser-playable build that carries the same space, so the composition can be walked rather than viewed.",
      "Captures were taken from both sides of the process — the editor and the running game — because neither alone describes the project.",
      "Third-party assets and the engine's licence terms are not documented here and are not claimed as original work.",
    ],
    myRole: "Scene construction, level blocking and playable build: the environment and its interactive form.",
    stack: ["Blender", "Browser-playable build"],
    systemDiagram: null,
    evidence: [],
    media: { hero: projectMedia.youyuanJingmeng[0], gallery: projectMedia.youyuanJingmeng.slice(1), video: null },
    failures: [
      {
        what: "Designed the garden from outside the player's view.",
        why: "The first pass was composed as a set of renders, so the space read well in stills and felt wrong to walk through.",
        change: "Framing was re-checked at eye height while moving, and the layout changed where the sightlines broke.",
        lesson: "A scene has two audiences: the camera and the person holding the controls. Only one of them can turn around.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype. The space is constructed in Blender and playable in a browser build, documented through captures of both; the named collaboration, engine and asset licences are outside this record.",
    },
    lessons: ["Atmosphere is a sequence, not a frame.", "The cheapest time to fix a room is before the player can walk into it."],
    next: "Give the walk a reason: one interaction that only works because of the way the garden is laid out.",
    links: [],
    featured: false,
  },
  {
    slug: "emotional-habitat",
    index: "08",
    title: "Emotional Habitat — Conversational Companion",
    shortTitle: "Emotional Habitat",
    status: "prototype",
    publicationStatus: "published",
    year: null,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "AI / Conversational Experience",
    oneLine:
      "A conversational companion concept presented through a mobile cat-chat interface and a project display from the Douyin AI Innovation Plan.",
    problem: [
      "Companion apps usually fail in the same place: the character answers, but does not remember, so every conversation starts from nothing.",
      "A chat that looks warm in a demo can still feel hollow in a second session, when the character has forgotten the first.",
      "Emotional products are also presentation products. If a visitor at a booth cannot tell what the thing is in ten seconds, the work stops existing.",
    ],
    insight:
      "Treat memory and tone as the product, and treat the booth as the second interface — the same idea has to read on a phone and on a display board.",
    solution: [
      "Give the character a persistent context: what has been said before, what mood the user is in, what it should refuse to forget.",
      "Keep the interaction surface narrow — one conversation, one character — so the tone carries the product instead of a feature list.",
      "Design the exhibit alongside the app, with the project name and the premise legible at standing distance.",
      "Show the app running on a real device at the showcase, so the interface is inspectable rather than illustrated.",
    ],
    build: [
      "A mobile chat interface built around a single animal character, with the conversation as the only content type.",
      "The generated character imagery is illustration, not evidence of interaction with a real animal.",
      "A booth presentation for the Douyin AI Innovation Plan, with an exhibit board carrying the project name 'Emotional Habitat' and its premise.",
      "The capture from the showcase includes the phone's recording status bar, which is left visible rather than cropped away.",
    ],
    myRole: "Concept, conversation design and the exhibit presentation: the character premise and the interface built around it.",
    stack: ["Mobile chat interface", "Character dialogue system"],
    systemDiagram: null,
    evidence: [],
    media: { hero: projectMedia.emotionalHabitat[0], gallery: projectMedia.emotionalHabitat.slice(1), video: null },
    failures: [
      {
        what: "The first version answered well and remembered nothing.",
        why: "Each session loaded a personality prompt and no history, so the character greeted a returning user as a stranger.",
        change: "Context moved in front of the prompt: the character reads what happened before it decides how to sound.",
        lesson: "For a companion product, memory is the feature. Tone is only the surface of it.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype, shown publicly at the Douyin AI Innovation Plan. The interface and exhibit are documented; retention, evaluation and any real-world interaction claim are not.",
    },
    lessons: ["Warmth is not a prompt. It is continuity.", "A booth forces the product to explain itself in one glance, which is a useful test for the app too."],
    next: "Run a two-week return test: does a second session feel like the same character, and can the user tell what it remembered?",
    links: [],
    featured: false,
  },
  {
    slug: "tripo-cgi-film",
    index: "09",
    title: "Robot Character Film — Tripo Challenge",
    shortTitle: "Tripo CGI Film",
    status: "prototype",
    publicationStatus: "published",
    year: 2026,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "CGI / Animation",
    oneLine:
      "A short robot-character CGI film documented through its Blender rig, animation setup, and final rendered sequence as a digital-media experiment.",
    problem: [
      "A character animation test needs a rig that can be driven, not a model that can be posed once.",
      "A short film is a deadline problem before it is a quality problem: rigging, blocking, rendering and sound all compete for the same thirty seconds.",
      "CGI is often presented as if it were product footage. A rendered robot says nothing about a real machine.",
    ],
    insight:
      "Treat the rig and the shot as one pipeline — the controls built for the character decide what the thirty seconds can actually show.",
    solution: [
      "Build the character controls in Blender first: the parts that must move, the parts that must stay rigid, and the poses the shot depends on.",
      "Block the sequence against the runtime before rendering anything, so timing is decided before cost.",
      "Render the final sequence and keep the workspace capture beside it, so the rig is documented along with the result.",
      "Label the output as CGI everywhere it appears. A rendered character is not hardware evidence.",
    ],
    build: [
      "A Blender workspace with the character rig, its animation controls and the scene layout for the shot.",
      "A thirty-second rendered sequence, 1920 × 1080, following a stylized robot character through a short action beat.",
      "The delivered video is the silent web derivative of the original render; the original file is kept separately.",
      "Both the workspace and the finished film are shown, because the interesting part is the distance between them.",
    ],
    myRole: "Character setup, animation and rendering: the rig, the shot and the final sequence.",
    stack: ["Blender", "Character rigging", "CGI rendering"],
    systemDiagram: null,
    evidence: [],
    media: { hero: projectMedia.tripoCgiFilm[0], gallery: projectMedia.tripoCgiFilm.slice(1), video: null },
    failures: [
      {
        what: "Rigged for a still, not for a shot.",
        why: "The first control set could hold a pose but could not carry a movement, so the animation pass had to be animated around the rig instead of with it.",
        change: "Controls were rebuilt around the motion the shot needed, and the sequence was blocked before the rig was finalised.",
        lesson: "A rig is a tool for motion. Test it by moving it, not by posing it.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype. The rig and a thirty-second rendered sequence exist and are shown together; model provenance, music and asset licences are not documented here.",
    },
    lessons: ["Thirty seconds exposes every shortcut in a rig.", "Keeping the workspace next to the render is the honest version of a making-of."],
    next: "Rebuild one shot with a rig designed for that shot alone, and compare how much of the animation survives without correction.",
    links: [],
    featured: false,
  },
  {
    slug: "touchsight-tactile-vision",
    index: "10",
    title: "TouchSight — Tactile Vision",
    shortTitle: "TouchSight",
    status: "prototype",
    publicationStatus: "published",
    year: 2026,
    dateRange: null,
    teamSize: null,
    contributors: [],
    category: "Tactile Vision / Robotics",
    oneLine:
      "A tactile-vision project pairing a physical tactile-display bench prototype with the TouchSight concept direction for image-to-touch interaction prototyping.",
    problem: [
      "Cameras can see what a robot touches, but they cannot tell it what the surface feels like. Grip decisions are made blind.",
      "Tactile hardware is expensive and bespoke. Most robotic arms run without it, so contact stays an assumption.",
      "Image-to-touch is an unsolved mapping: a picture has to become pressure, position and timing on a physical array.",
    ],
    insight:
      "Start from a bench-scale tactile display that can be driven and observed, then treat the image-to-touch mapping as the actual research question.",
    solution: [
      "Build the tactile display as a bench apparatus where the sensing surface and the driving electronics can be inspected separately.",
      "Pair the display with an articulated arm, so the contact event has a physical source rather than a simulated one.",
      "Define the mapping problem explicitly: which part of an image becomes which pattern on the surface, at what scale and what rate.",
      "Separate the physical prototype from the concept direction, and label the generated concept imagery as concept at every appearance.",
    ],
    build: [
      "A workshop bench apparatus with the tactile display and an articulated arm positioned for contact tests.",
      "The physical apparatus is the documented prototype; resolution, actuation method and drive electronics are not described in this record.",
      "A TouchSight concept board presents the product direction as a generated visualisation. It is direction, not a photograph of a finished device, and it carries that label wherever it appears.",
      "The project currently sits between a bench prototype and a concept: the hardware exists, the image-to-touch pipeline does not yet.",
    ],
    myRole: "Bench apparatus and concept direction: the physical prototype and the interface concept for image-to-touch interaction.",
    stack: ["Tactile display hardware", "Robotic arm", "Concept interface"],
    systemDiagram: null,
    evidence: [],
    media: { hero: projectMedia.touchSight[0], gallery: projectMedia.touchSight.slice(1), video: null },
    failures: [
      {
        what: "The concept board arrived before the prototype could match it.",
        why: "The generated visualisation reads as a product, while the bench apparatus is still a set of parts on a table.",
        change: "The board is now published as concept media only, and the physical bench is shown first.",
        lesson: "A rendering of a product is the easiest image to make and the most misleading one to show.",
      },
    ],
    result: {
      state: "prototype",
      summary:
        "Prototype. A bench-scale tactile display and arm are documented physically; the image-to-touch pipeline, resolution and any closed-loop grasp result are not.",
    },
    lessons: ["Touch is a timing problem as much as a spatial one.", "Keeping concept imagery labelled is cheaper than explaining it later."],
    next: "Drive one channel from a camera frame and record the resulting surface pattern, so the mapping has a first measurable point.",
    links: [{ label: "Insta360 hackathon repository", href: "https://github.com/147qaz258-ead/insta360-hackathon" }],
    featured: false,
  },
];
