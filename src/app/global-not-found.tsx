import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { localeMeta, locales, localePath } from "@/i18n/config";

export const metadata: Metadata = {
  title: "404 — MORGAN / DIGITAL LAB",
  description: "The page you are looking for does not exist.",
  robots: { index: false },
};

/**
 * Full-document 404 used when a URL matches no route. Required because the
 * root layout lives under the `[locale]` dynamic segment (i18n pattern), so a
 * route-level `not-found.js` cannot compose a consistent document for
 * unmatched URLs. Must bring its own fonts and styles — it bypasses the layout.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-8 px-6 py-24">
          <p className="font-mono text-xs tracking-[0.22em] text-ink-secondary uppercase">
            Error 404
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            This page does not exist.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-secondary">
            The address may be outdated, or the page has moved. Try one of the
            language roots below.
          </p>
          <nav className="flex flex-wrap gap-3">
            {locales.map((locale) => (
              <a
                key={locale}
                href={localePath(locale, "/")}
                className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {localeMeta[locale].label}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
