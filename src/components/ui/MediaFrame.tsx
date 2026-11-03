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
  /** 重点媒体卡：24px 圆角 */
  large?: boolean;
  fit?: "cover" | "contain";
  pendingLabel?: string;
  locale?: Locale;
  className?: string;
  transitionName?: string;
}) {
  const resolvedPendingLabel = pendingLabel ?? getDictionary(locale).media.pendingLabel;
  const radius = large ? "rounded-[24px]" : "rounded-[16px]";
  const resolvedAspect = aspect ?? media?.aspectRatio ?? "16/9";
  const resolvedFit = fit ?? (media && media.height > media.width ? "contain" : "cover");
  const fitClass = resolvedFit === "contain" ? "object-contain" : "object-cover";
  const resolvedCaption = caption ?? media?.caption ?? null;
  const frame = (
    <figure className={className}>
      <div
        className={`relative w-full overflow-hidden border border-line bg-surface ${radius}`}
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
        <figcaption className="mt-3">
          <Meta className="normal-case tracking-normal text-ink-secondary">{resolvedCaption}</Meta>
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
