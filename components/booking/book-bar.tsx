"use client";

import { useEffect, useState } from "react";
import { useBooking, type BookingPreset } from "./booking-context";

/**
 * Sticky booking bar for phones, docked above the tab bar. It appears once
 * the page's own booking buttons (`[data-book-anchor]`) have scrolled out of
 * view, and steps aside again when the inline booking section is reached.
 */
export function BookBar({
  label,
  price,
  preset,
}: {
  label: string;
  price: string;
  preset: BookingPreset;
}) {
  const { open } = useBooking();
  const [pastHero, setPastHero] = useState(false);
  const [atBooking, setAtBooking] = useState(false);

  useEffect(() => {
    const anchor = document.querySelector("[data-book-anchor]");
    const booking = document.getElementById("quote");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === anchor)
          setPastHero(
            !entry.isIntersecting && entry.boundingClientRect.top < 0,
          );
        else
          setAtBooking(
            entry.isIntersecting || entry.boundingClientRect.top < 0,
          );
      }
    });
    if (anchor) observer.observe(anchor);
    if (booking) observer.observe(booking);
    return () => observer.disconnect();
  }, []);

  const shown = pastHero && !atBooking;

  return (
    <aside
      aria-label="Book this service"
      data-surface="dark"
      inert={!shown}
      className={`fixed inset-x-0 bottom-(--tabbar) z-30 border-t-2 border-signal bg-ink text-white transition-[translate,opacity] duration-300 ease-architect md:hidden ${
        shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-4 py-2.5 pr-3 pl-4">
        <p className="min-w-0 flex-1 leading-tight">
          <span className="label-tech block truncate text-white/70">
            {label}
          </span>
          <span className="font-display text-xl font-medium">{price}</span>
        </p>
        <button
          type="button"
          onClick={() => open(preset)}
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white px-5 font-semibold text-ink"
        >
          Book Now
        </button>
      </div>
    </aside>
  );
}
