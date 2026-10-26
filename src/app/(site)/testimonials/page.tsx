import type { Metadata } from "next";
import { CtaBanner, PageHeader, TestimonialCard } from "@/components/ui";
import { getTestimonials } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What our clients say about working with Lumos by Sonia on their weddings, birthdays and events.",
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <PageHeader eyebrow="Testimonials" title="Kind words" intro="The best part of what we do is the people we get to celebrate with." />
      <section className="bg-mist/30 py-20 sm:py-28">
        <div className="container-x">
          {testimonials.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">Testimonials are coming soon.</p>
          )}
        </div>
      </section>
      <CtaBanner title="Your story could be next" />
    </>
  );
}
