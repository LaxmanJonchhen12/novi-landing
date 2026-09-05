"use server";

import type { SubscribeState } from "./subscribe-state";

/**
 * Stricter than the browser's own `type="email"` check, which accepts things
 * like `a@b` with no TLD. That matters here: it keeps the server-side error
 * path reachable with JavaScript enabled, rather than being dead code that
 * native validation always short-circuits.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "error", message: "Enter an email address." };
  }
  if (!EMAIL.test(email)) {
    return { status: "error", message: "That doesn't look like an email address." };
  }

  // No mailing list behind this — it's a demo product. The action validates
  // and reports back; wiring a real provider would be the only change.
  return {
    status: "success",
    message: "You're on the list. Next changelog goes out at the end of the month.",
  };
}
