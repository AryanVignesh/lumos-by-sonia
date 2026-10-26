import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} | Event Management & Decor`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/lumos-wordmark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          background: "#f7f3ec",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, borderRadius: 9999, background: "#bfc7c8", opacity: 0.6, display: "flex" }} />
        <div style={{ position: "absolute", bottom: -160, left: -100, width: 460, height: 460, borderRadius: 9999, background: "#d6c3aa", opacity: 0.6, display: "flex" }} />
        <img src={logoSrc} width={580} height={312} alt="" />
        <div style={{ marginTop: 36, fontSize: 34, color: "#45573f", letterSpacing: 2, display: "flex" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
