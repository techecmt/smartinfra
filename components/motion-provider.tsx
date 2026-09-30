"use client";

import { MotionConfig, MotionGlobalConfig } from "motion/react";

// With "reduce motion" on, every Motion animation (line drawing, reveals,
// springs) resolves instantly to its final state. Set at module load so it
// applies before any component mounts; scroll-linked values still track.
if (typeof window !== "undefined") {
  MotionGlobalConfig.skipAnimations = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

/** Honours the OS "reduce motion" setting for every motion component. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
