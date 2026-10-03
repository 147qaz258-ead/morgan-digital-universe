# V1.3 LOCAL QA

> Executed on 2026-09-28 against `next start` on localhost. This proves the local page layer only; it is not production or field-performance certification.

## Phase gate

| Check | Result |
|---|---|
| `pnpm check:content` | PASS — 3 projects, 8 stable Evidence IDs, 0 verified, 8 pending, 7 metadata routes |
| `pnpm check` | PASS — ESLint, content audit and TypeScript |
| `pnpm check:build` | PASS — 15 static/SSG outputs generated |
| `git diff --check` | PASS |

## Thirteen-output smoke test

| Output | Result |
|---|---|
| `/` | 200 |
| `/origin` | 200 |
| `/experiments` | 200 |
| `/experiments/physical-link` | 200, pending publication gate, `noindex` |
| `/experiments/ai-native-hardware-workspace` | 200, pending publication gate, `noindex` |
| `/experiments/bci-dexterous-hand` | 200, pending publication gate, `noindex` |
| `/capabilities` | 200 |
| `/lab` | 200 |
| `/vision` | 200 |
| `/about` | 200 |
| Branded 404 | 404 |
| `/robots.txt` | 200; `Disallow: /` while no production URL is configured |
| `/sitemap.xml` | 200; valid empty URL set while no page is approved for production publication |

## Responsive and browser checks

- Home inspected at 1440×900, 1280×800, 1024×768, 768×1024, 390×844 and 360×800.
- All ten user pages were checked at desktop and mobile widths for horizontal overflow, heading structure, missing image alt text and unlabeled buttons.
- About was rechecked at 768×1024 after the metadata-rail breakpoint fix; no horizontal overflow remains.
- With JavaScript disabled, the Home navigation, headline, supporting copy, primary actions, system summary and poster/concept visual remain readable.
- A 390×844 Android-emulated initial-request capture contains no `.glb`, `.gltf`, Three.js route chunk, `.mp4` or `.webm` request.
- After the atmosphere-image integration, CDP emulation at an exact 390px viewport reported `scrollWidth = clientWidth = 390` for Experiments, Vision, PhysicalLink and Origin.
- Reduced-motion rules, keyboard-visible controls and the three Hero hotspot buttons are present. WebGL context loss returns to the poster fallback.

Evidence artifacts:

- `artifacts/v13-home-nojs-final.png`
- `artifacts/v13-about-768-final.png`
- `artifacts/v13-mobile-netlog-final.json`

## Resource budgets

| Asset | Measured | Budget | Result |
|---|---:|---:|---|
| V01 GLB | 6,380,968 bytes (6.09 MiB) | ≤8 MiB | PASS for development fallback |
| Desktop poster | 17,424 bytes | ≤350 KB | PASS |
| Mobile poster | 12,578 bytes | ≤250 KB | PASS |
| Vision atmosphere | 55,444 bytes | ≤250 KB | PASS |
| PhysicalLink concept atmosphere | 63,432 bytes | ≤250 KB | PASS |
| Hardware Workspace concept atmosphere | 64,736 bytes | ≤250 KB | PASS |
| BCI × Dexterous Hand concept atmosphere | 67,492 bytes | ≤250 KB | PASS |
| Origin digital/intelligence atmosphere | 121,286 bytes | ≤250 KB | PASS |
| Origin hardware/robotics atmosphere | 75,392 bytes | ≤250 KB | PASS |
| Vision systems panorama | 79,534 bytes | ≤250 KB | PASS |
| OG cover | 34,716 bytes | 1200×630; optimized | PASS |

The GLB size pass does not promote V01 to the formal Blender V02 deliverable. Triangle count, material count and draw calls remain unverified for V02.

## Lighthouse localhost results

| Profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile simulated | 96 | 100 | 100 | 66 | 0.8s | 2.8s | 50ms | 0 |
| Desktop | 98 | 100 | 100 | 63 | 0.2s | 0.6s | 110ms | 0 |

Notes:

- Mobile simulated LCP misses the ≤2.5s target by 0.3s. The same trace recorded an observed local LCP of 163ms; the production target remains open until deployment and real-network testing.
- Lighthouse does not produce a meaningful INP without user interactions. TBT is recorded as a lab proxy, not reported as INP.
- SEO is intentionally reduced because the unconfigured-production safety gate blocks crawling and omits invented canonical/sitemap URLs.
- Lighthouse produced valid reports but returned a Windows temporary-directory cleanup `EPERM` after each run; the report files were written and parsed successfully.

Reports:

- `artifacts/lighthouse-mobile-v13-final.json`
- `artifacts/lighthouse-desktop-v13-final.json`

## Remaining production blockers

- 0 verified project Evidence items; all eight stable Evidence slots remain pending.
- Project facts, roles, dates, team information, architecture details, metrics and local/GitHub candidate files await explicit publication approval.
- Real portrait, Origin close-up, project video/posters/captions and selected real photographs are missing or unapproved.
- Blender is unavailable in the current environment; formal V02 `.blend`, optimized GLB, final posters and geometry/draw-call measurements are not delivered.
- Production URL, canonical/OG verification, analytics receiver, deployment, online Lighthouse and final content sign-off are not complete.
