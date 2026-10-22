import type { MetadataRoute } from "next";

const staticRoutes = ["/", "/templates", "/ai-builder", "/pricing", "/login", "/signup"];

/**
 * Absolute URLs for crawlers. Set SITE_URL in production
 * (e.g. https://weblith.vercel.app) — falls back to localhost
 * during local development.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified,
  }));
}
