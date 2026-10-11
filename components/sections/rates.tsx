import {
  chemicalOverhaul,
  installRates,
  offer,
  rateEnquiry,
  ratesNotice,
  repairFrom,
  repairRates,
  servicingTiers,
  formatPrice,
  offerPrice,
  type RepairPrice,
} from "@/lib/rates";
import { WhatsAppLink } from "@/components/ui/buttons";
import { BookButton } from "@/components/booking/book-button";
import { OfferTag, Price } from "@/components/ui/price";
import { SectionMarker } from "@/components/ui/section-heading";

const h3 =
  "font-display text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl";
const cardTitle = "font-display text-xl font-medium tracking-[-0.02em]";
const bigPrice =
  "font-display text-5xl leading-none font-medium tracking-[-0.03em]";

/** Aircon rates: servicing, repair & gas top-up, and installation. */
export function Rates({ index, active }: { index: string; active: boolean }) {
  return (
    <section
      id="rates"
      aria-labelledby="rates-heading"
      className="border-t border-rule bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        <SectionMarker index={index} label="Rates" meta="SGD" />
        <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {active ? <OfferTag className="mb-5" /> : null}
            <h2
              id="rates-heading"
              className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Aircon rates
            </h2>
          </div>
          {active ? (
            <p className="text-lg leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9">
              {offer.percent}% off every listed rate until {offer.endLabel}.
              Usual prices are shown crossed out.
            </p>
          ) : null}
        </div>

        {/* Servicing */}
        <h3 className={`mt-14 ${h3}`}>Servicing</h3>
        <ul className="relative -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-1 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {servicingTiers.map((card, unitType) => (
            <li
              key={card.title}
              data-surface="dark"
              className="flex flex-col border border-ink max-md:w-[84%] max-md:shrink-0 max-md:snap-center max-md:overflow-hidden max-md:rounded-2xl"
            >
              <div className="bg-ink p-6 text-white sm:p-8">
                <h4 className={cardTitle}>{card.title}</h4>
                <p className="mt-4 flex items-baseline gap-3">
                  <Price
                    amount={card.tiers[0]}
                    active={active}
                    className={bigPrice}
                  />
                  <span className="text-white/70">/ 1 unit</span>
                </p>
              </div>
              <dl className="flex-1 bg-white px-6 py-2 sm:px-8">
                {card.tiers.map((amount, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
                  >
                    <dt className="text-ink">
                      {i + 1} {i === 0 ? "unit" : "units"}
                    </dt>
                    <dd className="font-medium text-ink">
                      <Price amount={amount} active={active} />
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="bg-white px-6 pb-6 sm:px-8 sm:pb-8">
                <BookButton
                  preset={{ service: "servicing", unitType, source: "rates" }}
                  className="w-full"
                >
                  Book Servicing
                </BookButton>
              </div>
            </li>
          ))}

          <li className="flex flex-col border border-rule max-md:w-[84%] max-md:shrink-0 max-md:snap-center max-md:overflow-hidden max-md:rounded-2xl">
            <div className="bg-paper p-6 text-ink sm:p-8">
              <h4 className={cardTitle}>{chemicalOverhaul.title}</h4>
              <p className="mt-4 flex items-baseline gap-3">
                <Price
                  amount={chemicalOverhaul.price}
                  active={active}
                  className={bigPrice}
                />
                <span className="text-ink-muted">/ unit</span>
              </p>
            </div>
            <PointList points={chemicalOverhaul.points} />
            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              <BookButton
                preset={{ service: "overhaul", source: "rates" }}
                className="w-full"
              >
                Book Overhaul
              </BookButton>
            </div>
          </li>
        </ul>

        {/* Repair & gas top-up */}
        <h3 className={`mt-16 ${h3}`}>Repair &amp; gas top-up</h3>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Repair pricing starts from{" "}
          <Price
            amount={repairFrom}
            active={active}
            className="font-medium text-ink"
          />
          . Final cost depends on fault type and parts required. We quote before
          starting.
        </p>
        <div className="mt-6 overflow-x-auto border border-rule max-md:rounded-2xl">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="bg-ink text-white">
                <th scope="col" className="label-tech px-5 py-3.5">
                  Service
                </th>
                <th scope="col" className="label-tech px-5 py-3.5">
                  Price
                </th>
                <th scope="col" className="label-tech px-5 py-3.5">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {repairRates.map((row) => (
                <tr
                  key={row.service}
                  className="border-t border-rule even:bg-paper"
                >
                  <th scope="row" className="px-5 py-4 font-normal text-ink">
                    {row.service}
                  </th>
                  <td className="px-5 py-4 font-medium whitespace-nowrap text-ink">
                    <RepairPriceCell price={row.price} active={active} />
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Installation */}
        <h3 className={`mt-16 ${h3}`}>New aircon installation</h3>
        <p className="mt-3 max-w-2xl text-ink-muted">
          All-in pricing — includes the brand-new unit and complete professional
          installation.
        </p>
        <ul className="relative -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-1 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {installRates.map((card, i) => (
            <li
              key={card.title}
              className={`flex flex-col border max-md:w-[84%] max-md:shrink-0 max-md:snap-center max-md:overflow-hidden max-md:rounded-2xl ${i === 1 ? "border-rule" : "border-ink"}`}
            >
              <div
                data-surface={i === 1 ? undefined : "dark"}
                className={`p-6 sm:p-8 ${i === 1 ? "bg-paper text-ink" : "bg-ink text-white"}`}
              >
                <h4 className={cardTitle}>{card.title}</h4>
                <p className="mt-4 flex items-baseline gap-3">
                  {card.from ? (
                    <>
                      <Price
                        amount={card.from}
                        active={active}
                        className={bigPrice}
                      />
                      <span className="opacity-70">from</span>
                    </>
                  ) : (
                    <>
                      <span className={bigPrice}>Custom</span>
                      <span className="opacity-70">
                        quote{active ? ` · ${offer.percent}% off` : ""}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <PointList points={card.points} />
              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <WhatsAppLink
                  text={rateEnquiry(card.title, active)}
                  className="w-full"
                >
                  {card.from ? "Get a Quote" : "Request Custom Quote"}
                </WhatsAppLink>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-l-4 border-signal bg-paper p-5 text-ink sm:p-6">
          <strong className="font-semibold">Prices are indicative.</strong>{" "}
          {ratesNotice}
          {active ? (
            <>
              {" "}
              {offer.name}: {offer.percent}% off listed rates and quotations,
              valid until {offer.endLabel}. Offer prices are rounded down to the
              dollar.
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
}

function PointList({ points }: { points: string[] }) {
  return (
    <ul className="flex-1 bg-white px-6 py-2 sm:px-8">
      {points.map((point) => (
        <li
          key={point}
          className="flex items-baseline gap-3 border-b border-rule py-3 text-ink last:border-b-0"
        >
          <span
            aria-hidden
            className="h-px w-3 shrink-0 -translate-y-1 bg-signal"
          />
          {point}
        </li>
      ))}
    </ul>
  );
}

function RepairPriceCell({
  price,
  active,
}: {
  price: RepairPrice;
  active: boolean;
}) {
  if (price.kind === "quote") return <>Quote on inspection</>;
  if (price.kind === "from")
    return (
      <>
        From <Price amount={price.amount} active={active} />
      </>
    );
  const range = (min: number, max: number) =>
    `${formatPrice(min)} – ${formatPrice(max)}`;
  if (!active) return <>{range(price.min, price.max)}</>;
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="sr-only">{offer.name} price </span>
      {range(offerPrice(price.min), offerPrice(price.max))}
      <s className="text-[0.8125rem] font-normal opacity-70">
        <span className="sr-only">usual price </span>
        {range(price.min, price.max)}
      </s>
    </span>
  );
}
