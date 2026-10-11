"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, Check, ChevronRight, Minus, Plus, X } from "lucide-react";
import { company, propertyTypes, whatsappHref } from "@/lib/content";
import {
  bookingDays,
  bookingIntents,
  bookingMessage,
  bookingService,
  brandOptions,
  brandUnsure,
  contactError,
  estimate,
  intentOf,
  loadContact,
  maxUnits,
  serviceHint,
  slots,
  storeContact,
  symptoms,
  symptomUnsure,
  unitTypes,
  type BookingIntentId,
  type BookingServiceId,
  type Contact,
} from "@/lib/booking";
import { offer } from "@/lib/rates";
import { track } from "@/lib/track";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useBooking, type BookingPreset } from "./booking-context";
import { ServiceIcon } from "./service-icon";

const steps = [
  { name: "Service", title: "What can we help with?" },
  { name: "Details", title: "Tell us about the job" },
  { name: "Date and time", title: "When suits you?" },
  { name: "Your details", title: "Where should we come?" },
] as const;

const fieldLabel = "block font-medium text-ink";
const input =
  "mt-2 block w-full border border-ink/25 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted/80 focus:border-ink max-md:rounded-xl";
const card =
  "flex h-full flex-col justify-center border border-ink/25 p-3 text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-signal hover:border-ink max-md:rounded-2xl";
const chip =
  "flex min-h-11 items-center justify-center border border-ink/25 px-4 py-2 text-[0.95rem] text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-signal peer-disabled:cursor-not-allowed peer-disabled:opacity-40 hover:border-ink max-md:rounded-xl";

/**
 * Booking wizard: service, job details, preferred date and time, then contact
 * details. The result opens as a prefilled WhatsApp message; nothing is sent
 * to a server. Used inside the booking sheet and inline on the pages.
 */
