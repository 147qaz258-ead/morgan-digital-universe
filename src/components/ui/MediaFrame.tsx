import Image from "next/image";
import { ViewTransition } from "react";
import type { MediaAsset } from "@/content/types";
import { Meta } from "./typography";
import { PendingAsset } from "./PendingAsset";
import { LazyVideo } from "./LazyVideo";

type Aspect = "16/9" | "4/3" | "3/2" | "1/1" | "3/4" | "21/9";

export function MediaFrame({
  media,
  alt,
  aspect,
  caption,
  preload = false,
  large = false,
  pendingLabel = "Evidence pending",
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
  pendingLabel?: string;
  className?: string;
  transitionName?: string;
}) {
  const radius = large ? "rounded-[24px]" : "rounded-[16px]";
  const resolvedAspect = aspect ?? media?.aspectRatio ?? "16/9";
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
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={media.src}
              alt={alt}
              fill
              preload={preload}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
              className="object-cover"
            />
          )
        ) : (
          <PendingAsset className="absolute inset-0 border-0" label={pendingLabel} />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3">
          <Meta className="normal-case tracking-normal text-ink-secondary">{caption}</Meta>
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
