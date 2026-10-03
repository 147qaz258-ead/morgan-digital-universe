import { Meta } from "./typography";

/** 素材缺失时的中性占位：灰白 + Evidence pending，禁止彩色 skeleton。 */
export function PendingAsset({
  label = "Evidence pending",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-dashed border-line bg-surface-muted ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,42,67,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(16,42,67,.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />
      <div className="relative flex items-center gap-3 bg-surface/85 px-4 py-3">
        <span className="h-2 w-2 bg-signal-bright" aria-hidden />
        <Meta className="text-ink-secondary">{label}</Meta>
      </div>
    </div>
  );
}
