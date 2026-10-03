# CONTENT SOURCE MAP

> 每段用户可见内容的唯一来源。页面内不允许手写长内容。

| 内容 | 数据源文件 | 备注 |
|---|---|---|
| 姓名 / 品牌 / 标题 / 联系方式 / 社交链接 / Current Focus | `src/content/profile.ts` | 缺失字段为 null，不虚构 |
| Origin 四阶段叙事 | `src/content/origin.ts` | 固定 4 阶段 |
| 所有项目（旗舰 + Archive） | `src/content/projects.ts` | 详情页全部由此渲染 |
| 能力四组 + 证据链接 | `src/content/capabilities.ts` | Understand/Build/Connect/Make It Move |
| Lab（Failure Archive / Prototypes / Equipment / Notes） | `src/content/lab.ts` | 只展示真实工具与过程 |
| Vision 三段 | `src/content/vision.ts` | Now / Next / Long-term |
| 导航 / Footer / 固定文案 | `src/content/site.ts` | 7 项导航与品牌文案 |
| 页面 metadata | 各 page 从对应 content 生成 | P10 统一接入 |
| 各页面标题 / intro / 空状态 / About 短文案 | `src/content/pages.ts` | V1.1 统一英文，不在 page 内写长文案 |
| 生成式项目 / Origin / Vision 图片与视频氛围资产 | `src/content/atmosphere.ts` | 仅 concept atmosphere；组件或空间入口强制声明 Generated / not evidence |
| 静态路由 metadata matrix | `src/content/metadata.ts` | title / description / canonical / OG 单一来源 |
| 未发布项目事实、公开许可、Evidence claim 映射 | `docs/PROJECT_CONTENT_INTAKE.md` | 仅 intake；达到 USER_CONFIRMED 后才可进入 `src/content/` |
| 真实/生成/3D/系统图资产状态 | `docs/ASSET_GAPS.md` | 资产缺口与来源唯一清单 |
| 3D 来源、许可、预算与选用版本 | `docs/3D_ASSET_MANIFEST.md` | 最终模型切换时同步更新 |

发布规则：聊天记录、文件名、项目标题或生成模型输出都不是事实来源。项目事实必须来自用户确认；系统图只能由确认后的系统字段生成；Evidence 必须同时通过文件、caption、许可、provenance 和 claim 映射验证。

自动约束：`pnpm check:content` 校验 Evidence ID、来源、文件、许可、claim、跨页引用、系统图结构、生成式氛围图来源、英文可见文案、metadata 和视觉 token；报告基线见 `docs/CONTENT_AUDIT.md`。
