# MORGAN DIGITAL UNIVERSE
## Agent Execution Master Plan V1.0

> V1.1 remediation（2026-09-27）：保留本计划的产品、路由、技术栈和真实性规则；执行状态以 `docs/EXECUTION_STATUS.md` 的 R0–R8 为当前交付依据。V1.1 统一使用英文、内容优先的工业编辑视觉，并将生成氛围资产与真实 Evidence 类型隔离。
> V1.7 全项目档案覆盖（2026-10-19）：`/experiments` 必须收录所有确认属于 Morgan 的独立项目，不设 Archive 数量上限；完整映射规则与待办见 `docs/DECISIONS_LOCKED.md` 和 `docs/ASSET_GAPS.md`。

> 用途：直接交给 Coding Agent / Local Agent 执行。
> 本文件不是概念稿，不允许执行 Agent 重新做产品定位、重新设计信息架构或重新选技术栈。
> 原则：按任务编号推进；任务完成必须达到验收标准；遇到素材缺失时使用预设占位机制，不得停下等待二次决策。

---

# 0. 项目最终定义

## 0.1 产品定位

MORGAN DIGITAL UNIVERSE 是一个 **Cinematic Personal Portfolio / Narrative Portfolio**，目标不是制作普通简历网站，而是通过视觉、交互、真实项目证据、实验过程和个人成长叙事，让访问者快速建立以下认知：

1. Morgan 的核心方向是 AI × Robotics × Hardware × Physical AI。
2. Morgan 不只是“会技术”，而是能把软件、AI、硬件和真实物理设备连接起来。
3. 项目不是概念堆砌，必须有真实页面、代码、实物、PCB、视频、测试、日志等证据。
4. 网站本身必须是一个作品，但不能喧宾夺主成为“炫技 3D Demo”。
5. 外部观感像电影和高端科技产品发布页；进入项目后像实验档案和工程日志。

## 0.2 核心叙事

固定使用以下叙事，不允许 Agent 自己更换主题：

**Digital → Intelligence → Hardware → Robotics → Physical AI**

中文含义：

**从数字世界出发，让智能进入真实世界。**

首页主标题固定为：

> Building AI Systems That Enter the Physical World.

辅助中文：

> 让智能从屏幕走进现实。

## 0.3 核心章节

最终导航固定为：

1. HOME
2. ORIGIN
3. EXPERIMENTS
4. CAPABILITIES
5. LAB
6. VISION
7. ABOUT

不要再增加一级导航。

## 0.4 核心用户路径

网站必须支持三种浏览深度：

- **5 秒**：看到姓名/品牌、方向、主视觉，知道“AI + Physical World”。
- **60 秒**：看到 Origin + 3 个旗舰实验，理解 Morgan 的成长路径和能力方向。
- **5 分钟**：进入项目详情，看到真实证据、过程、失败、技术结构和结果。

## 0.5 旗舰项目默认顺序

在真实素材未全部补齐前，默认以以下三个项目作为首页旗舰实验：

1. **PhysicalLink — AI-Native Hardware Layer**
2. **AI-Native Hardware Workspace — Natural Language to Real Hardware**
3. **BCI × Dexterous Hand — Intent to Physical Action**

其他项目进入 `/experiments` 的完整项目 Archive，不抢首页主叙事。所有真实个人项目都要有目录条目，不设数量上限；资料待确认的条目保留为内部 `PENDING`，归属及事实确认后再展示对应公开字段。多个仓库可归属于同一个项目，工具、fork、参考库和发布镜像按真实关系注明，不能因此漏掉任何独立项目。

---

# 1. Agent 总执行规则

## 1.1 不允许重新决策的事项

执行 Agent 禁止：

- 重新选择框架。
- 把网站改成传统简历模板。
- 把整体改成黑底霓虹赛博朋克。
- 把所有页面做成 3D。
- 在没有真实证据时用 AI 图冒充项目实拍。
- 为了“高级感”大量使用无意义英文术语。
- 自己新增复杂后台、登录系统、社区系统、评论系统。
- 自己新增博客 CMS，V1 直接使用仓库内结构化内容文件。
- 因为缺少某一张图片而停下整个开发。
- 每完成一个小组件就重新做全站审计。

## 1.2 素材缺失处理规则

真实素材缺失时：

- 创建明确占位文件名，例如 `physical-link-hero_PENDING.webp`。
- UI 显示中性占位图，不显示“假成果”。
- 在 `docs/ASSET_GAPS.md` 记录素材名称、尺寸、用途、需要用户提供什么。
- 继续完成布局、组件、数据结构和其他任务。
- 只允许对“氛围背景 / 实验室场景 / 抽象视觉”使用 AI 生成资产。

## 1.3 验证节奏

不要每个 task 跑全量测试。

采用：

- Task 内：只验证本 task 直接影响范围。
- 每个 Phase 结束：执行完整 build + lint + 关键页面浏览检查。
- P9、P11：执行性能、响应式、可访问性和最终回归。

## 1.4 状态文件

必须维护：

- `docs/EXECUTION_STATUS.md`
- `docs/ASSET_GAPS.md`
- `docs/CONTENT_SOURCE_MAP.md`
- `docs/DECISIONS_LOCKED.md`

每个任务状态只能为：

- TODO
- IN_PROGRESS
- BLOCKED_ASSET
- DONE

## 1.5 完成定义

一个 Task 只有同时满足以下条件才能标 DONE：

1. 代码或资产已经落入仓库。
2. 页面/功能可实际打开。
3. 满足本任务验收标准。
4. 未破坏已有完成页面。
5. 如有新增用户可见内容，已经进入统一数据源，不散落硬编码。

---

# 2. 锁定技术栈

## 2.1 Web

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- GSAP + ScrollTrigger
- Framer Motion 仅用于小型 UI transition，不与 GSAP 抢同一动画控制权

## 2.2 3D

- Three.js
- React Three Fiber
- @react-three/drei
- Blender
- GLB
- gltfjsx

## 2.3 内容

V1 不上 CMS。

使用：

- `src/content/profile.ts`
- `src/content/origin.ts`
- `src/content/projects.ts`
- `src/content/capabilities.ts`
- `src/content/lab.ts`

## 2.4 图标

统一 Lucide React。

禁止混用多个 icon pack。

## 2.5 字体

统一：

- 主字体：Geist Sans
- 数据 / 编号 / 状态：Geist Mono

禁止引入第三套装饰字体。

---

# 3. 锁定视觉系统

## 3.1 色彩

主背景：

- `#F5F6F8` 冷白
- `#FFFFFF` 纯白卡片

主文字：

- `#0B1020` 深蓝黑
- `#344054` 次级文字

品牌深蓝：

- `#102A43`

辅助蓝：

- `#2563EB`，只用于交互、数据和小面积强调

信号橙：

- `#FF6B2C`，只用于状态、坐标、关键按钮、实验编号

边框：

- `rgba(11,16,32,0.10)`

禁止：

- 大面积纯黑背景
- 紫蓝渐变赛博朋克
- 荧光 cyan 作为主色
- RGB glitch
- Matrix code rain

## 3.2 版式

桌面设计基准：1440 px。

内容最大宽度：1280 px。

Grid：12 columns。

左右安全边距：

- Desktop ≥ 64 px
- Tablet ≥ 32 px
- Mobile = 20 px

## 3.3 圆角

- 普通内容卡：16 px
- 重点媒体卡：24 px
- Pill：999 px

禁止所有组件都做大圆角。

## 3.4 阴影

只使用非常弱的冷色阴影。

不使用发光边框。

## 3.5 字号

Desktop：

- Hero Display: 72 px / 0.95
- H1: 56 px
- H2: 40 px
- H3: 28 px
- Body Large: 20 px
- Body: 16 px
- Meta: 12–13 px Geist Mono

Mobile：

- Hero: 44 px
- H1: 38 px
- H2: 30 px
- H3: 24 px
- Body: 16 px

---

# 4. 动画规范

## 4.1 默认动画时间

- 微交互：160–220 ms
- 普通过渡：400–650 ms
- 大场景：800–1200 ms

## 4.2 Scroll 动画

GSAP ScrollTrigger 只用于：

- Origin 章节推进
- 项目媒体渐入
- 大型数字/结构图 reveal
- 页面章节标题进入

不要给每个文字都做 scroll animation。

## 4.3 Reduce Motion

检测 `prefers-reduced-motion`：

- 禁止 scroll scrub
- 禁止自动相机移动
- 保留 opacity / small translate 的快速过渡

---

# 5. 性能预算

## 5.1 Core Web Vitals 目标

最终目标：

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1

## 5.2 资源预算

首页首次加载：

