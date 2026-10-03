# Video prompts and capture briefs

Generated footage is atmosphere only. It must never be presented as project evidence.

## 实际接收与选用记录（2026-09-29）

- 用户确认三条生成视频已经足够，本轮不再要求 AI Workspace 与 BCI 的独立推进视频。
- 根目录 `生成视频.mp4` 对应 Home 实验室宽景；处理为 `public/video/home-lab-idle-video-01.mp4`，8 秒、1280×720、无音轨。
- 根目录 `生成视频 (1).mp4` 对应 PhysicalLink 概念近景；处理为 `public/video/home-to-physical-link-video-01.mp4`，5 秒、1280×720、无音轨。
- 根目录 `生成视频 (2).mp4` 对应 Vision 信号链；处理为 `public/video/vision-signal-chain-video-01.mp4`，6 秒、1280×548、无音轨。
- 源导出边缘包含生成工具标识；网页派生版使用安全裁切，页面仍明确标注 `Generated / not evidence`，不进入 Evidence。
- V1.6 首页固定舞台使用全部三条视频；Experiments 已改为纯 DOM 档案索引。AI Workspace 与 BCI 没有独立视频，首页使用静态概念图与轻微镜头位移。

## Scroll-scrub 派生与首页映射（2026-09-29）

- `home-lab-idle-video-scrub-01.mp4`：首页总进度 0–24%，控制 Entry / Identity；8 秒视频时间由滚动位置直接映射。
- `home-to-physical-link-video-scrub-01.mp4`：首页总进度 24–42%，控制 PhysicalLink 推进；5 秒视频可停帧与反向。
- `vision-signal-chain-video-scrub-01.mp4`：首页总进度 64–82%，控制 Signal / Origin；6 秒视频可停帧与反向。
- 三个派生文件采用 H.264、GOP 6、无音轨、faststart；原始网页播放版保留不覆盖。
- Desktop 且非 reduced motion 时才创建 scrub video。Mobile、tablet 与 reduced motion 继续使用 poster，不请求 MP4。

## Production rules

- Keep every generated video free of typography, labels, logos, watermarks and interface graphics.
- Website navigation, project names, status labels and hotspots are HTML overlays, not baked into footage.
- Use the page-level reference images in `artifacts/design-references/` for composition and art direction only. Preserve the geometry and materials, but remove the mockup typography from the moving plate.
- Camera motion, small indicator lights, screen luminance and restrained mechanical idle motion are allowed; geometry morphing is not.
- Generated videos are silent and contain no people.
- Desktop may load video; mobile initially uses a poster and must not request video automatically.

## Delivery priority

1. `home-lab-idle-video-01.mp4`
2. `home-to-physical-link-video-01.mp4`
3. `home-to-ai-workspace-video-01.mp4`
4. `home-to-bci-hand-video-01.mp4`
5. `vision-signal-chain-video-01.mp4`

The experiment index reuses the Home idle loop beneath its HTML archive layer. It does not require a sixth video.

## 01 — Home laboratory idle loop

- File: `home-lab-idle-video-01.mp4`
- Format: 1920×1080, 16:9, 8 seconds, 24 or 30 fps, H.264, silent seamless loop
- First-frame reference: `artifacts/video-keyframes/mdu-video-home-clean-plate-01.png`
- Layout-only reference: `artifacts/design-references/mdu-spatial-home-reference-01.png`
- Usage: Home first viewport and the persistent world below the Experiment Index

> Use the reference image only to preserve the laboratory composition, object placement, palette and material language. Produce a clean cinematic plate with all interface typography, labels and buttons removed. A bright near-future private robotics laboratory in cold off-white and brushed aluminium: a long modular engineering workbench, compact six-axis robot arm on the left, generic physical-interface prototype near the left-centre, central engineering workstation, simplified dexterous robotic hand on the right, test instruments, cables, small electronics modules and a physical archive drive. Slow controlled 3-percent dolly-in with a locked level horizon. Extremely subtle parallax and depth of field. The robot remains almost still with only a tiny calibration settle. The hand makes one barely perceptible readiness movement. Small orange status lights activate in sequence and the central display brightness breathes once. The final frame must transition seamlessly back to the first frame. Bright neutral industrial product lighting, realistic materials, calm and precise. No people, no text, no letters, no numbers, no logos, no watermark, no readable code, no new objects, no disappearing objects, no geometry deformation, no rapid motion, no handheld camera, no focus pumping, no black background, no neon cyan, no purple lighting, no smoke, no cyberpunk nightclub atmosphere.

## 02 — Enter PhysicalLink

- File: `home-to-physical-link-video-01.mp4`
- Format: 1920×1080, 16:9, 5 seconds, 24 or 30 fps, H.264, silent, non-looping
- First frame: `artifacts/video-keyframes/mdu-video-home-clean-plate-01.png`
- Last frame: `artifacts/video-keyframes/mdu-video-physical-link-end-frame-01.png`
- Usage: transition after selecting the PhysicalLink hotspot; concept atmosphere only

> Begin in the same bright private robotics laboratory and preserve the exact room, workbench, lighting and object layout from the reference images. Remove all interface typography and labels from the moving plate. Execute one smooth, mechanically precise camera move: a slow forward dolly with a slight leftward arc toward the generic physical-interface prototype on the workbench. The move starts as a wide laboratory view and ends as a close three-quarter view of the tactile surface, actuator housing, fasteners and cable routing. Keep the horizon level and the device geometry completely stable. A single restrained orange status light activates halfway through the move. Background robot arm and workstation fall into controlled soft focus without changing position. End on a steady frame suitable for an HTML project-title overlay. No product claims, no evidence framing, no people, no text, no letters, no numbers, no logos, no watermark, no new components, no shape morphing, no mechanical transformation, no aggressive zoom, no whip pan, no camera shake, no neon, no smoke, no dark cyberpunk lighting.

