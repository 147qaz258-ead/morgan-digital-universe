const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export const siteUrl = configuredSiteUrl || null;

export function absoluteSiteUrl(pathname = ""): string | null {
  if (!siteUrl) return null;
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
