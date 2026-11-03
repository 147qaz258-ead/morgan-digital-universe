import type { Profile } from "./types";
import type { Locale } from "@/i18n/config";

const en: Profile = {
  displayName: "Morgan",
  brandName: "MORGAN / DIGITAL LAB",
  headline: "Building AI Systems That Enter the Physical World.",
  subheadline: "Moving intelligence from screens into the physical world.",
  location: null,
  email: null,
  github: null,
  portrait: null,
  socialLinks: [],
  currentFocus: [
    { label: "AI-native hardware interfaces", status: "BUILDING" },
    { label: "Physical AI systems", status: "EXPLORING" },
    { label: "Robotics and dexterous manipulation", status: "ACTIVE" },
  ],
};

const zh: Profile = {
  displayName: "Morgan",
  brandName: "MORGAN / DIGITAL LAB",
  headline: "造能进入物理世界的 AI 系统。",
  subheadline: "把智能从屏幕里挪进物理世界。",
  location: null,
  email: null,
  github: null,
  portrait: null,
  socialLinks: [],
  currentFocus: [
    { label: "AI 原生硬件交互", status: "BUILDING" },
    { label: "物理 AI 系统", status: "EXPLORING" },
    { label: "机器人与灵巧操作", status: "ACTIVE" },
  ],
};

export const profileByLocale: Record<Locale, Profile> = { en, zh };

export function getProfile(locale: Locale): Profile {
  return profileByLocale[locale];
}
