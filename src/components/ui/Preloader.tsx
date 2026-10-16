"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "splitting" | "done">("loading");
  const [progress, setProgress] = useState(0);

  const triggerSplit = useCallback(() => {
    setPhase((prev) => (prev === "loading" ? "splitting" : prev));
  }, []);

  useEffect(() => {
    // Lock body scroll while preloader is active
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;

    const duration = 1800; // 1.8s smooth progress fill
    const intervalTime = 20;
    const elapsedStep = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + elapsedStep >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + elapsedStep;
      });
    }, intervalTime);

    const splitTimeout = setTimeout(() => {
      setPhase("splitting");
    }, duration + 250);

    return () => {
      clearInterval(timer);
      clearTimeout(splitTimeout);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "splitting") return;
    const doneTimeout = setTimeout(() => {
      setPhase("done");
    }, 950);
    return () => clearTimeout(doneTimeout);
  }, [phase]);

  if (phase === "done") return null;

  // Shared inner content rendered in both halves so the entire composition
  // (grid, logo, brand text, progress bar) literally slices in half horizontally!
  const renderCenterContent = () => (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center select-none px-6">
      {/* Subtle architectural grid background (matching reference image 1) */}
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
      <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-black/[0.025] blur-3xl pointer-events-none" />

      {/* Main Centered Stack */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated W Logo Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5 sm:mb-6"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-mark.png"
              alt="vinworkspace logo"
              className="w-[150px] sm:w-[190px] md:w-[220px] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
            />
          </motion.div>
        </motion.div>

        {/* Brand Title: vinworkspace */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#111111] mb-6"
        >
          <span className="font-extrabold">vin</span>
          <span className="font-light text-[#111111]/80">workspace</span>
        </motion.h1>

        {/* Animated Progress Bar (like reference image 1) */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-48 sm:w-60 h-[2.5px] bg-[#111111]/10 rounded-full overflow-hidden mb-5"
        >
          <div
            className="h-full bg-[#111111] rounded-full transition-all duration-75 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </motion.div>

        {/* Subtitle Tagline: BUILD • DESIGN • AUTOMATE */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.38em] uppercase text-[#111111]/60 text-center pl-[0.38em]"
        >
          BUILD &nbsp;•&nbsp; DESIGN &nbsp;•&nbsp; AUTOMATE
        </motion.p>
      </div>

      {/* Bottom "Tap to skip" prompt (matching reference image 1) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-8 sm:bottom-10 text-xs font-sans text-[#111111]/35 tracking-wider hover:text-[#111111]/60 transition-colors"
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
        aria-label="Loading screen, click to skip"
      >
        {/* ── TOP HALF SHUTTER (0 to 50vh) ── */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: phase === "splitting" ? "-100%" : "0%" }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
          className={`absolute top-0 left-0 right-0 h-[50.1vh] bg-[#FAFAFA] overflow-hidden will-change-transform ${
            phase === "splitting" ? "border-b border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : ""
          }`}
        >
          {renderCenterContent()}
        </motion.div>

        {/* ── BOTTOM HALF SHUTTER (50vh to 100vh) ── */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: phase === "splitting" ? "100%" : "0%" }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
          className={`absolute bottom-0 left-0 right-0 h-[50.1vh] bg-[#FAFAFA] overflow-hidden will-change-transform ${
            phase === "splitting" ? "border-t border-black/15 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]" : ""
          }`}
        >
          <div className="-translate-y-[49.9vh]">{renderCenterContent()}</div>
        </motion.div>

        {/* ── HORIZONTAL SPLIT FLASH LINE ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            phase === "splitting"
              ? { scaleX: 1, opacity: [0, 1, 0] }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1.5px] bg-[#111111]/30 z-20 pointer-events-none origin-center"
        />
      </div>
    </AnimatePresence>
  );
}
