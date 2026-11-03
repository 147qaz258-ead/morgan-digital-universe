"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { ProgressRail } from "@/components/layout/LabInterface";
import { MediaWindow } from "@/components/ui/MediaWindow";
import { getHomeExperienceChapters } from "@/content/home-experience";
import { motionAtmosphere, projectAtmosphere } from "@/content/atmosphere";
import { getOriginStages } from "@/content/origin";
import { getPageCopy } from "@/content/pages";
import { getFeaturedProjects } from "@/content/projects";
import { getDictionary } from "@/i18n/dictionary";
import { localePath, type Locale } from "@/i18n/config";
import type { HomeExperienceChapter } from "@/content/types";

const chapterByProgress = (chapters: HomeExperienceChapter[], progress: number) =>
  chapters.find((chapter) => progress >= chapter.range[0] && progress < chapter.range[1])
  ?? chapters[chapters.length - 1];

// Begin fetching each scrub clip about one viewport before its scene starts.
const VIDEO_PREFETCH_PROGRESS = { physical: 0.08, signal: 0.48 } as const;

function ConceptMark({ label, note }: { label: string; note: string }) {
  return (
    <span className="absolute bottom-4 left-4 z-20 bg-bg/92 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-secondary">
      {label} <span className="ml-2 text-signal">{note}</span>
    </span>
  );
}

