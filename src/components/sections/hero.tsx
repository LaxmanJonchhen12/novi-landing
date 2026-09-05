import { ArrowRight } from "lucide-react";

import { hero } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Server Component — the hero ships no JavaScript. The entrance animation is
 * pure CSS keyframes with staggered delays, which also means it runs before
 * hydration rather than waiting on it.
 *
 * Type scales with `clamp()` rather than jumping at breakpoints, so the
 * headline is proportionate at 320px and at 2560px without a cascade of
 * `sm: md: lg: xl:` overrides.
 *
 * CTAs sit ABOVE the board deliberately: in the original prototype they were
 * below it, which pushed the primary action off-screen at 100% zoom.
 */
export function Hero() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24">
      <Container className="flex flex-col items-center text-center">
        <h1
          className="max-w-[18ch] animate-[rise_0.7s_ease-out_both] font-semibold tracking-[-0.03em] text-balance"
          style={{ fontSize: "clamp(2rem, 5.2vw + 0.5rem, 5rem)", lineHeight: 1.05 }}
        >
          <span className="block">{hero.headline.lead}</span>
          <span className="block text-accent">{hero.headline.accent}</span>
        </h1>

        <p
          className="mt-5 max-w-[42ch] animate-[rise_0.7s_ease-out_both] text-muted-foreground text-pretty [animation-delay:110ms] sm:mt-6"
          style={{ fontSize: "clamp(1.0625rem, 0.7vw + 0.9rem, 1.3125rem)", lineHeight: 1.55 }}
        >
          {hero.subhead}
        </p>

        <div className="mt-8 flex animate-[rise_0.7s_ease-out_both] flex-col items-stretch gap-3 [animation-delay:220ms] sm:flex-row sm:items-center sm:gap-4">
          <a href={hero.primaryCta.href} className={buttonVariants({ size: "lg" })}>
            {hero.primaryCta.label}
          </a>

          <a
            href={hero.secondaryCta.href}
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "group")}
          >
            {hero.secondaryCta.label}
            <ArrowRight
              aria-hidden
              className="transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <p className="mt-5 animate-[rise_0.7s_ease-out_both] text-sm text-muted-foreground [animation-delay:320ms]">
          {hero.trustLine}
        </p>
      </Container>
    </section>
  );
}
