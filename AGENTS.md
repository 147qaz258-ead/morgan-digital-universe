<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MORGAN DIGITAL UNIVERSE — Agent Rules

唯一执行计划：`MORGAN_Digital_Universe_Agent_Execution_Master_Plan_V1.0.md`。
锁定决策摘要：`docs/DECISIONS_LOCKED.md`。任务状态：`docs/EXECUTION_STATUS.md`。
**不要**重新做产品定位、重新选技术栈、重新设计信息架构或视觉系统。

## 命令

```bash
pnpm install        # 安装
pnpm dev            # 开发（Turbopack）
pnpm build          # 生产构建
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit
pnpm check:content  # Evidence / content / metadata / asset constraints
pnpm check:lint     # ESLint + content constraints
pnpm check          # Phase Gate：check:lint + typecheck
pnpm check:build    # Phase Gate：check + build
```

## 目录结构

```text
src/
  app/                  # 路由（App Router）
  components/
    layout/             # Nav / Footer / PageContainer 等
    ui/                 # Button / StatusPill / MediaFrame / Typography 等
    motion/             # 动画封装（GSAP / Framer Motion）
    three/              # R3F 场景
    project/            # 项目卡片 / 详情区块
  content/              # 唯一内容数据源（profile/origin/projects/capabilities/lab/vision/site）
  lib/                  # 工具函数
  styles/               # tokens.css（design tokens），由 globals.css 引入
public/
  images/ video/ models/ posters/
docs/                   # 执行状态与资产清单
```

## 硬性规则

- 动态路由 `params` / `searchParams` 是 Promise，必须 `await`（Next 16）。
- 内容一律来自 `src/content/`，页面内不硬编码长文案；缺失字段为 `null`，不虚构。
- 视觉禁区、色彩、字号、动画时长见 `docs/DECISIONS_LOCKED.md`，组件内禁止散落随机 hex。
- 图标仅 Lucide React；字体仅 Geist Sans / Geist Mono。
- GSAP ScrollTrigger 只用于计划列出的四类场景；Framer Motion 不与 GSAP 抢同一元素。
- 素材缺失：用 `*_PENDING` 占位 + 中性灰白占位 UI（`Evidence pending`），记录到 `docs/ASSET_GAPS.md`，继续开发不停顿。禁止用 AI 图冒充真实项目证据。
- 3D 不进首屏 blocking bundle；移动端默认 poster 替代 WebGL。
- 每个 Phase 结束跑一次 `pnpm check:build`；不要每个 task 都全量审计。
