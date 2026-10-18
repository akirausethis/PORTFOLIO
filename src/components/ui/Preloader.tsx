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

  // Smooth progress from 0% to 100%
  useEffect(() => {
    if (phase !== "loading") return;

    let current = 0;
    const interval = setInterval(() => {
      const step = current < 30 ? 4 : current < 70 ? 3 : current < 90 ? 2 : 1.5;
      current += step;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          triggerSplit();
        }, 150);
      } else {
        setProgress(current);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [phase, triggerSplit]);

  // Transition to done after split animation completes
  useEffect(() => {
    if (phase !== "splitting") return;
    const doneTimeout = setTimeout(() => {
      setPhase("done");
    }, 850);
    return () => clearTimeout(doneTimeout);
  }, [phase]);

  if (phase === "done") return null;

  // Single unified center composition
  const CenterContent = () => (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center select-none px-6 overflow-hidden">
      {/* Subtle architectural grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
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
      <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full bg-black/[0.02] blur-3xl pointer-events-none" />

      {/* Main Centered Stack */}
      <div className="relative z-10 flex flex-col items-center max-w-full">
        {/* Animated W Logo Mark */}
        <div className="relative mb-4 sm:mb-6 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-mark.png"
              alt="vinworkspace logo"
              loading="eager"
              decoding="sync"
              className="w-[140px] sm:w-[190px] md:w-[220px] max-w-[65vw] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
            />
          </motion.div>
        </div>

        {/* Brand Title: vinworkspace */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#111111] mb-5 sm:mb-6 leading-none">
          <span className="font-extrabold">vin</span>
          <span className="font-light text-[#111111]/80">workspace</span>
        </h1>

        {/* Animated Progress Bar */}
        <div className="w-44 sm:w-60 h-[2.5px] bg-[#111111]/10 rounded-full overflow-hidden mb-4 sm:mb-5">
          <div
            className="h-full bg-[#111111] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        {/* Subtitle Tagline: BUILD • DESIGN • AUTOMATE */}
        <p className="text-[9px] sm:text-xs font-sans font-medium tracking-[0.3em] sm:tracking-[0.38em] uppercase text-[#111111]/60 text-center pl-[0.3em] sm:pl-[0.38em]">
          BUILD &nbsp;•&nbsp; DESIGN &nbsp;•&nbsp; AUTOMATE
        </p>
      </div>

      {/* Bottom "Tap to skip" prompt */}
      <p className="absolute bottom-6 sm:bottom-10 text-[11px] sm:text-xs font-sans text-[#111111]/35 tracking-wider hover:text-[#111111]/60 transition-colors">
        Click anywhere to skip
      </p>
    </div>
  );

  return (
    <AnimatePresence>
      <div
        onClick={triggerSplit}
        className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden pointer-events-auto"
        aria-label="Loading screen, click anywhere to skip"
      >
        {/* ── TOP SHUTTER (0% to 50% height) ── */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: phase === "splitting" ? "-100%" : "0%" }}
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

        {/* ── BOTTOM SHUTTER (50% to 100% height) ── */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: phase === "splitting" ? "100%" : "0%" }}
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

        {/* ── HORIZONTAL SPLIT FLASH LINE ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            phase === "splitting"
              ? { scaleX: 1, opacity: [0, 1, 0] }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1.5px] bg-[#111111]/40 z-20 pointer-events-none origin-center"
        />
      </div>
    </AnimatePresence>
  );
}
