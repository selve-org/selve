// src/app/(main)/blog/[...slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, getDimensionPosts } from "@/lib/markdown";
import { Metadata } from "next";
import { BlogPostContent } from "@/components/blog/BlogPostContent";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, "").split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  
  try {
    const post = await getPostBySlug(slugPath);
    return {
      title: `${post.meta.title} | SELVE Blog`,
      description: post.meta.description || `Learn about ${post.meta.title}`,
    };
  } catch {
    return {
      title: "Post Not Found | SELVE Blog",
    };
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  
  let post;
  try {
    post = await getPostBySlug(slugPath);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const isDimensionPost = slugPath.startsWith("dimensions/");
  let otherDimensions: Awaited<ReturnType<typeof getDimensionPosts>> = [];
  
  if (isDimensionPost) {
    const allDimensions = await getDimensionPosts();
    otherDimensions = allDimensions.filter((d) => d.slug !== slugPath).slice(0, 4);
  }

  return (
    <BlogPostContent 
      post={post} 
      isDimensionPost={isDimensionPost} 
      otherDimensions={otherDimensions} 
    />
  );
}
