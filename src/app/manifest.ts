import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Cybersecurity products and services`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "browser",
    background_color: "#07070b",
    theme_color: "#07070b",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-square-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