- 3D 不进入主首屏 blocking bundle
- 首页 poster ≤ 350 KB
- 单张普通项目图建议 ≤ 250 KB
- 单个短视频 poster ≤ 300 KB
- 首屏自动播放视频如果存在：WebM/MP4，桌面目标 ≤ 5 MB；移动端禁止自动下载该视频

3D：

- 单个入口 GLB 压缩后目标 ≤ 8 MB
- 主场景纹理默认 1K；关键近景最多 2K
- 不允许 4K 纹理无条件进入网页
- Mobile 默认不加载完整实验室 GLB

## 5.3 3D 运行策略

Desktop：完整简化场景。

Tablet：减少 DPR、后处理和阴影。

Mobile：默认 poster / 预渲染短视频替代 WebGL；只有用户主动点击“View 3D”才加载轻量模型。

---

# 6. 任务总表

总任务数：**74 Tasks**。

执行顺序：P0 → P1 → P2 → P3 → P4 → P5 → P6 → P7 → P8 → P9 → P10 → P11。

允许并行：同一 Phase 中明确写“可并行”的任务。

---

# P0 — Repository & Agent Control（6 Tasks）

## P0-T01 — 建立执行文档体系

**操作**

创建：

- `docs/EXECUTION_STATUS.md`
- `docs/ASSET_GAPS.md`
- `docs/CONTENT_SOURCE_MAP.md`
- `docs/DECISIONS_LOCKED.md`

把本文件中的“锁定技术、视觉、导航、性能规则”摘要写入 `DECISIONS_LOCKED.md`。

**验收**

仓库内存在以上 4 个文件，后续 Agent 无需回查聊天确定关键决策。

## P0-T02 — 创建 AGENTS.md

**操作**

在仓库根目录建立 `AGENTS.md`，写入：

- 安装命令
- dev 命令
- build 命令
- lint 命令
- 测试命令
- 项目目录结构
- 视觉禁区
- 素材缺失处理规则
- Phase gate 验证规则

**验收**

新 Agent 只读 README + AGENTS.md + 本计划即可启动开发。

## P0-T03 — 确认 Node / Package Manager

固定使用当前仓库已有 package manager；如果新仓库，默认 `pnpm`。

建立 `.nvmrc` 或 engines，锁定当前稳定 Node LTS。

**验收**

全新环境执行 install 后可启动项目。

## P0-T04 — 建立目录骨架

创建：

```text
src/
  app/
  components/
    layout/
    ui/
    motion/
    three/
    project/
  content/
  lib/
  styles/
public/
  images/
  video/
  models/
  posters/
docs/
```

**验收**

目录命名稳定，后续不另起重复目录。

## P0-T05 — 建立统一媒体命名规则

格式：

`{project}-{section}-{type}-{index}.{ext}`

例如：

`physical-link-prototype-photo-01.webp`

禁止：`IMG_001.jpg`、`final2.png`、`newnew.mp4`。

**验收**

写入 `docs/DECISIONS_LOCKED.md`。

## P0-T06 — 建立 Phase Gate 命令

添加 npm script：

- `check`
- `check:build`
- `check:lint`

若项目已有测试框架则接入，不强制为了本网站额外引入大型测试框架。

**验收**

`pnpm check` 可一次执行 lint + typecheck + build 或其等价组合。

---

# P1 — Information Architecture & Content Model（7 Tasks）

## P1-T01 — 建立全站 Route Map

固定路由：

```text
/
/origin
/experiments
/experiments/[slug]
/capabilities
/lab
/vision
/about
```

不创建 `/skills`、`/timeline` 等重复页面。

**验收**

每个路由都有 page 文件和最小可访问页面。

## P1-T02 — 建立 profile 内容模型

`profile.ts` 至少包含：

- displayName
- brandName
- headline
- subheadline
- location 可选
- email 可选
- github
- socialLinks
- currentFocus

缺失字段设 null，不虚构。

## P1-T03 — 建立 Origin 数据模型

每个阶段包含：

- id
- label
- title
- oneLine
- narrative
- yearRange 可选
- skills
- projectRefs
- visualType

预设 4 阶段：

1. Digital Foundations
2. Intelligence
3. Building Physical Systems
4. Physical AI

## P1-T04 — 建立 Project 数据模型

每个项目强制字段：

- slug
- title
- shortTitle
- status
- year
- category
- oneLine
- problem
- insight
- solution
- myRole
- stack
- evidence
- media
- failures
- result
- lessons
- links

**验收**

任何项目详情页都从该结构渲染，不在 page 内手写长内容。

## P1-T05 — 建立 Evidence 数据结构

Evidence 类型只能为：

- demo
- source
- hardware
- pcb
- architecture
- test
- screenshot
- video
- document

每条 Evidence 标注：

- title
- type
- asset
- caption
- isVerified

没有真实文件时 `isVerified=false`。

## P1-T06 — 建立 Lab 数据模型

Lab item 用于展示：

- Failure Archive
- Tools / Equipment
- Prototypes
- Notes

每条包含：title、date、category、summary、media、relatedProject。

## P1-T07 — 写入默认旗舰项目骨架

创建三个项目数据文件或对象：

- PhysicalLink
- AI-Native Hardware Workspace
- BCI × Dexterous Hand

只填写已确定信息；未知结果、数据、比赛成绩不得编造。

**Phase Gate P1**

- 所有 route 可打开
- 所有数据类型 TypeScript 无报错
- 旗舰项目详情页能用占位数据渲染

---

# P2 — Design System（7 Tasks）

## P2-T01 — 实现字体

安装 Geist。

- Geist Sans → UI / titles / body
- Geist Mono → metadata / IDs / status / technical labels

## P2-T02 — 实现 Design Tokens

将本计划颜色、圆角、spacing、max-width 写入 CSS variables / Tailwind theme。

禁止组件内散落随机 hex。

## P2-T03 — 创建基础 Container / Grid

组件：

- `PageContainer`
- `Section`
- `Grid12`

保证 1440 / 1280 / tablet / mobile 行为一致。

## P2-T04 — 创建 Typography 组件

组件：

- Display
- H1
- H2
- H3
- Body
- Meta

## P2-T05 — 创建基础交互组件

仅创建需要的：

- Button
- TextLink
- StatusPill
- MediaFrame
- ProjectIndex
- Divider

## P2-T06 — 创建全局导航

Desktop：顶部透明/白色轻浮层。

Mobile：简洁抽屉菜单。

固定菜单 7 项，不加入多级下拉。

## P2-T07 — 创建全局 Footer

只包含：

- MORGAN DIGITAL UNIVERSE
- one-line mission
- GitHub / Email / Social
- Current year

不做复杂 sitemap。

**Phase Gate P2**

检查至少 `/`、`/experiments`、`/about` 三页视觉基线一致。

---

# P3 — Application Foundation（6 Tasks）

## P3-T01 — 全局 Layout

完成 metadata、font、nav、footer、body background、selection color。

## P3-T02 — Route Transition

Framer Motion 只用于轻量 page fade/translate。

时长 300–450 ms。

不做全屏遮罩式过度动画。

## P3-T03 — Scroll System

默认使用原生滚动。

如确实需要 Lenis，只允许一处全局初始化，并验证 ScrollTrigger 同步。

不要为了“丝滑”强制引入滚动库。

## P3-T04 — Media Component

统一支持：

- next/image
- poster
- video
- caption
- aspect ratio
- lazy loading

## P3-T05 — Project Card System

建立两种卡：

- Featured Experiment Card
- Archive Experiment Row

Featured 只用于前三个旗舰项目。

## P3-T06 — Empty / Pending Asset State

当真实素材缺失：

显示低调灰白占位 + `Evidence pending`。

禁止彩色 skeleton、夸张警告。

**Phase Gate P3**

Build + lint + desktop/mobile route smoke test。

---

# P4 — Entrance & Home（7 Tasks）

## P4-T01 — 首页 Hero DOM 层

首屏必须直接出现：

- `MORGAN DIGITAL UNIVERSE`
- `Building AI Systems That Enter the Physical World.`
- `让智能从屏幕走进现实。`
- CTA: `Explore Experiments`
- Secondary: `View Origin`

不要等 3D 加载后才显示文字。

## P4-T02 — 首页 3D Canvas 容器

Desktop 才预加载 3D。

Canvas 绝对不能阻塞 hero 文本。

添加 loading fallback poster。

## P4-T03 — 首页未来实验室构图

固定构图，不让 Agent 自行换主题：

- 中央：工作台 / workstation
- 左侧：机械臂或灵巧手轮廓
- 右侧：PCB / embedded device / instrument
- 后方：大尺寸屏幕，显示抽象系统图，不显示随机代码
- 空间材质：白、银灰、磨砂金属、深蓝细节
- 光线：冷白主光 + 轻微深蓝环境光 + 极小橙色状态灯

