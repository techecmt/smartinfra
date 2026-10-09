import { Plus } from "lucide-react";
import type { Faq } from "@/lib/aircon-seo";

/** Frequently asked questions as native disclosure widgets (no script needed). */
export function FaqSection({ title, faqs }: { title: string; faqs: Faq[] }) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-rule bg-white py-16 sm:py-24"
    >
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label-tech flex items-center gap-3 text-ink-muted">
            <span aria-hidden className="h-px w-6 bg-signal" />
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-5 font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
          >
            {title}
          </h2>
        </div>

        <div className="border-b border-rule lg:col-span-7 lg:col-start-6">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-t border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-ink sm:text-xl">
                  {faq.question}
                </h3>
                <Plus
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-signal transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ink-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
