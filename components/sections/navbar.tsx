"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { company, navItems } from "@/lib/content";
import { easeArchitect } from "@/lib/motion";
import { Logo } from "@/components/ui/logo";
import { MagneticLink } from "@/components/ui/magnetic-link";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: easeArchitect }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? "border-b border-rule bg-white"
            : "border-b border-transparent bg-white/55 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ease-(--ease-architect) ${
            scrolled ? "h-[4.5rem]" : "h-20 lg:h-24"
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
            aria-label="Smart Infratech — back to top"
          >
            <Logo
              priority
              className={`w-auto transition-[height] duration-500 ${scrolled ? "h-14" : "h-16 lg:h-20"}`}
            />
            <span className="label-tech hidden border-l border-rule pl-4 leading-[1.35] text-ink-muted sm:block">
              Pte. Ltd.
              <br />
              Singapore
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative block px-4 py-2 text-[0.9rem] text-ink"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute right-4 bottom-1 left-4 h-px origin-left bg-signal transition-transform duration-500 ease-(--ease-architect) ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <MagneticLink
              href="#contact"
              className="group hidden items-center gap-3 bg-ink py-3 pr-3 pl-5 text-sm font-medium text-white transition-colors hover:bg-ink-deep sm:inline-flex"
            >
              Talk to Us
              <span className="grid size-6 place-items-center bg-signal transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight
                  className="size-3.5"
                  aria-hidden
                  strokeWidth={2}
                />
              </span>
            </MagneticLink>

            <button
              type="button"
              className="relative grid size-11 place-items-center border border-rule bg-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-ink transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px bg-ink transition-all duration-300 ${
                    open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Page scroll progress: the thin red line that runs through the site. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-signal"
          style={{ scaleX: progress }}
        />
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-x-0 top-[var(--menu-top)] bottom-0 z-40 flex flex-col overflow-y-auto bg-white lg:hidden"
            style={{ ["--menu-top" as string]: scrolled ? "4.5rem" : "5rem" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: easeArchitect }}
          >
            <div
              className="grid-blueprint pointer-events-none absolute inset-0 opacity-60"
              aria-hidden
            />
            <ul className="container-site relative flex flex-1 flex-col justify-center gap-1 py-10">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.06,
                    ease: easeArchitect,
                  }}
                  className="border-b border-rule"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 font-display text-4xl font-medium tracking-tight text-ink"
                  >
                    <span
                      aria-hidden
                      className="h-px w-5 self-center bg-signal"
                    />
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="container-site relative flex flex-col gap-3 pb-10 text-sm text-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href={company.phoneHref} className="flex items-center gap-3">
                <Phone className="size-4 text-signal" aria-hidden />{" "}
                {company.phone}
              </a>
              <a href={company.emailHref} className="flex items-center gap-3">
                <Mail className="size-4 text-signal" aria-hidden />{" "}
                {company.email}
              </a>
              <p className="label-tech mt-4 text-ink-muted">Bukit Batok / SG</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/**
 * Tracks which page section sits in the upper-middle of the viewport.
 * All sections are observed so that sections without a nav entry
 * (renovation, systems, why) clear the highlight instead of leaving the
 * previous item lit.
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}
