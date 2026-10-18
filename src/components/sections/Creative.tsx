"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Camera, Palette, Video, Film, Sparkles, Layers } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

// Curated visual disciplines
const disciplines = [
  {
    icon: Camera,
    title: "Photography",
    badge: "15+ Shoots",
    description: "Event documentation, street portraits, and campus journalism with natural grading.",
    preview: "/creative/Photography/SaveInta.com_654565344_18115211683579763_7209571235361261907_n.jpg",
    tools: ["Lightroom", "Sony Alpha", "Canon"],
    accent: "from-amber-500/20 to-orange-500/0",
  },
  {
    icon: Film,
    title: "Motion & GFX",
    badge: "8+ Artworks",
    description: "Anime graphic design, typography hierarchy, and keyframe animations.",
    preview: "/creative/Motion Editing/GFX/GFX - Azusa.jpg",
    tools: ["After Effects", "Photoshop"],
    accent: "from-indigo-500/20 to-purple-500/0",
  },
  {
    icon: Video,
    title: "Event Recap",
    badge: "Recap & Teaser",
    description: "Dynamic pacing, music sync, and multi-cam recap videos for campus & tech events.",
    preview: "/creative/Motion Editing/Motion Design/RED CARPET NIGHT/RCN - Photobooth.png",
    tools: ["CapCut", "After Effects", "Premiere"],
    accent: "from-rose-500/20 to-pink-500/0",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    badge: "PDD Lead",
    description: "Head of publication & design at HACKFEST, NPLC, and Red Carpet Night.",
    preview: "/creative/Motion Editing/Motion Design/HACKFEST/HACKFEST - Poster.png",
    tools: ["Photoshop", "Canva", "Illustrator"],
    accent: "from-emerald-500/20 to-teal-500/0",
  },
];

// Curated gallery preview marquee
const showcaseArtwork = [
  { title: "GFX Azusa", image: "/creative/Motion Editing/GFX/GFX - Azusa.jpg", tag: "GFX" },
  { title: "Inauguration Night", image: "/creative/Motion Editing/Motion Design/INAUGURATION NIGHT/INAUGURATION NIGHT - Poster.png", tag: "Design" },
  { title: "Campus Documentary", image: "/creative/Photography/SaveInta.com_654565344_18115211683579763_7209571235361261907_n.jpg", tag: "Photo" },
  { title: "GFX Firefly", image: "/creative/Motion Editing/GFX/GFX - Firefly.jpg", tag: "GFX" },
  { title: "Hackfest Identity", image: "/creative/Motion Editing/Motion Design/HACKFEST/HACKFEST - Poster.png", tag: "Branding" },
  { title: "Event Portrait", image: "/creative/Photography/SaveInta.com_655259148_18131687422555479_4893891774833603298_n.jpg", tag: "Photo" },
  { title: "GFX Camellya", image: "/creative/Motion Editing/GFX/GFX - Camellya.jpg", tag: "GFX" },
  { title: "NPLC Champion Poster", image: "/creative/Motion Editing/Motion Design/NPLC/NPLC - Poster.png", tag: "Design" },
];

export default function Creative() {
  return (
    <section
      id="creative"
      className="w-full py-28 sm:py-36 lg:py-44 border-t border-border/50 relative overflow-hidden bg-gradient-to-b from-transparent via-foreground/[0.015] to-transparent"
    >
      {/* Subtle ambient blur in background */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* ── Section Label & Status ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 sm:mb-16">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/50">
              05 — Visual World &amp; Media
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-background/80 text-[11px] font-mono text-foreground/70 shadow-sm">
              <Sparkles className="w-3 h-3 text-foreground/80" />
              40+ Archival Pieces
            </span>
          </motion.div>
        </div>

        {/* ── Hero Split: Title + Narrative + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-7">
            <motion.h2
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-heading font-black tracking-tight leading-[0.93] text-foreground mb-6"
            >
              Beyond the <br />
              terminal &amp; code.
            </motion.h2>
            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-base sm:text-lg text-foreground/70 font-light leading-relaxed max-w-2xl"
            >
              Before shipping web apps, I spent years behind lenses, keyframe curves, and poster layouts. 
              As <span className="text-foreground font-semibold">Coordinator of PDD</span> (Publikasi, Dekorasi &amp; Dokumentasi) 
              in student unions and major tech events, I shaped brand identities that reached thousands of students. 
              That design discipline is the secret behind my UI craft today.
            </motion.p>
          </div>

          {/* Quick Credibility Pill Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-5 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-sm"
            >
              <div className="text-3xl font-heading font-black tracking-tight mb-1 text-foreground">3+</div>
              <div className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Years Crafting</div>
              <p className="text-[11px] text-foreground/40 mt-1">From photography to motion edits</p>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-5 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-sm"
            >
              <div className="text-3xl font-heading font-black tracking-tight mb-1 text-foreground">PDD</div>
              <div className="text-xs font-medium text-foreground/60 uppercase tracking-wider">Coordinator</div>
              <p className="text-[11px] text-foreground/40 mt-1">Hackfest, NPLC &amp; RCN lead</p>
            </motion.div>
          </div>
        </div>

        {/* ── 4 Rich Visual Discipline Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 sm:mb-20">
          {disciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                custom={3 + idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative rounded-3xl border border-border/80 bg-background/80 overflow-hidden hover:border-foreground/30 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image preview with gradient vignette */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-foreground/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.preview}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border text-[10px] font-mono font-medium text-foreground/80">
                      <Icon className="w-3 h-3" />
                      {item.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-foreground/90 text-background text-[10px] font-mono font-semibold">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-foreground transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
                    {item.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-foreground/[0.04] text-foreground/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Visual Marquee Banner ── */}
        <motion.div
          custom={7}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 sm:mb-16 rounded-3xl border border-border/80 bg-foreground/[0.02] p-4 sm:p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-foreground/60" />
              <span className="text-xs font-mono uppercase tracking-wider text-foreground/70 font-semibold">
                Live Studio Roll
              </span>
            </div>
            <span className="text-[11px] font-mono text-foreground/40 hidden sm:inline">
              GFX • Motion • Photography • Editorial
            </span>
          </div>

          <div className="relative overflow-hidden w-full">
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {[...showcaseArtwork, ...showcaseArtwork].map((art, i) => (
                <div
                  key={`${art.title}-${i}`}
                  className="relative shrink-0 w-44 sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden border border-border group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground truncate drop-shadow-sm">
                      {art.title}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-background/90 text-foreground/80 font-bold">
                      {art.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── High-Impact CTA Strip ── */}
        <motion.div
          custom={8}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-3xl border border-border bg-foreground text-background p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-background/60 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Full Dedicated Archive
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight text-background leading-snug">
              Explore the entire Creative Studio gallery.
            </h3>
            <p className="text-sm text-background/70 mt-2 font-light">
              Deep dive into all 40+ high-res photography captures, anime GFX posters, event branding suites, and YouTube video recaps.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/creative"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-background text-foreground font-semibold text-sm hover:bg-background/90 transition-all duration-300 shadow-md active:scale-95"
            >
              <span>Enter Creative Studio</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Decorative ambient background circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-background/5 blur-2xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

