"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type MotionValue,
} from "motion/react";
import { renovationItems } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";

const total = renovationItems.length;
const pad = (n: number) => String(n).padStart(2, "0");

export function Renovation() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(p * total))));
  });

  return (
    <section
      id="renovation"
      data-surface="dark"
      aria-labelledby="renovation-heading"
      className="relative isolate bg-ink py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="grid-blueprint-dark absolute inset-0 -z-10 opacity-70"
      />

      <div className="container-site">
        <SectionMarker
          index="04"
          label="Commercial & private renovation"
          meta="Existing spaces"
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="renovation-heading"
                tone="dark"
                lines={["Transforming", "existing spaces."]}
              />
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">
                  From targeted reinstatement and repair works to complete
                  commercial and private refurbishment, our multidisciplinary
                  capabilities help bring existing spaces up to new operational
                  and visual standards.
                </p>
              </Reveal>
              <div className="mt-12 hidden lg:block">
                <ScopeRuler progress={progress} active={active} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="sticky top-[4.5rem] z-10 -mx-4 bg-ink/95 px-4 py-4 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:hidden">
              <ScopeRuler progress={progress} active={active} />
            </div>

            <ol
              ref={listRef}
              aria-label="Renovation and redecoration scope"
              className="border-t border-white/10"
            >
              {renovationItems.map((item, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <li
                    key={item.label}
                    className="relative flex items-baseline gap-5 border-b border-white/10 py-5 sm:gap-8 sm:py-6"
                  >
                    <span
                      aria-hidden
                      className={`label-tech w-10 shrink-0 transition-colors duration-500 ${
                        isActive ? "text-signal" : "text-white/55"
                      }`}
                    >
                      R-{pad(i + 1)}
                    </span>
                    <span
                      className={`font-display text-[2rem] leading-none font-medium tracking-[-0.035em] transition-colors duration-500 min-w-0 sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] ${
                        isActive
                          ? "text-white"
                          : isPast
                            ? "text-white/60"
                            : "text-white/40"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`label-tech ml-auto hidden text-right text-white/60 transition-opacity duration-500 sm:block lg:hidden xl:block ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.detail}
                    </span>
                    <span
                      aria-hidden
                      className={`absolute bottom-[-1px] left-0 h-px bg-signal transition-[width] duration-700 ease-(--ease-architect) ${
                        isActive ? "w-24" : "w-0"
                      }`}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Horizontal technical ruler that fills in red as the scope list scrolls. */
function ScopeRuler({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: number;
}) {
  return (
    <div aria-hidden>
      <div className="label-tech mb-3 flex justify-between text-white/60">
        <span>
          Scope <span className="text-white">{pad(active + 1)}</span> /{" "}
          {pad(total)}
        </span>
        <span className="text-white">{renovationItems[active].label}</span>
      </div>
      <div className="relative h-4">
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
        {renovationItems.map((item, i) => (
          <span
            key={item.label}
            className={`absolute bottom-0 w-px transition-colors duration-300 ${
              i <= active ? "bg-signal" : "bg-white/30"
            } ${i % 5 === 0 ? "h-4" : "h-2"}`}
            style={{ left: `${(i / (total - 1)) * 100}%` }}
          />
        ))}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal"
          style={{ scaleX: progress }}
        />
      </div>
    </div>
  );
}
