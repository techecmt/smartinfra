import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Snowflake, Zap } from "lucide-react";
import { divisionList, type DivisionKey } from "@/lib/content";
import {
  chemicalOverhaul,
  isOfferActive,
  offer,
  offerWhatsappText,
  repairFrom,
  servicingTiers,
} from "@/lib/rates";
import { photos, type Photo } from "@/lib/photos";
import { ButtonLink, WhatsAppLink } from "@/components/ui/buttons";
import { BookButton } from "@/components/booking/book-button";
import { Price } from "@/components/ui/price";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-heading";
import { EnquirySteps } from "@/components/sections/enquiry-steps";
import { PlanCards } from "@/components/sections/plans";
import { QuoteSection } from "@/components/sections/quote-section";

const divisionIcons: Record<DivisionKey, typeof Snowflake> = {
  aircon: Snowflake,
  electrical: Zap,
};

const divisionPhotos: Record<DivisionKey, Photo> = {
  aircon: photos.aircon,
  electrical: photos.electricalBoard,
};

// Headline rates for the home-page offer band; the full list is on /aircon.
const offerHighlights = [
  {
    label: "Aircon servicing",
    note: "1 wall-mounted unit",
    amount: servicingTiers[0].tiers[0],
  },
  {
    label: chemicalOverhaul.title,
    note: "per unit",
    amount: chemicalOverhaul.price,
  },
  { label: "Aircon repair", note: "starting from", amount: repairFrom },
];

export default function Home() {
  const active = isOfferActive();
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden bg-white"
      >
        <div
          aria-hidden
          className="grid-blueprint absolute inset-0 -z-10 [mask-image:linear-gradient(to_left,black,transparent_65%)]"
        />
        <div className="container-site grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="label-tech flex items-center gap-3 text-ink-muted">
              <span aria-hidden className="h-px w-8 bg-signal" />
              Air Conditioning &amp; Electrical Engineering
            </p>
            <h1
              id="hero-heading"
              className="mt-7 font-display text-[clamp(2.5rem,10vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.04em] text-ink lg:text-[clamp(3.75rem,5.6vw,5.5rem)]"
            >
              Your comfort<span className="text-signal">.</span>
              <br />
              Our engineering expertise<span className="text-signal">.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              Complete air conditioning and electrical solutions for homes and
              businesses across Singapore.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookButton preset={{ source: "home_hero" }}>
                Book a Service
              </BookButton>
              <WhatsAppLink text={active ? offerWhatsappText : undefined}>
                WhatsApp Us
              </WhatsAppLink>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {divisionList.map((division) => {
              const Icon = divisionIcons[division.key];
              return (
                <li key={division.key}>
                  <Link
                    href={division.href}
                    className="group flex items-center gap-5 border border-rule bg-white p-5 transition-colors hover:border-ink sm:p-6"
                  >
                    <span className="grid size-14 shrink-0 place-items-center bg-ink text-white">
                      <Icon className="size-6" aria-hidden strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl font-medium tracking-[-0.02em] text-ink">
                        {division.name}
                      </span>
                      <span className="mt-1 block text-[0.95rem] text-ink-muted">
                        {division.strapline}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-5 shrink-0 text-signal transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div aria-hidden className="h-px w-full bg-signal" />
      </section>

      {active ? (
        <section
          aria-labelledby="offer-heading"
          data-surface="dark"
          className="relative isolate overflow-hidden bg-ink py-12 text-white sm:py-16"
        >
          <div
            aria-hidden
            className="grid-blueprint-dark absolute inset-0 -z-10"
          />
          <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label-tech flex items-center gap-3 text-white/70">
                <span aria-hidden className="h-px w-6 bg-signal" />
                Until {offer.endLabel}
              </p>
              <h2
                id="offer-heading"
                className="mt-4 font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] sm:text-5xl"
              >
                {offer.name}: {offer.percent}% off aircon rates
              </h2>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink text={offerWhatsappText}>
                  Claim on WhatsApp
                </WhatsAppLink>
                <ButtonLink href="/aircon#rates" variant="light">
                  View All Rates
                </ButtonLink>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-3 lg:col-span-7">
              {offerHighlights.map((item) => (
                <div key={item.label} className="bg-ink p-6">
                  <dt className="font-medium">{item.label}</dt>
                  <dd className="mt-3">
                    <Price
                      amount={item.amount}
                      active
                      className="font-display text-5xl leading-none font-medium tracking-[-0.03em]"
                    />
                    <span className="mt-2 block text-sm text-white/70">
                      {item.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section
        id="services"
        aria-labelledby="services-heading"
        className="bg-paper py-16 sm:py-24"
      >
        <div className="container-site">
          <SectionMarker index="01" label="Services" meta="Two divisions" />
          <h2
            id="services-heading"
            className="mt-10 max-w-3xl font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
          >
            One company for cooling and power
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {divisionList.map((division, i) => {
              const Icon = divisionIcons[division.key];
              const photo = divisionPhotos[division.key];
              return (
                <Reveal key={division.key} delay={i * 0.08} className="flex">
                  <article className="flex w-full flex-col border border-rule bg-white">
                    <div className="relative aspect-[16/9] overflow-hidden bg-rule">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-10">
                      <Icon
                        className="size-8 text-signal"
                        aria-hidden
                        strokeWidth={1.5}
                      />
                      <h3 className="mt-6 font-display text-3xl font-medium tracking-[-0.03em] text-ink">
                        {division.name}
                      </h3>
                      <p className="label-tech mt-2 text-ink-muted">
                        {division.strapline}
                      </p>
                      <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                        {division.summary}
                      </p>
                      <ul className="mt-7 flex-1 border-b border-rule">
                        {division.groups.map((group) => (
                          <li
                            key={group.title}
                            className="border-t border-rule py-3.5"
                          >
                            <span className="font-medium text-ink">
                              {group.title}
                            </span>
                            <span className="mt-0.5 block text-[0.95rem] text-ink-muted">
                              {group.summary}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <ButtonLink
                        href={division.href}
                        className="mt-8 self-start"
                      >
                        View {division.name}
                      </ButtonLink>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <EnquirySteps index="02" />

      <section
        aria-labelledby="plans-heading"
        className="border-t border-rule bg-white py-16 sm:py-24"
      >
        <div className="container-site">
          <SectionMarker
            index="03"
            label="Maintenance plans"
            meta="Recurring servicing"
          />
          <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <h2
              id="plans-heading"
              className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl lg:col-span-7"
            >
              Service it four times a year, not when it fails
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-relaxed text-ink-muted">
                Annual plans put servicing on a schedule for homes and business
                premises.
              </p>
              <ButtonLink
                href="/maintenance-plans"
                variant="outline"
                className="mt-6"
              >
                Compare Plans
              </ButtonLink>
            </div>
          </div>
          <div className="mt-12">
            <PlanCards active={active} />
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
