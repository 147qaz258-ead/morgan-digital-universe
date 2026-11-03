import type { Locale } from "@/i18n/config";

const en = {
  brandName: "MORGAN / DIGITAL LAB",
  mission: "Building AI systems that enter the physical world.",
  contactCta: "Build something real.",
  contactBody: "AI × Robotics × Hardware. Contact details will appear after they are confirmed for publication.",
  contactPending: "Contact — available on request",
  nav: [
    { label: "HOME", href: "/" },
    { label: "ORIGIN", href: "/origin" },
    { label: "EXPERIMENTS", href: "/experiments" },
    { label: "CAPABILITIES", href: "/capabilities" },
    { label: "LAB", href: "/lab" },
    { label: "VISION", href: "/vision" },
    { label: "ABOUT", href: "/about" },
  ],
};

const zh: typeof en = {
  brandName: "MORGAN / DIGITAL LAB",
  mission: "造能进入物理世界的 AI 系统。",
  contactCta: "做点真的。",
  contactBody: "AI × 机器人 × 硬件。联系方式确认可公开后再补上。",
  contactPending: "联系方式 — 按需提供",
  nav: [
    { label: "首页", href: "/" },
    { label: "来源", href: "/origin" },
    { label: "项目", href: "/experiments" },
    { label: "能力", href: "/capabilities" },
    { label: "实验室", href: "/lab" },
    { label: "愿景", href: "/vision" },
    { label: "关于", href: "/about" },
  ],
};

export const siteByLocale: Record<Locale, typeof en> = { en, zh };

export function getSite(locale: Locale) {
  return siteByLocale[locale];
}
