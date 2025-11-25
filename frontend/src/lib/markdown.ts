// src/lib/markdown.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  author?: string;
  image?: string;
  dimension?: string;
  emoji?: string;
  color?: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  contentHtml: string;
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    return getAllFilesRecursively(postsDirectory);
  } catch {
    return [];
  }
}

function getAllFilesRecursively(dir: string, basePath = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...getAllFilesRecursively(path.join(dir, entry.name), relativePath));
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      files.push(relativePath);
    }
  }
  
  return files;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  // Handle nested paths (e.g., "dimensions/lumen")
  const realSlug = slug.replace(/\.mdx?$/, "");
  const mdPath = path.join(postsDirectory, `${realSlug}.md`);
  const mdxPath = path.join(postsDirectory, `${realSlug}.mdx`);
  
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: realSlug,
    meta: data as PostMeta,
    contentHtml,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  if (slugs.length === 0) return [];
  
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug.replace(/\.mdx?$/, "")))
  );
  
  // Sort by date, newest first
  return posts.sort((a, b) => 
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.meta.tags?.includes(tag));
}

export async function getDimensionPosts(): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.slug.startsWith("dimensions/"));
}
