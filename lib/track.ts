type TrackParams = Record<string, string | number | boolean | undefined>;

/**
 * Pushes an event to the Google Tag Manager data layer. Tags fired from it
 * follow the visitor's Consent Mode choice (see lib/consent.ts). Never pass
 * personal details such as names, phone numbers or addresses.
 */
export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}
