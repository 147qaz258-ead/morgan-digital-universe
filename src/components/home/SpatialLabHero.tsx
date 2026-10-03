import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { pageCopy } from "@/content/pages";
import { motionAtmosphere } from "@/content/atmosphere";
import { AmbientVideo } from "@/components/media/AmbientVideo";

const hotspots = [
  {
    index: "01",
    label: "PHYSICALLINK",
    meta: "PHYSICAL INTERFACE",
    href: "/experiments/physical-link",
    position: "left-[25%] top-[54%]",
  },
  {
    index: "02",
    label: "AI WORKSPACE",
    meta: "INTELLIGENCE LAYER",
    href: "/experiments/ai-native-hardware-workspace",
    position: "left-[52%] top-[35%]",
  },
  {
    index: "03",
    label: "BCI / HAND",
    meta: "PHYSICAL ACTION",
    href: "/experiments/bci-dexterous-hand",
    position: "right-[20%] top-[45%]",
  },
] as const;

export function SpatialLabHero() {
  const atmosphere = motionAtmosphere.homeLab;

  return (
    <section className="relative isolate min-h-[820px] overflow-hidden bg-bg lg:min-h-[min(100svh,960px)]" aria-labelledby="home-title">
      <AmbientVideo
        src={atmosphere.src ?? ""}
        poster={atmosphere.poster ?? ""}
        alt={atmosphere.alt}
        priority
        eager
        className="absolute inset-0"
        mediaClassName="scale-[1.045]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(243,245,247,.18)_0%,rgba(243,245,247,0)_45%,rgba(11,16,32,.80)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:8vw_8vw] [mask-image:linear-gradient(to_bottom,transparent_18%,black_58%,black)]" />

      <div className="absolute left-5 top-24 z-10 flex items-center gap-3 md:left-8 lg:left-16 lg:top-28">
        <span className="h-2 w-2 bg-signal-bright shadow-[0_0_0_5px_rgba(255,107,44,.14)]" aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Private lab / online</span>
      </div>
      <div className="absolute right-8 top-28 z-10 hidden border-l border-ink/20 pl-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-secondary md:block lg:right-16">
        Concept space / generated atmosphere
      </div>

      <div className="absolute inset-0 z-10 hidden lg:block" aria-label="Spatial experiment navigation">
        {hotspots.map((hotspot) => (
          <Link
            key={hotspot.href}
            href={hotspot.href}
            className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 text-ink ${hotspot.position}`}
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-white/75 bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-125" />
              <span className="relative h-2 w-2 rounded-full bg-signal-bright" />
            </span>
            <span className="max-w-0 overflow-hidden border-l border-transparent bg-white/72 px-0 py-2 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:max-w-64 group-hover:border-white/70 group-hover:px-3 group-hover:opacity-100 group-focus-visible:max-w-64 group-focus-visible:border-white/70 group-focus-visible:px-3 group-focus-visible:opacity-100">
              <span className="block min-w-52 whitespace-nowrap">
                <span className="block font-mono text-[10px] tracking-[0.14em] text-signal">EXP {hotspot.index}</span>
                <span className="mt-1 block font-mono text-[11px] font-semibold tracking-[0.1em]">{hotspot.label}</span>
                <span className="mt-1 block font-mono text-[9px] tracking-[0.1em] text-ink-secondary">{hotspot.meta}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto grid min-w-0 w-full max-w-[1440px] gap-7 px-5 pb-8 md:px-8 md:pb-10 lg:grid-cols-12 lg:px-16 lg:pb-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/68">Morgan / digital lab / index 2026</p>
            <h1 id="home-title" className="mt-4 max-w-[340px] text-[36px] font-semibold leading-[.94] tracking-[-0.045em] text-white sm:max-w-[520px] sm:text-[44px] md:max-w-[700px] md:text-[58px] lg:max-w-[780px] lg:text-[70px]">
              {pageCopy.home.headline}
            </h1>
            <p className="mt-5 max-w-[310px] break-words text-[15px] leading-relaxed text-white/72 sm:max-w-xl md:text-[17px]">{pageCopy.home.supporting}</p>
          </div>

          <div className="min-w-0 self-end lg:col-span-3 lg:col-start-10">
            <div className="border-l border-white/30 pl-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
              <p>AI / Robotics / Hardware</p>
              <p className="mt-2 text-white">Currently building 03 systems</p>
            </div>
            <Link href="/experiments" className="mt-5 inline-flex items-center gap-3 border-b border-white/45 pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-colors hover:border-signal-bright hover:text-signal-bright">
              Enter experiment index <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>

          <div className="grid min-w-0 grid-cols-3 border-t border-white/25 pt-4 lg:hidden">
            {hotspots.map((hotspot) => (
              <Link key={hotspot.href} href={hotspot.href} className="min-w-0 overflow-hidden border-r border-white/20 pr-2 last:border-r-0 last:pl-2">
                <span className="block font-mono text-[9px] tracking-[0.12em] text-signal-bright">{hotspot.index}</span>
                <span className="mt-1 block truncate text-[9px] font-medium leading-tight text-white sm:text-[10px]">{hotspot.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <a href="#experiments" className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 lg:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em]">Inspect</span>
        <ArrowDown size={15} aria-hidden />
      </a>
    </section>
  );
}