## 03 — Enter AI Workspace

- File: `home-to-ai-workspace-video-01.mp4`
- Format: 1920×1080, 16:9, 5 seconds, 24 or 30 fps, H.264, silent, non-looping
- First frame: `artifacts/video-keyframes/mdu-video-home-clean-plate-01.png`
- Last frame: `artifacts/video-keyframes/mdu-video-ai-workspace-end-frame-01.png`
- Usage: transition after selecting the AI Workspace hotspot; concept atmosphere only

> Preserve the same bright off-white and brushed-aluminium private robotics laboratory from the reference image. Remove every interface label and all typography. Start from the wide laboratory view and perform a slow controlled dolly toward the central engineering workstation, with a very subtle right-to-left lateral shift that creates foreground parallax across instruments and cables. The monitor shows only an abstract non-readable systems graph made of restrained deep-navy lines and one small orange signal moving through it; no source code, words, numbers or fake software UI. Nearby instruments wake with tiny status-light changes. The robot arm and dexterous hand remain still and retain their exact geometry. End with the workstation filling the central visual field and enough negative space for an HTML title overlay. Neutral bright industrial lighting, realistic optics, polished but calm. No people, no text, no letters, no numbers, no logos, no watermark, no random code, no new objects, no disappearing hardware, no geometry changes, no rapid zoom, no camera shake, no neon cyan, no purple light, no smoke, no dark room.

## 04 — Enter BCI / Hand

- File: `home-to-bci-hand-video-01.mp4`
- Format: 1920×1080, 16:9, 5 seconds, 24 or 30 fps, H.264, silent, non-looping
- First frame: `artifacts/video-keyframes/mdu-video-home-clean-plate-01.png`
- Last frame: `artifacts/video-keyframes/mdu-video-bci-hand-end-frame-01.png`
- Usage: transition after selecting the BCI / Hand hotspot; concept atmosphere only

> Preserve the exact bright laboratory world, workbench and material palette from the reference image, with all typography and interface markers removed. Begin at the wide laboratory composition. Make one smooth cinematic lateral move to the right combined with a gentle forward dolly toward the simplified dexterous robotic hand and its adjacent signal instrument. The hand remains clearly a generic concept object, not project evidence. During the move, one restrained orange signal travels across the nearby instrument and the fingers perform a single very small calibration flex, then stop. Maintain realistic joint mechanics and identical finger count throughout. Use controlled depth of field and a locked level horizon. End in a stable three-quarter close view with negative space for an HTML title overlay. No brain imagery, no headset added, no medical imagery, no people, no text, no letters, no numbers, no logos, no watermark, no extra fingers, no warped joints, no geometry morphing, no fast motion, no camera shake, no neon, no purple lighting, no smoke, no cyberpunk darkness.

## 05 — Vision signal chain

- File: `vision-signal-chain-video-01.mp4`
- Format: 2560×1080 preferred, 21:9, 6 seconds, 24 or 30 fps, H.264, silent seamless loop if supported
- Reference: `public/images/vision-physical-ai-atmosphere-01.webp`
- Usage: the wide atmosphere aperture on the Vision page

> A precise cinematic macro journey through one continuous physical-AI signal chain. Begin on an abstract deep-navy systems graph etched into a bright translucent technical surface. One restrained orange signal travels forward and the camera moves laterally with it into realistic PCB traces, then continues into a brushed-aluminium actuator joint and the articulated base of a robotic hand. The transition must be achieved through camera movement and match cuts between materially related structures, not liquid morphing. Bright neutral studio environment, cold off-white, brushed silver and deep navy materials, realistic industrial product lighting, shallow but controlled depth of field, locked calm motion. Finish on a composition that can loop visually into the opening graph. No text, no letters, no numbers, no logos, no watermark, no random code, no biological brain, no people, no added machinery, no geometry deformation, no neon cyan, no purple light, no smoke, no dark nightclub atmosphere, no rapid movement.

## Encoding handoff

Provide the highest-quality source export available. The web derivatives will be created separately:

- MP4/H.264 for broad fallback support.
- WebM/VP9 or AV1 when the production encoding pass is run.
- No audio track.
- Keep a clean first frame suitable for poster extraction.
- Do not burn in titles, captions or status labels.

## Real evidence capture — PhysicalLink

- File: `physical-link-demo-video-01.mp4`
- Record 1920×1080, 16:9, 12–20 seconds.
- Use one continuous shot that keeps the real input, device, and observable response visible.
- Do not hide latency, cuts, retries, or failure states that change the meaning of the demonstration.
- This must be recorded from the real project. Do not generate it.

## Real evidence capture — AI-Native Hardware Workspace

- File: `hardware-workspace-flow-video-01.mp4`
- Record a clean 1920×1080 screen capture showing instruction input, processing state, and the corresponding real device output.
- Remove secrets and personal information; do not recreate unavailable behaviour with generated footage.
- This must be recorded from the real project. Do not generate it.

## Real evidence capture — BCI × Dexterous Hand

- File: `bci-hand-test-video-01.mp4`
- Use a wide 16:9 frame that keeps the signal-input process and the physical hand visible together.
- Preserve one complete attempt, including observable latency or a failed attempt where relevant.
- This must be recorded from the real project. Do not generate it.
