// Supply & installation services, as listed in the company's own material.
// Photographs are CC0 / public-domain stock (see public/images/services/CREDITS.md)
// and are illustrative only — they do not depict Smart Infratech projects.

import type { StaticImageData } from "next/image";
import painting from "@/public/images/services/painting.jpg";
import demolition from "@/public/images/services/demolition.jpg";
import waterHeater from "@/public/images/services/water-heater.jpg";
import piping from "@/public/images/services/piping.jpg";
import tap from "@/public/images/services/tap.jpg";
import powerTrip from "@/public/images/services/power-trip.jpg";
import fan from "@/public/images/services/fan.jpg";
import wiring from "@/public/images/services/wiring.jpg";
import renovation from "@/public/images/services/renovation.jpg";

export type SupplyService = {
  code: string;
  slug: string;
  title: string;
  trade: string;
  description: string;
  scope: string[];
  image: StaticImageData;
  alt: string;
};

export const supplyServices: SupplyService[] = [
  {
    code: "SI-01",
    slug: "painting",
    title: "Painting",
    trade: "Finishes",
    description:
      "Painting works for rooms, units and premises, with surfaces prepared before the new coating goes on.",
    scope: ["Walls & ceilings", "Surface preparation", "Repainting"],
    image: painting,
    alt: "Painter with a roller standing in front of a freshly painted wall",
  },
  {
    code: "SI-02",
    slug: "demolition",
    title: "Demolition",
    trade: "Hacking",
    description:
      "Demolition and hacking of existing walls, floors and fittings to clear the way for new works.",
    scope: ["Hacking", "Removal of fittings", "Debris clearance"],
    image: demolition,
    alt: "Excavator breaking down a concrete structure",
  },
  {
    code: "SI-03",
    slug: "water-heater",
    title: "Water Heater",
    trade: "Plumbing",
    description:
      "Supply and installation of water heaters, including replacement of existing units.",
    scope: ["Supply", "Installation", "Replacement"],
    image: waterHeater,
    alt: "Shower head with running water",
  },
  {
    code: "SI-04",
    slug: "piping-leakage",
    title: "Piping Leakage",
    trade: "Plumbing",
    description:
      "Locating and repairing leaking pipes, joints and fittings before they cause further damage.",
    scope: ["Leak tracing", "Pipe repair", "Joint & fitting replacement"],
    image: piping,
    alt: "Pipe wrenches and plumbing fittings laid out on a work surface",
  },
  {
    code: "SI-05",
    slug: "tap-replacement",
    title: "Tap Replacement",
    trade: "Plumbing",
    description:
      "Removing worn or faulty taps and fitting new ones at basins, sinks and showers.",
    scope: ["Basin taps", "Sink taps", "Shower mixers"],
    image: tap,
    alt: "Chrome mixer tap on a bathroom basin",
  },
  {
    code: "SI-06",
    slug: "power-trip",
    title: "Power Trip Rectification",
    trade: "Electrical",
    description:
      "Finding the cause of a tripping circuit and rectifying the fault so power stays on.",
    scope: ["Fault finding", "Circuit checks", "Rectification"],
    image: powerTrip,
    alt: "Row of circuit breakers with one switch flipped",
  },
  {
    code: "SI-07",
    slug: "ceiling-wall-fans",
    title: "Ceiling & Wall Fans",
    trade: "Electrical",
    description:
      "Supply and installation of ceiling fans and wall fans, mounted and connected ready for use.",
    scope: ["Ceiling fans", "Wall fans", "Mounting & connection"],
    image: fan,
    alt: "Ceiling fan with wooden blades beside a pendant light",
  },
  {
    code: "SI-08",
    slug: "wiring-power-points",
    title: "Wiring & Power Points",
    trade: "Electrical",
    description:
      "New wiring runs and additional power points placed where they are needed.",
    scope: ["Wiring", "Power points", "Switches & sockets"],
    image: wiring,
    alt: "Electrician fitting a wall socket",
  },
  {
    code: "SI-09",
    slug: "full-renovation",
    title: "Full Renovation",
    trade: "Renovation",
    description:
      "Complete renovation jobs coordinated as one scope, from hacking through to finishing.",
    scope: [
      "Hacking to finishing",
      "Plumbing & electrical",
      "Single coordinated scope",
    ],
    image: renovation,
    alt: "Worker fitting interior trim in a room under renovation",
  },
];