禁止霓虹酒吧感。

## P4-T04 — Entrance 动画

时间总长上限约 4.5 秒，而不是 15 秒强制片头。

流程：

1. 0–0.6s：页面由白/浅灰淡入
2. 0.6–2.0s：实验室从轻微失焦到清晰
3. 1.2–2.8s：桌面关键设备顺序亮起
4. 2.0–3.4s：标题和 CTA 出现
5. 3.4s 后用户完全可控

不做无法跳过的 intro。

## P4-T05 — 首页 Flagship Experiments

紧接 Hero，展示 3 项。

每项必须包含：

- Experiment No.
- Title
- oneLine
- project type
- real evidence preview
- View Experiment

## P4-T06 — 首页 Origin Teaser

使用横向或纵向 4-step chain：

Digital → Intelligence → Hardware → Physical AI

每步只用一句话，不在首页展开履历。

## P4-T07 — 首页 Current Focus

底部增加 Current Focus：

- 当前 2–3 个活跃方向
- 状态：ACTIVE / EXPLORING / BUILDING

数据来自 content 文件。

**Phase Gate P4**

首页在没有 3D 的情况下仍必须完整、可读、可导航；3D 只是增强层。

---

# P5 — Origin / Personal Growth Narrative（6 Tasks）

## P5-T01 — Origin Hero

标题：

`From Digital Systems to Physical Intelligence.`

副文：解释这是“方向演化”，不是传统履历。

## P5-T02 — 四阶段叙事布局

固定四阶段：

### 01 Digital Foundations
建立对数字系统、网络和软件的理解。

### 02 Intelligence
进入 AI、Agent、Computer Vision，开始让软件具备判断能力。

### 03 Building Physical Systems
进入 embedded、PCB、hardware、robotics，把能力从屏幕延伸到现实设备。

### 04 Physical AI
把前面的能力收束到一个问题：AI 如何理解、调用和协同真实世界的机器。

不要把这里写成“我精通所有领域”。

## P5-T03 — Origin Scroll Interaction

Desktop：每阶段进入时，左侧 narrative 固定，右侧视觉/项目证据切换。

Mobile：普通纵向卡片，不使用 pinning。

## P5-T04 — Origin Evidence Links

每个阶段至少链接 1 个真实项目/实验。

如果没有素材则只链接项目页，不创建假图。

## P5-T05 — Turning Point Block

增加一段固定叙事核心：

> AI should not stop at the screen.

中文：

> AI 不应该只停留在屏幕里。

视觉只使用大量留白 + 一张真实硬件/机器人近景。

## P5-T06 — Timeline Strip

在 Origin 最下方保留简洁年份时间线。

时间线只做索引，不重复正文。

**Phase Gate P5**

用户在 60 秒内能理解为什么“网络/AI/硬件/机器人”不是随机技能堆砌，而是同一条路径。

---

# P6 — Experiments / Project Proof System（8 Tasks）

## P6-T01 — Experiments Index

页面分两层：

1. Featured Experiments（3 个）
2. Archive（其他项目）

不使用普通宫格铺满所有项目。

## P6-T02 — Project Detail Hero

每个详情页首屏固定包含：

- Experiment number
- Project title
- oneLine
- status
- year
- role
- stack summary
- hero evidence media

## P6-T03 — Problem Section

固定结构：

- What was broken?
- Why did it matter?

最多 2–4 段，禁止项目开头直接堆技术栈。

## P6-T04 — System / Solution Section

包含：

- 核心方案
- 系统结构图
- 关键数据流
- 技术选择

系统图优先 SVG/DOM，不把所有架构图做成图片。

## P6-T05 — Build Evidence Gallery

展示真实证据：

软件：

- 产品页面
- flow
- terminal / code 少量
- architecture

硬件：

- 实物
- PCB
- 接线
- 结构
- 调试
- 测试

## P6-T06 — Failure Archive in Project

每个旗舰项目必须有：

- What failed
- Why
- What changed
- What I learned

如果项目没有重大失败，可写 limitation，不编故事。

## P6-T07 — Result & Verification

结果必须区分：

- 已完成
- Prototype
- Partial
- Planned

不要把“计划实现”写成“已经实现”。

## P6-T08 — Next Experiment Navigation

页尾：

- Previous / Next Experiment
- Return to Archive

不加相关推荐算法。

**Phase Gate P6**

至少一个旗舰项目从头到尾形成可用详情页，并有真实 evidence slot。

---

# P7 — Capabilities / Lab / Vision / About（8 Tasks）

## P7-T01 — Capabilities 页面定位

禁止传统 skill tags 墙。

固定四组：

1. Understand — AI / CV / Agent
2. Build — Embedded / PCB / Hardware
3. Connect — Protocol / Integration / System
4. Make It Move — Robotics / Physical AI

## P7-T02 — Capability Proof Links

每项能力至少链接一个项目证据。

例如能力条目不是“Python 90%”，而是：

`Agent Systems → Used in [Project]`

## P7-T03 — Lab 首页

Lab 是“真实工作过程”的聚合页。

分为：

- Failure Archive
- Prototypes
- Equipment
- Notes

## P7-T04 — Failure Archive 列表

使用工程日志风格：编号、日期、问题、状态、项目。

视觉类似实验记录，不做红色错误页面。

## P7-T05 — Lab Equipment

只展示真实拥有/使用过的工具和设备。

每项：

- 名称
- 用途
- 关联项目
- 实拍图可选

禁止拿网图冒充个人设备。

## P7-T06 — Vision 页面

固定为三段：

- Now — AI + hardware prototypes
- Next — Physical AI systems
- Long-term — Machines that AI can understand and use

不要写具体无法保证的年份商业承诺。

## P7-T07 — About 页面

About 只回答：

- Who I am
- What I care about
- How I work
- What I am looking for / open to
- Contact

不要复制完整简历。

## P7-T08 — Contact CTA

统一 CTA：

`Build something real.`

下面放 email / GitHub / 合作入口。

没有后端表单时直接 mailto，不引入表单服务。

**Phase Gate P7**

所有一级导航页面内容角色清晰，没有 Skills/Timeline/About 互相重复。

---

# P8 — 3D & Media Production Pipeline（6 Tasks）

## P8-T01 — 3D 资源资产表

建立 `docs/3D_ASSET_MANIFEST.md`。

字段：

- asset name
- source
- license
- original size
- optimized size
- texture resolution
- usage page
- attribution required

## P8-T02 — 实验室场景资源搜集

优先顺序：

1. Blender 自建关键结构
2. Poly Haven 的 CC0 材质/HDRI
3. BlenderKit 的实验室 props/scene 作为基础参考或合法授权资产
4. Sketchfab 仅使用明确允许下载并符合许可的模型

禁止随机搬运 Google 图片或无许可模型。

## P8-T03 — 自制品牌资产

必须自制或依据真实物体重建：

- PCB / development board representation
- robotic arm / dexterous hand simplified representation
- Morgan UI panels
- PhysicalLink schematic visualization

不要直接使用别人的品牌硬件模型假装自己的项目。

## P8-T04 — Blender → GLB Pipeline

每个场景：

1. 清理 unseen geometry
2. Apply transforms
3. 合理 merge meshes
4. 降低材质数量
5. 纹理 resize
6. Export `.glb`
7. 使用 gltfjsx `--transform`
8. 检查最终体积

## P8-T05 — R3F 性能实现

要求：

- 重复 geometry/material 复用
- 能实例化的实例化
- 不在 `useFrame` 中 setState
- 静止场景考虑 frameloop demand
- interaction 时动态降 DPR/效果
- heavy effects 可降级

## P8-T06 — 视频 Pipeline

真实项目视频统一：

- 16:9 主版
- 9:16 可选社媒版不进入网站主流程
- 1080p 足够网页展示
- 无声音自动播放必须 muted
- 默认不自动播放超过 10 秒的项目视频
- 每条视频生成 poster

**Phase Gate P8**

入口 3D 与至少一个项目媒体区域可实际运行，且素材来源和许可有记录。

---

# P9 — Responsive / Performance / Accessibility（5 Tasks）

## P9-T01 — 响应式矩阵

至少人工检查：

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 390×844
- 360×800

修复横向溢出、文字截断、sticky 失效。

## P9-T02 — Mobile 3D Fallback

390 px 宽设备默认：

- 不加载完整 Canvas
- 使用 poster 或短预渲染 media
- 提供可选 `View 3D` 按钮

## P9-T03 — 图片与字体优化

