# V1.1 QA REPORT

> Scope note: this report proves the V1.1 scaffold, visual system, placeholder behaviour and local runtime baseline. It does **not** prove that real project content, verified Evidence, the Blender V02 scene, production deployment, live analytics, external links or final deployed Lighthouse checks are complete. Those are tracked by C1–C10 in the master plan.

Run date: 2026-09-27  
Environment: local Next.js production server, Chromium, Windows

## Phase gate

- `pnpm check`: pass
- `pnpm build`: pass
- `pnpm check:build`: pass
- All static and SSG routes generated successfully.

## Route smoke test

The following production routes returned HTTP 200:

- `/`
- `/origin`
- `/experiments`
- `/experiments/physical-link`
- `/experiments/ai-native-hardware-workspace`
- `/experiments/bci-dexterous-hand`
- `/capabilities`
- `/lab`
- `/vision`
- `/about`
- `/robots.txt`
- `/sitemap.xml`

## Responsive matrix

Homepage viewport captures were checked at:

- 1440×900
- 1280×800
- 1024×768
- 768×1024
- 390×844
- 360×800

No route in the mobile audit had horizontal overflow. Origin and Vision were explicitly rechecked after semantic and overflow repairs.

## Runtime and 3D

- Desktop 1024px+: production GLB requested successfully with HTTP 200.
- Mobile 390px initial load: no GLB, model, Three scene chunk, or WebGL request.
- Mobile `View 3D` opt-in: GLB requested successfully with HTTP 200.
- Browser console after production navigation and 3D load: 0 application errors, 0 application warnings.
- WebGL context-loss fallback and poster fallback are implemented.
- Reduced-motion emulation returns `scroll-behavior: auto` and freezes automatic camera movement.

## Local performance sample

Measured against the local production build with a buffered PerformanceObserver:

| metric | result | target |
|---|---:|---:|
| Desktop LCP | 884 ms | ≤ 2500 ms |
| CLS | 0.0000 | ≤ 0.1 |
| Interaction event duration (mobile `View 3D`) | 48 ms | ≤ 200 ms proxy |

These are local laboratory results, not a replacement for deployed Lighthouse field testing.

## Accessibility and content audit

- Exactly one `h1` per audited route.
- `html[lang]` is `en`.
- No missing image `alt` attributes.
- No unlabeled buttons.
- Keyboard order begins with Skip to content → brand → mobile menu.
- Mobile menu opens by keyboard and moves focus to HOME.
- Visible body text on all audited routes contains no Chinese characters.
- Video component supports an English captions track and defers `src` / metadata until near the viewport.
- Generated atmosphere is explicitly labeled and excluded from Evidence.

## Asset budgets

| asset | dimensions | size | result |
|---|---:|---:|---|
| `home-lab-scene-model-01.glb` | — | 6,380,968 bytes | Pass, below 8 MB |
| `home-lab-poster-01.webp` | 1440×900 | 17,424 bytes | Pass, below 350 KB |
| `home-lab-poster-02.webp` | 780×1100 | 12,578 bytes | Pass, below 250 KB |
| `vision-physical-ai-atmosphere-01.webp` | 1792×768 | 55,444 bytes | Pass, below 250 KB |
| `site-og-cover-01.webp` | 1200×630 | 34,716 bytes | Pass |

## Open truth-gated release inputs

The remaining gaps are listed in `ASSET_GAPS.md`: verified project facts, real project evidence, portrait, PCB photography, logs, system inputs, and real project videos. They must not be replaced with generated media. V1.1 could render honestly without them, but the V1.2 production-content closure cannot be marked complete until the required rows are VERIFIED.
