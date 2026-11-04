import type { Evidence } from "@/content/types";
import { Body, Meta } from "./typography";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

export function DocumentationStatus({
  label,
  title,
  body,
  locale = "en",
  className = "",
}: {
  label?: string;
  title: string;
  body: string;
  locale?: Locale;
  className?: string;
}) {
  const resolvedLabel = label ?? getDictionary(locale).project.documentationPending;
  return (
    <div className={`relative border-y border-line py-7 ${className}`}>
      <div className="grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-8">
        <Meta className="text-signal">{resolvedLabel}</Meta>
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          <Body className="mt-2 max-w-2xl text-sm text-ink-secondary">{body}</Body>
        </div>
      </div>
    </div>
  );
}

export function PendingEvidenceList({ evidence, locale = "en" }: { evidence: Evidence[]; locale?: Locale }) {
  if (evidence.length === 0) return null;
  const t = getDictionary(locale).project;
  return (
    <div className="border-t border-line" aria-label={t.pendingEvidenceList}>
      {evidence.map((item, index) => (
        <div
          id={item.id}
          key={item.id}
          className="scroll-mt-28 grid grid-cols-[44px_1fr_auto] items-center gap-4 border-b border-line py-4"
        >
          <Meta className="text-signal">{String(index + 1).padStart(2, "0")}</Meta>
          <div>
            <p className="text-sm font-medium text-ink">{item.title}</p>
            <Meta className="mt-1 block text-ink-secondary">{item.type}</Meta>
          </div>
          <Meta className="text-ink-secondary">{t.pending}</Meta>
        </div>
      ))}
    </div>
  );
}
