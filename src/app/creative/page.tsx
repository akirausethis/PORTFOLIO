"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Play, X, ExternalLink, ImageIcon } from "lucide-react";
import {
  creativeWorks,
  categoryLabels,
  type CreativeCategory,
  type CreativeWork,
} from "@/data/creative";
import clsx from "clsx";

type FilterTab = "all" | CreativeCategory;

const tabs: { id: FilterTab; label: string; dot?: string }[] = [
  { id: "all", label: "All Work" },
  { id: "photography", label: "Photography", dot: "bg-sky-400" },
  { id: "graphic-design", label: "Graphic Design", dot: "bg-violet-400" },
  { id: "video-editing", label: "Video Editing", dot: "bg-amber-400" },
  { id: "motion-design", label: "Motion Design", dot: "bg-emerald-400" },
];

const categoryDot: Record<CreativeCategory, string> = {
  photography: "bg-sky-400",
  "graphic-design": "bg-violet-400",
  "video-editing": "bg-amber-400",
  "motion-design": "bg-emerald-400",
};

const categoryBg: Record<CreativeCategory, string> = {
  photography: "from-sky-500/20",
  "graphic-design": "from-violet-500/20",
  "video-editing": "from-amber-500/20",
  "motion-design": "from-emerald-500/20",
};

function getYoutubeId(link: string) {
  const parts = link.split("youtu.be/");
  if (parts[1]) return parts[1].split("?")[0];
  return "";
}

// Single card — respects natural media aspect ratios
function GalleryCard({
  work,
  index,
  onClick,
}: {
  work: CreativeWork;
  index: number;
  onClick: () => void;
}) {
  const isVideo = !!work.link;
  const isEmpty = !work.image && !work.link;

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-foreground/[0.04] w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 block"
    >
      {/* ── Media ── */}
      {isEmpty && (
        <div className="aspect-square flex flex-col items-center justify-center gap-3 text-foreground/20">
          <ImageIcon className="w-8 h-8" strokeWidth={1} />
          <span className="text-[11px] font-mono uppercase tracking-widest">Coming Soon</span>
        </div>
      )}

      {/* Image at its natural ratio */}
      {!isEmpty && !isVideo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}

      {/* YouTube thumbnail at 16:9 */}
      {isVideo && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* Centered play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:scale-110 group-hover:border-white/40">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom gradient + info overlay ── */}
      {!isEmpty && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient scrim — fades in on hover */}
          <div className={clsx(
            "absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-400",
            `from-black/80 via-black/10 ${categoryBg[work.category]}`,
            "opacity-0 group-hover:opacity-100"
          )} />

          {/* Info — slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", categoryDot[work.category])} />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                {categoryLabels[work.category]}
              </span>
            </div>
            <p className="font-heading font-semibold text-[15px] tracking-tight leading-snug text-white line-clamp-2">
              {work.title}
            </p>
            {work.tools && (
              <p className="text-white/45 text-[11px] mt-1">{work.tools.join(" · ")}</p>
            )}
          </div>
        </div>
      )}

      {/* Year — top right, always visible */}
      {!isEmpty && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono text-white/0 group-hover:text-white/40 transition-colors duration-300 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {work.year}
          </span>
        </div>
      )}
    </motion.button>
  );
}

