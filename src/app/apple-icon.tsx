import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const ACCENT = "#1E7B9C";
const BACKGROUND = "#F8F8F5";

/**
 * Same mark as the logo (`Logo`) and the OG card's badge — reused here at
 * icon scale. No rounded corners on the outer square: iOS applies its own
 * mask to apple-touch-icons, so submitting a pre-rounded square would show
 * as a rounded square inside ANOTHER rounded mask, double-rounding it.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ACCENT,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", width: 152, gap: 12 }}>
          {[1, 0.7, 0.7, 1].map((opacity, i) => (
            <div
              key={i}
              style={{
                width: 70,
                height: 70,
                borderRadius: 18,
                background: BACKGROUND,
                opacity,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
