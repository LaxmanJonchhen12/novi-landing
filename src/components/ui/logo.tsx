import { brand } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" className="text-accent-foreground" />
          <rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor" className="text-accent-foreground/70" />
          <rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor" className="text-accent-foreground/70" />
          <rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" className="text-accent-foreground" />
        </svg>
      </span>
      <span className="text-[0.975rem] font-semibold tracking-tight">
        {brand.name}
      </span>
    </span>
  );
}
