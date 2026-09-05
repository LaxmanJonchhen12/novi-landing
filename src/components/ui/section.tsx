import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Shared shell for the page's content sections. Owns the vertical rhythm
 * (py-12 mobile / py-24 desktop, per the design system) and the heading pair,
 * so three sections don't become three copies of the same markup.
 *
 * `id` is required, not optional — every section here is a nav or CTA
 * destination, and a section without an anchor would be a dead link.
 */
export function Section({
  id,
  heading,
  supportingLine,
  className,
  children,
}: {
  id: string;
  heading: string;
  supportingLine: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-12 md:py-24", className)}>
      <Container>
        <div className="mx-auto flex max-w-[46ch] flex-col items-center text-center">
          <h2
            className="font-semibold tracking-[-0.02em] text-balance"
            style={{
              fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)",
              lineHeight: 1.15,
            }}
          >
            {heading}
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty sm:mt-4 sm:text-lg">
            {supportingLine}
          </p>
        </div>

        <div className="mt-10 sm:mt-14">{children}</div>
      </Container>
    </section>
  );
}
