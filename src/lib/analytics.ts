export type AnalyticsEvent =
  | "project_open"
  | "evidence_open"
  | "github_click"
  | "contact_click"
  | "origin_complete";

/** 轻量 analytics：只在配置了 NEXT_PUBLIC_ANALYTICS_ENDPOINT 时发送（sendBeacon），
 *  否则 dev 下打 console。不追踪鼠标热图等高侵入数据。 */
export function track(event: AnalyticsEvent, detail?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  const payload = JSON.stringify({ event, ...detail, path: window.location.pathname, t: Date.now() });
  if (endpoint) {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, payload);
    } else {
      fetch(endpoint, { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  } else if (process.env.NODE_ENV === "development") {
    console.debug("[track]", event, detail ?? {});
  }
}
