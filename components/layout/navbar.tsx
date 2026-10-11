"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  CalendarCheck,
  House,
  Mail,
  Phone,
  Snowflake,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  company,
  defaultWhatsappText,
  navItems,
  whatsappHref,
} from "@/lib/content";
import { easeArchitect } from "@/lib/motion";
import { Logo } from "@/components/ui/logo";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const mobileItems = [{ href: "/", label: "Home" }, ...navItems];

const navIcons: Record<string, LucideIcon> = {
  "/": House,
  "/about": Building2,
  "/aircon": Snowflake,
  "/electrical": Zap,
  "/maintenance-plans": CalendarCheck,
  "/contact": Phone,
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rule bg-white">
        <nav
          aria-label="Primary"
          className="container-site flex h-14 items-center justify-between gap-6 md:h-[4.5rem]"
        >
          <Link
            href="/"
            className="flex items-center gap-4"
            onClick={() => setOpen(false)}
            aria-label="Smart Infratech — home"
          >
            <Logo priority className="h-11 w-auto md:h-14" />
            <span className="label-tech hidden border-l border-rule pl-4 leading-[1.35] text-ink-muted xl:block">
              Air Conditioning &amp;
              <br />
              Electrical Engineering
            </span>
          </Link>

          <ul className="hidden items-center lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = navIcons[item.href];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative flex items-center gap-1.5 px-3 py-2 text-[0.9rem] whitespace-nowrap text-ink"
                  >
                    {Icon ? (
                      <Icon
                        aria-hidden
                        strokeWidth={1.75}
                        className={`size-4 shrink-0 transition-colors ${
                          isActive
                            ? "text-signal"
                            : "text-ink/45 group-hover:text-signal"
                        }`}
                      />
                    ) : null}
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute right-3 bottom-1 left-3 h-px origin-left bg-signal transition-transform duration-300 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={company.phoneHref}
              aria-label={`Call ${company.phone}`}
              className="grid size-11 place-items-center rounded-xl border border-rule bg-white text-ink md:hidden"
            >
              <Phone className="size-5" aria-hidden strokeWidth={1.5} />
            </a>
            <a
              href={whatsappHref(defaultWhatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center gap-2.5 bg-whatsapp px-4 text-sm font-semibold whitespace-nowrap text-ink-deep transition-colors hover:bg-whatsapp-deep sm:inline-flex"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp Us
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>

            <button
              type="button"
              className="relative grid size-11 place-items-center border border-rule bg-white max-md:rounded-xl lg:hidden"
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
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-x-0 top-14 bottom-0 z-[45] md:top-[4.5rem] flex flex-col overflow-y-auto bg-white lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeArchitect }}
          >
            <ul className="container-site flex flex-1 flex-col justify-center py-8">
              {mobileItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = navIcons[item.href];
                return (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 py-3.5 font-display text-2xl font-medium tracking-tight text-ink"
                    >
                      {Icon ? (
                        <Icon
                          aria-hidden
                          strokeWidth={1.75}
                          className={`size-6 shrink-0 ${
                            isActive ? "text-signal" : "text-ink/40"
                          }`}
                        />
                      ) : null}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="container-site flex flex-col gap-3 pb-10 text-ink">
              <a
                href={whatsappHref(defaultWhatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-whatsapp px-6 font-medium text-ink-deep max-md:rounded-xl"
              >
                <WhatsAppIcon className="size-6" />
                WhatsApp Us
              </a>
              <a
                href={company.phoneHref}
                className="mt-3 flex items-center gap-3 py-1"
              >
                <Phone className="size-4 text-signal" aria-hidden />
                {company.phone}
              </a>
              <a
                href={company.emailHref}
                className="flex items-center gap-3 py-1"
              >
                <Mail className="size-4 text-signal" aria-hidden />
                {company.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
