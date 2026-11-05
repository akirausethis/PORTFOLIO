"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, MapPin, Download } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Magnetic from "@/components/ui/Magnetic";

const roles = ["Software Engineer", "Frontend Developer", "AI Integrator"];
const marqueeItems = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Prisma", "AI / LLMs"];

// Staggered word reveal
const AnimatedWord = ({ word, delay }: { word: string; delay: number }) => (
  <span className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
    <motion.span
      className="inline-block"
      initial={{ y: "120%", rotate: 5 }}
      animate={{ y: "0%", rotate: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {word}
    </motion.span>
  </span>
);

// Staggered character reveal for outlined text
const AnimatedOutlineChar = ({ char, delay }: { char: string; delay: number }) => (
  <span className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
    <motion.span
      className="inline-block"
      initial={{ y: "120%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  </span>
);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yMarquee = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Smooth cursor tracking for interactive gradient
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Cycling role text
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 3000);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col"
    >
      {/* ── Interactive gradient background ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at calc(var(--gx) * 100%) calc(var(--gy) * 100%), rgba(0,0,0,0.03), transparent)`,
          // @ts-expect-error CSS custom properties
          "--gx": smoothX,
          "--gy": smoothY,
        }}
      />

      {/* ── Architectural grid lines ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-foreground/[0.04] hidden lg:block" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-foreground/[0.04] hidden lg:block" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-foreground/[0.04] hidden lg:block" />
        <div className="absolute left-0 right-0 top-[33%] h-px bg-foreground/[0.04] hidden lg:block" />
        <div className="absolute left-0 right-0 top-[66%] h-px bg-foreground/[0.04] hidden lg:block" />
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col">

        {/* ── Top metadata bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-between pt-28 md:pt-36 lg:pt-32 pb-6 md:pb-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-medium tracking-[0.25em] uppercase text-foreground/35">Portfolio / 2025</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-medium tracking-[0.25em] uppercase text-foreground/35">Based in Surabaya, ID</span>
          </div>
        </motion.div>

        {/* ── Hero split layout ── */}
        <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">

          {/* ── LEFT: Content column ── */}
          <motion.div
            style={{ y: yContent }}
            className="w-full lg:w-[52%] flex flex-col justify-center relative z-10 order-2 lg:order-1 pb-8 lg:pb-0"
          >
            {/* Role cycling pill */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold text-foreground/50 tracking-[0.2em] uppercase">
                <motion.span
                  className="w-2 h-2 rounded-full bg-foreground/30"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* ── Giant name typography ── */}
            <div className="mb-6 md:mb-8">
              {/* "KELVIN" — bold filled */}
              <h1 className="font-heading font-black tracking-[-0.04em] leading-[0.85] text-foreground">
                <span className="block text-[clamp(3.5rem,12vw,9rem)]">
                  <AnimatedWord word="KELVIN" delay={0.1} />
                </span>
                {/* "MARCELLO" — large outlined stroke text */}
                <span className="block text-[clamp(3.5rem,12vw,9rem)] hero-text-outline text-transparent">
                  {"MARCELLO".split("").map((char, i) => (
                    <AnimatedOutlineChar key={i} char={char} delay={0.15 + i * 0.03} />
                  ))}
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-foreground/55 font-light leading-relaxed max-w-[460px] mb-8 md:mb-10"
            >
              I engineer robust web applications, solve complex problems, and craft precise user experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="flex flex-col gap-4 mb-8 md:mb-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Magnetic>
                  <a
                    href="#projects"
                    className="group inline-flex items-center justify-center gap-2.5 text-[14px] sm:text-[15px] font-semibold px-7 py-3.5 sm:px-8 sm:py-4 bg-foreground text-background rounded-full hover:bg-foreground/85 transition-all duration-300 w-full sm:w-auto"
                  >
                    <span>Explore Work</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="/CV.pdf"
                    target="_blank"
                    download
                    className="inline-flex items-center justify-center gap-2.5 text-[14px] sm:text-[15px] font-medium px-7 py-3.5 sm:px-8 sm:py-4 border-2 border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-300 w-full sm:w-auto text-foreground"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </Magnetic>
              </div>

              {/* Status pill on mobile — placed below Download CV */}
              <div className="flex lg:hidden items-center justify-center sm:justify-start pt-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/[0.03] border border-border/80 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground/80 tracking-wide">Available for work</span>
                  <span className="text-[10px] text-foreground/40 font-mono">· Surabaya</span>
                </div>
              </div>
            </motion.div>

            {/* Location + socials row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 text-foreground/45 bg-foreground/[0.03] px-3.5 py-2 rounded-full border border-foreground/[0.06]">
                <MapPin className="w-3 h-3" />
                <span className="text-[11px] font-medium tracking-wide uppercase">Surabaya, ID</span>
              </div>
              <a
                href="https://github.com/akirausethis"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-foreground/[0.08] text-foreground/40 hover:text-foreground hover:border-foreground/25 hover:bg-foreground/5 transition-all duration-300"
                aria-label="GitHub"
              >
                <SiGithub className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/kelvinmarcello"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-foreground/[0.08] text-foreground/40 hover:text-foreground hover:border-foreground/25 hover:bg-foreground/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Portrait column ── */}
          <div className="w-full lg:w-[48%] relative z-0 flex items-center justify-center order-1 lg:order-2">
            <motion.div
              style={{ y: yPortrait, scale: portraitScale, opacity: fadeOut }}
              className="relative w-full flex items-center justify-center"
            >
              {/* Decorative circle behind portrait */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full border border-foreground/[0.06] z-0"
              />

              {/* Outer rotating dotted ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[510px] md:h-[510px] lg:w-[620px] lg:h-[620px] rounded-full border border-dotted border-foreground/[0.08] z-0"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/15" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground/10" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground/10" />
                </motion.div>
              </motion.div>

              {/* Portrait image */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[260px] h-[360px] sm:w-[320px] sm:h-[440px] md:w-[380px] md:h-[500px] lg:w-[460px] lg:h-[640px] flex items-end justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-portrait.png"
                  alt="Kelvin Marcello"
                  className="w-full h-full object-contain object-bottom pointer-events-none"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 60%, transparent 98%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 98%)",
                  }}
                />
              </motion.div>

              {/* Floating status card — desktop only */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex absolute bottom-36 -left-4 xl:left-0 items-center gap-3.5 p-3.5 pr-5 bg-background/90 backdrop-blur-xl border border-foreground/[0.08] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground tracking-tight leading-none mb-0.5">Available for work</p>
                  <p className="text-[11px] text-foreground/45 font-medium">Internship · Full-time</p>
                </div>
              </motion.div>

              {/* Floating year badge — desktop only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex absolute top-16 -right-2 xl:right-4 items-center gap-2 px-3.5 py-2 bg-background/90 backdrop-blur-xl border border-foreground/[0.08] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] z-20"
              >
                <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/40 uppercase">Est.</span>
                <span className="text-lg font-heading font-bold text-foreground tracking-tight">2024</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom marquee ticker ── */}
        <motion.div
          style={{ y: yMarquee, opacity: fadeOut }}
          className="relative z-10 pb-8 md:pb-12 mt-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="border-t border-foreground/[0.06] pt-5"
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <span className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-foreground/30 shrink-0">Tech Stack</span>
              <div className="flex-1 overflow-hidden relative">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                <div className="flex animate-marquee whitespace-nowrap">
                  {[...marqueeItems, ...marqueeItems].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-3 mx-4">
                      <span className="w-1 h-1 rounded-full bg-foreground/20" />
                      <span className="text-[12px] sm:text-[13px] font-medium text-foreground/40 tracking-wide">{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Section number watermark ── */}
      <span className="section-number right-6 top-24 hidden xl:block">01</span>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute right-6 md:right-12 bottom-8 md:bottom-12 flex flex-col items-center z-20 gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border border-foreground/15 flex items-start justify-center pt-2"
        >
          <motion.div className="w-1 h-2.5 rounded-full bg-foreground/30" />
        </motion.div>
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-foreground/25">Scroll</span>
      </motion.div>

      {/* ── Far right section marker ── */}
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-2xl font-heading font-medium mb-4 tracking-tight text-foreground/15">01</span>
          <div className="w-px h-20 bg-foreground/[0.08] mb-4" />
          <span
            className="text-[10px] font-medium tracking-[0.2em] text-foreground/30 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Introduction
          </span>
        </motion.div>
      </div>
    </section>
  );
}
