import { Meta } from "./typography";

type Tone = "signal" | "accent" | "neutral";

const dot: Record<Tone, string> = {
  signal: "bg-signal-bright",
  accent: "bg-accent",
  neutral: "bg-ink-secondary",
};

export function StatusPill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: Tone;
}) {
  return (
    <span className="inline-flex items-center gap-2 border-l border-line pl-3">
      <span className={`h-1.5 w-1.5 rounded-full ${dot[tone]}`} aria-hidden />
      <Meta className="text-ink">{label}</Meta>
    </span>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-line ${className}`} aria-hidden />;
}

export function ProjectIndex({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={`font-mono text-[13px] tracking-[0.08em] text-signal ${className}`}>
      EXP.{value}
    </span>
  );
}
