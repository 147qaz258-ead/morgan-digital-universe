import type { NextConfig } from "next";

/**
 * The site is served under a locale segment (`/en/...`, `/zh/...`). These
 * redirects keep the unprefixed URLs that were shared before i18n existed
 * working, and send them to the English tree.
 */
const legacyRoutes = ["/origin", "/experiments", "/capabilities", "/lab", "/vision", "/about"];

const nextConfig: NextConfig = {
  experimental: {
    // Root layout lives under the `[locale]` segment (i18n pattern), so
    // unmatched URLs need a full-document 404 that bypasses the layout.
    globalNotFound: true,
  },
  images: {
    // 首屏 LCP 元素就是一张海报，AVIF 比 WebP 再省约 40%；不支持的客户端回落到 WebP。
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      ...legacyRoutes.map((route) => ({ source: route, destination: `/en${route}`, permanent: false })),
      { source: "/experiments/:slug", destination: "/en/experiments/:slug", permanent: false },
    ];
  },
};

export default nextConfig;
