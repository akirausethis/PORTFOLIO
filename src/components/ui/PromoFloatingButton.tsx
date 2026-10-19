"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function PromoFloatingButton() {
  const pathname = usePathname();

  // Do not render on /promo page itself
  if (pathname === "/promo") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-6 z-50 group flex items-center"
    >
      <Link
        href="/promo"
        className="group relative flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full bg-foreground text-background shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition-all duration-300 border border-foreground/10"
        title="Watch 30s Promo Motion Reel"
        aria-label="Watch 30s Promo Video"
      >
        {/* Pulsing ring indicator */}
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-background text-foreground items-center justify-center">
            <Play className="w-2 h-2 fill-foreground ml-0.5" />
          </span>
        </span>

        {/* Text Label */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-heading font-bold leading-none tracking-tight">
            Promo Reel
          </span>
          <span className="text-[9px] font-mono text-background/60 tracking-wider uppercase leading-none mt-0.5">
            30s Video
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
