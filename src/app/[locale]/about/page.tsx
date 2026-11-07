import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfile } from "@/content/profile";
import { getPageCopy } from "@/content/pages";
import { PageContainer, Section } from "@/components/layout/PageContainer";
import { Body, Meta } from "@/components/ui/typography";
import { ContactCta } from "@/components/layout/ContactCta";
import { getRouteMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { LabPageHeader } from "@/components/layout/LabInterface";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createPageMetadata(locale, getRouteMetadata(locale).about);
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale).about;
  const profile = getProfile(locale);
  const pageCopy = getPageCopy(locale);

  return (
    <PageContainer>
      <LabPageHeader eyebrow={pageCopy.about.eyebrow} title={pageCopy.about.title} intro={pageCopy.about.intro} />

      <Section className="border-t border-line !pt-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {pageCopy.about.sections.map((section, index) => (
              <div key={section.label} className="grid gap-5 border-b border-line py-8 first:pt-0 md:grid-cols-[72px_1fr]">
                <Meta className="text-signal">0{index + 1}</Meta>
                <div>
                  <p className="text-xl font-semibold tracking-[-0.02em] text-ink">{section.label}</p>
                  <Body className="mt-3 max-w-xl text-ink-secondary">{section.body}</Body>
                </div>
              </div>
            ))}
          </div>
          <aside className="md:col-span-4 md:col-start-9">
            <div className="sticky top-28">
              <dl className="border-t border-line">
                {[
                  [t.rowLocation, profile.location ?? t.valuePrivate],
                  [t.rowContact, profile.email ? t.valueAvailable : t.valueOnRequest],
                  [t.rowFocus, t.valueFocus],
                  [t.rowTimezone, t.valueTimezone],
                  [t.rowLanguages, t.valueLanguages],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[90px_1fr] gap-4 border-b border-line py-4">
                    <dt><Meta className="text-ink-secondary">{label}</Meta></dt>
                    <dd className="text-xs font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-4 inline-flex min-h-11 items-center font-mono text-2xs tracking-[0.06em] text-signal transition-colors duration-300 ease-lab hover:text-ink"
                >
                  {profile.email}
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>

      <ContactCta locale={locale} />
    </PageContainer>
  );
}
