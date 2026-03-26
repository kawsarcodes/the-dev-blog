import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  language: string;
  value: string;
};

export function CodeBlock({ language, value }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="my-8 border border-neutral-800 bg-black overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-neutral-700" /> 
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">
            {language || "text"}
          </span>
        </div>
        
        <button
          onClick={handleCopy}
          className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-mono tracking-widest"
        >
          {isCopied ? (
            <><Check size={12} strokeWidth={3} /> DONE</>
          ) : (
            <><Copy size={12} strokeWidth={3} /> COPY</>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto text-sm leading-relaxed">
        <SyntaxHighlighter
          language={language}
          style={coldarkDark} 
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "13px",
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1.5em",
            color: "#333",
            textAlign: "right",
            userSelect: "none",
          }}
          wrapLines={true}
        >
          {value.trim()} 
        </SyntaxHighlighter>
      </div>
    </div>
  );
}