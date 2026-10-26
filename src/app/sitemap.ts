import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPortfolioEvents, getPosts } from "@/lib/content";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [events, posts] = await Promise.all([getPortfolioEvents(), getPosts()]);
  const pages = ["", "/about", "/portfolio", "/gallery", "/testimonials", "/blog", "/contact", "/enquire"];

  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...events.map((e) => ({
      url: `${base}/portfolio/${e.slug}`,
      lastModified: e.date ? new Date(e.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
