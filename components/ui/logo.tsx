import Image from "next/image";
import logo from "@/public/logo.png";

/**
 * Official SMART INFRATECH logo, used unaltered.
 *
 * The supplied PNG has a solid white background, so it must only be placed on
 * white / light-grey surfaces. `mix-blend-multiply` lets the white knock out
 * against light grey without changing the mark itself. Replace
 * `public/logo.png` with a higher-resolution or transparent version when
 * available — no code changes are needed.
 */
export function Logo({
  className = "h-12 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt="Smart Infratech"
      priority={priority}
      sizes="80px"
      className={`mix-blend-multiply ${className}`}
    />
  );
}
