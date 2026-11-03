import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabItems } from "@/content/lab";
import { getPageCopy } from "@/content/pages";
import { PageContainer, Section } from "@/components/layout/PageContainer";
import { Body, Meta } from "@/components/ui/typography";
import { ContactCta } from "@/components/layout/ContactCta";
import { getRouteMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { EngineeringIndex } from "@/components/layout/Compositions";
import { DocumentationStatus } from "@/components/ui/DocumentationStatus";
import { LabPageHeader } from "@/components/layout/LabInterface";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, localePath } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, getRouteMetadata(locale).lab);
}

const categoryCode = { failure: "F", prototype: "P", equipment: "E", note: "N" } as const;

export default async function LabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale).lab;
  const pageCopy = getPageCopy(locale);
  const labItems = getLabItems(locale);
  const categoryLabel = t.categories;

  const activeCategories = Object.keys(categoryLabel).filter((category) =>
    labItems.some((item) => item.category === category),
  ) as Array<keyof typeof categoryLabel>;

  return (
    <PageContainer>
      <LabPageHeader eyebrow={pageCopy.lab.eyebrow} title={pageCopy.lab.title} intro={pageCopy.lab.intro} />

      <Section className="border-t border-line !pb-20 !pt-10">
        {labItems.length > 0 ? (
        <EngineeringIndex
          rail={(
            <div className="border-t border-line">
              {activeCategories.map((category, index) => (
                <div key={category} className="grid grid-cols-[38px_1fr] gap-3 border-b border-line py-4">
                  <Meta className="text-signal">0{index + 1}</Meta>
                  <Meta className="text-ink-secondary">{categoryLabel[category]}</Meta>
                </div>
              ))}
            </div>
          )}
        >
            <div>
              <div className="grid grid-cols-[64px_1fr_90px] gap-4 border-y border-line py-3 md:grid-cols-[86px_110px_1fr_120px]">
                <Meta className="text-ink-secondary">{t.columnId}</Meta>
                <Meta className="hidden text-ink-secondary md:block">{t.columnDate}</Meta>
                <Meta className="text-ink-secondary">{t.columnRecord}</Meta>
                <Meta className="text-right text-ink-secondary">{t.columnState}</Meta>
              </div>
              {labItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-[64px_1fr_90px] gap-4 border-b border-line py-6 md:grid-cols-[86px_110px_1fr_120px]">
                  <Meta className="text-signal">{categoryCode[item.category]}-{String(index + 1).padStart(3, "0")}</Meta>
                  <Meta className="hidden text-ink-secondary md:block">{item.date ?? "—"}</Meta>
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <Body className="mt-2 text-[14px] text-ink-secondary">{item.summary}</Body>
                    {item.media ? (
                      <MediaFrame media={item.media} alt={item.media.alt} aspect="16/9" locale={locale} className="mt-5 max-w-2xl" />
                    ) : null}
                    {item.relatedProject ? <Link className="mt-3 inline-block text-[12px] font-medium text-accent" href={localePath(locale, `/experiments/${item.relatedProject}`)}>{t.relatedExperiment}</Link> : null}
                  </div>
                  <Meta className="text-right text-ink-secondary">{item.status ?? t.openState}</Meta>
                </div>
              ))}
            </div>
        </EngineeringIndex>
        ) : (
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3"><p className="lab-kicker text-signal">{t.archiveLabel}</p></div>
            <div className="md:col-span-7 md:col-start-5">
              <DocumentationStatus
                locale={locale}
                label={t.pendingLabel}
                title={t.pendingTitle}
                body={pageCopy.lab.empty}
              />
            </div>
          </div>
        )}
      </Section>

      <ContactCta locale={locale} />
    </PageContainer>
  );
}
