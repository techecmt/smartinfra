import { ChevronRight } from "lucide-react";
import { bookingServices, serviceHint } from "@/lib/booking";
import { BookButton } from "@/components/booking/book-button";
import { ServiceIcon } from "@/components/booking/service-icon";

/**
 * Phone-only shortcut list directly under the hero: one tap on a service
 * opens the booking wizard with it already chosen.
 */
export function AirconPicker({ active }: { active: boolean }) {
  return (
    <section
      aria-labelledby="picker-heading"
      className="border-b border-rule bg-paper py-8 md:hidden"
    >
      <div className="container-site">
        <p className="label-tech flex items-center gap-3 text-ink-muted">
          <span aria-hidden className="h-px w-6 bg-signal" />
          Book in four steps
        </p>
        <h2
          id="picker-heading"
          className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-ink"
        >
          What does your aircon need?
        </h2>
        <ul className="mt-5 grid gap-2.5">
          {bookingServices
            .filter((s) => s.group === "aircon")
            .map((s) => (
              <li key={s.id}>
                <BookButton
                  variant="bare"
                  preset={{ service: s.id, source: "aircon_picker" }}
                  className="flex w-full items-center gap-4 rounded-2xl border border-rule bg-white p-3 text-left"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-white">
                    <ServiceIcon id={s.id} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink">
                      {s.label}
                    </span>
                    <span className="block text-sm text-ink-muted">
                      {s.blurb}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium whitespace-nowrap text-ink">
                    {serviceHint(s.id, active)}
                  </span>
                  <ChevronRight
                    className="size-4 shrink-0 text-signal"
                    aria-hidden
                  />
                </BookButton>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
