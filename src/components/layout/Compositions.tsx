import type { ReactNode } from "react";

export function LaunchComposition({
  copy,
  media,
  className = "",
}: {
  copy: ReactNode;
  media: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 items-center lg:grid-cols-12 ${className}`}>
      <div className="relative z-10 lg:col-span-6 lg:col-start-1 lg:row-start-1">{copy}</div>
      <div className="relative lg:col-span-8 lg:col-start-5 lg:row-start-1">{media}</div>
    </div>
  );
}

export function EvidenceComposition({
  index,
  media,
  content,
  reverse = false,
  className = "",
}: {
  index: ReactNode;
  media: ReactNode;
  content: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <article className={`grid grid-cols-1 gap-7 border-t border-line py-10 md:grid-cols-12 md:gap-6 lg:py-14 ${className}`}>
      <div className="md:col-span-12">{index}</div>
      <div className={`md:col-span-7 ${reverse ? "md:order-3" : "md:order-2"}`}>{media}</div>
      <div className={`md:col-span-5 ${reverse ? "md:order-2 md:pr-8" : "md:order-3 md:pl-8"}`}>{content}</div>
    </article>
  );
}

export function EngineeringIndex({
  rail,
  children,
  className = "",
}: {
  rail: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-10 lg:grid-cols-12 lg:gap-6 ${className}`}>
      <aside className="lg:col-span-3">{rail}</aside>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </div>
  );
}
