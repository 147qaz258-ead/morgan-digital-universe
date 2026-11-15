"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, switchLocaleInPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/** 语言切换 = 分段方框控件。激活项黑底黄字，没有圆角胶囊。 */
export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = getDictionary(locale).nav;
  const current = pathname && pathname.length > 0 ? pathname : `/${locale}`;

  return (
    <div className="flex items-center border-[2px] border-ink" aria-label={t.languageAria} role="group">
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={switchLocaleInPath(current, code)}
            hrefLang={localeMeta[code].htmlLang}
            aria-current={active ? "true" : undefined}
            className={`flex min-h-11 items-center border-l-[2px] border-ink px-2 font-mono text-2xs font-bold uppercase tracking-[0.12em] transition-colors duration-150 ease-lab first:border-l-0 ${
              active ? "bg-ink text-sticker" : "text-ink-secondary hover:bg-sticker hover:text-ink"
            }`}
          >
            {localeMeta[code].short}
          </Link>
        );
      })}
    </div>
  );
}
