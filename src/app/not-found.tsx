"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const [text, setText] = useState("404");

  // Scramble effect on mount
  useEffect(() => {
    const chars = "0123456789@#$%&";
    const target = "404";
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        target
          .split("")
          .map((char, i) =>
            i < iteration
              ? char
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      if (iteration >= target.length) clearInterval(interval);
      iteration += 0.4;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-foreground/[0.06]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-foreground/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-dashed border-foreground/[0.06]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center relative z-10 max-w-lg"
      >
        {/* Scrambled number */}
        <p className="font-heading font-bold text-[120px] sm:text-[160px] leading-none tracking-tighter text-foreground/[0.06] select-none mb-4 font-mono">
          {text}
        </p>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2.5 mb-6"
        >
          <div className="h-px w-12 bg-border" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40">
            Page Not Found
          </span>
          <div className="h-px w-12 bg-border" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4"
        >
          You&apos;re lost in the void.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-foreground/50 text-[15px] leading-relaxed mb-10"
        >
          The page you&apos;re looking for doesn&apos;t exist or was moved.
          Let&apos;s get you back to somewhere that does.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-foreground text-background rounded-full text-[14px] font-semibold hover:opacity-85 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-border rounded-full text-[14px] font-medium text-foreground/60 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-[11px] font-mono text-foreground/20"
        >
          vinworkspace.vercel.app
        </motion.p>
      </motion.div>
    </div>
  );
}
