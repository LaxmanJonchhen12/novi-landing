"use client";

import { useActionState } from "react";

import { newsletter } from "@/content/footer";
import { Button } from "@/components/ui/button";

import { subscribe } from "./subscribe-action";
import { subscribeInitialState } from "./subscribe-state";

/**
 * Uses a Server Action rather than client-side fetch, so the form still works
 * with JavaScript disabled: without JS the browser posts the form natively and
 * the action runs server-side. Same principle as the scroll reveal — the page
 * should degrade to working, not to broken.
 *
 * `type="email"` stays for the correct mobile keyboard and as a fast first
 * check; the server validation is the actual source of truth.
 */
export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(
    subscribe,
    subscribeInitialState,
  );

  return (
    <form action={formAction} className="mt-5">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={newsletter.placeholder}
          aria-invalid={state.status === "error" || undefined}
          aria-describedby="subscribe-status"
          className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/45 aria-invalid:border-red-500"
        />
        <Button type="submit" disabled={isPending} className="shrink-0">
          {isPending ? "Subscribing…" : newsletter.buttonLabel}
        </Button>
      </div>

      {/*
        Always rendered so screen readers have a stable live region to
        announce into — creating the element only on submit would mean the
        announcement is missed. Reserved height also stops the layout jumping
        when a message appears.
      */}
      <p
        id="subscribe-status"
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-5 text-xs ${
          state.status === "error" ? "text-red-600" : "text-muted-foreground"
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}
