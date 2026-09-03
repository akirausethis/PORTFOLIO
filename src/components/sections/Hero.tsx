"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";
import { SiGithub, SiNextdotjs, SiReact, SiTypescript } from "@icons-pack/react-simple-icons";

const roles = ["Software Engineer", "Frontend Developer", "AI Integrator"];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yRight  = useTransform(scrollYProgress, [0, 1], ["0%",  "30%"]);
  const yLeft   = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Cycling role text
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen pt-24 md:pt-32 pb-12 overflow-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex-1 flex flex-col lg:flex-row relative">

        {/* ── RIGHT COLUMN: Portrait ── */}
        <div className="w-full lg:w-[55%] relative z-0 flex items-center justify-center lg:h-full order-1 lg:order-2 mt-8 lg:mt-0 overflow-hidden lg:overflow-visible rounded-b-3xl lg:rounded-none">
          <motion.div style={{ y: yRight, opacity: imgOpacity }} className="relative w-full h-[350px] sm:h-[450px] lg:h-full flex items-center justify-center">

            {/* Background circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:right-12 lg:w-[600px] lg:h-[600px] bg-foreground/[0.03] rounded-full z-0"
            />

            {/* Subtle orbit ring with orbiting nodes — desktop only */}
            <motion.div
              style={{ rotate: ringRotate }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              className="hidden lg:block absolute right-12 w-[680px] h-[680px] rounded-full border border-dashed border-foreground/15 z-0"
            >
              {/* Node 1: React */}
              <div className="absolute top-[10%] left-[10%] w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-sm -translate-x-1/2 -translate-y-1/2">
                <SiReact className="w-5 h-5 text-foreground/40" />
              </div>
              {/* Node 2: Next.js */}
              <div className="absolute top-[10%] right-[10%] w-14 h-14 bg-background border border-border rounded-full flex items-center justify-center shadow-sm translate-x-1/2 -translate-y-1/2">
                <SiNextdotjs className="w-6 h-6 text-foreground/40" />
              </div>
              {/* Node 3: TypeScript */}
              <div className="absolute bottom-[5%] left-[25%] w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-sm -translate-x-1/2 translate-y-1/2">
                <SiTypescript className="w-4 h-4 text-foreground/40" />
              </div>
            </motion.div>

            {/* Portrait */}
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
                  WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* Floating status card — desktop only */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex absolute bottom-40 left-8 items-center gap-4 p-4 bg-background/80 backdrop-blur-md border border-border/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-20"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="pr-2">
                <p className="text-sm font-semibold text-foreground tracking-tight leading-none mb-1">Available for work</p>
                <p className="text-xs text-foreground/50 font-medium tracking-wide">Internship · Full-time</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-20 lg:hidden pointer-events-none" />
        </div>

        {/* ── LEFT COLUMN: Content ── */}
        <motion.div
          style={{ y: yLeft }}
          className="w-full lg:w-[45%] flex flex-col justify-center relative z-10 lg:pr-8 mt-8 lg:mt-0 order-2 lg:order-1 pb-12 lg:pb-0"
        >
          {/* Left vertical line */}
          <div className="absolute left-0 top-12 bottom-32 w-px bg-foreground/10 hidden lg:block" />

          <div className="lg:pl-8 flex flex-col h-full justify-center">

            {/* Role pill with cycling text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex items-center"
            >
              <span className="flex items-center gap-2.5 text-[11px] font-bold text-foreground/60 tracking-[0.2em] uppercase border border-border/80 rounded-full px-5 py-2.5 bg-foreground/[0.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[56px] sm:text-[72px] md:text-[88px] lg:text-[110px] font-bold tracking-tight mb-6 text-foreground leading-[0.9]"
            >
              Kelvin<br />Marcello<span className="text-foreground/20">.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-foreground/60 font-light leading-relaxed max-w-[400px] mb-10"
            >
              I engineer robust web applications, solve complex problems, and craft precise user experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col space-y-4 mb-12"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-8 py-4 bg-foreground text-background rounded-full hover:bg-foreground/85 transition-all duration-300 active:scale-[0.98] w-full sm:w-auto"
                >
                  <span>Explore Work</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="/CV.pdf"
                  target="_blank"
                  download
                  className="inline-flex items-center justify-center gap-2 text-[15px] font-medium px-8 py-4 border-2 border-border/80 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 active:scale-[0.98] w-full sm:w-auto text-foreground"
                >
                  Download CV
                </a>
              </div>
            </motion.div>

            {/* Location + socials row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <div className="flex items-center gap-2.5 text-foreground/50 bg-foreground/5 px-4 py-2 rounded-full border border-border/50">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold tracking-wide uppercase">Surabaya, ID</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/akirausethis"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-border/80 text-foreground/50 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <SiGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/kelvinmarcello"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-border/80 text-foreground/50 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* ── FAR RIGHT: Section marker ── */}
        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="text-2xl font-heading font-medium mb-6 tracking-tight text-foreground/20">01</span>
            <div className="w-px h-24 bg-foreground/10 mb-6" />
            <span
              className="text-[10px] font-semibold tracking-[0.2em] text-foreground/40 uppercase"
              style={{ writingMode: "vertical-rl" }}
            >
              Introduction
            </span>
          </motion.div>
        </div>

        {/* ── BOTTOM: Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute right-8 md:right-12 bottom-12 flex flex-col items-center z-20 gap-3"
        >
          <div className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center">
            <ArrowDown className="w-4 h-4 text-foreground/50 animate-bounce" strokeWidth={1.5} />
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-foreground/30">Scroll</span>
        </motion.div>

      </div>
    </section>
  );
}
