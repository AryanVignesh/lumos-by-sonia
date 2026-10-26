import type { Metadata } from "next";
import { CtaBanner, InstagramButton, PageHeader, PortfolioCard } from "@/components/ui";
import { getPortfolioEvents } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A selection of weddings, engagements, birthdays and corporate events designed by Lumos by Sonia.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const events = await getPortfolioEvents();
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Celebrations we've loved"
        intro="Every event begins with a story. Here are a few of our favourites, and the ideas behind them."
      />
      <section className="container-x py-20 sm:py-28">
        {events.length ? (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <PortfolioCard key={event.slug} event={event} priority={i < 3} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">New work is on its way. Check back soon.</p>
        )}
        <div className="mt-20 text-center" data-reveal>
          <p className="font-serif text-2xl italic text-muted">There&rsquo;s plenty more where these came from.</p>
          <InstagramButton label="See more on Instagram" className="btn-primary mt-6" />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
