"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";

import { navCta, navLinks } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { useCtaDialog } from "@/components/cta-dialog";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

/**
 * Base UI's Dialog gives us focus trap, Escape-to-close, scroll lock and the
 * correct ARIA wiring — all things that are easy to hand-roll badly.
 * Enter/exit animation rides its `data-starting-style` / `data-ending-style`
 * attributes, so it stays pure CSS.
 *
 * `nativeButton={false}` on the links is deliberate: Dialog.Close renders a
 * <button> by default, but these navigate, so an <a> is the correct element.
 * The prop tells Base UI the swap is intentional and keeps its ARIA/keyboard
 * handling correct instead of silently stripping button semantics.
 *
 * This dialog's `open` state is now controlled (was uncontrolled) rather than
 * left to Base UI: the CTA button below needs to close THIS dialog and open
 * the shared one from `cta-dialog.tsx` in the same click, which only works if
 * something outside Base UI's internal state can flip it.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const openCtaDialog = useCtaDialog();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center rounded-xl text-foreground outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-accent md:hidden"
      >
        <Menu className="size-5" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0" />

        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col border-l border-border bg-background p-5 transition-transform duration-200 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-[0.975rem] font-semibold tracking-tight">
              <Logo />
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="inline-flex size-10 items-center justify-center rounded-xl text-foreground outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Dialog.Close
                key={link.href}
                render={<a href={link.href} />}
                nativeButton={false}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.label}
              </Dialog.Close>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              // Close this menu and open the CTA dialog in the same tick —
              // two independent Dialog.Root instances, so both state updates
              // just apply together rather than one waiting on the other.
              setOpen(false);
              openCtaDialog();
            }}
            className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
          >
            {navCta.label}
          </button>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
