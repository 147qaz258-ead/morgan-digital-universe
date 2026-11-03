# EXECUTION STATUS

> 状态枚举：DONE / IN_PROGRESS / BLOCKED_ASSET / TODO
> 规则：只有代码入仓 + 页面可打开 + 满足验收 + 未破坏已有页面 + 内容进入统一数据源，才能标 DONE。

> P0–P11 的 DONE 仅表示第一版脚手架/组件曾经完成，不能证明真实内容、正式资产、部署或生产交接完成。当前唯一生产收口依据是主计划第 13 节的 C0–C10。

## V1.8 Current delivery gate (2026-10-22)

> 用户已授权将本地项目素材用于个人网站展示。本地生产构建与下列 20 个公开输出均通过 smoke test；代码已推至 GitHub `master`（`a52b8fb`），但当前 Vercel 未自动触发部署且本机无 Vercel 登录凭据，线上版本仍待部署。

| Output | 页面责任 | 页面状态 | Production 状态 |
|---|---|---|---|
| `/` | 视频滚动驱动空间、项目热点、Origin、Focus、Contact | PAGE_COMPLETE | V01 3D 仍为 fallback；自有域名待购置 |
| `/origin` | 四阶段工程索引 | PAGE_COMPLETE | 年份/早期个人资料保持未知字段 |
| `/experiments` | 10 项带媒体记录 + 全部 40 个公开仓库入口 | PAGE_COMPLETE | 仓库数不等同独立项目数；继续补齐其余目录归并 |
| `/experiments/physical-link` | 概念氛围与研究档案 | PAGE_COMPLETE | 完整工程事实/实物 Evidence 未提供 |
| `/experiments/ai-native-hardware-workspace` | 实际工作台图与档案 | PAGE_COMPLETE | 设备闭环视频及完整事实可后续补充 |
| `/experiments/bci-dexterous-hand` | 实验台图与档案 | PAGE_COMPLETE | 连续真实演示视频未提供 |
| `/experiments/capsule-surface-inspection` | 黑客松设备/界面画廊 | PAGE_COMPLETE | 未知角色、日期和量化结果不作推断 |
| `/experiments/cozmio` | 软件界面档案 | PAGE_COMPLETE | 未知角色、日期和量化结果不作推断 |
| `/experiments/turbo-editor` | HarmonyOS 界面档案 | PAGE_COMPLETE | 未知角色、日期和量化结果不作推断 |
| `/experiments/youyuan-jingmeng` | 游戏与制作过程档案 | PAGE_COMPLETE | 未知角色、引擎和版权信息不作推断 |
| `/experiments/emotional-habitat` | 应用界面与活动画廊 | PAGE_COMPLETE | 未知角色和量化结果不作推断 |
| `/experiments/tripo-cgi-film` | CGI 作品与制作过程 | PAGE_COMPLETE | 已标注 CGI，不作为实物机器人证据 |
| `/experiments/touchsight-tactile-vision` | 实物/概念媒体分层展示 | PAGE_COMPLETE | 概念图已明确标注，缺少补充项目事实 |
| `/capabilities` | 能力与项目来源索引 | PAGE_COMPLETE | 具体 claim 保持保守 |
| `/lab` | 现场与工程记录 | PAGE_COMPLETE | 仅显示有来源的记录 |
| `/vision` | Now / Next / Long-term 与滚动视频 | PAGE_COMPLETE | 生成视频为 atmosphere |
| `/about` | 身份短文与资料槽位 | PAGE_COMPLETE | portrait / contact 仍缺失 |
| 404 | 品牌化索引恢复导航 | PAGE_COMPLETE | 不阻塞 |
| `/robots.txt` | 当前 Vercel production URL | PAGE_COMPLETE | 自有域名注册后再切换 |
| `/sitemap.xml` | 所有 10 项项目详情及公开页面 | PAGE_COMPLETE | Vercel production push 后复验 |

## V1.3 13-output Baseline

> 页面状态：`PAGE_COMPLETE` / `IN_PROGRESS` / `BLOCKED`。`PAGE_COMPLETE` 只证明本地页面与技术行为完成，不覆盖下方 C0–C10。

