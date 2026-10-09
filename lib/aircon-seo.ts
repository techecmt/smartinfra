// Search-facing content for the SMART AirCon page: FAQs and structured data.
// Every fact here was confirmed by Smart Infratech; prices come from
// lib/rates.ts and follow the Year End Offer while it runs.

import { company } from "./content";
import {
  chemicalOverhaul,
  formatPrice,
  installRates,
  offer,
  offerPrice,
  repairFrom,
  repairRates,
  servicingTiers,
} from "./rates";

/** Brands the team services. Smart Infratech is independent of all of them. */
export const featuredBrands = ["Daikin", "Mitsubishi", "Panasonic"];
export const otherBrands = [
  "Midea",
  "LG",
  "Toshiba",
  "Fujitsu",
  "Hitachi",
  "Samsung",
];

export const brandDisclaimer =
  "Smart Infratech is an independent aircon servicing company. We are not an authorised service centre or agent of any manufacturer or retailer; brand names are used only to describe the units we work on.";

export type Faq = { question: string; answer: string };

const gasRange = (index: number) => {
  const price = repairRates[index].price;
  return price.kind === "range" ? price : { min: 0, max: 0 };
};

/** FAQs as plain text, so the visible answers and the schema always match. */
export function airconFaqs(active: boolean): Faq[] {
  // "$45 (usual price $50)" during the offer, "$50" otherwise.
  const p = (amount: number) =>
    active
      ? `${formatPrice(offerPrice(amount))} (usual price ${formatPrice(amount)})`
      : formatPrice(amount);
  const range = (min: number, max: number) =>
    active
      ? `${formatPrice(offerPrice(min))} to ${formatPrice(offerPrice(max))}`
      : `${formatPrice(min)} to ${formatPrice(max)}`;
  const offerNote = active
    ? ` These are ${offer.name} prices, ${offer.percent}% off until ${offer.endLabel}.`
    : "";
  const [wall, cassette] = servicingTiers;
  const r410 = gasRange(1);
  const r32 = gasRange(2);

  return [
    {
      question: "How much does aircon servicing cost in Singapore?",
      answer: `Aircon servicing for wall-mounted units is ${p(wall.tiers[0])} for 1 unit, ${p(wall.tiers[1])} for 2 units, ${p(wall.tiers[2])} for 3 units and ${p(wall.tiers[3])} for 4 units. Central and cassette aircon servicing starts at ${p(cassette.tiers[0])} for 1 unit. A chemical overhaul is ${p(chemicalOverhaul.price)} per unit.${offerNote}`,
    },
    {
      question:
        "What is the difference between general servicing, a chemical wash and a chemical overhaul?",
      answer:
        "General aircon servicing is routine cleaning that keeps a working unit cooling properly. An aircon chemical wash uses a chemical cleaning solution to remove the dirt, grease and mould that normal servicing cannot. A chemical overhaul goes furthest: full internal disassembly, chemical wash of all parts, mould and bacteria removal, drainage clearing and performance testing.",
    },
    {
      question: "How often should I service my aircon?",
      answer:
        "For most homes we recommend aircon servicing every three months, which is why our maintenance plan is built around four visits a year. Units that run all day, such as in offices and shops, may need air con maintenance more often; we offer quarterly or monthly plans.",
    },
    {
      question:
        "My aircon is not cold or is leaking water. How much does aircon repair cost?",
      answer: `Aircon repair and troubleshooting starts from ${p(repairFrom)}, with the diagnostic and minor fixes included. The final cost depends on the fault and the parts required, and we quote before starting. If you decide not to go ahead with the repair, there is no charge beyond the diagnostic.${offerNote}`,
    },
    {
      question: "How much is an aircon gas top-up?",
      answer: `A gas top-up for R410 or R22 systems is ${range(r410.min, r410.max)} per outdoor unit, and ${range(r32.min, r32.max)} per outdoor unit for R32 systems.${offerNote}`,
    },
    {
      question: "Do you repair Daikin, Mitsubishi and Panasonic aircon?",
      answer: `Yes. We service and repair ${featuredBrands.join(", ")} air conditioners as well as other major brands including ${otherBrands.join(", ")}. ${brandDisclaimer}`,
    },
    {
      question:
        "Can you service an aircon bought from Gain City or another retailer?",
      answer:
        "Yes. We service and repair aircon units regardless of where they were bought or who installed them. Smart Infratech is an independent company and is not affiliated with Gain City or any other retailer. If your unit is still under the manufacturer's or retailer's warranty, check its terms before booking a third-party repair.",
    },
    {
      question: "How soon can you come?",
      answer: `Appointments are usually available the same day or the next day, subject to availability. We are open ${company.hoursLong}. WhatsApp ${company.phone} with a photo or short video of the unit and we will confirm a time.`,
    },
    {
      question: "Which areas of Singapore do you cover?",
      answer:
        "We provide aircon servicing, chemical wash and aircon repair islandwide across Singapore, for HDB flats, condominiums, landed homes, offices and shops. Our office is at Bukit Batok Crescent.",
    },
    {
      question: "Is there a warranty on your work?",
      answer:
        "Yes. Our servicing and repair work carries a workmanship warranty. The warranty terms for your job are confirmed with your quotation.",
    },
    {
      question: "Do you offer aircon maintenance contracts?",
      answer:
        "Yes. Aircon maintenance contracts give you fixed-rate regular servicing on a quarterly or monthly plan, with priority scheduling, for homes and businesses. Contracts are quoted for your site and equipment.",
    },
  ];
}

