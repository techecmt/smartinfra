// Single source of truth for all company facts and page copy.
// Only information supplied by Smart Infratech belongs here — no invented
// certifications, licences, clients, projects, prices or statistics.

export const company = {
  name: "SMART INFRATECH PTE. LTD.",
  shortName: "Smart Infratech",
  descriptor: "Air Conditioning & Electrical Engineering",
  uen: "202041094R",
  phone: "+65 8484 0705",
  phoneHref: "tel:+6584840705",
  // Digits only, with country code, as wa.me expects.
  whatsapp: "6584840705",
  email: "ask.smartinfra@gmail.com",
  emailHref:
    "mailto:ask.smartinfra@gmail.com?subject=Enquiry%20via%20smartinfra.com.sg",
  website: "www.smartinfra.com.sg",
  websiteHref: "https://www.smartinfra.com.sg",
  address: [
    "31 Bukit Batok Crescent",
    "#01-02, The Splendour",
    "Singapore 658070",
  ],
  hours: "Mon–Sat, 9am–6pm",
  hoursLong: "Monday to Saturday, 9am to 6pm",
  tagline: "Expert management, energy efficient.",
} as const;

/** WhatsApp chat link to the company number, optionally with a prefilled message. */
export function whatsappHref(text?: string) {
  const base = `https://wa.me/${company.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const defaultWhatsappText =
  "Hello Smart Infratech, I would like to enquire about your services.";

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/about", label: "About Us" },
  { href: "/aircon", label: "SMART AirCon" },
  { href: "/electrical", label: "SMART Electrical" },
  { href: "/maintenance-plans", label: "Maintenance Plans" },
  { href: "/contact", label: "Contact Us" },
];

export type DivisionKey = "aircon" | "electrical";

export type ServiceGroup = {
  title: string;
  summary: string;
  items: string[];
};

export type Division = {
  key: DivisionKey;
  name: string;
  href: string;
  strapline: string;
  summary: string;
  intro: string;
  groups: ServiceGroup[];
};

export const divisions: Record<DivisionKey, Division> = {
  aircon: {
    key: "aircon",
    name: "SMART AirCon",
    href: "/aircon",
    strapline: "Installation • Servicing • Repair",
    summary:
      "Servicing, troubleshooting, repair and installation of air conditioning systems for homes and business premises.",
    intro:
      "SMART AirCon is the SG aircon servicing and repair team of Smart Infratech, covering homes and businesses islandwide. From a routine aircon service or chemical wash to a unit that has stopped cooling, visits are usually available the same or next day.",
    groups: [
      {
        title: "Aircon servicing",
        summary: "Routine cleaning that keeps units cooling properly.",
        items: [
          "General aircon servicing",
          "Aircon chemical wash",
          "Chemical overhaul",
          "Outdoor condenser cleaning",
          "Drain line flushing",
        ],
      },
      {
        title: "Aircon repair & troubleshooting",
        summary: "Find the fault, explain it, then put it right.",
        items: [
          "Aircon not cold or weak airflow",
          "Water leaking from indoor unit",
          "Refrigerant gas top-up and leak check",
          "PCB repair and replacement",
          "Fan motor and compressor faults",
          "Noisy or tripping units",
        ],
      },
      {
        title: "Aircon installation",
        summary: "New and reconditioned systems, supplied and fitted.",
        items: [
          "New aircon supply and installation",
          "Used and reconditioned aircon supply and installation",
          "Replacement of existing units",
          "Piping, insulation and trunking",
          "Dismantling and disposal",
        ],
      },
      {
        title: "Aircon maintenance",
        summary:
          "Planned maintenance for homes, offices, shops and facilities.",
        items: [
          "Aircon maintenance contracts",
          "Small commercial VRV / VRF systems",
          "Scheduled servicing visits",
          "Fault call-outs",
        ],
      },
    ],
  },
  electrical: {
    key: "electrical",
    name: "SMART Electrical",
    href: "/electrical",
    strapline: "Installation • Maintenance • Testing",
    summary:
      "Electrical installation, troubleshooting, maintenance and testing for homes and business premises.",
    intro:
      "New points and lighting, a distribution board that needs attention, or a circuit that keeps tripping — we install, trace faults and maintain electrical systems across Singapore.",
    groups: [
      {
        title: "Installation",
        summary: "New electrical points, fittings and wiring.",
        items: [
          "Power points and switches",
          "Lighting installation",
          "Ceiling and wall fans",
          "Wiring and rewiring",
          "Distribution board (DB) works",
          "Appliance and heater points",
        ],
      },
      {
        title: "Troubleshooting",
        summary: "Trace the fault and restore the supply.",
        items: [
          "Power trip rectification",
          "Faulty circuits and breakers",
          "Fault-finding on lighting and power points",
          "Replacement of damaged fittings",
        ],
      },
      {
        title: "Maintenance & testing",
        summary: "Checks that keep an installation in working order.",
        items: [
          "Electrical inspection and testing",
          "Distribution board maintenance",
          "Maintenance for commercial premises",
        ],
      },
    ],
  },
};

export const divisionList: Division[] = [
  divisions.aircon,
  divisions.electrical,
];

/** Enquiry form options. Order and wording follow the company's enquiry sheet. */
export const quoteServices = [
  { label: "Aircon Servicing", needsUnits: true },
  { label: "Aircon Troubleshooting / Repair", needsUnits: true },
  { label: "Used Aircon Supply & Installation", needsUnits: true },
  { label: "Electrical Installation / Troubleshooting", needsUnits: false },
  { label: "Commercial Maintenance Contract", needsUnits: true },
] as const;

export type QuoteService = (typeof quoteServices)[number]["label"];

export const propertyTypes = ["HDB", "Condo", "Landed", "Commercial"] as const;
export const unitCounts = ["1", "2", "3", "4+", "N/A"] as const;

export type Step = { no: string; title: string; description: string };

export const enquirySteps: Step[] = [
  {
    no: "01",
    title: "Send the details",
    description:
      "WhatsApp us what you need. A photo or short video of the unit or fault helps us understand it quickly.",
  },
  {
    no: "02",
    title: "Get a quotation",
    description:
      "We review the requirement and reply with a quotation, or arrange a site visit where one is needed.",
  },
  {
    no: "03",
    title: "Book the visit",
    description:
      "Agree a date and time. Our team attends, completes the work and walks you through what was done.",
  },
];

export type Plan = {
  key: string;
  title: string;
  audience: string;
  description: string;
  points: string[];
  enquiry: string;
};

// Prices are deliberately absent: plans are quoted per site.
export const plans: Plan[] = [
  {
    key: "quarterly",
    title: "Quarterly Servicing",
    audience: "Homes — HDB, condo, landed",
    description:
      "Four aircon servicing visits a year, scheduled in advance, so units are cleaned before they start to underperform.",
    points: [
      "Four scheduled servicing visits per year",
      "Fixed-rate regular servicing",
      "Priority scheduling",
      "Quoted by the number of indoor units",
    ],
    enquiry:
      "Hello Smart Infratech, I would like a quotation for the Quarterly Servicing plan.",
  },
  {
    key: "commercial",
    title: "Commercial Maintenance Contract",
    audience: "Offices, shops and facilities",
    description:
      "Recurring aircon maintenance for business premises, including small commercial VRV / VRF systems, on a schedule agreed for the site.",
    points: [
      "Quarterly or monthly plans",
      "Fixed-rate regular servicing",
      "Priority scheduling",
      "Covers split, multi-split and small VRV / VRF systems",
      "Quoted after reviewing the site and equipment",
    ],
    enquiry:
      "Hello Smart Infratech, I would like a quotation for a Commercial Maintenance Contract.",
  },
  {
    key: "electrical",
    title: "Electrical Maintenance",
    audience: "Business premises",
    description:
      "Periodic electrical inspection, testing and upkeep, arranged alongside aircon maintenance or on its own.",
    points: [
      "Inspection and testing at agreed intervals",
      "Distribution board maintenance",
      "Scope and schedule set per site",
    ],
    enquiry:
      "Hello Smart Infratech, I would like a quotation for Electrical Maintenance.",
  },
];

export type Principle = { title: string; description: string };

export const principles: Principle[] = [
  {
    title: "Practical delivery",
    description:
      "Work planned around the actual site, the equipment in place and how the space is used.",
  },
  {
    title: "Two disciplines, one team",
    description:
      "Air conditioning and electrical works handled together, so there is one company to call.",
  },
  {
    title: "Energy efficient",
    description:
      "Well-maintained systems run more efficiently. Servicing and sound installation are where that starts.",
  },
  {
    title: "Singapore focus",
    description:
      "Services built around homes and business premises in Singapore.",
  },
];