export function BookingFlow({
  preset,
  variant,
  headingId,
  onClose,
}: {
  preset?: BookingPreset;
  variant: "sheet" | "inline";
  headingId: string;
  /** Sheet only: closes the wizard. */
  onClose?: () => void;
}) {
  const { offerActive } = useBooking();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState("");
  const [serviceId, setServiceId] = useState<BookingServiceId | null>(
    preset?.service ?? null,
  );
  const [intentId, setIntentId] = useState<BookingIntentId | null>(
    preset?.service ? intentOf(preset.service) : null,
  );
  const [noticing, setNoticing] = useState<string[]>([]);
  const [brand, setBrand] = useState(brandUnsure);
  const [unitType, setUnitType] = useState(preset?.unitType ?? 0);
  const [units, setUnits] = useState(1);
  const [property, setProperty] = useState("");
  const [notes, setNotes] = useState("");
  const [days] = useState(() => bookingDays());
  const [dayIso, setDayIso] = useState("");
  const [slotId, setSlotId] = useState("");
  const [contact, setContact] = useState<Contact>(() => loadContact());
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const ids = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shown = useRef(`${step}${sent}`);

  // Move focus to the step title on each step change, so keyboard and screen
  // reader users land at the top of the new step. Never on first render: the
  // inline wizard must not pull the page down to itself.
  useEffect(() => {
    const view = `${step}${sent}`;
    if (shown.current === view) return;
    shown.current = view;
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    headingRef.current?.focus({ preventScroll: variant === "sheet" });
  }, [step, sent, variant]);

  const intent = bookingIntents.find((i) => i.id === intentId);
  const service = serviceId ? bookingService(serviceId) : null;
  const est = serviceId
    ? estimate({ service: serviceId, unitType, units }, offerActive)
    : null;
  const day = days.find((d) => d.iso === dayIso);
  const slot = slots.find((s) => s.id === slotId);

  const goTo = (next: number) => {
    setError("");
    setStep(next);
    track("booking_step", {
      booking_step: next + 1,
      booking_step_name: steps[next].name,
      booking_intent: intentId ?? undefined,
      booking_service: serviceId ?? undefined,
    });
  };

  // An intent with one service selects it; "Servicing" starts on the routine
  // service; "Something else" waits for the customer to pick.
  const chooseIntent = (id: BookingIntentId) => {
    const { services } = bookingIntents.find((i) => i.id === id)!;
    setIntentId(id);
    setServiceId(id === "other" ? null : services[0]);
    setError("");
  };

  // "Not sure yet" stands alone; picking anything else clears it.
  const toggleNoticing = (symptom: string) => {
    setError("");
    setNoticing((current) =>
      current.includes(symptom)
        ? current.filter((s) => s !== symptom)
        : symptom === symptomUnsure
          ? [symptomUnsure]
          : [...current.filter((s) => s !== symptomUnsure), symptom],
    );
  };

  const chooseDay = (iso: string) => {
    setDayIso(iso);
    setError("");
    const open = days.find((d) => d.iso === iso)?.openSlots ?? [];
    if (!open.includes(slotId)) setSlotId("");
  };

  const stepError = () => {
    if (step === 0)
      return !intentId
        ? "Choose what we can help with."
        : !serviceId
          ? "Choose the service you need."
          : serviceId === "repair" && noticing.length === 0
            ? `Tell us what you are noticing, or choose "${symptomUnsure}".`
            : "";
    if (step === 1) return property ? "" : "Choose your property type.";
    if (step === 2)
      return !day
        ? "Choose a preferred date."
        : !slot
          ? "Choose a time window."
          : "";
    return contactError(contact);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const problem = stepError();
    if (problem) {
      setError(problem);
      return;
    }
    if (step < steps.length - 1) {
      goTo(step + 1);
      return;
    }
    if (!serviceId || !day || !slot || !est) return;
    const href = whatsappHref(
      bookingMessage(
        {
          service: serviceId,
          unitType,
          units,
          symptoms: noticing,
          brand,
          property,
          notes,
          day,
          slot,
          contact,
        },
        offerActive,
      ),
    );
    storeContact(remember ? contact : null);
    track("booking_submit", {
      booking_service: serviceId,
      booking_brand: service?.group === "aircon" ? brand : undefined,
      booking_units: service?.unitsLabel ? units : undefined,
      booking_property: property,
      booking_date: day.iso,
      booking_slot: slot.id,
      value: est.value,
      currency: est.value === undefined ? undefined : "SGD",
    });
    window.open(href, "_blank", "noopener,noreferrer");
    setError("");
    setSent(href);
  };

  const restart = () => {
    setSent("");
    setStep(0);
    setIntentId(null);
    setServiceId(null);
    setNoticing([]);
    setUnits(1);
    setNotes("");
    setDayIso("");
    setSlotId("");
  };

  const edit = <K extends keyof Contact>(key: K) => ({
    value: contact[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setContact({ ...contact, [key]: e.target.value });
      setError("");
    },
  });

  const Heading = variant === "sheet" ? "h2" : "h3";
  const pad = "px-5 sm:px-8";
  const isSheet = variant === "sheet";
  const lastStep = step === steps.length - 1;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={isSheet ? "flex min-h-0 flex-1 flex-col" : "flex flex-col"}
    >
      <header className={`${pad} pt-5 pb-4`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="label-tech flex items-center gap-3 text-ink-muted">
              <span aria-hidden className="h-px w-6 bg-signal" />
              {sent
                ? "Booking request"
                : `Step ${step + 1} of ${steps.length} · ${steps[step].name}`}
            </p>
            <Heading
              id={headingId}
              ref={headingRef}
              tabIndex={-1}
              // Focused by script only, so it takes no focus ring.
              style={{ outline: "none" }}
              className="mt-2 font-display text-2xl font-medium tracking-[-0.02em] text-ink"
            >
              {sent ? "Press send in WhatsApp" : steps[step].title}
            </Heading>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking"
              className="-mr-2 grid size-11 shrink-0 cursor-pointer place-items-center text-ink hover:bg-paper max-md:rounded-full"
            >
              <X className="size-5" aria-hidden />
            </button>
          ) : null}
        </div>
        <div aria-hidden className="mt-4 grid grid-cols-4 gap-1.5">
          {steps.map((s, i) => (
            <span
              key={s.name}
              className={`h-1 transition-colors duration-300 max-md:rounded-full ${
                sent || i <= step ? "bg-signal" : "bg-rule"
              }`}
            />
          ))}
        </div>
      </header>

      <div
        ref={bodyRef}
        className={`${pad} pb-6 ${isSheet ? "min-h-0 flex-1 overflow-y-auto overscroll-contain" : ""}`}
      >
        {sent ? (
          <div>
            <p className="flex items-start gap-3 text-ink">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center bg-ink text-white max-md:rounded-full">
                <Check className="size-4" aria-hidden />
              </span>
              <span>
                Your booking is filled in and waiting in WhatsApp.{" "}
                <strong className="font-semibold">Press send</strong> there to
                reach us.
              </span>
            </p>
            <p className="mt-4 text-ink-muted">
              We reply on WhatsApp to confirm your slot ({company.hours}). You
              can add a photo or video of the unit before sending.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={sent}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-whatsapp px-6 py-3 font-semibold text-ink-deep transition-colors hover:bg-whatsapp-deep max-md:rounded-xl"
              >
                <WhatsAppIcon className="size-6" />
                Open WhatsApp Again
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
              <button
                type="button"
                onClick={onClose ?? restart}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center border border-ink/25 px-6 py-3 font-medium text-ink transition-colors hover:border-ink max-md:rounded-xl"
              >
                {onClose ? "Done" : "Make Another Booking"}
              </button>
            </div>
          </div>
        ) : null}

        {!sent && step === 0 ? (
          <>
            <fieldset>
              <legend className="sr-only">What can we help with?</legend>
              <div className="grid grid-cols-2 gap-2">
                {bookingIntents.map((i) => (
                  <label key={i.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="intent"
                      value={i.id}
                      checked={intentId === i.id}
                      onChange={() => chooseIntent(i.id)}
                      className="peer sr-only"
                    />
                    <span className={card}>
                      <span className="font-display text-[1.05rem] leading-tight font-medium">
                        {i.label}
                      </span>
                      <span className="mt-1 text-sm leading-snug opacity-75">
                        {i.blurb}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {intent && intent.services.length > 1 ? (
              <fieldset className="mt-6">
                <legend className={fieldLabel}>Which service?</legend>
                <div className="mt-3 grid gap-2">
                  {intent.services.map((id) => {
                    const option = bookingService(id);
                    return (
                      <label key={id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value={id}
                          checked={serviceId === id}
                          onChange={() => {
                            setServiceId(id);
                            setError("");
                          }}
                          className="peer sr-only"
                        />
                        <span className={`${card} flex-row items-center gap-3`}>
                          <ServiceIcon id={id} className="size-5 shrink-0" />
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium">
                              {option.label}
                            </span>
                            <span className="block text-sm opacity-75">
                              {option.blurb}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-medium whitespace-nowrap">
                            {serviceHint(id, offerActive)}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            {serviceId === "repair" ? (
              <fieldset className="mt-6">
                <legend className={fieldLabel}>
                  What are you noticing?{" "}
                  <span className="text-sm font-normal text-ink-muted">
                    (tap all that apply)
                  </span>
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[...symptoms, symptomUnsure].map((symptom) => (
                    <label
                      key={symptom}
                      className={`cursor-pointer ${symptom === symptomUnsure ? "col-span-2" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={noticing.includes(symptom)}
                        onChange={() => toggleNoticing(symptom)}
                        className="peer sr-only"
                      />
                      <span
                        className={`${chip} px-2 text-center ${symptom === symptomUnsure ? "border-dashed" : ""}`}
                      >
                        {symptom}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {service?.group === "aircon" ? (
              <div className="mt-6">
                <label htmlFor={`${ids}-brand`} className={fieldLabel}>
                  Which brand is it?{" "}
                  <span className="text-sm font-normal text-ink-muted">
                    (optional)
                  </span>
                </label>
                <select
                  id={`${ids}-brand`}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className={input}
                >
                  {brandOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            ) : null}
          </>
        ) : null}

        {!sent && step === 1 && service ? (
          <>
            <p className="flex items-center gap-3 border border-rule bg-paper p-3 text-ink max-md:rounded-2xl">
              <span className="grid size-9 shrink-0 place-items-center bg-ink text-white max-md:rounded-lg">
                <ServiceIcon id={service.id} className="size-4" />
              </span>
              <span className="min-w-0 flex-1 font-medium">
                {service.label}
              </span>
              <button
                type="button"
                onClick={() => goTo(0)}
                className="min-h-11 shrink-0 cursor-pointer px-2 text-sm font-medium underline underline-offset-4"
              >
                Change
              </button>
            </p>

            {service.id === "servicing" ? (
              <Choices
                legend="Type of unit"
                name="unitType"
                options={unitTypes.map((label, i) => ({
                  value: String(i),
                  label,
                }))}
                value={String(unitType)}
                onChange={(v) => setUnitType(Number(v))}
              />
            ) : null}

            {service.unitsLabel ? (
              <div className="mt-6 flex items-center justify-between gap-4">
                <span id={`${ids}-units`} className={fieldLabel}>
                  {service.unitsLabel}
                </span>
                <div
                  role="group"
                  aria-labelledby={`${ids}-units`}
                  className="flex shrink-0 items-center border border-ink/25 max-md:rounded-xl"
                >
                  <button
                    type="button"
                    aria-label="Fewer units"
                    disabled={units <= 1}
                    onClick={() => setUnits((n) => n - 1)}
                    className="grid size-12 cursor-pointer place-items-center text-ink disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus className="size-4" aria-hidden />
                  </button>
                  <output
                    aria-live="polite"
                    className="w-10 text-center font-display text-xl font-medium text-ink tabular-nums"
                  >
                    {units}
                  </output>
                  <button
                    type="button"
                    aria-label="More units"
                    disabled={units >= maxUnits}
                    onClick={() => setUnits((n) => n + 1)}
                    className="grid size-12 cursor-pointer place-items-center text-ink disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
            ) : null}

            <Choices
              legend="Property type"
              name="property"
              options={propertyTypes.map((p) => ({ value: p, label: p }))}
              value={property}
              onChange={(v) => {
                setProperty(v);
                setError("");
              }}
            />

            <div className="mt-6">
              <label htmlFor={`${ids}-notes`} className={fieldLabel}>
                Anything we should know?{" "}
                <span className="font-normal text-ink-muted">(optional)</span>
              </label>
              <textarea
                id={`${ids}-notes`}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={service.notesHint}
                className={input}
              />
            </div>

            {est ? (
              <p className="mt-6 border-l-4 border-signal bg-paper p-4 text-sm text-ink-muted">
                <span className="font-medium text-ink">{est.note}.</span>{" "}
                {est.offerApplied
                  ? `${offer.name} (${offer.percent}% off) included. `
                  : null}
                Prices are indicative; we confirm a clear quote before starting
                any work.
              </p>
            ) : null}
          </>
        ) : null}

        {!sent && step === 2 ? (
          <>
            <fieldset>
              <legend className={fieldLabel}>Preferred date</legend>
              <div className="relative -mx-5 mt-3 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
                {days.map((d) => (
                  <label key={d.iso} className="shrink-0 cursor-pointer">
                    <input
                      type="radio"
                      name="day"
                      value={d.iso}
                      checked={dayIso === d.iso}
                      onChange={() => chooseDay(d.iso)}
                      className="peer sr-only"
                    />
                    <span
                      className={`${chip} w-[4.25rem] snap-start flex-col gap-0 px-0 py-2.5`}
                    >
                      <span className="label-tech">
                        {d.isToday ? "Today" : d.weekday}
                      </span>
                      <span className="font-display text-2xl leading-tight font-medium tabular-nums">
                        {d.day}
                      </span>
                      <span className="text-xs">{d.month}</span>
                      <span className="sr-only">{d.long}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className={fieldLabel}>Preferred time</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {slots.map((s) => (
                  <label key={s.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="slot"
                      value={s.id}
                      checked={slotId === s.id}
                      disabled={day ? !day.openSlots.includes(s.id) : false}
                      onChange={() => {
                        setSlotId(s.id);
                        setError("");
                      }}
                      className="peer sr-only"
                    />
                    <span className={`${chip} min-h-12 font-medium`}>
                      {s.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="mt-6 text-sm text-ink-muted">
              {day?.isToday ? "Same-day visits are subject to availability. " : ""}
              This is your preferred slot. We confirm the exact arrival time on
              WhatsApp. Open {company.hours}.
            </p>
          </>
        ) : null}

        {!sent && lastStep && service && est ? (
          <>
            <dl className="border border-rule bg-paper px-4 max-md:rounded-2xl">
              <SummaryRow term="Service" onEdit={() => goTo(1)}>
                {service.label}
                {service.unitsLabel
                  ? ` · ${units} ${units === 1 ? "unit" : "units"}`
                  : ""}
              </SummaryRow>
              <SummaryRow term="When" onEdit={() => goTo(2)}>
                {day?.long}, {slot?.label}
              </SummaryRow>
              <SummaryRow term="Estimate">{est.amount}</SummaryRow>
            </dl>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${ids}-name`} className={fieldLabel}>
                  Name
                </label>
                <input
                  id={`${ids}-name`}
                  type="text"
                  autoComplete="name"
                  className={input}
                  {...edit("name")}
                />
              </div>
              <div>
                <label htmlFor={`${ids}-phone`} className={fieldLabel}>
                  Mobile number
                </label>
                <input
                  id={`${ids}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="8123 4567"
                  className={input}
                  {...edit("phone")}
                />
              </div>
              <div>
                <label htmlFor={`${ids}-postal`} className={fieldLabel}>
                  Postal code
                </label>
                <input
                  id={`${ids}-postal`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={6}
                  placeholder="6 digits"
                  className={input}
                  {...edit("postal")}
                />
              </div>
              <div>
                <label htmlFor={`${ids}-address`} className={fieldLabel}>
                  Block and unit no.{" "}
                  <span className="font-normal text-ink-muted">(optional)</span>
                </label>
                <input
                  id={`${ids}-address`}
                  type="text"
                  autoComplete="street-address"
                  placeholder="Blk 123, #05-67"
                  className={input}
                  {...edit("address")}
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-ink"
              />
              <span className="text-sm text-ink-muted">
                <span className="font-medium text-ink">
                  Remember my details on this device
                </span>{" "}
                for faster booking next time. They are saved in this browser
                only.
              </span>
            </label>
          </>
        ) : null}
      </div>

      {sent ? null : (
        <footer
          className={`${pad} border-t border-rule bg-white py-3.5 ${isSheet ? "pb-[calc(0.875rem+env(safe-area-inset-bottom))]" : ""}`}
        >
          <p
            role="alert"
            className={`font-medium text-ink ${error ? "mb-3" : ""}`}
          >
            {error ? (
              <>
                <span aria-hidden className="mr-2 text-signal">
                  ●
                </span>
                {error}
              </>
            ) : null}
          </p>
          <div className="flex items-center gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                aria-label="Back to previous step"
                className="grid size-12 shrink-0 cursor-pointer place-items-center border border-ink/25 text-ink transition-colors hover:border-ink max-md:rounded-xl"
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
            ) : null}
            {est && !lastStep ? (
              <p className="min-w-0 flex-1 leading-tight">
                <span className="label-tech block text-ink-muted">
                  Estimate
                </span>
                <span className="font-display text-xl font-medium whitespace-nowrap text-ink">
                  {est.amount}
                </span>
              </p>
            ) : (
              <span className={lastStep ? "hidden" : "flex-1"} />
            )}
            {lastStep ? (
              <button
                type="submit"
                className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-3 bg-whatsapp px-5 py-3 font-semibold text-ink-deep transition-colors hover:bg-whatsapp-deep max-md:rounded-xl"
              >
                <WhatsAppIcon className="size-6" />
                Send on WhatsApp
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 bg-ink px-7 py-3 font-medium text-white transition-colors hover:bg-ink-deep max-md:rounded-xl"
              >
                Continue
                <ChevronRight className="size-4" aria-hidden />
              </button>
            )}
          </div>
        </footer>
      )}
    </form>
  );
}

function Choices({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className={fieldLabel}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className={chip}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SummaryRow({
  term,
  onEdit,
  children,
}: {
  term: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-rule py-2.5 last:border-b-0">
      <dt className="label-tech w-16 shrink-0 text-ink-muted">{term}</dt>
      <dd className="min-w-0 flex-1 font-medium text-ink">{children}</dd>
      {onEdit ? (
        <dd className="shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="min-h-11 cursor-pointer px-1 text-sm font-medium text-ink underline underline-offset-4"
          >
            Edit<span className="sr-only"> {term.toLowerCase()}</span>
          </button>
        </dd>
      ) : null}
    </div>
  );
}
