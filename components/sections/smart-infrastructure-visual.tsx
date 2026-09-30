"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { systemLayers } from "@/lib/content";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";
import { SystemsDiagram } from "@/components/visuals/systems-diagram";

const count = systemLayers.length;
// Scroll positions (0–1 through the pinned track) at which each layer appears.
const thresholds = systemLayers.map((_, i) => 0.04 + (i / count) * 0.8);

export function SmartInfrastructureVisual() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let next = -1;
    thresholds.forEach((t, i) => {
      if (p >= t) next = i;
    });
    setActive(next);
  });

  const current = systemLayers[Math.max(active, 0)];

  return (
    <section
      id="systems"
      aria-labelledby="systems-heading"
      className="relative bg-paper"
    >
      <div ref={trackRef} className="relative h-[360vh] lg:h-[400vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-24 pb-6 lg:pt-28 lg:pb-10">
          <div aria-hidden className="grid-blueprint absolute inset-0" />

          <div className="container-site relative flex min-h-0 flex-1 flex-col">
            <SectionMarker
              index="05"
              label="Smart infrastructure"
              meta="System diagram / SG"
            />

            <div className="grid min-h-0 flex-1 grid-cols-1 content-center gap-6 pt-6 lg:grid-cols-12 lg:content-stretch lg:gap-10 lg:pt-10">
              <div className="flex min-h-0 flex-col lg:col-span-8">
                <SectionHeading
                  id="systems-heading"
                  lines={["Built around", "smarter systems."]}
                  size="md"
                />
                <div className="relative mt-6 aspect-[760/560] w-full max-h-[48svh] lg:mt-6 lg:aspect-auto lg:max-h-none lg:min-h-0 lg:flex-1">
                  <SystemsDiagram
                    progress={scrollYProgress}
                    thresholds={thresholds}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>

              {/* Desktop: full layer stack */}
              <div className="sr-only flex-col justify-center lg:not-sr-only lg:col-span-4 lg:flex">
                <p className="mb-6 max-w-sm text-ink-muted">
                  &ldquo;Smart&rdquo; here means coordinated: each discipline
                  planned around the layers it depends on.
                </p>
                <ol className="border-t border-ink/15">
                  {systemLayers.map((layer, i) => {
                    const reached = i <= active;
                    const isActive = i === active;
                    return (
                      <li key={layer.key} className="border-b border-ink/15">
                        <div className="flex items-center gap-4 py-3.5">
                          <span
                            aria-hidden
                            className={`size-2 shrink-0 border transition-colors duration-500 ${
                              reached
                                ? "border-signal bg-signal"
                                : "border-ink/40"
                            }`}
                          />
                          <span className="label-tech w-6 text-ink-muted">
                            L{i + 1}
                          </span>
                          <span
                            className={`font-display text-xl font-medium tracking-tight transition-colors duration-500 ${
                              reached ? "text-ink" : "text-ink-muted"
                            }`}
                          >
                            {layer.title}
                          </span>
                        </div>
                        <div
                          className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-architect) ${
                            isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <p className="overflow-hidden pl-[3.25rem] text-sm leading-relaxed text-ink-muted">
                            <span className="block pb-4">
                              {layer.description}
                            </span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Mobile / tablet: compact indicator */}
              <div className="lg:hidden" aria-hidden>
                <div className="flex gap-1.5">
                  {systemLayers.map((layer, i) => (
                    <span
                      key={layer.key}
                      className={`h-0.5 flex-1 transition-colors duration-500 ${
                        i <= active ? "bg-signal" : "bg-ink/15"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 flex items-baseline gap-3">
                  <span className="label-tech text-ink-muted">
                    L{Math.max(active, 0) + 1}
                  </span>
                  <span className="font-display text-xl font-medium">
                    {current.title}
                  </span>
                </p>
                <p className="mt-1 min-h-[3lh] text-sm leading-relaxed text-ink-muted">
                  {current.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
