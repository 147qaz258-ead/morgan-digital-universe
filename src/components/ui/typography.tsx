import type { ReactNode } from "react";

/**
 * 排版组件 = 类型阶梯的唯一出口。
 * 只允许 Tailwind 档位与 tokens.css 里的两个项目档（text-2xs / text-display），
 * 组件内不再写任意字号。
 */

type TextProps = { children: ReactNode; className?: string; id?: string };

export function Display({ children, className = "", id }: TextProps) {
  return (
    <h1 id={id} className={`text-5xl font-semibold leading-none tracking-tighter text-balance md:text-6xl lg:text-7xl ${className}`}>
      {children}
    </h1>
  );
}

export function H1({ children, className = "", id }: TextProps) {
  return (
    <h1 id={id} className={`text-4xl font-semibold leading-none tracking-tighter text-balance md:text-6xl ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "", id }: TextProps) {
  return (
    <h2 id={id} className={`text-3xl font-semibold leading-tight tracking-tight text-balance md:text-4xl ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "", id }: TextProps) {
  return (
    <h3 id={id} className={`text-2xl font-semibold leading-snug tracking-tight text-balance md:text-3xl ${className}`}>
      {children}
    </h3>
  );
}

export function BodyLarge({ children, className = "" }: TextProps) {
  return <p className={`text-lg leading-relaxed text-pretty md:text-xl ${className}`}>{children}</p>;
}

export function Body({ children, className = "" }: TextProps) {
  return <p className={`text-base leading-relaxed text-pretty ${className}`}>{children}</p>;
}

export function Meta({ children, className = "" }: TextProps) {
  return (
    <span className={`font-mono text-2xs uppercase tracking-[0.14em] tabular-nums md:text-xs ${className}`}>
      {children}
    </span>
  );
}
