// Booking wizard data: bookable services, price estimates from the rate card,
// requestable dates and time windows, and the WhatsApp booking message.
// Nothing is sent to a server; a booking is a prefilled WhatsApp message.

import {
  chemicalOverhaul,
  formatPrice,
  installRates,
  offer,
  offerPrice,
  repairFrom,
  repairRates,
  servicingTiers,
} from "./rates";

export type BookingServiceId =
  | "servicing"
  | "overhaul"
  | "repair"
  | "gas"
  | "install"
  | "electrical"
  | "contract";

export type BookingService = {
  id: BookingServiceId;
  label: string;
  blurb: string;
  group: "aircon" | "other";
  /** Label for the unit counter; omitted when the job is not counted in units. */
  unitsLabel?: string;
  notesHint: string;
};

const airconNotes = "Brand or model, the fault you are seeing, access notes…";

export const bookingServices: BookingService[] = [
  {
    id: "servicing",
    label: "Aircon servicing",
    blurb: "Routine cleaning and cooling check",
    group: "aircon",
    unitsLabel: "Number of indoor units",
    notesHint: airconNotes,
  },
  {
    id: "overhaul",
    label: "Chemical overhaul",
    blurb: "Full disassembly and chemical wash",
    group: "aircon",
    unitsLabel: "Number of indoor units",
    notesHint: airconNotes,
  },
  {
    id: "repair",
    label: "Aircon repair",
    blurb: "Not cold, leaking, noisy or tripping",
    group: "aircon",
    unitsLabel: "Number of units affected",
    notesHint: airconNotes,
  },
  {
    id: "gas",
    label: "Gas top-up",
    blurb: "Refrigerant top-up and leak check",
    group: "aircon",
    unitsLabel: "Number of outdoor units",
    notesHint: "Brand or model and gas type (R32, R410, R22) if you know it…",
  },
  {
    id: "install",
    label: "Aircon installation",
    blurb: "New or reconditioned units, supplied and fitted",
    group: "aircon",
    unitsLabel: "Number of indoor units",
    notesHint: "New or reconditioned, preferred brand, room sizes…",
  },
  {
    id: "electrical",
    label: "Electrical works",
    blurb: "Installation, troubleshooting and testing",
    group: "other",
    notesHint: "What needs installing or fixing?",
  },
  {
    id: "contract",
    label: "Maintenance contract",
    blurb: "Scheduled servicing for homes and businesses",
    group: "other",
    unitsLabel: "Number of aircon units",
    notesHint: "Type of premises, equipment and how often you need servicing…",
  },
];

export const bookingService = (id: BookingServiceId) =>
  bookingServices.find((s) => s.id === id)!;

/** Unit types that general servicing is priced by. */
export const unitTypes = servicingTiers.map((t) => t.title);

export const maxUnits = 12;

export type Estimate = {
  amount: string;
  note: string;
  /** Total in SGD when the rate card gives an exact figure. */
  value?: number;
  /** Whether the running offer is reflected in the amount. */
  offerApplied: boolean;
};

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const gasRange = repairRates.flatMap((r) =>
  r.price.kind === "range" ? [r.price.min, r.price.max] : [],
);
const installFrom = installRates.flatMap((r) => (r.from ? [r.from] : []));

/** Price estimate for a selection, at the price in effect today. */
export function estimate(
  sel: { service: BookingServiceId; unitType: number; units: number },
  offerActive: boolean,
): Estimate {
  const price = (amount: number) =>
    offerActive ? offerPrice(amount) : amount;
  const quoted = (note: string): Estimate => ({
    amount: "Quoted",
    note,
    offerApplied: false,
  });

  switch (sel.service) {
    case "servicing": {
      const card = servicingTiers[sel.unitType] ?? servicingTiers[0];
      const tier = card.tiers[sel.units - 1];
      if (tier === undefined)
        return quoted(
          `More than ${card.tiers.length} units: we confirm the price on WhatsApp`,
        );
      return {
        amount: formatPrice(price(tier)),
        value: price(tier),
        note: `${plural(sel.units, "unit")} · ${card.title}`,
        offerApplied: offerActive,
      };
    }
    case "overhaul": {
      const each = price(chemicalOverhaul.price);
      return {
        amount: formatPrice(each * sel.units),
        value: each * sel.units,
        note: `${plural(sel.units, "unit")} × ${formatPrice(each)}`,
        offerApplied: offerActive,
      };
    }
    case "repair":
      return {
        amount: `From ${formatPrice(price(repairFrom))}`,
        note: "Diagnostic and minor fixes included",
        offerApplied: offerActive,
      };
    case "gas":
      return {
        amount: `${formatPrice(price(Math.min(...gasRange)))} – ${formatPrice(price(Math.max(...gasRange)))}`,
        note: "Per outdoor unit, depending on gas type",
        offerApplied: offerActive,
      };
    case "install":
      return {
        amount: `From ${formatPrice(price(Math.min(...installFrom)))}`,
        note: "Depends on brand, capacity and installation",
        offerApplied: offerActive,
      };
    case "electrical":
      return quoted("We reply with a quotation");
    case "contract":
      return quoted("Quoted per site and number of units");
  }
}

