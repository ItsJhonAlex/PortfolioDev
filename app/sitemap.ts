import type { MetadataRoute } from "next";
import { locales } from "@/config";

const BASE_URL = "https://itsjhonalex.is-a.dev";
const LAST_MODIFIED = new Date("2026-05-23");

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/en`,
      },
    },
  }));
}
