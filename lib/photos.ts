// Site photography. All files are CC0 / public-domain stock (see
// public/images/services/CREDITS.md) and are illustrative only — they do not
// depict Smart Infratech projects. Real job photos belong in lib/gallery.ts.

import type { StaticImageData } from "next/image";
import airconOutdoorUnits from "@/public/images/services/aircon-outdoor-units.jpg";
import rooftopMaintenance from "@/public/images/services/rooftop-aircon-maintenance.jpg";
import singaporeApartments from "@/public/images/services/singapore-apartments.jpg";
import wiring from "@/public/images/services/wiring.jpg";
import powerTrip from "@/public/images/services/power-trip.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const photos = {
  aircon: {
    src: airconOutdoorUnits,
    alt: "Row of wall-mounted air conditioner outdoor units",
  },
  electrical: {
    src: wiring,
    alt: "Electrician working on wiring",
  },
  electricalBoard: {
    src: powerTrip,
    alt: "Circuit breaker switches in a distribution board",
  },
  maintenance: {
    src: rooftopMaintenance,
    alt: "Technician beside rows of air conditioning condensers on a rooftop",
  },
  about: {
    src: singaporeApartments,
    alt: "High-rise apartment blocks in Singapore",
  },
} satisfies Record<string, Photo>;
