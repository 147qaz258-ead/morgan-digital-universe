/**
 * 站点绝对地址。canonical、OG、sitemap、robots 全都依赖它。
 *
 * 之前这里是「没配环境变量就返回 null」，下游每个消费方都写了
 * `siteUrl ? … : undefined` 的降级分支 —— 结果是：robots.txt 变成
 * `Disallow: /`、sitemap.xml 变成空文件、og:image 全部消失。一次忘记配
 * 环境变量，整站就对搜索引擎关门了，而且没有任何报错。
 *
 * 生产域名是确定的，所以这里给默认值；环境变量只用于覆盖（换域名、
 * preview 想指向别处时）。
 */
const FALLBACK_SITE_URL = "https://morgan-digital-universe.vercel.app";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export const siteUrl = configuredSiteUrl || FALLBACK_SITE_URL;

export function absoluteSiteUrl(pathname = ""): string {
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
