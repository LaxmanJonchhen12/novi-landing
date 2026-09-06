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
  tinted,
  className,
  children,
}: {
  id: string;
  heading: string;
  supportingLine: string;
  /**
   * Phase 2 (elevation pass): a full-bleed `bg-foreground/[0.02]` ground —
   * the same treatment the board's frame already uses, just spent on a whole
   * section instead of one component. Reserved for exactly one section on
   * the page (currently Features) — the point is one change of rhythm, not
   * a second background pattern competing with the first.
   *
   * The tint lives on an INNER wrapper, not the `<section>` itself — see the
   * note below on why that matters.
   */
  tinted?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const content = (
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
  );

  return (
    // Top padding ONLY. If every section padded both sides, two adjacent
    // sections would each pay for the same gap and it would come out double
    // the spacing used everywhere else (measured: 180px between sections vs
    // 94px between the board and the first section). One direction keeps the
    // rhythm uniform. The footer owns the bottom of the page.
    <section id={id} className={cn("pt-12 md:pt-24", className)}>
      {tinted ? (
        // The tint is on THIS wrapper, not the `<section>` itself: the
        // section's own pt-12/pt-24 above stays plain white, so the colour
        // change gets a real gap before it starts rather than beginning
        // flush against whatever border sits just above it (the first cut
        // of this collided visibly with the board frame's own border).
        // py-10/py-14 gives the tint matching breathing room of its own on
        // BOTH sides — this is intentionally NOT the same "top padding only"
        // rule as the inter-section gap above; that rule governs the white
        // space BETWEEN sections, this is the internal frame of one colored
        // zone, same category as the board frame's own internal padding.
        <div className="bg-foreground/[0.02] py-10 sm:py-14">{content}</div>
      ) : (
        content
      )}
    </section>
  );
}
