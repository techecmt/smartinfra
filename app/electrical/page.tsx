import type { Metadata } from "next";
import { divisions } from "@/lib/content";
import { DivisionPage } from "@/components/sections/division-page";

const description =
  "SMART Electrical by Smart Infratech: electrical installation, power trip troubleshooting, distribution board works, lighting, wiring, maintenance and testing in Singapore.";

export const metadata: Metadata = {
  title: "SMART Electrical — Installation, Maintenance & Testing Singapore",
  description,
  alternates: { canonical: "/electrical" },
};

export default function ElectricalPage() {
  return (
    <DivisionPage
      division={divisions.electrical}
      service="electrical"
    />
  );
}
