import type { Metadata } from "next";
import { divisions } from "@/lib/content";
import { airconFaqs, airconJsonLd } from "@/lib/aircon-seo";
import { photos } from "@/lib/photos";
import {
  formatPrice,
  isOfferActive,
  offerPrice,
  servicingTiers,
} from "@/lib/rates";
import { ButtonLink, WhatsAppLink } from "@/components/ui/buttons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { AirconBrands, AirconGuide } from "@/components/sections/aircon-guide";
import { Catalogue } from "@/components/sections/catalogue";
import { FaqSection } from "@/components/sections/faq";
import { Gallery } from "@/components/sections/gallery";
import { QuoteSection } from "@/components/sections/quote-section";
import { Rates } from "@/components/sections/rates";
import { ServiceGroups } from "@/components/sections/service-groups";

const title =
  "Aircon Servicing, Repair & Chemical Wash Singapore | Smart Infratech";

export function generateMetadata(): Metadata {
  const base = servicingTiers[0].tiers[0];
  const from = formatPrice(isOfferActive() ? offerPrice(base) : base);
  const description = `Aircon servicing from ${from}, aircon chemical wash, aircon repair and gas top-up in Singapore. Daikin, Mitsubishi and Panasonic units. Same or next-day visits.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/aircon" },
    openGraph: {
      title,
      description,
      url: "/aircon",
      siteName: "Smart Infratech",
      locale: "en_SG",
      type: "website",
      images: [{ url: photos.airconHero.src.src, alt: photos.airconHero.alt }],
    },
  };
}

export default function AirconPage() {
  const division = divisions.aircon;
  const active = isOfferActive();
  return (
    <>
      <JsonLd data={airconJsonLd(active)} />
      <PageHeader
        crumb="Aircon Servicing & Repair"
        title="Aircon Servicing & Repair in Singapore"
        eyebrow={`${division.name} · ${division.strapline}`}
        intro={division.intro}
        photo={photos.airconHero}
        cover
      >
        <WhatsAppLink
          urgent
          text="Hello Smart Infratech, I would like to enquire about aircon servicing / repair."
        >
          WhatsApp Us Now
        </WhatsAppLink>
        <ButtonLink href="#rates" variant="outline">
          See Aircon Rates
        </ButtonLink>
      </PageHeader>
      <AirconGuide index="01" active={active} />
      <AirconBrands index="02" />
      <Rates index="03" active={active} />
      <ServiceGroups
        division={division}
        index="04"
        heading="Full list of aircon services"
      />
      <Catalogue index="05" />
      <Gallery division="aircon" index="06" />
      <FaqSection
        title="Aircon servicing and repair questions"
        faqs={airconFaqs(active)}
      />
      <QuoteSection
        defaultService="Aircon Servicing"
        title="Book aircon servicing or repair"
      />
    </>
  );
}