| Output | 页面责任 | 页面状态 | Production 状态 |
|---|---|---|---|
| `/` | 连续实验室时间轴、项目入口、Origin、Focus、Contact | PAGE_COMPLETE | C6/C7/C9 未完成 |
| `/origin` | 四阶段工程索引、sticky 阶段导航、真实年份关卡 | PAGE_COMPLETE | C2/C6 未完成 |
| `/experiments` | 三项旗舰展品 + 全部个人项目的完整索引；每项可显示事实核验状态 | PAGE_COMPLETE | C1/C3–C6 的长篇事实内容仍在扩充 |
| `/experiments/physical-link` | 大媒体 Hero、sticky 章节索引、概念氛围档案 | PAGE_COMPLETE | C1/C3 事实内容仍待扩展 |
| `/experiments/ai-native-hardware-workspace` | 大媒体 Hero、sticky 章节索引、实际界面档案 | PAGE_COMPLETE | C1/C4 事实内容仍待扩展 |
| `/experiments/bci-dexterous-hand` | 大媒体 Hero、sticky 章节索引、实际实验图档案 | PAGE_COMPLETE | C1/C5 事实内容仍待扩展 |
| `/capabilities` | 四组 proof matrix、verified-only 链接 | PAGE_COMPLETE | C6 阻塞 |
| `/lab` | 工程日志索引、单条空状态、空分类隐藏 | PAGE_COMPLETE | C6 阻塞 |
| `/vision` | Now / Next / Long-term 与独立 atmosphere 窗口 | PAGE_COMPLETE | 可选氛围视频不阻塞 |
| `/about` | 四组短事实、portrait rail、contact 关卡 | PAGE_COMPLETE | C2 阻塞 |
| 404 | 品牌化实验室索引恢复导航 | PAGE_COMPLETE | 不阻塞 |
| `/robots.txt` | 无真实域名时安全禁止抓取 | PAGE_COMPLETE | C9 未完成 |
| `/sitemap.xml` | 只收录已发布页面 | PAGE_COMPLETE | C9 未完成 |

## V1.2 Content & Production Closure

| Task | 内容 | 状态 | 当前阻塞 / 下一证明 |
|---|---|---|---|
| C0 | 文档真实性校准与唯一缺口编号 | DONE | 主计划第 13 节、当前审计和状态覆盖已建立 |
| C1 | Profile、旗舰项目事实包、完整项目目录、Evidence manifest | IN_PROGRESS | 已展示 33 张静态素材及相关视频；Experiments 收录 10 个媒体项目页和账号公开的 40 个 GitHub 仓库链接。仍需将剩余仓库归并至独立项目，并补齐未知角色、日期、团队等公开事实 |
| C2 | Profile / Origin / About 事实与真实 portrait | BLOCKED_ASSET | 联系方式、年份、早期证据、portrait、硬件近景 |
| C3 | PhysicalLink 完整 Case Study | BLOCKED_ASSET | 概念氛围已展示；尚无真实产品实现与对应实物媒体 |
| C4 | AI-Native Hardware Workspace 完整 Case Study | BLOCKED_ASSET | 实际界面截图已展示；设备闭环演示及完整公开说明仍缺 |
| C5 | BCI × Dexterous Hand 完整 Case Study | BLOCKED_ASSET | 实际实验照片已展示；连续真实演示视频仍缺 |
| C6 | 跨页面 Evidence、Capabilities、Origin、Lab | BLOCKED_ASSET | 依赖 C2–C5 的稳定 Evidence ID 和真实日志 |
| C7 | Blender 正式 3D、优化指标与最终派生图 | TODO | 需先启动可连接 Blender 环境；当前 V01 GLB 保留 |
| C8 | 真实项目视频与氛围视频收口 | BLOCKED_ASSET | 3 条生成氛围视频已处理并接入；本地 BCI / tactile 成片均为生成或概念媒体，不能替代三个真实项目 Evidence 视频 |
| C9 | Production URL、metadata、analytics、Vercel 发布 | IN_PROGRESS | 本轮 commit `a52b8fb` 已在 GitHub `master`，但没有检测到 Vercel Git deployment；`vercel whoami` 确认本机无凭据。需先 `vercel login` 或恢复 Git integration，再发布并在线复验。推荐自有域名 `morgandigitallab.com` 尚未注册/绑定 |
| C10 | clean-room、线上 Lighthouse、内容签字与文档交接 | TODO | 本地 Gate 已通过；线上 Lighthouse、分享卡、外链、最终域名与内容签字仍待完成 |

