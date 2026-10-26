/**
 * Client details — edit everything about the business in this one file.
 * Anything marked "REPLACE" is a placeholder.
 */
export const siteConfig = {
  name: "Lumos by Sonia",
  shortName: "Lumos",
  descriptor: "Event Company",
  ownerName: "Sonia",
  tagline: "Events, thoughtfully illuminated.",
  description:
    "Lumos by Sonia is a boutique event management and decor company designing weddings, engagements, birthdays, baby showers and corporate events with warmth, detail and calm.",

  // REPLACE: your live domain (no trailing slash). Used for SEO, sitemap and Open Graph.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lumosbysonia.com",

  // REPLACE: contact details
  phone: "+91 98765 43210",
  /** International format, digits only — used for tap-to-call and WhatsApp links. */
  whatsappNumber: "919876543210",
  email: "hello@lumosbysonia.com",
  instagramHandle: "lumosbysonia",
  instagramUrl: "https://instagram.com/lumosbysonia",
  address: {
    street: "12 Example Street", // REPLACE
    city: "Chennai", // REPLACE
    region: "Tamil Nadu", // REPLACE
    postalCode: "600001", // REPLACE
    country: "IN",
  },
  /** Used for the embedded Google Map on the contact page. */
  mapQuery: "Chennai, Tamil Nadu, India", // REPLACE
  hours: [
    { days: "Monday – Saturday", time: "10:00 am – 7:00 pm" }, // REPLACE
    { days: "Sunday", time: "By appointment" },
  ],
  whatsappMessage: "Hi! I'd like to enquire about an event.",
  /** Used to stop enquiries for dates that have already passed. */
  timeZone: "Asia/Kolkata", // REPLACE if you are not in India

  stats: [
    { value: "150+", label: "Events designed" }, // REPLACE
    { value: "6", label: "Years of experience" }, // REPLACE
    { value: "120+", label: "Happy clients" }, // REPLACE
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const eventTypes = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Corporate",
  "Baby Shower",
  "Other",
] as const;

export const galleryCategories = ["Weddings", "Corporate", "Birthdays", "Others"] as const;

export function whatsappLink(message: string = siteConfig.whatsappMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:+${siteConfig.whatsappNumber}`;
}

export function fullAddress() {
  const a = siteConfig.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;
}
