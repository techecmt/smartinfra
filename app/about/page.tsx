import type { Metadata } from "next";
import { company, divisionList, principles } from "@/lib/content";
import { photos } from "@/lib/photos";
import { ButtonLink } from "@/components/ui/buttons";
import { PageHeader } from "@/components/layout/page-header";
import { ContactBand } from "@/components/sections/contact-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-heading";

const description =
  "About Smart Infratech Pte. Ltd., a Singapore company providing air conditioning and electrical engineering services for homes and businesses from Bukit Batok.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About Us"
        title="About Smart Infratech"
        eyebrow={company.tagline}
        intro="SMART INFRATECH PTE. LTD. is a Singapore company providing air conditioning and electrical engineering services for homes and businesses."
        photo={photos.about}
      />

      <section
        aria-labelledby="company-heading"
        className="bg-white py-16 sm:py-24"
      >
        <div className="container-site">
          <SectionMarker index="01" label="Company" meta="Singapore" />
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2
                id="company-heading"
                className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
              >
                Two divisions under one corporate brand
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                Cooling and power are the two systems a home or workplace
                notices first when something goes wrong. We run them as two
                divisions of the same company, so an enquiry about either
                reaches the same team.
              </p>
              <ul className="mt-10 border-b border-rule">
                {divisionList.map((division) => (
                  <li
                    key={division.key}
                    className="flex flex-col gap-4 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                        {division.name}
                      </h3>
                      <p className="mt-1 text-ink-muted">
                        {division.strapline}
                      </p>
                    </div>
                    <ButtonLink
                      href={division.href}
                      variant="outline"
                      className="self-start sm:self-auto"
                    >
                      View Services
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal className="lg:col-span-4 lg:col-start-9">
              <dl className="border border-rule bg-paper p-6 sm:p-8">
                <div>
                  <dt className="label-tech text-ink-muted">Company</dt>
                  <dd className="mt-2 font-display text-lg font-medium text-ink">
                    {company.name}
                  </dd>
                </div>
                <div className="mt-6 border-t border-rule pt-6">
                  <dt className="label-tech text-ink-muted">UEN</dt>
                  <dd className="mt-2 text-ink">{company.uen}</dd>
                </div>
                <div className="mt-6 border-t border-rule pt-6">
                  <dt className="label-tech text-ink-muted">Office</dt>
                  <dd className="mt-2 text-ink">
                    <address className="leading-relaxed not-italic">
                      {company.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
                <div className="mt-6 border-t border-rule pt-6">
                  <dt className="label-tech text-ink-muted">Contact</dt>
                  <dd className="mt-2 text-ink">
                    <a
                      href={company.phoneHref}
                      className="block py-0.5 hover:underline"
                    >
                      {company.phone}
                    </a>
                    <a
                      href={company.emailHref}
                      className="block py-0.5 break-all hover:underline"
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="bg-paper py-16 sm:py-24"
      >
        <div className="container-site">
          <SectionMarker index="02" label="How we work" />
          <h2
            id="principles-heading"
            className="mt-10 max-w-3xl font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
          >
            Expert management, energy efficient
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={i * 0.06}>
                <div className="border-t-2 border-ink pt-5">
                  <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-ink-muted">{principle.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
