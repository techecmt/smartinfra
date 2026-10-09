import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { defaultWhatsappText, whatsappHref } from "@/lib/content";
import { WhatsAppIcon } from "./whatsapp-icon";

const base =
  "inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 text-[0.95rem] font-medium transition-colors";

/**
 * Primary call to action: opens a WhatsApp chat with the company number.
 * `urgent` adds the glow and pulsing ring — use it once per view.
 */
export function WhatsAppLink({
  children = "WhatsApp Us",
  text = defaultWhatsappText,
  urgent = false,
  className = "",
}: {
  children?: React.ReactNode;
  text?: string;
  urgent?: boolean;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-whatsapp font-semibold text-ink-deep hover:bg-whatsapp-deep ${urgent ? "wa-urgent" : ""} ${className}`}
    >
      <WhatsAppIcon className="size-6" />
      {children}
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: ButtonLinkProps) {
  const tone = {
    solid: "bg-ink text-white hover:bg-ink-deep",
    outline: "border border-ink/25 bg-white text-ink hover:border-ink",
    light: "border border-white/30 text-white hover:border-white",
  }[variant];
  return (
    <Link href={href} className={`group ${base} ${tone} ${className}`}>
      {children}
      <ArrowRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}