/** Short price hint for the service list. */
export function serviceHint(id: BookingServiceId, offerActive: boolean) {
  const price = (amount: number) =>
    offerActive ? offerPrice(amount) : amount;
  switch (id) {
    case "servicing":
      return `From ${formatPrice(price(servicingTiers[0].tiers[0]))}`;
    case "overhaul":
      return `${formatPrice(price(chemicalOverhaul.price))} / unit`;
    case "gas":
      return `From ${formatPrice(price(Math.min(...gasRange)))}`;
    case "repair":
    case "install":
      return estimate({ service: id, unitType: 0, units: 1 }, offerActive)
        .amount;
    default:
      return "Quote";
  }
}

export type Slot = { id: string; label: string; startHour: number };

/** Arrival windows within opening hours (Mon–Sat, 9am–6pm). */
export const slots: Slot[] = [
  { id: "morning", label: "9am – 12pm", startHour: 9 },
  { id: "midday", label: "12pm – 3pm", startHour: 12 },
  { id: "afternoon", label: "3pm – 6pm", startHour: 15 },
];

export type BookingDay = {
  /** YYYY-MM-DD in Singapore time. */
  iso: string;
  weekday: string;
  day: number;
  month: string;
  /** e.g. "Mon, 12 Oct 2026" */
  long: string;
  isToday: boolean;
  /** Slot ids that can still be requested for this day. */
  openSlots: string[];
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const SGT_OFFSET_MS = 8 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAYS_AHEAD = 30;

/**
 * Requestable days from today (Singapore time) to 30 days ahead, Sundays
 * excluded. Today only offers windows that have not started yet.
 */
export function bookingDays(now: Date = new Date()): BookingDay[] {
  // Shift to SGT, then read the UTC fields as Singapore wall-clock time.
  const sgNow = new Date(now.getTime() + SGT_OFFSET_MS);
  const hour = sgNow.getUTCHours();
  const days: BookingDay[] = [];
  for (let i = 0; i <= DAYS_AHEAD; i++) {
    const d = new Date(sgNow.getTime() + i * DAY_MS);
    if (d.getUTCDay() === 0) continue;
    const isToday = i === 0;
    const openSlots = slots
      .filter((s) => !isToday || s.startHour > hour)
      .map((s) => s.id);
    if (openSlots.length === 0) continue;
    const weekday = WEEKDAYS[d.getUTCDay()];
    const month = MONTHS[d.getUTCMonth()];
    days.push({
      iso: d.toISOString().slice(0, 10),
      weekday,
      day: d.getUTCDate(),
      month,
      long: `${weekday}, ${d.getUTCDate()} ${month} ${d.getUTCFullYear()}`,
      isToday,
      openSlots,
    });
  }
  return days;
}

export type Contact = {
  name: string;
  phone: string;
  postal: string;
  address: string;
};

export const emptyContact: Contact = {
  name: "",
  phone: "",
  postal: "",
  address: "",
};

/** First problem with the contact details, or "" when they are complete. */
export function contactError(contact: Contact) {
  if (!contact.name.trim()) return "Enter your name.";
  const digits = contact.phone.replace(/\D/g, "").replace(/^65(?=\d{8}$)/, "");
  if (!/^[3689]\d{7}$/.test(digits))
    return "Enter an 8-digit Singapore phone number.";
  if (!/^\d{6}$/.test(contact.postal.trim()))
    return "Enter your 6-digit postal code.";
  return "";
}

const CONTACT_KEY = "si-booking-contact";

/** Contact details saved on this device by an earlier booking, if any. */
export function loadContact(): Contact {
  if (typeof window === "undefined") return emptyContact;
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(CONTACT_KEY) ?? "null",
    ) as Partial<Contact> | null;
    if (!saved) return emptyContact;
    return {
      name: typeof saved.name === "string" ? saved.name : "",
      phone: typeof saved.phone === "string" ? saved.phone : "",
      postal: typeof saved.postal === "string" ? saved.postal : "",
      address: typeof saved.address === "string" ? saved.address : "",
    };
  } catch {
    return emptyContact;
  }
}

/** Keeps the contact details on this device, or forgets them. */
export function storeContact(contact: Contact | null) {
  try {
    if (contact)
      window.localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
    else window.localStorage.removeItem(CONTACT_KEY);
  } catch {
    // Storage blocked: the booking still goes through.
  }
}

export type BookingDetails = {
  service: BookingServiceId;
  unitType: number;
  units: number;
  property: string;
  notes: string;
  day: BookingDay;
  slot: Slot;
  contact: Contact;
};

/** The booking as a WhatsApp message. */
export function bookingMessage(b: BookingDetails, offerActive: boolean) {
  const service = bookingService(b.service);
  const est = estimate(b, offerActive);
  const address = [b.contact.postal.trim(), b.contact.address.trim()]
    .filter(Boolean)
    .join(", ");
  return [
    "Booking request — Smart Infratech",
    `Service: ${service.label}${b.service === "servicing" ? ` (${unitTypes[b.unitType]})` : ""}`,
    service.unitsLabel ? `Units: ${b.units}` : null,
    `Property: ${b.property}`,
    `Preferred date: ${b.day.long}`,
    `Preferred time: ${b.slot.label}`,
    `Estimate: ${est.amount}${est.offerApplied ? ` (${offer.name}, ${offer.percent}% off)` : ""}`,
    `Name: ${b.contact.name.trim()}`,
    `Phone: ${b.contact.phone.trim()}`,
    `Address: Singapore ${address}`,
    b.notes.trim() ? `Notes: ${b.notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
