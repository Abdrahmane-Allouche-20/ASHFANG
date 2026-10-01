import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HEADQUARTERS, SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

/** The site's 1200x630 share card: brand row, headline, and a footer line. */
export async function renderOgImage({
  eyebrow,
  title,
  accent,
  text,
  footer = `Headquartered in ${HEADQUARTERS.country} · Serving clients worldwide`,
}: {
  eyebrow?: string;
  title: string;
  /** Optional second headline line, set in lilac. */
  accent?: string;
  /** Optional supporting sentence under the headline. */
  text?: string;
  footer?: string;
}) {
  const mark = await readFile(join(process.cwd(), "public/brand/mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  const big = !text;

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
          <img src={markSrc} width={62} height={76} alt="" />
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 9 }}>CYNGUARD</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#67e8f9", marginBottom: 22 }}>
              {eyebrow}
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: big ? 82 : 72,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.04,
            }}
          >
            <div>{title}</div>
            {accent && <div style={{ color: "#b9a6ff" }}>{accent}</div>}
          </div>
          {text && (
            <div style={{ marginTop: 26, fontSize: 32, lineHeight: 1.35, color: "#a3a3b8", maxWidth: 980 }}>{text}</div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a3a3b8" }}>
          <div>{footer}</div>
          <div style={{ color: "#67e8f9" }}>{SITE.url.replace(/^https:\/\//, "")}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
