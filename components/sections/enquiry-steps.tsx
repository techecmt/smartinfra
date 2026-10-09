import { enquirySteps } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-heading";

/** How an enquiry runs, from first message to the visit. */
export function EnquirySteps({ index }: { index: string }) {
  return (
    <section
      aria-labelledby="steps-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        <SectionMarker index={index} label="How it works" meta="WhatsApp" />
        <h2
          id="steps-heading"
          className="mt-10 max-w-3xl font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-ink sm:text-5xl"
        >
          From message to booked visit
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {enquirySteps.map((step, i) => (
            <Reveal as="li" key={step.no} delay={i * 0.08}>
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl leading-none font-light tracking-[-0.04em] text-ink">
                  {step.no}
                </span>
                <span aria-hidden className="h-px flex-1 bg-rule" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-ink-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
