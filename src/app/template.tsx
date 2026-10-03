import type { ReactNode } from "react";

/** Server-visible shell: route content remains immediately paintable without JavaScript. */
export default function Template({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
