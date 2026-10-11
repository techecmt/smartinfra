import type { Metadata } from "next";
import { QuoteSection } from "@/components/sections/quote-section";

const description =
  "Contact Smart Infratech for aircon and electrical services in Singapore. WhatsApp +65 8484 0705 or send a guided enquiry for a quotation.";

export const metadata: Metadata = {
  title: "Contact Us — WhatsApp & Quotation",
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <QuoteSection
      as="h1"
      title="Contact us for a quotation"
      intro="Pick the service, a preferred date and time, and where to come. Your booking opens in WhatsApp ready to send, and you can attach photos or a video of the fault there."
    />
  );
}
