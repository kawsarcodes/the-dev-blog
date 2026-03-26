import { CodeBlock } from "../components/ui/CodeBlock";
import { snippets } from "../data/snippets";

export function Snippets() {
  return (
    <div className="min-h-screen bg-black max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tighter mb-4">SNIPPETS</h1>
      <p className="text-[#a3a3a3] font-mono mb-12">
       A collection of utility functions, config files, and reusable logic designed for efficient development.
      </p>
      
      <div className="flex flex-col gap-12">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="border-t border-[#262626] pt-8">
            <h2 className="text-2xl font-bold mb-2 tracking-tight">{snippet.title}</h2>
            <p className="text-[#a3a3a3] text-sm mb-4">{snippet.description}</p>
            <CodeBlock language={snippet.language} value={snippet.code} />
          </div>
        ))}
      </div>
    </div>
  );
}
