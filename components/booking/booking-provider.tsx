"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easeArchitect } from "@/lib/motion";
import { track } from "@/lib/track";
import { BookingContext, type BookingPreset } from "./booking-context";
import { BookingFlow } from "./booking-flow";

type Request = { preset: BookingPreset; desktop: boolean; key: number };

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Provides `useBooking()` to the whole site and renders the booking wizard:
 * a bottom sheet on phones, a centred dialog from tablet width up.
 */
export function BookingProvider({
  offerActive,
  children,
}: {
  offerActive: boolean;
  children: React.ReactNode;
}) {
  const [request, setRequest] = useState<Request | null>(null);

  const open = useCallback((preset: BookingPreset = {}) => {
    track("booking_open", {
      booking_source: preset.source ?? "unknown",
      booking_service: preset.service,
    });
    setRequest((current) => ({
      preset,
      desktop: window.matchMedia("(min-width: 48rem)").matches,
      key: (current?.key ?? 0) + 1,
    }));
  }, []);

  const close = useCallback(() => setRequest(null), []);
  const value = useMemo(() => ({ open, offerActive }), [open, offerActive]);

  return (
    <BookingContext value={value}>
      {children}
      <AnimatePresence>
        {request ? (
          <BookingSheet key={request.key} request={request} onClose={close} />
        ) : null}
      </AnimatePresence>
    </BookingContext>
  );
}

function BookingSheet({
  request,
  onClose,
}: {
  request: Request;
  onClose: () => void;
}) {
  const headingId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Modal behaviour: lock page scroll, keep Tab inside the panel, close on
  // Escape, and hand focus back to whatever opened the wizard.
  useEffect(() => {
    const panel = panelRef.current;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(focusable));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  const hidden = request.desktop ? { opacity: 0, y: 16 } : { y: "100%" };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <motion.div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-ink-deep/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        // Focused by script only, so it takes no focus ring.
        style={{ outline: "none" }}
        className="relative flex h-[90dvh] w-full flex-col overflow-hidden bg-white max-md:rounded-t-3xl md:h-auto md:max-h-full md:w-[38rem] md:border-t-4 md:border-signal"
        initial={hidden}
        animate={{ opacity: 1, y: 0 }}
        exit={hidden}
        transition={{ duration: 0.4, ease: easeArchitect }}
      >
        <span
          aria-hidden
          className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-ink/15 md:hidden"
        />
        <BookingFlow
          variant="sheet"
          headingId={headingId}
          preset={request.preset}
          onClose={onClose}
        />
      </motion.div>
    </div>
  );
}
