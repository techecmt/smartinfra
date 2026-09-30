import { company, navItems } from "@/lib/content";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="relative bg-white text-ink">
      <div aria-hidden className="h-px w-full bg-signal" />
      <div className="container-site py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="h-28 w-auto" />
            <p className="mt-6 font-display text-lg font-medium tracking-tight">
              {company.name}
            </p>
            <p className="label-tech mt-2 text-ink-muted">
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
          </div>

          <div className="lg:col-span-3">
            <h2 className="label-tech text-ink-muted">Contact</h2>
            <ul className="mt-4 space-y-0">
              <li>
                <a
                  href={company.phoneHref}
                  className="inline-block py-1.5 hover:text-signal"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="inline-block py-1.5 break-all hover:text-signal"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={company.websiteHref}
                  className="inline-block py-1.5 hover:text-signal"
                >
                  {company.website}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="label-tech text-ink-muted">Navigate</h2>
            <ul className="mt-4 space-y-0">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-block py-1.5 hover:text-signal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="label-tech mt-16 flex flex-col gap-3 border-t border-rule pt-6 text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Smart Infratech Pte. Ltd. All rights reserved.</p>
          <p>{company.coordinates} — Singapore</p>
        </div>
      </div>
    </footer>
  );
}