### 已完成的生产基础设施（不覆盖上表的素材阻塞）

| Foundation | 状态 | 完成证据 |
|---|---|---|
| C1-F01 Evidence schema / stable IDs / verification state | DONE | `src/content/types.ts`、`src/content/projects.ts`、`src/lib/evidence.ts` |
| C3-F01 Confirmed system-diagram schema and renderer | DONE | `SystemDiagram` 类型、`src/components/project/SystemDiagram.tsx` |
| C6-F01 Cross-page Evidence anchors | DONE | 首页、Capabilities、Origin 只把 verified proof 链到具体 Evidence anchor |
| C9-F01 Static metadata matrix | DONE | `src/content/metadata.ts`、`src/lib/metadata.ts` |
| C10-F01 Automated content / provenance gate | DONE | `pnpm check:content`、`pnpm check:lint`、`docs/CONTENT_AUDIT.md` |
| C10-F02 V1.3 local page gate | DONE | 13 outputs、6 viewport sizes、no-JS、mobile request、a11y 与 local Lighthouse；见 `docs/QA_V1.3.md` |
| C10-F03 V1.5 local UI/UX gate | DONE | 13 outputs、6 viewport、Home 正反向时间轴、View Transition、no-JS、reduced motion 与网络检查；见 `docs/QA_V1.5.md` |
| C7-F01 Generated atmosphere library | DONE | 6 张新增 WebP 已进入 Home / Experiments / Project / Origin / Vision；全部强制标注 Generated / not evidence |
| C8-F01 Generated atmosphere video layer | DONE | Home、PhysicalLink、Vision 三条无音轨网页派生视频与 poster 已接入；Mobile 初始请求不含 MP4 |

### 状态覆盖说明

- P5/P6/P7 的旧 DONE 证明布局和渲染结构存在，不证明 Origin、三个项目、Capabilities 或 Lab 已有真实内容。
- P8 的旧 DONE 证明 V01 程序化 GLB 可运行，不证明主计划要求的 Blender 正式生产、gltfjsx/Meshopt 和三角面/draw-call 实测已完成。
- P10 的旧 DONE 证明 metadata/analytics/deployment 代码入口存在，不证明真实 analytics 接收端、Git remote、Vercel production URL 或分享卡线上验证已完成。
- P11 的旧 DONE 证明执行过一次本地 QA，不证明真实媒体接入后的 clean install、部署环境 Lighthouse、外链和最终用户签字已完成。

## V1.1 Remediation

| Task | 内容 | 状态 |
|---|---|---|
| R0 | 状态校准、真实性规则、来源类型 | DONE |
| R1 | 项目资料采集模板与纯英文内容层 | IN_PROGRESS |
| R2 | 工业编辑视觉系统与共享组件 | DONE |
| R3 | 自制 3D、poster、氛围图片与资产记录 | BLOCKED_ASSET |
| R4 | 首页 Launch composition | DONE |
| R5 | Experiments 与项目档案系统 | DONE |
| R6 | Origin / Capabilities / Lab / Vision / About | DONE |
| R7 | 视频槽位、提示词与真实拍摄 brief | DONE |
| R8 | 响应式、性能、可访问性与最终构建 | IN_PROGRESS |

R1 的代码、英文编辑规则和资料采集模板已完成。2026-09-28 已从本地项目与公开 GitHub 建立首轮 source audit 和三个 NORMALIZED fact packages；它们仍需用户确认归属、公开许可与最终措辞。真实照片、PCB、部分录屏、portrait 与最终项目视频继续保持 `null` / `PENDING`。

R3 的 V01 程序化模型、poster 和氛围图已完成，但正式 Blender V02 未完成，因此不能继续显示 DONE。R8 的本地页面验收已完成；移动 Lighthouse 模拟 LCP 为 2.8s，且线上 QA 尚未发生，因此保持 IN_PROGRESS。

## V1.4 私人数字实验室视觉覆盖

