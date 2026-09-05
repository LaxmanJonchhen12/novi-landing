"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";

import { navCta, navLinks } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

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
 */
export function MobileNav() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center rounded-xl text-foreground outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-accent/45 md:hidden"
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
              className="inline-flex size-10 items-center justify-center rounded-xl text-foreground outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-accent/45"
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
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-accent/45"
              >
                {link.label}
              </Dialog.Close>
            ))}
          </nav>

          <Dialog.Close
            render={<a href={navCta.href} />}
            nativeButton={false}
            className={buttonVariants({ size: "lg", className: "mt-6 w-full" })}
          >
            {navCta.label}
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
