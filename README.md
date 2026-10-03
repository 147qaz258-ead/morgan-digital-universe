# MORGAN DIGITAL UNIVERSE

Cinematic engineering portfolio — AI × Robotics × Hardware × Physical AI.

> Building AI Systems That Enter the Physical World.

The V1.6 UI/UX page layer is complete locally: Home is a fixed cinematic laboratory stage whose three videos are scrubbed directly by scroll position, Experiments is an editorial exhibit index, and project pages are engineering records with sticky chapter navigation. Production completion is tracked separately because real project Evidence, publication permission, the formal Blender V02 scene, portrait/real-project video assets, a production URL and online QA are still pending.

## 运行

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## 命令

| 命令 | 作用 |
|---|---|
| `pnpm dev` | 开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm start` | 生产模式启动 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript 检查 |
| `pnpm check:content` | Evidence、内容、metadata、资源和视觉约束审计 |
| `pnpm check:lint` | ESLint + 内容约束审计 |
| `pnpm check` | check:lint + typecheck |
| `pnpm check:build` | 完整 phase gate（check + build） |

## 生产配置

- `NEXT_PUBLIC_SITE_URL`：生产必填。未配置时，站点不会声明虚假 canonical/OG URL，`robots.txt` 会禁止抓取，`sitemap.xml` 保持为空。
- `NEXT_PUBLIC_ANALYTICS_ENDPOINT`：只有在确定唯一接收端并完成事件验证后配置。
- 未发布项目不会进入 sitemap；pending 项目详情会输出 `noindex, nofollow`。
- 部署、production URL、线上分享卡和 Lighthouse 尚未完成，状态以 `docs/EXECUTION_STATUS.md` 的 C0–C10 为准。

## 内容维护

所有用户可见内容集中在 `src/content/`（见 `docs/CONTENT_SOURCE_MAP.md`）：

- `profile.ts` — 姓名、联系方式、Current Focus（缺失字段保持 `null`，不虚构）
- `projects.ts` — 项目与证据（真实文件、caption、claim、日期、所有者、公开许可和用户确认全部通过后才能 `isVerified=true`）
- `metadata.ts` — 静态路由 title / description / canonical / OG matrix
- `origin.ts` / `capabilities.ts` / `lab.ts` / `vision.ts` / `site.ts`
- `atmosphere.ts` — 生成式图片、poster 与氛围视频；全部与 Evidence 类型隔离

缺失素材清单与规格：`docs/ASSET_GAPS.md`。
媒体命名规则：`{project}-{section}-{type}-{index}.{ext}`，见 `docs/DECISIONS_LOCKED.md`。

## 关键文档

- `MORGAN_Digital_Universe_Agent_Execution_Master_Plan_V1.0.md` — 唯一执行计划
- `AGENTS.md` — Agent 规则
- `docs/EXECUTION_STATUS.md` — 脚手架历史与 C0–C10 生产收口状态
- `docs/CONTENT_AUDIT.md` — 自动内容与来源约束基线
- `docs/QA_V1.3.md` — 13 输出、本地响应式、性能和可访问性实测
- `docs/QA_V1.4.md` — 空间视觉、氛围视频、移动端网络与降级验证
- `docs/QA_V1.5.md` — 全站 UI/UX、首页时间轴、13 输出、性能与降级验证
- `docs/QA_V1.6.md` — 三段 scroll-scrub 视频、停帧、反向滚动与移动端回归
- `docs/3D_ASSET_MANIFEST.md` — 3D 资产来源与许可
- `docs/DECISIONS_LOCKED.md` — 锁定决策
