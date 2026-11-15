import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "signal" | "ghost";

/**
 * Neubrutalism 按钮：3px 黑边 + 硬偏移阴影 + 按下时压平。
 * 没有渐变、没有圆角、没有半透明 hover。
 */
const styles: Record<Variant, string> = {
  primary: "bg-ink text-bg",
  signal: "bg-signal-bright text-ink",
  ghost: "bg-surface text-ink",
};

const BASE =
  "brut-lift inline-flex min-h-12 items-center gap-3 border-[3px] border-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] shadow-[var(--shadow-card)]";

export function Button({
  href,
  variant = "primary",
  children,
  external = false,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
}) {
  const cls = `${BASE} ${styles[variant]}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 border-b-[3px] border-accent pb-1 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent transition-colors duration-150 ease-lab hover:bg-sticker hover:text-ink active:translate-y-px"
    >
      {children}
    </Link>
  );
}
