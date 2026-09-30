"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Desktop-only cursor companion: a thin ring that trails the native pointer
 * and widens over interactive elements. The native cursor stays visible.
 */
export function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useReducedMotion();
  if (!finePointer || reduce) return null;
  return <CursorRing />;
}

function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor]")));
      setOnDark(Boolean(target?.closest("[data-surface='dark']")));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border"
        animate={{
          width: active ? 44 : 22,
          height: active ? 44 : 22,
          opacity: visible ? 1 : 0,
          borderColor: active
            ? "rgba(255,23,23,0.9)"
            : onDark
              ? "rgba(255,255,255,0.45)"
              : "rgba(37,38,56,0.35)",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      />
    </motion.div>
  );
}
