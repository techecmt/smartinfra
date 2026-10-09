import type { Division, QuoteService } from "@/lib/content";
import { photos } from "@/lib/photos";
import { ButtonLink, WhatsAppLink } from "@/components/ui/buttons";
import { PageHeader } from "@/components/layout/page-header";
import { Gallery } from "./gallery";
import { QuoteSection } from "./quote-section";
import { ServiceGroups } from "./service-groups";

/** Standard division page body. SMART AirCon composes its own in app/aircon. */
export function DivisionPage({
  division,
  defaultService,
}: {
  division: Division;
  defaultService: QuoteService;
}) {
  return (
    <>
      <PageHeader
        crumb={division.name}
        title={division.name}
        eyebrow={division.strapline}
        intro={division.intro}
        photo={photos[division.key]}
      >
        <WhatsAppLink
          urgent
          text={`Hello Smart Infratech, I would like to enquire about ${division.name} services.`}
        >
          WhatsApp Us Now
        </WhatsAppLink>
        <ButtonLink href="#quote" variant="outline">
          Get a Quotation
        </ButtonLink>
      </PageHeader>
      <ServiceGroups division={division} />
      <Gallery division={division.key} index="02" />
      <QuoteSection
        defaultService={defaultService}
        title={`Enquire about ${division.name}`}
      />
    </>
  );
}
