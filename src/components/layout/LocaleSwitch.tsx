"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, switchLocaleInPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = getDictionary(locale).nav;
  const current = pathname && pathname.length > 0 ? pathname : `/${locale}`;

  return (
    <div className="flex items-center gap-1" aria-label={t.languageAria} role="group">
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={switchLocaleInPath(current, code)}
            hrefLang={localeMeta[code].htmlLang}
            aria-current={active ? "true" : undefined}
            className={`flex min-h-11 items-center px-2 font-mono text-2xs uppercase tracking-[0.14em] transition-colors ${
              active ? "text-signal" : "text-ink-secondary hover:text-ink"
            }`}
          >
            {localeMeta[code].short}
          </Link>
        );
      })}
    </div>
  );
}
