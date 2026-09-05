import { cn } from "@/lib/utils";

/**
 * Caps line length and centres content while the background stays full-bleed.
 * Without this the layout stretches unreadably on 2560px displays — the width
 * most often missed.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    />
  );
}
