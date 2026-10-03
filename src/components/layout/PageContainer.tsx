import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-[var(--page-gutter)]">
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-20 md:py-24 lg:py-[var(--section-space)] ${className}`}>{children}</section>
  );
}

export function Grid12({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6 ${className}`}>
      {children}
    </div>
  );
}
