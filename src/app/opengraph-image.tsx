import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Sibylab — IA y software a medida en Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  let logoSrc: string | null = null;
  try {
    const bytes = await readFile(join(process.cwd(), "public", "brand", "logo.png"));
    logoSrc = `data:image/png;base64,${bytes.toString("base64")}`;
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "radial-gradient(circle at 85% 15%, #5c1f6d 0%, #150c1d 55%)",
          color: "#f6f1fa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} width={120} height={120} alt="" style={{ borderRadius: 24 }} />
          ) : null}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, color: "#3fbfb2", letterSpacing: 6, fontWeight: 600 }}>SIBYLAB</div>
            <div style={{ fontSize: 28, color: "#d7c3e0", marginTop: 8 }}>We Build What’s Next.</div>
          </div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 48, lineHeight: 1.1, maxWidth: 900 }}>
          IA y software a medida en Chile
        </div>
        <div style={{ fontSize: 30, marginTop: 24, color: "#d7c3e0", maxWidth: 860 }}>
          Automatización con inteligencia artificial para recuperar el tiempo de tu equipo.
        </div>
      </div>
    ),
    size,
  );
}