export function HomeScrollDirector({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLElement>(null);
  const lastChapter = useRef("entry");
  const requestedVideos = useRef({ physical: false, signal: false });
  const [activeChapter, setActiveChapter] = useState("entry");
  const [loadPhysicalVideo, setLoadPhysicalVideo] = useState(false);
  const [loadSignalVideo, setLoadSignalVideo] = useState(false);
  const pageCopy = getPageCopy(locale);
  const chapters = getHomeExperienceChapters(locale);
  const originStages = getOriginStages(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const t = getDictionary(locale).home;
  const workspaceMedia = featuredProjects.find((project) => project.slug === "ai-native-hardware-workspace")?.media.hero;
  const bciMedia = featuredProjects.find((project) => project.slug === "bci-dexterous-hand")?.media.hero;
  const mediaContextLabel = activeChapter === "ai-native-hardware-workspace" || activeChapter === "bci-dexterous-hand"
    ? t.mediaContextProject
    : t.mediaContextFilm;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let disposed = false;
    let loading = false;
    let revertTimeline: (() => void) | null = null;

    const mountTimeline = async () => {
      if (!query.matches || loading || revertTimeline) return;
      loading = true;
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      loading = false;
      if (disposed || !query.matches) return;

      gsap.registerPlugin(ScrollTrigger);
      const panels = gsap.utils.toArray<HTMLElement>("[data-home-panel]", root);
      const scenes = gsap.utils.toArray<HTMLElement>("[data-home-scene]", root);
      const homeScene = root.querySelector<HTMLElement>('[data-home-scene="home"]');
      const physicalScene = root.querySelector<HTMLElement>('[data-home-scene="physical-link"]');
      const aiScene = root.querySelector<HTMLElement>('[data-home-scene="ai-native-hardware-workspace"]');
      const bciScene = root.querySelector<HTMLElement>('[data-home-scene="bci-dexterous-hand"]');
      const signalScene = root.querySelector<HTMLElement>('[data-home-scene="origin-evidence"]');
      const entry = root.querySelector<HTMLElement>("[data-home-entry]");
      const identity = root.querySelector<HTMLElement>("[data-home-identity]");
      const scrubVideos = {
        home: root.querySelector<HTMLVideoElement>('[data-scroll-video="home"]'),
        physical: root.querySelector<HTMLVideoElement>('[data-scroll-video="physical-link"]'),
        signal: root.querySelector<HTMLVideoElement>('[data-scroll-video="origin-evidence"]'),
      };
      let frameRequest = 0;
      let pendingProgress = 0;

      gsap.set(panels, { autoAlpha: 0, y: 28, pointerEvents: "none" });
      gsap.set(identity, { autoAlpha: 0, y: 18 });
      gsap.set(scenes, { autoAlpha: 0, scale: 1.025 });
      gsap.set(homeScene, { autoAlpha: 1, scale: 1 });

      const clamp = (value: number) => Math.min(1, Math.max(0, value));
      const seek = (video: HTMLVideoElement | null, progress: number) => {
        if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
        const target = Math.min(video.duration - 0.025, Math.max(0.001, progress * video.duration));
        if (Math.abs(video.currentTime - target) > 0.025) video.currentTime = target;
      };
      const applyScrub = () => {
        frameRequest = 0;
        const progress = pendingProgress;
        scrubVideos.home ??= root.querySelector<HTMLVideoElement>('[data-scroll-video="home"]');
        scrubVideos.physical ??= root.querySelector<HTMLVideoElement>('[data-scroll-video="physical-link"]');
        scrubVideos.signal ??= root.querySelector<HTMLVideoElement>('[data-scroll-video="origin-evidence"]');
        seek(scrubVideos.home, clamp(progress / 0.24));
        seek(scrubVideos.physical, clamp((progress - 0.24) / 0.18));
        seek(scrubVideos.signal, clamp((progress - 0.64) / 0.18));
      };
      const handleScrubVideoReady = () => {
        if (!frameRequest) frameRequest = window.requestAnimationFrame(applyScrub);
      };
      root.addEventListener("lab:scrub-video-ready", handleScrubVideoReady);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            root.style.setProperty("--home-progress", String(progress));
            const chapter = chapterByProgress(chapters, progress);
            const chapterProgress = clamp((progress - chapter.range[0]) / (chapter.range[1] - chapter.range[0]));
            root.style.setProperty("--scene-progress", String(chapterProgress));
            pendingProgress = progress;
            if (progress >= VIDEO_PREFETCH_PROGRESS.physical && !requestedVideos.current.physical) {
              requestedVideos.current.physical = true;
              setLoadPhysicalVideo(true);
            }
            if (progress >= VIDEO_PREFETCH_PROGRESS.signal && !requestedVideos.current.signal) {
              requestedVideos.current.signal = true;
              setLoadSignalVideo(true);
            }
            if (!frameRequest) frameRequest = window.requestAnimationFrame(applyScrub);
            if (chapter.id !== lastChapter.current) {
              lastChapter.current = chapter.id;
              setActiveChapter(chapter.id);
              window.dispatchEvent(new CustomEvent("lab:chapter", { detail: { label: chapter.label } }));
            }
          },
        },
      });

      timeline
        .to(homeScene, { scale: 1.06, xPercent: -1.2, duration: 0.24 }, 0)
        .to(entry, { autoAlpha: 0, y: -26, duration: 0.08 }, 0.1)
        .to(identity, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.12)
        .to(identity, { autoAlpha: 0, y: -18, duration: 0.04 }, 0.22)
        .to(homeScene, { autoAlpha: 0, duration: 0.025 }, 0.235)
        .to(physicalScene, { autoAlpha: 1, scale: 1, duration: 0.025 }, 0.235)
        .to(physicalScene, { scale: 1.035, duration: 0.18 }, 0.24)
        .to(physicalScene, { autoAlpha: 0, duration: 0.025 }, 0.415)
        .to(aiScene, { autoAlpha: 1, scale: 1, duration: 0.025 }, 0.415)
        .to(aiScene, { scale: 1.045, xPercent: -1.5, duration: 0.115 }, 0.42)
        .to(aiScene, { autoAlpha: 0, duration: 0.025 }, 0.525)
        .to(bciScene, { autoAlpha: 1, scale: 1, duration: 0.025 }, 0.525)
        .to(bciScene, { scale: 1.045, xPercent: 1.5, duration: 0.115 }, 0.53)
        .to(bciScene, { autoAlpha: 0, duration: 0.025 }, 0.635)
        .to(signalScene, { autoAlpha: 1, scale: 1, duration: 0.025 }, 0.635)
        .to(signalScene, { scale: 1.035, duration: 0.185 }, 0.64);

      const windows = [
        ["physical-link", 0.24, 0.42],
        ["ai-native-hardware-workspace", 0.42, 0.53],
        ["bci-dexterous-hand", 0.53, 0.64],
        ["origin-evidence", 0.64, 0.82],
      ] as const;

      windows.forEach(([id, start, end]) => {
        const panel = root.querySelector<HTMLElement>(`[data-home-panel="${id}"]`);
        if (!panel) return;
        timeline
          .to(panel, { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.035 }, start)
          .to(panel, { autoAlpha: 1, duration: Math.max(end - start - 0.07, 0.02) }, start + 0.035)
          .to(panel, { autoAlpha: 0, y: -22, pointerEvents: "none", duration: 0.035 }, end - 0.035);
      });

      timeline.to({}, { duration: 0.18 }, 0.82);

      revertTimeline = () => {
        if (frameRequest) window.cancelAnimationFrame(frameRequest);
        root.removeEventListener("lab:scrub-video-ready", handleScrubVideoReady);
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set([...panels, identity], { clearProps: "all" });
        gsap.set([...scenes, entry], { clearProps: "transform,opacity,visibility" });
      };
    };

    const handlePreference = () => {
      if (query.matches) {
        void mountTimeline();
        return;
      }
      revertTimeline?.();
      revertTimeline = null;
      root.style.removeProperty("--home-progress");
      root.style.removeProperty("--scene-progress");
      setActiveChapter("entry");
    };

    query.addEventListener("change", handlePreference);
    void mountTimeline();

    return () => {
      disposed = true;
      query.removeEventListener("change", handlePreference);
      revertTimeline?.();
      root.style.removeProperty("--home-progress");
      root.style.removeProperty("--scene-progress");
      window.dispatchEvent(new CustomEvent("lab:chapter", { detail: { label: getDictionary(locale).nav.idleChapter } }));
    };
  }, [chapters, locale]);

  return (
    <section ref={rootRef} className="relative bg-ink lg:h-[640svh]" aria-label={t.sectionAria}>
      <noscript>
        <style>{`.home-desktop-experience{display:none!important}.home-natural-experience{display:block!important}`}</style>
      </noscript>

      <div className="home-desktop-experience sticky top-0 hidden h-svh overflow-hidden lg:block">
        <div data-home-scene="home" className="absolute inset-0 will-change-transform">
          <AmbientVideo
            src={motionAtmosphere.homeLab.scrubSrc ?? motionAtmosphere.homeLab.src}
            poster={motionAtmosphere.homeLab.poster ?? ""}
            alt={motionAtmosphere.homeLab.alt}
            priority
            loadPolicy="eager"
            playbackMode="scrub"
            scrubId="home"
            className="absolute inset-0"
          />
        </div>
        <div data-home-scene="physical-link" className="invisible absolute inset-0 opacity-0 will-change-transform">
          <AmbientVideo
            src={motionAtmosphere.physicalLink.scrubSrc ?? motionAtmosphere.physicalLink.src}
            poster={motionAtmosphere.physicalLink.poster ?? ""}
            alt={motionAtmosphere.physicalLink.alt}
            loadPolicy="controlled"
            loadWhen={loadPhysicalVideo}
            playbackMode="scrub"
            scrubId="physical-link"
            className="absolute inset-0"
          />
        </div>
        <div data-home-scene="ai-native-hardware-workspace" className="invisible absolute inset-0 opacity-0 will-change-transform">
          <Image
            src={workspaceMedia?.src ?? projectAtmosphere["ai-native-hardware-workspace"].src ?? ""}
            alt={workspaceMedia?.alt ?? projectAtmosphere["ai-native-hardware-workspace"].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div data-home-scene="bci-dexterous-hand" className="invisible absolute inset-0 opacity-0 will-change-transform">
          <Image
            src={bciMedia?.src ?? projectAtmosphere["bci-dexterous-hand"].src ?? ""}
            alt={bciMedia?.alt ?? projectAtmosphere["bci-dexterous-hand"].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div data-home-scene="origin-evidence" className="invisible absolute inset-0 opacity-0 will-change-transform">
          <AmbientVideo
            src={motionAtmosphere.visionSignal.scrubSrc ?? motionAtmosphere.visionSignal.src}
            poster={motionAtmosphere.visionSignal.poster ?? ""}
            alt={motionAtmosphere.visionSignal.alt}
            loadPolicy="controlled"
            loadWhen={loadSignalVideo}
            playbackMode="scrub"
            scrubId="origin-evidence"
            className="absolute inset-0"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,247,245,.10)_0%,rgba(13,27,42,.03)_42%,rgba(13,27,42,.88)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:8vw_8vw] [mask-image:linear-gradient(to_bottom,transparent_16%,black_58%,black)]" />
        <div className="pointer-events-none absolute left-[var(--page-gutter)] top-24 z-30 font-mono text-[9px] uppercase tracking-[0.16em] text-white/58">
          {t.scrollHint}
        </div>
        <div className="pointer-events-none absolute right-[var(--page-gutter)] top-24 z-30 font-mono text-[9px] uppercase tracking-[0.16em] text-white/58">
          {mediaContextLabel}
        </div>

        <div data-home-entry className="absolute inset-x-0 bottom-0 z-10 mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-6 px-[var(--page-gutter)] pb-12 text-white">
          <div className="col-span-8">
            <p className="lab-kicker text-white/62">{t.entryKicker}</p>
            <h1 className="mt-5 max-w-[850px] text-[clamp(64px,6.6vw,104px)] font-semibold leading-[0.88] tracking-[-0.06em]">
              {pageCopy.home.headline}
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/70">{pageCopy.home.supporting}</p>
          </div>
          <div className="col-span-3 col-start-10 self-end">
            <div className="space-y-3 border-l border-white/30 pl-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/72">
              <p>{t.focusLine}</p>
              <p>{t.statusLine}</p>
              <p>{t.indexLine}</p>
            </div>
          </div>
          <div className="col-span-12 mt-5 text-white/62"><ProgressRail label={t.scrollLabel} /></div>
        </div>

        <div data-home-identity className="pointer-events-none absolute inset-x-0 top-[20%] z-10 mx-auto grid w-full max-w-[1440px] grid-cols-12 px-[var(--page-gutter)] text-white">
          <div className="col-span-5 col-start-2 border-l border-white/30 pl-6">
            <p className="lab-kicker text-signal-bright">{t.identityLabel}</p>
            <p className="mt-4 text-[34px] font-semibold leading-tight tracking-[-0.035em]">{t.identityTitle}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/66">{t.identityBody}</p>
          </div>
        </div>

        {featuredProjects.map((project, index) => {
          const active = activeChapter === project.slug;
          const movingScene = project.slug === "physical-link";
          return (
            <article
              key={project.slug}
              data-home-panel={project.slug}
              aria-hidden={!active}
              className="absolute inset-x-0 top-[22%] z-20 mx-auto grid w-full max-w-[1440px] grid-cols-12 px-[var(--page-gutter)] text-white will-change-transform"
            >
              <div className={`col-span-4 border-l border-white/34 bg-ink/64 p-7 ${index % 2 === 1 ? "col-start-2" : "col-start-9"}`}>
                <p className="lab-kicker text-signal-bright">EXP.{project.index} / {project.category}</p>
                <h2 className="mt-5 text-[48px] font-semibold leading-[0.92] tracking-[-0.055em]">{project.shortTitle}</h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/68">{project.oneLine}</p>
                <div className="mt-7 grid grid-cols-[82px_1fr] border-y border-white/18 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/54">
                  <span>{t.mediaRowLabel}</span>
                  <span>{movingScene ? t.mediaConceptFilm : project.media.hero ? t.mediaProjectCapture : t.mediaConceptStill}</span>
                </div>
                <Link
                  href={localePath(locale, `/experiments/${project.slug}`)}
                  transitionTypes={["project-forward"]}
                  tabIndex={active ? 0 : -1}
                  className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-white/45 font-mono text-[11px] uppercase tracking-[0.13em] text-white transition-colors hover:border-signal-bright hover:text-signal-bright"
                >
                  {t.openCase} <ArrowUpRight size={15} aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}

        <div
          data-home-panel="origin-evidence"
          aria-hidden={activeChapter !== "origin-evidence"}
          className="absolute inset-x-0 top-[18%] z-20 mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-6 px-[var(--page-gutter)] text-white will-change-transform"
        >
          <div className="col-span-4">
            <p className="lab-kicker text-signal-bright">{t.originLabel}</p>
            <h2 className="mt-5 text-[48px] font-semibold leading-[0.94] tracking-[-0.05em]">{t.originTitle}</h2>
            <Link href={localePath(locale, "/origin")} tabIndex={activeChapter === "origin-evidence" ? 0 : -1} className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-white/40 font-mono text-[11px] uppercase tracking-[0.12em] hover:text-signal-bright">
              {t.viewOrigin} <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
          <div className="col-span-7 col-start-6 border-y border-white/24 bg-ink/46">
            {originStages.map((stage) => (
              <div key={stage.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-5 border-b border-white/16 px-5 py-5 last:border-b-0">
                <span className="lab-kicker text-signal-bright">{stage.label}</span>
                <span className="text-[16px] font-medium">{stage.title}</span>
                <span className="lab-kicker text-white/48">{stage.yearRange ?? t.openYear}</span>
              </div>
            ))}
            <div className="grid grid-cols-[64px_1fr] gap-5 border-t border-white/24 px-5 py-5">
              <span className="lab-kicker text-signal-bright">{t.docLabel}</span>
              <span className="text-[13px] leading-relaxed text-white/62">{t.docBody}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-[var(--page-gutter)] z-30 w-[min(44vw,520px)] text-white/58">
          <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em]">
            <span>{chapters.find((item) => item.id === activeChapter)?.label ?? t.scrollLabel}</span>
            <span>{t.sceneTime}</span>
          </div>
          <span className="relative block h-px overflow-hidden bg-white/24">
            <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-[var(--scene-progress,0)] bg-signal-bright will-change-transform" />
          </span>
          <div className="mt-3"><ProgressRail label={t.fullSequence} /></div>
        </div>
        <a href="#now" className="absolute bottom-7 right-[var(--page-gutter)] z-30 flex min-h-11 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/58 hover:text-white">
          {t.continueLabel} <ArrowDown size={14} aria-hidden />
        </a>
      </div>

      <div className="home-natural-experience bg-bg lg:hidden">
        <div className="relative min-h-[760px] overflow-hidden text-white sm:min-h-[820px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${motionAtmosphere.homeLab.poster ?? ""})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,42,.04),rgba(13,27,42,.88))]" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-9">
            <p className="lab-kicker text-signal-bright">{t.entryKicker}</p>
            <h1 className="mt-5 text-[44px] font-semibold leading-[0.91] tracking-[-0.055em]">{pageCopy.home.headline}</h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">{pageCopy.home.supporting}</p>
            <div className="mt-8 text-white/60"><ProgressRail label={t.scrollLabel} /></div>
          </div>
        </div>
        <div className="px-5 py-20 sm:px-8">
          <p className="lab-kicker text-signal">{t.selectedLabel} {String(featuredProjects.length).padStart(2, "0")}</p>
          {featuredProjects.map((project) => {
            const media = project.media.hero ?? (project.slug === "physical-link" ? motionAtmosphere.physicalLink : projectAtmosphere[project.slug]);
            const isConcept = media?.provenance === "generated-atmosphere";
            return (
              <article key={project.slug} className="border-t border-line py-10 first:mt-6">
                <MediaWindow className="aspect-[4/3]">
                  {media?.poster || media?.src ? <Image src={media.poster ?? media.src ?? ""} alt={media.alt} fill sizes="100vw" className={media.height > media.width ? "object-contain" : "object-cover"} /> : null}
                  {isConcept ? <ConceptMark label={t.conceptFilm} note={t.conceptNote} /> : null}
                </MediaWindow>
                <p className="lab-kicker mt-5 text-signal">EXP.{project.index} / {project.category}</p>
                <h2 className="mt-3 text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink">{project.shortTitle}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">{project.oneLine}</p>
                <Link href={localePath(locale, `/experiments/${project.slug}`)} transitionTypes={["project-forward"]} className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-ink/30 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
                  {t.openCase} <ArrowUpRight size={14} aria-hidden />
                </Link>
              </article>
            );
          })}
          <div className="border-y border-line py-8">
            <p className="lab-kicker text-signal">{t.mobileOriginLabel}</p>
            <p className="mt-4 text-[24px] font-semibold tracking-[-0.03em] text-ink">{t.originChain}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-secondary">{t.mobileArchiveNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
