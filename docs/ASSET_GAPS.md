# ASSET GAPS

> This is the authoritative intake inventory for missing media. Naming follows `{project}-{section}-{type}-{index}.{ext}`. Generated atmosphere and conceptual 3D can never satisfy a `USER_EVIDENCE` row.

Status: `PENDING` / `PROVIDED` / `VERIFIED`. A real Evidence asset reaches VERIFIED only after file, caption, capture date, provenance, publication permission, redaction and claim mapping have all been checked.

## 当前视觉资源状态（2026-11-07）

- 本轮完整项目墙已覆盖当前内容源中的全部10个项目。9项有真实项目图片，PhysicalLink沿用明确标识的概念图；不以生成图补做真实Evidence。
- 新首页主视觉由agent自行在Blender制作：Signal Engine透明WebP与交互GLB已交付，源文件留在本地；来源与运行方式见 `docs/3D_ASSET_MANIFEST.md`。
- 原视频文件保留，本轮首页无需等待用户重新生成视频；新3D与原视频都不作为实物运行证据。
- portrait、真实连续测试视频和未确认的项目事实仍按原缺口处理，本轮视觉设计不会改变它们的证据状态。
- 下方2026-10基线是历史快照，不能用其“零公开用户素材”等数字描述当前项目墙。

## Production resource snapshot — baseline 2026-10-08, media intake updated 2026-10-22

Most page structures are implemented, but the full `/experiments` project directory and portfolio content layer are not complete. The current repository contains **20 public media files**: 17 generated-atmosphere assets/derivatives and 3 V01 self-authored 3D assets/posters. It contains **zero public USER_EVIDENCE files**.

| Resource layer | Ready now | Located but blocked | Still needs capture / creation |
|---|---:|---:|---:|
| Generated atmosphere images, posters and videos | 17 | 0 | 0 required for V1 page completion |
| Development 3D / poster assets | 3 | 0 | Formal Blender V02 source, optimized GLB and final renders |
| Stable public Evidence anchors | 0 verified | 8 pending anchors plus 34 newly inventoried local media files | Attribution, publication permission, redaction and claim mapping for each selected candidate |
| Featured projects | 3 page shells | 3 normalized fact packages | User confirmation, roles, dates, permissions and final copy |
| Real project hero media | 0 published | BCI setup photo and multiple project UI / device stills now located locally | Select, attribute, redact and approve source candidates; PhysicalLink prototype still has no confirmed implementation media |
| Real project videos | 0 | None accepted | PhysicalLink demo, AI Workspace end-to-end flow, BCI uncut input-to-motion take |
| System diagrams | 0 | 2 proposed structures | 3 diagrams after facts are confirmed |
| Lab records | 0 | Logs and failure records exist locally | Curated dates, captions, claims and publication approval |
| Project archive | 0 published | 30 public GitHub repositories, local project candidates, and 7 newly named image groups plus 3 unassigned root images | Map every distinct project across code and media sources, confirm attribution and publication scope, then create an entry for each; no project-count cap |
| Profile / contact | Brand copy only | One local background/achievement fact-sheet candidate | Portrait, work close-up, location, email and approved GitHub link |

### Page-by-page content gap matrix

