import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Sizes are set for a landing page, not a dense app UI: `md` and `lg` clear the
 * 44px comfortable-tap-target guidance, which matters more here than density.
 *
 * Exported separately from the component so anchors can wear the same styling
 * without pretending to be buttons — CTAs on this page navigate, so they are
 * `<a>` elements with `buttonVariants()` applied.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl",
    "font-medium transition-colors duration-150 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent/45",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-foreground/[0.04]",
        ghost: "text-foreground hover:bg-foreground/[0.04]",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
