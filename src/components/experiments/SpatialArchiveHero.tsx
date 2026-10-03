import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { motionAtmosphere } from "@/content/atmosphere";
import { AmbientVideo } from "@/components/media/AmbientVideo";

export function SpatialArchiveHero({ projects }: { projects: Project[] }) {
  const atmosphere = motionAtmosphere.homeLab;
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-bg lg:min-h-[min(88svh,900px)]" aria-labelledby="experiment-index-title">
      <AmbientVideo
        src={atmosphere.src ?? ""}
        poster={atmosphere.poster ?? ""}
        alt={atmosphere.alt}
        eager
        priority
        className="absolute inset-0"
        mediaClassName="scale-[1.045]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,245,247,.97)_0%,rgba(243,245,247,.90)_39%,rgba(243,245,247,.08)_73%)]" />

      <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-[1440px] flex-col px-5 pb-8 pt-32 md:px-8 lg:min-h-[min(88svh,900px)] lg:px-16 lg:pb-12 lg:pt-36">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">Spatial archive / 03 active</p>
          <h1 id="experiment-index-title" className="mt-5 text-[48px] font-semibold leading-[.9] tracking-[-0.055em] text-ink md:text-[70px] lg:text-[88px]">
            Experiment<br />Index
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-secondary">
            Move through the active systems. Generated space provides orientation; verified project records remain separate.
          </p>
        </div>

        <div className="mt-auto grid border-y border-ink/15 bg-bg/78 backdrop-blur-md md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/experiments/${project.slug}`}
              className="group grid min-h-32 grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-ink/15 px-4 py-5 last:border-b-0 md:min-h-40 md:grid-cols-1 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-signal">{project.index}</span>
              <span>
                <span className="block text-[18px] font-semibold leading-tight text-ink md:text-[22px]">{project.shortTitle}</span>
                <span className="mt-2 hidden font-mono text-[9px] uppercase tracking-[0.1em] text-ink-secondary md:block">{project.category}</span>
              </span>
              <ArrowUpRight size={16} className="text-ink-secondary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
