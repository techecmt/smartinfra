"use client";

import { CalendarCheck } from "lucide-react";
import { buttonBase } from "@/components/ui/buttons";
import { useBooking, type BookingPreset } from "./booking-context";

const tones = {
  solid: `${buttonBase} bg-ink font-semibold text-white hover:bg-ink-deep`,
  // For dark or photographic backgrounds.
  light: `${buttonBase} bg-white font-semibold text-ink hover:bg-paper`,
  // No styling of its own: the caller supplies the classes.
  bare: "",
};

/** Opens the booking wizard, optionally with a service already chosen. */
export function BookButton({
  preset,
  variant = "solid",
  className = "",
  children,
}: {
  preset?: BookingPreset;
  variant?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open(preset)}
      className={`cursor-pointer ${tones[variant]} ${className}`}
    >
      {variant === "bare" ? null : (
        <CalendarCheck className="size-5" aria-hidden strokeWidth={1.75} />
      )}
      {children}
    </button>
  );
}
