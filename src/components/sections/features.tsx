import { features, featuresSection } from "@/content/features";
import type { Feature } from "@/content/types";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

import { FEATURE_ICONS } from "./feature-icons";

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
  const Icon = FEATURE_ICONS[feature.icon];

  return (
    // No hover lift here, unlike the board cards: these aren't links, and a
    // lift on a non-interactive card promises a click that never happens.
    <div className="rounded-xl border border-border p-6 sm:p-7">
      <span
        aria-hidden
        className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent"
      >
        <Icon className="size-5" />
      </span>

      <h3 className="mt-4 font-semibold tracking-[-0.01em]">{feature.title}</h3>
      <p className="mt-2 text-sm/relaxed text-muted-foreground text-pretty">
        {feature.description}
      </p>
    </div>
  );
}
