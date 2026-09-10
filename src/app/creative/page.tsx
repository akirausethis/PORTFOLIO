"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { creativeWorks, categoryLabels, type CreativeCategory } from "@/data/creative";
import clsx from "clsx";

type FilterTab = "all" | CreativeCategory;

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "photography", label: "Photography" },
  { id: "graphic-design", label: "Graphic Design" },
  { id: "video-editing", label: "Video Editing" },
  { id: "motion-design", label: "Motion Design" },
];

const categoryDot: Record<CreativeCategory, string> = {
  photography: "bg-sky-400",
  "graphic-design": "bg-violet-400",
  "video-editing": "bg-amber-400",
  "motion-design": "bg-emerald-400",
};

export default function CreativePage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered =
    activeTab === "all"
      ? creativeWorks
      : creativeWorks.filter((w) => w.category === activeTab);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">
      {/* ── Page Header ── */}
      <div className="pt-32 lg:pt-40 pb-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Back */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-[14px] font-medium text-foreground/50 hover:text-foreground transition-colors mb-16"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          {/* Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-8">
                Visual World
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[100px] font-heading font-bold tracking-tight leading-[0.92] mb-12">
                Creative
                <br />
                Works.
              </h1>
            </div>
            <div className="lg:col-span-5 flex items-end pb-2">
              <div className="space-y-6 border-l border-border pl-8">
                <p className="text-lg text-foreground/70 font-light leading-relaxed">
                  A curated window into my life beyond engineering — built
                  through years of documenting events, crafting visual
                  identities, and telling stories through the lens.
                </p>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  As <span className="text-foreground font-medium">Coordinator of PDD</span> in
                  my Student Union, I led the publication, decoration, and
                  documentation of every major event on campus.
                </p>
                {/* Tools */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Photoshop", "After Effects", "Alight Motion", "CapCut", "Canva", "Pixellab"].map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono bg-foreground/5 border border-border rounded-full px-3 py-1 text-foreground/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="border-t border-b border-border sticky top-20 lg:top-24 bg-background/90 backdrop-blur-xl z-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "relative px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-background"
                    : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="creative-tab-pill"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
            <span className="ml-auto text-[12px] font-mono text-foreground/30 whitespace-nowrap">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Gallery Grid ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-24">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px border-t border-l border-border"
          >
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-r border-b border-border bg-background overflow-hidden aspect-[4/5]"
              >
                {/* Image or Placeholder */}
                {work.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-foreground/[0.02] text-foreground/20">
                    <ImageIcon className="w-8 h-8" strokeWidth={1} />
                    <p className="text-[11px] font-mono uppercase tracking-widest">
                      Coming Soon
                    </p>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-400 flex flex-col justify-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={clsx("w-1.5 h-1.5 rounded-full", categoryDot[work.category])} />
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
                        {categoryLabels[work.category]}
                      </span>
                    </div>
                    <p className="text-white font-heading font-semibold text-lg tracking-tight leading-snug">
                      {work.title}
                    </p>
                    {work.tools && (
                      <p className="text-white/50 text-xs mt-1">
                        {work.tools.join(" · ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Year badge */}
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border border-border/60 rounded-full px-2.5 py-1 text-[11px] font-mono text-foreground/50">
                  {work.year}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-foreground/30">
            <ImageIcon className="w-12 h-12 mb-4" strokeWidth={1} />
            <p className="text-lg font-medium">Nothing here yet.</p>
          </div>
        )}
      </div>

      {/* ── Footer CTA ── */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-foreground/40 text-sm font-light">
            More work available on request.
          </p>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold bg-foreground text-background rounded-full px-6 py-3 hover:bg-foreground/85 transition-all duration-300"
          >
            Get in touch
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
