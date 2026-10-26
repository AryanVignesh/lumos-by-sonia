import Link from "next/link";
import { fullAddress, nav, siteConfig, telLink, whatsappLink } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-sage-dark text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo variant="light" />
          <p className="mt-6 max-w-xs font-serif text-xl italic text-ivory/85">{siteConfig.tagline}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (opens in a new tab)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-sage-dark"
            >
              <InstagramIcon />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp (opens in a new tab)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-sage-dark"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-6">
          <h2 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-ivory">Explore</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ivory/85">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ivory hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/enquire" className="hover:text-ivory hover:underline underline-offset-4">
                Enquire
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-ivory">Say hello</h2>
          <ul className="mt-5 space-y-3 text-sm text-ivory/85">
            <li>
              <a href={telLink()} className="hover:text-ivory hover:underline underline-offset-4">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-ivory hover:underline underline-offset-4">
                {siteConfig.email}
              </a>
            </li>
            <li>{fullAddress()}</li>
            {siteConfig.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ivory/70 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Designed with care in {siteConfig.address.city}.</p>
        </div>
      </div>
    </footer>
  );
}
