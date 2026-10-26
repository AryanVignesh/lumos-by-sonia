import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/Icons";
import { SafeImage } from "@/components/SafeImage";
import { CtaBanner, formatDate } from "@/components/ui";
import { getPortfolioEvent, getPortfolioEvents } from "@/lib/content";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const events = await getPortfolioEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPortfolioEvent(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.brief?.slice(0, 160),
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: event.title,
      description: event.brief?.slice(0, 160),
      images: event.coverImage?.url ? [{ url: event.coverImage.url, alt: event.coverImage.alt }] : undefined,
    },
  };
}

export default async function PortfolioEventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getPortfolioEvent(slug);
  if (!event) notFound();

  return (
    <article>
      <header className="relative flex min-h-[70svh] items-end overflow-hidden bg-charcoal text-ivory">
        <SafeImage
          src={event.coverImage?.url}
          alt={event.coverImage?.alt || event.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <div className="container-x relative pb-16">
          <Link href="/portfolio" className="text-xs uppercase tracking-[0.3em] text-ivory/85 hover:text-ivory">
            ← Portfolio
          </Link>
          <h1 className="mt-4 max-w-4xl text-5xl text-ivory sm:text-7xl">{event.title}</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-ivory/90">
            {[event.eventType, event.venue, formatDate(event.date, { month: "long", year: "numeric" })]
              .filter(Boolean)
              .join("  ·  ")}
          </p>
        </div>
      </header>

      <div className="container-x grid gap-14 py-20 sm:py-28 md:grid-cols-2 lg:gap-24">
        {event.brief && (
          <section data-reveal>
            <p className="eyebrow">The brief</p>
            <p className="mt-4 font-serif text-2xl leading-relaxed sm:text-3xl">{event.brief}</p>
          </section>
        )}
        {event.concept && (
          <section data-reveal>
            <p className="eyebrow">The decor concept</p>
            <p className="mt-4 leading-relaxed text-muted sm:text-lg">{event.concept}</p>
          </section>
        )}
      </div>

      {event.images.length > 0 && (
        <section aria-label="Event photos" className="container-x pb-20 sm:pb-28">
          <div className="columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
            {event.images.map((img, i) => (
              <div key={`${img.url}-${i}`} data-reveal className="break-inside-avoid overflow-hidden">
                <SafeImage
                  src={img.url}
                  alt={img.alt || `${event.title}, photo ${i + 1}`}
                  width={img.width || 1600}
                  height={img.height || 1067}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {event.clientQuote && (
        <section className="bg-linen py-20 sm:py-28">
          <figure className="container-x max-w-4xl text-center" data-reveal>
            <blockquote className="font-serif text-3xl italic leading-snug sm:text-4xl">
              <p>&ldquo;{event.clientQuote}&rdquo;</p>
            </blockquote>
            <figcaption className="eyebrow mt-8">Our client</figcaption>
          </figure>
        </section>
      )}

      <div className="container-x py-16 text-center">
        <Link href="/portfolio" className="btn-outline">
          More celebrations <ArrowIcon />
        </Link>
      </div>
      <CtaBanner title="Imagining something similar?" />
    </article>
  );
}
