import { company } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";
import { FloorPlanDiagram } from "@/components/visuals/floor-plan-diagram";

const facts = [
  { label: "Entity", value: company.name },
  { label: "UEN", value: company.uen },
  { label: "Base", value: "Bukit Batok, Singapore" },
  { label: "Environments", value: "Commercial & private" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-white py-24 sm:py-32"
    >
      <div className="container-site">
        <SectionMarker
          index="01"
          label="Who we are"
          meta="Engineering systems"
        />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionHeading
              id="about-heading"
              lines={["Engineering solutions.", "Practical execution."]}
            />

            <Reveal
              delay={0.1}
              className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-ink-muted"
            >
              <p>
                <strong className="font-semibold text-ink">
                  SMART INFRATECH PTE. LTD.
                </strong>{" "}
                provides integrated infrastructure, construction, consultancy,
                inspection and building-related solutions for commercial and
                private environments in Singapore.
              </p>
              <p>
                Our approach combines technical coordination, practical
                execution and energy-conscious solutions to support projects
                from individual works to broader infrastructure requirements.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid max-w-xl grid-cols-2 border-t border-rule">
                {facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`border-b border-rule py-4 ${i % 2 === 0 ? "pr-4" : "border-l pl-4"}`}
                  >
                    <dt className="label-tech text-ink-muted">{f.label}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-ink">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <div className="relative border border-rule bg-paper p-5 sm:p-8">
              <div className="label-tech mb-4 flex justify-between text-ink-muted">
                <span>Plan / Coordination</span>
                <span>Fig. 01</span>
              </div>
              <FloorPlanDiagram className="h-auto w-full" />
              {/* Corner registration marks */}
              <span
                aria-hidden
                className="absolute -top-px -left-px h-3 w-3 border-t border-l border-signal"
              />
              <span
                aria-hidden
                className="absolute -right-px -bottom-px h-3 w-3 border-r border-b border-signal"
              />
            </div>
            <p className="label-tech mt-4 text-ink-muted">
              Illustrative diagram — not a project drawing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
