import "./globals.css";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { archivoBlack, spaceGrotesk } from "@/lib/fonts";
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${archivoBlack.variable} ${GeistMono.variable}`}
    >
      <body className="bg-bg text-ink font-sans antialiased">
        <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-start justify-center gap-7 px-6 py-24">
          <span className="sticker sticker--signal">Error 404</span>
          <p
            className="font-display leading-[0.78] tracking-[-0.05em]"
            style={{ fontSize: "clamp(96px, 20vw, 200px)" }}
            aria-hidden
          >
            404
          </p>
          <h1 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-balance md:text-5xl">
            This page does not exist.
          </h1>
          <p className="max-w-xl border-l-[3px] border-ink pl-4 text-base leading-relaxed text-ink-secondary">
            The address may be outdated, or the page has moved. Try one of the
            language roots below.
          </p>
          <nav className="mt-2 flex flex-wrap gap-3">
            {locales.map((locale) => (
              <a
                key={locale}
                href={localePath(locale, "/")}
                className="brut-lift inline-flex min-h-12 items-center border-[3px] border-ink bg-surface px-5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink shadow-[var(--shadow-card)]"
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
