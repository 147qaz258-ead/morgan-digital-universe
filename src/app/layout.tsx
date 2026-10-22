import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site-url";
import { routeMetadata } from "@/content/metadata";
import { visualTokens } from "@/lib/visual-tokens";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: routeMetadata.home.title,
    template: "%s — MORGAN / DIGITAL LAB",
  },
  description: routeMetadata.home.description,
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: "MORGAN / DIGITAL LAB",
    description: profile.headline,
    type: "website",
    url: siteUrl ?? undefined,
    images: siteUrl ? [{ url: routeMetadata.home.ogImage, width: 1200, height: 630 }] : undefined,
  },
  twitter: { card: "summary_large_image", images: siteUrl ? [routeMetadata.home.ogImage] : undefined },
};

export const viewport: Viewport = {
  themeColor: visualTokens.background,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: profile.displayName,
      ...(siteUrl ? { url: siteUrl } : {}),
      description: profile.headline,
    },
    {
      "@type": "WebSite",
      name: profile.brandName,
      ...(siteUrl ? { url: siteUrl } : {}),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
