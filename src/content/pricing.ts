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
    cta: { label: "Start a board", href: "#" },
  },
  {
    name: "Team",
    price: "$8",
    cadence: "per person / month",
    description:
      "Unlimited people, guest access for clients and contractors, and support from someone who works on the product.",
    cta: { label: "Start free trial", href: "#", note: "No card required" },
  },
] as const satisfies readonly PricingTier[];
