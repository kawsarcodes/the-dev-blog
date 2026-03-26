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
          <Link
            to="/"
            className="flex items-center gap-3 font-mono font-bold text-xl tracking-tighter group"
          >
            <svg
              viewBox="0 0 100 100"
              width="28"
              height="28"
              className="fill-white"
            >
              <path d="M33.904 34.497a3.38 3.38 0 0 0-.99-2.39l-4.78-4.78a3.381 3.381 0 0 0-4.782 0L3.787 46.892a4.396 4.396 0 0 0 0 6.216l19.565 19.565a3.38 3.38 0 0 0 4.78.001l4.78-4.78a3.381 3.381 0 0 0 0-4.781L19.8 50l13.114-13.112a3.38 3.38 0 0 0 .99-2.391z" />
              <path d="M74.257 26.336c-.896 0-1.756.356-2.39.99l-4.78 4.78a3.381 3.381 0 0 0 0 4.781L80.2 50 67.086 63.112a3.38 3.38 0 0 0 0 4.78l4.78 4.78v.002a3.381 3.381 0 0 0 4.782 0l19.565-19.565a4.396 4.396 0 0 0 0-6.217L76.648 27.326a3.38 3.38 0 0 0-2.39-.99z" />
              <path d="M59.44 9.433h-6.483a3.378 3.378 0 0 0-3.334 2.825L37.227 86.63a3.377 3.377 0 0 0 3.335 3.937h6.482a3.377 3.377 0 0 0 3.335-2.825L62.774 13.37a3.379 3.379 0 0 0-3.334-3.937z" />
            </svg>
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

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-[#a3a3a3] hover:text-white transition-colors p-2"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
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
                      className="w-24 h-24 aspect-square object-cover rounded-xl border border-[#262626] grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <ul className="space-y-3 font-mono text-xs flex flex-col">
                        <li>
                          <a
                            href="https://kawsar.dev"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            PORTFOLIO →
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/@kawsarcodes"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            YOUTUBE →
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://github.com/kawsarcodes"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            GITHUB →
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://linkedin.com/in/mdkawsarahmed"
                            className="text-[#a3a3a3] hover:text-white transition-colors"
                          >
                            LINKEDIN →
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