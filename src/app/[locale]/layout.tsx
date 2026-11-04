import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getProfile } from "@/content/profile";
import { siteUrl } from "@/lib/site-url";
import { getRouteMetadata } from "@/content/metadata";
import { visualTokens } from "@/lib/visual-tokens";
import { isLocale, locales, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const home = getRouteMetadata(locale).home;
  const profile = getProfile(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: home.title,
      template: "%s — MORGAN / DIGITAL LAB",
    },
    description: home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", "zh-CN": "/zh", "x-default": "/en" },
    },
    openGraph: {
      title: "MORGAN / DIGITAL LAB",
      description: profile.headline,
      type: "website",
      locale: localeMeta[locale].ogLocale,
      url: `/${locale}`,
      images: [{ url: home.ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [home.ogImage] },
  };
}

export const viewport: Viewport = {
  themeColor: visualTokens.background,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const profile = getProfile(locale);
  const t = getDictionary(locale).nav;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.displayName,
        url: siteUrl,
        description: profile.headline,
      },
      {
        "@type": "WebSite",
        name: profile.brandName,
        url: siteUrl,
        inLanguage: localeMeta[locale].htmlLang,
      },
    ],
  };

  return (
    <html lang={localeMeta[locale].htmlLang} data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          {t.skipToContent}
        </a>
        <Nav locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
