import { ArticleGrid } from "../components/articles/ArticleGrid";
import { posts } from "../data/posts";

export function Articles() {
  return (
    <div className="min-h-screen bg-black max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-[#a3a3a3] bg-clip-text text-transparent">
        ALL ARTICLES
      </h1>
      <p className="text-[#a3a3a3] font-mono mb-12">
        Documenting cse fundamentals, project logs, and experiments within the
        modern javascript ecosystem.
      </p>
      <ArticleGrid posts={posts} />
    </div>
  );
}
