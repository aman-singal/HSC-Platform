"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Compliance", href: "/compliance" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { 
    name: "Featured", 
    isDropdown: true,
    children: [
      { name: "Blog", href: "/blog" },
      { name: "Live Prices", href: "/price" }
    ]
  },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch and premature state updates

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex items-center h-24 px-6 lg:px-12",
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b justify-between border-divider shadow-sm"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="HSC Logo" className="h-16 md:h-20 w-auto object-contain transition-transform hover:scale-105" />
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div 
                  key={link.name} 
                  className="relative group py-2"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="text-sm font-medium text-body hover:text-heading transition-colors flex items-center gap-1 focus:outline-none">
                    {link.name}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-divider py-2 overflow-hidden"
                      >
                        {link.children?.map(child => (
                           <Link 
                             key={child.name} 
                             href={child.href}
                             className="block px-6 py-3 text-sm font-medium text-body hover:bg-layer-light hover:text-corporate-blue transition-colors"
                           >
                             {child.name}
                           </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            return (
              <Link
                key={link.name}
                href={link.href!}
                className="text-sm font-medium text-body hover:text-heading transition-colors relative group"
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-corporate-blue scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            )
          })}
        </nav>

        <div className="flex-1 flex justify-end">
          <Link href="/pricing" className="hidden md:inline-flex">
            <Button variant="premium">
              Get Scrap Price
            </Button>
          </Link>
          
          <button 
            className="md:hidden p-2 -mr-2 text-heading focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 pb-12 px-6 flex flex-col md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-xl font-medium text-heading">
              {navLinks.map((link) => {
                if (link.isDropdown) {
                  return (
                    <div key={link.name} className="flex flex-col space-y-4 border-b border-divider pb-4">
                      <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">{link.name}</span>
                      <div className="flex flex-col space-y-4 pl-4">
                        {link.children?.map(child => (
                           <Link
                             key={child.name}
                             href={child.href}
                             onClick={() => setMobileMenuOpen(false)}
                             className="text-lg"
                           >
                             {child.name}
                           </Link>
                        ))}
                      </div>
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className="border-b border-divider pb-4"
                  >
                    {link.name}
                  </Link>
                )
              })}
              <Link href="/pricing" className="mt-8 w-full max-w-sm mx-auto" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="premium" className="w-full">
                  Get Scrap Price
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
