import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { pageCopy } from "@/content/pages";
import { PageContainer, Section } from "@/components/layout/PageContainer";
import { Body, Meta } from "@/components/ui/typography";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { DocumentationStatus } from "@/components/ui/DocumentationStatus";
import { ContactCta } from "@/components/layout/ContactCta";
import { routeMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { LabPageHeader } from "@/components/layout/LabInterface";

export const metadata: Metadata = createPageMetadata(routeMetadata.about);

export default function AboutPage() {
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
                  <p className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{section.label}</p>
                  <Body className="mt-3 max-w-xl text-ink-secondary">{section.body}</Body>
                </div>
              </div>
            ))}
          </div>
          <aside className="md:col-span-4 md:col-start-9">
            <div className="sticky top-28">
              {profile.portrait?.status === "verified" ? (
                <MediaFrame media={profile.portrait} alt={profile.portrait.alt} aspect="3/4" large />
              ) : (
                <DocumentationStatus
                  label="Portrait / pending"
                  title="A real working portrait will appear here."
                  body="No generated person or substitute photograph is used. Publication permission and caption remain required."
                />
              )}
              <dl className="mt-6 border-t border-line">
                {[
                  ["Location", profile.location ?? "Private"],
                  ["Contact", profile.email ? "Available" : "On request"],
                  ["Focus", "Physical AI systems"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[90px_1fr] gap-4 border-b border-line py-4">
                    <dt><Meta className="text-ink-secondary">{label}</Meta></dt>
                    <dd className="text-[13px] font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <ContactCta />
    </PageContainer>
  );
}
