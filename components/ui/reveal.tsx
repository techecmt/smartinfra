"use client";

import { motion } from "motion/react";
import { easeArchitect } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p";
};

/** Subtle upward reveal when the element enters the viewport (once). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: easeArchitect }}
    >
      {children}
    </Component>
  );
}

/** A thin horizontal rule that draws itself from the left. */
export function DrawLine({
  className = "",
  delay = 0,
  tone = "ink",
}: {
  className?: string;
  delay?: number;
  tone?: "ink" | "signal" | "light";
}) {
  const color =
    tone === "signal"
      ? "bg-signal"
      : tone === "light"
        ? "bg-white/15"
        : "bg-ink/12";
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left ${color} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, delay, ease: easeArchitect }}
    />
  );
}
