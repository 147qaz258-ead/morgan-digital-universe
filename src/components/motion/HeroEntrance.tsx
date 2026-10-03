import type { ReactNode } from "react";
import { LaunchComposition } from "@/components/layout/Compositions";

/** Text is immediately paintable; only the non-critical visual receives entrance motion. */
export function HeroEntrance({
  text,
  viewport,
  textClassName = "",
  viewportClassName = "",
}: {
  text: ReactNode;
  viewport: ReactNode;
  textClassName?: string;
  viewportClassName?: string;
}) {
  return (
    <LaunchComposition
      copy={<div className={textClassName}>{text}</div>}
      media={<div className={`hero-media-enter ${viewportClassName}`}>{viewport}</div>}
    />
  );
}
