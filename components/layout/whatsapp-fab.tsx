import { defaultWhatsappText, whatsappHref } from "@/lib/content";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

/** Floating WhatsApp enquiry button, present on every page. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref(defaultWhatsappText)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Smart Infratech (opens WhatsApp)"
      className="fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2.5 rounded-full bg-whatsapp px-4 wa-urgent font-semibold text-ink-deep transition-colors hover:bg-whatsapp-deep sm:right-6 sm:bottom-6 sm:px-5"
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden sm:inline">WhatsApp Us Now</span>
    </a>
  );
}
