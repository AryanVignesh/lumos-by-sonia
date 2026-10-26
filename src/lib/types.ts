import type { TypedObject } from "@portabletext/types";

export type Img = {
  url: string;
  alt: string;
  width: number;
  height: number;
  lqip?: string;
};

export type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  coverImage: Img;
  body: TypedObject[];
};

export type PortfolioEvent = {
  title: string;
  slug: string;
  eventType: string;
  venue: string;
  date?: string;
  coverImage: Img;
  brief: string;
  concept: string;
  images: Img[];
  clientQuote?: string;
  featured: boolean;
};

export type GalleryImage = {
  id: string;
  image: Img;
  category: string;
  caption?: string;
};

export type Testimonial = {
  id: string;
  clientName: string;
  eventType: string;
  quote: string;
  rating: number;
  photo?: Img;
};
