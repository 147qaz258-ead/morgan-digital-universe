import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

/** 素材缺失时的占位：虚线粗边 + 坐标纸 + 黄色 PENDING 贴纸。禁止彩色 skeleton。 */
export function PendingAsset({
  label,
  locale = "en",
  className = "",
}: {
  label?: string;
  locale?: Locale;
  className?: string;
}) {
  const resolvedLabel = label ?? getDictionary(locale).media.pendingLabel;
  return (
    <div
      className={`grid-paper relative flex items-center justify-center overflow-hidden border-[2px] border-dashed border-ink bg-surface-muted ${className}`}
      role="img"
      aria-label={resolvedLabel}
    >
      <span className="sticker sticker--paper">{resolvedLabel}</span>
    </div>
  );
}
