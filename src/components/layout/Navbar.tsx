import profileImg from '@/assets/kawsar.webp';
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Snippets", path: "/snippets" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav className="border-b border-[#262626] bg-black sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-mono font-bold text-xl tracking-tighter">
            THE DEV BLOG
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-mono uppercase tracking-widest transition-colors",
                  location.pathname === link.path
                    ? "text-white"
                    : "text-[#a3a3a3] hover:text-white",
                )}
              >
                [{link.name}]
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-[#a3a3a3] hover:text-white transition-colors"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-[60] md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-black border-l border-[#333] z-[70] md:hidden flex flex-col overflow-y-auto"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#a3a3a3] hover:text-white transition-colors"
                    aria-label="Close Menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col items-center gap-6 mb-12">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "text-xl font-mono uppercase tracking-widest transition-colors",
                        location.pathname === link.path
                          ? "text-white"
                          : "text-[#a3a3a3] hover:text-white",
                      )}
                    >
                      [{link.name}]
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-[#262626]">
                  <div className="flex items-center justify-center gap-6">
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="w-30 h-30  aspect-square object-cover rounded-xl border border-[#262626] grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <ul className="space-y-3 font-mono text-sm flex flex-col content-center">
                        <li>
                          <a
                            href="https://kawsar.dev"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            PORTFOLIO -&gt;
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/@kawsarcodes"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            YOUTUBE -&gt;
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://github.com/kawsarcodes"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            GITHUB -&gt;
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://linkedin.com/in/mdkawsarahmed"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            LINKEDIN -&gt;
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
