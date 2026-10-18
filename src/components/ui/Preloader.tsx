"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "splitting" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const hasTriggeredRef = useRef(false);

  const triggerSplit = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setPhase("splitting");
  }, []);

  // Smooth simulated progress from 0% to 100%
  useEffect(() => {
    if (phase !== "loading") return;

    let current = 0;
    const interval = setInterval(() => {
      // Faster progression with organic curve
      const step = current < 30 ? 4 : current < 70 ? 3 : current < 90 ? 2 : 1.5;
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        // Brief pause at 100% before initiating the split
        setTimeout(() => {
          triggerSplit();
        }, 180);
      } else {
        setProgress(current);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [phase, triggerSplit]);

  // Clean transition to done after split animation finishes
  useEffect(() => {
    if (phase !== "splitting") return;
    const doneTimeout = setTimeout(() => {
      setPhase("done");
    }, 850);
    return () => clearTimeout(doneTimeout);
  }, [phase]);

  if (phase === "done") return null;

  // Single source of truth for the preloader visual assembly
  const CenterContent = () => (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center select-none px-6 overflow-hidden">
      {/* Subtle architectural grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Soft radial vignette / spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 20%, rgba(250, 250, 250, 0.85) 80%)",
        }}
      />

      {/* Center ambient glow behind the logo */}
      <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full bg-black/[0.025] blur-3xl pointer-events-none" />

      {/* Main Centered Stack */}
      <div className="relative z-10 flex flex-col items-center max-w-full">
        {/* Animated W Logo Mark with complete intact star and orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-4 sm:mb-6"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-mark.png"
              alt="vinworkspace logo"
              className="w-[140px] sm:w-[190px] md:w-[220px] max-w-[65vw] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
            />
          </motion.div>
        </motion.div>

        {/* Brand Title: vinworkspace */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#111111] mb-5 sm:mb-6 leading-none"
        >
          <span className="font-extrabold">vin</span>
          <span className="font-light text-[#111111]/80">workspace</span>
        </motion.h1>

        {/* Animated Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-44 sm:w-60 h-[2.5px] bg-[#111111]/10 rounded-full overflow-hidden mb-4 sm:mb-5"
        >
          <div
            className="h-full bg-[#111111] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </motion.div>

        {/* Subtitle Tagline: BUILD • DESIGN • AUTOMATE */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9px] sm:text-xs font-sans font-medium tracking-[0.3em] sm:tracking-[0.38em] uppercase text-[#111111]/60 text-center pl-[0.3em] sm:pl-[0.38em]"
        >
          BUILD &nbsp;•&nbsp; DESIGN &nbsp;•&nbsp; AUTOMATE
        </motion.p>
      </div>

      {/* Bottom "Tap to skip" prompt */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-10 text-[11px] sm:text-xs font-sans text-[#111111]/35 tracking-wider hover:text-[#111111]/60 transition-colors"
      >
        Click anywhere to skip
      </motion.p>
    </div>
  );

  return (
    <AnimatePresence>
      <div
        onClick={triggerSplit}
        className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden pointer-events-auto"
        aria-label="Loading screen, click anywhere to skip"
      >
        {phase === "loading" ? (
          // ── PHASE 1: UNIFIED SINGLE VIEW (100% seamless, no cut, no steps) ──
          <div className="absolute inset-0 bg-[#FAFAFA]">
            <CenterContent />
          </div>
        ) : (
          // ── PHASE 2: HORIZONTAL SPLIT REVEAL ──
          <>
            {/* Top Half (0% to 50% height) sliding UP */}
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 50.1%, 0 50.1%)",
              }}
              className="absolute inset-0 bg-[#FAFAFA] will-change-transform z-10"
            >
              <CenterContent />
            </motion.div>

            {/* Bottom Half (50% to 100% height) sliding DOWN */}
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: "100%" }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                clipPath: "polygon(0 49.9%, 100% 49.9%, 100% 100%, 0 100%)",
              }}
              className="absolute inset-0 bg-[#FAFAFA] will-change-transform z-10"
            >
              <CenterContent />
            </motion.div>

            {/* Horizontal Split Seam Flash Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1.5px] bg-[#111111]/40 z-20 pointer-events-none origin-center"
            />
          </>
        )}
      </div>
    </AnimatePresence>
  );
}
