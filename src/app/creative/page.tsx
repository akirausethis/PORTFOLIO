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

const TABS: { id: FilterTab; label: string; color: string }[] = [
  { id: "all",            label: "All Work",      color: "text-foreground" },
  { id: "photography",    label: "Photography",   color: "text-sky-500" },
  { id: "video-editing",  label: "Video Editing", color: "text-amber-500" },
  { id: "motion-editing", label: "Motion Editing",color: "text-emerald-500" },
];

const SUB_TABS: Record<string, string[]> = {
  "video-editing":  ["All", "ADS", "AMV", "RECAP"],
  "motion-editing": ["All", "GFX", "Motion Design"],
};

// map display label -> subcategory value used in data
const SUB_LABEL_TO_KEY: Record<string, string> = {
  "All": "all",
  "ADS": "ads",
  "AMV": "amv",
  "RECAP": "recap",
  "GFX": "gfx",
  "Motion Design": "motion-design",
};

const CAT_DOT: Record<CreativeCategory, string> = {
  photography:      "bg-sky-400",
  "video-editing":  "bg-amber-400",
  "motion-editing": "bg-emerald-400",
};

const CAT_GLOW: Record<CreativeCategory, string> = {
  photography:      "from-sky-500/30",
  "video-editing":  "from-amber-500/30",
  "motion-editing": "from-emerald-500/30",
};

function getYoutubeId(link: string) {
  return link.split("youtu.be/")[1]?.split("?")[0] ?? "";
}

