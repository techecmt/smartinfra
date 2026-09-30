"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/content";
import { easeArchitect } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";
import { MagneticLink } from "@/components/ui/magnetic-link";

// Generic high-rise cluster, not a depiction of any specific building.
const skyline = [
  { x: 0, w: 70, h: 90 },
  { x: 76, w: 48, h: 150 },
  { x: 130, w: 90, h: 110 },
  { x: 228, w: 56, h: 210, crown: true },
  { x: 290, w: 80, h: 140 },
  { x: 380, w: 44, h: 250 },
  { x: 430, w: 110, h: 120 },
  { x: 548, w: 62, h: 190, crown: true },
  { x: 616, w: 70, h: 280 },
  { x: 692, w: 54, h: 230 },
  { x: 752, w: 120, h: 100 },
  { x: 880, w: 58, h: 200 },
  { x: 944, w: 48, h: 260, crown: true },
  { x: 998, w: 96, h: 150 },
  { x: 1100, w: 60, h: 220 },
  { x: 1166, w: 84, h: 130 },
  { x: 1258, w: 50, h: 180, crown: true },
  { x: 1314, w: 126, h: 110 },
];

export function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const skylineY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, 0]);
  const linesY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -40, 0]);

  return (
    <section
      id="contact"
      ref={ref}
      data-surface="dark"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-ink pt-24 text-white sm:pt-32"
    >
      <div aria-hidden className="grid-blueprint-dark absolute inset-0 -z-20" />

      {/* Red architectural construction lines */}
      <motion.svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
        style={{ y: linesY }}
      >
        <motion.path
          d="M0 610 H1440"
          stroke="var(--color-signal)"
          strokeOpacity={0.55}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: easeArchitect }}
        />
        <motion.path
          d="M1120 0 V900 M1080 610 L1440 250"
          stroke="var(--color-signal)"
          strokeOpacity={0.3}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 0.4, ease: easeArchitect }}
        />
      </motion.svg>

      <div className="container-site">
        <SectionMarker
          index="08"
          label="Contact"
          meta="Bukit Batok / SG"
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <SectionHeading
              id="contact-heading"
              tone="dark"
              size="xl"
              lines={["Let’s build", "what’s next."]}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
                Have a construction, renovation, engineering, inspection or
                consultancy requirement in Singapore?
              </p>
            </Reveal>

            <Reveal
              delay={0.2}
              className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
            >
              <MagneticLink
                href={company.emailHref}
                className="group inline-flex items-center gap-4 bg-white py-4 pr-4 pl-6 text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper"
              >
                Talk to Smart Infratech
                <span className="grid size-7 place-items-center bg-signal text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </MagneticLink>
              <a
                href={company.phoneHref}
                className="group inline-flex items-center gap-3 font-display text-2xl font-medium tracking-tight sm:text-3xl"
              >
                <Phone className="size-5 text-signal" aria-hidden />
                <span className="relative">
                  {company.phone}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100"
                  />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="lg:col-span-4">
            <dl className="border-t border-white/15 lg:mt-3">
              <div className="border-b border-white/15 py-5">
                <dt className="label-tech flex items-center gap-2 text-white/60">
                  <Mail className="size-3.5" aria-hidden /> Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={company.emailHref}
                    className="inline-block py-1 text-lg break-all hover:text-signal"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div className="border-b border-white/15 py-5">
                <dt className="label-tech flex items-center gap-2 text-white/60">
                  <Phone className="size-3.5" aria-hidden /> Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href={company.phoneHref}
                    className="inline-block py-1 text-lg hover:text-signal"
                  >
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div className="border-b border-white/15 py-5">
                <dt className="label-tech flex items-center gap-2 text-white/60">
                  <MapPin className="size-3.5" aria-hidden /> Office
                </dt>
                <dd className="mt-2 leading-relaxed text-white/85">
                  <address className="not-italic">
                    {company.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Skyline silhouette */}
      <motion.svg
        aria-hidden
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax slice"
        className="mt-20 block h-[180px] w-full sm:h-[240px] lg:h-[300px]"
        fill="none"
        style={{ y: skylineY }}
      >
        {skyline.map((b) => (
          <g key={b.x}>
            <rect
              x={b.x}
              y={300 - b.h}
              width={b.w}
              height={b.h}
              fill="rgba(255,255,255,0.035)"
              stroke="rgba(255,255,255,0.14)"
            />
            {b.crown ? (
              <path
                d={`M${b.x + b.w * 0.2} ${300 - b.h} L${b.x + b.w / 2} ${300 - b.h - 24} L${b.x + b.w * 0.8} ${300 - b.h}`}
                stroke="rgba(255,255,255,0.18)"
              />
            ) : null}
            {Array.from({ length: Math.floor(b.h / 22) }, (_, i) => (
              <line
                key={i}
                x1={b.x + 6}
                x2={b.x + b.w - 6}
                y1={300 - b.h + 14 + i * 22}
                y2={300 - b.h + 14 + i * 22}
                stroke="rgba(255,255,255,0.05)"
              />
            ))}
          </g>
        ))}
        <circle cx={651} cy={20} r={3} fill="var(--color-signal)" />
      </motion.svg>
    </section>
  );
}
