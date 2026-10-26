import Link from "next/link";
import { ArrowIcon, InstagramIcon } from "@/components/Icons";
import { SafeImage } from "@/components/SafeImage";
import { CtaBanner, InstagramButton, PortfolioCard, SectionHeading, TestimonialCard } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getFeaturedEvents, getGalleryImages, getTestimonials } from "@/lib/content";
import { unsplash } from "@/lib/placeholder-content";
import { services } from "@/lib/services";

export const revalidate = 3600;

const hero = unsplash("1519225421980-715cb0215aed", "Candlelit wedding reception styled by Lumos", 2400, 1600);
const intro = unsplash("1469371670807-013ccf25f16a", "Bridal bouquet of white and blush flowers", 1000, 1250);

export default async function HomePage() {
  const [featured, gallery, testimonials] = await Promise.all([
    getFeaturedEvents(3),
    getGalleryImages(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-charcoal text-ivory">
        <SafeImage src={hero.url} alt={hero.alt} fill priority sizes="100vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10" />
        <div className="container-x relative pb-20 sm:pb-28">
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.35em] text-ivory/90">
            {siteConfig.name} · {siteConfig.descriptor}
          </p>
          <h1 className="mt-6 max-w-4xl animate-fade-up text-5xl leading-[1.02] text-ivory [animation-delay:120ms] sm:text-7xl lg:text-8xl">
            Celebrations, <em className="font-light">beautifully</em> composed.
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg text-ivory/90 [animation-delay:240ms] sm:text-xl">
            {siteConfig.tagline} Weddings, birthdays and gatherings designed with warmth, detail and calm.
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-4 [animation-delay:360ms]">
            <Link href="/portfolio" className="btn bg-ivory text-charcoal hover:bg-linen">
              View Portfolio
            </Link>
            <Link href="/enquire" className="btn-light">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-x grid items-center gap-12 py-24 sm:py-32 md:grid-cols-2 lg:gap-24">
        <div data-reveal className="relative order-2 md:order-1">
          <div className="relative aspect-[4/5] overflow-hidden">
            <SafeImage src={intro.url} alt={intro.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </div>
          <div aria-hidden="true" className="absolute -bottom-6 -right-6 -z-10 h-full w-full bg-sand/40" />
        </div>
        <div data-reveal className="order-1 md:order-2">
          <p className="eyebrow">Welcome to Lumos</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
            We design the moments you&rsquo;ll want to remember.
          </h2>
          <p className="mt-6 leading-relaxed text-muted">
            Lumos means light, and that&rsquo;s what we bring to every celebration. Led by {siteConfig.ownerName}, we are a small,
            dedicated team of designers and planners who believe the best events feel personal, unhurried and full of
            heart.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            From the first idea to the final candle being blown out, we take care of the design, the vendors and the
            details, so you can simply be present.
          </p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b border-sage pb-1 text-sm uppercase tracking-[0.2em] text-sage hover:text-sage-dark">
            Our story <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-linen py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we do"
            title="Events for every chapter"
            intro="Whatever you're celebrating, we design it with the same care, creativity and attention to detail."
          />
          <ul className="mt-16 grid gap-px bg-sand/60 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.title} data-reveal className="group bg-linen p-8 transition-colors duration-500 hover:bg-ivory sm:p-10">
                <h3 className="text-3xl transition-colors group-hover:text-sage">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured portfolio */}
      {featured.length > 0 && (
        <section className="container-x py-24 sm:py-32">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Featured work" title="Recent celebrations" align="left" />
            <Link href="/portfolio" className="btn-outline shrink-0">
              View Portfolio <ArrowIcon />
            </Link>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((event) => (
              <PortfolioCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Gallery strip */}
      {gallery.length > 0 && (
        <section aria-labelledby="gallery-strip" className="pb-24 sm:pb-32">
          <h2 id="gallery-strip" className="sr-only">
            From the gallery
          </h2>
          <div className="flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-12 [scrollbar-width:none]">
            {gallery.slice(0, 8).map((g) => (
              <Link
                key={g.id}
                href="/gallery"
                className="group relative aspect-[3/4] w-56 shrink-0 snap-start overflow-hidden sm:w-72"
              >
                <SafeImage
                  src={g.image.url}
                  alt={g.image.alt || g.caption || "Event photo"}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/gallery" className="inline-flex items-center gap-2 border-b border-sage pb-1 text-sm uppercase tracking-[0.2em] text-sage hover:text-sage-dark">
              See the full gallery <ArrowIcon />
            </Link>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-mist/40 py-24 sm:py-32">
          <div className="container-x">
            <SectionHeading eyebrow="Kind words" title="From our clients" />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/testimonials" className="btn-outline">
                Read more stories
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Instagram */}
      <section className="container-x py-24 text-center sm:py-32" data-reveal>
        <InstagramIcon className="mx-auto h-8 w-8 text-sage" />
        <h2 className="mt-6 text-4xl sm:text-5xl">@{siteConfig.instagramHandle}</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Behind-the-scenes set-ups, fresh florals and our latest celebrations. Come say hello on Instagram.
        </p>
        <InstagramButton className="btn-primary mt-8" />
      </section>

      <CtaBanner />
    </>
  );
}
