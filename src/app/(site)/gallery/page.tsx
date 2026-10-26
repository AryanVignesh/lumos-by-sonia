import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CtaBanner, InstagramButton, PageHeader } from "@/components/ui";
import { getGalleryImages } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of weddings, birthdays, corporate events and celebrations styled by Lumos by Sonia.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments in bloom" intro="A visual diary of florals, tablescapes, lighting and the joy in between." />
      <section className="container-x py-16 sm:py-24">
        <GalleryGrid images={images} />
        <div className="mt-16 text-center">
          <InstagramButton />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
