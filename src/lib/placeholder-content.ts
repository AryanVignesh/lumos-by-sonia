/**
 * Placeholder content shown until Sanity is connected (and used to build the
 * Sanity seed file in scripts/generate-seed.ts). Images are royalty-free
 * Unsplash photos — replace them with real Lumos photography.
 *
 * Keep this file free of runtime imports so the seed script can run it directly.
 */
import type { GalleryImage, Img, PortfolioEvent, Post, Testimonial } from "./types";

export function unsplash(id: string, alt: string, width = 1600, height = 1067): Img {
  return {
    url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`,
    alt,
    width,
    height,
  };
}

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

function paragraph(text: string, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

function inlineImage(img: Img) {
  return { _type: "image", _key: key(), ...img };
}

export const placeholderPortfolio: PortfolioEvent[] = [
  {
    title: "A Garden Wedding in Sage and Ivory",
    slug: "garden-wedding-sage-ivory",
    eventType: "Wedding",
    venue: "The Orchard Lawns",
    date: "2026-02-14",
    featured: true,
    coverImage: unsplash("1519741497674-611481863552", "Bride and groom walking through a softly lit garden"),
    brief:
      "Ananya and Rohan wanted their wedding to feel like an evening in a friend's garden: relaxed, green and full of candlelight, but still grand enough for three hundred guests.",
    concept:
      "We built the day around layered greenery, ivory florals and hundreds of hand-placed candles. Long family-style tables ran beneath a canopy of hanging foliage, and the mandap was framed with a soft arch of white roses, eucalyptus and trailing jasmine.",
    images: [
      unsplash("1464366400600-7168b8af9bc3", "Floral ceremony arch set up on a lawn", 1600, 1067),
      unsplash("1511795409834-ef04bbd61622", "Long reception table dressed with candles and flowers", 1600, 1067),
      unsplash("1469371670807-013ccf25f16a", "Bridal bouquet of white and blush flowers", 1200, 1500),
      unsplash("1520854221256-17451cc331bf", "Couple sharing a quiet moment at dusk", 1200, 1500),
    ],
    clientQuote:
      "Sonia understood exactly what we meant by 'effortless'. Every corner felt like us, and we didn't have to worry about a single thing on the day.",
  },
  {
    title: "Candlelit Engagement Dinner",
    slug: "candlelit-engagement-dinner",
    eventType: "Engagement",
    venue: "Private residence",
    date: "2025-11-22",
    featured: true,
    coverImage: unsplash("1515934751635-c81c6bc9a2d8", "Engagement rings resting beside candles"),
    brief:
      "An intimate engagement dinner for forty guests at the family home, with a ring exchange that felt personal rather than staged.",
    concept:
      "We turned the courtyard into a candlelit dining room: one long table, linen runners in warm sand, low arrangements of garden roses and a quiet corner for the ring exchange framed with draped fabric and fairy lights.",
    images: [
      unsplash("1478146896981-b80fe463b330", "Intimate dinner table with candles and low florals", 1600, 1067),
      unsplash("1478147427282-58a87a120781", "Glasses being raised in a toast at a candlelit table", 1600, 1067),
      unsplash("1470753937643-efeb931202a9", "Close-up of soft pink garden roses", 1200, 1500),
    ],
    clientQuote: "It felt like the most beautiful version of our own home. Our families still talk about that evening.",
  },
  {
    title: "Golden Hour Reception",
    slug: "golden-hour-reception",
    eventType: "Wedding",
    venue: "Lakeside Pavilion",
    date: "2025-12-06",
    featured: true,
    coverImage: unsplash("1465495976277-4387d4b0b4c6", "Wedding reception glowing at golden hour"),
    brief:
      "A sunset reception by the water, timed so the first dance would land just as the sky turned gold.",
    concept:
      "Warm brass, pampas and sand-toned linens echoed the colours of the lake at dusk. As the light faded, festoon lighting and lanterns took over so the space never lost its glow.",
    images: [
      unsplash("1519225421980-715cb0215aed", "Reception space dressed with warm lighting", 1600, 1067),
      unsplash("1532712938310-34cb3982ef74", "Detail of a reception place setting", 1200, 1500),
      unsplash("1522673607200-164d1b6ce486", "Couple embracing at sunset", 1600, 1067),
    ],
    clientQuote: "The timing, the light, the music. It all came together exactly when it needed to.",
  },
  {
    title: "Pastel Dreams First Birthday",
    slug: "pastel-dreams-first-birthday",
    eventType: "Birthday",
    venue: "Banquet Hall",
    date: "2026-01-18",
    featured: true,
    coverImage: unsplash("1530103862676-de8c9debad1d", "Pastel balloon installation for a birthday"),
    brief:
      "A first birthday that the little one could enjoy, and that the grown-ups would find genuinely beautiful too.",
    concept:
      "An organic balloon garland in blush, sage and cream framed a soft play corner, a dessert table and a photo wall. Everything was at toddler height, and nothing was sharp, small or breakable.",
    images: [
      unsplash("1513151233558-d860c5398176", "Confetti and balloons at a birthday celebration", 1600, 1067),
      unsplash("1527529482837-4698179dc6ce", "Guests celebrating with sparklers", 1200, 1500),
    ],
    clientQuote: "The balloon wall alone was worth it. Our photos look like a magazine spread.",
  },
  {
    title: "Annual Leadership Summit",
    slug: "annual-leadership-summit",
    eventType: "Corporate",
    venue: "City Convention Centre",
    date: "2025-09-12",
    featured: true,
    coverImage: unsplash("1540575467063-178a50c2df87", "Audience seated at a corporate summit"),
    brief:
      "A two-day leadership summit for 400 delegates that needed to feel premium, on-brand and run to the minute.",
    concept:
      "We designed a clean stage set in the client's colours, a welcoming registration lounge and an evening networking dinner with low lighting and lush centrepieces, while coordinating AV, catering and vendors behind the scenes.",
    images: [
      unsplash("1511578314322-379afb476865", "Corporate event stage and audience", 1600, 1067),
      unsplash("1505236858219-8359eb29e329", "Evening networking event with warm lighting", 1600, 1067),
      unsplash("1555244162-803834f70033", "Elegant catering buffet", 1600, 1067),
    ],
    clientQuote: "Calm, professional and incredibly organised. Our delegates noticed the difference.",
  },
  {
    title: "Little Star Baby Shower",
    slug: "little-star-baby-shower",
    eventType: "Baby Shower",
    venue: "Garden Café",
    date: "2025-10-04",
    featured: false,
    coverImage: unsplash("1470753937643-efeb931202a9", "Soft floral styling for a baby shower"),
    brief: "A gentle afternoon baby shower with close friends, games and plenty of good food.",
    concept:
      "Cloud-soft florals, star motifs and a palette of cream, sage and pale blue. We set up a tea table, a keepsake wishes corner and a comfortable seat of honour for the mum-to-be.",
    images: [
      unsplash("1478146896981-b80fe463b330", "Afternoon tea table with florals", 1600, 1067),
      unsplash("1414235077428-338989a2e8c0", "Plated food served at a celebration", 1600, 1067),
    ],
    clientQuote: "So calm and so pretty. I got to actually enjoy my own shower.",
  },
];

export const placeholderGallery: GalleryImage[] = [
  ["1519741497674-611481863552", "Weddings", "Garden wedding portraits", 1200, 1500],
  ["1530103862676-de8c9debad1d", "Birthdays", "Pastel balloon garland", 1600, 1067],
  ["1511795409834-ef04bbd61622", "Weddings", "Reception tablescape", 1600, 1067],
  ["1540575467063-178a50c2df87", "Corporate", "Leadership summit", 1600, 1067],
  ["1469371670807-013ccf25f16a", "Weddings", "Bridal bouquet", 1200, 1500],
  ["1513151233558-d860c5398176", "Birthdays", "Confetti moment", 1200, 1500],
  ["1478146896981-b80fe463b330", "Others", "Intimate dinner setting", 1600, 1067],
  ["1464366400600-7168b8af9bc3", "Weddings", "Ceremony arch", 1200, 1500],
  ["1511578314322-379afb476865", "Corporate", "Stage design", 1600, 1067],
  ["1470753937643-efeb931202a9", "Others", "Garden roses", 1200, 1200],
  ["1527529482837-4698179dc6ce", "Birthdays", "Sparkler send-off", 1600, 1067],
  ["1465495976277-4387d4b0b4c6", "Weddings", "Golden hour reception", 1600, 1067],
  ["1505236858219-8359eb29e329", "Corporate", "Networking evening", 1200, 1500],
  ["1478147427282-58a87a120781", "Others", "A toast at dusk", 1600, 1067],
  ["1522673607200-164d1b6ce486", "Weddings", "First look", 1200, 1500],
  ["1492684223066-81342ee5ff30", "Others", "Celebration lights", 1600, 1067],
  ["1532712938310-34cb3982ef74", "Weddings", "Place setting details", 1200, 1500],
  ["1555244162-803834f70033", "Corporate", "Catering spread", 1600, 1067],
].map(([id, category, caption, w, h], i) => ({
  id: `placeholder-gallery-${i}`,
  image: unsplash(id as string, caption as string, w as number, h as number),
  category: category as string,
  caption: caption as string,
}));

export const placeholderTestimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "Ananya & Rohan",
    eventType: "Wedding",
    quote:
      "From our first coffee with Sonia to the very last dance, we felt looked after. She took our scattered Pinterest boards and turned them into something far more beautiful than we imagined.",
    rating: 5,
  },
  {
    id: "t2",
    clientName: "Meera Krishnan",
    eventType: "Birthday",
    quote:
      "Our daughter's first birthday was magical. The decor was soft, safe for the little ones and so photogenic. Guests kept asking who planned it!",
    rating: 5,
  },
  {
    id: "t3",
    clientName: "Arjun Mehta",
    eventType: "Corporate",
    quote:
      "Professional, calm and detail-obsessed in the best way. Lumos handled 400 delegates and a dozen vendors without a single hiccup.",
    rating: 5,
  },
  {
    id: "t4",
    clientName: "Priya & Karthik",
    eventType: "Engagement",
    quote:
      "Sonia turned our courtyard into the most romantic dinner setting. It felt personal, warm and completely us.",
    rating: 5,
  },
  {
    id: "t5",
    clientName: "Divya Raman",
    eventType: "Baby Shower",
    quote: "Everything was gentle and lovely, and I didn't have to lift a finger. Thank you for making it so special.",
    rating: 5,
  },
  {
    id: "t6",
    clientName: "Sneha Iyer",
    eventType: "Wedding",
    quote:
      "Responsive, creative and honest about budget. Our families were blown away by the mandap and the lighting.",
    rating: 4,
  },
];

export const placeholderPosts: Post[] = [
  {
    title: "Behind the Scenes: Building a Garden Wedding",
    slug: "behind-the-scenes-garden-wedding",
    publishedAt: "2026-02-20T09:00:00.000Z",
    excerpt:
      "Three hundred candles, two kilometres of greenery and one very calm bride. Here's how our sage and ivory garden wedding came together.",
    coverImage: unsplash("1464366400600-7168b8af9bc3", "Floral ceremony arch on a garden lawn"),
    body: [
      paragraph(
        "Every wedding starts with a feeling. For Ananya and Rohan, the word they kept returning to was 'effortless': a celebration that felt as easy as an evening in a friend's garden, even with three hundred guests.",
      ),
      paragraph("Starting with the light", "h2"),
      paragraph(
        "We planned the whole design around the moment the sun went down. Candles were grouped in clusters of three and five along the tables, and we tested the lawn at the same hour a week before so we knew exactly where the shadows would fall.",
      ),
      inlineImage(unsplash("1511795409834-ef04bbd61622", "Reception table lined with candles and florals")),
      paragraph("Greenery that moves", "h2"),
      paragraph(
        "Instead of tight, formal arrangements, we chose loose eucalyptus, olive branches and trailing jasmine that moved in the breeze. It softened the structure of the mandap and made the whole lawn feel alive.",
      ),
      paragraph(
        "If you're planning an outdoor celebration, our biggest tip is simple: always visit your venue at the same time of day as your event. It changes everything.",
      ),
    ],
  },
  {
    title: "Five Ways to Make a Birthday Feel Special at Home",
    slug: "birthday-at-home-ideas",
    publishedAt: "2026-01-28T09:00:00.000Z",
    excerpt:
      "You don't need a banquet hall for a beautiful birthday. Our favourite ideas for turning your own living room into a celebration.",
    coverImage: unsplash("1530103862676-de8c9debad1d", "Pastel balloons arranged for a birthday"),
    body: [
      paragraph(
        "Some of our favourite celebrations happen at home. With a little planning, a familiar space can feel completely new for an evening.",
      ),
      paragraph("1. Pick a palette, and stick to it", "h2"),
      paragraph(
        "Three colours is plenty. Repeat them in balloons, napkins, flowers and even the cake, and the room instantly looks designed rather than decorated.",
      ),
      paragraph("2. Create one hero moment", "h2"),
      paragraph(
        "A balloon garland, a floral backdrop or a styled dessert table gives guests a natural place to gather and take photos.",
      ),
      paragraph("3. Light it low", "h2"),
      paragraph(
        "Swap overhead lights for lamps, candles and fairy lights. Warm, low light is the quickest way to make any room feel like a party.",
      ),
      inlineImage(unsplash("1513151233558-d860c5398176", "Confetti falling at a birthday celebration")),
      paragraph("4. Think about the little ones", "h2"),
      paragraph("Keep small, breakable pieces up high and give children a corner of their own with soft play or a craft table."),
      paragraph("5. Let someone else handle the details", "h2"),
      paragraph("That's where we come in. Get in touch and we'll take care of everything from set-up to clean-up."),
    ],
  },
  {
    title: "In Progress: A Winter Corporate Gala",
    slug: "in-progress-winter-corporate-gala",
    publishedAt: "2026-01-10T09:00:00.000Z",
    excerpt:
      "A sneak peek at moodboards and material samples for an upcoming gala dinner for 250 guests. Think deep sage, brushed brass and candlelight.",
    coverImage: unsplash("1505236858219-8359eb29e329", "Warmly lit evening event venue"),
    body: [
      paragraph(
        "We're deep in planning for a winter gala dinner, and we couldn't resist sharing a little of the process.",
      ),
      paragraph(
        "The client asked for something that felt celebratory but grown-up. Our moodboard landed on deep sage velvet, brushed brass, smoked glass and plenty of candlelight, with tall arrangements of white florals to lift the eye.",
      ),
      inlineImage(unsplash("1478147427282-58a87a120781", "Guests raising glasses at a candlelit dinner")),
      paragraph(
        "Next up: a tasting with the caterers and a full lighting test at the venue. Follow along on Instagram for updates as it comes together.",
      ),
    ],
  },
];
