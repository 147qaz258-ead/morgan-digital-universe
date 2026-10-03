import { ViewTransition, type ReactNode } from "react";

export function MediaWindow({
  children,
  transitionName,
  className = "",
}: {
  children: ReactNode;
  transitionName?: string;
  className?: string;
}) {
  const frame = <div className={`media-window ${className}`}>{children}</div>;
  if (!transitionName) return frame;

  return (
    <ViewTransition name={transitionName} share="lab-media-morph" default="none">
      {frame}
    </ViewTransition>
  );
}
