"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Box, Cpu, Hand } from "lucide-react";
import { Meta } from "../ui/typography";

const LabScene = dynamic(() => import("../three/LabScene"), { ssr: false });
const DESKTOP_QUERY = "(min-width: 1024px)";
const TABLET_QUERY = "(min-width: 768px)";

function useMedia(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const hotspots = [
  { label: "Robotic action", detail: "A conceptual actuation zone in the self-authored laboratory model.", className: "left-[16%] top-[48%]", icon: Hand },
  { label: "Intelligence layer", detail: "The rear display represents system state and decision flow.", className: "left-[50%] top-[33%]", icon: Cpu },
  { label: "Hardware interface", detail: "Concept electronics and instruments represent the physical interface layer.", className: "right-[12%] top-[57%]", icon: Box },
] as const;

function Poster({ mobile = false }: { mobile?: boolean }) {
  const src = mobile ? "/posters/home-lab-poster-02.webp" : "/posters/home-lab-poster-01.webp";
  return (
    <Image
      src={src}
      alt="Conceptual industrial robotics laboratory atmosphere"
      fill
      preload
      sizes={mobile ? "calc(100vw - 40px)" : "(max-width: 1024px) calc(100vw - 40px), 70vw"}
      className="object-cover"
    />
  );
}

export function HeroViewport() {
  const isDesktop = useMedia(DESKTOP_QUERY);
  const isTablet = useMedia(TABLET_QUERY);
  const [forceLoad, setForceLoad] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const show3d = !contextLost && (isDesktop || forceLoad);

  return (
    <div className="coordinate-corner relative h-full min-h-[440px] w-full overflow-hidden border border-line bg-surface-muted shadow-[var(--shadow-media)] lg:min-h-[620px]">
      {show3d ? (
        <LabScene
          quality={isDesktop ? "full" : "reduced"}
          interactive={!reducedMotion}
          reducedMotion={reducedMotion}
          onContextLost={() => setContextLost(true)}
        />
      ) : (
        <div className="absolute inset-0">
          <Poster mobile={!isTablet} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,245,247,.34),transparent_44%)]" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/35 bg-brand/88 px-4 py-3 text-white backdrop-blur-md md:px-5">
        <Meta className="text-white/78">MDU / Physical systems lab</Meta>
        <Meta className="text-signal-bright">Concept model / V01</Meta>
      </div>

      {show3d ? hotspots.map(({ label, detail, className, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={`${label}: ${detail}`}
          aria-pressed={activeHotspot === label}
          onClick={() => setActiveHotspot((current) => current === label ? null : label)}
          className={`absolute hidden items-center gap-2 border border-white/35 bg-brand/82 px-3 py-2 text-left text-white backdrop-blur-md transition-colors hover:border-white/70 xl:flex ${className}`}
        >
          <Icon size={13} aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.1em]">{label}</span>
          {activeHotspot === label ? (
            <span className="absolute left-0 top-full mt-2 w-56 border border-line bg-surface p-3 font-sans text-[12px] normal-case leading-relaxed tracking-normal text-ink shadow-[var(--shadow-card)]">
              {detail}
            </span>
          ) : null}
        </button>
      )) : null}

      {!isDesktop && !show3d ? (
        <button
          type="button"
          onClick={() => setForceLoad(true)}
          className="absolute bottom-4 right-4 border border-white/35 bg-brand px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white"
        >
          View 3D
        </button>
      ) : null}
    </div>
  );
}
