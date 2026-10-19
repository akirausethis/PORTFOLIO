"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Cpu, Layers, ArrowUpRight } from "lucide-react";

const stats = [
  { value: "5+", label: "Projects Shipped" },
  { value: "1+", label: "Years Building" },
  { value: "3+", label: "Tech Stacks" },
  { value: "∞", label: "Curiosity" },
];

const values = [
  "Clean Code", "Minimal Design", "User First", "Fast Delivery",
  "Type Safety", "AI-Augmented", "Full Stack", "Continuous Learning",
];

const focuses = [
  {
    number: "01",
    title: "Software Development",
    description: "Building robust, scalable web and mobile applications using modern frameworks. I prioritize clean architecture and maintainable code over quick fixes.",
    icon: Code2,
  },
  {
    number: "02",
    title: "User-Centered UI/UX",
    description: "Crafting interfaces where every pixel has a purpose. Design is not decoration — it's the difference between software people endure and software people love.",
    icon: Layers,
  },
  {
    number: "03",
    title: "AI Integration",
    description: "Embedding intelligence into everyday tools. From LLM-powered features to ML resilience patterns, I explore how AI can augment — not replace — great engineering.",
    icon: Cpu,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="about" ref={sectionRef} className="relative w-full py-32 border-t border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Top Row: Label + Headline split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24 lg:mb-32">

          {/* Left: Badge + Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-10 lg:pt-3"
          >
            {/* Badge */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-foreground/50 font-semibold border border-border rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 inline-block" />
                About Me
              </span>
            </div>

            {/* Framed Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full max-w-[460px] mx-auto lg:mx-0"
            >
              {/* Back layers (stacked card effect) */}
              <div className="absolute inset-0 rounded-[28px] border border-dashed border-foreground/15 rotate-[4deg] translate-x-3 translate-y-3 transition-transform duration-700 group-hover:rotate-[6deg] group-hover:translate-x-4" />
              <div className="absolute inset-0 rounded-[28px] bg-foreground/[0.04] border border-border -rotate-[2.5deg] -translate-x-2 translate-y-1 transition-transform duration-700 group-hover:-rotate-[4deg]" />

              {/* Main frame (passe-partout) */}
              <div className="relative rounded-[28px] bg-background border border-border p-3 sm:p-3.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
                {/* Frame top bar */}
                <div className="flex items-center justify-between px-2 pb-3 pt-1">
                  <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Portrait — 001
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/40">
                    SBY, ID
                  </span>
                </div>

                {/* Image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[20px] bg-foreground/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/profile.jpg"
                    alt="Kelvin Marcello"
                    className="w-full h-full object-cover object-top grayscale scale-[1.06] group-hover:grayscale-0 group-hover:scale-[1.1] transition-all duration-700 ease-out"
                  />

                  {/* Viewfinder corner brackets */}
                  <span className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/80 rounded-tl-md" />
                  <span className="pointer-events-none absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/80 rounded-tr-md" />
                  <span className="pointer-events-none absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/80 rounded-bl-md" />
                  <span className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/80 rounded-br-md" />

                  {/* Center focus cross */}
                  <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <span className="absolute top-1/2 left-0 right-0 h-px bg-white" />
                    <span className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
                  </span>

                  {/* Bottom gradient for readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Overlay caption */}
                  <div className="absolute bottom-6 left-7 right-7 flex items-end justify-between text-white">
                    <div>
                      <p className="font-heading font-bold text-lg sm:text-xl leading-none tracking-tight">Kelvin Marcello</p>
                      <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/70 mt-1.5">Software Engineer</p>
                    </div>
                    <span className="text-[11px] font-mono text-white/70">EST. 2004</span>
                  </div>
                </div>

                {/* Frame bottom bar */}
                <div className="flex items-center justify-between px-2 pt-3 pb-1 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/40">
                  <span>ƒ/1.8 · 1/250 · ISO 100</span>
                  <span className="hidden sm:inline">vinworkspace.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Headline + Body */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-foreground leading-[1.05] mb-12"
            >
              Building things that
              {" "}<em className="not-italic text-foreground/30">actually matter</em>
              {" "}— not just things that look good.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-foreground/70 font-light leading-relaxed mb-12 max-w-3xl"
            >
              <p>
                I&apos;m a software engineering intern at Eterna Indonesia and an Informatics student at Universitas Ciputra. I&apos;m obsessed with solving real problems with clean, purposeful code.
              </p>
              <p>
                My core stack revolves around Next.js, React, and TypeScript. I&apos;m also exploring how AI can be woven into everyday applications — not as a gimmick, but as genuine leverage.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-border"
            >
              {stats.map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-4xl lg:text-5xl font-heading font-bold tracking-tight text-foreground mb-1.5">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/50 tracking-wide uppercase font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scrolling Marquee of Values */}
        <div className="relative py-8 my-16 border-y border-border overflow-hidden">
          <motion.div
            style={{ x: marqueeX }}
            className="flex items-center gap-12 whitespace-nowrap will-change-transform"
          >
            {[...values, ...values, ...values].map((val, i) => (
              <span key={i} className="flex items-center gap-4 text-foreground/30 text-sm tracking-[0.2em] uppercase font-semibold shrink-0">
                {val}
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 shrink-0" />
              </span>
            ))}
          </motion.div>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
          {focuses.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col p-8 lg:p-12 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 hover:bg-foreground/[0.025] transition-colors duration-300 overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute top-6 right-8 text-6xl font-heading font-bold text-foreground/[0.04] select-none group-hover:text-foreground/[0.07] transition-colors duration-300">
                {item.number}
              </span>

              <item.icon className="w-7 h-7 text-foreground/50 mb-8 group-hover:text-foreground transition-colors duration-300" strokeWidth={1.5} />

              <h3 className="text-xl font-medium text-foreground mb-4 tracking-tight">{item.title}</h3>
              <p className="text-foreground/60 leading-relaxed font-light text-[15px] flex-1">
                {item.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-foreground/30 font-semibold group-hover:text-foreground/60 transition-colors duration-300">
                <span>Focus area</span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Section number marker */}
      <div className="hidden xl:flex absolute right-8 lg:right-12 top-0 flex-col items-center">
        <div className="w-px h-24 bg-border mb-6" />
        <span className="text-3xl font-heading font-medium mb-6 tracking-tight text-foreground/20">02</span>
        <span
          className="text-[10px] font-semibold tracking-[0.2em] text-foreground/40 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          About
        </span>
      </div>
    </section>
  );
}

