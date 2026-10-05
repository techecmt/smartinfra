import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/lib/content";
import { supplyServices, type SupplyService } from "@/lib/supply-services";
import { Navbar } from "@/components/sections/navbar";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Footer } from "@/components/sections/footer";
import { Cursor } from "@/components/ui/cursor";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";

const title = "Supply & Installation Services Singapore | Smart Infratech";
const description =
  "Smart Infratech supplies and installs for homes and business premises in Singapore: painting, demolition, water heaters, pipe leak repairs, tap replacement, power trip rectification, ceiling and wall fans, wiring with power points and full renovation jobs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/supply-installation" },
  openGraph: {
    title,
    description,
    siteName: "Smart Infratech",
    locale: "en_SG",
    type: "website",
  },
  twitter: { card: "summary", title, description },
};

const enquiryHref = (service: SupplyService) =>
  `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${service.title}`)}`;

export default function SupplyInstallationPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar home={false} />
      <main id="main">
        <section
          aria-labelledby="page-heading"
          className="relative isolate overflow-hidden bg-white pt-32 pb-16 sm:pb-20 lg:pt-44"
        >
          <div
            aria-hidden
            className="grid-blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_80%_at_75%_30%,black_20%,transparent_80%)]"
          />
          <div className="container-site">
            <nav aria-label="Breadcrumb">
              <ol className="label-tech flex items-center gap-3 text-ink-muted">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="h-px w-6 bg-signal" />
                <li aria-current="page" className="text-ink">
                  Supply &amp; installation
                </li>
              </ol>
            </nav>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <SectionHeading
                  as="h1"
                  id="page-heading"
                  size="xl"
                  lines={["Supply and", "installation."]}
                />
                <Reveal delay={0.15}>
                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
                    Practical works for homes and business premises in
                    Singapore. One team to supply the item, install it and put
                    right what is not working — from a single tap or power point
                    to a full renovation job.
                  </p>
                </Reveal>
              </div>

              {/* Sheet index: jump links to each service */}
              <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
                <nav
                  aria-label="Services on this page"
                  className="border border-rule bg-white"
                >
                  <div className="label-tech flex justify-between border-b border-rule bg-paper px-4 py-2.5 text-ink-muted">
                    <span>Index</span>
                    <span>{supplyServices.length} services</span>
                  </div>
                  <ol>
                    {supplyServices.map((s) => (
                      <li
                        key={s.slug}
                        className="border-b border-rule last:border-b-0"
                      >
                        <a
                          href={`#${s.slug}`}
                          className="group flex items-baseline gap-4 px-4 py-2 text-sm text-ink transition-colors hover:bg-paper"
                        >
                          <span className="label-tech w-10 shrink-0 text-ink-muted">
                            {s.code}
                          </span>
                          {s.title}
                          <span
                            aria-hidden
                            className="ml-auto h-px w-0 self-center bg-signal transition-[width] duration-500 ease-(--ease-architect) group-hover:w-6"
                          />
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="scope-heading"
          className="relative bg-white pb-24 sm:pb-32"
        >
          <div className="container-site">
            <SectionMarker
              index="01"
              label="Scope of works"
              meta="Homes & premises"
            />
            <h2 id="scope-heading" className="sr-only">
              Supply and installation services
            </h2>

            <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
              {supplyServices.map((service, i) => (
                <ServiceRow
                  key={service.slug}
                  service={service}
                  flip={i % 2 === 1}
                />
              ))}
            </div>

            <p className="label-tech mt-16 border-t border-rule pt-5 text-ink-muted">
              Photographs are illustrative and do not show Smart Infratech
              projects
            </p>
          </div>
        </section>

        <ContactCTA index="02" />
      </main>
      <Footer home={false} />
      <Cursor />
    </>
  );
}

function ServiceRow({
  service,
  flip,
}: {
  service: SupplyService;
  flip: boolean;
}) {
  const no = service.code.slice(-2);
  return (
    <article
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="group grid scroll-mt-28 grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10"
    >
      <Reveal
        className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
      >
        <figure className="relative">
          <div className="relative aspect-[3/2] overflow-hidden bg-paper">
            <Image
              src={service.image}
              alt={service.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover grayscale transition-[filter,scale] duration-700 ease-(--ease-architect) group-hover:scale-[1.03] group-hover:grayscale-0 [@media(hover:none)]:grayscale-0"
            />
          </div>
          {/* Dimension line under the frame */}
          <figcaption className="label-tech mt-3 flex items-center gap-3 text-ink-muted">
            <span>{service.code}</span>
            <span aria-hidden className="relative h-px flex-1 bg-rule">
              <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-(--ease-architect) group-hover:scale-x-100" />
            </span>
            <span>{service.trade}</span>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal
        delay={0.1}
        className={`lg:col-span-4 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}
      >
        <span
          aria-hidden
          className="block font-display text-7xl leading-none font-light tracking-[-0.05em] text-ink/15 transition-colors duration-500 group-hover:text-signal sm:text-8xl"
        >
          {no}
        </span>
        <h3
          id={`${service.slug}-title`}
          className="mt-4 font-display text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl"
        >
          {service.title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          {service.description}
        </p>
        <ul className="mt-6 border-b border-rule">
          {service.scope.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-3 border-t border-rule py-2.5 text-[0.95rem] text-ink"
            >
              <span
                aria-hidden
                className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-signal"
              />
              {item}
            </li>
          ))}
        </ul>
        <a
          href={enquiryHref(service)}
          className="group/link mt-6 inline-flex items-center gap-2 py-1 text-[0.95rem] font-medium text-ink"
        >
          <span className="relative">
            Enquire about this service
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-ink/25 transition-colors duration-300 group-hover/link:bg-signal"
            />
          </span>
          <ArrowUpRight
            aria-hidden
            className="size-4 text-signal transition-transform duration-300 group-hover/link:rotate-45"
          />
        </a>
      </Reveal>
    </article>
  );
}
