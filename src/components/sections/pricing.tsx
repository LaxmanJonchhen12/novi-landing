import { pricingSection, pricingTiers } from "@/content/pricing";
import type { PricingTier } from "@/content/types";
import { CtaButton } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";

/**
 * Both tiers get identical treatment on purpose. The section's own copy says
 * "Two plans. Both include everything" and "we don't gate the basics to sell
 * you an upgrade" — giving the paid tier an accent border and a badge would
 * have the design arguing with the words directly above it.
 *
 * No scroll reveal here either: pricing is a destination someone jumps to
 * from the nav, and content that animates in when you arrive via anchor is
 * friction, not polish.
 */
export function Pricing() {
  return (
    <Section
      id="pricing"
      heading={pricingSection.heading}
      supportingLine={pricingSection.supportingLine}
    >
      <div className="mx-auto grid max-w-208 gap-4 sm:grid-cols-2 sm:gap-5">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>
    </Section>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className="flex flex-col rounded-xl border border-border p-6 sm:p-8">
      <h3 className="font-semibold tracking-[-0.01em]">{tier.name}</h3>

      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tracking-[-0.02em] tabular-nums">
          {tier.price}
        </span>
        {tier.cadence ? (
          <span className="text-sm text-muted-foreground">{tier.cadence}</span>
        ) : null}
      </p>

      <p className="mt-4 text-sm/relaxed text-muted-foreground text-pretty">
        {tier.description}
      </p>

      {/* mt-auto pins this block to the card's bottom so the CTAs line up
          despite the descriptions being different lengths. The note slot is
          always rendered, even when empty: only one tier has a note, and
          rendering it conditionally left that card's button sitting 24px
          higher than the other's. */}
      <div className="mt-auto pt-6">
        <CtaButton label={tier.cta.label} size="md" className="w-full" />
        <p className="mt-2 min-h-4 text-center text-xs text-muted-foreground">
          {tier.cta.note}
        </p>
      </div>
    </div>
  );
}
