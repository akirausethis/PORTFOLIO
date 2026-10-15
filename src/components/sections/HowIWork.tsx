"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  GitBranch,
  Palette,
  Terminal,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Workflow,
  Layers,
} from "lucide-react";
import Link from "next/link";

interface Step {
  number: string;
  phase: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  deliverables: string[];
  icon: typeof Lightbulb;
  accent: string;
  badgeColor: string;
}

const steps: Step[] = [
  {
    number: "01",
    phase: "Phase 01",
    title: "Ideation & Discovery",
    tagline: "First, come up with the idea.",
    description:
      "Every impactful project begins with recognizing genuine friction. I explore the root problem, understand user intent, analyze real-world constraints, and validate core concepts before touching any design canvas or code editor.",
    details: [
      "Problem definition & friction analysis",
      "User intent & scenario mapping",
      "Brainstorming & concept validation",
      "Technical & architectural feasibility",
    ],
    deliverables: ["Problem Statement", "User Stories", "Feasibility Study", "Concept Scope"],
    icon: Lightbulb,
    accent: "from-amber-500/10 to-amber-500/0",
    badgeColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  },
  {
    number: "02",
    phase: "Phase 02",
    title: "Strategy & Planning",
    tagline: "Blueprints before building.",
    description:
      "Precision planning eliminates technical debt. I map data schemas, choose the optimal tech stack, structure API contracts, and break deliverables into clear milestones to ensure velocity and predictable execution.",
    details: [
      "System architecture & data modeling",
      "Tech stack & dependency evaluation",
      "Milestone breakdown & sprint scope",
      "API contracts & state specifications",
    ],
    deliverables: ["System Architecture", "Database Schema", "Project Roadmap", "API Contracts"],
    icon: GitBranch,
    accent: "from-blue-500/10 to-blue-500/0",
    badgeColor: "text-blue-400 border-blue-500/20 bg-blue-500/5",
  },
  {
    number: "03",
    phase: "Phase 03",
    title: "UI/UX & Prototyping",
    tagline: "Designing with engineering intent.",
    description:
      "Design is how it works, not just how it looks. I craft design systems in Figma, establish responsive typographic tokens, and build tactile interactive prototypes to ensure the interface feels intuitive, effortless, and refined.",
    details: [
      "Wireframing & user flow optimization",
      "Figma high-fidelity interactive prototypes",
      "Reusable component & design tokens",
      "Accessibility & responsive layouts",
    ],
    deliverables: ["Figma Prototypes", "Component Library", "Design Tokens", "Micro-Interactions"],
    icon: Palette,
    accent: "from-purple-500/10 to-purple-500/0",
    badgeColor: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  },
  {
    number: "04",
    phase: "Phase 04",
    title: "Full-Stack Execution",
    tagline: "Turning blueprints into clean code.",
    description:
      "Bringing designs to life with robust engineering. I build performant frontends in Next.js & React, implement type-safe backends with Prisma & PostgreSQL, and maintain clean Git branches with strict CI checks.",
    details: [
      "Modular, type-safe Next.js & TypeScript",
      "Performant database ORM & query logic",
      "Fluid micro-interactions & animations",
      "Automated CI/CD & type-check enforcement",
    ],
    deliverables: ["Production Frontend", "Scalable APIs", "Database Migrations", "Clean Codebase"],
    icon: Terminal,
    accent: "from-emerald-500/10 to-emerald-500/0",
    badgeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  {
    number: "05",
    phase: "Phase 05",
    title: "Testing, Launch & Beyond",
    tagline: "Shipped with confidence, polished forever.",
    description:
      "A product is only complete when it runs flawlessly in the wild. I conduct cross-browser audits, optimize Core Web Vitals for speed, deploy on modern cloud infrastructure, and monitor telemetry for continuous iteration.",
    details: [
      "Cross-device QA & edge-case stress testing",
      "Lighthouse optimization & SEO audit",
      "Automated staging & production deployment",
      "Post-launch telemetry & iterative polish",
    ],
    deliverables: ["Live Deployment", "Lighthouse 95+ Audit", "CI/CD Pipeline", "Documentation"],
    icon: Rocket,
    accent: "from-rose-500/10 to-rose-500/0",
    badgeColor: "text-rose-400 border-rose-500/20 bg-rose-500/5",
  },
];

export default function HowIWork() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="how-i-work"
      className="py-32 w-full bg-background border-t border-border relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-foreground/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-foreground/50 font-semibold border border-border rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 inline-block" />
                Process & Methodology
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-foreground leading-[1.05]">
              How do I<br />
              <span className="text-foreground/25">work?</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-end"
          >
            <p className="text-lg text-foreground/55 font-light leading-relaxed max-w-xl">
              From the initial spark to high-performance production code. A disciplined 5-stage
              engineering and design methodology built for transparency, speed, and lasting craft.
            </p>

            {/* Quick step counter pill */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border/60 text-xs font-mono text-foreground/40 uppercase tracking-widest">
              <span>05 Distinct Stages</span>
              <span>·</span>
              <span>100% Transparent Flow</span>
              <span>·</span>
              <span>End-to-End Delivery</span>
            </div>
          </motion.div>
        </div>

        {/* ── Interactive Step Tracker / Timeline Ribbon (Desktop & Tablet) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center justify-between gap-3 mb-12 p-3 rounded-2xl border border-border bg-foreground/[0.015] backdrop-blur-sm"
        >
          {steps.map((step, idx) => {
            const isHovered = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => {
                  setActiveStep(activeStep === idx ? null : idx);
                  const el = document.getElementById(`step-${step.number}`);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                className={`flex-1 flex items-center justify-center gap-3 py-3 px-3 rounded-xl border transition-all duration-300 group ${
                  isHovered
                    ? "bg-foreground text-background border-foreground shadow-md"
                    : "bg-transparent text-foreground/60 border-transparent hover:border-border hover:bg-foreground/[0.03] hover:text-foreground"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                    isHovered
                      ? "bg-background text-foreground"
                      : "bg-foreground/5 text-foreground/50 border border-border"
                  }`}
                >
                  {step.number}
                </div>
                <div className="text-left">
                  <p className={`text-xs font-heading font-semibold tracking-tight transition-colors ${
                    isHovered ? "text-background" : "text-foreground"
                  }`}>
                    {step.title.split(" ")[0]}
                  </p>
                  <p className={`text-[10px] font-mono tracking-wider transition-colors ${
                    isHovered ? "text-background/70" : "text-foreground/40"
                  }`}>
                    {step.phase}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRight className={`w-3.5 h-3.5 ml-auto hidden xl:block transition-colors ${
                    isHovered ? "text-background/50" : "text-foreground/20"
                  }`} />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ── Mobile Step Pills Ribbon (Phone) ── */}
        <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-4 mb-8 -mx-6 px-6 no-scrollbar">
          {steps.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => {
                setActiveStep(activeStep === idx ? null : idx);
                const el = document.getElementById(`step-${step.number}`);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono transition-all ${
                activeStep === idx
                  ? "bg-foreground text-background border-foreground font-bold shadow-sm"
                  : "border-border bg-foreground/[0.02] text-foreground/60"
              }`}
            >
              <span>{step.number}</span>
              <span className="font-heading font-medium text-[11px]">{step.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* ── Steps Grid (Unified 6-column system for seamless phone, tablet & desktop layout) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-16">
          {steps.map((step, idx) => {
            const isHighlighted = activeStep === idx;
            const Icon = step.icon;

            // Responsive span rules:
            // - Mobile: 1 col (full width)
            // - Tablet (md): Step 01-04 take 1 col (2 per row); Step 05 takes md:col-span-2 (spans full width!)
            // - Desktop (lg): Step 01-03 take lg:col-span-2 (1/3 each = 6 cols); Step 04-05 take lg:col-span-3 (1/2 each = 6 cols)
            const spanClass =
              idx < 3
                ? "md:col-span-1 lg:col-span-2"
                : idx === 3
                ? "md:col-span-1 lg:col-span-3"
                : "md:col-span-2 lg:col-span-3";

            return (
              <motion.div
                key={step.number}
                id={`step-${step.number}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                className={`group relative rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 overflow-hidden ${spanClass} ${
                  isHighlighted
                    ? "border-foreground/50 bg-foreground/[0.035] shadow-[0_12px_40px_rgb(0,0,0,0.08)] scale-[1.008]"
                    : "border-border bg-foreground/[0.015] hover:border-foreground/30 hover:bg-foreground/[0.025]"
                }`}
              >
                {/* Background watermark number */}
                <span className="absolute top-3 right-5 text-6xl sm:text-7xl lg:text-8xl font-heading font-bold text-foreground/[0.03] select-none pointer-events-none group-hover:text-foreground/[0.06] transition-colors duration-500 -z-0">
                  {step.number}
                </span>

                <div className="relative z-10">
                  {/* Top row: Phase pill + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-foreground/50 border border-border px-3 py-1 rounded-full bg-foreground/[0.02]">
                      {step.phase}
                    </span>
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-border bg-foreground/[0.03] flex items-center justify-center group-hover:border-foreground/40 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                      <Icon className="w-5 h-5 transition-colors" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground tracking-tight mb-1.5 group-hover:text-foreground/90">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-4">
                    {step.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-foreground/60 font-light leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Key Activities Checklist */}
                  <div className={`gap-2.5 mb-7 pt-4 border-t border-border/60 ${idx >= 3 ? "grid grid-cols-1 sm:grid-cols-2" : "space-y-2.5"}`}>
                    {step.details.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground/65 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-foreground/30 shrink-0 mt-0.5 group-hover:text-foreground/70 transition-colors" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: Deliverables pills */}
                <div className="pt-4 border-t border-border/60 relative z-10">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 mb-2">
                    Key Outputs
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.deliverables.map((deliv, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-lg border border-border bg-foreground/[0.02] text-foreground/55 font-medium"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Callout Banner / Next Step ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-border bg-foreground/[0.02] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/40">
                Ready to collaborate
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-heading font-semibold text-foreground tracking-tight">
              Have an idea you want planned, designed, and executed?
            </h4>
            <p className="text-sm text-foreground/50 font-light mt-1">
              Let&apos;s build software that performs, scales, and delights users from day one.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity tracking-wide"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:bg-foreground/[0.03] transition-colors tracking-wide"
            >
              See Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