| Task | 内容 | 状态 | 完成证据 |
|---|---|---|---|
| V14-T01 | 三条根目录生成视频识别、裁切、静音、规范命名与 poster | DONE | `public/video/`、`public/posters/`、`docs/ASSET_GAPS.md` |
| V14-T02 | Home 视频优先空间入口与三个设备热点 | DONE | `SpatialLabHero`；无视频时 poster/HTML 完整可用 |
| V14-T03 | Experiments 空间底层 + 档案索引层 | IN_PROGRESS | `SpatialArchiveHero`；首页三项旗舰顺序保持，但完整个人项目目录尚未入库 |
| V14-T04 | PhysicalLink / Vision 氛围视频接入 | DONE | `AtmosphereFrame` 支持生成视频并强制显示非 Evidence 标签 |
| V14-T05 | INDEX 导航、Contact、Footer 去企业官网化 | DONE | 七项导航未变；深蓝大 Banner 已移除 |
| V14-T06 | 移动端与 reduced-motion 降级 | DONE | Mobile netlog MP4 命中 0；poster、文字与链接可用 |
| V14-T07 | 本地 Gate | DONE | `pnpm check:build` 通过；Home / Experiments / PhysicalLink / Vision 截图与 smoke test 通过 |

本轮用户明确确认：现有三条生成视频已经足够，AI Workspace 与 BCI 独立推进视频不再是页面阻塞项。该覆盖不改变真实项目视频的 Evidence 要求，也不把 C7 Blender V02 或 C1–C6 真实内容关卡标记为完成。

## V1.5 UI UX 全站改造

| Task | 内容 | 状态 |
|---|---|---|
| V15-T01 | 文档决策、tokens、共享实验室组件与导航 | DONE |
| V15-T02 | HomeScrollDirector 与桌面时间轴 | DONE |
| V15-T03 | Mobile / reduced-motion / no-JS 降级 | DONE |
| V15-T04 | Experiments 与项目详情编辑式结构 | DONE |
| V15-T05 | Origin / Capabilities / Lab / Vision / About / 404 | DONE |
| V15-T06 | 13 输出、六档 viewport、性能与无障碍 Gate | DONE |

V1.5 的 `PAGE_COMPLETE` Gate 已通过。Local Lighthouse desktop 为 99/100/100、mobile 为 88/100/100（Performance / Accessibility / Best Practices）；desktop LCP 0.8s，mobile 模拟 LCP 3.9s，后者仍未达到 2.5s 目标。SEO 66 是未配置 production URL、robots 安全禁止抓取和未发布项目 noindex 的预期结果。C1–C10、R8 与全站 `PRODUCTION_COMPLETE` 不因此转为完成。

## V1.6 Scroll-Scrub 电影舞台修正

| Task | 内容 | 状态 |
|---|---|---|
| V16-T01 | 三条视频密集关键帧派生文件 | DONE |
| V16-T02 | 首页固定舞台与三段 `currentTime` 滚动映射 | DONE |
| V16-T03 | 项目文字、scene time 与 full-sequence UI 时间编排 | DONE |
| V16-T04 | 停帧、反向滚动与章节切换验证 | DONE |
| V16-T05 | Mobile / tablet / reduced-motion 零视频请求回归 | DONE |
| V16-T06 | `pnpm check:build` 与生产模式 Gate | DONE |

V1.6 修正了 V1.5 “视频只播放、不受滚动控制”的实现偏差。该修正不改变 0 verified Evidence、Blender V02、mobile LCP 与生产发布关卡的未完成状态。

## P0 — Repository & Agent Control

| Task | 内容 | 状态 |
|---|---|---|
| P0-T01 | 执行文档体系（docs ×4） | DONE |
| P0-T02 | AGENTS.md | DONE |
| P0-T03 | Node / pnpm 锁定（.nvmrc + engines） | DONE |
| P0-T04 | 目录骨架 | DONE |
| P0-T05 | 媒体命名规则（→ DECISIONS_LOCKED） | DONE |
| P0-T06 | Phase Gate 命令（check 系列） | DONE |

## P1 — Information Architecture & Content Model

| Task | 内容 | 状态 |
|---|---|---|
| P1-T01 | 全站 Route Map（8 路由） | DONE |
| P1-T02 | profile 内容模型 | DONE |
| P1-T03 | Origin 数据模型（4 阶段） | DONE |
| P1-T04 | Project 数据模型 | DONE |
| P1-T05 | Evidence 数据结构 | DONE |
| P1-T06 | Lab 数据模型 | DONE |
| P1-T07 | 旗舰项目骨架 ×3 | DONE |

## P2 — Design System

