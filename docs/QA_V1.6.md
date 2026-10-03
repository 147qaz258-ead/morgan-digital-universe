# QA V1.6 — Scroll-Scrub 视频舞台

> 日期：2026-09-29。本报告只验证用户本轮指出的视频交互偏差修正，不替代 V1.5 全站 Gate 或 C0–C10 生产验收。

## 1. 使用位置

| 首页总进度 | 素材 | 行为 |
|---|---|---|
| 0–24% | `home-lab-idle-video-scrub-01.mp4` | Entry / Identity 实验室全景，滚动控制 0–8s |
| 24–42% | `home-to-physical-link-video-scrub-01.mp4` | PhysicalLink 镜头推进，滚动控制 0–5s |
| 42–53% | AI Workspace concept still | 无对应视频，只执行轻微镜头位移 |
| 53–64% | BCI Hand concept still | 无对应视频，只执行轻微镜头位移 |
| 64–82% | `vision-signal-chain-video-scrub-01.mp4` | Signal / PCB / Hand，滚动控制 0–6s |
| 82–100% | Signal 最终帧 | 移除章节 UI，过渡至自然 Now 区域 |

所有视频均为 `generated-atmosphere / not evidence`。原播放版继续供 PhysicalLink 详情和 Vision 页面使用。

## 2. 行为验证

- Desktop 固定舞台高度 `640svh`，页面滚动时媒体层保持视口固定。
- 8% 总进度：Home 视频约 2.65s。
- 31% 总进度：PhysicalLink 视频约 1.95s；停止 800ms 后时间差为 0。
- 从 31% 反向滚动到 26%：PhysicalLink 视频回到约 0.57s。
- 70% 总进度：Signal / Origin 视频约 2.0s。
- 三段视频均保持 `paused=true`，没有自动播放与滚动控制争用。
- 前进、停帧、反向与 scene crossfade 全部无控制台错误。

## 3. 编码与资源

- 三个派生文件为 H.264、无音轨、faststart、GOP 6。
- 文件大小分别为 4,008,829、2,873,112、3,230,015 bytes。
- 原始网页视频和用户根目录源文件均未覆盖。
- `src/content/atmosphere.ts` 单独记录 `scrubSrc`；内容审计检查派生文件存在。

## 4. 降级与 Gate

- 390×844：MP4 / GLB / Three.js 请求为 0，video 元素为 0。
- 768×1024：MP4 / GLB / Three.js 请求为 0，video 元素为 0。
- Desktop reduced motion：MP4 / GLB / Three.js 请求为 0，video 元素为 0。
- 三种降级均保持一个可见 H1 与自然纵向项目入口。
- `pnpm check:build`：通过；内容审计仍为 3 projects、0 verified、8 pending。
