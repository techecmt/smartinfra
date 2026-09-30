import { capabilities } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative bg-paper py-24 sm:py-32"
    >
      <div className="container-site">
        <SectionMarker
          index="02"
          label="Capabilities"
          meta="Project delivery"
        />

        <div className="mt-14 grid grid-cols-1 items-end gap-8 lg:mt-20 lg:grid-cols-12">
          <SectionHeading
            id="capabilities-heading"
            lines={["What we do"]}
            size="xl"
            className="lg:col-span-7"
          />
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-ink-muted">
              Six capability areas under one coordinated approach — from site
              works and building services to consultancy and inspection.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-ink/15 lg:mt-24">
          {capabilities.map((cap, i) => (
            <Reveal
              as="li"
              key={cap.no}
              delay={(i % 3) * 0.06}
              className="relative"
            >
              <article className="group relative grid grid-cols-[4.5rem_1fr] gap-x-6 gap-y-3 border-b border-ink/15 py-8 sm:grid-cols-[7rem_1fr] sm:py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-12">
                <div
                  aria-hidden
                  className="grid-blueprint pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 bg-signal transition-transform duration-700 ease-(--ease-architect) group-hover:scale-y-100"
                />

                <span
                  aria-hidden
                  className="relative row-span-2 font-display text-[3.25rem] leading-[0.85] font-light tracking-[-0.04em] text-transparent transition-[translate,-webkit-text-stroke-color] duration-700 ease-(--ease-architect) [-webkit-text-stroke:1px_var(--color-ink)] group-hover:translate-x-3 group-hover:[-webkit-text-stroke-color:var(--color-signal)] sm:text-[5rem] lg:col-span-3 lg:row-span-1 lg:text-[6.5rem]"
                >
                  {cap.no}
                </span>

                <h3 className="relative self-end font-display text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl lg:col-span-4 lg:self-start lg:pt-3">
                  {cap.title}
                </h3>

                <div className="relative transition-transform duration-700 ease-(--ease-architect) group-hover:translate-x-2 lg:col-span-5 lg:pt-4">
                  <p className="max-w-md leading-relaxed text-ink-muted">
                    {cap.description}
                  </p>
                  <p className="label-tech mt-4 text-ink/70">
                    {cap.scope.join("  /  ")}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
