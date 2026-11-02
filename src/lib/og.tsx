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
  /** Optional second headline line, set in the brand red. */
  accent?: string;
  /** Optional supporting sentence under the headline. */
  text?: string;
  footer?: string;
}) {
  const mark = await readFile(join(process.cwd(), "public/logo title without bg.png"));
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
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 50% -10%, rgba(219,2,16,0.3), rgba(0,0,0,0) 60%), radial-gradient(circle at 95% 110%, rgba(192,192,192,0.16), rgba(0,0,0,0) 45%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={250} height={52} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#db0210", marginBottom: 22 }}>
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
            {accent && <div style={{ color: "#db0210" }}>{accent}</div>}
          </div>
          {text && (
            <div style={{ marginTop: 26, fontSize: 32, lineHeight: 1.35, color: "#c0c0c0", maxWidth: 980 }}>{text}</div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#c0c0c0" }}>
          <div>{footer}</div>
          <div style={{ color: "#db0210" }}>{SITE.url.replace(/^https:\/\//, "")}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
