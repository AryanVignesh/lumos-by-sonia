import type { Metadata } from "next";
import { SafeImage } from "@/components/SafeImage";
import { CtaBanner, PageHeader, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { unsplash } from "@/lib/placeholder-content";
import { process, reasons, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${siteConfig.ownerName}, founder of ${siteConfig.name}, and discover how we design weddings, birthdays and events with heart.`,
  alternates: { canonical: "/about" },
};

const portrait = unsplash("1464366400600-7168b8af9bc3", "A Lumos floral arch, styled by Sonia and team", 1000, 1250);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Lumos"
        title={`Hello, I'm ${siteConfig.ownerName}.`}
        intro="Designer, planner and lifelong lover of a well-set table."
      />

      {/* Story */}
      <section className="container-x grid items-center gap-12 py-24 sm:py-32 md:grid-cols-2 lg:gap-24">
        <div data-reveal className="relative aspect-[4/5] overflow-hidden">
          <SafeImage src={portrait.url} alt={portrait.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
        <div data-reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">It started with a single centrepiece.</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              Long before Lumos had a name, I was the friend who arrived early to arrange the flowers, move the lamps and
              fold the napkins &ldquo;just so&rdquo;. What began as a love of hosting slowly became a calling: helping people
              turn the most important days of their lives into something that truly feels like them.
            </p>
            <p>
              I founded {siteConfig.name} to bring light, calm and care to every celebration. Today we are a small team of
              designers and planners, and we still treat every event as if it were our own family&rsquo;s.
            </p>
            <p className="font-serif text-2xl italic text-sage-dark">
              &ldquo;Our vision is simple: thoughtful design, honest advice and celebrations you can be fully present
              for.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Lumos in numbers" className="bg-sage-dark text-ivory">
        <dl className="container-x grid gap-10 py-16 text-center sm:grid-cols-3">
          {siteConfig.stats.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col">
              <dt className="order-2 mt-2 text-xs uppercase tracking-[0.3em] text-ivory/85">{s.label}</dt>
              <dd className="font-serif text-6xl text-ivory">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* What we do */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow="What we do" title="Full-service event design" />
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} data-reveal className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-linen">
                <SafeImage
                  src={s.image.url}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 text-3xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-linen py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Why choose us" title="The Lumos difference" />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div key={r.title} data-reveal className="border-t border-sage/40 pt-6">
                <span className="font-serif text-lg italic text-sage-dark">0{i + 1}</span>
                <h3 className="mt-2 text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading eyebrow="How we work" title="Four simple steps" intro="A clear, collaborative process from first hello to final farewell." />
        <ol className="mt-16 grid gap-10 md:grid-cols-4">
          {process.map((p) => (
            <li key={p.step} data-reveal className="relative">
              <span className="font-serif text-6xl text-sand-dark/70">{p.step}</span>
              <h3 className="mt-2 text-3xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBanner />
    </>
  );
}
