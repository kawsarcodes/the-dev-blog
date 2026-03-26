import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { CodeBlock } from "../components/ui/CodeBlock";
import { posts } from "../data/posts";

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center border border-neutral-800 p-12">
          <h1 className="text-4xl font-bold mb-4 uppercase">404</h1>
          <p className="text-neutral-500 font-mono mb-8 uppercase text-xs tracking-widest">Post not found</p>
          <Link to="/" className="text-white border border-neutral-800 px-4 py-2 font-mono text-xs hover:bg-neutral-900 transition-colors">
            RETURN &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-black max-w-3xl mx-auto px-6 py-16">
      <Link to="/articles" className="text-xs font-mono text-neutral-500 hover:text-white mb-12 flex items-center gap-2 uppercase tracking-widest transition-colors">
        &larr; ALL ARTICLES
      </Link>
      
      <header className="mb-12 border-b border-neutral-800 pb-12">
        <div className="flex gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-neutral-500 border border-neutral-800 px-2 py-0.5 uppercase"
            >
              [{tag}]
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1] uppercase">
          {post.title}
        </h1>

        <div className="text-[11px] font-mono text-neutral-600 uppercase tracking-[0.2em]">
          {post.date}
        </div>
      </header>

      <div className="prose prose-invert prose-p:text-neutral-400 prose-headings:text-white prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-neutral-500 max-w-none prose-p:font-mono prose-p:text-sm">
        <ReactMarkdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, "")}
                />
              ) : (
                <code {...rest} className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-xs font-mono text-neutral-200">
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}