"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";

type MagneticLinkProps = React.ComponentProps<"a"> & {
  strength?: number;
};

/** An anchor that leans slightly toward the pointer on fine-pointer devices. */
export function MagneticLink({
  strength = 0.25,
  className,
  children,
  ...props
}: MagneticLinkProps) {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;

  const x = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
  });
  const y = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
  });

  const onPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      {...(props as React.ComponentProps<typeof motion.a>)}
      className={className}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.a>
  );
}
