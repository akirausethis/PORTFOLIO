"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Menu, X, ArrowUpRight, Briefcase, User, GraduationCap, MessageSquare } from "lucide-react";

const navItems = [
  { name: "Work", href: "/#projects", description: "Projects that I did", icon: Briefcase },
  { name: "About", href: "/#about", description: "Know more about me", icon: User },
  { name: "Experience", href: "/#experience", description: "My professional journey", icon: GraduationCap },
  { name: "Contact", href: "/#contact", description: "Let's build together", icon: MessageSquare },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = navItems.map(item => item.href.replace('/#', ''));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled && !isMobileMenuOpen ? "bg-background/95 backdrop-blur-sm py-4 border-b border-border/50" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">
        {/* Logo */}
        <a href="/#home" className="font-heading font-extrabold text-2xl tracking-tight text-foreground flex-shrink-0 relative z-50">
          vinworkspace.
        </a>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('/#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                className={clsx(
                  "relative text-[15px] font-medium transition-colors duration-200",
                  isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Section (CTA) */}
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="/#contact"
            className="group flex items-center space-x-2 text-[15px] font-medium px-6 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center relative z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col px-6 md:px-12 pt-32 pb-12"
          >
            <nav className="flex flex-col space-y-6 mt-8 overflow-y-auto pb-8">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-6 p-4 rounded-2xl hover:bg-foreground/5 transition-colors group"
                  >
                    <div className="flex items-center justify-center text-foreground/80 group-hover:text-foreground transition-colors flex-shrink-0">
                      <Icon className="w-9 h-9" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-heading font-medium tracking-tight mb-1">{item.name}</h3>
                      <p className="text-sm text-foreground/60">{item.description}</p>
                    </div>
                  </motion.a>
                );
              })}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto flex flex-col space-y-8"
            >
              <div className="h-px w-full bg-border" />
              <a
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center space-x-2 text-xl font-medium px-8 py-5 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors w-full"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
