"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Code2,
  Terminal,
  Cpu,
  Globe,
  Layers,
  ChevronRight,
  Monitor,
  Flame,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

// 30-Second Promo Scenes Definition
// Total duration = 30s
const SCENES = [
  {
    id: 1,
    start: 0,
    end: 5,
    title: "THE PROBLEM",
    label: "00:00 — 00:05",
    subtitle: "In a world of templated, cookie-cutter web apps...",
  },
  {
    id: 2,
    start: 5,
    end: 11,
    title: "THE CRAFT",
    label: "00:05 — 00:11",
    subtitle: "Engineered with Extreme Precision & Clean Architecture",
  },
  {
    id: 3,
    start: 11,
    end: 18,
    title: "FLAGSHIP WORK",
    label: "00:11 — 00:18",
    subtitle: "AI Academic Workspaces, Luxury E-Commerce & Systems",
  },
  {
    id: 4,
    start: 18,
    end: 24,
    title: "TECH ARSENAL",
    label: "00:18 — 00:24",
    subtitle: "Next.js App Router, TypeScript, React 19 & Edge APIs",
  },
  {
    id: 5,
    start: 24,
    end: 30,
    title: "LET'S BUILD",
    label: "00:24 — 00:30",
    subtitle: "Available for High-Impact Roles & Client Products",
  },
];

