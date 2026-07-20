export type ConsentState = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  timestamp: string;
  policyVersion: string;
};

const KEY = "cookie-consent";
const POLICY_VERSION = "1.0";
const EVENT_NAME = "consent-changed";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(functional: boolean, analytics: boolean) {
  const state: ConsentState = {
    necessary: true,
    functional,
    analytics,
    timestamp: new Date().toISOString(),
    policyVersion: POLICY_VERSION,
  };
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function onConsentChange(callback: () => void) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}