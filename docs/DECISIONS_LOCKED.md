# DECISIONS LOCKED

> 摘自 `MORGAN_Digital_Universe_Agent_Execution_Master_Plan_V1.0.md`。
> 以下为锁定决策，执行中不得重新讨论。如需变更必须修改本文件并注明原因。

## 产品

- 定位：Cinematic Personal Portfolio / Narrative Portfolio
- 核心叙事：Digital → Intelligence → Hardware → Robotics → Physical AI
- 首页主标题：`Building AI Systems That Enter the Physical World.`
- 辅助中文：`让智能从屏幕走进现实。`
- 固定导航（7 项，不增加一级导航）：HOME / ORIGIN / EXPERIMENTS / CAPABILITIES / LAB / VISION / ABOUT
- 旗舰项目顺序：1) PhysicalLink 2) AI-Native Hardware Workspace 3) BCI × Dexterous Hand

## 技术栈

- Next.js App Router + TypeScript + React + Tailwind CSS（v4，CSS-first 配置）
- 动画：GSAP + ScrollTrigger（scroll 动画）；Framer Motion 仅小型 UI transition
- 3D：Three.js + React Three Fiber + @react-three/drei；GLB；gltfjsx
- 内容：V1 不上 CMS，统一在 `src/content/*.ts`
- 图标：仅 Lucide React
- 字体：仅 Geist Sans（UI/正文）+ Geist Mono（数据/编号/状态），禁止第三套装饰字体
- 包管理：pnpm；部署：Vercel（免费、无需备案）

## 视觉禁区

- 禁止大面积纯黑背景、紫蓝渐变赛博朋克、荧光 cyan 主色、RGB glitch、Matrix code rain
- 禁止发光边框；只用非常弱的冷色阴影
- 主背景 `#F5F6F8` / `#FFFFFF`；主文字 `#0B1020` / `#344054`；品牌深蓝 `#102A43`；辅助蓝 `#2563EB`（仅交互/数据/小面积强调）；信号橙 `#FF6B2C`（仅状态/坐标/关键按钮/实验编号）；边框 `rgba(11,16,32,0.10)`
- 圆角：内容卡 16px / 重点媒体卡 24px / Pill 999px，不做全部大圆角
- 桌面基准 1440px，内容最大宽 1280px，12 列 grid；边距 desktop ≥64 / tablet ≥32 / mobile 20

## 字号（desktop / mobile）

- Hero Display 72/0.95 → 44；H1 56→38；H2 40→30；H3 28→24；Body Large 20；Body 16；Meta 12–13 Geist Mono

## 动画

- 微交互 160–220ms；普通过渡 400–650ms；大场景 800–1200ms
- GSAP ScrollTrigger 只用于：Origin 推进、项目媒体渐入、大数字/结构图 reveal、章节标题进入
- `prefers-reduced-motion`：禁止 scroll scrub 与自动相机移动，保留快速 opacity/translate

## 性能预算

- LCP ≤2.5s / INP ≤200ms / CLS ≤0.1
- 3D 不进首屏 blocking bundle；首页 poster ≤350KB；普通项目图 ≤250KB；入口 GLB ≤8MB；纹理默认 1K（关键近景最多 2K）
- Mobile 默认不加载完整 GLB/WebGL，用 poster + 可选「View 3D」

## 媒体命名

- 格式：`{project}-{section}-{type}-{index}.{ext}`，如 `physical-link-prototype-photo-01.webp`
- 禁止：`IMG_001.jpg`、`final2.png`、`newnew.mp4`

## 素材缺失

- 占位文件命名 `*_PENDING.webp`；UI 显示中性灰白占位 + `Evidence pending`
- 缺口记录在 `docs/ASSET_GAPS.md`；继续开发，不停下等素材
- AI 生成仅允许：氛围背景 / 实验室场景 / 抽象视觉，且不得放入 Evidence 标签

## 首页信息顺序（固定）

1. Hero + 3D enhancement → 2. Flagship Experiments ×3 → 3. Origin Teaser → 4. Selected Evidence Strip → 5. Current Focus → 6. Contact CTA → 7. Footer

## 项目详情信息顺序（固定）

1. Project Hero → 2. What was broken? → 3. The idea → 4. System/Architecture → 5. Build process → 6. Evidence → 7. Failure/limitation → 8. Result/current state → 9. What I learned → 10. Related/next experiment

## 真实性

- 未知结果/数据/成绩不编造；planned 不得写成 done；无真实文件时 `isVerified=false`

## V1.1 用户确认覆盖（2026-09-27）

- 全站用户可见文案与 metadata 统一为英文；原辅助中文不再显示。
- 网站以作品、系统图和证据为主。叙事由浏览顺序和视觉关系完成，正文保持短、事实化、内容优先。
- 生成式图片、视频和概念 3D 只能作为 atmosphere；不得进入真实项目 Evidence。
- 资产来源枚举固定为 `USER_EVIDENCE` / `GENERATED_ATMOSPHERE` / `SELF_AUTHORED_3D` / `SYSTEM_DIAGRAM` / `PENDING`。