- 所有照片优先 next/image
- width/height 或 fill 容器明确
- 非首屏 lazy
- 主首屏 priority 只给真正 LCP asset
- 字体用 Next / Geist 推荐方式自托管/优化

## P9-T04 — Accessibility

检查：

- 语义 heading 层级
- 键盘导航
- focus visible
- alt 文本
- 视频 caption 如有语音
- reduced motion
- 对比度

## P9-T05 — Core Web Vitals 优化

使用 Lighthouse / Chrome DevTools / Web Vitals 检查。

最终目标：

- LCP ≤2.5 s
- INP ≤200 ms
- CLS ≤0.1

如果 3D 导致不通过，优先牺牲 3D 特效，不牺牲文本和项目内容。

**Phase Gate P9**

移动端完整可用；3D 不是访问前提；性能达到目标或记录明确剩余瓶颈。

---

# P10 — SEO / Metadata / Analytics / Deployment（4 Tasks）

## P10-T01 — Metadata

每页设置：

- title
- description
- canonical
- Open Graph
- Twitter/X preview

项目详情 metadata 从 project content 自动生成。

## P10-T02 — Structured Data

只加入实际适合的 Person / WebSite 基础 structured data。

不要滥加虚假 Organization、Award、Product rating。

## P10-T03 — Analytics

只接一个轻量 analytics 方案。

事件：

- project_open
- evidence_open
- github_click
- contact_click
- origin_complete

不要追踪鼠标热图等高侵入方案作为默认。

## P10-T04 — Deployment

默认部署 Vercel。

检查：

- production env
- custom domain placeholder
- 404
- robots
- sitemap
- image domains
- cache headers

**Phase Gate P10**

生产环境可访问，分享卡正常，主要事件可记录。

---

# P11 — Final QA & Handoff（4 Tasks）

## P11-T01 — 内容真实性审计

逐项目检查：

- 是否把 planned 写成 done
- 是否有 AI 图冒充实物
- 是否有无来源比赛/奖项/数字
- 是否有无证据“精通”“领先”等夸张表述

发现则改为准确状态。

## P11-T02 — 视觉审计

逐页检查：

- 是否出现大面积黑底
- 是否出现霓虹 cyberpunk
- 是否组件样式失控
- 是否卡片过多
- 是否每段都在动
- 是否 3D 抢正文

## P11-T03 — 完整回归

执行：

- clean install
- lint
- typecheck
- build
- production start
- route check
- external link check
- responsive check
- Lighthouse desktop/mobile

## P11-T04 — 最终交接包

输出：

1. `README.md` — 运行方式
2. `AGENTS.md` — Agent 规则
3. `docs/EXECUTION_STATUS.md` — 74 tasks 状态
4. `docs/ASSET_GAPS.md` — 仍需用户补充的真实素材
5. `docs/CONTENT_SOURCE_MAP.md` — 每段内容来源
6. `docs/3D_ASSET_MANIFEST.md` — 3D 来源与许可
7. 最终 URL

最终汇报只说：

- 已经完成哪些用户可见功能
- 哪些真实素材仍缺失
- 性能指标
- 已知限制

不要汇报“改了多少行代码”。

---

# 7. 素材拍摄与生成清单

## 7.1 个人素材

需要真实素材：

- 正面/侧面自然工作照 3–5 张
- 比赛/现场工作照 5–10 张
- 硬件工作台照片 3–5 张

推荐拍摄：

- 35mm 等效环境人像
- 50mm 等效半身
- 70–85mm 等效手部/设备细节

光线：自然冷白，不使用电竞 RGB 灯。

## 7.2 软件项目素材

每项目最低：

- Hero screenshot 1
- 核心页面 3–6
- 关键流程录屏 1
- 系统结构图 1
- GitHub / source link 如可公开

## 7.3 硬件项目素材

每项目最低：

- 完整实物 1
- 45° hero 1
- PCB 正反 2
- 关键接口 2–4
- 制作过程 3–6
- 工作状态视频 1
- 失败/调试过程 1–3（如存在）

## 7.4 AI 允许生成的视觉

可以 AI 生成：

- 抽象实验室背景
- Physical AI 概念空间
- 不对应真实成果的章节过渡画面
- 风格化结构背景

必须明确是“氛围视觉”，不能放在 Evidence 标签下。

---

# 8. 首页具体信息顺序

最终首页严格按以下顺序：

1. Hero + 3D enhancement
2. Flagship Experiments ×3
3. Origin Teaser
4. Selected Evidence Strip
5. Current Focus
6. Contact CTA
7. Footer

禁止在首页加入完整 Skills、完整 Timeline、完整 About。

---

# 9. Project Detail 固定信息顺序

所有项目统一：

1. Project Hero
2. What was broken?
3. The idea
4. System / Architecture
5. Build process
6. Evidence
7. Failure / limitation
8. Result / current state
9. What I learned
10. Related / next experiment

执行 Agent 不得每个项目重新设计一套详情结构。

---

# 10. 资源链接

## Agent / 执行方法参考

- OpenAI Codex: https://openai.com/index/introducing-codex/
- OpenAI Harness Engineering: https://openai.com/index/harness-engineering/
- Anthropic Building Effective Agents: https://www.anthropic.com/engineering/building-effective-agents

## Web / UI

- Next.js Docs: https://nextjs.org/docs
- Next.js Lazy Loading: https://nextjs.org/docs/app/guides/lazy-loading
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Geist Font: https://vercel.com/font
- Lucide: https://lucide.dev/

## 3D

- React Three Fiber: https://r3f.docs.pmnd.rs/
- R3F Performance: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- R3F Performance Pitfalls: https://r3f.docs.pmnd.rs/advanced/pitfalls
- gltfjsx: https://github.com/pmndrs/gltfjsx
- Blender glTF: https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html

## 3D Assets / Materials

- Poly Haven: https://polyhaven.com/
- Poly Haven License: https://polyhaven.com/license
- BlenderKit: https://www.blenderkit.com/
- BlenderKit Sci-Fi Robotic Lab example: https://www.blenderkit.com/asset-gallery-detail/49d59b62-c184-4f12-99e0-dbcb3f919767/
- Sketchfab: https://sketchfab.com/

## Performance

- Web Vitals: https://web.dev/articles/vitals
- Core Web Vitals Thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds

---

# 11. Agent 启动提示词

把下面内容与本文件一起交给执行 Agent：

> 你现在负责继续开发 MORGAN DIGITAL UNIVERSE。`MORGAN_Digital_Universe_Agent_Execution_Master_Plan_V1.0.md` 是唯一执行计划，不要重新做产品规划，不要重新选择技术栈，不要重新设计网站架构。先读取 `AGENTS.md`、本计划、`docs/EXECUTION_STATUS.md`，找到第一个非 DONE task，从该 task 继续推进。严格执行 task 的操作与验收标准。素材缺失按照 `ASSET_GAPS.md` 机制处理，不要停下等待用户决定，不允许用 AI 伪造真实项目证据。每个 Phase 完成后再执行完整 gate 验证。最终汇报功能结果、素材缺口、性能和限制，不汇报代码行数。

---

# 12. 最终成功标准

网站最终不是“一个很酷的 3D 个人主页”。

真正成功的判断标准是：

> 一个第一次认识 Morgan 的人，在一分钟以内能理解他的方向，在五分钟以内能找到真实项目证据，并形成“这个人能把 AI、软件、硬件和真实机器连接起来，而且有明确长期方向”的认知。

如果视觉效果与这一目标冲突，优先保留真实内容、项目证据、清晰叙事和性能。

---

# 13. V1.2 文档、真实内容与生产交付全量收口计划

> 生效日期：2026-09-27。此章节是本文件的后续执行段，不是第二份计划。执行状态以 `docs/EXECUTION_STATUS.md` 的 C0–C10 为准。V1.1 已完成页面系统和视觉基线，但不能据此把事实内容、真实 Evidence、正式发布或最终交接判定为完成。

## 13.1 当前完成度审计结论

