"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const REPO_URL = "https://github.com/LaxmanJonchhen12/novi-landing";

/**
 * Every "Start free" / "Start a board" / "Start free trial" button on the
 * page opens this one dialog, rather than each carrying its own copy of the
 * Dialog markup. Content is deliberately honest rather than a fake signup
 * flow: this is a take-home assessment, there's no product behind the
 * button, and pretending otherwise (a form that "succeeds" into nothing) is
 * exactly the kind of manufactured interaction the rest of the page avoids
 * (no invented metrics, no fake testimonials). Pointing to the actual repo
 * gives the one audience this page has — a reviewer — something genuinely
 * useful to click instead.
 *
 * State lives in Context, not on each trigger, so a click inside the mobile
 * nav's own Dialog can close THAT dialog and open this one in the same
 * event handler (see `MobileNav`) without two dialogs racing or stacking.
 */
const CtaDialogContext = createContext<(() => void) | null>(null);

export function useCtaDialog() {
  const open = useContext(CtaDialogContext);
  if (!open) throw new Error("useCtaDialog must be used within CtaDialogProvider");
  return open;
}

export function CtaDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDialog = useMemo(() => () => setOpen(true), []);

  return (
    <CtaDialogContext.Provider value={openDialog}>
      {children}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0" />

          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(26rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 transition-all duration-200 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-7">
            <Dialog.Title className="font-semibold tracking-[-0.01em]" style={{ fontSize: "1.25rem" }}>
              Novi isn&apos;t live — yet.
            </Dialog.Title>
            <Dialog.Description className="mt-2.5 text-sm/relaxed text-muted-foreground text-pretty">
              This is a concept product built for a take-home assessment, so
              there&apos;s nothing behind this button. The code, the
              animations, and the reasoning behind them are real, though —
              have a look.
            </Dialog.Description>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "md" }), "flex-1 py-2 md:py-0")}
              >
                View the code
              </a>
              <Dialog.Close className={cn(buttonVariants({ variant: "outline", size: "md" }), "flex-1 py-2 md:py-0")}>
                Close
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </CtaDialogContext.Provider>
  );
}
