import { formatPrice, offer, offerPrice } from "@/lib/rates";

/**
 * A price that shows the offer price next to the crossed-out regular price
 * while the offer runs, and just the regular price otherwise.
 */
export function Price({
  amount,
  active,
  className = "",
}: {
  amount: number;
  active: boolean;
  className?: string;
}) {
  if (!active) return <span className={className}>{formatPrice(amount)}</span>;
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="sr-only">{offer.name} price </span>
      <span>{formatPrice(offerPrice(amount))}</span>
      <s className="text-[max(0.8125rem,0.45em)] font-normal opacity-70">
        <span className="sr-only">usual price </span>
        {formatPrice(amount)}
      </s>
    </span>
  );
}

/** Small tag marking something as part of the running offer. */
export function OfferTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`label-tech inline-flex items-center gap-2 bg-ink px-2.5 py-1 text-white ${className}`}
    >
      <span aria-hidden className="size-1.5 bg-signal" />
      {offer.name} · {offer.percent}% off
    </span>
  );
}
