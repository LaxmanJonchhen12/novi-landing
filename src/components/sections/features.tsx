import { features, featuresSection } from "@/content/features";
import type { Feature } from "@/content/types";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

import { FEATURE_VISUALS } from "./feature-icons";

/**
 * 2x2 on desktop rather than four across: at four-up each card is ~278px and
 * the descriptions wrap to four lines, which reads dense. Two-up gives them
 * roughly two lines and suits the calmer spacing the rest of the page uses.
 */
export function Features() {
  return (
    <Section
      id="features"
      heading={featuresSection.heading}
      supportingLine={featuresSection.supportingLine}
    >
      <Reveal className="mx-auto grid max-w-[64rem] gap-4 sm:grid-cols-2 sm:gap-5">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </Reveal>
    </Section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Visual = FEATURE_VISUALS[feature.icon];

  return (
    // No hover lift here, unlike the board cards: these aren't links, and a
    // lift on a non-interactive card promises a click that never happens.
    <div className="rounded-xl border border-border p-6 sm:p-7">
      {/* Fixed height so all four cards line up in the 2x2 grid regardless
          of which visual's internal shape is drawn — see feature-icons.tsx. */}
      <div
        aria-hidden
        className="mb-4 h-16 rounded-lg border border-border bg-foreground/[0.02] px-3"
      >
        <Visual />
      </div>

      <h3 className="font-semibold tracking-[-0.01em]">{feature.title}</h3>
      <p className="mt-2 text-sm/relaxed text-muted-foreground text-pretty">
        {feature.description}
      </p>
    </div>
  );
}
