import { getBlogPosts } from "./blog/utils";

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinjones.me";

const staticRoutes = [
  "",
  "/about",
  "/blog",
  "/game",
  "/history",
  "/projects",
  "/releases",
  "/palantir",
  "/vinos",
] as const;

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogs];
}
