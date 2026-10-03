import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilityGroups } from "@/content/capabilities";
import { pageCopy } from "@/content/pages";
import { getEvidenceRecord } from "@/content/projects";
import { PageContainer, Section } from "@/components/layout/PageContainer";
import { H2, Meta } from "@/components/ui/typography";
import { ContactCta } from "@/components/layout/ContactCta";
import { evidenceHref, isVerifiedEvidence } from "@/lib/evidence";
import { routeMetadata } from "@/content/metadata";
import { createPageMetadata } from "@/lib/metadata";
import { LabPageHeader } from "@/components/layout/LabInterface";

export const metadata: Metadata = createPageMetadata(routeMetadata.capabilities);

export default function CapabilitiesPage() {
  return (
    <PageContainer>
      <LabPageHeader eyebrow={pageCopy.capabilities.eyebrow} title={pageCopy.capabilities.title} intro={pageCopy.capabilities.intro} />

      <Section className="border-t border-line !pt-0">
        {capabilityGroups.map((group, groupIndex) => (
          <section key={group.id} className="grid gap-8 border-b border-line py-14 md:grid-cols-12 md:py-20">
            <div className="md:col-span-4">
              <Meta className="text-signal">{String(groupIndex + 1).padStart(2, "0")}</Meta>
              <H2 className="mt-4">{group.title}</H2>
              <Meta className="mt-3 block text-ink-secondary">{group.subtitle}</Meta>
            </div>
            <div className="border-t border-line md:col-span-7 md:col-start-6">
              {group.items.map((item) => {
                const record = item.proofEvidenceId ? getEvidenceRecord(item.proofEvidenceId) : null;
                const verified = record && isVerifiedEvidence(record.evidence) ? record : null;
                return (
                  <div key={item.name} className="grid gap-3 border-b border-line py-6 md:grid-cols-[1fr_auto] md:items-center">
                    <p className="text-[17px] font-semibold text-ink">{item.name}</p>
                    {verified ? (
                      <Link href={evidenceHref(verified.project.slug, verified.evidence.id)} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                        {item.proofLabel}<ArrowUpRight size={14} aria-hidden />
                      </Link>
                    ) : <Meta className="text-ink-secondary">Evidence pending</Meta>}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </Section>

      <ContactCta />
    </PageContainer>
  );
}
