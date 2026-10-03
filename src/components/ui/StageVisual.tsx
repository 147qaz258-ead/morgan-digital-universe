import type { OriginStage } from "@/content/types";
import { visualTokens } from "@/lib/visual-tokens";

/** 每阶段的抽象 DOM/SVG 视觉（氛围图形，不冒充真实证据）。 */
export function StageVisual({ type }: { type: OriginStage["visualType"] }) {
  const stroke = visualTokens.brand;
  const accent = visualTokens.accent;
  const signal = visualTokens.signal;

  if (type === "digital") {
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 27} y1="10" x2={20 + i * 27} y2="110" stroke={stroke} strokeOpacity="0.25" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={`h${i}`} x1="10" y1={20 + i * 27} x2="190" y2={20 + i * 27} stroke={stroke} strokeOpacity="0.25" />
        ))}
        <rect x="47" y="47" width="54" height="27" fill="none" stroke={accent} strokeWidth="1.5" />
        <circle cx="155" cy="33" r="4" fill={signal} />
      </svg>
    );
  }
  if (type === "intelligence") {
    const nodes: [number, number][] = [[40, 60], [80, 30], [80, 90], [125, 45], [125, 75], [165, 60]];
    const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 4]];
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={accent} strokeOpacity="0.5" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 5 ? 6 : 4} fill={i === 5 ? signal : stroke} />
        ))}
      </svg>
    );
  }
  if (type === "hardware") {
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
        <rect x="60" y="30" width="80" height="60" fill="none" stroke={stroke} strokeWidth="1.5" />
        <rect x="82" y="48" width="36" height="24" fill="none" stroke={accent} strokeWidth="1.5" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`l${i}`} x1={40} y1={38 + i * 9} x2={60} y2={38 + i * 9} stroke={stroke} strokeOpacity="0.6" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`r${i}`} x1={140} y1={38 + i * 9} x2={160} y2={38 + i * 9} stroke={stroke} strokeOpacity="0.6" />
        ))}
        <circle cx="150" cy="95" r="3.5" fill={signal} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <path d="M30 100 L70 60 L100 75 L140 35" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="70" cy="60" r="5" fill="none" stroke={accent} strokeWidth="1.5" />
      <circle cx="140" cy="35" r="5" fill={signal} />
      <path d="M140 35 l14 -10 M140 35 l3 17" stroke={stroke} strokeOpacity="0.6" />
      <ellipse cx="100" cy="105" rx="60" ry="5" stroke={stroke} strokeOpacity="0.2" fill="none" />
    </svg>
  );
}
