import type { Project } from "@/content/types";
import { Meta } from "@/components/ui/typography";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

const routes = {
  "01": "M18 118 L92 118 L92 66 L164 66 L164 28 L282 28",
  "02": "M18 34 L82 34 L82 92 L156 92 L156 54 L282 54",
  "03": "M18 104 L72 104 L72 42 L142 42 L142 112 L220 112 L220 52 L282 52",
} as const;

export function ProjectSignalPlate({
  project,
  locale = "en",
  compact = false,
}: {
  project: Project;
  locale?: Locale;
  compact?: boolean;
}) {
  const t = getDictionary(locale).media;
  const path = routes[project.index as keyof typeof routes] ?? routes["01"];
  return (
    <div
      className={`project-signal-field coordinate-corner relative overflow-hidden border border-line bg-surface ${compact ? "min-h-40" : "min-h-64"}`}
      role="img"
      aria-label={`${t.indexVisual} / ${project.shortTitle} — ${t.notEvidence}`}
    >
      <svg viewBox="0 0 300 150" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d={path} className="project-signal-route" />
        {[18, 92, 164, 220, 282].map((x, index) => (
          <circle key={x} cx={x} cy={index % 2 === 0 ? 66 : 104} r={index === 4 ? 5 : 3} className={index === 4 ? "project-signal-node-active" : "project-signal-node"} />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-line bg-bg/88 px-4 py-3 backdrop-blur-sm md:px-5">
        <div>
          <Meta className="text-signal">Field / {project.index}</Meta>
          <p className="mt-1 text-xs font-medium text-ink">{project.shortTitle}</p>
        </div>
        <Meta className="text-right text-ink-secondary">{t.indexVisual}<br />{t.notEvidence}</Meta>
      </div>
    </div>
  );
}
