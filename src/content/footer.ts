import type { FooterGroup, SocialLink } from "./types";

export const footerGroups = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Sprints", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Import from Jira", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Security", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
] as const satisfies readonly FooterGroup[];

export const newsletter = {
  heading: "Changelog, once a month",
  description: "What shipped, what's next. No drip sequence.",
  placeholder: "you@team.com",
  buttonLabel: "Subscribe",
} as const;

export const socialLinks = [
  { label: "Novi on X", href: "#", icon: "x" },
  { label: "Novi on GitHub", href: "#", icon: "github" },
  { label: "Novi on LinkedIn", href: "#", icon: "linkedin" },
] as const satisfies readonly SocialLink[];

export const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
] as const;

export const copyright = `© ${new Date().getFullYear()} Novi. All rights reserved.`;
