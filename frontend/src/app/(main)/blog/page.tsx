// src/app/(main)/blog/page.tsx
import Link from "next/link";
import { getAllPosts, getDimensionPosts } from "@/lib/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | SELVE",
  description: "Explore the science of personality, the 8 SELVE dimensions, and insights for personal growth.",
};

export default async function BlogIndex() {
  const allPosts = await getAllPosts();
  const dimensionPosts = await getDimensionPosts();
  const otherPosts = allPosts.filter((post) => !post.slug.startsWith("dimensions/"));

  return (
    <main className="bg-background text-foreground min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Explore the science of personality and insights for personal growth.
        </p>

        {/* Dimension Deep Dives */}
        {dimensionPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span>🎭</span> The 8 Dimensions
            </h2>
            <p className="text-muted-foreground mb-8">
              Deep dives into each of the SELVE personality dimensions.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {dimensionPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{post.meta.emoji || "✨"}</span>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.meta.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.meta.description || "Explore this SELVE dimension."}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Latest Posts
            </h2>
            <ul className="space-y-8">
              {otherPosts.map((post) => (
                <li key={post.slug} className="border-b border-neutral-200 dark:border-neutral-800 pb-8 last:border-0">
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                      {post.meta.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {post.meta.description || ""}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {post.meta.date && (
                        <time>{new Date(post.meta.date).toLocaleDateString("en-US", { 
                          year: "numeric", 
                          month: "long", 
                          day: "numeric" 
                        })}</time>
                      )}
                      {post.meta.tags && (
                        <div className="flex gap-2">
                          {post.meta.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Empty State */}
        {allPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
