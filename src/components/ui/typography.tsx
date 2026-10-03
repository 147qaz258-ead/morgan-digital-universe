import type { ReactNode } from "react";

export function Display({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`text-[44px] font-semibold leading-[0.92] tracking-[-0.045em] md:text-[64px] lg:text-[72px] ${className}`}>
      {children}
    </h1>
  );
}

export function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`text-[38px] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[56px] ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-[30px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[40px] ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-[24px] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[28px] ${className}`}>
      {children}
    </h3>
  );
}

export function BodyLarge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[18px] leading-[1.55] md:text-[20px] ${className}`}>{children}</p>;
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[16px] leading-[1.6] ${className}`}>{children}</p>;
}

export function Meta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.14em] md:text-[12px] ${className}`}>
      {children}
    </span>
  );
}
