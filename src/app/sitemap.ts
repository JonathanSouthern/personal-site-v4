import type { MetadataRoute } from "next";
import { allPosts, allProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, priority: 1 },
    { url: `${site.url}/work` },
    { url: `${site.url}/words` },
  ];
  const projects = allProjects().map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: project.date,
  }));
  const posts = allPosts().map((post) => ({
    url: `${site.url}/words/${post.slug}`,
    lastModified: post.date,
  }));
  return [...pages, ...projects, ...posts];
}
