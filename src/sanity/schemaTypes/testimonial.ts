import { defineField, defineType } from "sanity";
import { eventTypes } from "../../config/site";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "clientName", title: "Client name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "eventType",
      title: "Type of event",
      type: "string",
      options: { list: eventTypes.map((t) => ({ title: t, value: t })), layout: "dropdown" },
    }),
    defineField({
      name: "quote",
      title: "What they said",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      title: "Star rating (1 to 5)",
      type: "number",
      initialValue: 5,
      options: { list: [5, 4, 3, 2, 1], layout: "radio", direction: "horizontal" },
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "photo",
      title: "Client photo (optional)",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Describe the photo", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "clientName", eventType: "eventType", rating: "rating", media: "photo" },
    prepare: ({ title, eventType, rating, media }) => ({
      title,
      subtitle: `${"★".repeat(rating || 0)} ${eventType ?? ""}`.trim(),
      media,
    }),
  },
});
