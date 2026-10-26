/**
 * Builds sanity-seed/seed.ndjson from the placeholder content so a fresh
 * Sanity dataset looks complete. Run with:  npm run seed:generate
 * Then import with:                         npm run seed:import
 *
 * Images use Sanity's `_sanityAsset` import syntax: they are downloaded from
 * Unsplash and uploaded to your Sanity project during import.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import {
  placeholderGallery,
  placeholderPortfolio,
  placeholderPosts,
  placeholderTestimonials,
} from "../src/lib/placeholder-content.ts";

type Img = { url: string; alt: string };

const asset = (img: Img) => ({
  _type: "image",
  _sanityAsset: `image@${img.url}`,
  alt: img.alt,
});

let n = 0;
const key = () => `seed${(n++).toString(36)}`;

const docs: Record<string, unknown>[] = [];

placeholderPosts.forEach((p, i) => {
  docs.push({
    _id: `seed-post-${i}`,
    _type: "post",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    publishedAt: p.publishedAt,
    excerpt: p.excerpt,
    coverImage: asset(p.coverImage),
    body: p.body.map((block) => {
      const b = block as Record<string, unknown>;
      if (b._type === "image") return { _key: key(), ...asset(b as unknown as Img) };
      return b;
    }),
  });
});

placeholderPortfolio.forEach((e, i) => {
  docs.push({
    _id: `seed-event-${i}`,
    _type: "portfolioEvent",
    title: e.title,
    slug: { _type: "slug", current: e.slug },
    eventType: e.eventType,
    venue: e.venue,
    date: e.date,
    coverImage: asset(e.coverImage),
    brief: e.brief,
    concept: e.concept,
    images: e.images.map((img) => ({ _key: key(), ...asset(img) })),
    clientQuote: e.clientQuote,
    featured: e.featured,
  });
});

placeholderGallery.forEach((g, i) => {
  docs.push({
    _id: `seed-gallery-${i}`,
    _type: "galleryImage",
    image: asset(g.image),
    category: g.category,
    caption: g.caption,
    order: i + 1,
  });
});

placeholderTestimonials.forEach((t, i) => {
  docs.push({
    _id: `seed-testimonial-${i}`,
    _type: "testimonial",
    clientName: t.clientName,
    eventType: t.eventType,
    quote: t.quote,
    rating: t.rating,
  });
});

mkdirSync("sanity-seed", { recursive: true });
writeFileSync("sanity-seed/seed.ndjson", docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to sanity-seed/seed.ndjson`);
