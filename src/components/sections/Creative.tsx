"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Camera, Palette, Video } from "lucide-react";

const tools = [
  "Photoshop",
  "After Effects",
  "Alight Motion",
  "CapCut",
  "Canva",
  "Pixellab",
  "Premiere Pro",
  "Lightroom",
];

const pillars = [
  {
    icon: Camera,
    label: "Photography",
    description: "Event, portrait & documentary",
  },
  {
    icon: Palette,
    label: "Graphic Design",
    description: "Poster, branding & visual identity",
  },
  {
    icon: Video,
    label: "Video Editing",
    description: "Short-form, motion & cinematic",
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

export default function Creative() {
  return (
    <section
      id="creative"
      className="w-full py-32 lg:py-48 border-t border-border/50 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ── Label ── */}
        <motion.p
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40 mb-10"
        >
          05 — Visual World
        </motion.p>

        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          {/* Left: Headline */}
          <div className="lg:col-span-5">
            <motion.h2
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[0.95] mb-8"
            >
              Beyond
              <br />
              the Code.
            </motion.h2>
            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-lg text-foreground/70 font-light leading-relaxed max-w-sm"
            >
              Before I wrote components, I was behind a lens and in a timeline.
              As a Member and later Coordinator of{" "}
              <span className="text-foreground font-medium">PDD</span>{" "}
              (Publikasi, Dekorasi &amp; Dokumentasi) in my Student Union, I built
              a creative eye that now shapes how I design software.
            </motion.p>
          </div>

          {/* Right: Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-end gap-0 border-t border-l border-border">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  custom={3 + i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group flex items-center gap-6 p-8 border-b border-r border-border hover:bg-foreground/[0.02] transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center shrink-0 group-hover:border-foreground/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[17px] font-semibold tracking-tight">{pillar.label}</p>
                    <p className="text-sm text-foreground/50 mt-0.5">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Tool Marquee ── */}
        <motion.div
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 overflow-hidden"
        >
          <div className="flex gap-0 border-t border-b border-border py-4">
            <div className="flex gap-12 animate-marquee whitespace-nowrap pr-12">
              {[...tools, ...tools].map((tool, i) => (
                <span
                  key={i}
                  className="text-sm font-medium tracking-widest uppercase text-foreground/30"
                >
                  {tool}
                  <span className="ml-12 text-foreground/20">·</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          custom={7}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Link
            href="/creative"
            className="group inline-flex items-center gap-4 border border-foreground/20 rounded-2xl px-8 py-5 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <span className="text-[15px] font-semibold tracking-tight">
              View Creative Portfolio
            </span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
