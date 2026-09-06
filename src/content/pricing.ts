import type { PricingTier } from "./types";

export const pricingSection = {
  heading: "Two plans. Both include everything.",
  supportingLine:
    "We don't gate the basics to sell you an upgrade. You pay when your team outgrows the free tier, not before.",
} as const;

export const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    description:
      "Up to 5 people. Unlimited boards, sprints, and history. No card, no trial clock counting down.",
    checks: [
      "Unlimited boards & sprints",
      "Full history — nothing disappears",
      "Up to 5 people",
      "No credit card",
    ],
    cta: { label: "Start a board" },
  },
  {
    name: "Team",
    price: "$8",
    cadence: "per person / month",
    description:
      "Unlimited people, guest access for clients and contractors, and support from someone who works on the product.",
    checks: [
      "Everything in Free",
      "Unlimited people",
      "Guest access for clients",
      "Direct support from the team",
    ],
    cta: { label: "Start free trial", note: "No card required" },
  },
] as const satisfies readonly PricingTier[];
