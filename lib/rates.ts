// Aircon rates as supplied by Smart Infratech, plus the Year End Offer.
// Amounts here are the REGULAR prices in SGD; the offer price is derived.

export const offer = {
  name: "Year End Offer",
  percent: 10,
  // Last day is 31 Dec 2026, Singapore time.
  endsAt: new Date("2027-01-01T00:00:00+08:00"),
  endLabel: "31 December 2026",
} as const;

/** True until the offer's end date. Pages re-render hourly (see app/layout.tsx). */
export function isOfferActive(now: Date = new Date()) {
  return now < offer.endsAt;
}

/** Offer price, rounded down to the dollar. */
export function offerPrice(amount: number) {
  return Math.floor((amount * (100 - offer.percent)) / 100);
}

export function formatPrice(amount: number) {
  return `$${amount.toLocaleString("en-SG")}`;
}

export const offerWhatsappText = `Hello Smart Infratech, I would like to enquire about the ${offer.name} (${offer.percent}% off).`;

/** WhatsApp enquiry for one rate, mentioning the offer while it runs. */
export function rateEnquiry(subject: string, active: boolean) {
  return active
    ? `Hello Smart Infratech, I would like the ${offer.name} (${offer.percent}% off) for: ${subject}.`
    : `Hello Smart Infratech, I would like to enquire about: ${subject}.`;
}

export type ServicingTiers = {
  title: string;
  /** Total price by number of units: index 0 is 1 unit. */
  tiers: number[];
};

export const servicingTiers: ServicingTiers[] = [
  { title: "Wall-Mounted Aircon", tiers: [50, 60, 70, 80, 100, 120] },
  { title: "Central / Cassette Aircon", tiers: [50, 95, 130, 160, 200] },
];

export const chemicalOverhaul = {
  title: "Chemical Overhaul",
  price: 120,
  unit: "per unit",
  points: [
    "Full internal disassembly",
    "Chemical wash of all parts",
    "Mould & bacteria removal",
    "Drainage clearing",
    "Performance testing",
  ],
};

/** Starting price for repair / troubleshooting. */
export const repairFrom = 40;

export type RepairPrice =
  | { kind: "from"; amount: number }
  | { kind: "range"; min: number; max: number }
  | { kind: "quote" };

export type RepairRate = { service: string; price: RepairPrice; notes: string };

export const repairRates: RepairRate[] = [
  {
    service: "Aircon Repair / Troubleshooting",
    price: { kind: "from", amount: repairFrom },
    notes: "Diagnostic + minor fixes included",
  },
  {
    service: "Gas Top-Up — R410 / R22",
    price: { kind: "range", min: 80, max: 100 },
    notes: "Per outdoor unit",
  },
  {
    service: "Gas Top-Up — R32",
    price: { kind: "range", min: 100, max: 120 },
    notes: "Per outdoor unit",
  },
  {
    service: "Compressor Replacement",
    price: { kind: "quote" },
    notes: "Depends on brand & model",
  },
  {
    service: "PCB / Circuit Board Replacement",
    price: { kind: "quote" },
    notes: "Depends on part availability",
  },
  {
    service: "Fan Motor Replacement",
    price: { kind: "quote" },
    notes: "Indoor or outdoor unit",
  },
];

export type InstallRate = {
  title: string;
  /** Starting price; omitted for custom quotes. */
  from?: number;
  points: string[];
};

export const installRates: InstallRate[] = [
  {
    title: "New Aircon Installation",
    from: 1350,
    points: [
      "Brand new unit included",
      "Professional installation",
      "All major brands available",
      "System 1 to System 4",
      "HDB, condo, office, commercial",
    ],
  },
  {
    title: "Second-Hand Aircon",
    from: 700,
    points: [
      "Reconditioned unit included",
      "Installation included",
      "Chemically cleaned & tested",
      "Warranty on parts & workmanship",
      "Daikin, Mitsubishi, Panasonic",
    ],
  },
  {
    title: "Maintenance Contract",
    points: [
      "Fixed-rate regular servicing",
      "Priority scheduling",
      "For homes & businesses",
      "Quarterly or monthly plans",
      "WhatsApp for custom quote",
    ],
  },
];

export const ratesNotice =
  "Final pricing depends on the specific fault, brand, BTU, number of units, and installation complexity. We always provide a clear quote before starting any work. Contact us for a free assessment.";
