"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";

const links = [
  { label: "Work",       href: "#projects"  },
  { label: "About",      href: "#about"     },
  { label: "Experience", href: "#experience"},
  { label: "Creative",   href: "/creative"  },
  { label: "Contact",    href: "#contact"   },
];

const socials = [
  { label: "GitHub",    href: "https://github.com/akirausethis",     Icon: SiGithub    },
  { label: "Instagram", href: "https://instagram.com/vinworkspace",  Icon: SiInstagram },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">

      {/* Big background text */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[clamp(80px,15vw,180px)] font-heading font-bold text-foreground/[0.025] leading-none tracking-tighter translate-y-4">
          vinworkspace
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

          {/* Left: name + tagline */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                Kelvin<br />Marcello<span className="text-foreground/20">.</span>
              </h2>
              <p className="text-foreground/45 text-[15px] font-light leading-relaxed max-w-xs">
                Full Stack Developer & AI Integrator. Building things that matter from Surabaya, Indonesia.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[12px] font-semibold text-foreground/40 tracking-wide">
                  Available for internship · Full-time
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: nav links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/30 mb-5">Navigate</p>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-[14px] text-foreground/55 hover:text-foreground transition-colors font-medium"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-px group-hover:translate-x-px group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/30 mb-5">Connect</p>
              <ul className="space-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-[14px] text-foreground/55 hover:text-foreground transition-colors font-medium"
                    >
                      <s.Icon className="w-3.5 h-3.5" />
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:akirabusinessinq@gmail.com"
                    className="group inline-flex items-center gap-1.5 text-[14px] text-foreground/55 hover:text-foreground transition-colors font-medium"
                  >
                    Email
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/30 mb-5">Stack</p>
              <ul className="space-y-2">
                {["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Prisma"].map((t) => (
                  <li key={t} className="text-[13px] text-foreground/35 font-mono">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-foreground/30 font-mono">
            © {year} Kelvin Marcello · Handcrafted with Next.js
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[12px] font-medium text-foreground/35 hover:text-foreground transition-colors tracking-wide"
          >
            Back to top ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