| 范围 | 当前已有 | 仍未完成 | 完成证据 |
|---|---|---|---|
| Profile / Contact | 品牌、方向、Current Focus | location、email、GitHub、social links、公开方式确认 | `profile.ts` 无必要 `null`，所有链接可访问 |
| Origin | 四阶段英文结构与视觉 | 4 个真实时间段；Digital / Intelligence 阶段证据；Turning Point 真实近景 | 每阶段至少 1 个经确认项目或记录，真实照片已入仓 |
| PhysicalLink | 项目名称、类型、摘要、页面骨架 | 时间、职责、问题、系统、协议、stack、失败、结果、指标、全部真实证据 | 完整 Case Study + Evidence 验证清单 |
| AI-Native Hardware Workspace | 项目名称、类型、摘要、页面骨架 | 同上；产品截图、真实设备输出、流程录屏、系统图 | 完整 Case Study + Evidence 验证清单 |
| BCI × Dexterous Hand | 项目名称、类型、摘要、页面骨架 | 同上；信号输入、控制链路、真实延迟/失败、实验视频 | 完整 Case Study + Evidence 验证清单 |
| Evidence | 类型守卫、pending UI、8 条证据槽 | 文件、caption、拍摄日期、公开许可、claim 映射 | `isVerified=true` 的每项同时满足文件、许可、caption、claim |
| Capabilities | 四组 proof matrix | 当前只链接项目页，尚未链接已核验 Evidence | 每项能力指向具体 Evidence anchor |
| Lab | 页面与数据模型 | 真实 Failure、Prototype、Equipment、Note 条目目前为 0 | 至少形成可浏览的真实日志索引，空分类隐藏 |
| About | 四组短事实 | 真实 portrait、公开联系方式与事实确认 | Portrait 入仓并经公开许可确认 |
| 3D | 可运行自建 GLB、poster、manifest | Blender 正式组装、gltfjsx transform、Meshopt、三角面和 draw call 实测 | 新版本 GLB + Blender 源文件/生成记录 + 性能表 |
| 视频 | 槽位、延迟加载、字幕接口、提示词和拍摄 brief | 真实项目视频及 poster；氛围视频可按用户选择保持未生成 | 视频文件、poster、caption/字幕、许可和页面验证 |
| SEO / Analytics / Deployment | metadata 基线、robots、sitemap、事件代码 | 真实 production URL、每页 OG 校验、实际 analytics 接收端、Vercel 发布 | 线上 URL、分享卡、事件接收和外链检查 |
| Final QA / Handoff | 本地构建与响应式样例 | clean install、部署环境 Lighthouse、外链、真实媒体加载和最终内容审计 | C10 验收包全部通过 |

## 13.2 最终完成定义

全量完成不是“页面不报错”，而是同时满足：

1. 三个旗舰项目的事实字段全部由用户确认；未知字段不得用推断补齐。
2. 每个页面只发布有来源的事实；每个可验证 claim 能回到一个 Evidence、日志、链接或用户确认记录。
3. 三个项目均完成固定十段结构；无内容的章节不得用空白占位冒充完成。
4. 首页 Selected Evidence、Capabilities proof、Origin evidence 和 Lab 均由真实材料驱动。
5. 真实素材具备文件名、caption、日期、公开许可、provenance 和验证状态。
6. 项目视频如进入网站，必须是真实录制；生成视频只属于 atmosphere。
7. 正式 Blender 场景或经用户接受的版本化替代资产完成优化、manifest 和运行预算验证。
8. Production URL 可访问，analytics、OG、robots、sitemap、外链和 Core Web Vitals 均在部署环境验证。
9. `EXECUTION_STATUS.md` 不再有生产范围内的 `TODO` / `IN_PROGRESS` / `BLOCKED_ASSET`；`ASSET_GAPS.md` 不再有必须素材的 `PENDING`。
10. README、状态、资产表、内容映射、提示词、QA 和最终 URL 相互一致。

氛围视频是唯一允许不生成的视觉项：用户已经确认视频部分可以留空，因此“提示词、槽位、首帧和规格已交付”即可视为该氛围视频任务完成。真实项目视频仍属于 Evidence，不得用生成视频替代。

## 13.3 责任边界

| 责任方 | 必须完成 |
|---|---|
| 用户 | 提供并确认项目事实、真实文件、portrait、真实项目视频、公开许可、联系方式和最终发布授权 |
| 实现者 | 英文编辑、字段归一化、Evidence 校验、SVG/DOM 系统图、图片与视频处理、3D、页面集成、metadata、性能、部署和文档同步 |
| 双方确认 | 每个项目的最终 state、结果表述、指标来源、caption、第三方贡献、可公开范围和最终上线版本 |

任何事实输入必须经历 `SUBMITTED → NORMALIZED → USER_CONFIRMED → PUBLISHED`。只有 `USER_CONFIRMED` 才能进入用户可见正文；只有文件存在、caption 完整、许可确认且 claim 映射明确的项目媒体才能成为 `VERIFIED` Evidence。

## 13.4 依赖顺序

```text
C0 文档真实性校准
  └─ C1 资料与发布权限锁定
      ├─ C2 Profile / Origin / About
      ├─ C3 PhysicalLink 样板
      ├─ C4 AI-Native Hardware Workspace
      └─ C5 BCI × Dexterous Hand
          └─ C6 跨页面 Evidence / Capabilities / Lab 收口
              ├─ C7 正式 3D 与静态媒体收口
              └─ C8 真实视频与可选氛围视频收口
                  └─ C9 Production / SEO / Analytics 发布
                      └─ C10 最终 QA、文档和交接
```

C2–C5 可在事实包分别确认后并行编辑，但 C6 必须等三个项目的 Evidence ID 稳定后执行；C9 必须等内容和公开许可锁定后执行。

## C0 — 文档真实性校准

### C0-T01 — 纠正“脚手架 DONE = 内容 DONE”

- 在 `EXECUTION_STATUS.md` 增加 C0–C10 生产收口状态。
- 保留 P0–P11 作为历史实现记录，但不得再用它们证明生产内容已完成。
- 对 P5、P6、P7、P8、P10、P11 中尚无事实证据的 DONE 给出明确覆盖说明。

### C0-T02 — 建立缺口的唯一编号

- 内容缺口使用 `CONTENT-*`。
- Evidence 缺口使用 `EVIDENCE-*`。
- 资产缺口使用 `ASSET-*`。
- 发布缺口使用 `RELEASE-*`。
- 所有编号只在主计划、`PROJECT_CONTENT_INTAKE.md`、`ASSET_GAPS.md` 和 `EXECUTION_STATUS.md` 间引用。

**Gate C0**：所有当前未完成项能在本章节找到唯一任务和后续完成证据。

## C1 — 资料采集、真实性与公开权限锁定

### C1-T01 — Profile 发布资料

用户确认：公开姓名、location 粒度、email、GitHub、其他 social link、是否允许公开 portrait、希望收到的合作类型。

### C1-T02 — 三个项目事实包

每个项目必须完整提交：

- date / date range、current state、team size、Morgan role、第三方贡献。
- 原始问题、用户/场景、为什么重要、约束。
- inputs、processing、hardware/device、outputs、协议、接口、软件 stack、硬件 stack。
- Morgan 设计和实现的部分、关键技术选择。
- failure / limitation、原因、修改、结果、指标和指标来源、lessons、next step。
- 可公开链接以及不能公开的字段。

### C1-T03 — Evidence manifest

每个文件提交时必须带：建议文件名、原始文件名、capture date、caption、project、section、证明的 claim、作者/所有者、公开许可、是否需打码、是否含第三方品牌或个人信息。

实现记录（2026-09-27）：代码层已建立 8 个稳定 Evidence anchor、verification state、permission / claim / owner / capture-date 字段和自动一致性检查；真实文件与用户确认仍按 Gate C1 保持阻塞。

实现记录（2026-09-28）：已审计 `E:\C_Projects\ai硬件`、`E:\C_Projects\机械臂`、PhysicalLink 母文档与公开 GitHub 账号，建立 `docs/LOCAL_PROJECT_SOURCE_AUDIT.md`，并把三个项目推进到 `NORMALIZED`。本步骤只证明资料已定位和事实已标准化，不等于公开许可或用户确认；Gate C1 仍未通过。

### C1-T04 — 不确定项处理

- 用户无法确认的字段继续为 `null`，并从公开章节移除。
- 不使用“据项目名推断”的任何技术栈、团队、性能或结果。
- 公开权限不明确的文件只能进入隔离 intake 目录，不能进入 `public/`。

**Gate C1**：三个项目的 intake 均由用户确认；每个待用文件都有公开权限结论。

## C2 — Profile、Origin 与 About 内容收口

### C2-T01 — Profile / Contact

- 写入最终公开联系方式和链接。
- 验证全部链接、mailto 和 analytics 事件。
- Contact CTA 从 “available on request” 切换为真实入口。

### C2-T02 — Origin 事实化

- 为四阶段填写真实 `yearRange` 或明确的无年份索引方式。
- Digital Foundations 和 Intelligence 各绑定至少一项真实项目、学习记录或 Archive item。
- 每阶段最多两句事实化正文，不写虚构成长故事。
- Timeline 只显示已确认节点。

### C2-T03 — About / Portrait

