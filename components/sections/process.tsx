"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { processSteps } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";

const last = processSteps.length - 1;

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [reached, setReached] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setReached(p <= 0 ? -1 : Math.min(last, Math.floor(p * last + 0.15)));
  });

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative bg-paper py-24 sm:py-32"
    >
      <div className="container-site">
        <SectionMarker index="07" label="Approach" meta="Delivery sequence" />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12">
          <SectionHeading
            id="approach-heading"
            lines={["A simple,", "structured approach."]}
            className="lg:col-span-9 lg:col-start-4"
          />
          <Reveal className="lg:col-span-3 lg:row-start-1 lg:pt-4">
            <p className="max-w-xs border-l border-signal pl-4 text-sm leading-relaxed text-ink-muted">
              Five stages, applied at the scale of the work — from a single
              reinstatement to a multidisciplinary scope.
            </p>
          </Reveal>
        </div>

        <ol
          ref={ref}
          className="relative mt-16 grid grid-cols-1 gap-0 lg:mt-24 lg:grid-cols-5"
        >
          {/* Track: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-ink/15 lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-signal lg:hidden"
            style={{ scaleY: progress }}
          />
          <motion.span
            aria-hidden
            className="absolute top-[5px] right-0 left-0 hidden h-px origin-left bg-signal lg:block"
            style={{ scaleX: progress }}
          />

          {processSteps.map((step, i) => {
            const on = i <= reached;
            return (
              <li
                key={step.no}
                className="relative pb-12 pl-10 last:pb-0 lg:pr-8 lg:pb-0 lg:pl-0"
              >
                <span
                  aria-hidden
                  className={`absolute top-0 left-0 size-[11px] border transition-colors duration-500 ${
                    on ? "border-signal bg-signal" : "border-ink/40 bg-paper"
                  }`}
                />
                <div className="sm:grid sm:grid-cols-[5.5rem_minmax(0,13rem)_1fr] sm:items-baseline sm:gap-x-8 lg:block lg:pt-12">
                  <span
                    aria-hidden
                    className={`font-display text-5xl leading-none font-light tracking-[-0.04em] transition-colors duration-500 lg:text-6xl ${
                      on ? "text-ink" : "text-ink/25"
                    }`}
                  >
                    {step.no}
                  </span>
                  <h3 className="mt-5 font-display sm:mt-0 lg:mt-5 text-xl font-medium tracking-[-0.01em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[16rem] sm:mt-0 sm:max-w-md lg:mt-2 lg:max-w-[16rem] text-[0.95rem] leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
