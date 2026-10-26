import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/Reveal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteConfig } from "@/config/site";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/brand/lumos-badge.png`,
  logo: `${siteConfig.url}/brand/lumos-badge.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  founder: { "@type": "Person", name: siteConfig.ownerName },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  sameAs: [siteConfig.instagramUrl],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={localBusiness} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
