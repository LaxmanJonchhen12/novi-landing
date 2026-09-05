import {
  copyright,
  footerGroups,
  legalLinks,
  newsletter,
  socialLinks,
} from "@/content/footer";
import { brand } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

import { SOCIAL_ICONS } from "./social-icons";
import { SubscribeForm } from "./subscribe-form";

/**
 * Server Component — only the signup form below is client code.
 *
 * Brings its own top padding: `Section` pads only its top, so the last
 * section has no bottom and the footer closes the page.
 */
export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border pt-12 pb-10 md:mt-24 md:pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">{brand.tagline}</p>

            <h2 className="mt-8 text-sm font-medium">{newsletter.heading}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {newsletter.description}
            </p>
            <SubscribeForm />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {footerGroups.map((group) => (
              <div key={group.heading}>
                <h2 className="text-sm font-medium">{group.heading}</h2>
                <ul className="mt-3 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="rounded text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-6 border-t border-border pt-6 sm:flex-row sm:justify-between sm:gap-4">
          <p className="text-xs text-muted-foreground">{copyright}</p>

          <div className="flex items-center gap-5 sm:gap-6">
            <ul className="flex items-center gap-1">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.icon}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-lg text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded text-xs text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
