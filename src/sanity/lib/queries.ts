import { groq } from "next-sanity";

const image = (field: string) => `"${field}": ${field}{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`;

const portfolioFields = `
  title,
  "slug": slug.current,
  eventType,
  venue,
  date,
  ${image("coverImage")},
  brief,
  concept,
  "images": coalesce(images[]{
    "url": asset->url,
    "alt": coalesce(alt, ""),
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "lqip": asset->metadata.lqip
  }, []),
  clientQuote,
  "featured": coalesce(featured, false)
`;

export const portfolioListQuery = groq`*[_type == "portfolioEvent" && defined(slug.current)] | order(featured desc, date desc) { ${portfolioFields} }`;
export const portfolioBySlugQuery = groq`*[_type == "portfolioEvent" && slug.current == $slug][0] { ${portfolioFields} }`;

export const galleryQuery = groq`*[_type == "galleryImage" && defined(image.asset)] | order(coalesce(order, 999) asc, _createdAt desc) {
  "id": _id,
  ${image("image")},
  category,
  caption
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc) {
  "id": _id,
  clientName,
  eventType,
  quote,
  "rating": coalesce(rating, 5),
  ${image("photo")}
}`;

const postFields = `
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  ${image("coverImage")}
`;

export const postListQuery = groq`*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { ${postFields} }`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  ${postFields},
  "body": body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
}`;
