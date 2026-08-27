"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen pt-24 md:pt-32 pb-12 overflow-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex-1 flex flex-col lg:flex-row relative">
        
        {/* ============================== */}
        {/* RIGHT COLUMN (Image): Mobile First */}
        {/* ============================== */}
        <div className="w-full lg:w-[55%] relative z-0 flex items-center justify-center lg:h-full order-1 lg:order-2 mt-8 lg:mt-0 overflow-hidden lg:overflow-visible rounded-b-3xl lg:rounded-none">
          <motion.div style={{ y: yRight, opacity }} className="relative w-full h-[350px] sm:h-[450px] lg:h-full flex items-center justify-center">
            
            {/* The Large Background Circle */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:right-12 lg:w-[600px] lg:h-[600px] bg-[#F5F5F5] rounded-full z-0"
            />
            
            {/* The Portrait Cutout */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[250px] h-[350px] sm:w-[350px] sm:h-[450px] lg:w-[600px] lg:h-[800px] flex items-end justify-center lg:translate-x-12 lg:translate-y-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/hero-portrait.png" 
                alt="Kelvin Marcello" 
                className="w-full h-full object-contain object-bottom pointer-events-none"
                style={{
                  maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Fade Overlay for Mobile Parallax Smoothing (Container Bottom) */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-20 lg:hidden pointer-events-none" />
        </div>

        {/* ============================== */}
        {/* LEFT COLUMN: Content */}
        {/* ============================== */}
        <motion.div 
          style={{ y: yLeft, opacity }} 
          className="w-full lg:w-[45%] flex flex-col justify-center relative z-10 lg:pr-8 mt-8 lg:mt-0 order-2 lg:order-1 pb-12 lg:pb-0"
        >
          
          {/* Left Vertical Line */}
          <div className="absolute left-0 top-12 bottom-32 w-px bg-foreground/20 hidden lg:block" />

          <div className="lg:pl-8 flex flex-col h-full justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] md:text-xs font-semibold text-foreground/60 mb-6 tracking-[0.2em] uppercase">
                Full Stack Developer
              </p>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-[100px] font-bold tracking-[-0.03em] mb-6 text-foreground leading-[0.95]">
                Kelvin<br/>Marcello
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg md:text-xl text-foreground/80 font-medium leading-[1.6] max-w-md mb-10">
                I build web applications, solve real problems, and craft clean user experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col space-y-6 mb-16"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center space-x-2 text-[15px] font-medium px-8 py-4 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors w-full sm:w-auto"
                >
                  <span>View My Work</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="#about"
                  className="text-[15px] font-medium text-foreground hover:text-foreground/70 transition-colors relative inline-block text-center sm:text-left"
                >
                  About Me
                  <span className="absolute left-0 right-0 -bottom-1 h-px bg-foreground/30"></span>
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="/CV.pdf"
                  target="_blank"
                  download
                  className="group inline-flex items-center justify-center space-x-2 text-[11px] font-semibold tracking-widest uppercase px-6 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto"
                >
                  <span>Download CV</span>
                </a>
                <a
                  href="/Portfolio.pdf"
                  target="_blank"
                  download
                  className="group inline-flex items-center justify-center space-x-2 text-[11px] font-semibold tracking-widest uppercase px-6 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto"
                >
                  <span>Download Portfolio</span>
                </a>
              </div>
            </motion.div>

            {/* Based In */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-auto lg:mb-0"
            >
              <p className="text-[10px] font-semibold tracking-[0.15em] text-foreground/50 uppercase mb-2">
                Based In
              </p>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground"></span>
                <span className="text-base font-medium">Indonesia</span>
              </div>
            </motion.div>

            {/* Social Icons (Mobile / Tablet bottom, Desktop bottom-left) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-16 lg:mt-24 flex items-center space-x-6 text-foreground/80"
            >
              <a href="https://github.com/akirausethis" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17 0-1.56-.56-2.9-1.5-3.9.15-.38.65-1.84-.15-3.84 0 0-1.2-.38-3.9 1.45a13.3 13.3 0 0 0-7 0c-2.7-1.83-3.9-1.45-3.9-1.45-.8 2-.3 3.46-.15 3.84-1 .1-1.5.8-1.5 1.5 0 5.77 3.35 6.79 6.5 7.17a4.8 4.8 0 0 0-1 3.03v4"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="mailto:akirabusinessinq@gmail.com" className="hover:text-foreground transition-colors">
                <Mail className="w-6 h-6" strokeWidth={1.5} />
              </a>
            </motion.div>
          </div>
        </motion.div>
        
        {/* ============================== */}
        {/* FAR RIGHT: Editorial Markers */}
        {/* ============================== */}
        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-3xl font-heading font-medium mb-6 tracking-tight">01</span>
            <div className="w-px h-24 bg-foreground/30 mb-6" />
            <span 
              className="text-[10px] font-semibold tracking-[0.2em] text-foreground/60 uppercase"
              style={{ writingMode: 'vertical-rl' }}
            >
              Introduction
            </span>
          </motion.div>
        </div>

        {/* ============================== */}
        {/* BOTTOM RIGHT: Scroll Indicator */}
        {/* ============================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-8 md:right-12 bottom-12 flex flex-col items-center z-20"
        >
          <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center mb-3">
            <ArrowDown className="w-5 h-5 text-foreground animate-bounce" strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-foreground/60">
            Scroll
          </span>
        </motion.div>

      </div>
    </section>
  );
}
