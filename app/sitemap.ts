import type { MetadataRoute } from "next";
import { company, navItems } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...navItems.map((item) => item.href)].map((path) => ({
    url: `${company.websiteHref}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