function GalleryCard({ work, index, onClick }: { work: CreativeWork; index: number; onClick: () => void }) {
  const isVideo = !!work.link;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.035, 0.6), duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-foreground/[0.04] w-full text-left focus:outline-none"
    >
      {/* Media */}
      {!isVideo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : (
        <div className={clsx("relative w-full overflow-hidden", work.aspect === "portrait" ? "aspect-[9/16]" : "aspect-video")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className={clsx(
        "absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500",
        `from-black/75 via-black/5 ${CAT_GLOW[work.category]}`,
        "opacity-0 group-hover:opacity-100 pointer-events-none"
      )} />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", CAT_DOT[work.category])} />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/55">
            {categoryLabels[work.category]}
          </span>
        </div>
        <p className="font-semibold text-[14px] leading-snug text-white line-clamp-1">{work.title}</p>
        {work.tools && <p className="text-white/40 text-[11px] mt-0.5">{work.tools.join(" · ")}</p>}
      </div>

      {/* Year badge */}
      <div className="absolute top-2.5 right-2.5 pointer-events-none">
        <span className="text-[10px] font-mono text-transparent group-hover:text-white/40 transition-colors duration-300 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {work.year}
        </span>
      </div>
    </motion.button>
  );
}

export default function CreativePage() {
  const [activeTab, setActiveTab]       = useState<FilterTab>("all");
  const [activeSub, setActiveSub]       = useState("All");
  const [selectedWork, setSelectedWork] = useState<CreativeWork | null>(null);

  useEffect(() => { setActiveSub("All"); }, [activeTab]);

  const filtered = creativeWorks.filter((w) => {
    if (activeTab !== "all" && w.category !== activeTab) return false;
    const subKey = SUB_LABEL_TO_KEY[activeSub] ?? "all";
    if (subKey !== "all" && w.subcategory !== subKey) return false;
    return true;
  });

  useEffect(() => {
    document.body.style.overflow = selectedWork ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedWork]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedWork(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const hasSubs = activeTab !== "all" && SUB_TABS[activeTab];
  const subs    = hasSubs ? SUB_TABS[activeTab] : [];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Header ── */}
      <div className="pt-32 lg:pt-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Link href="/" className="group inline-flex items-center gap-2.5 text-[13px] font-medium text-foreground/40 hover:text-foreground transition-colors mb-14">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-20 items-end">
            <div className="lg:col-span-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/35 mb-6">Visual World</p>
              <h1 className="text-6xl md:text-8xl lg:text-[96px] font-heading font-bold tracking-tight leading-[0.9]">Creative<br />Works.</h1>
            </div>
            <div className="lg:col-span-6">
              <div className="border-l-2 border-border pl-8 space-y-5">
                <p className="text-[17px] text-foreground/60 font-light leading-relaxed">
                  Beyond engineering — years of documenting events, crafting visual identities, and telling stories through the lens as{" "}
                  <span className="text-foreground font-medium">Coordinator of PDD</span>.
                </p>
                <div className="flex items-center gap-8">
                  {[
                    { n: creativeWorks.filter(w => w.category === "video-editing").length,  label: "Videos"  },
                    { n: creativeWorks.filter(w => w.category === "motion-editing").length, label: "Motion"  },
                    { n: creativeWorks.filter(w => w.category === "photography").length,    label: "Photos"  },
                  ].map(({ n, label }) => (
                    <div key={label}>
                      <p className="text-3xl font-heading font-bold tracking-tight">{n}</p>
                      <p className="text-[11px] text-foreground/35 uppercase tracking-widest mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Photoshop", "After Effects", "Alight Motion", "CapCut", "Canva", "Pixellab", "Lightroom"].map((t) => (
                    <span key={t} className="text-[11px] font-mono bg-foreground/5 border border-border/60 rounded-full px-3 py-1 text-foreground/40">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Bar — editorial underline style ── */}
      <div className="sticky top-[64px] lg:top-[72px] z-40 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">

          {/* Main category row */}
          <div className="flex items-end gap-0 overflow-x-auto [scrollbar-width:none]">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "relative shrink-0 px-5 py-4 text-[13px] font-semibold tracking-wide transition-colors duration-200",
                    isActive ? "text-foreground" : "text-foreground/35 hover:text-foreground/70"
                  )}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Piece count far right */}
            <span className="ml-auto shrink-0 self-center text-[11px] font-mono text-foreground/25 whitespace-nowrap pl-6">
              {filtered.length} pieces
            </span>
          </div>

          {/* Sub-category row — only when relevant */}
          <AnimatePresence>
            {hasSubs && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 pb-3 pt-0.5 overflow-x-auto [scrollbar-width:none]">
                  {subs.map((sub) => {
                    const isActiveSub = activeSub === sub;
                    return (
                      <button
                        key={sub}
                        onClick={() => setActiveSub(sub)}
                        className={clsx(
                          "shrink-0 px-3.5 py-1 rounded-full text-[12px] font-medium border transition-all duration-200",
                          isActiveSub
                            ? "border-foreground/30 bg-foreground/6 text-foreground"
                            : "border-transparent text-foreground/35 hover:text-foreground/60 hover:border-border"
                        )}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Gallery ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 lg:py-14">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${activeTab}-${activeSub}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {filtered.map((work, i) => (
              <div key={work.id} className="break-inside-avoid mb-4 inline-block w-full">
                <GalleryCard work={work} index={i} onClick={() => setSelectedWork(work)} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-foreground/20">
            <ImageIcon className="w-10 h-10 mb-4" strokeWidth={1} />
            <p className="text-sm">Nothing here yet.</p>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-foreground/35 text-sm font-light">More work available on request — let&apos;s talk.</p>
          <Link href="/#contact" className="group inline-flex items-center gap-2.5 text-[13px] font-semibold bg-foreground text-background rounded-full px-6 py-3 hover:opacity-80 transition-opacity">
            Get in touch <ArrowLeft className="w-3.5 h-3.5 rotate-180 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-2xl"
            onClick={() => setSelectedWork(null)}
          >
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-foreground/50 hover:text-foreground transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div
              initial={{ scale: 0.97, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 340 }}
              className="w-full max-w-5xl mx-4 md:mx-16 max-h-[92vh] overflow-auto [scrollbar-width:none]"
              onClick={(e) => e.stopPropagation()}
            >
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
                  <div className="flex items-center justify-center p-4 min-h-[20vh]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedWork.image} alt={selectedWork.title} className="max-w-full max-h-[72vh] w-auto h-auto object-contain" />
                  </div>
                )}
              </div>

              <div className="mt-4 px-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={clsx("w-1.5 h-1.5 rounded-full", CAT_DOT[selectedWork.category])} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35">
                      {categoryLabels[selectedWork.category]} · {selectedWork.year}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">{selectedWork.title}</h3>
                  {selectedWork.tools && <p className="text-foreground/40 text-sm mt-1.5">{selectedWork.tools.join(" · ")}</p>}
                </div>
                {selectedWork.link && (
                  <a href={selectedWork.link} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 text-[12px] font-semibold border border-border rounded-full px-4 py-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all">
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
