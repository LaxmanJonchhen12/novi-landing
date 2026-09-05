import { navCta, navLinks } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

import { HeaderShell } from "./header-shell";
import { MobileNav } from "./mobile-nav";

/**
 * Server Component. Nothing here ships to the browser — the only client code
 * in the header is HeaderShell's scroll observer and the mobile menu.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          aria-label="Novi, back to top"
          className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={navCta.href}
          className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
        >
          {navCta.label}
        </a>

        <MobileNav />
      </Container>
    </HeaderShell>
  );
}
