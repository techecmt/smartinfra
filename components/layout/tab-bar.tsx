"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, House, Snowflake, Zap } from "lucide-react";
import { defaultWhatsappText, whatsappHref } from "@/lib/content";
import { useBooking } from "@/components/booking/booking-context";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const tab =
  "relative flex h-16 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium";

const links = [
  { href: "/", label: "Home", icon: House },
  { href: "/aircon", label: "Aircon", icon: Snowflake },
  null, // Book sits in the middle.
  { href: "/electrical", label: "Electrical", icon: Zap },
] as const;

/** App-style bottom navigation for phones; hidden from tablet width up. */
export function TabBar() {
  const pathname = usePathname();
  const { open } = useBooking();
  const service = pathname === "/electrical" ? "electrical" : undefined;

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {links.map((item) =>
          item ? (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`${tab} ${pathname === item.href ? "text-ink" : "text-ink-muted"}`}
              >
                {pathname === item.href ? (
                  <span
                    aria-hidden
                    className="absolute top-0 h-0.5 w-8 bg-signal"
                  />
                ) : null}
                <item.icon className="size-6" aria-hidden strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          ) : (
            <li key="book">
              <button
                type="button"
                onClick={() => open({ service, source: "tab_bar" })}
                className={`${tab} w-full cursor-pointer justify-end pb-2 font-semibold text-ink`}
              >
                <span className="absolute -top-4 grid size-14 place-items-center rounded-2xl bg-ink text-white shadow-[0_8px_20px_-6px_rgb(37_38_56/0.6)] ring-4 ring-white">
                  <CalendarCheck
                    className="size-6"
                    aria-hidden
                    strokeWidth={1.5}
                  />
                  <span
                    aria-hidden
                    className="absolute top-2 right-2 size-1.5 rounded-full bg-signal"
                  />
                </span>
                Book
              </button>
            </li>
          ),
        )}
        <li>
          <a
            href={whatsappHref(defaultWhatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${tab} text-ink-muted`}
          >
            <WhatsAppIcon className="size-6 text-whatsapp-deep" />
            Chat
            <span className="sr-only"> on WhatsApp (opens WhatsApp)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
