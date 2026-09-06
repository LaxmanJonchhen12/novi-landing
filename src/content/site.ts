import type { Cta, DialogCta, Link } from "./types";

export const brand = {
  name: "Novi",
  tagline: "The work, moving forward.",
} as const;

export const navLinks = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
] as const satisfies readonly Link[];

export const navCta = {
  label: "Start free",
} as const satisfies DialogCta;

export const hero = {
  /** Split so the second line can carry the accent colour. */
  headline: {
    lead: "Work moves.",
    accent: "Not the process.",
  },
  subhead:
    "One place to plan, track, and decide — without a second tool to keep it running.",
  // Opens the shared concept-product dialog (see CtaButton) — no href to read.
  primaryCta: {
    label: "Start a board",
  } satisfies DialogCta,
  // A real anchor — this one still navigates.
  secondaryCta: {
    label: "See how it works",
    href: "#how-it-works",
  } satisfies Cta,
  /**
   * A product fact, deliberately not social proof. An invented "trusted by
   * N teams" number would be the easiest thing on the page to disbelieve.
   */
  trustLine: "Free for up to 5 people · No onboarding call needed",
} as const;
