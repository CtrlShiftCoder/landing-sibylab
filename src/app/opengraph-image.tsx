import { ImageResponse } from "next/og";

export const alt = "Sibylab — We Build What’s Next.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "radial-gradient(circle at 80% 20%, #5c1f6d 0%, #150c1d 55%)", color: "#f6f1fa" }}>
        <div style={{ fontSize: 40, color: "#3fbfb2", letterSpacing: 4 }}>SIBYLAB</div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 20 }}>We Build What’s Next.</div>
        <div style={{ fontSize: 34, marginTop: 24, color: "#d7c3e0" }}>Inteligencia artificial, automatización y software a medida.</div>
      </div>
    ),
    size,
  );
}
