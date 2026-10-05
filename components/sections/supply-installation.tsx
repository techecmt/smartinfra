import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { supplyPath } from "@/lib/content";
import { supplyServices, type SupplyService } from "@/lib/supply-services";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";

export function SupplyInstallation() {
  const [lead, ...rest] = supplyServices;

  return (
    <section
      id="supply"
      aria-labelledby="supply-heading"
      className="relative bg-white py-24 sm:py-32"
    >
      <div className="container-site">
        <SectionMarker
          index="05"
          label="Supply & installation"
          meta="Homes & premises"
        />

        <div className="mt-14 grid grid-cols-1 items-end gap-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="supply-heading"
              lines={["Supplied, installed,", "put right."]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-ink-muted">
              Alongside project works, we supply and install for homes and
              business premises — from a single tap or power point to a full
              renovation job.
            </p>
            <Link
              href={supplyPath}
              className="group mt-8 inline-flex items-center gap-4 bg-ink py-3.5 pr-3.5 pl-5 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink-deep"
            >
              View all nine services
              <span className="grid size-7 place-items-center bg-signal transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal className="mt-16 lg:mt-24">
          <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            <Tile service={lead} lead />
            {rest.map((service) => (
              <Tile key={service.slug} service={service} />
            ))}
          </ul>
        </Reveal>

        <p className="label-tech mt-5 text-ink-muted">
          Photographs are illustrative
        </p>
      </div>
    </section>
  );
}

function Tile({
  service,
  lead = false,
}: {
  service: SupplyService;
  lead?: boolean;
}) {
  return (
    <li className={lead ? "col-span-2 row-span-2" : undefined}>
      <Link
        href={`${supplyPath}#${service.slug}`}
        data-surface="dark"
        className={`group relative isolate block h-full overflow-hidden bg-ink ${
          lead ? "aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={service.image}
          alt={service.alt}
          fill
          placeholder="blur"
          sizes={
            lead
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 25vw, 50vw"
          }
          className="-z-20 object-cover grayscale transition-[filter,scale] duration-700 ease-(--ease-architect) group-hover:scale-[1.04] group-hover:grayscale-0 group-focus-visible:grayscale-0 [@media(hover:none)]:grayscale-0"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-deep/90 via-ink/25 to-ink/10"
        />

        {/* Registration ticks, as on a drawing sheet */}
        <span
          aria-hidden
          className="absolute top-3 left-3 size-3 border-t border-l border-white/60 transition-[width,height] duration-500 ease-(--ease-architect) group-hover:size-5"
        />
        <span
          aria-hidden
          className="absolute top-3 right-3 size-3 border-t border-r border-white/60 transition-[width,height] duration-500 ease-(--ease-architect) group-hover:size-5"
        />

        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-white sm:p-5">
          <span className="min-w-0">
            <span className="label-tech block text-white/70">
              {service.code}
            </span>
            <span
              className={`mt-1 block font-display leading-tight font-medium tracking-[-0.02em] ${
                lead
                  ? "text-2xl sm:text-4xl lg:text-5xl"
                  : "text-[0.95rem] sm:text-xl"
              }`}
            >
              {service.title}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden
            className="hidden size-5 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-0 group-hover:opacity-100 sm:block"
          />
        </span>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-(--ease-architect) group-hover:scale-x-100"
        />
      </Link>
    </li>
  );
}