## V1.2 完成口径（2026-09-27）

- 页面和占位机制完成不等于内容完成；生产收口状态只看主计划第 13 节 C0–C10。
- 三个旗舰项目必须由用户确认事实和真实 Evidence 后才能从 `BLOCKED_ASSET` 转为 DONE。
- 当前程序化 GLB 是可运行 V01；Blender V02、gltfjsx/Meshopt 和运行指标在 C7 单独验收。若用户决定接受 V01 为最终资产，必须在本文件记录明确覆盖后才能取消 C7。
- 氛围视频允许保持未生成，poster + 槽位 + 提示词即为完成路径；真实项目视频不得被氛围视频替代。
- Production URL、live analytics、外链、部署环境 Lighthouse 和最终内容签字必须有实际证据，不能以本地 build 代替。

## V1.3 页面收口口径（2026-09-28）

- 13 个输出固定为 10 个用户页面、品牌化 404、robots.txt 和 sitemap.xml；不增加一级导航或额外内容页。
- 页面状态分为 `PAGE_COMPLETE` 与 `PRODUCTION_COMPLETE`；页面可用不代表真实 Evidence、正式 3D 或生产发布完成。
- 本地项目、日志、截图和 GitHub 内容当前全部保持待确认：不进入 `public/`，不进入公开详细正文，不设置 verified。
- 三个未发布项目允许保留公开名称、方向摘要和集中式 publication review；不得展示未确认年份、角色、团队、技术链路、指标或结果。
- 未发布项目设置 noindex 并从 sitemap 排除；未配置真实 `NEXT_PUBLIC_SITE_URL` 时 robots 禁止抓取，sitemap 不声明虚假站点地址。
- 缺失 portrait、实拍、真实项目视频和 Blender V02 不阻止页面实现，但继续阻止对应 C 任务与全站生产完成。

## 文档语言（2026-09-28）

- 主计划、执行状态、QA、资产清单、内容审计和交接说明统一使用中文。
- 网站用户可见内容与 metadata 继续使用英文，不受本条影响。
- 代码标识、文件名、命令和需要直接投喂生成工具的英文提示词保留原文；其标题、规格、用途、状态和解释使用中文。

## V1.4 空间化视觉覆盖（2026-09-29）

- 用户确认网站的视觉身份不是正式企业官网、SaaS 落地页或高级简历，而是一个持续运行的私人数字实验室：`MORGAN / DIGITAL LAB`。
- 首页首先是可进入的空间；实验对象承担导航语义，网页文字、状态和档案层覆盖在空间之上。
- 视频可以作为主空间层，实时 3D 不再是首页体验成立的必要条件。3D 保留为后续增强，不得为了使用 3D 而牺牲画面质量。
- 固定职责为：视频负责空间与情绪，HTML 负责标题、热点、导航和可访问性，真实项目媒体负责 Evidence。
- 用户确认当前三条生成视频已经足够：Home 实验室循环、PhysicalLink 概念近景、Vision 信号链。AI Workspace 与 BCI 独立推进视频不再是本轮阻塞项，使用同一空间内的 HTML 热点与静态聚焦图完成入口。
- 所有生成视频继续使用 `generated-atmosphere`，必须显示概念/生成标识，永远不能进入 Evidence。

## V1.5 UI UX 规范覆盖（2026-09-29）

- `personal_website_uiux_v1.docx` 成为本轮视觉与交互规范；只采用其交互机制、版式和视觉系统，不采用其中作为案例提出的新路由或候选项目。
- 继续保留 13 个输出、七项一级导航和三个旗舰项目；不新增 `/projects`、`/archive`、`/now`。
- 首页采用视频先行、3D 增强：现有实验室视频承担首轮空间叙事，Blender V02 以后接入相同体验状态，不以 V01 冒充正式资产。
- 全站统一改造。首页是唯一的强电影式滚动舞台，其他页面使用自然滚动的实验室索引与工业案例语言。
- 首页允许使用一个 GSAP ScrollTrigger 主时间轴，这是对旧版“首页不使用 scroll scrub”限制的明确覆盖；不引入 Lenis，不使用强制 snap。
- 视觉基础覆盖为 Lab White `#F6F7F5`、Ink Navy `#0D1B2A`、Deep Blue `#153E75`、Steel `#8F97A2`、Signal Orange `#E66A21`。字体继续只使用 Geist Sans / Geist Mono。

## V1.6 Scroll-Scrub 视频覆盖（2026-09-29）

