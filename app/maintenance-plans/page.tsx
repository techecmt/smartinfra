import type { Metadata } from "next";
import { isOfferActive, offer } from "@/lib/rates";
import { photos } from "@/lib/photos";
import { ButtonLink, WhatsAppLink } from "@/components/ui/buttons";
import { PageHeader } from "@/components/layout/page-header";
import { EnquirySteps } from "@/components/sections/enquiry-steps";
import { PlanCards } from "@/components/sections/plans";
import { QuoteSection } from "@/components/sections/quote-section";
import { SectionMarker } from "@/components/ui/section-heading";

const description =
  "Aircon and electrical maintenance plans from Smart Infratech: quarterly aircon servicing for homes and recurring maintenance contracts for offices, shops and facilities in Singapore.";

export const metadata: Metadata = {
  title: "Maintenance Plans — Quarterly Aircon Servicing & Contracts",
  description,
  alternates: { canonical: "/maintenance-plans" },
};

export default function MaintenancePlansPage() {
  const active = isOfferActive();
  return (
    <>
      <PageHeader
        crumb="Maintenance Plans"
        title="Maintenance Plans"
        eyebrow="Recurring servicing, scheduled in advance"
        intro="Aircon units that are serviced on a schedule cool better and give fewer surprises. Choose a plan for your home or premises and we will quote it for your equipment."
        photo={photos.maintenance}
      >
        <WhatsAppLink
          urgent
          text="Hello Smart Infratech, I would like to enquire about your maintenance plans."
        >
          WhatsApp Us Now
        </WhatsAppLink>
        <ButtonLink href="#quote" variant="outline">
          Get a Quotation
        </ButtonLink>
      </PageHeader>

      <section
        aria-labelledby="plans-heading"
        className="bg-white py-16 sm:py-24"
      >
        <div className="container-site">
          <SectionMarker index="01" label="Plans" meta="Quoted per site" />
          <h2
            id="plans-heading"
            className="mt-10 max-w-3xl font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Three ways to keep systems running
          </h2>
          <div className="mt-12">
            <PlanCards active={active} />
          </div>
          <p className="mt-8 max-w-2xl text-ink-muted">
            Plan pricing depends on the number and type of units and the site.
            Send us the details and we will reply with a quotation.
            {active
              ? ` ${offer.name}: ${offer.percent}% off plan quotations until ${offer.endLabel}.`
              : null}
          </p>
        </div>
      </section>

      <div className="border-t border-rule">
        <EnquirySteps index="02" />
      </div>

      <QuoteSection
        defaultService="Commercial Maintenance Contract"
        title="Request a plan quotation"
      />
    </>
  );
}
