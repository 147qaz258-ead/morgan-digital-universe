# 3D ASSET MANIFEST

> Every production 3D asset must have a traceable source, license, size and use. Third-party branded models are prohibited.

## Current development asset — V01

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
