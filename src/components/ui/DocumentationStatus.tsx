import type { Evidence } from "@/content/types";
import { Body, Meta } from "./typography";

export function DocumentationStatus({
  label = "Documentation status / pending",
  title,
  body,
  className = "",
}: {
  label?: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`relative border-y border-line py-7 ${className}`}>
      <div className="grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-8">
        <Meta className="text-signal">{label}</Meta>
        <div>
          <p className="text-[15px] font-semibold text-ink">{title}</p>
          <Body className="mt-2 max-w-2xl text-[14px] text-ink-secondary">{body}</Body>
        </div>
      </div>
    </div>
  );
}

export function PendingEvidenceList({ evidence }: { evidence: Evidence[] }) {
  if (evidence.length === 0) return null;
  return (
    <div className="border-t border-line" aria-label="Pending evidence list">
      {evidence.map((item, index) => (
        <div
          id={item.id}
          key={item.id}
          className="scroll-mt-28 grid grid-cols-[44px_1fr_auto] items-center gap-4 border-b border-line py-4"
        >
          <Meta className="text-signal">{String(index + 1).padStart(2, "0")}</Meta>
          <div>
            <p className="text-[14px] font-medium text-ink">{item.title}</p>
            <Meta className="mt-1 block text-ink-secondary">{item.type}</Meta>
          </div>
          <Meta className="text-ink-secondary">Pending</Meta>
        </div>
      ))}
    </div>
  );
}
