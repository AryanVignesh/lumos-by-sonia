import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-lg shadow-charcoal/20 transition-transform duration-300 hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
