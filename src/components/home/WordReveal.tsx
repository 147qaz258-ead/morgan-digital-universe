"use client";

import { useEffect, useRef } from "react";
import styles from "./LabWorld.module.css";

export function WordReveal({ lines }: { lines: string[] }) {
  const root = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!root.current || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = root.current.querySelectorAll<HTMLElement>("[data-word]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-lit", "true");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -15% 0px", threshold: 0.7 });
    words.forEach((word) => { word.dataset.animate = "true"; observer.observe(word); });
    return () => observer.disconnect();
  }, []);
  return <h2 ref={root} className={styles.statement}>{lines.map((line, row) => <span key={line} className={styles.statementLine}>{line.split(" ").map((word, index) => <span key={`${row}-${index}`} data-word style={{ transitionDelay: `${Math.min(index * 60, 360)}ms` }}>{word}{" "}</span>)}</span>)}</h2>;
}
