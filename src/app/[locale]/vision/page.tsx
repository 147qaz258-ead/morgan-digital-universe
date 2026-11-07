import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVisionStages } from "@/content/vision";
import { getPageCopy } from "@/content/pages";
import { PageContainer, Section } from "@/components/layout/PageContainer";
import { BodyLarge, Meta } from "@/components/ui/typography";
import { ContactCta } from "@/components/layout/ContactCta";
import { getRouteMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { AtmosphereFrame } from "@/components/ui/AtmosphereFrame";
import { visionAtmosphere } from "@/content/atmosphere";
import { LabPageHeader } from "@/components/layout/LabInterface";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, getRouteMetadata(locale).vision);
}

export default async function VisionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const pageCopy = getPageCopy(locale);
  const visionStages = getVisionStages(locale);

  return (
    <PageContainer>
      <LabPageHeader eyebrow={pageCopy.vision.eyebrow} title={pageCopy.vision.title} intro={pageCopy.vision.intro} />

      <AtmosphereFrame media={visionAtmosphere.system} aspect="21/9" large preload locale={locale} />

      <Section className="!pt-16 md:!pt-20">
        {visionStages.map((stage, index) => (
          <div key={stage.id}>
            <div className="grid min-h-48 gap-6 border-t border-line py-10 md:grid-cols-12 md:items-center md:py-14">
              <div className="md:col-span-3"><Meta className="text-signal">0{index + 1} / {stage.label}</Meta></div>
              <BodyLarge className="max-w-3xl md:col-span-8 md:col-start-5">{stage.narrative}</BodyLarge>
            </div>
            {index === 1 ? <AtmosphereFrame media={visionAtmosphere.signalToHand} aspect="21/9" locale={locale} className="mb-10 md:mb-14" /> : null}
          </div>
        ))}
      </Section>

      <ContactCta locale={locale} />
    </PageContainer>
  );
}
