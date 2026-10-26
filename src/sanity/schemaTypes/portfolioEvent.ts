import { defineArrayMember, defineField, defineType } from "sanity";
import { eventTypes } from "../../config/site";

const altField = defineField({
  name: "alt",
  title: "Describe the photo",
  description: "Short description for screen readers.",
  type: "string",
});

export const portfolioEvent = defineType({
  name: "portfolioEvent",
  title: "Portfolio event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Event name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      description: 'Click "Generate" to create it from the event name.',
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eventType",
      title: "Type of event",
      type: "string",
      options: { list: eventTypes.map((t) => ({ title: t, value: t })), layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({ name: "date", title: "Event date", type: "date" }),
    defineField({
      name: "coverImage",
      title: "Cover photo",
      type: "image",
      options: { hotspot: true },
      fields: [altField],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "brief",
      title: "The brief",
      description: "What did the client ask for?",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "concept",
      title: "Our decor concept",
      description: "How did we bring it to life?",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "images",
      title: "Photo gallery",
      description: "Drag to reorder.",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [altField] })],
      options: { layout: "grid" },
    }),
    defineField({ name: "clientQuote", title: "What the client said", type: "text", rows: 3 }),
    defineField({
      name: "featured",
      title: "Show on the home page?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Event date, newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", eventType: "eventType", venue: "venue", media: "coverImage", featured: "featured" },
    prepare: ({ title, eventType, venue, media, featured }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [eventType, venue].filter(Boolean).join(" · "),
      media,
    }),
  },
});