export default function PromoMotionGraphicsPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 30 seconds
  const [soundEnabled, setSoundEnabled] = useState(false);
  const reqAnimRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Playback timer loop
  useEffect(() => {
    const loop = (timestamp: number) => {
      if (lastTimestampRef.current !== null && isPlaying) {
        const delta = (timestamp - lastTimestampRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= 30) {
            return 0; // loop back seamlessly
          }
          return next;
        });
      }
      lastTimestampRef.current = timestamp;
      reqAnimRef.current = requestAnimationFrame(loop);
    };

    reqAnimRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
    };
  }, [isPlaying]);

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  // Determine current active scene
  const currentScene = SCENES.find((s) => currentTime >= s.start && currentTime < s.end) || SCENES[0];
  const progressPercent = (currentTime / 30) * 100;

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 lg:p-10 pt-10 sm:pt-14 font-sans selection:bg-white selection:text-black">
      {/* Top Header / Context */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-mono font-medium uppercase tracking-wider text-white/80 transition-all duration-300 active:scale-95 shadow-sm"
          >
            <span className="transform group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            <span>Back to Portfolio</span>
          </Link>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            30s Promo Motion Reel
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-[11px] font-mono px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            {soundEnabled ? "🔊 Sound Ready" : "🔇 Visual Demo"}
          </button>
        </div>
      </header>

      {/* Main Studio Workspace: 9:16 Mobile Viewport + Director Controls */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
        
        {/* LEFT / CENTER: 9:16 Portrait Canvas (1080 x 1920 aspect ratio) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-[340px] sm:w-[380px] h-[640px] sm:h-[700px] bg-black rounded-[40px] border-4 border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col relative select-none">
            
            {/* Top Phone Bezel Notch & Audio Waveform Header */}
            <div className="absolute top-0 inset-x-0 h-10 px-6 flex items-center justify-between z-50 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
              <span className="text-[10px] font-mono text-white/50 font-bold tracking-widest">
                VIN.PROMO // 30S
              </span>
              <div className="w-16 h-3 bg-white/10 rounded-full mx-auto" />
              <span className="text-[10px] font-mono text-white/70 font-bold">
                {currentTime.toFixed(1)}s / 30.0s
              </span>
            </div>

            {/* Top Progress Bar Indicator (Stories/Reels Style) */}
            <div className="absolute top-11 inset-x-4 flex gap-1 z-50 pointer-events-none">
              {SCENES.map((scene) => {
                const isPast = currentTime > scene.end;
                const isCurrent = currentTime >= scene.start && currentTime < scene.end;
                const sceneProgress = isPast
                  ? 100
                  : isCurrent
                  ? ((currentTime - scene.start) / (scene.end - scene.start)) * 100
                  : 0;

                return (
                  <div key={scene.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-75 ease-linear"
                      style={{ width: `${sceneProgress}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* ════════════ MOTION GRAPHICS VIEWPORT ════════════ */}
            <div className="relative w-full h-full overflow-hidden flex flex-col justify-between p-6 pt-16 pb-8 bg-[#0a0a0c]">
              
              {/* Dynamic Kinetic Particle Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "32px 32px"
                }}
              />

              {/* ── SCENE 1 (0s - 5s): THE HOOK ── */}
              {currentTime < 5 && (
                <motion.div
                  key="scene-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col justify-center items-center text-center relative z-10"
                >
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-6"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                    Problem: Digital Noise
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-4xl sm:text-5xl font-heading font-black tracking-tighter leading-[0.92] uppercase text-white mb-6"
                  >
                    Tired of
                    <br />
                    <span className="line-through decoration-red-500/80 decoration-4 text-white/40">
                      Cookie-Cutter
                    </span>
                    <br />
                    <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                      Web Apps?
                    </span>
                  </motion.h1>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="w-24 h-1 bg-white mb-6"
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-xs font-mono text-white/60 tracking-wider max-w-[240px]"
                  >
                    Sluggish templates won&apos;t build a lasting brand.
                  </motion.p>
                </motion.div>
              )}

              {/* ── SCENE 2 (5s - 11s): THE CRAFT & MINDSET ── */}
              {currentTime >= 5 && currentTime < 11 && (
                <motion.div
                  key="scene-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col justify-center items-center text-center relative z-10 px-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6 relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-black text-xl font-heading">
                      KM
                    </div>
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase font-bold mb-2"
                  >
                    Meet Kelvin Marcello
                  </motion.span>

                  <motion.h2
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl sm:text-4xl font-heading font-black tracking-tight leading-none text-white mb-4"
                  >
                    Full-Stack Dev
                    <br />
                    <span className="text-white/40">&amp; UI Craftsman</span>
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full text-left"
                  >
                    <div className="flex items-center gap-2 mb-2 text-white/50 text-[10px] font-mono">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>PHILOSOPHY // 01</span>
                    </div>
                    <p className="text-sm font-medium text-white/90 leading-snug">
                      &ldquo;Building software that actually matters — not just things that look good.&rdquo;
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* ── SCENE 3 (11s - 18s): FLAGSHIP WORK SHOWCASE ── */}
              {currentTime >= 11 && currentTime < 18 && (
                <motion.div
                  key="scene-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col justify-center items-center relative z-10"
                >
                  <div className="w-full flex items-center justify-between mb-3 px-1">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">
                      Flagship Shipped Work
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white text-black font-bold uppercase">
                      Live Vercel
                    </span>
                  </div>

                  {/* Dynamic Showcase Switching based on time */}
                  {currentTime < 14.5 ? (
                    <motion.div
                      key="project-sourcewise"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full rounded-2xl overflow-hidden border border-white/20 bg-white/5 shadow-2xl relative"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/projects/sourcewise.jpg"
                          alt="Sourcewise"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                          AI Academic Engine
                        </span>
                        <h3 className="text-xl font-heading font-black tracking-tight text-white mt-0.5">
                          SOURCEWISE
                        </h3>
                        <p className="text-xs text-white/60 line-clamp-2 mt-1">
                          Zero-hallucination interactive paper reading with word-for-word verifiable page highlights.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="project-aurora"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full rounded-2xl overflow-hidden border border-white/20 bg-white/5 shadow-2xl relative"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/projects/aurora.jpg"
                          alt="Aurora"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                          Medical-Grade E-Commerce
                        </span>
                        <h3 className="text-xl font-heading font-black tracking-tight text-white mt-0.5">
                          AURORA CLINICAL
                        </h3>
                        <p className="text-xs text-white/60 line-clamp-2 mt-1">
                          Luxury editorial aesthetic with instant responsive cart calculation &amp; checkout.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ── SCENE 4 (18s - 24s): THE ARSENAL & STATS ── */}
              {currentTime >= 18 && currentTime < 24 && (
                <motion.div
                  key="scene-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col justify-center items-center text-center relative z-10"
                >
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold mb-2">
                    Battle-Tested Tech Stack
                  </span>
                  <h2 className="text-3xl font-heading font-black tracking-tight uppercase mb-6">
                    ENGINEERED TO <span className="text-emerald-400">SCALE</span>
                  </h2>

                  <div className="grid grid-cols-2 gap-2.5 w-full mb-6">
                    {[
                      { name: "Next.js 16", desc: "App Router / Turbopack" },
                      { name: "TypeScript", desc: "Strict Type Safety" },
                      { name: "React 19", desc: "Server Components" },
                      { name: "Tailwind 4", desc: "Design Systems" },
                    ].map((tech, idx) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-3 rounded-xl border border-white/10 bg-white/5 text-left"
                      >
                        <p className="text-sm font-bold text-white font-mono">{tech.name}</p>
                        <p className="text-[10px] text-white/40">{tech.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="w-full flex items-center justify-around py-3 rounded-xl border border-white/15 bg-white/[0.03]">
                    <div>
                      <div className="text-2xl font-black font-heading text-white">5+</div>
                      <div className="text-[9px] font-mono uppercase text-white/50">Apps Shipped</div>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div>
                      <div className="text-2xl font-black font-heading text-emerald-400">100%</div>
                      <div className="text-[9px] font-mono uppercase text-white/50">Responsive</div>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div>
                      <div className="text-2xl font-black font-heading text-white">PDD</div>
                      <div className="text-[9px] font-mono uppercase text-white/50">Lead Design</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── SCENE 5 (24s - 30s): THE CTA & CONVERSION ── */}
              {currentTime >= 24 && (
                <motion.div
                  key="scene-5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col justify-center items-center text-center relative z-10 px-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center mb-5 shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-mark.png" alt="Vin" className="w-10 h-10 object-contain invert" />
                  </motion.div>

                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold mb-1">
                    Available for Work
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white uppercase leading-[0.95] mb-4">
                    Ready to Build
                    <br />
                    Something Great?
                  </h2>

                  <p className="text-xs text-white/60 max-w-[240px] mb-6 font-mono">
                    Internship · Full-Time · High-Impact Client Web Apps
                  </p>

                  <div className="w-full bg-white text-black font-bold py-3.5 rounded-full text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:bg-white/90">
                    <span>vinworkspace.vercel.app</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  <span className="text-[10px] text-white/30 font-mono mt-3">
                    akirabusinessinq@gmail.com
                  </span>
                </motion.div>
              )}

              {/* Bottom Persistent Bar */}
              <div className="relative z-20 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span className="truncate max-w-[180px]">KELVIN MARCELLO</span>
                <span className="text-emerald-400 font-semibold">{currentScene.title}</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: Director Playback Controller & Scene Timetable */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Controls Card */}
          <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-heading font-bold text-white tracking-tight">
                  Promo Motion Studio
                </h3>
                <p className="text-xs text-white/50 font-mono">
                  Real-time 30-Second 9:16 Video Canvas
                </p>
              </div>

              {/* Play / Pause Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                </button>
                <button
                  onClick={handleRestart}
                  className="w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                  title="Restart from 00:00"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrub Slider */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                <span>Timestamp: {currentTime.toFixed(1)}s</span>
                <span>Total: 30.0s</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.1"
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full accent-white cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleSeek(0)}
                className="flex-1 py-2 rounded-xl text-xs font-mono border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
              >
                Hook (0s)
              </button>
              <button
                onClick={() => handleSeek(11)}
                className="flex-1 py-2 rounded-xl text-xs font-mono border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
              >
                Work (11s)
              </button>
              <button
                onClick={() => handleSeek(24)}
                className="flex-1 py-2 rounded-xl text-xs font-mono border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors"
              >
                CTA (24s)
              </button>
            </div>
          </div>

          {/* Scene Breakdown List */}
          <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold mb-1">
              Storyboard &amp; Motion Script Breakdown
            </h4>

            {SCENES.map((scene) => {
              const isActive = currentTime >= scene.start && currentTime < scene.end;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSeek(scene.start)}
                  className={`flex items-start justify-between p-3 rounded-2xl text-left border transition-all ${
                    isActive
                      ? "border-white bg-white/10 shadow-sm"
                      : "border-white/5 bg-white/[0.01] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono font-bold ${isActive ? "text-emerald-400" : "text-white/40"}`}>
                        {scene.label}
                      </span>
                      <span className="text-xs font-heading font-bold text-white uppercase">
                        {scene.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60 mt-1 line-clamp-1">
                      {scene.subtitle}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "text-white translate-x-1" : "text-white/20"}`} />
                </button>
              );
            })}
          </div>

          {/* Export / Production Specs Card */}
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Format: 1080 x 1920 (9:16) · 60 FPS · Mobile First</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
