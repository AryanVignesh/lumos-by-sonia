import Link from "next/link";
import type { PortfolioEvent, Testimonial } from "@/lib/types";
import { siteConfig } from "@/config/site";
import { ArrowIcon, InstagramIcon, StarIcon } from "./Icons";
import { SafeImage } from "./SafeImage";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div data-reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={`mt-4 text-4xl leading-[1.1] sm:text-5xl ${Tag === "h1" ? "md:text-6xl" : ""}`}>{title}</Tag>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}

/** Calm page header used on inner pages. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-linen">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mist/50 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sand/60 blur-2xl"
      />
      <div className="container-x relative py-20 sm:py-28">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} as="h1" />
      </div>
    </section>
  );
}

export function PortfolioCard({ event, priority = false }: { event: PortfolioEvent; priority?: boolean }) {
  return (
    <Link href={`/portfolio/${event.slug}`} className="group block" data-reveal>
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <SafeImage
          src={event.coverImage?.url}
          alt={event.coverImage?.alt || event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          priority={priority}
          placeholder={event.coverImage?.lqip ? "blur" : "empty"}
          blurDataURL={event.coverImage?.lqip}
        />
        <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/15" />
      </div>
      <div className="mt-5">
        <p className="eyebrow">{event.eventType}</p>
        <h3 className="mt-2 text-2xl transition-colors group-hover:text-sage sm:text-3xl">{event.title}</h3>
        {event.venue && <p className="mt-1 text-sm text-muted">{event.venue}</p>}
      </div>
    </Link>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-sand-dark" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= rating} />
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.clientName
    .split(/\s|&/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <figure data-reveal className="flex h-full flex-col bg-ivory p-8 shadow-[0_1px_0_rgba(44,46,48,0.06)] sm:p-10">
      <Stars rating={testimonial.rating} />
      <blockquote className="mt-6 flex-1 font-serif text-xl leading-relaxed text-charcoal sm:text-2xl">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        {testimonial.photo?.url ? (
          <SafeImage
            src={testimonial.photo.url}
            alt={testimonial.photo.alt || testimonial.clientName}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-light/50 font-serif text-lg text-sage-dark"
          >
            {initials}
          </span>
        )}
        <span>
          <span className="block font-medium">{testimonial.clientName}</span>
          {testimonial.eventType && <span className="block text-sm text-muted">{testimonial.eventType}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export function InstagramButton({ label = "Follow on Instagram", className = "btn-outline" }: { label?: string; className?: string }) {
  return (
    <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <InstagramIcon />
      {label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function CtaBanner({
  title = "Let's plan your event",
  text = "Tell us a little about your celebration and we'll be in touch within one working day.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-sage text-ivory">
      <div aria-hidden="true" className="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-sage-light/20 blur-3xl" />
      <div className="container-x relative py-20 text-center sm:py-28" data-reveal>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-ivory/85">Get in touch</p>
        <h2 className="mt-4 text-4xl text-ivory sm:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-ivory/90">{text}</p>
        <Link href="/enquire" className="btn mt-10 bg-ivory text-sage-dark hover:bg-linen">
          Start your enquiry <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

export function formatDate(date?: string, opts: Intl.DateTimeFormatOptions = { dateStyle: "long" }) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: "UTC" }).format(new Date(date));
}
