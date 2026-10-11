import {
  CalendarCheck,
  Droplets,
  Fan,
  Gauge,
  PackagePlus,
  Wrench,
  Zap,
} from "lucide-react";
import type { BookingServiceId } from "@/lib/booking";

const icons: Record<BookingServiceId, typeof Fan> = {
  servicing: Fan,
  overhaul: Droplets,
  repair: Wrench,
  gas: Gauge,
  install: PackagePlus,
  electrical: Zap,
  contract: CalendarCheck,
};

export function ServiceIcon({
  id,
  className = "size-5",
}: {
  id: BookingServiceId;
  className?: string;
}) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden strokeWidth={1.5} />;
}
