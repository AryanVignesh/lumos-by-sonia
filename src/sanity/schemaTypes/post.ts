import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: 'Click "Generate" to create it from the title.',
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      description: "One or two sentences shown on the blog list.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Cover photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          description: "A short description for people using screen readers, e.g. 'Floral arch at a garden wedding'.",
          type: "string",
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Post content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Small heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
        defineArrayMember({
          type: "image",
          title: "Photo",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Describe the photo", type: "string" }),
            defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", media: "coverImage" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString("en-GB", { dateStyle: "medium" }) : "Not dated",
      media,
    }),
  },
});
