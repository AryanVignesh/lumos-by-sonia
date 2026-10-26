# Lumos by Sonia — website

The website for **Lumos by Sonia**, an event management and decor company. Built with Next.js (App Router), TypeScript and Tailwind CSS, with:

- **Sanity** for blog posts, portfolio events, gallery photos and testimonials, editable at `/studio` (works on a phone)
- **Supabase** to store enquiry form submissions
- **Resend** to email the owner about each new enquiry (optional)
- **On-demand revalidation**, so content published in Sanity appears on the site within seconds, no redeploy needed

The site works straight away with placeholder content and photos. Connect each service when you're ready.

---

## What's where

```
src/
  config/site.ts            ← business name, phone, WhatsApp, email, address, hours, stats. Edit here.
  app/
    (site)/                 ← all public pages (home, about, portfolio, gallery, testimonials, blog, contact, enquire)
    studio/[[...tool]]/     ← Sanity Studio at /studio
    api/enquiry/            ← enquiry form handler (validation, rate limit, Supabase insert, Resend email)
    api/revalidate/         ← Sanity webhook → refreshes pages
    sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx
  components/               ← header, footer, gallery + lightbox, enquiry form, etc.
  lib/
    content.ts              ← loads content from Sanity (or placeholders if Sanity isn't connected)
    placeholder-content.ts  ← sample copy and Unsplash photos
    enquiry-schema.ts       ← shared zod validation for the form (client + server)
  sanity/                   ← Sanity schemas and Studio sidebar
public/brand/               ← logo files (badge, wordmark, light wordmark, original)
supabase/schema.sql         ← enquiries table
sanity-seed/seed.ndjson     ← sample content to import into Sanity
```

Colours are defined as Tailwind theme tokens in `src/app/globals.css` (`ivory`, `linen`, `sand`, `sage`, `mist`, `slate`, `charcoal`), taken from the Lumos logo.

---

## 1. Run it locally

Requires Node.js 22.18 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. With an empty `.env.local` you'll see placeholder content, and the enquiry form will validate and respond but not save anything.

Other commands: `npm run build`, `npm run lint`, `npm run typecheck`.

---

## 2. Set up Sanity (content)

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign in (free).
2. Click **Create new project**, name it "Lumos by Sonia", and create a dataset called `production` (public).
3. Copy the **Project ID** into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
4. In the project, open **API → CORS origins → Add CORS origin** and add each of these with **Allow credentials** ticked:
   - `http://localhost:3000`
   - your Vercel URL, e.g. `https://lumos-by-sonia.vercel.app`
   - your real domain, e.g. `https://lumosbysonia.com`
5. Restart `npm run dev` and open http://localhost:3000/studio. Sign in with the same Sanity account.
6. (Optional) Load the sample content so the site looks complete:
   ```bash
   npx sanity login
   npm run seed:import
   ```
   This uploads the sample posts, events, gallery photos and testimonials, including the Unsplash images. Delete or replace them in the Studio whenever you like. `npm run seed:generate` rebuilds the seed file from `src/lib/placeholder-content.ts`.

To invite Sonia, go to **sanity.io/manage → Members → Invite** and give her the Editor role.

---

## 3. Set up Supabase (enquiries)

1. Go to [supabase.com](https://supabase.com), sign in and click **New project** (free plan). Choose a region close to you.
2. When it's ready, open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and click **Run**.
   This creates the `enquiries` table and turns on Row Level Security with no public policies, so nobody can read or write it from the browser.
3. Open **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** secret key → `SUPABASE_SERVICE_ROLE_KEY`

   The service role key is only used on the server (in `src/app/api/enquiry/route.ts`). Never put it in a `NEXT_PUBLIC_` variable.

---

## 4. Set up Resend (enquiry emails, optional)

1. Sign up at [resend.com](https://resend.com) (free).
2. Go to **API Keys → Create API key** and copy it into `RESEND_API_KEY`.
3. Set `ENQUIRY_NOTIFY_EMAIL` to the inbox that should receive enquiries.
4. To start, leave `RESEND_FROM_EMAIL` as `onboarding@resend.dev`. With that sender, Resend only delivers to the email address on your Resend account. To email any address, verify your domain under **Domains** in Resend, then change the sender to e.g. `Lumos by Sonia <hello@lumosbysonia.com>`.

If `RESEND_API_KEY` is empty, enquiries are still saved and the email step is skipped.

---

## 5. Fill in `.env.local`

| Variable | Where it comes from |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your live domain, no trailing slash |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sanity.io/manage → project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Leave as `2025-01-01` |
| `SANITY_REVALIDATE_SECRET` | Any long random string (e.g. `openssl rand -hex 32`) |
| `SUPABASE_URL` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (secret) |
| `RESEND_API_KEY` | Resend → API Keys (optional) |
| `ENQUIRY_NOTIFY_EMAIL` | Where enquiry emails go |
| `RESEND_FROM_EMAIL` | Sender address |

---

## 6. Deploy to Vercel

1. Push this repository to GitHub (already done if you're reading this there).
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub and **Import** the `lumos-by-sonia` repository.
3. Under **Environment Variables**, add every variable from your `.env.local`.
4. Click **Deploy**. Every push to `main` redeploys automatically.
5. To use your own domain: **Project → Settings → Domains → Add**, then follow the DNS instructions. Update `NEXT_PUBLIC_SITE_URL` and add the domain to Sanity's CORS origins.

---

## 7. Set up the Sanity revalidation webhook

This makes new posts and photos appear on the live site within seconds of publishing.

1. In [sanity.io/manage](https://www.sanity.io/manage) open the project → **API → Webhooks → Create webhook**.
2. Fill in:
   - **Name:** Revalidate website
   - **URL:** `https://YOUR-DOMAIN/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["post", "portfolioEvent", "galleryImage", "testimonial"]`
   - **Projection:** `{_type, "slug": slug.current}`
   - **HTTP method:** POST
   - **Secret:** the same value as `SANITY_REVALIDATE_SECRET`
3. Save. Pages also refresh on their own every hour as a fallback.

---

## For Sonia: adding a blog post from your phone

1. Open `https://YOUR-DOMAIN/studio` and sign in.
2. Tap **Blog posts**, then the **+** (new) button.
3. Add a **Title**, then tap **Generate** next to **Web address**.
4. Write a **Short summary**, upload a **Cover photo** and describe it in a few words.
5. Write the post under **Post content**. Use the **+** in the editor to add photos between paragraphs.
6. Tap **Publish**. The post appears on the site within a few seconds.

Portfolio events, gallery photos and testimonials work the same way. Tick **Show on the home page?** on a portfolio event to feature it on the home page.

## For Sonia: viewing enquiries

1. Sign in at [supabase.com](https://supabase.com) and open the Lumos project.
2. Click **Table Editor** in the left menu, then the **enquiries** table.
3. Newest enquiries are at the bottom; click the **created_at** column header to sort newest first.
4. Click a row to see the full message. Double-click the **status** cell to change it from `new` to e.g. `contacted` or `booked`.

You'll also get an email for each new enquiry if Resend is set up.

---

## Spam protection

- A hidden "honeypot" field that real visitors never see. Bots that fill it in are silently ignored.
- A per-IP rate limit of 5 enquiries every 10 minutes. It's held in memory, so it resets when Vercel restarts the server; that's enough to stop casual abuse on a small site.
