import { plans } from "@/lib/content";
import { offer } from "@/lib/rates";
import { OfferTag } from "@/components/ui/price";
import { WhatsAppLink } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/reveal";

/** Maintenance plan cards. Plans are quoted per site, so no prices are shown. */
export function PlanCards({
  as: Title = "h3",
  active = false,
}: {
  as?: "h2" | "h3";
  /** Whether the Year End Offer is running. */
  active?: boolean;
}) {
  return (
    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {plans.map((plan, i) => (
        <Reveal as="li" key={plan.key} delay={i * 0.08} className="flex">
          <article
            id={plan.key}
            className={`flex w-full flex-col border bg-white p-6 sm:p-8 ${
              i === 0 ? "border-ink border-t-4 border-t-signal" : "border-rule"
            }`}
          >
            {active ? <OfferTag className="mb-4 self-start" /> : null}
            <p className="label-tech text-ink-muted">{plan.audience}</p>
            <Title className="mt-4 font-display text-2xl font-medium tracking-[-0.02em] text-ink">
              {plan.title}
            </Title>
            <p className="mt-3 text-ink-muted">{plan.description}</p>
            <ul className="mt-6 flex-1 border-b border-rule">
              {plan.points.map((point) => (
                <li
                  key={point}
                  className="flex items-baseline gap-3 border-t border-rule py-3 text-[0.95rem] text-ink"
                >
                  <span
                    aria-hidden
                    className="h-px w-3 shrink-0 -translate-y-1 bg-signal"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <WhatsAppLink
              text={
                active
                  ? `${plan.enquiry} I would like the ${offer.name} (${offer.percent}% off).`
                  : plan.enquiry
              }
              className="mt-6"
            >
              Request a Quote
            </WhatsAppLink>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
