export function Hero() {
  return (
    <section className="py-24 md:py-32 border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
          MODERN STACK <br className="hidden md:block" />
          <span className="text-emerald-400">REACT, NEXT.JS & NODE.</span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl font-mono leading-relaxed lowercase bg-gradient-to-b from-white to-[#a3a3a3] bg-clip-text text-transparent">
          documenting my journey in the javascript ecosystem. sharing snippets,
          project logs, and cse fundamentals.
        </p>
      </div>
    </section>
  );
}
