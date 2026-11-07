import { notFound } from "next/navigation";
import { LabWorldHero } from "@/components/home/LabWorldHero";
import { LabOverview } from "@/components/home/LabOverview";
import { ProjectWall } from "@/components/project/ProjectWall";
import { ContactCta } from "@/components/layout/ContactCta";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionRail } from "@/components/home/SectionRail";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).home.sections;
  const railItems = [
    { id: "index", label: t.index },
    { id: "origin", label: t.origin },
    { id: "capabilities", label: t.capabilities },
    { id: "lab", label: t.lab },
    { id: "now", label: t.now },
    { id: "vision", label: t.vision },
    { id: "contact", label: t.contact },
  ];
  return <>
    <LabWorldHero locale={locale} />
    <SectionRail locale={locale} items={railItems} />
    <ProjectWall locale={locale} />
    <LabOverview locale={locale} />
    <div id="contact" className="scroll-mt-28"><PageContainer><ContactCta locale={locale} /></PageContainer></div>
  </>;
}
