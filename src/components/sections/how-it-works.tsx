import { howItWorksSection, howItWorksSteps } from "@/content/how-it-works";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

/**
 * Destination for the hero's "See how it works" CTA.
 *
 * Laid out as connected steps rather than another card grid: the features
 * section directly above is already a 2x2 of bordered cards, and repeating
 * that footprint would make the page read as one long grid. Numbers instead
 * of icons for the same reason — and because these are a sequence, which an
 * icon wouldn't convey.
 *
 * The connector is drawn with pseudo-elements on each step: a vertical rule
 * below the marker on mobile, a horizontal one to its right from `md:` up.
 * Both are hidden on the last step so the line ends at step three rather than
 * trailing off into nothing.
 */
export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      heading={howItWorksSection.heading}
      supportingLine={howItWorksSection.supportingLine}
    >
      <Reveal
        as="ol"
        className="mx-auto grid max-w-[64rem] gap-8 md:grid-cols-3 md:gap-6"
      >
        {howItWorksSteps.map((step, index) => (
          <li
            key={step.title}
            className={[
              "relative flex gap-4 md:block",
              // Mobile: vertical rule from below the marker into the gap.
              "before:absolute before:top-9 before:-bottom-8 before:left-4 before:w-px before:bg-border",
              "last:before:hidden md:before:hidden",
              // md+: horizontal rule from the marker across the column gap.
              "md:after:absolute md:after:top-4 md:after:right-[-1.5rem] md:after:left-11 md:after:h-px md:after:bg-border",
              "md:last:after:hidden",
            ].join(" ")}
          >
            <span
              aria-hidden
              className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background text-sm font-medium text-accent tabular-nums"
            >
              {index + 1}
            </span>

            <div className="md:mt-5">
              <h3 className="font-semibold tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-2 text-sm/relaxed text-muted-foreground text-pretty">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
