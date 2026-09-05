import { board } from "@/content/board";
import { Container } from "@/components/ui/container";

import { Board } from "./board";

/**
 * The window-chrome frame around the board. Kept separate from `Board` itself
 * so the "browser toolbar" look isn't tangled up with the columns/cards logic.
 */
export function BoardPreview() {
  return (
    <Container className="pb-20 sm:pb-24 lg:pb-32">
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
