import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { WhatsAppIcon } from "@/components/Icons";
import { PageHeader } from "@/components/ui";
import { siteConfig, telLink, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Enquire",
  description: `Tell ${siteConfig.name} about your wedding, birthday or event and we'll be in touch within one working day.`,
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Tell us about your event"
        intro="Share a few details and we'll come back to you within one working day with ideas and next steps."
      />
      <section className="container-x grid gap-16 py-20 sm:py-28 lg:grid-cols-12">
        <div className="relative lg:col-span-8">
          <EnquiryForm />
        </div>
        <aside className="lg:col-span-4">
          <div className="bg-linen p-8 sm:p-10">
            <h2 className="text-3xl">Prefer to chat?</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We&rsquo;re happy to talk things through. Message us on WhatsApp or give us a call during working hours.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 w-full bg-[#1f8f4e] text-white hover:bg-[#177a41]"
            >
              <WhatsAppIcon /> Chat on WhatsApp<span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={telLink()} className="btn-outline mt-3 w-full">
              Call {siteConfig.phone}
            </a>
            <div className="mt-8 border-t border-sand pt-6 text-sm text-muted">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-4 list-decimal space-y-2 pl-5">
                <li>We review your details and check our availability.</li>
                <li>We set up a short consultation call.</li>
                <li>We send a tailored concept and quote.</li>
              </ol>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