const pageUrl = `${company.websiteHref}/aircon`;
const businessId = `${company.websiteHref}/#business`;

/** schema.org graph for /aircon: the business, its priced services, breadcrumb and FAQ. */
export function airconJsonLd(active: boolean) {
  const price = (amount: number) => (active ? offerPrice(amount) : amount);
  // Offer prices lapse with the offer; schema wants a plain date.
  const validity = active ? { priceValidUntil: "2026-12-31" } : {};

  const fixed = (name: string, amount: number, unitText?: string) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
    priceCurrency: "SGD",
    price: price(amount),
    ...(unitText
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: price(amount),
            priceCurrency: "SGD",
            unitText,
          },
        }
      : {}),
    ...validity,
  });
  const ranged = (name: string, min: number, max?: number) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "SGD",
      minPrice: price(min),
      ...(max ? { maxPrice: price(max) } : {}),
    },
    ...validity,
  });

  const [wall, cassette] = servicingTiers;
  const r410 = gasRange(1);
  const r32 = gasRange(2);
  const installs = installRates.filter((rate) => rate.from !== undefined);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HVACBusiness",
        "@id": businessId,
        name: "Smart Infratech Pte. Ltd.",
        alternateName: "SMART AirCon",
        description:
          "Aircon servicing, chemical wash, aircon repair, gas top-up, installation and maintenance for homes and businesses in Singapore.",
        url: pageUrl,
        image: `${company.websiteHref}/logo.png`,
        telephone: company.phone,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${company.address[0]}, ${company.address[1]}`,
          addressLocality: "Singapore",
          postalCode: "658070",
          addressCountry: "SG",
        },
        areaServed: { "@type": "Country", name: "Singapore" },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Aircon services",
          itemListElement: [
            fixed(
              "Aircon servicing — wall-mounted unit",
              wall.tiers[0],
              "unit",
            ),
            fixed(
              "Aircon servicing — central / cassette unit",
              cassette.tiers[0],
              "unit",
            ),
            fixed("Aircon chemical overhaul", chemicalOverhaul.price, "unit"),
            ranged("Aircon repair and troubleshooting", repairFrom),
            ranged("Aircon gas top-up — R410 / R22", r410.min, r410.max),
            ranged("Aircon gas top-up — R32", r32.min, r32.max),
            ...installs.map((rate) => ranged(rate.title, rate.from as number)),
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: company.websiteHref,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Aircon Servicing & Repair",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: airconFaqs(active).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
