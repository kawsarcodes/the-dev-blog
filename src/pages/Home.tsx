import { ArticleGrid } from "../components/articles/ArticleGrid";
import { Hero } from "../components/layout/Hero";
import { posts } from "../data/posts";

export function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tighter">LATEST POSTS</h2>
          <a href="/articles" className="text-sm font-mono text-[#a3a3a3] hover:text-white transition-colors">
            VIEW ALL -&gt;
          </a>
        </div>
        <ArticleGrid posts={posts.slice(0, 3)} />
      </section>
    </div>
  );
}
