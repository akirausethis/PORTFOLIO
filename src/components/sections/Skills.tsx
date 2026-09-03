"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiLaravel,
  SiTypescript,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiGithub,
  SiVscodium,
  SiFigma,
  SiPrisma,
  SiNodedotjs,
} from "@icons-pack/react-simple-icons";

type Skill = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  desc: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  level: "Expert" | "Proficient" | "Learning";
};

const skills: Skill[] = [
  // Frontend
  { name: "Next.js",      Icon: SiNextdotjs,   desc: "React framework for production apps",   category: "Frontend", level: "Expert" },
  { name: "React",        Icon: SiReact,        desc: "Component-based UI library",            category: "Frontend", level: "Expert" },
  { name: "TypeScript",   Icon: SiTypescript,   desc: "Strongly typed JavaScript",             category: "Frontend", level: "Expert" },
  { name: "Tailwind CSS", Icon: SiTailwindcss,  desc: "Utility-first CSS framework",           category: "Frontend", level: "Expert" },
  { name: "HTML",         Icon: SiHtml5,        desc: "Web markup foundation",                 category: "Frontend", level: "Expert" },
  { name: "CSS",          Icon: SiCss,          desc: "Styling the web",                       category: "Frontend", level: "Proficient" },
  { name: "Flutter",      Icon: SiFlutter,      desc: "Cross-platform mobile UI toolkit",      category: "Frontend", level: "Proficient" },
  { name: "Dart",         Icon: SiDart,         desc: "Language optimized for Flutter",        category: "Frontend", level: "Proficient" },
  // Backend
  { name: "Node.js",      Icon: SiNodedotjs,    desc: "JavaScript runtime for servers",        category: "Backend",  level: "Proficient" },
  { name: "Laravel",      Icon: SiLaravel,      desc: "PHP web application framework",         category: "Backend",  level: "Proficient" },
  { name: "Prisma",       Icon: SiPrisma,       desc: "Type-safe database ORM",                category: "Backend",  level: "Proficient" },
  { name: "Kotlin",       Icon: SiKotlin,       desc: "Modern Android development",            category: "Backend",  level: "Learning" },
  // Database
  { name: "PostgreSQL",   Icon: SiPostgresql,   desc: "Advanced open-source database",         category: "Database", level: "Proficient" },
  { name: "MySQL",        Icon: SiMysql,        desc: "Relational database management",        category: "Database", level: "Proficient" },
  { name: "Firebase",     Icon: SiFirebase,     desc: "Backend-as-a-Service platform",         category: "Database", level: "Proficient" },
  // Tools
  { name: "GitHub",       Icon: SiGithub,       desc: "Code hosting & collaboration",          category: "Tools",    level: "Expert" },
  { name: "Figma",        Icon: SiFigma,        desc: "Collaborative interface design",         category: "Tools",    level: "Expert" },
  { name: "VS Code",      Icon: SiVscodium,     desc: "Powerful source code editor",           category: "Tools",    level: "Expert" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools"] as const;
type Category = typeof categories[number];

const levelColor: Record<Skill["level"], string> = {
  Expert:     "bg-foreground text-background",
  Proficient: "bg-foreground/10 text-foreground/70",
  Learning:   "bg-foreground/5 text-foreground/40",
};

const marqueeTop    = [...skills, ...skills, ...skills];
const marqueeBottom = [...skills].reverse().concat([...skills].reverse()).concat([...skills].reverse());

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-32 w-full border-t border-border bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-foreground/50 font-semibold border border-border rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 inline-block" />
                Skills & Tools
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-foreground leading-[1.05]"
            >
              Technical<br />
              <span className="text-foreground/25">Arsenal</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-end"
          >
            <p className="text-base text-foreground/50 font-light leading-relaxed max-w-md">
              Technologies I use daily to design, build, and ship production-grade applications.
            </p>
          </motion.div>
        </div>

        {/* ── Category filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground/55 border-border hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-background/60" : "text-foreground/30"}`}>
                  {skills.filter((s) => s.category === cat).length}
                </span>
              )}
            </button>
          ))}

          {/* Legend */}
          <div className="ml-auto hidden md:flex items-center gap-4 text-xs text-foreground/40 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-foreground inline-block" />Expert</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-foreground/30 inline-block" />Proficient</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-foreground/10 inline-block" />Learning</span>
          </div>
        </motion.div>

        {/* ── Skill grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-24">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`relative group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 cursor-default ${
                hoveredSkill === skill.name
                  ? "bg-foreground text-background border-foreground shadow-xl scale-105"
                  : "bg-transparent text-foreground border-border hover:border-foreground/30"
              }`}
            >
              <skill.Icon className="w-7 h-7 shrink-0" />
              <div className="text-center">
                <p className={`text-sm font-semibold leading-tight ${hoveredSkill === skill.name ? "text-background" : "text-foreground"}`}>
                  {skill.name}
                </p>
                {hoveredSkill === skill.name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-background/70 mt-1 leading-snug"
                  >
                    {skill.desc}
                  </motion.p>
                )}
              </div>
              {/* Level dot */}
              <span className={`absolute top-3 right-3 text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-wider ${
                hoveredSkill === skill.name ? "bg-background/20 text-background" : levelColor[skill.level]
              }`}>
                {skill.level[0]}
              </span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Marquee scrollers ── */}
      <div className="relative w-full flex flex-col gap-5 py-10 border-y border-border overflow-hidden bg-foreground/[0.015]">
        {/* Gradient fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1: left */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused] gap-5 px-4">
            {marqueeTop.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 border border-border rounded-full bg-background text-foreground shrink-0 hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default"
              >
                <skill.Icon className="w-5 h-5" />
                <span className="text-base font-heading font-medium tracking-tight whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: right */}
        <div className="flex w-full overflow-hidden group">
          <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] gap-5 px-4">
            {marqueeBottom.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 border border-border rounded-full bg-background text-foreground shrink-0 hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default"
              >
                <skill.Icon className="w-5 h-5" />
                <span className="text-base font-heading font-medium tracking-tight whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
