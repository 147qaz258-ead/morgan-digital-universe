import type { Locale } from "@/i18n/config";

export interface NavItem {
  label: string;
  href: string;
  /** 首页单页滚动时的锚点；`/about` 这类独立页面不需要 */
  anchor?: string;
}

const en = {
  brandName: "MORGAN / DIGITAL LAB",
  mission: "Building AI systems that enter the physical world.",
  contactCta: "Build something real.",
  contactBody: "AI × Robotics × Hardware. Email or GitHub — whichever fits what you are building.",
  contactPending: "Contact — available on request",
  nav: [
    { label: "HOME", href: "/" },
    { label: "EXPERIMENTS", href: "/experiments", anchor: "index" },
    { label: "ORIGIN", href: "/origin", anchor: "origin" },
    { label: "CAPABILITIES", href: "/capabilities", anchor: "capabilities" },
    { label: "LAB", href: "/lab", anchor: "lab" },
    { label: "VISION", href: "/vision", anchor: "vision" },
    { label: "ABOUT", href: "/about" },
  ] as NavItem[],
};

const zh: typeof en = {
  brandName: "MORGAN / DIGITAL LAB",
  mission: "造能进入物理世界的 AI 系统。",
  contactCta: "做点真的。",
  contactBody: "AI × 机器人 × 硬件。邮件或 GitHub，哪条顺手走哪条。",
  contactPending: "联系方式 — 按需提供",
  nav: [
    { label: "首页", href: "/" },
    { label: "项目", href: "/experiments", anchor: "index" },
    { label: "来源", href: "/origin", anchor: "origin" },
    { label: "能力", href: "/capabilities", anchor: "capabilities" },
    { label: "实验室", href: "/lab", anchor: "lab" },
    { label: "愿景", href: "/vision", anchor: "vision" },
    { label: "关于", href: "/about" },
  ],
};

export const siteByLocale: Record<Locale, typeof en> = { en, zh };

export function getSite(locale: Locale) {
  return siteByLocale[locale];
}
