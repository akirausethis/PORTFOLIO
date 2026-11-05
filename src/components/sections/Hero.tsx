"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowUpRight,
  MapPin,
  Download,
  Copy,
  Check,
  Clock,
  Sparkles,
  Code2,
  Film,
  Video,
  Mail,
} from "lucide-react";
import { SiGithub, SiNextdotjs, SiReact, SiTypescript } from "@icons-pack/react-simple-icons";
import Magnetic from "@/components/ui/Magnetic";

type HeroMode = "code" | "creative";

const codeStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "Node.js",
  "Prisma ORM",
  "AI Vector Systems",
];

const creativeStack = [
  "Meta Ads Strategy",
  "AI Video Generation",
  "Commercial Video Editing",
  "Motion Graphics",
  "After Effects & Premiere",
  "CSYMedia Creative",
  "High-Converting Hooks",
  "Visual Storytelling",
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<HeroMode>("code");
  const [copied, setCopied] = useState(false);
  const [surabayaTime, setSurabayaTime] = useState<string>("");

  // Live Surabaya (UTC+7 / WIB) clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Surabaya is UTC+7
      const timeString = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setSurabayaTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Parallax transforms based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Smooth mouse coordinates for ambient spotlight and 3D parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  // Copy email handler
  const copyEmail = () => {
    navigator.clipboard.writeText("akirabusinessinq@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const activeMarquee = mode === "code" ? codeStack : creativeStack;

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100dvh] pt-24 md:pt-28 pb-8 overflow-hidden flex flex-col justify-between"
    >
      {/* ── Background Blueprint Grid & Crosshair Markers ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Subtle structural grid lines */}
        <div className="absolute left-[6%] top-0 bottom-0 w-px bg-foreground/[0.035] hidden lg:block" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-foreground/[0.035] hidden lg:block" />
        <div className="absolute right-[6%] top-0 bottom-0 w-px bg-foreground/[0.035] hidden lg:block" />
        <div className="absolute left-0 right-0 top-[20%] h-px bg-foreground/[0.03] hidden lg:block" />
        <div className="absolute left-0 right-0 top-[82%] h-px bg-foreground/[0.03] hidden lg:block" />

        {/* Blueprint crosshairs at structural intersections */}
        <div className="hero-crosshair left-[6%] top-[20%] -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
        <div className="hero-crosshair left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
        <div className="hero-crosshair right-[6%] top-[20%] translate-x-1/2 -translate-y-1/2 hidden lg:block" />
        <div className="hero-crosshair left-[6%] top-[82%] -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
        <div className="hero-crosshair left-1/2 top-[82%] -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
        <div className="hero-crosshair right-[6%] top-[82%] translate-x-1/2 -translate-y-1/2 hidden lg:block" />

        {/* Interactive radial ambient glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              mode === "code"
                ? "radial-gradient(circle 700px at 70% 35%, rgba(37, 99, 235, 0.04), transparent 75%)"
                : "radial-gradient(circle 700px at 70% 35%, rgba(249, 115, 22, 0.05), transparent 75%)",
          }}
        />
      </div>

      {/* ── Main Container ── */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-between">
        
        {/* ── Top Cyber HUD Bar (Interactive Live Status + Mode Switcher) ── */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-wrap items-center justify-between gap-4 py-3 border-b border-foreground/[0.07] mb-6 sm:mb-8 min-h-[52px]"
        >
          {/* Live Surabaya Clock & Location */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/[0.08]">
              <Clock className="w-3.5 h-3.5 text-foreground/50 animate-pulse" />
              <span className="font-mono text-[11px] font-medium tracking-wider text-foreground/75">
                Surabaya {surabayaTime || "10:48 PM"}
              </span>
              <span className="text-[9px] font-mono font-semibold uppercase text-foreground/35 px-1.5 py-0.5 rounded bg-foreground/[0.05]">
                WIB / UTC+7
              </span>
            </div>
          </div>

          {/* DUAL-MODE SWITCHER: Mathematically Centered at 50% with Equal Button Widths */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center p-1 bg-foreground/[0.04] border border-foreground/[0.08] rounded-full z-10 mx-auto md:mx-0">
            <button
              onClick={() => setMode("code")}
              className={`relative flex items-center justify-center gap-2 w-[148px] sm:w-[156px] py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                mode === "code"
                  ? "text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {mode === "code" && (
                <motion.div
                  layoutId="hero-mode-pill"
                  className="absolute inset-0 bg-foreground rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Code2 className="relative z-10 w-3.5 h-3.5 shrink-0" />
              <span className="relative z-10 truncate">Software Engineer</span>
            </button>

            <button
              onClick={() => setMode("creative")}
              className={`relative flex items-center justify-center gap-2 w-[148px] sm:w-[156px] py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                mode === "creative"
                  ? "text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {mode === "creative" && (
                <motion.div
                  layoutId="hero-mode-pill"
                  className="absolute inset-0 bg-foreground rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Film className="relative z-10 w-3.5 h-3.5 shrink-0" />
              <span className="relative z-10 truncate">Editor</span>
            </button>
          </div>

          {/* Right Status Indicator: Available for Work (Quick Menu removed) */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Available for Work</span>
            <span className="sm:hidden">Available</span>
          </div>
        </motion.div>

        {/* ── Two Column Hero Body ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          
          {/* ── LEFT COLUMN (6 Cols): Typography, Identity & Actions ── */}
          <motion.div
            style={{ y: yContent }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Identity Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-4 sm:mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.08] text-[11px] font-mono tracking-widest uppercase text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                <span>vinworkspace // 01</span>
              </span>

              <span className="text-[11px] font-mono text-foreground/40 uppercase tracking-widest hidden sm:inline">
                {mode === "code" ? "Full Stack & Web Architecture" : "Video Editor & Meta Ads @ CSYMedia"}
              </span>
            </motion.div>

            {/* Main Name Headline (Space Grotesk, Bold, Premium Natural Case) */}
            <div className="mb-4 sm:mb-6 select-none">
              <h1 className="font-heading text-[52px] sm:text-[76px] md:text-[92px] lg:text-[100px] xl:text-[112px] font-extrabold tracking-tight text-foreground leading-[0.92]">
                <motion.span
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="block hover:translate-x-1 transition-transform duration-300"
                >
                  Kelvin
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="block hover:translate-x-1 transition-transform duration-300 text-foreground/90"
                >
                  Marcello
                  <span className="text-foreground/30 font-normal">.</span>
                </motion.span>
              </h1>
            </div>

            {/* Dynamic Interactive Tagline (Morphs smoothly on mode toggle) */}
            <div className="min-h-[76px] sm:min-h-[84px] mb-8">
              <AnimatePresence mode="wait">
                {mode === "code" ? (
                  <motion.div
                    key="code-tagline"
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-2 max-w-[520px]"
                  >
                    <p className="text-lg sm:text-xl text-foreground/80 font-normal leading-relaxed">
                      Software Engineer architecting high-performance web applications with{" "}
                      <span className="font-semibold text-foreground underline decoration-foreground/20 underline-offset-4">
                        Next.js 16
                      </span>
                      , TypeScript, and intelligent AI integrations.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/45">
                      <span>• Scalable Systems</span>
                      <span>• Fluid Micro-Interactions</span>
                      <span>• Modern DX</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="creative-tagline"
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-2 max-w-[520px]"
                  >
                    <p className="text-lg sm:text-xl text-foreground/80 font-normal leading-relaxed">
                      Video Editor & AI Ads Specialist at{" "}
                      <span className="font-semibold text-foreground underline decoration-foreground/20 underline-offset-4">
                        CSYMedia
                      </span>
                      . Directing high-converting Meta Ads campaigns, generative AI video, and dynamic motion graphics.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/45">
                      <span>• Generative AI Video</span>
                      <span>• Meta Ads Direct Response</span>
                      <span>• Commercial Motion</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Action Buttons & Quick Controls ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-col gap-4 mb-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary CTA (Changes link depending on mode) */}
                <Magnetic>
                  <a
                    href={mode === "code" ? "#projects" : "/creative"}
                    className="group relative inline-flex items-center justify-center gap-2.5 text-[14px] sm:text-[15px] font-semibold px-8 py-4 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>{mode === "code" ? "Explore Engineering" : "Watch Creative Reel"}</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </Magnetic>

                {/* Secondary Download CV Button */}
                <Magnetic>
                  <a
                    href="/CV.pdf"
                    target="_blank"
                    download
                    className="inline-flex items-center justify-center gap-2 text-[14px] sm:text-[15px] font-medium px-7 py-4 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-foreground/[0.04] transition-all duration-300 text-foreground"
                  >
                    <Download className="w-4 h-4 text-foreground/60" />
                    <span>Download CV</span>
                  </a>
                </Magnetic>

                {/* Quick Copy Email Button */}
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center justify-center gap-2 text-[13px] font-mono px-5 py-4 rounded-full border border-foreground/[0.09] bg-foreground/[0.02] hover:bg-foreground/[0.06] text-foreground/70 hover:text-foreground transition-all duration-200"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-foreground/40" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile-only status pill (Cleanly positioned under buttons) */}
              <div className="flex sm:hidden items-center justify-center pt-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/[0.03] border border-border/80 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground/80 tracking-wide">Available for work</span>
                  <span className="text-[10px] text-foreground/40 font-mono">· Surabaya</span>
                </div>
              </div>
            </motion.div>

            {/* Socials & Location Details with Sleek Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-foreground/60 pt-1"
            >
              <div className="flex items-center gap-1.5 text-foreground/50 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-foreground/[0.07]">
                <MapPin className="w-3.5 h-3.5 text-foreground/45" />
                <span>Surabaya, ID</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/akirausethis"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] hover:bg-foreground/[0.08] border border-foreground/[0.08] text-foreground/70 hover:text-foreground transition-all duration-200"
                  aria-label="GitHub"
                >
                  <SiGithub className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com/in/kelvinmarcello"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] hover:bg-foreground/[0.08] border border-foreground/[0.08] text-foreground/70 hover:text-foreground transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="mailto:akirabusinessinq@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] hover:bg-foreground/[0.08] border border-foreground/[0.08] text-foreground/70 hover:text-foreground transition-all duration-200"
                  aria-label="Inquiries"
                >
                  <Mail className="w-3.5 h-3.5 text-foreground/60" />
                  <span>Inquiries</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN (6 Cols): Architectural Focal Composition ── */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2">
            <motion.div
              style={{ y: yPortrait }}
              className="relative w-full max-w-[580px] flex items-center justify-center"
            >
              {/* Concentric Celestial Orbit Rings */}
              <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] rounded-full border border-foreground/[0.06] pointer-events-none" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                className="absolute w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[560px] md:h-[560px] rounded-full border border-dashed border-foreground/[0.08] pointer-events-none"
              >
                {/* Orbiting Tech Node 1 */}
                <div className="absolute top-[8%] left-[15%] w-8 h-8 rounded-full bg-background border border-foreground/10 flex items-center justify-center shadow-sm">
                  {mode === "code" ? (
                    <SiReact className="w-3.5 h-3.5 text-foreground/60" />
                  ) : (
                    <Video className="w-3.5 h-3.5 text-foreground/60" />
                  )}
                </div>
                {/* Orbiting Tech Node 2 */}
                <div className="absolute top-[18%] right-[10%] w-9 h-9 rounded-full bg-background border border-foreground/10 flex items-center justify-center shadow-sm">
                  {mode === "code" ? (
                    <SiNextdotjs className="w-4 h-4 text-foreground/60" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-foreground/60" />
                  )}
                </div>
                {/* Orbiting Tech Node 3 */}
                <div className="absolute bottom-[10%] left-[25%] w-8 h-8 rounded-full bg-background border border-foreground/10 flex items-center justify-center shadow-sm">
                  {mode === "code" ? (
                    <SiTypescript className="w-3.5 h-3.5 text-foreground/60" />
                  ) : (
                    <Film className="w-3.5 h-3.5 text-foreground/60" />
                  )}
                </div>
              </motion.div>

              {/* Portrait Container with Smooth Fade Mask */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[270px] h-[370px] sm:w-[350px] sm:h-[480px] md:w-[420px] md:h-[560px] flex items-end justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-portrait.png"
                  alt="Kelvin Marcello"
                  className="w-full h-full object-contain object-bottom pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 65%, transparent 98%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 98%)",
                  }}
                />
              </motion.div>

              {/* ── BENTO GLASS CARDS (Desktop & Tablet) ── */}

              {/* Card 1: Top-Left Live Radar / Identity Pill */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hidden sm:flex absolute top-6 -left-4 md:-left-8 items-center gap-3 p-3 px-4 rounded-2xl bg-background/80 backdrop-blur-xl border border-foreground/[0.09] shadow-[0_8px_30px_rgba(0,0,0,0.04)] z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-foreground/[0.04] border border-foreground/[0.08] flex items-center justify-center">
                  {mode === "code" ? (
                    <Code2 className="w-4 h-4 text-foreground/70" />
                  ) : (
                    <Film className="w-4 h-4 text-foreground/70" />
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/45 font-medium">
                    {mode === "code" ? "Primary Focus" : "Creative Role"}
                  </p>
                  <p className="text-xs font-semibold text-foreground tracking-tight">
                    {mode === "code" ? "Full Stack & Next.js 16" : "CSYMedia Video & AI Ads"}
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Bottom-Left Dynamic Highlight Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="hidden sm:flex absolute bottom-8 -left-2 md:-left-6 items-center gap-3.5 p-3.5 px-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-foreground/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.05)] z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground tracking-tight">Available for Work</p>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-foreground/[0.05] text-foreground/50">Q2/Q3</span>
                  </div>
                  <p className="text-[11px] text-foreground/50 font-medium">Internship • Full-time • Freelance</p>
                </div>
              </motion.div>

              {/* Card 3: Top-Right Experience / Shipped Counter */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="hidden sm:flex absolute top-16 -right-2 md:-right-6 items-center gap-2.5 p-2.5 px-3.5 rounded-2xl bg-background/80 backdrop-blur-xl border border-foreground/[0.09] shadow-[0_8px_30px_rgba(0,0,0,0.04)] z-20"
              >
                <Sparkles className="w-3.5 h-3.5 text-foreground/50" />
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/40 font-medium leading-none">
                    Impact
                  </p>
                  <p className="text-xs font-bold text-foreground tracking-tight leading-tight mt-0.5">
                    {mode === "code" ? "15+ Shipped Builds" : "Meta Ads Campaigns"}
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* ── Bottom Section: Interactive Dynamic Marquee Ticker ── */}
        <motion.div
          style={{ opacity: fadeOut }}
          className="relative z-10 w-full pt-6 pb-2 border-t border-foreground/[0.07]"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            {/* Left badge */}
            <div className="flex items-center gap-2 shrink-0 pr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
              <span className="text-[10px] font-mono font-semibold tracking-widest uppercase text-foreground/40">
                {mode === "code" ? "Tech Radar" : "Creative Arsenal"}
              </span>
            </div>

            {/* Marquee with infinite loop and hover pause */}
            <div className="flex-1 overflow-hidden relative group">
              {/* Edge fade gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                {[...activeMarquee, ...activeMarquee].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2.5 mx-4 px-3 py-1 rounded-full bg-foreground/[0.02] border border-foreground/[0.05] text-[12px] font-mono text-foreground/60 transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
                  >
                    <span className="w-1 h-1 rounded-full bg-foreground/25" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
