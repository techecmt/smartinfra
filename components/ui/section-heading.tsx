"use client";

import { motion } from "motion/react";
import { easeArchitect } from "@/lib/motion";
import { DrawLine } from "./reveal";

type SectionMarkerProps = {
  index: string;
  label: string;
  meta?: string;
  tone?: "light" | "dark";
};

/**
 * The recurring section header rule: index / label on the left, a meta label
 * on the right, with a red tick where the line starts.
 */
export function SectionMarker({
  index,
  label,
  meta,
  tone = "light",
}: SectionMarkerProps) {
  const text = tone === "dark" ? "text-white/60" : "text-ink-muted";
  return (
    <div className="relative">
      <div
        className={`label-tech flex items-center justify-between gap-6 pb-4 ${text}`}
      >
        <span className="flex items-center gap-3">
          <span className={tone === "dark" ? "text-white" : "text-ink"}>
            {index}
          </span>
          <span aria-hidden className="h-px w-6 bg-signal" />
          <span>{label}</span>
        </span>
        {meta ? <span className="hidden sm:block">{meta}</span> : null}
      </div>
      <DrawLine tone={tone === "dark" ? "light" : "ink"} />
    </div>
  );
}

type SectionHeadingProps = {
  id?: string;
  lines: string[];
  tone?: "light" | "dark";
  className?: string;
  size?: "md" | "lg" | "xl";
};

const lineVariants = {
  hidden: { y: "105%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.08 * i, ease: easeArchitect },
  }),
};

/**
 * H2 whose lines rise out of a clipping mask, one after another.
 * The in-view trigger sits on the (unclipped) heading: a line that wraps is
 * fully hidden by its own mask, so it can never observe itself entering view.
 */
export function SectionHeading({
  id,
  lines,
  tone = "light",
  className = "",
  size = "lg",
}: SectionHeadingProps) {
  const sizes = {
    md: "text-[1.9rem] sm:text-5xl lg:text-[3.5rem]",
    lg: "text-[2.125rem] sm:text-5xl lg:text-6xl",
    xl: "text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]",
  }[size];
  return (
    <motion.h2
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      className={`font-display font-medium leading-[1.02] tracking-[-0.035em] ${sizes} ${
        tone === "dark" ? "text-white" : "text-ink"
      } ${className}`}
    >
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={lineVariants} custom={i}>
            {line}
          </motion.span>{" "}
        </span>
      ))}
    </motion.h2>
  );
}
