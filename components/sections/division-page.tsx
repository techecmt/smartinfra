import type { Division } from "@/lib/content";
import type { BookingServiceId } from "@/lib/booking";
import { photos } from "@/lib/photos";
import { ButtonLink } from "@/components/ui/buttons";
import { BookButton } from "@/components/booking/book-button";
import { PageHeader } from "@/components/layout/page-header";
import { Gallery } from "./gallery";
import { QuoteSection } from "./quote-section";
import { ServiceGroups } from "./service-groups";

/** Standard division page body. SMART AirCon composes its own in app/aircon. */
export function DivisionPage({
  division,
  service,
}: {
  division: Division;
  service: BookingServiceId;
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
        <BookButton preset={{ service, source: "hero" }}>
          Book a Visit
        </BookButton>
        <ButtonLink href="#services" variant="outline">
          See Services
        </ButtonLink>
      </PageHeader>
      <ServiceGroups division={division} />
      <Gallery division={division.key} index="02" />
      <QuoteSection
        service={service}
        title={`Book ${division.name}`}
      />
    </>
  );
}
