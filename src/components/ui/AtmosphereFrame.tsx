import Image from "next/image";
import { ViewTransition } from "react";
import type { GeneratedAtmosphereAsset } from "@/content/types";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { Meta } from "./typography";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";

type AtmosphereAspect = "16/9" | "4/3" | "3/2" | "21/9";

export function AtmosphereFrame({
  media,
  aspect,
  preload = false,
  large = false,
  locale = "en",
  className = "",
  transitionName,
}: {
  media: GeneratedAtmosphereAsset;
  aspect?: AtmosphereAspect;
  preload?: boolean;
  large?: boolean;
  locale?: Locale;
  className?: string;
  transitionName?: string;
}) {
  const t = getDictionary(locale).media;
  const radius = large ? "rounded-[24px]" : "rounded-[16px]";
  const frame = (
    <figure className={className}>
      <div
        className={`coordinate-corner relative w-full overflow-hidden border border-line bg-surface ${radius}`}
        style={{ aspectRatio: aspect ?? media.aspectRatio }}
      >
        {media.kind === "video" && media.src && media.poster ? (
          <AmbientVideo
            src={media.src}
            poster={media.poster}
            alt={media.alt}
            priority={preload}
            className="absolute inset-0 h-full w-full"
            mediaClassName="scale-[1.035]"
          />
        ) : (
          <Image
            src={media.src ?? ""}
            alt={media.alt}
            fill
            preload={preload}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
            className="object-cover"
          />
        )}
        <div className="absolute bottom-3 left-3 flex min-w-0 flex-col items-start gap-1 border-l border-signal-bright bg-bg/92 px-3 py-2 text-ink md:bottom-4 md:left-4 md:flex-row md:items-center md:gap-3">
          <Meta className="text-ink-secondary">{t.conceptAtmosphere}</Meta>
          <Meta className="text-signal">{t.generatedNote}</Meta>
        </div>
      </div>
    </figure>
  );

  return transitionName ? (
    <ViewTransition name={transitionName} share="lab-media-morph" default="none">
      {frame}
    </ViewTransition>
  ) : frame;
}
