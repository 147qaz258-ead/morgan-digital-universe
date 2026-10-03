"use client";

import { useEffect, useRef, useState } from "react";

export function LazyVideo({
  src,
  poster,
  captions,
  className,
}: {
  src: string;
  poster?: string | null;
  captions?: string | null;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInRange(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={inRange ? src : undefined}
      poster={poster ?? undefined}
      controls
      muted
      playsInline
      crossOrigin="anonymous"
      preload={inRange ? "metadata" : "none"}
      className={className}
    >
      {captions ? <track kind="captions" src={captions} srcLang="en" label="English" default /> : null}
    </video>
  );
}
