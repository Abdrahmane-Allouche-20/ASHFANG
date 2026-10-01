import { SITE } from "@/lib/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    title: "Think like an attacker.",
    accent: "Defend like an engineer.",
    footer: "PhishNode · LeakShield · Offensive testing · Secure development",
  });
}
