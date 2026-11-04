"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useMedia(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function AmbientVideo({
  src,
  poster,
  alt,
  priority = false,
  eager = false,
  loadPolicy,
  loadWhen = false,
  playbackMode = "loop",
  scrubId,
  active = true,
  className = "",
  mediaClassName = "",
  sizes = "100vw",
}: {
  src?: string | null;
  poster: string;
  alt: string;
  priority?: boolean;
  eager?: boolean;
  loadPolicy?: "eager" | "viewport" | "controlled";
  loadWhen?: boolean;
  playbackMode?: "loop" | "once" | "scrub";
  scrubId?: string;
  active?: boolean;
  className?: string;
  mediaClassName?: string;
  sizes?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = useMedia(DESKTOP_QUERY);
  const reducedMotion = useMedia(REDUCED_MOTION_QUERY);
  const eagerLoad = loadPolicy ? loadPolicy === "eager" : eager;
  const viewportLoad = loadPolicy === "viewport" || (!loadPolicy && !eager);
  const [inRange, setInRange] = useState(eagerLoad);
  const [visible, setVisible] = useState(eagerLoad);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // 影片比海报重一到两个数量级。等海报落地再挂载 video，让首屏先出画面，
  // 否则 scrub 影片的字节会和海报抢带宽，LCP 被自己的背景片拖慢。
  const [posterSettled, setPosterSettled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setPosterSettled(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!viewportLoad || eagerLoad || inRange) return;
    const node = rootRef.current;
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
  }, [eagerLoad, inRange, viewportLoad]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playbackMode === "scrub") {
      video.pause();
      return;
    }
    if (active && visible && !reducedMotion) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, playbackMode, reducedMotion, visible, ready]);

  const controlledLoad = loadPolicy === "controlled" && loadWhen;
  const shouldLoadVideo =
    Boolean(src) &&
    isDesktop &&
    !reducedMotion &&
    (inRange || controlledLoad) &&
    !failed &&
    (playbackMode !== "scrub" || posterSettled);

  return (
    <div ref={rootRef} className={`overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={alt}
        fill
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        onLoad={() => setPosterSettled(true)}
        className={`object-cover ${mediaClassName}`}
      />
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          data-scroll-video={scrubId}
          aria-hidden="true"
          autoPlay={playbackMode !== "scrub" && active && visible}
          loop={playbackMode === "loop"}
          muted
          playsInline
          preload={playbackMode === "scrub" ? "auto" : "metadata"}
          poster={poster}
          onLoadedMetadata={(event) => {
            if (playbackMode !== "scrub") return;
            event.currentTarget.currentTime = 0.001;
            event.currentTarget.dispatchEvent(new Event("lab:scrub-video-ready", { bubbles: true }));
          }}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${mediaClassName} ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <source src={src ?? undefined} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