- 用户明确要求的首页视频行为是 scroll-linked video scrubbing，而不是普通自动播放：滚动位置直接控制视频时间，停止滚动即停帧，反向滚动即反向推进。
- 本条覆盖 V1.5 中“视频不通过 `currentTime` 模拟 scrub”的旧限制；仍只允许首页使用一个 ScrollTrigger 主时间轴，不引入 Lenis 或强制 snap。
- 三条用户生成视频全部进入首页固定舞台：实验室全景对应 Entry / Identity，PhysicalLink 近景对应第一项目，Signal → PCB → Hand 对应 Origin / system path。AI Workspace 与 BCI 没有对应视频，继续使用 concept still + 轻微镜头位移。
- 原网页播放文件保留不覆盖；首页使用单独的密集关键帧 scrub 派生文件。所有版本继续标注 `generated-atmosphere / not evidence`。
- Mobile、tablet 与 `prefers-reduced-motion` 不加载 scrub 视频，继续使用 poster 与自然纵向内容。

## V1.7 全项目档案覆盖（2026-10-19）

- 用户确认本网站是完整个人项目网站，Experiments 必须收录所有真实个人项目，不采用“精选 2–4 个 Archive 项目”的限制。
- 三个现有旗舰项目仍负责首页主叙事；其余项目都进入同一 `/experiments` 完整项目目录，不新增一级导航或路由。
- 每个真实项目至少有一个目录条目。内容、图片、归属或公开许可尚未确认时，条目与内部资源清单标记 `PENDING`，不因资料暂缺而从项目统计中删除，也不编造用户可见事实。
- GitHub 仓库数量不等于项目数量：审计所有已发现仓库和本地文件夹，将多个仓库映射到对应项目；工具、fork、参考库和 release mirror 按实际关系归档，避免重复或误标。任何确认属于 Morgan 的独立项目都不得因数量或素材不足而被筛除。

## V1.8 用户素材公开授权（2026-10-22）

- 用户明确确认本地 `项目图片` 中提供的照片、软件界面截图、现场图和视频均为真实材料，并授权将其整理、制作网页衍生版本、展示在个人网站及随网站上线。
- 不再以“素材真实性/发布确认待办”阻止上述已提供素材进入网站。原始文件保留在本地；公开部署只纳入必要的图片/视频优化副本。
- 用户授权展示材料，不等于要求扩写未知项目事实。Morgan 的角色、团队、年份、系统链路、指标等未明确字段仍保持 `null`，不因素材公开授权而推断。
- 用户提供的实际照片与软件截图在页面中作为项目媒体/过程素材呈现；生成视频、概念图、CGI 成片仍须标记为 concept/atmosphere，不伪装成硬件运行证据。
- 视觉材料的展示不等待 `Evidence.isVerified`。该字段继续只用于某项材料是否支持一条具体、完整且不超出来源的公开 claim；不影响用户已授权素材正常展示。
- 品牌名称锁定为 `MORGAN / DIGITAL LAB`。首选域名为 `morgandigitallab.com`；注册归属确认前不把它写入 canonical、robots 或 sitemap，也不代用户购买。

## V2.0 视觉重设计与完整项目墙（2026-11-07）

- 用户明确要求重新设计，而非局部排版调整；网站视觉与完整项目墙同等重要。允许重新生成视频或使用新 3D 资源，优先由 agent 制作，不沿用低质量的旧视频作为必需主视觉。
- 本条覆盖 V1.4–V1.6 的视频先行、首页强制 scroll-scrub，以及旧首屏标题和首页展示顺序要求；保留原产品、技术栈、七项导航、已有路由和真实内容边界。
- 使用 `elayadesign/ai-design-skills` 的 `landing-page-design`，参考 companion `redesign-existing-projects`。视觉保留 Lab White / Ink Navy / Signal Orange、Geist Sans / Geist Mono 与 Lucide，覆盖 skill 中冲突的图标、渐变和营销页面建议。
- 新首页以原创 Signal Engine 概念雕塑、精简主标题、自然滚动和可直接进入的完整项目墙组成。全部 10 项现有项目默认展开展示，首页与 Experiments 共用分类筛选画廊；保留项目实际摘要和阶段，不编造事实或将仓库数当项目数。
- Signal Engine 由独立 Blender 场景原创制作，提供透明 WebP、GLB 与源文件，标为 `self-authored-3d / concept / not project evidence`。首屏默认轻量静态图；用户点击后才加载 Three.js 与 GLB，手机同样默认不加载 WebGL。
- 3D 提供拖动、方向键、Escape、错误回退和显式资源释放。reduced-motion 不自动移动模型；下方文字进入动效可关闭。原氛围视频文件保留，真实项目作品视频按原来源呈现。
- 所有十个项目的图片都有对应展示策略：完整软件界面、竖屏组合、硬件实拍、CGI 成片封面；PhysicalLink 的生成概念图明确标注，不能成为实物 Evidence。
- 中英双语、详情页、源码归档和现有 metadata 保留；本地实现、生产部署、真实 Evidence 和用户审美验收分别记录。
