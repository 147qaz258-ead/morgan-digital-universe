"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** 挂载即上报（如 project_open）。 */
export function TrackEvent({
  event,
  detail,
}: {
  event: AnalyticsEvent;
  detail?: Record<string, string>;
}) {
  useEffect(() => {
    track(event, detail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** 进入视口即上报一次（如 origin_complete）。 */
export function TrackOnView({
  event,
  detail,
  children,
}: {
  event: AnalyticsEvent;
  detail?: Record<string, string>;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!fired.current && entries.some((e) => e.isIntersecting)) {
          fired.current = true;
          track(event, detail);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}>{children}</div>;
}

/** 点击上报（如 github_click / contact_click / evidence_open）。 */
export function TrackClick({
  event,
  detail,
  children,
}: {
  event: AnalyticsEvent;
  detail?: Record<string, string>;
  children: ReactNode;
}) {
  return (
    <div onClick={() => track(event, detail)} className="contents">
      {children}
    </div>
  );
}
