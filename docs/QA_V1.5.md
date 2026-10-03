# QA V1.5 — UI UX 全站改造

> 日期：2026-09-29。该报告证明本地 `PAGE_COMPLETE`，不替代 C0–C10 的真实内容、正式 3D、部署与线上生产验收。

## 1. 构建与内容 Gate

- `pnpm check:build`：通过。
- ESLint、内容来源审计、TypeScript 与 Next.js 16.3.6 production build：通过。
- 内容审计：3 个项目、8 个稳定 Evidence ID、0 verified、8 pending；生成 atmosphere 未进入 Evidence。
- 15 个静态输出成功生成；三个项目详情使用 SSG。

## 2. 13 个输出 smoke test

生产模式 `http://localhost:3100`：

- `/`、`/origin`、`/experiments`、三个项目详情、`/capabilities`、`/lab`、`/vision`、`/about`：HTTP 200。
- 品牌化缺失路由：HTTP 404，恢复入口可用。
- `/robots.txt`、`/sitemap.xml`：HTTP 200；未配置真实域名时继续执行安全禁止抓取与空 sitemap 逻辑。
- 页面导航与项目 View Transition 实际跳转成功；控制台无应用错误。

## 3. 响应式与首页时间轴

已核对 `1440×900`、`1280×800`、`1024×768`、`768×1024`、`390×844`、`360×800`：

- 每档均有一个可见 H1，无横向溢出。
- Desktop 时间轴在 30%、42%、54%、68% 分别正确显示 PhysicalLink、AI Workspace、BCI Hand、Origin / Evidence；回滚至顶部后 Entry 状态恢复。
- Mobile 与 tablet 使用 poster + 自然纵向内容，不 pin、不自动播放视频。
- 截图与 Lighthouse JSON 保存在 `artifacts/qa-v15/`。

## 4. 资源与降级

- 390px 与 768px 首页初始请求：MP4 0、GLB 0、Three.js 0；DOM 中 video 元素为 0。
- reduced motion：MP4 / GLB / Three.js 请求为 0，video 元素为 0，静态标题和项目入口可读。
- no-JS desktop：首页有一个可见 H1、6 个项目详情链接和 Origin 入口。
- INDEX 菜单：dialog 可见、body scroll lock、ESC 关闭、关闭后焦点恢复均通过。
- 普通 atmosphere 图片 34–119KB；poster 12–74KB；三条网页视频 1.1–2.1MB；V01 GLB 6.23MB，均低于当前文件预算。
- GSAP 已从 mobile 初始化路径移出，只在 desktop 且非 reduced-motion 时动态加载。

## 5. Local Lighthouse

| 配置 | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Desktop | 99 | 100 | 100 | 66 | 0.8s | 0ms | 0 |
| Mobile simulated | 88 | 100 | 100 | 66 | 3.9s | 50ms | 0 |

说明：SEO 66 是未配置 production URL、robots 安全禁止抓取和未发布项目 noindex 的预期结果。Desktop 达到 LCP 目标；mobile 模拟 LCP 未达到 2.5s，仍是 R8 / C10 的公开未完成项。INP 需要部署后的真实交互或 field data 验证。Windows 上 Lighthouse 在报告写入后清理临时 Chrome profile 时返回 EPERM；两份 JSON 报告完整生成，分数与 audits 可读取，该环境清理错误不被记为页面通过证据。

## 6. 尚未关闭的生产限制

- 0 项 verified Evidence；三个项目事实、caption、许可和公开范围仍待用户确认。
- Portrait、真实项目照片、CAD、失败原型和真实项目视频仍缺失。
- Blender V02 Lab Monolith、运行时 draw-call/三角面实测与最终派生 poster 未完成。
- Production URL、真实 analytics 接收端、线上 canonical / sharing card / Lighthouse 和最终内容签字未完成。
- 因此 13 个输出为 `PAGE_COMPLETE`，全站不是 `PRODUCTION_COMPLETE`。
