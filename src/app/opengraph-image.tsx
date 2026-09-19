import { ImageResponse } from "next/og";
import { guarantee, site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Train & Scale — Done-For-You Client Acquisition";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#05070a",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(79,143,247,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#4f8ff7",
            marginBottom: 28,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 600,
            color: "#eef4fb",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {guarantee.headline}
        </div>
        <div style={{ fontSize: 26, color: "#93a3b8", marginTop: 28, maxWidth: 820 }}>
          {site.mission}
        </div>
      </div>
    ),
    { ...size }
  );
}
