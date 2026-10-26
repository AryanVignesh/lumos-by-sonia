import { unsplash } from "./placeholder-content";

export const services = [
  {
    title: "Weddings",
    description:
      "From intimate ceremonies to grand receptions, we design every layer of your day: mandap and stage, florals, lighting, tablescapes and the small details guests remember.",
    image: unsplash("1511795409834-ef04bbd61622", "Wedding reception table with candles and florals", 900, 1100),
  },
  {
    title: "Engagements",
    description:
      "Ring ceremonies and engagement dinners that feel personal and romantic, with styling that photographs beautifully.",
    image: unsplash("1515934751635-c81c6bc9a2d8", "Engagement rings beside candlelight", 900, 1100),
  },
  {
    title: "Birthdays",
    description:
      "First birthdays to milestone parties, with balloon installations, themed backdrops and dessert tables your guests will love.",
    image: unsplash("1530103862676-de8c9debad1d", "Pastel balloon installation", 900, 1100),
  },
  {
    title: "Corporate",
    description:
      "Launches, conferences, award nights and team celebrations, designed on-brand and delivered on time.",
    image: unsplash("1540575467063-178a50c2df87", "Corporate conference audience", 900, 1100),
  },
  {
    title: "Baby Showers",
    description: "Soft, joyful celebrations for parents-to-be, with gentle palettes, keepsake corners and thoughtful touches.",
    image: unsplash("1470753937643-efeb931202a9", "Soft pink florals", 900, 1100),
  },
  {
    title: "Themed Parties",
    description: "Have an idea? We bring themes to life with custom props, colour stories and immersive styling.",
    image: unsplash("1492684223066-81342ee5ff30", "Party with warm festive lights", 900, 1100),
  },
];

export const reasons = [
  {
    title: "Personalised design",
    text: "No templates. Every concept starts with your story, your taste and the way you want your guests to feel.",
  },
  {
    title: "Attention to detail",
    text: "From napkin folds to the angle of a spotlight, we sweat the small things so the whole feels effortless.",
  },
  {
    title: "End-to-end management",
    text: "Planning, vendors, set-up, the day itself and clean-up. One team, one point of contact, zero stress.",
  },
  {
    title: "Trusted vendors",
    text: "Years of relationships with florists, caterers, photographers and venues we know and trust.",
  },
];

export const process = [
  { step: "01", title: "Consult", text: "We meet over coffee or a call to understand your vision, guest list, budget and must-haves." },
  { step: "02", title: "Concept", text: "We create a moodboard, colour story and layout so you can see your event before it happens." },
  { step: "03", title: "Design", text: "We finalise every element: florals, lighting, furniture, stationery and vendors." },
  { step: "04", title: "Execute", text: "On the day we set up, manage timelines and handle every detail while you enjoy yourself." },
];
