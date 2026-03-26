import profileImg from '@/assets/kawsar.webp';

export function About() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          <div className="shrink-0 w-full md:w-64">
            <img
              src={profileImg}
              alt="Md. Kawsar Ahmed"
              className="w-full md:w-64 aspect-square object-cover rounded-xl border border-[#262626] grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-5xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-[#a3a3a3] bg-clip-text text-transparent">
              ABOUT
            </h1>

            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed max-w-2xl font-mono">
               <p>
                I'm a Full Stack Developer focused on building high performance
                web applications using React, Next.js, and Node.js.
              </p>
              <p>
                This blog is where I share deep technical dives, architectural
                patterns, and practical code snippets.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-neutral-900">
          <h2 className="text-[10px] font-bold tracking-[0.3em] text-neutral-600 mb-8 uppercase">
            Connect
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "portfolio", url: "https://kawsar.dev" },
              { label: "youtube", url: "https://www.youtube.com/@kawsarcodes" },
              { label: "github", url: "https://github.com/kawsarcodes" },
              { label: "linkedin", url: "https://linkedin.com/in/mdkawsarahmed" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="group flex items-center justify-between p-4 border border-neutral-900 hover:border-white transition-colors"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-white">
                  {link.label}
                </span>
                <span className="text-neutral-700 group-hover:text-white">-&gt;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}