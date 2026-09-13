import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  title: string;
  createdAt: string;
  github: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
  };
  summary: string;
  content: string;
  isFeatured?: boolean;
};

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

function readProjects(): Project[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title,
      createdAt: data.createdAt,
      github: data.github,
      tags: data.tags ?? [],
      image: { src: data.image, alt: data.imageAlt ?? "" },
      summary: data.summary,
      content,
      isFeatured: data.isFeatured ?? false,
    } satisfies Project;
  });

  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const projects = readProjects();
export const featuredProjects = projects.filter((p) => p.isFeatured);
