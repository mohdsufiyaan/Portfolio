import type { MetadataRoute } from "next";
import { origin, projects } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projects.map((project) => ({
      url: `${origin}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.75,
    })),
    {
      url: `${origin}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