- 从用户提供的 3–5 张工作照选择 1 张主 portrait 和 1 张备用裁切。
- 确认四组 About 短事实，避免泛化人格营销。
- Origin Turning Point 使用真实硬件/手部近景，不使用生成图。

**Gate C2**：Profile 无发布所需 `null`；Origin 四阶段都有真实依据；About portrait 和 caption 已验证。

## C3 — PhysicalLink 完整 Case Study（首个验收样板）

### C3-T01 — 内容编辑

完成固定顺序：Problem → Idea → System → Build → Evidence → Failure → Result → Lessons → Next。首页摘要保持 18–32 个英文单词；详情页每个核心说明约 80 词以内。

### C3-T02 — 系统图

基于用户确认信息制作 SVG/DOM 架构图，至少标出真实 input、processing、hardware interface、output、协议和边界；不出现推测模块。

### C3-T03 — 最低 Evidence 包

- 完整实物和 45° Hero。
- PCB 正反面。
- 关键接口 2–4 张。
- 制作/接线/调试过程 3–6 张。
- 一段连续真实工作演示及 poster。
- 至少一项真实 failure / limitation 记录；如果不存在重大失败，使用经确认 limitation。
- 可公开的 schematic、日志、文档或 source link。

### C3-T04 — Claim verification

建立 claim → evidence 映射；没有证据的性能、稳定性、完成度和所有权表述删除或降级。

**Gate C3**：PhysicalLink 是从 Hero 到 Next 全部可读、有真实媒体、有失败和结果边界的验收样板；用户书面确认最终版本。

## C4 — AI-Native Hardware Workspace 完整 Case Study

### C4-T01 — 内容与系统链路

确认自然语言输入、系统处理、工具/agent 层、硬件接口、真实设备输出、错误处理和安全边界。

### C4-T02 — 最低 Evidence 包

- Hero screenshot 1 张。
- 核心界面/状态 3–6 张。
- 从指令输入到真实设备输出的 1080p 录屏及 poster。
- SVG/DOM 系统结构图 1 张。
- 真实终端、日志或设备输出记录。
- 至少一项失败、限制或错误恢复记录。
- 可公开 repository / document / demo link。

### C4-T03 — 隐私处理

隐藏 API key、账户、私人路径、设备序列号和第三方敏感信息；保留足以证明真实行为的上下文。

**Gate C4**：读者能从界面、系统图和真实输出证明“自然语言确实驱动了真实硬件”，而不是只看到概念 UI。

## C5 — BCI × Dexterous Hand 完整 Case Study

### C5-T01 — 内容与控制链路

确认信号来源、采集/预处理、意图映射、控制接口、手部动作、采样/延迟、失败条件和安全限制。

### C5-T02 — 最低 Evidence 包

- 实验全景 Hero。
- 信号输入流程截图或日志。
- 机械手广角与细节照片。
- 同时看到输入流程与机械手动作的一次完整真实尝试及 poster。
- 真实延迟、失败或 limitation 记录；不得通过剪辑制造不存在的性能。
- SVG/DOM 控制链路图。
- 可公开的测试文档、代码或实验记录。

### C5-T03 — 结果边界

明确区分 intentional control、mapping demo、prototype、partial result 和 planned work；不把相关性写成稳定控制能力。

**Gate C5**：页面能明确回答信号如何进入、如何变成动作、实际做到什么、哪里失败以及下一步是什么。

## C6 — 跨页面 Evidence、Capabilities、Origin 与 Lab 收口

### C6-T01 — Evidence ID 与锚点

- 每个验证媒体分配稳定 ID。
- Capabilities 从项目首页链接改为具体 Evidence anchor。
- Origin 阶段链接到真实项目或 Lab 记录。
- 首页 Selected Evidence 在至少 3 项验证证据可用后切换为非对称 mosaic。

实现记录（2026-09-27）：稳定 ID 和首页 / Capabilities / Origin → Evidence anchor 的条件链接已完成。当前 8 项全部为 pending，因此页面不会把未核验项目页链接展示成 proof。

### C6-T02 — Lab 真实日志

只从三个项目的已确认材料生成：

- Failure Archive：问题、日期、原因、状态、关联项目。
- Prototypes：版本、目标、变化、当前状态。
- Equipment：真实使用设备、用途、关联项目，可选实拍。
- Notes：有日期和上下文的工程记录。

不要求为了填满分类而编造条目；没有真实条目的分类隐藏。至少形成一条可追踪的 build → failure/limitation → change 链路。

### C6-T03 — Archive

完整盘点所有本地与 GitHub 项目，把每一个确认属于 Morgan 的独立项目加入 Experiments Archive，不设数量上限。资料未齐时保留项目目录条目并标记 pending；归属或公开许可未确认时只保留在内部清单，确认后再公开对应内容。多个仓库可归并到同一项目，工具、fork、参考库和发布镜像按真实关系注明；不得为缩减数量而遗漏独立项目，也不得编造事实。

**Gate C6**：Capabilities、Origin、首页 Evidence 和 Lab 的每条 proof 都能落到真实材料；无循环自证。

## C7 — 正式 3D、图片与资产生产收口

### C7-T01 — Blender 前置

- 启动可连接 Blender 环境。
- 保留当前程序化 GLB 作为版本 01，不覆盖。
- 为 Blender 正式场景创建版本 02 和源文件记录。

### C7-T02 — 独立对象生产与组装

分别制作/整理：六轴机械臂、五指灵巧手、概念控制板、台式仪器、工作台、支架、双屏和空间结构；统一比例、命名、拓扑、材质、灯光和镜头。

### C7-T03 — 优化与验证

- 执行 apply transforms、清理不可见几何、合并合理 mesh、复用 geometry/material。
- 使用 gltfjsx `--transform` 和 Meshopt；记录命令与版本。
- 实测三角面 ≤150k、材质 ≤12、draw calls ≤70、GLB ≤8MB。
- 普通纹理 1K，只有关键近景 2K。
- 更新 `3D_ASSET_MANIFEST.md` 的源文件、许可、原始/优化体积、纹理、三角面、draw calls。

### C7-T04 — 最终派生图

使用选定正式场景重新输出 desktop poster、mobile poster 和 OG；新文件使用版本号，不覆盖旧文件；逐项检查构图、文字可读性和预算。

**Gate C7**：正式资产在 desktop/tablet/mobile 策略中通过运行与预算验证，并由用户确认视觉版本。

## C8 — 视频收口

### C8-T01 — 真实项目视频

- 按 `VIDEO_PROMPTS.md` 的 capture brief 拍摄三个项目视频。
- 转码为网站版本，生成 ≤300KB poster。
- 有语音时生成并校对英文字幕轨。
- 确认视频 caption、日期、许可和证明的 claim。
- 页面保持视口附近才加载 metadata；超过 10 秒不自动播放。

### C8-T02 — 可选氛围视频

Home 8 秒和 Vision 6 秒视频由用户按现有提示词生成后交回；实现者检查首帧一致性、几何漂移、随机文字/logo、水印、霓虹色和循环接缝。用户不生成时保持静态 poster，任务不阻塞发布。

**Gate C8**：真实项目视频只能出现在 Evidence；生成视频只能标记为 atmosphere；空视频不会产生网络请求。

## C9 — Production、SEO、Analytics 与发布

### C9-T01 — Metadata matrix

- 每页验证 title、description、canonical、Open Graph、Twitter/X preview。
- 三个项目生成项目级 title、description 和可公开分享图；若不能使用真实证据，使用中性品牌合成，不伪造项目媒体。
- 验证 JSON-LD 只包含真实 Person / WebSite 字段。

### C9-T02 — Analytics 实际接收

配置唯一 analytics 接收方案并在 production 验证 `project_open`、`evidence_open`、`github_click`、`contact_click`、`origin_complete`；不采集热图或敏感输入。

### C9-T03 — Vercel 发布

- 建立 Git remote、提交可发布版本、部署 Vercel。
- 配置真实 `NEXT_PUBLIC_SITE_URL` 和 analytics 环境变量。
- 验证 final URL、404、robots、sitemap、缓存、OG 抓取和所有外链。
- README 写入最终 URL 和实际部署步骤，删除未执行的“已部署”表述。

**Gate C9**：公开 URL 可访问，分享卡和事件真实工作，文档中不存在 placeholder production URL。

## C10 — 最终 QA、文档一致性与交接

### C10-T01 — Clean-room 回归

- 补齐并验证文档要求的 `check:lint` script，确保命令表与 `package.json` 一致。
- 在干净环境执行 `pnpm install --frozen-lockfile`、lint、typecheck、build、production start。
- 全路由、真实媒体、外链、Evidence anchor、404、robots 和 sitemap smoke test。
- 复查 6 个锁定 viewport。

