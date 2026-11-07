# 3D ASSET MANIFEST

> Every production 3D asset must have a traceable source, license, size and use. Third-party branded models are prohibited.

## 当前首页原创资产 — Signal Engine（2026-11-07）

| 资源 | 来源 | 规格 / 大小 | 用途 |
|---|---|---|---|
| `public/images/lab-signal-engine-01.webp` | 原创 Blender 场景 / Cycles GPU 渲染 | 1600×1600 RGBA / 89,162 bytes | 默认首屏海报，低于350KB预算 |
| `public/models/lab-signal-engine-01.glb` | 同一原创雕塑导出 | 1,641,380 bytes；6 meshes / 6 materials / 6 draw calls / 37,348 triangles；无外部纹理或解码依赖 | 用户点击后加载的旋转视图 |
| `artifacts/lab-signal-engine.blend` | 本地原生工程，保留材质、相机与灯光 | 原始源文件，本地保存 | 后续调整与重新渲染 |
| `scripts/generate-signal-engine.py` | 可复现 Blender Python 脚本 | 从项目根生成独立场景与相同公开资源 | 资产再生成 |

- 来源：`self-authored-3d`；展示性质：原创概念雕塑，明确 `concept / not project evidence`，无第三方品牌模型或授权依赖。
- 造型：陶瓷与磨砂铝框的爆炸分层智能模块、深蓝计算核心、橙色环形电缆、螺丝、散热片和接点。
- 建模始终使用独立场景，未清空或覆盖用户原场景；完成后恢复原 Scene。
- 默认桌面、手机和 reduced-motion 均只显示海报，未点击不请求 GLB，不加载 WebGL。Three.js 由独立动态模块加载。
- 支持拖拽、左右方向键和 Escape，加载后进入视口焦点，关闭后回到按钮；失败回退海报，卸载释放材质、几何体、环境、renderer 和 WebGL context。
- 本资产只服务本轮首页概念主视觉，不表示历史完整实验室 V02、用户实物 Evidence 或全站生产验收已经完成。

## 历史开发资产 — V01（当前首页未引用）

| asset | source | license | file size | textures | materials | use | attribution |
|---|---|---|---:|---|---:|---|---|
| `home-lab-scene-model-01.glb` | Self-authored with `scripts/generate-lab-glb.mjs` | Morgan-owned | 6,380,968 bytes | None | 7 | Homepage development hero / fallback | No |

The model is assembled from independently named scene groups: workstation, dual displays, six-axis robotic arm, dexterous hand, conceptual control board, bench instrument and systems backplane. The control board is a generic concept asset and is never presented as PhysicalLink evidence. V01 is not the formal Blender delivery required by C7.

## Budget and runtime status

- GLB budget: **6.09 MB / 8 MB** — pass.
- Texture budget: no external textures; all materials are PBR parameters.
- Material budget: **7 / 12** — pass.
- Desktop: GLB is loaded after the readable hero content is available.
- Tablet: reduced DPR, shadow resolution and dynamic effects.
- Mobile: poster by default; `View 3D` explicitly opts into the reduced scene.
- WebGL context loss returns the frame to the poster fallback.
- Authored animation uses `useFrame` delta accumulation and does not instantiate a separate Three.js clock.
- Canvas uses the basic PCF shadow mode rather than the removed soft-shadow constant.
- Triangle and draw-call budgets remain unverified until the Blender V02 optimization pass.

## Current fallback poster derivatives

| file | source | dimensions | size | use |
|---|---|---:|---:|---|
| `public/posters/home-lab-poster-01.webp` | Rendered from V01 | 1440×900 | 17,424 bytes | Desktop fallback |
| `public/posters/home-lab-poster-02.webp` | Rendered from V01 | 780×1100 | 12,578 bytes | Mobile fallback |

## Formal Blender V02 — pending

| asset | required source | target | status |
|---|---|---|---|
| `home-lab-scene-blender-02.blend` | Connected Blender environment | Named source scene with objects, materials, lights and camera | PENDING |
| `home-lab-scene-model-02.glb` | Blender V02 + gltfjsx/Meshopt | ≤8 MB, ≤150k triangles, ≤12 materials, ≤70 draw calls | PENDING |
| V02 desktop/mobile/OG renders | Selected V02 scene | Versioned poster and social derivatives | PENDING |

## Regeneration

1. Run `pnpm generate:lab-model`.
2. Inspect the named scene groups and material count.
3. Confirm the resulting GLB remains below 8 MB.
4. Render desktop and mobile poster variants from the web scene.
5. Record any versioned replacement here before changing site references.

The Blender connector remains unavailable during V1.3. The current model is therefore a deterministic, self-authored development GLB generated from the checked-in modeling script rather than an external or branded model. It remains visible as `Concept model / V01` and cannot be promoted to the formal asset without the V02 source, optimization metrics, versioned derivatives and user visual approval.
