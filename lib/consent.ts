/**
 * Google Consent Mode v2. Every consent type starts as "denied" and is only
 * granted once the visitor chooses in the cookie banner; the choice is kept
 * in localStorage and replayed on later visits.
 */

export const CONSENT_KEY = "si-consent";
const CONSENT_VERSION = 1;
/** Ask again after 12 months. */
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

const CHANGE_EVENT = "si-consent-change";
const OPEN_EVENT = "si-consent-open";

export type ConsentChoice = { analytics: boolean; ads: boolean };

type StoredConsent = ConsentChoice & { v: number; ts: number };

/**
 * Runs inline in <head>, before Google Tag Manager loads, so no tag can read
 * a consent state other than this default or the visitor's saved choice.
 */
export const consentDefaultScript = `(function(){
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{
var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}'));
if(c&&c.v===${CONSENT_VERSION}&&Date.now()-c.ts<${CONSENT_MAX_AGE_MS}){
var a=c.ads?'granted':'denied';
gtag('consent','update',{ad_storage:a,ad_user_data:a,ad_personalization:a,analytics_storage:c.analytics?'granted':'denied'});
}
}catch(e){}
})();`;

/** Raw saved value; a string so it is stable for useSyncExternalStore. */
export function readStoredConsent(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

/** The visitor's saved choice, or null when there is none or it has lapsed. */
export function parseConsent(raw: string | null): ConsentChoice | null {
  if (!raw) return null;
  try {
    const stored = JSON.parse(raw) as Partial<StoredConsent>;
    if (
      stored.v !== CONSENT_VERSION ||
      typeof stored.ts !== "number" ||
      Date.now() - stored.ts >= CONSENT_MAX_AGE_MS
    ) {
      return null;
    }
    return { analytics: stored.analytics === true, ads: stored.ads === true };
  } catch {
    return null;
  }
}

/** Saves the choice and passes it to Google Tag Manager. */
export function saveConsent(choice: ConsentChoice) {
  const stored: StoredConsent = {
    ...choice,
    v: CONSENT_VERSION,
    ts: Date.now(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }

  const ads = choice.ads ? "granted" : "denied";
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  // Consent commands must be pushed as an `arguments` object, as gtag() does.
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }
  (gtag as (...args: unknown[]) => void)("consent", "update", {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: choice.analytics ? "granted" : "denied",
  });
  dataLayer.push({ event: "consent_update" });

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Reopens the banner so a visitor can change an earlier choice. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeToConsentOpen(onOpen: () => void) {
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => window.removeEventListener(OPEN_EVENT, onOpen);
}