| Output | What already works | What is visibly missing |
|---|---|---|
| Home | Scroll-scrub atmosphere, three flagship entries, Origin and Focus structure | Real project stills, verified Evidence mosaic, confirmed contact and optional real workbench detail |
| Origin | Four-stage structure and generated atmosphere | Confirmed dates, real early-work / hardware close-up, linked verified proof |
| Experiments | Three flagship entries and archive structure | Complete index of all personal projects, with a compact status/evidence row for every confirmed project; project detail and media can remain pending until verified |
| PhysicalLink | Research title, state and compact publication-pending behavior | Concrete implementation, real prototype, PCB/interfaces, build/failure photos, demo video and confirmed role/date |
| AI-Native Hardware Workspace | Page shell plus locally located UI/test/failure candidates | Approved screen set, live-flow recording, real device output, final system diagram and public source/demo link |
| BCI × Dexterous Hand | Page shell plus locally located logs and disconnected/failure UI states | One real setup hero, hand/device details, uncut input-to-motion video, approved charts and final system diagram |
| Capabilities | Proof-matrix behavior | Verified project evidence; current links intentionally remain pending |
| Lab | Correct empty-state behavior | At least 4–6 approved records across failure, prototype, equipment and note categories |
| Vision | Atmosphere image/video and three-stage direction | No mandatory asset blocker; future real proof can replace atmosphere selectively |
| About | Four short fact groups and portrait slot | Portrait, approved identity facts, location, email, GitHub/social links |
| 404 / robots / sitemap | Implemented | Final reachable domain and online verification only |

Portfolio QA screenshots are not the same as project Evidence. Route screenshots can be regenerated automatically for release QA and do not need to be supplied by the user. “Page screenshots” in the project rows below mean captures of the actual project applications, tests or device interfaces.

## Local and GitHub project discovery

### Current flagship sources

| Project | Source state | Useful material already located | Material that still cannot be substituted |
|---|---|---|---|
| PhysicalLink | Local product-definition document; no implementation repository | V0.1 research scope and non-claim boundary | A document cannot substitute for a prototype, PCB, interfaces, build process or working demo |
| AI-Native Hardware Workspace | Local Git repository, no configured public remote | Workbench UI, model selector, failure capture, scoped runtime report and historical test report | Real device output and a continuous live-provider-to-device run |
| BCI × Dexterous Hand | Local working directory, no project-level Git history | Real calibration/control/failure logs, control UI, SDK observation records and vendor documentation | A real experiment photo and an uncut take showing the input process and hand together |

### Public GitHub portfolio candidates

The public profile exposed 30 repositories during the 2026-10-08 audit. The site is intended to be a complete personal project archive, so every distinct Morgan project found in GitHub and local sources must be represented; there is no 2–4 project selection cap. Repository count and project count are not automatically identical: related repositories should be grouped under one project where appropriate, while tools, forks, references and release mirrors should be identified accurately. Public visibility proves that source code is reachable; it does not prove Morgan's role, team ownership, production use or permission to republish local media.