实现记录（2026-09-27）：`check:content`、`check:lint` 和 metadata matrix 已接入；最终 clean install、真实媒体和部署环境回归仍需等待 C1–C9。

### C10-T02 — 部署环境 QA

- Lighthouse desktop / mobile，目标 LCP ≤2.5s、INP ≤200ms、CLS ≤0.1。
- 验证移动端初始网络无 GLB/WebGL bundle 和视频。
- 键盘、focus、heading、alt、字幕、对比度和 reduced motion 完整检查。
- 检查 Three.js、资源 404、hydration 和 console 警告。

### C10-T03 — 内容与真实性签字

- 用户逐项目确认事实、结果、第三方贡献、caption、公开许可和最终状态。
- 实现者审计夸张 claim、planned/done 混淆、生成资产混入 Evidence、无来源数字和隐私泄露。

### C10-T04 — 文档全量同步

最终逐项更新：

1. 本主计划：C0–C10 验收结论。
2. `DECISIONS_LOCKED.md`：最终发布覆盖和任何经用户确认的变更。
3. `EXECUTION_STATUS.md`：生产任务全部真实状态。
4. `ASSET_GAPS.md`：必须素材全部 PROVIDED / VERIFIED。
5. `CONTENT_SOURCE_MAP.md`：所有新增内容来源。
6. `PROJECT_CONTENT_INTAKE.md`：保留确认记录，不再作为公开文案。
7. `3D_ASSET_MANIFEST.md`：最终选用版本及预算。
8. `IMAGE_PROMPTS.md` / `VIDEO_PROMPTS.md`：实际使用版本、工具、文件和选择结果。
9. `QA_V1.1.md` 或后续版本：替换为部署环境最终报告。
10. `README.md`：最终 URL、运行、内容更新、媒体和部署说明。

**Gate C10 / 全项目完成**：所有生产必需任务为 DONE，所有必须真实素材已验证，线上版本通过最终 QA，用户可以从项目页找到真实证据，文档与仓库/线上状态完全一致。

---

# 14. V1.3 页面与内容收口实施段

> 生效日期：2026-09-28。本节并入唯一主计划，不替代第 13 节 C0–C10 的生产完成关卡。

## 14.1 13 个输出口径

本轮固定为 10 个用户页面与 3 个技术输出：

1. `/`
2. `/origin`
3. `/experiments`
4. `/experiments/physical-link`
5. `/experiments/ai-native-hardware-workspace`
6. `/experiments/bci-dexterous-hand`
7. `/capabilities`
8. `/lab`
9. `/vision`
10. `/about`
11. 品牌化 404
12. `/robots.txt`
13. `/sitemap.xml`

## 14.2 双层完成状态

- `PAGE_COMPLETE`：页面结构、视觉、响应式、英文内容结构、集中式空状态和技术行为已完成。
- `PRODUCTION_COMPLETE`：事实确认、公开许可、真实 Evidence、Blender V02、生产域名、analytics 和线上 QA 全部通过。
- P4–P7 的历史 DONE 只代表第一版脚手架；V1.3 的页面完成情况以 `docs/EXECUTION_STATUS.md` 的 13 输出矩阵为准。

## 14.3 发布与真实性边界

- 用户在本轮确认：本地项目、日志、截图和公开 GitHub 内容全部保持待确认。
- 候选资料不得复制到 `public/`，不得进入用户可见详细正文，不得设置 `isVerified=true`。
- 三个项目增加独立 `publicationStatus`；未发布项目使用集中式 `Publication review`，并从 sitemap 排除、设置 `noindex`。
- 项目十段结构继续保留，但没有确认内容的章节完全不渲染；所有待补字段和 Evidence 只集中出现一次。
- 页面开发不等待缺失素材；缺失素材继续阻止 C1–C8 和最终 `PRODUCTION_COMPLETE`。

## 14.4 页面实施规则

- 首页采用 Launch composition、交替 editorial project bands、四阶段路径、单条 Evidence 状态和三行 Current Focus。
- Origin 在无确认年份时不渲染虚假时间线刻度；未经发布的项目和 Evidence 不作为 proof 链接。
- Experiments 与项目详情使用抽象技术索引视觉，并明确标注 `Not evidence`；不使用生成图填充项目成果。
- Capabilities 只链接 verified Evidence；Lab 空分类隐藏；About 无 portrait 时只显示紧凑真实素材状态。
- 404 使用品牌视觉；robots 在未配置真实域名时禁止抓取且不声明虚假 sitemap URL；sitemap 只收录实际发布页面。
- 无 JavaScript 时核心文字、导航和静态 poster 仍可见；移动端初始网络不得请求 GLB 或 3D 运行包。

## 14.5 V1.3 Gate

- `pnpm check:content`、`pnpm check`、`pnpm check:build` 全部通过。
- 13 个输出完成 production-start smoke test。
- 六个锁定 viewport 完成截图检查；无横向溢出、巨型空章节和同构 SaaS 卡片主结构。
- C1–C10 仍按真实资料、Blender V02 和生产发布证据单独验收，不以 PAGE_COMPLETE 代替。

实施记录（2026-09-28）：13 个输出均完成本地 production-start smoke test，页面矩阵已标记 `PAGE_COMPLETE`；`pnpm check:build`、无 JavaScript 首页、移动端初始资源与 6 个 viewport 均已核验。Local Lighthouse 为 mobile 96/100/100、desktop 98/100/100（Performance / Accessibility / Best Practices）；移动模拟 LCP 2.8s，仍高于 2.5s 目标，因此 R8 和 C10 不转为生产 DONE。完整结果见 `docs/QA_V1.3.md`。

视觉资产补充记录（2026-09-28）：新增 6 张 ImageGen concept atmosphere WebP，分别覆盖三个旗舰项目、Origin 的 Intelligence / Physical Systems 阶段和 Vision 主场景；单图 63–121KB。所有入口由 `AtmosphereFrame` 强制标注 `Generated / not evidence`，并由 `src/content/atmosphere.ts` 与内容审计约束，未进入 Evidence Gallery、Lab 或 About portrait。

---

# 15. V1.4 私人数字实验室与视频空间实施段

> 生效日期：2026-09-29。本节并入唯一主计划，是用户对首页媒介优先级和视觉表现的明确覆盖，不改变 13 个输出、真实性关卡、固定导航与项目顺序。

## 15.1 视觉目标

- 网站不是企业官网、SaaS 页面或简历卡片集合，而是 `MORGAN / DIGITAL LAB`：一个可进入、可探索、持续运行的私人实验室。
- 首页空间本身承担第一导航层；设备热点进入三个旗舰实验，Archive/Index 作为空间之上的信息层。
- 保留冷白、银灰、深蓝和信号橙，但减少深蓝整块横幅、固定白卡、圆角容器和均匀企业栅格的视觉占比。
- 项目详情继续保持工程档案属性；空间氛围不能覆盖或替代真实证据结构。

## 15.2 媒介职责

- 视频：空间、光线、轻微机械动作和情绪。
- HTML：品牌、标题、导航、热点、状态、键盘焦点和 reduced-motion 行为。
- 生成图片：视频 poster、移动端 fallback、未生成镜头的概念聚焦图。
- 真实照片、录屏、日志和项目视频：只进入 Evidence，继续经过 C1–C6 真实性关卡。
- 3D：后续增强层；V01/V02 不再阻止视频优先的首页视觉成立，但 C7 的正式 3D 生产状态仍按原 Gate 单独记录。

## 15.3 本轮选用素材

1. Home：`home-lab-idle-video-01.mp4`，桌面延迟加载；移动端和 reduced motion 使用 poster。
2. PhysicalLink：`home-to-physical-link-video-01.mp4`，只作为概念氛围入口并显示 `Generated / not evidence`。
3. Vision：`vision-signal-chain-video-01.mp4`，用于信号到物理动作的宽幅氛围窗口。
4. AI Workspace / BCI：不要求补生成视频，首页使用同一实验室宽景的 HTML 热点，详情继续使用现有概念静态图。

## 15.4 页面实施

- Home 改为近全屏空间画面，品牌主标题直接叠在空间上；设备热点是可聚焦的真实链接，不使用弹窗卡片。
- Experiments 顶部改为空间持续存在、实验档案层覆盖其上的索引构图；详细项目条带仍在下方提供信息。
- Nav 改为轻量品牌栏 + 全屏 `INDEX`，七项固定导航保持不变。
- Contact 与 Footer 改为轻量工程信息带，取消大面积深蓝官网 Banner。
- PhysicalLink 和 Vision 接入生成视频；页面仍明确区分概念氛围与真实 Evidence。

