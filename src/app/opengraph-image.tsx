import { ImageResponse } from "next/og";

import { brand, hero } from "@/content/site";

export const alt = "Novi — Work moves. Not the process.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BACKGROUND = "#F8F8F5";
const FOREGROUND = "#181A1B";
const ACCENT = "#1E7B9C";
const BORDER = "rgba(24, 26, 27, 0.12)";
const MUTED = "rgba(24, 26, 27, 0.65)";

/**
 * Fetched at build time so the card matches the site's typeface. Wrapped in a
 * try/catch on purpose: @vercel/og already bundles Geist Regular, so a network
 * hiccup during the build degrades to a slightly lighter headline rather than
 * failing the whole build over a social image.
 */
async function loadGeistSemiBold(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Geist:wght@600",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const url = css.match(/https:\/\/[^)]+\.ttf/)?.[0];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const semibold = await loadGeistSemiBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          color: FOREGROUND,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              borderRadius: 14,
              background: ACCENT,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", width: 26, gap: 4 }}>
              {[1, 0.7, 0.7, 1].map((opacity, i) => (
                <div
                  key={i}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 3,
                    background: BACKGROUND,
                    opacity,
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {brand.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            <div style={{ display: "flex" }}>{hero.headline.lead}</div>
            <div style={{ display: "flex", color: ACCENT }}>
              {hero.headline.accent}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: MUTED,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {hero.subhead}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 28,
            fontSize: 24,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex" }}>{hero.trustLine}</div>
          <div style={{ display: "flex" }}>{brand.tagline}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: semibold
        ? [{ name: "Geist", data: semibold, weight: 600, style: "normal" }]
        : undefined,
    },
  );
}
