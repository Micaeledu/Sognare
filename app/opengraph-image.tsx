import { ImageResponse } from "next/og";
import { brand } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0b2334 0%, #123249 55%, #0b2334 100%)",
          color: "#f5f1ea",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, letterSpacing: 4 }}>
          {brand.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#ceb998",
            letterSpacing: 2,
          }}
        >
          {`Marcenaria de alto padrão em ${brand.city}`}
        </div>
      </div>
    ),
    size,
  );
}
