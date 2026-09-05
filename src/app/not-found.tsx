import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <p className="text-sm font-medium text-accent tabular-nums">404</p>

        <h1
          className="mt-3 max-w-[20ch] font-semibold tracking-[-0.02em] text-balance"
          style={{ fontSize: "clamp(1.75rem, 4vw + 0.5rem, 3rem)", lineHeight: 1.1 }}
        >
          That page moved, or never existed.
        </h1>

        <p className="mt-4 max-w-[46ch] text-muted-foreground text-pretty">
          Either way, nothing here is lost — the board is still where you left
          it.
        </p>

        <Link
          href="/"
          className={cn(buttonVariants({ size: "lg" }), "group mt-8")}
        >
          <ArrowLeft
            aria-hidden
            className="transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
          />
          Back to Novi
        </Link>
      </Container>
    </main>
  );
}
