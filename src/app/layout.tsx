import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://novi-landing-neon.vercel.app";
const TITLE = "Novi — Work moves. Not the process.";
const DESCRIPTION =
  "One place to plan, track, and decide — without a second tool to keep it running. Novi is project and task management for small, fast-moving teams.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Novi",
  },
  description: DESCRIPTION,
  applicationName: "Novi",
  keywords: [
    "project management",
    "task management",
    "sprints",
    "small teams",
    "startups",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Novi",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/*
          First focusable thing on the page. Invisible until focused, then it
          appears — without it, a keyboard user has to tab through the whole
          nav on every page load before reaching content.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:rounded-xl focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Skip to content
        </a>

        <div id="top" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
