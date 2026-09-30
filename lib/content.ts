// Single source of truth for all company facts and page copy.
// Only information supplied by Smart Infratech belongs here — no invented
// certifications, clients, projects or statistics.

export const company = {
  name: "SMART INFRATECH PTE. LTD.",
  shortName: "Smart Infratech",
  uen: "202041094R",
  phone: "+65 8484 0705",
  phoneHref: "tel:+6584840705",
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
  // Approximate location of Bukit Batok Crescent, used as a visual label only.
  coordinates: "1.3490° N / 103.7495° E",
  tagline: "Expert management, energy efficient.",
} as const;

export type NavItem = { id: string; label: string };

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "services", label: "Services" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
];

export type Capability = {
  no: string;
  title: string;
  description: string;
  scope: string[];
};

export const capabilities: Capability[] = [
  {
    no: "01",
    title: "Construction",
    description:
      "Minor construction works and reinstatement works delivered with practical site coordination.",
    scope: ["Minor construction", "Reinstatement"],
  },
  {
    no: "02",
    title: "Engineering",
    description:
      "Piping, steel structures and M&E-related works supporting building and infrastructure requirements.",
    scope: ["Piping", "Steel structures", "M&E"],
  },
  {
    no: "03",
    title: "Consultancy",
    description:
      "QAQC, QEHS and IT consultancy designed to support better processes and project execution.",
    scope: ["QAQC", "QEHS & training", "IT"],
  },
  {
    no: "04",
    title: "Inspection",
    description:
      "Inspection services focused on structured assessment and practical reporting.",
    scope: ["Assessment", "Reporting"],
  },
  {
    no: "05",
    title: "Renovation",
    description:
      "Commercial and private renovation, refurbishment and redecoration works.",
    scope: ["Commercial", "Private", "Redecoration"],
  },
  {
    no: "06",
    title: "Security Systems",
    description:
      "Security-related infrastructure and systems for modern environments.",
    scope: ["Systems", "Infrastructure"],
  },
];

export type ServiceIllustration =
  "construction" | "engineering" | "renovation" | "consultancy" | "security";

export type ServiceGroup = {
  code: string;
  title: string;
  summary: string;
  items: string[];
  illustration: ServiceIllustration;
};

export const serviceGroups: ServiceGroup[] = [
  {
    code: "S-01",
    title: "Construction",
    summary: "Structural and reinstatement works on site.",
    items: [
      "Minor Construction Works",
      "Reinstatement Works",
      "Piping & Steel Structure Works",
    ],
    illustration: "construction",
  },
  {
    code: "S-02",
    title: "Engineering & M&E",
    summary: "Building services installed and coordinated with the fabric.",
    items: [
      "M&E Works",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Lighting",
      "Roofing",
      "False Ceiling",
      "Kitchen Equipment Installation",
    ],
    illustration: "engineering",
  },
  {
    code: "S-03",
    title: "Renovation & Redecoration",
    summary: "Finishes and upgrades for commercial and private spaces.",
    items: [
      "Painting & Texture Works",
      "Waterproofing",
      "Epoxy Coatings",
      "Sealant & Gasket",
      "Masonry & Hacking",
      "Tiling",
      "Façade Cleaning",
      "Carpentry",
      "Landscaping",
    ],
    illustration: "renovation",
  },
  {
    code: "S-04",
    title: "Consultancy & Assurance",
    summary: "Process, quality and safety support for project teams.",
    items: [
      "QAQC Consultancy",
      "QEHS Consultancy & Training",
      "IT Consultancy",
      "Inspection Services",
    ],
    illustration: "consultancy",
  },
  {
    code: "S-05",
    title: "Security",
    summary:
      "Security systems planned around how a space is used, accessed and maintained.",
    items: ["Security Systems"],
    illustration: "security",
  },
];

export type RenovationItem = { label: string; detail: string };

export const renovationItems: RenovationItem[] = [
  { label: "Painting", detail: "Painting & texture works" },
  { label: "Waterproofing", detail: "Waterproofing works" },
  { label: "Epoxy", detail: "Epoxy coatings" },
  { label: "Masonry", detail: "Masonry & hacking" },
  { label: "Tiling", detail: "Floor & wall tiling" },
  { label: "Façade Cleaning", detail: "External envelope" },
  { label: "HVAC", detail: "Mechanical services" },
  { label: "Plumbing", detail: "Water & sanitary" },
  { label: "Electrical", detail: "Electrical / MEP services" },
  { label: "Roofing", detail: "Roof works" },
  { label: "Ceiling", detail: "False ceiling installation" },
  { label: "Carpentry", detail: "Carpentry services" },
  { label: "Landscaping", detail: "External & green areas" },
  { label: "Kitchen Equipment", detail: "Equipment installation" },
];

export type SystemLayer = { key: string; title: string; description: string };

export const systemLayers: SystemLayer[] = [
  {
    key: "building",
    title: "Building",
    description:
      "Structure, envelope and finishes: the physical base every other system depends on.",
  },
  {
    key: "mep",
    title: "MEP",
    description:
      "Mechanical, electrical and plumbing works coordinated with the building fabric.",
  },
  {
    key: "safety",
    title: "Safety",
    description:
      "QEHS practice and security systems applied across the environment and its people.",
  },
  {
    key: "inspection",
    title: "Inspection",
    description:
      "Structured assessment and QAQC to verify works against the agreed requirements.",
  },
  {
    key: "maintenance",
    title: "Maintenance",
    description:
      "Reinstatement, repair and upkeep that keep spaces operational over time.",
  },
  {
    key: "efficiency",
    title: "Efficiency",
    description:
      "Coordinated execution and energy-conscious solutions connecting every layer.",
  },
];

export type Principle = { no: string; title: string; description: string };

export const principles: Principle[] = [
  {
    no: "01",
    title: "Practical delivery",
    description:
      "Solutions designed around real site requirements and operational needs.",
  },
  {
    no: "02",
    title: "Multidisciplinary capability",
    description:
      "Construction, M&E, renovation, consultancy, inspection and related services under one coordinated approach.",
  },
  {
    no: "03",
    title: "Efficiency",
    description:
      "A focus on practical execution, coordination and energy-conscious solutions.",
  },
  {
    no: "04",
    title: "Singapore focus",
    description:
      "A service approach designed around commercial and private environments in Singapore.",
  },
];

export type ProcessStep = { no: string; title: string; description: string };

export const processSteps: ProcessStep[] = [
  {
    no: "01",
    title: "Understand",
    description: "Understand the site, requirement and scope.",
  },
  {
    no: "02",
    title: "Assess",
    description: "Review technical, operational and project requirements.",
  },
  {
    no: "03",
    title: "Plan",
    description: "Develop a practical execution approach.",
  },
  {
    no: "04",
    title: "Execute",
    description: "Coordinate and deliver the required works.",
  },
  {
    no: "05",
    title: "Review",
    description: "Inspect, refine and close out the work.",
  },
];
