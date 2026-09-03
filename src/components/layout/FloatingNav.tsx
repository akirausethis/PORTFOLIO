"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Menu, X, ArrowUpRight, Briefcase, User, GraduationCap, MessageSquare } from "lucide-react";

const navItems = [
  { name: "Work",       href: "/#projects",   description: "Projects that I did",       icon: Briefcase },
  { name: "About",      href: "/#about",       description: "Know more about me",        icon: User },
  { name: "Experience", href: "/#experience",  description: "My professional journey",   icon: GraduationCap },
  { name: "Contact",    href: "/#contact",     description: "Let's build together",      icon: MessageSquare },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = navItems.map((i) => i.href.replace("/#", ""));
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          // If the top of the section is anywhere in the upper half of screen, or it takes up the screen
          if (top <= 200 && bottom >= 200) current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 z-50 transition-all duration-500 flex justify-center pointer-events-none",
          isScrolled ? "top-4 lg:top-6" : "top-0 py-8 lg:py-10"
        )}
      >
        <div
          className={clsx(
            "pointer-events-auto flex items-center justify-between transition-all duration-500",
            isScrolled && !isMobileMenuOpen
              ? "px-4 py-2 lg:py-2.5 bg-background/85 backdrop-blur-xl border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full lg:w-auto w-[calc(100%-2rem)] lg:gap-10"
              : "px-6 md:px-12 w-full max-w-[1400px] bg-transparent border-transparent"
          )}
        >
          {/* ── Logo ── */}
          <a
            href="/#home"
            className={clsx(
              "font-heading font-extrabold tracking-tight flex-shrink-0 relative z-50 group",
              isScrolled && !isMobileMenuOpen ? "text-xl pl-2" : "text-2xl"
            )}
          >
            <span className="text-foreground group-hover:opacity-70 transition-opacity duration-200">vin</span>
            <span className={clsx(
              "text-foreground/40 group-hover:text-foreground transition-colors duration-200",
              isScrolled && !isMobileMenuOpen && "hidden sm:inline" // hide "workspace" on mobile when scrolled
            )}>workspace</span>
            <span className="text-foreground/30">.</span>
          </a>

          {/* ── Desktop Center Nav ── */}
          <nav className={clsx(
            "hidden lg:flex items-center gap-1.5 transition-all duration-500",
            !isScrolled && "px-4 py-2 rounded-full border border-border/60 bg-background/50 backdrop-blur-sm"
          )}>
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("/#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "relative px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200",
                    isActive
                      ? "text-background"
                      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-foreground rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop Right CTA ── */}
          <div className="hidden lg:flex items-center">
            <a
              href="/#contact"
              className={clsx(
                "group flex items-center gap-2 font-medium bg-foreground text-background rounded-full hover:bg-foreground/85 transition-all duration-300 active:scale-95",
                isScrolled && !isMobileMenuOpen ? "px-4 py-2 text-[13px]" : "px-5 py-2.5 text-[14px]"
              )}
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <div className="lg:hidden flex items-center relative z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={clsx(
                "flex items-center justify-center rounded-full border transition-all duration-300",
                isScrolled && !isMobileMenuOpen 
                  ? "w-9 h-9 border-border/40 bg-foreground/5 text-foreground" 
                  : "w-10 h-10 border-border/60 bg-background/80 text-foreground hover:bg-foreground hover:text-background"
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col px-6 md:px-12 pt-28 pb-12"
          >
            {/* Nav list */}
            <nav className="flex flex-col divide-y divide-border/50">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace("/#", "");
                return (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "group flex items-center gap-5 py-6 transition-colors",
                      isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    <div className={clsx(
                      "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300",
                      isActive
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-foreground/40 group-hover:border-foreground/30 group-hover:text-foreground"
                    )}>
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading font-semibold tracking-tight leading-none mb-1">{item.name}</h3>
                      <p className="text-sm text-foreground/40">{item.description}</p>
                    </div>
                    <ArrowUpRight className={clsx(
                      "w-5 h-5 shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                      isActive && "opacity-100"
                    )} />
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-auto flex flex-col gap-4"
            >
              <div className="h-px w-full bg-border" />
              <a
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group inline-flex items-center justify-center gap-3 text-lg font-medium px-8 py-5 bg-foreground text-background rounded-2xl hover:bg-foreground/85 transition-all duration-300 active:scale-[0.98] w-full"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <p className="text-xs text-foreground/30 text-center font-medium tracking-wide">
                akirabusinessinq@gmail.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