## 15.5 性能与降级

- 生成视频派生文件均移除音轨，单个小于 5MB，并提供匹配 poster。
- 仅 Desktop ≥1024px 且非 reduced motion 时请求氛围视频；Mobile 初始只请求 poster。
- 视频失败、自动播放失败或 reduced motion 时保持完整静态画面、文字和链接。
- 用户提供的生成源文件保留不覆盖；网站只使用规范命名的处理后派生文件。

**Gate V1.4**：`pnpm check:build` 通过；Home、Experiments、PhysicalLink、Vision 在 desktop/mobile poster 降级下可用；移动端不请求视频；生成视频不进入 Evidence。

---

# 16. V1.5 UI UX 全站改造实施段

> 生效日期：2026-09-29。本节并入唯一主计划。设计依据为 `personal_website_uiux_v1.docx`；保留现有 13 个输出、七项导航和三个旗舰项目。

## 16.1 实施目标

- 首页从单独空间 Hero + 普通页面区块，改为一个连续的空间叙事；正常纵向滚动驱动固定媒体层、项目窗口、文字和章节进度。
- 首页采用视频先行、3D 增强。V1.5 页面不等待 Blender，但 C7 仍需 V02 才能完成。
- Experiments 改为纯 DOM 项目索引；详情页回归可读的工业案例；其余页面统一为实验室索引语言。
- 生成 atmosphere、真实 Evidence 和 self-authored 3D 的来源边界保持不变。

## 16.2 首页时间轴

- `0–10%` Entry：实验室空间、品牌和三行 metadata。
- `10–24%` Identity：媒体轻微推进，标题收缩为索引。
- `24–36%` PhysicalLink：概念视频窗口与 `OPEN CASE`。
- `36–48%` AI Workspace：概念图片窗口，不请求缺失视频。
- `48–60%` BCI Hand：概念图片窗口与项目入口。
- `60–78%` Origin / Evidence：系统路径与集中式 documentation 状态。
- `78–100%` Now / Exit：Current Focus、Contact 与 Footer 自然滚动。

## 16.3 工程边界

- 保留原生滚动；只建立一个 Home ScrollTrigger 主时间轴，不引入 Lenis，不强制 snap。
- 视频只按视口播放/暂停，不逐帧修改 `currentTime`；每屏最多一个媒体主视觉和一个文字层运动。
- Mobile、tablet 与 reduced motion 使用 poster + 自然纵向章节；初始请求不得包含 MP4、GLB 或 Three.js 页面包。
- Next 16 / React 19 ViewTransition 只用于项目媒体到详情 Hero 的渐进增强；不支持时普通淡入。

## 16.4 页面 Gate

- Home、Origin、Experiments、三个详情页、Capabilities、Lab、Vision、About 与 404 完成统一视觉改造。
- robots 与 sitemap 保持现有安全行为，不新增路由。
- 受影响页面通过 `pnpm check:build`、六档 viewport、13 输出 smoke、键盘、reduced motion、no-JS 与移动网络检查后恢复 `PAGE_COMPLETE`。

实施记录（2026-09-29）：V1.5 页面层改造完成，13 个输出恢复 `PAGE_COMPLETE`。Home 使用单一可逆 ScrollTrigger 时间轴；GSAP 改为只在 desktop 且非 reduced-motion 时动态请求，Mobile / tablet 初始请求不含 MP4、GLB 或 Three.js。六档 viewport 无横向溢出，no-JS 核心标题与项目入口可读，INDEX 菜单通过 ESC、focus trap、焦点恢复与 body scroll lock 检查。`pnpm check:build` 与生产模式 smoke test 通过；完整结果见 `docs/QA_V1.5.md`。Local Lighthouse 的 desktop LCP 为 0.8s，mobile 模拟 LCP 为 3.9s，因此性能目标、C10 与线上生产验收继续保持未完成。

---

# 17. V1.6 Scroll-Scrub 电影舞台修正

> 生效日期：2026-09-29。用户明确指出 V1.5 仍只是固定舞台中的普通视频播放；本节覆盖其视频时间控制方式，不改变路由、项目、真实性或移动端降级边界。

## 17.1 体验修正

- Desktop 首页固定在视口内，滚动位置直接映射到视频 `currentTime`；停止滚动即停在当前帧，反向滚动即反向推进。
- Entry / Identity 使用 8 秒实验室视频，PhysicalLink 使用 5 秒推进视频，Signal / Origin 使用 6 秒 signal-chain 视频。
- AI Workspace 与 BCI 无对应视频，使用全屏 concept still 与受控轻微镜头位移，不伪造缺失视频。
- 标题、项目说明、`OPEN CASE`、章节名、scene time 与 full-sequence rail 均为 HTML UI，并在相应时间段进入/退出。

## 17.2 媒体工程

- 原播放文件保持不变；新增三个 GOP 6 的 H.264 scrub 派生文件，支持更稳定的双向随机寻帧。
- `requestAnimationFrame` 合并滚动更新；React state 只在章节边界变化，不逐帧 setState。
- 首页三段视频始终暂停，时间只由 ScrollTrigger 进度驱动，不存在自动播放漂移。
- Mobile、tablet、reduced motion 与 no-JS 继续使用 V1.5 的 poster + 自然内容路径，不加载 scrub MP4。

实施记录（2026-09-29）：三个 scrub 文件完成并接入。生产模式实测 PhysicalLink 在前进滚动后由 1.95s 反向回到 0.57s，停止 800ms 的时间差为 0；Signal / Origin 在 70% 总进度停在约 2.0s。Desktop 创建 3 个 scrub video，390px、768px 与 reduced motion 创建 0 个 video 且 MP4 请求为 0。`pnpm check:build` 通过，完整记录见 `docs/QA_V1.6.md`。

---

# 18. V1.8 素材接入、全项目入口与上线

> 生效日期：2026-10-22。用户明确确认 `项目图片` 批次中的材料真实并授权用于个人网站展示，要求按完整项目方向整理并上线。该授权覆盖材料展示，不代表允许补写未提供的履历或性能事实。

## 18.1 素材交付

- 将 33 张静态图从本地素材批次生成网页 WebP 衍生版本；原始项目文件留在 `项目图片`，不改名、不覆盖、不推送。
- 将三段生成氛围视频分别处理为网页播放版、scroll-scrub 版和 poster；将 Tripo CGI 短片单独压缩并标注 CGI。原始视频保留。
- 将媒体按项目组展示在首页、Experiments、项目详情和 Lab；不再显示素材真实性/许可待办挡住用户提供的媒体。
- 生成式视频、概念海报和 CGI 成片继续明确标记为概念媒体，不包装成真实硬件测试。

## 18.2 全项目导航

- Experiments 提供 10 个带图片或视频的项目档案页；保留三个旗舰项目作为首页主线。
- 同一索引提供该 GitHub 账号当时全部 40 个公开仓库的直接入口，避免将仓库数误写成独立项目数。
- 后续确认新独立项目时，添加记录与对应源码，不要求用户先筛选、重命名或逐张挑选材料。

## 18.3 品牌域名与部署

- 网站公开品牌锁定为 `MORGAN / DIGITAL LAB`；首选域名 `morgandigitallab.com`，无连字符、易口述且匹配品牌。`morgan-digital-lab.com` 为备选。
- RDAP 当前无注册记录不保证域名仍可购买，也不代表已归用户所有；只在用户本人购买/控制后，才能把它设为 canonical 并绑定 Vercel。
- 当前代码发布沿用现有 GitHub 仓库和 Vercel 项目，不新建站、不改框架。commit `a52b8fb` 已推送 GitHub `master`，只包含网站代码及优化后的公开媒体；未包含原始素材目录或本轮内部文档。
- GitHub push 未触发 Vercel deployment；本地 `vercel whoami` 返回无凭据。因此生产发布需用户先在此环境登录 Vercel，或恢复 GitHub → Vercel integration；不可把“GitHub 已更新”误报成“网站已上线”。
- 发布后检查生产构建、全部公开路由、媒体与 metadata。未取得域名所有权时，继续使用已配置的 Vercel production URL，不写入虚假域名。

## 18.4 实施状态

本地生产构建 `pnpm check:build` 通过；10 个项目详情页、其余核心页面和 robots/sitemap 均通过生产服务 smoke test。390px 首页不请求 MP4，控制台无错误/警告。GitHub `master` 已包含 commit `a52b8fb`；Vercel 尚未部署此 commit（本机 CLI 无登录凭据且 Git integration 未触发），待恢复发布权限后完成线上回归；完整交接见 `docs/EXECUTION_STATUS.md` 与 `docs/ASSET_GAPS.md`。
