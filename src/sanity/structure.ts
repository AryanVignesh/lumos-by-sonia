import type { StructureResolver } from "sanity/structure";

/** A simple, plainly-labelled sidebar for the Studio. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Lumos website")
    .items([
      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("portfolioEvent").title("Portfolio events"),
      S.documentTypeListItem("galleryImage").title("Gallery photos"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
    ]);
