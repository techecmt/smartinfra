import Image from "next/image";
import { catalogueUnits, type CatalogueUnit } from "@/lib/catalogue";
import { WhatsAppLink } from "@/components/ui/buttons";
import { SectionMarker } from "@/components/ui/section-heading";

const stockEnquiry =
  "Hello Smart Infratech, which used / reconditioned aircon units do you have available?";

/** Used & reconditioned units in stock, driven by `lib/catalogue.ts`. */
export function Catalogue({ index }: { index: string }) {
  return (
    <section
      id="used-aircon"
      aria-labelledby="catalogue-heading"
      className="bg-paper py-16 sm:py-24"
    >
      <div className="container-site">
        <SectionMarker
          index={index}
          label="Used & reconditioned"
          meta="Supply & installation"
        />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <h2
            id="catalogue-heading"
            className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl lg:col-span-6"
          >
            Used and reconditioned aircon
          </h2>
          <p className="text-lg leading-relaxed text-ink-muted lg:col-span-5 lg:col-start-8">
            A lower-cost route to a working system. Each unit is listed with its
            model, capacity, age, condition, price, whether installation is
            included and its warranty terms.
          </p>
        </div>

        {catalogueUnits.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalogueUnits.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </ul>
        ) : (
          <div className="mt-12 flex flex-col items-start gap-6 border border-rule bg-white p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                Stock changes from week to week
              </h3>
              <p className="mt-3 text-ink-muted">
                Message us for the units available right now. Tell us the room
                size or the capacity you are replacing and we will reply with
                suitable options and prices.
              </p>
            </div>
            <WhatsAppLink text={stockEnquiry} className="shrink-0">
              Ask for Current Stock
            </WhatsAppLink>
          </div>
        )}
      </div>
    </section>
  );
}

function UnitCard({ unit }: { unit: CatalogueUnit }) {
  const name = `${unit.brand} ${unit.model}`;
  const rows = [
    ["Capacity", unit.capacity],
    ["Age", unit.age],
    ["Condition", unit.condition],
    ["Installation", unit.installationIncluded ? "Included" : "Not included"],
    ["Warranty", unit.warranty],
  ];
  return (
    <li className="flex flex-col border border-rule bg-white">
      {unit.image ? (
        <div className="relative aspect-[4/3] bg-paper">
          <Image
            src={unit.image}
            alt={unit.imageAlt ?? name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
          {name}
        </h3>
        <p className="mt-1 font-display text-2xl font-medium text-ink">
          {unit.price}
        </p>
        <dl className="mt-5 flex-1 border-b border-rule text-[0.95rem]">
          {rows.map(([term, value]) => (
            <div
              key={term}
              className="flex justify-between gap-6 border-t border-rule py-2.5"
            >
              <dt className="text-ink-muted">{term}</dt>
              <dd className="text-right text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <WhatsAppLink
          text={`Hello Smart Infratech, I am interested in the used aircon: ${name} (${unit.capacity}), listed at ${unit.price}.`}
          className="mt-6"
        >
          Enquire About This Unit
        </WhatsAppLink>
      </div>
    </li>
  );
}
