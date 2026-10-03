# CONTENT INTEGRITY AUDIT

> Baseline established on 2026-09-27. Run `pnpm check:content` after every content or media change.

## Enforced gates

- Every project Evidence item has a globally unique, stable public anchor.
- Pending projects cannot expose unconfirmed dates, roles, team data, implementation details, diagrams, metrics, media or results in public content.
- Published projects must provide the confirmed facts and narrative fields required by the ten-section case-study structure.
- A verified Evidence item must simultaneously have a real file, `user-evidence` provenance, complete caption, explicit claim, capture date, owner, granted publication permission and user confirmation.
- Generated atmosphere, conceptual 3D and system diagrams cannot enter project Evidence.
- Capability proof references must resolve to a specific Evidence ID in the declared project.
- Origin Evidence references must resolve to existing stable IDs.
- Confirmed system diagrams must have unique nodes, valid connections and at least one real flow.
- Referenced public media, posters, captions and Open Graph files must exist.
- Every declared media asset has alt text, positive dimensions, aspect ratio, provenance and state.
- Empty sections do not render large containers, and pending Evidence is consolidated into one list.
- Page and content string literals cannot contain Chinese user-facing copy.
- Page components cannot contain long prose that belongs in `src/content/`.
- Component and page TypeScript cannot introduce raw hex colors outside the shared visual-token map.
- The static metadata matrix must have unique routes, titles, descriptions and an existing OG image.

## Current result

| Check | Result |
|---|---|
| Projects | 3 |
| Stable Evidence IDs | 8 |
| Verified Evidence | 0 |
| Pending Evidence | 8 |
| Static metadata routes | 7 |
| Generated atmosphere assets | 7 (6 new V1.3 assets + 1 retained Vision asset) |
| Integrity failures | 0 |

## Current publication state

- All three project summaries are within the locked 18–32 English-word range and disclose that documentation is pending.
- All three projects remain `publicationStatus: "pending"`; detailed facts, diagrams and candidate media are not public.
- No locally located file or GitHub-derived claim has been copied into `public/`, marked verified or rendered as Evidence.
- Generated atmosphere assets are isolated in `src/content/atmosphere.ts`, checked for file/dimension/provenance completeness, and rendered through a component that labels them as generated and not Evidence.

## Scope boundary

A passing integrity audit proves that published data is internally consistent; it does not prove that pending user facts or media have been supplied. Production completion still requires the C1–C10 gates in the master plan.