| Task | 内容 | 状态 |
|---|---|---|
| P2-T01 | Geist 字体 | DONE |
| P2-T02 | Design Tokens | DONE |
| P2-T03 | Container / Grid | DONE |
| P2-T04 | Typography 组件 | DONE |
| P2-T05 | 基础交互组件 | DONE |
| P2-T06 | 全局导航 | DONE |
| P2-T07 | 全局 Footer | DONE |

## P3 — Application Foundation

| Task | 内容 | 状态 |
|---|---|---|
| P3-T01 | 全局 Layout | DONE |
| P3-T02 | Route Transition | DONE |
| P3-T03 | Scroll System（原生滚动） | DONE |
| P3-T04 | Media Component | DONE |
| P3-T05 | Project Card System | DONE |
| P3-T06 | Empty / Pending Asset State | DONE |

## P4 — Entrance & Home

| Task | 内容 | 状态 |
|---|---|---|
| P4-T01 | 首页 Hero DOM 层 | DONE |
| P4-T02 | 首页 3D Canvas 容器 | DONE |
| P4-T03 | 未来实验室构图 | DONE |
| P4-T04 | Entrance 动画（≤4.5s） | DONE |
| P4-T05 | 首页 Flagship Experiments | DONE |
| P4-T06 | 首页 Origin Teaser | DONE |
| P4-T07 | 首页 Current Focus | DONE |

## P5 — Origin

| Task | 内容 | 状态 |
|---|---|---|
| P5-T01 | Origin Hero | DONE |
| P5-T02 | 四阶段叙事布局 | DONE |
| P5-T03 | Origin Scroll Interaction | DONE |
| P5-T04 | Origin Evidence Links | DONE |
| P5-T05 | Turning Point Block | DONE |
| P5-T06 | Timeline Strip | DONE |

## P6 — Experiments

| Task | 内容 | 状态 |
|---|---|---|
| P6-T01 | Experiments Index（Featured + Archive） | DONE |
| P6-T02 | Project Detail Hero | DONE |
| P6-T03 | Problem Section | DONE |
| P6-T04 | System / Solution Section | DONE |
| P6-T05 | Build Evidence Gallery | DONE |
| P6-T06 | Failure Archive in Project | DONE |
| P6-T07 | Result & Verification | DONE |
| P6-T08 | Next Experiment Navigation | DONE |

## P7 — Capabilities / Lab / Vision / About

| Task | 内容 | 状态 |
|---|---|---|
| P7-T01 | Capabilities 四组定位 | DONE |
| P7-T02 | Capability Proof Links | DONE |
| P7-T03 | Lab 首页 | DONE |
| P7-T04 | Failure Archive 列表 | DONE |
| P7-T05 | Lab Equipment | DONE |
| P7-T06 | Vision 页面 | DONE |
| P7-T07 | About 页面 | DONE |
| P7-T08 | Contact CTA | DONE |

## P8 — 3D & Media Pipeline

| Task | 内容 | 状态 |
|---|---|---|
| P8-T01 | 3D_ASSET_MANIFEST.md | DONE |
| P8-T02 | 实验室场景资源（程序化建模优先） | DONE |
| P8-T03 | 自制品牌资产（程序化） | DONE |
| P8-T04 | Blender → GLB Pipeline（文档化） | DONE |
| P8-T05 | R3F 性能实现 | DONE |
| P8-T06 | 视频 Pipeline | DONE |

## P9 — Responsive / Performance / Accessibility

| Task | 内容 | 状态 |
|---|---|---|
| P9-T01 | 响应式矩阵 | DONE |
| P9-T02 | Mobile 3D Fallback | DONE |
| P9-T03 | 图片与字体优化 | DONE |
| P9-T04 | Accessibility | DONE |
| P9-T05 | Core Web Vitals | DONE |

## P10 — SEO / Metadata / Analytics / Deployment

| Task | 内容 | 状态 |
|---|---|---|
| P10-T01 | Metadata | DONE |
| P10-T02 | Structured Data | DONE |
| P10-T03 | Analytics | DONE |
| P10-T04 | Deployment（Vercel） | DONE |

## P11 — Final QA & Handoff

| Task | 内容 | 状态 |
|---|---|---|
| P11-T01 | 内容真实性审计 | DONE |
| P11-T02 | 视觉审计 | DONE |
| P11-T03 | 完整回归 | DONE |
| P11-T04 | 最终交接包 | DONE |
