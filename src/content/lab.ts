import type { LabItem } from "./types";
import { projectMedia } from "./project-media";
import type { Locale } from "@/i18n/config";

const en: LabItem[] = [
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

const zh: LabItem[] = [
  {
    id: "itec-2026-field-note",
    title: "ITEC 2026 / 现场环境",
    date: "2026",
    category: "note",
    summary: "ITEC 2026 现场展台的一张记录照，只作为活动背景保留，不作为项目成果陈述。",
    status: "现场笔记",
    media: projectMedia.itecFieldNote[0],
    relatedProject: null,
  },
];

export const labItemsByLocale: Record<Locale, LabItem[]> = { en, zh };

export function getLabItems(locale: Locale): LabItem[] {
  return labItemsByLocale[locale];
}

export function labByCategory(locale: Locale, category: LabItem["category"]): LabItem[] {
  return getLabItems(locale).filter((item) => item.category === category);
}
