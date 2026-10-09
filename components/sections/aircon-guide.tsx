import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brandDisclaimer, featuredBrands, otherBrands } from "@/lib/aircon-seo";
import { chemicalOverhaul, repairFrom, servicingTiers } from "@/lib/rates";
import { Price } from "@/components/ui/price";
import { SectionMarker } from "@/components/ui/section-heading";

const strong = "font-medium text-ink";

/** The four core aircon services, each explained in plain language. */
export function AirconGuide({
  index,
  active,
}: {
  index: string;
  active: boolean;
}) {
  return (
    <section
      id="aircon-services"
      aria-labelledby="guide-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        <SectionMarker index={index} label="Aircon services" meta="Singapore" />
        <h2
          id="guide-heading"
          className="mt-10 max-w-3xl font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
        >
          Aircon servicing, chemical wash, repair and maintenance
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          <Topic id="servicing" title="Aircon servicing">
            <p>
              Regular aircon servicing keeps a unit cooling properly and heads
              off the usual complaints: weak airflow, a musty smell, or water
              dripping from the indoor unit. An air con servicing visit cleans
              the unit and checks that it is cooling as it should.
            </p>
            <p>
              Aircon service for one wall-mounted unit is{" "}
              <Price
                amount={servicingTiers[0].tiers[0]}
                active={active}
                className={strong}
              />
              , and the price per unit drops when we service several units in
              the same visit.
            </p>
          </Topic>

          <Topic id="chemical-wash" title="Aircon chemical wash">
            <p>
              When a normal service no longer brings the cooling back, an aircon
              chemical wash goes deeper. Chemical cleaning removes the grease,
              dust and mould that build up on the cooling coil and blower, which
              brushing and rinsing alone cannot shift.
            </p>
            <p>
              For heavily clogged units we carry out a chemical overhaul at{" "}
              <Price
                amount={chemicalOverhaul.price}
                active={active}
                className={strong}
              />{" "}
              per unit: full internal disassembly, chemical wash of all parts,
              mould and bacteria removal, drainage clearing and performance
              testing. Some people call this an AC chemical wash or air
              conditioner chemical cleaning; it is the same job.
            </p>
          </Topic>

          <Topic id="repair" title="Aircon repair">
            <p>
              Aircon not cold, leaking water, making noise, tripping the power
              or blinking a fault light? An aircon repair visit starts with
              troubleshooting to find the actual fault before anything is
              replaced.
            </p>
            <p>
              Repair starts from{" "}
              <Price amount={repairFrom} active={active} className={strong} />{" "}
              with the diagnostic and minor fixes included, and we quote before
              starting anything larger. Common aircon fixes include gas top-up
              and leak checks, PCB replacement, fan motor and compressor faults,
              and blocked drainage.
            </p>
          </Topic>

          <Topic id="maintenance" title="Aircon maintenance">
            <p>
              Planned air con maintenance costs less than emergency repairs. A
              maintenance contract gives you fixed-rate regular servicing on a
              quarterly or monthly plan, with priority scheduling, for homes and
              businesses.
            </p>
            <p>
              <Link
                href="/maintenance-plans"
                className="group inline-flex items-center gap-2 font-medium text-ink underline underline-offset-4"
              >
                See aircon maintenance plans
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </p>
          </Topic>
        </div>
      </div>
    </section>
  );
}

function Topic({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className="border-t-2 border-ink pt-6">
      <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <div className="mt-3 space-y-4 leading-relaxed text-ink-muted">
        {children}
      </div>
    </article>
  );
}

/** Brands serviced, with the independence disclaimer. */
export function AirconBrands({ index }: { index: string }) {
  return (
    <section
      id="brands"
      aria-labelledby="brands-heading"
      className="bg-paper py-16 sm:py-24"
    >
      <div className="container-site">
        <SectionMarker index={index} label="Brands" meta="All major brands" />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              id="brands-heading"
              className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Daikin, Mitsubishi and Panasonic aircon repair
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              We service and repair all major air conditioner brands found in
              Singapore homes and offices. Daikin aircon repair, Mitsubishi
              aircon repair and Panasonic units make up much of our work,
              whether the fault is a unit that is not cold, a leak, or a failed
              PCB, fan motor or compressor.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ul className="grid grid-cols-3 gap-2">
              {featuredBrands.map((brand) => (
                <li
                  key={brand}
                  className="grid min-h-12 place-items-center bg-ink px-2 text-center font-medium text-white"
                >
                  {brand}
                </li>
              ))}
              {otherBrands.map((brand) => (
                <li
                  key={brand}
                  className="grid min-h-12 place-items-center border border-rule bg-white px-2 text-center text-ink"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 max-w-3xl border-t border-rule pt-5 text-sm leading-relaxed text-ink-muted">
          {brandDisclaimer}
        </p>
      </div>
    </section>
  );
}
