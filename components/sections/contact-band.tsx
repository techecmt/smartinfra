import { Phone } from "lucide-react";
import { company } from "@/lib/content";
import { ButtonLink, WhatsAppLink } from "@/components/ui/buttons";

/** Closing call to action used at the foot of each page. */
export function ContactBand({
  title = "Need it looked at?",
  text = "Send us a photo or short video of the unit or fault on WhatsApp and we will come back to you with a quotation.",
  whatsappText,
}: {
  title?: string;
  text?: string;
  whatsappText?: string;
}) {
  return (
    <section
      aria-labelledby="contact-band-heading"
      className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-24"
    >
      <div aria-hidden className="grid-blueprint-dark absolute inset-0 -z-10" />
      <div className="container-site grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2
            id="contact-band-heading"
            className="font-display text-[2.25rem] leading-[1.02] font-medium tracking-[-0.035em] sm:text-6xl"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {text}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
          <WhatsAppLink urgent text={whatsappText}>
            WhatsApp Us Now
          </WhatsAppLink>
          <ButtonLink href="/contact" variant="light">
            Get a Quotation
          </ButtonLink>
          <a
            href={company.phoneHref}
            className="mt-3 inline-flex items-center gap-3 font-display text-2xl font-medium tracking-tight hover:underline"
          >
            <Phone className="size-5 text-signal" aria-hidden />
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
