import type { Division } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-heading";

/** The full service list for one division, one block per group. */
export function ServiceGroups({
  division,
  index = "01",
  heading,
}: {
  division: Division;
  index?: string;
  heading?: string;
}) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={`bg-white py-16 sm:py-24 ${index === "01" ? "" : "border-t border-rule"}`}
    >
      <div className="container-site">
        <SectionMarker index={index} label="Services" meta={division.name} />
        <h2
          id="services-heading"
          className="mt-10 max-w-3xl font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
        >
          {heading ?? `What ${division.name} covers`}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {division.groups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 2) * 0.08}>
              <article className="border-t-2 border-ink pt-6">
                <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                  {group.title}
                </h3>
                <p className="mt-2 text-ink-muted">{group.summary}</p>
                <ul className="mt-5 border-b border-rule">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-t border-rule py-3 text-ink"
                    >
                      <span
                        aria-hidden
                        className="h-px w-3 shrink-0 -translate-y-1 bg-signal"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
