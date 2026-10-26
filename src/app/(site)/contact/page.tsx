import type { Metadata } from "next";
import Link from "next/link";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { InstagramButton, PageHeader } from "@/components/ui";
import { fullAddress, siteConfig, telLink, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, email or WhatsApp ${siteConfig.name}. We'd love to hear about your event.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const items = [
    { icon: PhoneIcon, label: "Call us", value: siteConfig.phone, href: telLink() },
    { icon: MailIcon, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: PinIcon, label: "Studio", value: fullAddress() },
  ];

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk" intro="Whether you have a date in mind or just the beginnings of an idea, we'd love to hear from you." />
      <section className="container-x grid gap-16 py-20 sm:py-28 lg:grid-cols-2">
        <div data-reveal>
          <ul className="space-y-8">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linen text-sage">
                  <Icon />
                </span>
                <div>
                  <p className="eyebrow">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block font-serif text-2xl hover:text-sage">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-serif text-2xl">{value}</p>
                  )}
                </div>
              </li>
            ))}
            <li className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linen text-sage">
                <ClockIcon />
              </span>
              <div>
                <p className="eyebrow">Working hours</p>
                <dl className="mt-1 space-y-1">
                  {siteConfig.hours.map((h) => (
                    <div key={h.days} className="flex flex-wrap gap-x-3">
                      <dt className="font-medium">{h.days}</dt>
                      <dd className="text-muted">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          </ul>

          <div className="mt-12 flex flex-wrap gap-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn bg-[#1f8f4e] text-white hover:bg-[#177a41]">
              <WhatsAppIcon /> Chat on WhatsApp<span className="sr-only">(opens in a new tab)</span>
            </a>
            <InstagramButton />
          </div>
          <p className="mt-10 text-muted">
            Ready to share the details?{" "}
            <Link href="/enquire" className="text-sage underline underline-offset-4 hover:text-sage-dark">
              Fill in our enquiry form
            </Link>{" "}
            and we&rsquo;ll get back to you within one working day.
          </p>
        </div>

        <div data-reveal className="relative min-h-[380px] overflow-hidden bg-linen lg:min-h-full">
          <iframe
            title={`Map showing ${siteConfig.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&output=embed`}
            className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
