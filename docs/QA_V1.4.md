# QA V1.4 — 私人数字实验室视觉与视频接入

> 日期：2026-09-29。该报告只覆盖 V1.4 空间视觉与生成氛围视频，不替代 C0–C10 的生产验收。

## 1. 媒体处理结果

| 文件 | 规格 | 大小 | 音轨 | 用途 |
|---|---:|---:|---|---|
| `home-lab-idle-video-01.mp4` | 1280×720 / 8s | 1,144,415 bytes | 无 | Home 与 Experiments 空间底层 |
| `home-to-physical-link-video-01.mp4` | 1280×720 / 5s | 1,204,429 bytes | 无 | PhysicalLink 概念氛围 |
| `vision-signal-chain-video-01.mp4` | 1280×548 / 6s | 2,054,666 bytes | 无 | Vision 信号链氛围 |

三条文件均为 H.264、`faststart` 网页派生文件，低于 5MB。源文件保留在项目根目录，未被覆盖。三个 poster 为 31–76KB，低于 300KB。

## 2. 行为验证

- Home：poster 与核心标题先显示；Desktop、非 reduced motion 才创建背景视频。
- Experiments：复用 Home 空间；HTML 项目索引覆盖在空间上。
- PhysicalLink：生成近景只作为 atmosphere，并由组件显示 `Generated / not evidence`。
- Vision：信号链视频只作为 atmosphere；真实项目 Evidence 规则不变。
- Mobile 390×844：Chrome netlog 对 `.mp4`、三条正式视频文件名的命中数为 0。
- Reduced motion：使用静态 poster，不创建自动播放视频。
- 视频错误：poster 保持可见，标题、热点和页面链接不依赖视频。

## 3. 页面与视觉核对

已核对：

- Home：1440×900、390×844。
- Experiments：1440×900。
- PhysicalLink：1440×900。
- Vision：1440×900。

截图保存在 `artifacts/qa-spatial/`。V1.4 已去除首页独立 3D 大卡、传统七项横排官网导航和大面积深蓝 Contact/Footer Banner；首页改为空间导航，Experiments 改为空间上的档案索引。

## 4. 自动 Gate

- `pnpm check:content`：通过。
- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm build`：通过，15 个静态输出完成生成。
- Home、Experiments、PhysicalLink、Vision 开发服务器 smoke test：HTTP 200。

## 5. 未关闭的生产限制

- 三个真实项目演示视频仍未提供，不能由本轮生成氛围视频替代。
- 0 项 verified Evidence；真实照片、caption、许可和 claim 仍由 C1–C6 阻塞。
- Blender V02、生产域名、线上 analytics、部署环境 Lighthouse 和最终签字未完成。
- 当前生成视频为 720p 网页派生素材；如后续获得无水印高分辨率源，可新增版本并替换，不覆盖本版本。
