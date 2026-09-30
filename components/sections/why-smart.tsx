"use client";

import { motion } from "motion/react";
import { company, principles } from "@/lib/content";
import { drawVariants } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, SectionMarker } from "@/components/ui/section-heading";

const ink = "var(--color-ink)";
const signal = "var(--color-signal)";

// Small line glyphs, one per principle — engineering marks rather than icons.
const glyphs: React.ReactNode[] = [
  <g key="g1">
    <motion.path
      d="M8 8 H56 V56 H8 Z"
      stroke={ink}
      strokeOpacity={0.5}
      variants={drawVariants}
      custom={0}
    />
    <motion.path
      d="M32 2 V62 M2 32 H62"
      stroke={ink}
      strokeOpacity={0.3}
      variants={drawVariants}
      custom={0.3}
    />
    <motion.circle
      cx={32}
      cy={32}
      r={9}
      stroke={signal}
      variants={drawVariants}
      custom={0.6}
    />
  </g>,
  <g key="g2">
    <motion.path
      d="M6 22 H34 V50 H6 Z"
      stroke={ink}
      strokeOpacity={0.5}
      variants={drawVariants}
      custom={0}
    />
    <motion.path
      d="M18 12 H46 V40 H18 Z"
      stroke={ink}
      strokeOpacity={0.5}
      variants={drawVariants}
      custom={0.2}
    />
    <motion.path
      d="M30 2 H58 V30 H30 Z"
      stroke={signal}
      variants={drawVariants}
      custom={0.4}
    />
  </g>,
  <g key="g3">
    <motion.path
      d="M4 56 H60 M4 56 V4"
      stroke={ink}
      strokeOpacity={0.4}
      variants={drawVariants}
      custom={0}
    />
    <motion.path
      d="M6 50 C 22 48, 26 20, 56 12"
      stroke={signal}
      variants={drawVariants}
      custom={0.3}
    />
    <motion.path
      d="M48 8 L56 12 L50 19"
      stroke={signal}
      variants={drawVariants}
      custom={0.9}
    />
  </g>,
  <g key="g4">
    <motion.circle
      cx={32}
      cy={28}
      r={18}
      stroke={ink}
      strokeOpacity={0.5}
      variants={drawVariants}
      custom={0}
    />
    <motion.path
      d="M32 4 V52 M8 28 H56"
      stroke={ink}
      strokeOpacity={0.3}
      variants={drawVariants}
      custom={0.3}
    />
    <motion.path
      d="M32 28 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0"
      stroke={signal}
      variants={drawVariants}
      custom={0.6}
    />
    <motion.path
      d="M20 60 H44"
      stroke={signal}
      variants={drawVariants}
      custom={0.8}
    />
  </g>,
];

export function WhySmart() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative bg-white py-24 sm:py-32"
    >
      <div className="container-site">
        <SectionMarker index="06" label="Why us" meta="Principles" />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="why-heading"
                lines={["Why Smart", "Infratech"]}
                size="xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-sm text-lg leading-relaxed text-ink-muted">
                  Structured delivery, technical coordination and practical
                  execution — guided by a simple standard:
                </p>
                <p className="mt-6 border-l border-signal pl-5 font-display text-xl font-medium tracking-tight text-ink">
                  {company.tagline}
                  <br />
                  Expertise solutions.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:col-span-7">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.no}
                delay={(i % 2) * 0.08}
                className="flex flex-col bg-white p-6 sm:p-8 lg:p-10"
              >
                <motion.svg
                  viewBox="0 0 64 64"
                  fill="none"
                  className="size-14"
                  aria-hidden
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {glyphs[i]}
                </motion.svg>
                <span className="label-tech mt-10 text-ink-muted">{p.no}</span>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
