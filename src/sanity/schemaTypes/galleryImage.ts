import { defineField, defineType } from "sanity";
import { galleryCategories } from "../../config/site";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          description: "Short description for screen readers.",
          type: "string",
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: galleryCategories.map((c) => ({ title: c, value: c })), layout: "radio" },
      initialValue: "Weddings",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
    defineField({
      name: "order",
      title: "Position",
      description: "Lower numbers appear first. Leave empty to show newest first.",
      type: "number",
    }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "caption", subtitle: "category", media: "image" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "Untitled photo", subtitle, media }),
  },
});
