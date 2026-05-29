import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogMeta } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        slug: file.replace(/\.mdx$/, ""),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): {
  meta: BlogMeta;
  content: string;
} | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      slug,
    },
    content,
  };
}
