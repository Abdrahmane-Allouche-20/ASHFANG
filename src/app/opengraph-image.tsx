import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/brand/mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#07070b",
          backgroundImage:
            "radial-gradient(circle at 50% -10%, rgba(139,92,246,0.45), rgba(7,7,11,0) 60%), radial-gradient(circle at 95% 110%, rgba(34,211,238,0.22), rgba(7,7,11,0) 45%)",
          color: "#f4f4f8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={58} height={76} alt="" />
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 9 }}>CYNGUARD</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04 }}>
          <div>Think like an attacker.</div>
          <div style={{ color: "#b9a6ff" }}>Defend like an engineer.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a3a3b8" }}>
          <div>PhishNode · LeakShield · Offensive testing · Secure development</div>
          <div style={{ color: "#67e8f9" }}>{SITE.url.replace(/^https:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
