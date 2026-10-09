import { Mail, MapPin, Phone } from "lucide-react";
import { company, type QuoteService } from "@/lib/content";
import { QuoteForm } from "@/components/forms/quote-form";

/** Enquiry form with the company's direct contact details alongside. */
export function QuoteSection({
  defaultService,
  as: Heading = "h2",
  title = "Get a service quotation",
  intro = "Tell us what you need in a few taps. Your enquiry opens in WhatsApp, ready to send.",
}: {
  defaultService?: QuoteService;
  as?: "h1" | "h2";
  title?: string;
  intro?: string;
}) {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="bg-paper py-16 sm:py-24"
    >
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label-tech flex items-center gap-3 text-ink-muted">
            <span aria-hidden className="h-px w-6 bg-signal" />
            Enquiry
          </p>
          <Heading
            id="quote-heading"
            className="mt-5 font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
          >
            {title}
          </Heading>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>

          <dl className="mt-10 border-t border-rule">
            <div className="flex gap-4 border-b border-rule py-4">
              <dt>
                <Phone className="mt-1 size-4 text-signal" aria-hidden />
                <span className="sr-only">Phone</span>
              </dt>
              <dd>
                <a href={company.phoneHref} className="hover:underline">
                  {company.phone}
                </a>
              </dd>
            </div>
            <div className="flex gap-4 border-b border-rule py-4">
              <dt>
                <Mail className="mt-1 size-4 text-signal" aria-hidden />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a
                  href={company.emailHref}
                  className="break-all hover:underline"
                >
                  {company.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-4 border-b border-rule py-4">
              <dt>
                <MapPin className="mt-1 size-4 text-signal" aria-hidden />
                <span className="sr-only">Office</span>
              </dt>
              <dd>
                <address className="leading-relaxed not-italic">
                  {company.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <QuoteForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
