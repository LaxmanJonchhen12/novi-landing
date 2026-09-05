import { board } from "@/content/board";
import { Container } from "@/components/ui/container";

import { Board } from "./board";

/**
 * The window-chrome frame around the board. Kept separate from `Board` itself
 * so the "browser toolbar" look isn't tangled up with the columns/cards logic.
 */
export function BoardPreview() {
  return (
    // No bottom padding on purpose. The board closes the hero unit, and the
    // spacing to whatever follows is owned entirely by the next `Section`'s
    // own py-12/py-24 rhythm. Paying for that gap in both places is what made
    // it 221px at desktop.
    <Container>
      <div className="animate-[rise_0.8s_ease-out_both] overflow-hidden rounded-xl border border-border bg-foreground/[0.02] [animation-delay:420ms]">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </span>
          <p className="flex-1 text-center text-sm text-muted-foreground">
            {board.name}
          </p>
          <span aria-hidden className="w-[52px]" />
        </div>

        <Board />
      </div>
    </Container>
  );
}
