"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { company } from "@/lib/content";
import { easeArchitect } from "@/lib/motion";
import { HeroArchitecture } from "@/components/visuals/hero-architecture";
import { MagneticLink } from "@/components/ui/magnetic-link";

const rise = (delay: number) => ({
  initial: { y: "105%" },
  animate: { y: "0%" },
  transition: { duration: 1.1, delay, ease: easeArchitect },
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: easeArchitect },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white pt-20 lg:pt-24"
    >
      <motion.div
        aria-hidden
        className="grid-blueprint absolute inset-x-0 -top-20 -bottom-20 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_65%_45%,black_30%,transparent_85%)]"
        style={{ y: gridY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: easeArchitect }}
      />

      <div className="container-site relative grid flex-1 grid-cols-1 items-center gap-y-6 lg:grid-cols-12">
        <motion.div
          className="relative z-10 pt-10 pb-4 lg:col-span-7 lg:py-24"
          style={{ y: textY }}
        >
          <motion.p
            className="label-tech mb-8 flex items-center gap-3 text-ink-muted"
            {...fadeUp(0.15)}
          >
            <span aria-hidden className="h-px w-8 bg-signal" />
            Singapore / Infrastructure
          </motion.p>

          <h1 id="hero-heading" className="font-display text-ink">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block text-[clamp(2.25rem,11.5vw,4.75rem)] lg:text-[clamp(4.5rem,7vw,7rem)] leading-[0.95] font-medium tracking-[-0.045em]"
                {...rise(0.25)}
              >
                Smarter
              </motion.span>{" "}
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block text-[clamp(2.25rem,11.5vw,4.75rem)] lg:text-[clamp(4.5rem,7vw,7rem)] leading-[0.95] font-medium tracking-[-0.045em]"
                {...rise(0.33)}
              >
                infrastructure<span className="text-signal">.</span>
              </motion.span>{" "}
            </span>
            <span className="mt-5 block overflow-hidden">
              <motion.span
                className="block text-[clamp(1.35rem,2.4vw,2.25rem)] leading-tight font-light tracking-[-0.02em] text-ink-muted"
                {...rise(0.5)}
              >
                Built for real-world performance.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-[34rem] text-base leading-relaxed text-ink-muted sm:text-lg"
            {...fadeUp(0.7)}
          >
            Integrated construction, engineering, consultancy and facility
            solutions for commercial and private environments across Singapore.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            {...fadeUp(0.85)}
          >
            <MagneticLink
              href="#capabilities"
              className="group inline-flex items-center gap-4 bg-ink py-4 pr-4 pl-6 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink-deep"
            >
              Explore Our Capabilities
              <span className="grid size-7 place-items-center bg-signal">
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </MagneticLink>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 py-2 text-[0.95rem] font-medium text-ink"
            >
              Talk to Smart Infratech
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink/25 transition-colors duration-300 group-hover:bg-signal"
              />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative -mx-4 h-[340px] sm:mx-0 sm:h-[440px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]"
          style={{ y: visualY }}
        >
          <HeroArchitecture className="absolute inset-0 h-full w-full lg:top-auto lg:bottom-[6%] lg:h-[86%]" />
        </motion.div>
      </div>

      {/* Datum line: the red accent that travels across the hero on load */}
      <div className="relative">
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 block h-px origin-left bg-signal"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 1, ease: easeArchitect }}
        />
        <motion.div
          className="container-site label-tech grid grid-cols-2 gap-4 py-5 text-ink-muted sm:grid-cols-3"
          {...fadeUp(1.2)}
        >
          <span>{company.coordinates}</span>
          <span className="hidden text-center sm:block">
            Commercial · Private · Singapore
          </span>
          <a
            href="#about"
            className="flex items-center justify-end gap-2 text-ink hover:text-signal"
          >
            Scroll
            <ArrowDown className="size-3.5" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
