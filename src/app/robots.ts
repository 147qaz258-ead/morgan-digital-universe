import type { MetadataRoute } from "next";
import { absoluteSiteUrl, siteUrl } from "@/lib/site-url";

/**
 * 站点是公开的项目档案，没有理由对爬虫关门。以前缺环境变量时会退化成
 * `Disallow: /`，等于把整站从搜索结果里摘掉，所以这里不再有那个分支。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
