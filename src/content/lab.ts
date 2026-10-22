import type { LabItem } from "./types";
import { projectMedia } from "./project-media";

export const labItems: LabItem[] = [
  {
    id: "itec-2026-field-note",
    title: "ITEC 2026 / event environment",
    date: "2026",
    category: "note",
    summary: "A field image of the ITEC 2026 event display, kept as event context rather than a project result claim.",
    status: "Field note",
    media: projectMedia.itecFieldNote[0],
    relatedProject: null,
  },
];

export function labByCategory(category: LabItem["category"]): LabItem[] {
  return labItems.filter((item) => item.category === category);
}