| Repository / local source | Candidate use | Existing source value | Missing before website publication |
|---|---|---|---|
| [`insta360-hackathon`](https://github.com/147qaz258-ead/insta360-hackathon) / local `影石黑客松` | Project archive entry; publication details pending | Public code, tactile-vision UI, extensive STEP/STL/CAD packages and a concept/promo video | Role/team confirmation, NDA/publication review, real fabricated-device photos, real demo take and accurate result boundary |
| [`physical-task-agent`](https://github.com/147qaz258-ead/physical-task-agent) / local `ai眼睛` | Project archive entry; publication details pending | Public Apache-2.0 source, four workflow modes, evaluation and safety structure | Approved product screenshots, real ESP32/sensor setup, real-model/real-hardware test and user role confirmation |
| [`h2link-sales-agent`](https://github.com/147qaz258-ead/h2link-sales-agent) / local `未来能源项目` | Project archive entry; publication details pending | Public source plus seven documented real application screenshots and an observable collection/control loop | Role/team/date confirmation, selected screenshots, demo recording, result/competition wording and data-provenance review |
| [`plc-ai-agent`](https://github.com/147qaz258-ead/plc-ai-agent) | Project archive entry; publication details pending | Public Electron/React source and TIA/SCL-oriented product scope | UI captures, real TIA integration proof, generated-code example, test/failure record and role confirmation |
| [`capsule-defect-detection`](https://github.com/147qaz258-ead/capsule-defect-detection) | Project archive entry; publication details pending | Public FastAPI/OpenCV/Raspberry Pi project source and role documentation files | Dataset/image permission, real camera/Pi/GPIO setup photo, uncut detection-to-output demo, honest metrics and team role |
| Local `tactile-display` | Project archive entry or related project component; grouping pending | Versioned SLDPRT/STEP/STL parts and writer-head/locking components | Authorship confirmation, CAD renders with captions, fabricated-part photos, assembly state and test result |

GitHub discovery groups retained for later triage:

- **Core website:** `morgan-digital-universe`.
- **Strong physical/AI candidates:** `insta360-hackathon`, `physical-task-agent`, `plc-ai-agent`, `capsule-defect-detection`.
- **Secondary product/software candidates:** `h2link-sales-agent`, `turbo-editor`, `cozmio-tutor`, `Imagine-Calendar`, `neo-flashcards`, `prompt-gallery`, `Sound-and-light`, `Vision`, `cozmio`, `cozmio-web`, `Pulseclaw`, `AEP`, `openower-windous`.
- **Meta/reference/release/unclear repositories:** `agent-engineering-skills`, `agentskill`, `ericyuan`, `erciyuan`, `leizi-meme`, `cozmio-releases`, `claw`, `Deleteclaw`, `skill`, `skill--`, `opencode-ref`, `superpowers-promptified`.

Every repository in the discovered set must receive an audit disposition and every distinct Morgan project must appear in the Experiments archive; there is no shortlist cap. A repository that is a tool, fork, reference, release mirror, or part of a larger project should be represented under its accurate category or linked project rather than mislabeled as a separate completed project. Entries with unresolved ownership or publication facts remain visible in the internal inventory as pending and are not silently dropped. Public entries should include only confirmed facts; each project should gain its truthful visual, role, date/status, URL and result/limitation as those items are confirmed.

### Located files that are not valid Evidence

- The BCI folder's 109-second merged video and its 27 component shots visibly carry a `Vidu AI 生成` mark. They are generated concept media, not a real BCI or robotic-hand demonstration.
- The inspected conference/event photographs do not show Morgan's BCI input process and the O6 hand together. They may only become optional event context after identity, third-party face and publication review.
- `physical-link-home.png` and `physical-link-agent.png` are concept UI, not a PhysicalLink device or protocol implementation.
- The tactile project's polished 90-second product video presents a concept device. It cannot prove that a fabricated device exists or works.
- Vendor manuals, SDK screenshots, reference CAD and vendor hand images prove third-party documentation only; they do not prove Morgan's implementation.
- A current portfolio route screenshot proves the website rendered. It does not prove the project claim shown on that page.

### Security and redaction exclusions

- A production private-key file is currently untracked in the local AI Hardware Workspace repository. It must never be copied, committed or exposed; rotate the credential if it is active and add a local ignore rule.
- One separate local repository has an origin URL containing an embedded access credential. Remove the credential from the remote URL and rotate it before any repository-wide publication work.
- Never copy `.env*`, private keys, API keys, browser profiles, databases or raw credentials into the website repository.
- BCI derivatives must remove Bluetooth/device identifiers, serial numbers, local ports and absolute paths.
- Event photographs require face/privacy review. Vendor manuals and SDK media require license review.
- The local tactile project includes an NDA document. No NDA-covered material is publishable merely because adjacent code is public.
- The located profile/achievement fact-sheet is an intake source only. Identity, publication, award, employer and competition claims still require user confirmation before public use.

## Minimum capture and approval queue

The fastest credible production pass is not “make more atmosphere.” It is the following small, high-value package:

1. Approve or correct the three normalized project fact packages, including Morgan's role, team size, dates and public scope.
2. Provide one 3:4 portrait and one hands/device work close-up.
3. Select 3–5 AI Workspace UI states from the existing local captures; record one real end-to-end flow only if a real provider/device result exists.
4. Photograph the BCI/O6 setup in one wide frame and two details; record one uncut input-to-position-move/release take.
5. Decide whether PhysicalLink remains a research thesis. If it has no prototype, publish only selected redacted document excerpts and do not request fake product photography.
6. Audit all 30 discovered GitHub repositories and all located local project folders; map them to distinct personal projects, then include every confirmed project in the Experiments archive. Do not impose a project-count cap. Keep unconfirmed attribution and publication facts marked pending until resolved.
7. Confirm a public email, GitHub profile link, location wording and portrait permission.
8. After approval, derive WebP/video posters, redacted charts, captions, SVG system diagrams and final Evidence records inside the website repository.

### Newly supplied project media batch (2026-10-22)

The user supplied 34 local files under `E:\C_Projects\个人网站\项目图片` (24 PNG, 9 JPG, one 30-second 1080p MP4). The detailed per-file inventory is [PROJECT_IMAGE_INTAKE_2026-10-22.md](PROJECT_IMAGE_INTAKE_2026-10-22.md). No source was moved or copied to `public/`.

- Strong real Evidence candidates now exist for BCI × Dexterous Hand, the Puning capsule-inspection hackathon, Cozmio/WorkBuddy, a HarmonyOS mobile app, and the `游园惊梦` game. The Tripo folder contains Blender process capture plus a CGI animation; it can support a digital-art project, not physical robotics claims.
- `EVIDENCE-BCI-01` and `EVIDENCE-BCI-03` are now `PROVIDED` as local source candidates because `脑机机械臂/206364f787f27b326053c191ae76eae7.jpg` shows the signal dashboard, electronics, wiring and dexterous hand together. The image still needs project confirmation, privacy crop/redaction and permission review; a photo does not establish signal-to-motion causality.
- `ASSET-LIVE-01` is now `PROVIDED` as a local event-photo source set. This set includes bystanders and requires privacy/publication review.
- PhysicalLink has no confirmed physical prototype image in this batch. `微信图片_20261022173755_315_2.jpg` is a concept poster and cannot satisfy physical Evidence.
- Root image `微信图片_20261022173755_314_2.jpg` shows a real mechanical/interactive apparatus but its project attribution is pending. `微信图片_20261022173756_316_2.jpg` is event context, not project proof.
- `CONTACT_30S_FINAL_V4.mp4` is a 1920×1080 CGI robot-character animation with AAC audio; classify its provenance and check music/model rights before any publication.
- The new project groups raise the candidate project count, but overlap between folders, existing local repositories and GitHub must be mapped before counting distinct projects.

## Profile, Origin and Lab

| ID | Asset / package | Use | Requirement | Provenance | Owner | Status |
|---|---|---|---|---|---|---|
| ASSET-PROFILE-01 | `morgan-portrait-source-set-01` | About source selection | 3–5 natural work portraits, original files | USER_EVIDENCE | User | PENDING |
| ASSET-PROFILE-02 | `morgan-portrait-work-01.webp` | About selected portrait | 3:4 or environmental crop, ≤250KB, caption + permission | USER_EVIDENCE | Agent after user input | PENDING |
| ASSET-ORIGIN-01 | `morgan-portrait-detail-01.webp` | Origin Turning Point | 70–85mm-equivalent hands/device close-up, caption + permission | USER_EVIDENCE | User | PENDING |
| ASSET-LAB-01 | `lab-bench-source-set-01` | Lab / equipment context | 3–5 real workbench photos | USER_EVIDENCE | User | PENDING |
| ASSET-LIVE-01 | `morgan-live-work-source-set-01` | Optional Origin / About proof | 5–10 real event, competition or field-work photos if public | USER_EVIDENCE | User | PROVIDED |

## PhysicalLink

| ID | Asset / package | Use | Requirement | Provenance | Owner | Status |
|---|---|---|---|---|---|---|
| EVIDENCE-PL-01 | `physical-link-hero-photo-01.webp` | Project Hero | 45° real prototype view, ≤250KB | USER_EVIDENCE | User / Agent processing | PENDING |
| EVIDENCE-PL-02 | `physical-link-full-device-photo-01.webp` | Evidence | Full real device, neutral light | USER_EVIDENCE | User | PENDING |
| EVIDENCE-PL-03 | `physical-link-pcb-photo-01.webp` | PCB front | Front, legible, ≤250KB | USER_EVIDENCE | User | PENDING |
| EVIDENCE-PL-04 | `physical-link-pcb-photo-02.webp` | PCB back | Back, legible, ≤250KB | USER_EVIDENCE | User | PENDING |
| EVIDENCE-PL-05 | `physical-link-interface-photo-set-01` | Interfaces | 2–4 real connector/interface details | USER_EVIDENCE | User | PENDING |
| EVIDENCE-PL-06 | `physical-link-build-photo-set-01` | Build process | 3–6 wiring, assembly or debugging photos | USER_EVIDENCE | User | PENDING |
| EVIDENCE-PL-07 | `physical-link-failure-record-set-01` | Failure / limitation | 1–3 real debug photos, logs or notes | USER_EVIDENCE | User | PENDING |
| EVIDENCE-PL-08 | `physical-link-demo-video-01.mp4` | Working demo | 1920×1080, 12–20s continuous real attempt, ≤5MB target | USER_EVIDENCE | User | PENDING |
| EVIDENCE-PL-09 | `physical-link-demo-poster-01.webp` | Video poster | 16:9, ≤300KB, derived from real video | USER_EVIDENCE | Agent after video | PENDING |
| EVIDENCE-PL-10 | `physical-link-demo-captions-01.vtt` | Captions if speech exists | Correct English subtitles | USER_EVIDENCE | Agent after video | PENDING |
| DIAGRAM-PL-01 | PhysicalLink system architecture | System section | Accurate SVG/DOM input → processing → interface → output | SYSTEM_DIAGRAM | Agent after confirmed facts | PENDING |
| EVIDENCE-PL-11 | PhysicalLink source/log/document link | Supporting proof | Public URL or redacted document | USER_EVIDENCE | User | PROVIDED |

## AI-Native Hardware Workspace

| ID | Asset / package | Use | Requirement | Provenance | Owner | Status |
|---|---|---|---|---|---|---|
| EVIDENCE-HW-01 | `hardware-workspace-hero-screenshot-01.webp` | Project Hero | Real product screen, ≤250KB | USER_EVIDENCE | User / Agent processing | PROVIDED |
| EVIDENCE-HW-02 | `hardware-workspace-screen-set-01` | Build / flow | 3–6 real core screens and states | USER_EVIDENCE | User | PROVIDED |
| EVIDENCE-HW-03 | `hardware-workspace-device-output-01.webp` | Real output proof | Real device response visible with context | USER_EVIDENCE | User | PENDING |
| EVIDENCE-HW-04 | `hardware-workspace-log-01.webp` | Processing proof | Redacted real log/terminal/state capture | USER_EVIDENCE | User | PROVIDED |
| EVIDENCE-HW-05 | `hardware-workspace-failure-record-set-01` | Failure / limitation | Real error, retry or limitation record | USER_EVIDENCE | User | PROVIDED |
| EVIDENCE-HW-06 | `hardware-workspace-flow-video-01.mp4` | Key flow | 1920×1080 real screen recording plus device output | USER_EVIDENCE | User | PENDING |
| EVIDENCE-HW-07 | `hardware-workspace-flow-poster-01.webp` | Video poster | 16:9, ≤300KB, derived from real recording | USER_EVIDENCE | Agent after video | PENDING |
| EVIDENCE-HW-08 | `hardware-workspace-flow-captions-01.vtt` | Captions if speech exists | Correct English subtitles | USER_EVIDENCE | Agent after video | PENDING |
| DIAGRAM-HW-01 | Workspace system architecture | System section | Accurate SVG/DOM instruction → intelligence → interface → device | SYSTEM_DIAGRAM | Agent after confirmed facts | PENDING |
| EVIDENCE-HW-09 | Workspace source/document/demo link | Supporting proof | Public URL or redacted document | USER_EVIDENCE | User | PENDING |

## BCI × Dexterous Hand

| ID | Asset / package | Use | Requirement | Provenance | Owner | Status |
|---|---|---|---|---|---|---|
| EVIDENCE-BCI-01 | `bci-hand-hero-photo-01.webp` | Project Hero | Real experiment wide shot, ≤250KB | USER_EVIDENCE | User / Agent processing | PROVIDED |
| EVIDENCE-BCI-02 | `bci-hand-signal-record-01.webp` | Input proof | Real signal/process screenshot or log | USER_EVIDENCE | User | PROVIDED |
| EVIDENCE-BCI-03 | `bci-hand-device-photo-set-01` | Hardware proof | Wide and detail images of the real hand/setup | USER_EVIDENCE | User | PROVIDED |
| EVIDENCE-BCI-04 | `bci-hand-failure-record-set-01` | Failure / latency | Real latency, failed attempt or limitation record | USER_EVIDENCE | User | PROVIDED |
| EVIDENCE-BCI-05 | `bci-hand-test-video-01.mp4` | Complete attempt | 1920×1080 wide frame showing input process and hand action | USER_EVIDENCE | User | PENDING |
| EVIDENCE-BCI-06 | `bci-hand-test-poster-01.webp` | Video poster | 16:9, ≤300KB, derived from real video | USER_EVIDENCE | Agent after video | PENDING |
| EVIDENCE-BCI-07 | `bci-hand-test-captions-01.vtt` | Captions if speech exists | Correct English subtitles | USER_EVIDENCE | Agent after video | PENDING |
| DIAGRAM-BCI-01 | BCI control architecture | System section | Accurate SVG/DOM signal → processing → mapping → control → action | SYSTEM_DIAGRAM | Agent after confirmed facts | PENDING |
| EVIDENCE-BCI-08 | BCI test document/source link | Supporting proof | Public URL or redacted document | USER_EVIDENCE | User | PROVIDED |

## 3D and generated atmosphere

| ID | Asset | Use | Requirement | Provenance | Owner | Status |
|---|---|---|---|---|---|---|
| ASSET-3D-01 | `home-lab-scene-model-01.glb` | Current homepage 3D | Self-authored procedural V01, 6.09MB | SELF_AUTHORED_3D | Agent | PROVIDED |
| ASSET-3D-02 | `home-lab-scene-blender-02.blend` | Formal source scene | Connected Blender scene with named objects/materials/camera | SELF_AUTHORED_3D | Agent | PENDING |
| ASSET-3D-03 | `home-lab-scene-model-02.glb` | Candidate final homepage 3D | Meshopt/gltfjsx, ≤8MB, ≤150k tris, ≤12 materials, ≤70 draw calls | SELF_AUTHORED_3D | Agent | PENDING |
| ASSET-3D-04 | `home-lab-poster-01.webp` | Current desktop fallback | 1440×900, 17KB | SELF_AUTHORED_3D | Agent | PROVIDED |
| ASSET-3D-05 | `home-lab-poster-02.webp` | Current mobile fallback | 780×1100, 13KB | SELF_AUTHORED_3D | Agent | PROVIDED |
| ASSET-GEN-01 | `vision-physical-ai-atmosphere-01.webp` | Vision atmosphere | 1792×768, 55KB, not Evidence | GENERATED_ATMOSPHERE | Agent | PROVIDED |
| ASSET-GEN-02 | `site-og-cover-01.webp` | Current social cover | 1200×630, 35KB | GENERATED_ATMOSPHERE | Agent | PROVIDED |
| ASSET-GEN-03 | `home-lab-idle-video-01.mp4` | Home / Experiments spatial atmosphere | 8s derivative, 1280×720, silent, 1,144,415 bytes, poster-matched | GENERATED_ATMOSPHERE | User generation / Agent processing | PROVIDED |
| ASSET-GEN-04 | `vision-signal-chain-video-01.mp4` | Vision signal-chain atmosphere | 6s derivative, 1280×548, silent, 2,054,666 bytes | GENERATED_ATMOSPHERE | User generation / Agent processing | PROVIDED |
| ASSET-GEN-05 | `physical-link-concept-atmosphere-01.webp` | Home / Experiments / PhysicalLink concept visual | 1440×960, 63,432 bytes, clearly labeled not Evidence | GENERATED_ATMOSPHERE | Agent / ImageGen | PROVIDED |
| ASSET-GEN-06 | `ai-native-hardware-workspace-concept-atmosphere-01.webp` | Home / Experiments / Workspace concept visual | 1440×960, 64,736 bytes, clearly labeled not Evidence | GENERATED_ATMOSPHERE | Agent / ImageGen | PROVIDED |
| ASSET-GEN-07 | `bci-dexterous-hand-concept-atmosphere-01.webp` | Home / Experiments / BCI concept visual | 1440×960, 67,492 bytes, clearly labeled not Evidence | GENERATED_ATMOSPHERE | Agent / ImageGen | PROVIDED |
| ASSET-GEN-08 | `origin-digital-intelligence-atmosphere-01.webp` | Origin Intelligence stage | 1440×960, 121,286 bytes, clearly labeled not Evidence | GENERATED_ATMOSPHERE | Agent / ImageGen | PROVIDED |
| ASSET-GEN-09 | `origin-hardware-robotics-atmosphere-01.webp` | Origin Physical Systems stage | 1440×960, 75,392 bytes, clearly labeled not Evidence | GENERATED_ATMOSPHERE | Agent / ImageGen | PROVIDED |
| ASSET-GEN-10 | `vision-physical-systems-atmosphere-02.webp` | Vision panoramic lead visual | 1792×768, 79,534 bytes, clearly labeled not Evidence | GENERATED_ATMOSPHERE | Agent / ImageGen | PROVIDED |
| ASSET-GEN-11 | `home-to-physical-link-video-01.mp4` | PhysicalLink concept atmosphere | 5s derivative, 1280×720, silent, 1,204,429 bytes | GENERATED_ATMOSPHERE | User generation / Agent processing | PROVIDED |
| ASSET-GEN-12 | `home-lab-video-poster-01.webp` | Home / Experiments video fallback | 1280×720, 75,760 bytes | GENERATED_ATMOSPHERE | Agent / ImageGen derivative | PROVIDED |
| ASSET-GEN-13 | `physical-link-video-poster-01.webp` | PhysicalLink video fallback | 1280×720, 68,450 bytes | GENERATED_ATMOSPHERE | Agent / ImageGen derivative | PROVIDED |
| ASSET-GEN-14 | `vision-signal-chain-video-poster-01.webp` | Vision video fallback | 1280×548, 31,846 bytes | GENERATED_ATMOSPHERE | Agent / ImageGen derivative | PROVIDED |
| ASSET-GEN-15 | `home-lab-idle-video-scrub-01.mp4` | Home Entry / Identity scroll-scrub | 8s, 1280×720, GOP 6, silent, 4,008,829 bytes | GENERATED_ATMOSPHERE | Agent derivative from user generation | PROVIDED |
| ASSET-GEN-16 | `home-to-physical-link-video-scrub-01.mp4` | Home PhysicalLink scroll-scrub | 5s, 1280×720, GOP 6, silent, 2,873,112 bytes | GENERATED_ATMOSPHERE | Agent derivative from user generation | PROVIDED |
| ASSET-GEN-17 | `vision-signal-chain-video-scrub-01.mp4` | Home Signal / Origin scroll-scrub | 6s, 1280×548, GOP 6, silent, 3,230,015 bytes | GENERATED_ATMOSPHERE | Agent derivative from user generation | PROVIDED |

## V1.8 已接入素材批次（2026-10-22）

> 用户确认 `项目图片` 内素材均真实并授权用于个人网站。以下是实现状态；旧表中“待许可/待真实性确认”的文字对本批次不再适用。没有因此补写任何未经确认的项目事实。

| 素材组 | 入站内容 | 网站衍生版本 | 使用位置 | 状态 |
|---|---|---|---|---|
| BCI × Dexterous Hand | 实验台照片 | `bci-dexterous-hand-01.webp` | 首页项目窗口、详情 Hero | 已展示 |
| Capsule Surface Inspection | 黑客松设备、界面与现场照片 | `capsule-surface-inspection-01..04.webp` | 详情 Hero 与画廊 | 已展示 |
| Cozmio | 9 张产品界面截图 | `cozmio-01..09.webp` | 详情 Hero 与画廊 | 已展示 |
| Turbo Editor / HarmonyOS | 8 张移动应用截图 | `turbo-editor-01..08.webp` | 详情 Hero 与画廊 | 已展示 |
| Youyuan Jingmeng | 5 张游戏界面与 Blender 过程截图 | `youyuan-jingmeng-01..05.webp` | 详情 Hero 与画廊 | 已展示 |
| Emotional Habitat | 应用界面与活动现场 | `emotional-habitat-01..02.webp` | 详情 Hero 与画廊 | 已展示 |
| Tripo CGI Film | Blender 过程截图 + 30 秒 CGI 成片 | `tripo-cgi-film-01.webp`、`/video/tripo-cgi-film-01.mp4` | 项目详情；明确标记 CGI | 已展示 |
| TouchSight | 工作台实物照片 + 概念海报 | `touchsight-01..02.webp` | 详情页；概念海报标记为概念 | 已展示 |
| ITEC 2026 | 活动现场屏幕 | `field-notes-01.webp` | Lab 活动记录 | 已展示 |
| AI-Native Hardware Workspace | 本地仓库工作台截图 | `ai-native-workspace-01.webp` | 首页项目窗口、详情 Hero | 已展示 |
| 生成式 Home / PhysicalLink / Vision 视频 | 3 段用户生成视频 | `/video/*-v02.mp4` 与对应 scrub 派生版及 poster | Home 滚动驱动时间轴、Vision | 已展示；全为 atmosphere |

- 共处理 `项目图片` 下 33 张静态图，原始目录不改名、不覆盖；另将 4 段源视频编码为网站派生版本。
- 全部项目图片在网页中以项目媒体显示；不再出现“Publication approval pending”视觉门槛。
- 头像、项目专属连续实拍视频、Blender V02、生产域名所有权和线上性能核验仍是独立缺口，不影响本批图像上线。

## Intake rules

- Keep original source files outside `public/` until publication permission and redaction are confirmed.
- Do not overwrite an accepted asset. Create a new version and record which version is selected.
- A generated or conceptual asset cannot close a USER_EVIDENCE row.
- Real videos must preserve meaningful latency, retries and failure states.
- Empty optional atmosphere videos do not block release because the poster fallback is the accepted completion path.

### Located-source notes (2026-09-28)

- `EVIDENCE-PL-11`: local PhysicalLink V0.1 product-definition DOCX located. It proves research scope only and is not yet a public/redacted document.
- `EVIDENCE-HW-01`: `workbench-with-module-1440.png` located as a hero candidate; final WebP derivative and permission remain pending.
- `EVIDENCE-HW-04`: scoped 31/31 agent-bench JSON and historical full Vitest JSON located. The scoped run uses a deterministic model adapter; the historical full run includes failures.
- `EVIDENCE-HW-05`: invalid graph-patch browser capture located for an honest failure entry.
- `EVIDENCE-BCI-02`: real Mind Link calibration JSONL and capture report located; public chart/redaction pending.
- `EVIDENCE-BCI-04`: one-shot timing log, tactile capability failure and reconnect failure log located.
- `EVIDENCE-BCI-08`: machine-readable one-shot report located; public/redacted derivative pending.
- `PROVIDED` means the local source file exists. None of these rows is `VERIFIED` until public permission, caption, redaction, claim mapping and user approval are complete.
