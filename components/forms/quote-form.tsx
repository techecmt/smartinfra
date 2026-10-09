"use client";

import { useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  propertyTypes,
  quoteServices,
  unitCounts,
  whatsappHref,
  type QuoteService,
} from "@/lib/content";

type CopyState = "idle" | "copied" | "failed";

/**
 * Guided enquiry: a few taps build a formatted message, which opens in a
 * WhatsApp chat with the company number. Nothing is sent to a server.
 */
export function QuoteForm({
  defaultService,
}: {
  defaultService?: QuoteService;
}) {
  const [service, setService] = useState<string>(defaultService ?? "");
  const [property, setProperty] = useState("");
  const [units, setUnits] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const detailsId = useId();
  const errorId = useId();

  const needsUnits =
    quoteServices.find((s) => s.label === service)?.needsUnits ?? true;

  const message = [
    "Service enquiry — Smart Infratech",
    `Service: ${service}`,
    `Property: ${property}`,
    needsUnits && units ? `Aircon indoor units: ${units}` : null,
    details.trim() ? `Details: ${details.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const validate = () => {
    const missing = !service
      ? "Choose the service you need."
      : !property
        ? "Choose your property type."
        : "";
    setError(missing);
    return !missing;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
  };

  const onCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const edit =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      setError("");
      setCopyState("idle");
    };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={error ? errorId : undefined}
      className="border border-rule bg-white p-5 sm:p-8"
    >
      <ChoiceGroup
        legend="Required service"
        name="service"
        options={quoteServices.map((s) => s.label)}
        value={service}
        onChange={edit(setService)}
        stacked
      />
      <ChoiceGroup
        legend="Property type"
        name="property"
        options={propertyTypes}
        value={property}
        onChange={edit(setProperty)}
      />
      {needsUnits ? (
        <ChoiceGroup
          legend="Number of aircon indoor units"
          hint="if applicable"
          name="units"
          options={unitCounts}
          value={units}
          onChange={edit(setUnits)}
        />
      ) : null}

      <div className="mt-7">
        <label htmlFor={detailsId} className="font-medium text-ink">
          Additional details{" "}
          <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id={detailsId}
          rows={4}
          value={details}
          onChange={(e) => edit(setDetails)(e.target.value)}
          placeholder="Brand or model, the fault you are seeing, preferred dates, your area…"
          className="mt-3 block w-full border border-ink/25 bg-white px-4 py-3 text-ink placeholder:text-ink-muted/80 focus:border-ink"
        />
      </div>

      <p
        id={errorId}
        role="alert"
        className="mt-4 min-h-6 font-medium text-ink"
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

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-3 wa-urgent bg-whatsapp px-6 py-3 font-semibold text-ink-deep transition-colors hover:bg-whatsapp-deep"
        >
          <WhatsAppIcon className="size-6" />
          Send Enquiry on WhatsApp
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 border border-ink/25 px-6 py-3 font-medium text-ink transition-colors hover:border-ink"
        >
          {copyState === "copied" ? (
            <Check className="size-4" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
          {copyState === "copied" ? "Copied" : "Copy Enquiry"}
        </button>
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-ink-muted">
        {copyState === "failed"
          ? "Could not copy automatically — use the WhatsApp button instead."
          : "Opens WhatsApp with your enquiry filled in. You can add photos or a video before sending."}
      </p>
    </form>
  );
}

function ChoiceGroup({
  legend,
  hint,
  name,
  options,
  value,
  onChange,
  stacked = false,
}: {
  legend: string;
  hint?: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  stacked?: boolean;
}) {
  return (
    <fieldset className="mt-7 first:mt-0">
      <legend className="font-medium text-ink">
        {legend}
        {hint ? (
          <span className="font-normal text-ink-muted"> ({hint})</span>
        ) : null}
      </legend>
      <div
        className={`mt-3 gap-2 ${stacked ? "grid sm:grid-cols-2" : "flex flex-wrap"}`}
      >
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span
              className={`flex min-h-11 items-center border border-ink/25 px-4 py-2 text-[0.95rem] text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-signal hover:border-ink ${
                stacked ? "" : "min-w-14 justify-center"
              }`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
