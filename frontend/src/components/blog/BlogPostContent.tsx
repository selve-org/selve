// src/components/blog/BlogPostContent.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/markdown";
import "./blog-prose.css";

interface BlogPostContentProps {
  post: Post;
  isDimensionPost: boolean;
  otherDimensions: Post[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function BlogPostContent({ post, isDimensionPost, otherDimensions }: BlogPostContentProps) {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero Section for Dimension Posts */}
      {isDimensionPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pt-24 pb-16 px-4"
          style={{
            background: post.meta.color
              ? `linear-gradient(135deg, ${post.meta.color}20, ${post.meta.color}05)`
              : "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(147, 51, 234, 0.02))",
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="text-7xl mb-6 block"
            >
              {post.meta.emoji || "✨"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
            >
              {post.meta.title}
            </motion.h1>
            {post.meta.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                {post.meta.description}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

      {/* Regular Header for Non-Dimension Posts */}
      {!isDimensionPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-24 pb-8 px-4"
        >
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="text-purple-600 dark:text-purple-400 hover:underline mb-4 inline-block"
            >
              ← Back to Blog
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.meta.title}</h1>
            {post.meta.date && (
              <time className="text-muted-foreground">
                {new Date(post.meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-4 pb-16"
      >
        <div
          className="blog-prose max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </motion.article>

      {/* Related Dimensions */}
      {isDimensionPost && otherDimensions.length > 0 && (
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="px-4 pb-16"
        >
          <div className="max-w-3xl mx-auto">
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-semibold text-foreground mb-6"
            >
              Explore Other Dimensions
            </motion.h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherDimensions.map((dim, index) => (
                <motion.div
                  key={dim.slug}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${dim.slug}`}
                    className="group flex items-center gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {dim.meta.emoji || "✨"}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {dim.meta.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {dim.meta.description || ""}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeInUp} className="mt-8 text-center">
              <Link
                href="/blog"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                View All Dimensions →
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}
    </main>
  );
}
