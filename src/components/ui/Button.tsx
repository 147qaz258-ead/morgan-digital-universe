import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "signal" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-surface hover:bg-brand",
  signal: "bg-signal-bright text-ink hover:opacity-90",
  ghost: "border border-line bg-transparent text-ink hover:border-ink/30",
};

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
  const cls = `inline-flex min-h-12 items-center gap-3 border border-transparent px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ease-lab active:translate-y-px ${styles[variant]}`;
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
      className="inline-flex items-center gap-2 border-b border-accent/30 pb-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent transition-colors duration-300 ease-lab hover:border-accent active:translate-y-px"
    >
      {children}
    </Link>
  );
}
