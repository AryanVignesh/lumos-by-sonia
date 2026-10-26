import "server-only";
import { client } from "@/sanity/lib/client";
import {
  galleryQuery,
  portfolioBySlugQuery,
  portfolioListQuery,
  postBySlugQuery,
  postListQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import {
  placeholderGallery,
  placeholderPortfolio,
  placeholderPosts,
  placeholderTestimonials,
} from "./placeholder-content";
import type { GalleryImage, PortfolioEvent, Post, Testimonial } from "./types";

/** Cache tags — the Sanity webhook revalidates by document type. */
export const tags = {
  post: "post",
  portfolioEvent: "portfolioEvent",
  galleryImage: "galleryImage",
  testimonial: "testimonial",
} as const;

async function sanityFetch<T>(
  query: string,
  params: Record<string, string>,
  tag: string,
  fallback: T,
): Promise<T> {
  if (!client) return fallback;
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 3600, tags: [tag] },
    });
    return result ?? fallback;
  } catch (error) {
    console.error(`[sanity] failed to fetch "${tag}"`, error);
    return fallback;
  }
}

// When Sanity is connected, an empty result is real (the owner removed items), so
// placeholders are only used when no Sanity project is configured.
const usePlaceholders = !client;

export function getPortfolioEvents() {
  return sanityFetch<PortfolioEvent[]>(portfolioListQuery, {}, tags.portfolioEvent, usePlaceholders ? placeholderPortfolio : []);
}

export async function getFeaturedEvents(limit = 3) {
  const events = await getPortfolioEvents();
  const featured = events.filter((e) => e.featured);
  return (featured.length ? featured : events).slice(0, limit);
}

export function getPortfolioEvent(slug: string) {
  return sanityFetch<PortfolioEvent | null>(
    portfolioBySlugQuery,
    { slug },
    tags.portfolioEvent,
    usePlaceholders ? (placeholderPortfolio.find((e) => e.slug === slug) ?? null) : null,
  );
}

export function getGalleryImages() {
  return sanityFetch<GalleryImage[]>(galleryQuery, {}, tags.galleryImage, usePlaceholders ? placeholderGallery : []);
}

export function getTestimonials() {
  return sanityFetch<Testimonial[]>(testimonialsQuery, {}, tags.testimonial, usePlaceholders ? placeholderTestimonials : []);
}

export function getPosts() {
  return sanityFetch<Post[]>(postListQuery, {}, tags.post, usePlaceholders ? placeholderPosts : []);
}

export function getPost(slug: string) {
  return sanityFetch<Post | null>(
    postBySlugQuery,
    { slug },
    tags.post,
    usePlaceholders ? (placeholderPosts.find((p) => p.slug === slug) ?? null) : null,
  );
}
