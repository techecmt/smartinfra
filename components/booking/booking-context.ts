"use client";

import { createContext, useContext } from "react";
import type { BookingServiceId } from "@/lib/booking";

/** What the wizard starts with, and where it was opened from (for tracking). */
export type BookingPreset = {
  service?: BookingServiceId;
  /** Index into the servicing unit types. */
  unitType?: number;
  source?: string;
};

type BookingContextValue = {
  /** Opens the booking wizard as a sheet (mobile) or dialog (desktop). */
  open: (preset?: BookingPreset) => void;
  /** Whether the Year End Offer is running. */
  offerActive: boolean;
};

export const BookingContext = createContext<BookingContextValue>({
  open: () => {},
  offerActive: false,
});

export function useBooking() {
  return useContext(BookingContext);
}
