"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import {
  openConsentSettings,
  parseConsent,
  readStoredConsent,
  saveConsent,
  subscribeToConsent,
  subscribeToConsentOpen,
  type ConsentChoice,
} from "@/lib/consent";

const button =
  "inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-medium transition-colors";

/**
 * Cookie banner. Shown until the visitor makes a choice, and again when they
 * reopen it from the footer. Analytics and advertising stay off until accepted.
 */
export function CookieConsent() {
  // undefined on the server and during hydration, so nothing renders until
  // the saved choice is known.
  const raw = useSyncExternalStore<string | null | undefined>(
    subscribeToConsent,
    readStoredConsent,
    () => undefined,
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => subscribeToConsentOpen(() => setReopened(true)), []);

  if (raw === undefined) return null;
  const saved = parseConsent(raw);
  if (saved && !reopened) return null;

  return (
    <ConsentPanel
      saved={saved}
      onDone={(choice) => {
        saveConsent(choice);
        setReopened(false);
      }}
    />
  );
}

function ConsentPanel({
  saved,
  onDone,
}: {
  saved: ConsentChoice | null;
  onDone: (choice: ConsentChoice) => void;
}) {
  const headingId = useId();
  const [customising, setCustomising] = useState(saved !== null);
  const [analytics, setAnalytics] = useState(saved?.analytics ?? false);
  const [ads, setAds] = useState(saved?.ads ?? false);

  return (
    <section
      aria-labelledby={headingId}
      className="fixed inset-x-0 bottom-(--tabbar) z-50 border-t border-rule bg-white text-ink shadow-[0_-12px_40px_-16px_rgb(37_38_56/0.35)] sm:inset-x-auto sm:bottom-[calc(var(--tabbar)+1.5rem)] sm:left-6 sm:w-[26rem] sm:border"
    >
      <div aria-hidden className="h-px w-full bg-signal" />
      <div className="max-h-[80dvh] overflow-y-auto p-5 sm:p-6">
        <h2
          id={headingId}
          className="font-display text-lg font-medium tracking-tight"
        >
          Cookies on this site
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          We would like to use analytics and advertising cookies to understand
          how this site is used and to measure our marketing. They stay off
          unless you accept. You can change your choice at any time from the
          footer.
        </p>

        {customising && (
          <fieldset className="mt-4 border-t border-rule">
            <legend className="sr-only">Cookie categories</legend>
            <div className="border-b border-rule py-3">
              <p className="text-sm font-medium">Necessary</p>
              <p className="mt-0.5 text-sm text-ink-muted">
                Needed for the site to work and to remember this choice. Always
                on.
              </p>
            </div>
            <ConsentToggle
              label="Analytics"
              description="Helps us see which pages are visited and how the site is used."
              checked={analytics}
              onChange={setAnalytics}
            />
            <ConsentToggle
              label="Advertising"
              description="Lets us measure our adverts and show you relevant ones."
              checked={ads}
              onChange={setAds}
            />
          </fieldset>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {customising ? (
            <button
              type="button"
              onClick={() => onDone({ analytics, ads })}
              className={`${button} bg-ink text-white hover:bg-ink-deep`}
            >
              Save choices
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onDone({ analytics: true, ads: true })}
              className={`${button} bg-ink text-white hover:bg-ink-deep`}
            >
              Accept all
            </button>
          )}
          <button
            type="button"
            onClick={() => onDone({ analytics: false, ads: false })}
            className={`${button} border border-ink/25 bg-white hover:border-ink`}
          >
            Reject all
          </button>
          {customising ? (
            <button
              type="button"
              onClick={() => onDone({ analytics: true, ads: true })}
              className={`${button} underline underline-offset-4`}
            >
              Accept all
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomising(true)}
              className={`${button} underline underline-offset-4`}
            >
              Customise
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ConsentToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border-b border-rule py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-5 shrink-0 accent-ink"
      />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-sm text-ink-muted">
          {description}
        </span>
      </span>
    </label>
  );
}

/** Footer control that reopens the banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
