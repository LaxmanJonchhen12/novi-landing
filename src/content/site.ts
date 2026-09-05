import type { Cta, Link } from "./types";

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
  href: "#",
} as const satisfies Cta;

export const hero = {
  /** Split so the second line can carry the accent colour. */
  headline: {
    lead: "Work moves.",
    accent: "Not the process.",
  },
  subhead:
    "One place to plan, track, and decide — without a second tool to keep it running.",
  primaryCta: {
    label: "Start a board",
    href: "#",
  },
  secondaryCta: {
    label: "See how it works",
    href: "#how-it-works",
  },
  /**
   * A product fact, deliberately not social proof. An invented "trusted by
   * N teams" number would be the easiest thing on the page to disbelieve.
   */
  trustLine: "Free for up to 5 people · No onboarding call needed",
} as const;
