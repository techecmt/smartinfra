import type { Variants } from "motion/react";

export const easeArchitect = [0.22, 1, 0.36, 1] as const;

/** Line-drawing variant; pass the delay (s) through `custom`. */
export const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.4, ease: easeArchitect },
      opacity: { delay, duration: 0.2 },
    },
  }),
};

/** Opacity-only variant for dense line groups and labels. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { delay, duration: 1, ease: easeArchitect },
  }),
};
