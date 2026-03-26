import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./pages/About";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Articles } from "./pages/Articles";
import { Home } from "./pages/Home";
import { Snippets } from "./pages/Snippets";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="border-t border-neutral-900 py-12 mt-20">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} kawsarcodes
            </p>
            
            <div className="flex gap-8">
              <a 
                href="https://github.com/kawsarcodes" 
                className="text-[10px] font-mono text-neutral-600 hover:text-white uppercase tracking-widest transition-colors"
              >
                github ↗
              </a>
              <a 
                href="https://youtube.com/@kawsarcodes" 
                className="text-[10px] font-mono text-neutral-600 hover:text-white uppercase tracking-widest transition-colors"
              >
                youtube ↗
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}