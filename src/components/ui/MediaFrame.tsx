import Image from "next/image";
import { ViewTransition } from "react";
import type { MediaAsset } from "@/content/types";
import { Meta } from "./typography";
import { PendingAsset } from "./PendingAsset";
import { LazyVideo } from "./LazyVideo";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

type Aspect = string;

export function MediaFrame({
  media,
  alt,
  aspect,
  caption,
  preload = false,
  large = false,
  fit,
  pendingLabel,
  locale = "en",
  className = "",
  transitionName,
}: {
  media: MediaAsset | null;
  alt: string;
  aspect?: Aspect;
  caption?: string | null;
  preload?: boolean;
  /** 重点媒体卡：更大的硬阴影，圆角仍为 0 */
  large?: boolean;
  fit?: "cover" | "contain";
  pendingLabel?: string;
  locale?: Locale;
  className?: string;
  transitionName?: string;
}) {
  const resolvedPendingLabel = pendingLabel ?? getDictionary(locale).media.pendingLabel;
  const shadow = large ? "shadow-[var(--shadow-media)]" : "shadow-[var(--shadow-card)]";
  const resolvedAspect = aspect ?? media?.aspectRatio ?? "16/9";
  const resolvedFit = fit ?? (media && media.height > media.width ? "contain" : "cover");
  const fitClass = resolvedFit === "contain" ? "object-contain" : "object-cover";
  const resolvedCaption = caption ?? media?.caption ?? null;
  const frame = (
    <figure className={className}>
      <div
        className={`relative w-full overflow-hidden border-[3px] border-ink bg-surface ${shadow}`}
        style={{ aspectRatio: resolvedAspect }}
      >
        {media?.src ? (
          media.kind === "video" ? (
            <LazyVideo
              src={media.src}
              poster={media.poster ?? undefined}
              captions={media.captions}
              className={`absolute inset-0 h-full w-full ${fitClass}`}
            />
          ) : (
            <Image
              src={media.src}
              alt={alt}
              fill
              preload={preload}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
              className={fitClass}
            />
          )
        ) : (
          <PendingAsset className="absolute inset-0 border-0" label={resolvedPendingLabel} />
        )}
      </div>
      {resolvedCaption ? (
        <figcaption className="mt-3 border-l-[3px] border-ink pl-3">
          <Meta className="normal-case tracking-[0.04em] text-ink-secondary">{resolvedCaption}</Meta>
        </figcaption>
      ) : null}
    </figure>
  );

  return transitionName ? (
    <ViewTransition name={transitionName} share="lab-media-morph" default="none">
      {frame}
    </ViewTransition>
  ) : frame;
}
