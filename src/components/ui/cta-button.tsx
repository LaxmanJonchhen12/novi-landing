"use client";

import { useCtaDialog } from "@/components/cta-dialog";

import { Button } from "./button";

type CtaButtonProps = { label: string } & Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "children"
>;

/**
 * A "Start free" / "Start a board" / "Start free trial" trigger. Renders as a
 * real `<button>` rather than the `<a href="#">` these used to be — `href="#"`
 * was never correct semantics for "open a dialog," and a real button is also
 * what makes the mobile nav able to close itself and hand off to this dialog
 * cleanly (see `cta-dialog.tsx`).
 */
export function CtaButton({ label, ...props }: CtaButtonProps) {
  const openDialog = useCtaDialog();

  return (
    <Button onClick={openDialog} {...props} className="cursor-pointer">
      {label}
    </Button>
  );
}
