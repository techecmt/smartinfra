import Link from "next/link";
import { company, navItems } from "@/lib/content";
import { Logo } from "@/components/ui/logo";
import { CookieSettingsButton } from "@/components/layout/cookie-consent";

export function Footer() {
  return (
    <footer className="relative bg-white text-ink">
      <div aria-hidden className="h-px w-full bg-signal" />
      {/* Bottom padding keeps the last line clear of the floating WhatsApp button. */}
      <div className="container-site pt-16 pb-24 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="h-24 w-auto" />
            <p className="mt-6 font-display text-lg font-medium tracking-tight">
              {company.name}
            </p>
            <p className="mt-1 text-ink-muted">{company.descriptor}</p>
            <p className="label-tech mt-3 text-ink-muted">
              UEN No. {company.uen}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label-tech text-ink-muted">Office</h2>
            <address className="mt-4 leading-relaxed not-italic">
              {company.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-ink-muted">{company.hours}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label-tech text-ink-muted">Contact</h2>
            <ul className="mt-4">
              <li>
                <a
                  href={company.phoneHref}
                  className="inline-block py-1.5 hover:underline"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="inline-block py-1.5 break-all hover:underline"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={company.websiteHref}
                  className="inline-block py-1.5 hover:underline"
                >
                  {company.website}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="label-tech text-ink-muted">Navigate</h2>
            <ul className="mt-4">
              <li>
                <Link href="/" className="inline-block py-1.5 hover:underline">
                  Home
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="inline-block cursor-pointer py-1.5 hover:underline" />
              </li>
            </ul>
          </nav>
        </div>

        <div className="label-tech mt-16 flex flex-col gap-2 border-t border-rule pt-6 text-ink-muted sm:flex-row sm:justify-between">
          <p>© 2026 Smart Infratech Pte. Ltd. All rights reserved.</p>
          <p>Photographs are illustrative</p>
        </div>
      </div>
    </footer>
  );
}
