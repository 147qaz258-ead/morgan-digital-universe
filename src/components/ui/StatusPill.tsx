type Tone = "signal" | "accent" | "neutral";

const toneClass: Record<Tone, string> = {
  signal: "sticker--signal",
  accent: "sticker--ink",
  neutral: "sticker--paper",
};

/** 状态 = 贴纸。实色块 + 2px 黑边 + 硬阴影，取代旧的「左边细线 + 圆点」。 */
export function StatusPill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: Tone;
}) {
  return (
    <span className={`sticker ${toneClass[tone]}`}>
      <span className="h-1.5 w-1.5 bg-current" aria-hidden />
      {label}
    </span>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t-[2px] border-line ${className}`} aria-hidden />;
}

export function ProjectIndex({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={`sticker sticker--ink ${className}`}>
      EXP.{value}
    </span>
  );
}
