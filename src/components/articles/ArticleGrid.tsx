import { BlogPost } from "@/data/posts";
import { Link } from "react-router-dom";

type Props = {
  posts: BlogPost[];
};

export function ArticleGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-neutral-800">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/articles/${post.id}`}
          className="group block p-6 border-b border-r border-neutral-800 bg-black hover:bg-[#0d0d0d] transition-colors"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-mono text-neutral-500 border border-neutral-800 px-2 py-0.5"
              >
                [{tag}]
              </span>
            ))}
          </div>
          
          <h2 className="text-xl font-bold mb-3 group-hover:text-white text-neutral-200 tracking-tight">
            {post.title}
          </h2>
          
          <p className="text-neutral-500 text-sm leading-relaxed mb-6">
            {post.description}
          </p>
          
          <div className="text-[11px] font-mono text-neutral-600 mt-auto uppercase">
            {post.date} 
          </div>
        </Link>
      ))}
    </div>
  );
}