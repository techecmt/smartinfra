import { serviceGroups, type ServiceGroup } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";
import { ServiceIllustration } from "@/components/visuals/service-illustration";

// Per-group layout so the matrix reads as a composed grid, not repeated cards.
const layout: Record<string, { cell: string; list: string }> = {
  "S-01": { cell: "lg:col-span-5", list: "grid-cols-1" },
  "S-02": { cell: "lg:col-span-7", list: "grid-cols-1 sm:grid-cols-2" },
  "S-03": {
    cell: "lg:col-span-7",
    list: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
  },
  "S-04": { cell: "lg:col-span-5", list: "grid-cols-1" },
};

export function ServicesGrid() {
  const security = serviceGroups.find((g) => g.illustration === "security")!;
  const rest = serviceGroups.filter((g) => g !== security);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-white py-24 sm:py-32"
    >
      <div className="container-site">
        <SectionMarker index="03" label="Services" meta="Services matrix" />

        <div className="mt-14 grid grid-cols-1 items-end gap-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              id="services-heading"
              lines={["From structure", "to finishing."]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
                Integrated capabilities across construction, engineering,
                renovation and consultancy.
              </p>
            </Reveal>
          </div>

          {/* Matrix key, set like the legend block on a drawing sheet */}
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <dl className="border border-rule">
              <div className="label-tech flex justify-between border-b border-rule bg-paper px-4 py-2.5 text-ink-muted">
                <span>Key</span>
                <span>
                  {serviceGroups.reduce((n, g) => n + g.items.length, 0)} items
                </span>
              </div>
              {serviceGroups.map((g) => (
                <div
                  key={g.code}
                  className="flex items-baseline gap-4 border-b border-rule px-4 py-2 last:border-b-0"
                >
                  <dt className="label-tech w-10 shrink-0 text-ink-muted">
                    {g.code}
                  </dt>
                  <dd className="text-sm text-ink">{g.title}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-px border border-rule bg-rule lg:grid-cols-12">
            {rest.map((group) => (
              <ServiceCell key={group.code} group={group} />
            ))}
            <SecurityBand group={security} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCell({ group }: { group: ServiceGroup }) {
  const { cell, list } = layout[group.code];
  const numbered = group.illustration === "consultancy";
  return (
    <article
      aria-labelledby={`${group.code}-title`}
      className={`group relative isolate overflow-hidden bg-white p-6 transition-colors duration-500 hover:bg-paper sm:p-10 ${cell}`}
    >
      <ServiceIllustration
        kind={group.illustration}
        className="pointer-events-none absolute -right-6 -bottom-6 -z-10 w-52 opacity-90 sm:w-64"
      />
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-700 ease-(--ease-architect) group-hover:scale-x-100"
      />

      <div className="label-tech flex items-center justify-between text-ink-muted">
        <span>{group.code}</span>
        <span>
          {String(group.items.length).padStart(2, "0")}{" "}
          {group.items.length === 1 ? "service" : "services"}
        </span>
      </div>

      <h3
        id={`${group.code}-title`}
        className="mt-10 font-display text-2xl font-medium tracking-[-0.02em] text-ink sm:text-[1.75rem]"
      >
        {group.title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">{group.summary}</p>

      <ul className={`mt-8 grid gap-x-8 ${list}`}>
        {group.items.map((item, i) => (
          <li
            key={item}
            className="flex items-baseline gap-3 border-t border-rule py-2.5 text-[0.95rem] text-ink"
          >
            {numbered ? (
              <span className="label-tech w-5 shrink-0 text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span
                aria-hidden
                className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-signal"
              />
            )}
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function SecurityBand({ group }: { group: ServiceGroup }) {
  return (
    <article
      data-surface="dark"
      aria-labelledby={`${group.code}-title`}
      className="group relative isolate grid grid-cols-1 items-center gap-6 overflow-hidden bg-ink p-6 text-white sm:p-10 lg:col-span-12 lg:grid-cols-12"
    >
      <div
        className="grid-blueprint-dark pointer-events-none absolute inset-0 -z-20"
        aria-hidden
      />
      <ServiceIllustration
        kind="security"
        tone="dark"
        className="pointer-events-none absolute top-1/2 right-4 -z-10 w-56 -translate-y-1/2 sm:right-10 sm:w-72"
      />
      <div className="label-tech flex items-center gap-3 text-white/60 lg:col-span-2">
        <span>{group.code}</span>
        <span aria-hidden className="h-px w-6 bg-signal" />
      </div>
      <h3
        id={`${group.code}-title`}
        className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-[1.75rem] lg:col-span-3"
      >
        {group.title}
      </h3>
      <p className="max-w-md text-white/70 lg:col-span-4">{group.summary}</p>
      <p className="label-tech text-white lg:col-span-3">
        {group.items.join(" / ")}
      </p>
    </article>
  );
}
