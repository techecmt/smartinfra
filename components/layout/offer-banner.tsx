import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isOfferActive, offer } from "@/lib/rates";

/** Site-wide strip announcing the running offer; gone once it has ended. */
export function OfferBanner() {
  if (!isOfferActive()) return null;
  return (
    <aside aria-label={offer.name} data-surface="dark" className="bg-ink">
      <Link
        href="/aircon#rates"
        className="group container-site flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-sm text-white"
      >
        <span aria-hidden className="size-2 bg-signal" />
        <span>
          <strong className="font-semibold">{offer.name}:</strong>{" "}
          {offer.percent}% off all aircon rates until {offer.endLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4">
          View rates
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </aside>
  );
}
