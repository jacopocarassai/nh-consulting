import { useState } from "react";
import { setConsent, type ConsentState } from "@/lib/cookie-consent";

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${
        checked ? "bg-primary" : "bg-foreground/20"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function CookieBanner({
  initial,
  onDone,
  onOpenPolicy,
}: {
  initial: ConsentState | null;
  onDone: () => void;
  onOpenPolicy: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [functional, setFunctional] = useState(initial?.functional ?? false);
  const [analytics, setAnalytics] = useState(initial?.analytics ?? false);

  function acceptAll() {
    setConsent(true, true);
    onDone();
  }

  function rejectAll() {
    setConsent(false, false);
    onDone();
  }

  function savePreferences() {
    setConsent(functional, analytics);
    onDone();
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-[60] px-4 pb-4 md:px-8 md:pb-8">
      <div className="max-w-2xl mx-auto bg-foreground text-background rounded-2xl border border-background/10 p-6 md:p-8 shadow-2xl">
        <p className="text-sm leading-relaxed text-background/80">
          We use cookies to run this site and, with your permission, to power
          the booking widget below.{" "}
          <button
            onClick={onOpenPolicy}
            className="underline hover:text-background transition-colors"
          >
            Learn more
          </button>
        </p>

        {expanded && (
          <div className="mt-6 space-y-4 border-t border-background/15 pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-background/60">
                  Necessary
                </p>
                <p className="mt-1 text-xs text-background/50">
                  Required for the site to function. Always on.
                </p>
              </div>
              <Toggle checked disabled />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-background/60">
                  Functional
                </p>
                <p className="mt-1 text-xs text-background/50">
                  Loads the Calendly booking widget.
                </p>
              </div>
              <Toggle checked={functional} onChange={setFunctional} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-background/60">
                  Analytics
                </p>
                <p className="mt-1 text-xs text-background/50">
                  Helps us understand how visitors use the site.
                </p>
              </div>
              <Toggle checked={analytics} onChange={setAnalytics} />
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={acceptAll}
            className="bg-background text-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity rounded-full"
          >
            Accept all
          </button>
          <button
            onClick={rejectAll}
            className="border border-background/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] hover:border-background/60 transition-colors rounded-full"
          >
            Reject
          </button>
          {expanded ? (
            <button
              onClick={savePreferences}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-background/70 hover:text-background transition-colors underline"
            >
              Save preferences
            </button>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-background/70 hover:text-background transition-colors underline"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}