export default function CreativePage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedWork, setSelectedWork] = useState<CreativeWork | null>(null);

  const filtered =
    activeTab === "all"
      ? creativeWorks
      : creativeWorks.filter((w) => w.category === activeTab);

  useEffect(() => {
    document.body.style.overflow = selectedWork ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedWork]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedWork(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background">

      {/* ── Header ── */}
      <div className="pt-32 lg:pt-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-[13px] font-medium text-foreground/40 hover:text-foreground transition-colors mb-16"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-20 items-end">
            <div className="lg:col-span-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/35 mb-7">
                Visual World
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[96px] font-heading font-bold tracking-tight leading-[0.9]">
                Creative<br />Works.
              </h1>
            </div>
            <div className="lg:col-span-6">
              <div className="border-l-2 border-border pl-8 space-y-5">
                <p className="text-[17px] text-foreground/65 font-light leading-relaxed">
                  Beyond engineering — years of documenting events, crafting visual
                  identities, and telling stories through the lens as{" "}
                  <span className="text-foreground font-medium">Coordinator of PDD</span>.
                </p>
                <div className="flex items-center gap-8 pt-1">
                  {[
                    { n: creativeWorks.filter(w => w.category === "video-editing").length, label: "Videos" },
                    { n: creativeWorks.filter(w => w.category === "motion-design").length, label: "GFX" },
                    { n: creativeWorks.length, label: "Total Pieces" },
                  ].map(({ n, label }) => (
                    <div key={label}>
                      <p className="text-3xl font-heading font-bold tracking-tight">{n}</p>
                      <p className="text-xs text-foreground/35 uppercase tracking-widest mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Photoshop", "After Effects", "Alight Motion", "CapCut", "Canva", "Pixellab"].map((t) => (
                    <span key={t} className="text-[11px] font-mono bg-foreground/5 border border-border/60 rounded-full px-3 py-1 text-foreground/45">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Bar — contained to grid width ── */}
      <div className="sticky top-20 lg:top-24 z-40 bg-background/80 backdrop-blur-xl border-t border-border/60">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-0.5 py-2.5 overflow-x-auto [scrollbar-width:none]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-background"
                    : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
                )}
              >
                {tab.dot && (
                  <span className={clsx(
                    "w-1.5 h-1.5 rounded-full transition-opacity",
                    tab.dot,
                    activeTab === tab.id ? "opacity-0" : "opacity-60"
                  )} />
                )}
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            ))}
            <span className="ml-auto text-[11px] font-mono text-foreground/25 whitespace-nowrap pr-1">
              {filtered.length} pieces
            </span>
          </div>
        </div>
      </div>

      {/* ── Masonry Gallery — natural aspect ratios ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 lg:py-16">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-x-4"
          >
            {filtered.map((work, i) => (
              <div key={work.id} className="break-inside-avoid mb-4 inline-block w-full">
                <GalleryCard
                  work={work}
                  index={i}
                  onClick={() => setSelectedWork(work)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-foreground/20">
            <ImageIcon className="w-10 h-10 mb-4" strokeWidth={1} />
            <p className="text-base font-medium">Nothing here yet.</p>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-foreground/35 text-sm font-light">
            More work available on request — let&apos;s talk.
          </p>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2.5 text-[13px] font-semibold bg-foreground text-background rounded-full px-6 py-3 hover:opacity-85 transition-opacity"
          >
            Get in touch
            <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/92 backdrop-blur-2xl"
            onClick={() => setSelectedWork(null)}
          >
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-foreground/50 hover:text-foreground hover:border-foreground/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 14 }}
              transition={{ type: "spring", damping: 28, stiffness: 340 }}
              className="w-full max-w-5xl mx-4 md:mx-16 overflow-auto max-h-[92vh] [scrollbar-width:none]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media */}
              <div className="rounded-2xl overflow-hidden bg-foreground/5 border border-border/40">
                {selectedWork.link ? (
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYoutubeId(selectedWork.link)}?autoplay=1&rel=0&modestbranding=1`}
                      title={selectedWork.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-6 min-h-[20vh]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedWork.image}
                      alt={selectedWork.title}
                      className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="mt-5 px-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={clsx("w-1.5 h-1.5 rounded-full", categoryDot[selectedWork.category])} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35">
                      {categoryLabels[selectedWork.category]} · {selectedWork.year}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                    {selectedWork.title}
                  </h3>
                  {selectedWork.tools && (
                    <p className="text-foreground/40 text-sm mt-2">{selectedWork.tools.join(" · ")}</p>
                  )}
                </div>
                {selectedWork.link && (
                  <a
                    href={selectedWork.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 text-[12px] font-semibold border border-border rounded-full px-4 py-2 text-foreground/50 hover:text-foreground hover:border-foreground/25 hover:bg-foreground/5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Watch on YouTube
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
