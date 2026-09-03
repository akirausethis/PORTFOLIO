"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Users, ChevronRight, MapPin, Calendar } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ExperienceData = {
  role: string;
  company: string;
  period: string;
  location: string;
  type: "Work" | "Community" | "Education";
  tags: string[];
  description: React.ReactNode;
  icon: LucideIcon;
  isCurrent?: boolean;
};

const experiences: ExperienceData[] = [
  {
    role: "Software Engineer Intern",
    company: "Eterna Indonesia",
    period: "June 2026 – Oct 2026",
    location: "Jakarta, Indonesia",
    type: "Work",
    isCurrent: true,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Discord API", "CI/CD"],
    icon: Code2,
    description: (
      <div className="space-y-8">
        {[
          {
            category: "Applicant Tracking System & Recruitment Pipeline",
            items: [
              { title: "Candidate Review Pipeline", detail: "Expanded the recruitment funnel by building complex state-machine logic for candidate stages (Reviewed, CSM Test, Third Interview) and manual timeline-advancement controls." },
              { title: "Secure Video Proxy System", detail: "Developed a proxy video player to seamlessly stream Google Drive candidate introduction videos inside the portal without exposing raw URLs." },
              { title: "Candidate Detail UI Revamp", detail: "Collaborated with design team to rebuild the sticky action bar, implementing draft-saving, stage-advancement flows, and data-loss prevention modals." },
              { title: "ML Fallback Integration", detail: "Built resilience into the UI ensuring candidate profiles render flawlessly even when the external ML-scoring API times out or fails." },
            ]
          },
          {
            category: "Internal Ticketing System & Operations",
            items: [
              { title: "Admin Routing Dashboard", detail: "Built a full-scale admin panel (/admin/routing) for HR to dynamically manage escalation groups and assign internal managers." },
              { title: "Discord Webhook Notifications", detail: "Connected the portal to Discord webhooks for real-time ticket escalation with strict Snowflake ID validation and a fallback mechanism for unreachable users." },
              { title: "Ticket Satisfaction & File Uploads", detail: "Engineered the post-resolution feedback survey system and implemented secure file attachments for ticket chat threads." },
              { title: "Automated SLA Tracking", detail: "Updated background cron jobs (sweep ticks) that automatically track ticket SLAs and deadlines." },
            ]
          },
          {
            category: "Engineering Excellence & CI/CD",
            items: [
              { title: "Strict CI/CD Enforcement", detail: "Integrated strict TypeScript checking (tsc) into the CI pipeline, making type errors a hard blocking requirement for production deployments." },
              { title: "Performance & Stability Fixes", detail: "Diagnosed and resolved OOM deployment errors, React hydration bugs, and critical rules-of-hooks violations in data visualization charts." },
            ]
          },
        ].map((section, i) => (
          <div key={i}>
            <p className="text-xs tracking-[0.15em] uppercase font-semibold text-foreground/40 mb-4">{section.category}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.items.map((item, j) => (
                <div key={j} className="flex gap-3 p-4 rounded-xl bg-foreground/[0.03] border border-border/50">
                  <ChevronRight className="w-4 h-4 text-foreground/30 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground/90 mb-1">{item.title}</p>
                    <p className="text-sm text-foreground/55 font-light leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    role: "Publication, Design & Documentation Lead",
    company: "Google Developer Groups",
    period: "June 2024 – Aug 2025",
    location: "Surabaya, Indonesia",
    type: "Community",
    tags: ["Design", "Documentation", "Events", "Leadership"],
    icon: Users,
    description: (
      <p className="text-base text-foreground/65 leading-relaxed font-light">
        Led the division, coordinating visual content and event documentation for community programs and technical workshops. Participated in hands-on learning sessions covering Java, Kotlin, HTML, and other software development topics.
      </p>
    )
  },
  {
    role: "Publication, Design & Documentation Staff",
    company: "Student Union",
    period: "Nov 2024 – May 2025",
    location: "Surabaya, Indonesia",
    type: "Community",
    tags: ["Design", "Visual Communication", "Team Leadership"],
    icon: Briefcase,
    description: (
      <p className="text-base text-foreground/65 leading-relaxed font-light">
        Contributed by producing visual materials and documenting organizational activities. Frequently served as division lead for multiple programs, coordinating team members and ensuring successful execution of deliverables.
      </p>
    )
  },
  {
    role: "Informatics Multimedia & Technology",
    company: "Universitas Ciputra",
    period: "Aug 2023 – Expected 2027",
    location: "Surabaya, Indonesia",
    type: "Education",
    tags: ["Software Engineering", "Web Dev", "Mobile Dev", "AI"],
    icon: GraduationCap,
    description: (
      <p className="text-base text-foreground/65 leading-relaxed font-light">
        Pursuing a degree in Informatics with a focus on Software Development. Gained hands-on experience building web and mobile applications through coursework and independent projects.
      </p>
    )
  }
];

const typeColors: Record<ExperienceData["type"], string> = {
  Work: "bg-foreground text-background",
  Community: "bg-foreground/10 text-foreground/70",
  Education: "bg-foreground/10 text-foreground/70",
};

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="experience" className="relative py-32 w-full border-t border-border overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-foreground/50 font-semibold border border-border rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 inline-block" />
                Professional Record
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-foreground leading-[1.05]"
            >
              Where I've<br />
              <span className="text-foreground/25">been & built.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex items-end"
          >
            <p className="text-lg text-foreground/55 font-light leading-relaxed max-w-xl">
              A timeline of my professional journey — from university organizations to real-world software engineering.
            </p>
          </motion.div>
        </div>

        {/* Main Content: Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Nav list */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {experiences.map((exp, index) => {
              const isActive = activeIndex === index;
              const Icon = exp.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-lg"
                      : "bg-transparent text-foreground border-border hover:border-foreground/30 hover:bg-foreground/[0.03]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? "bg-background/20" : "bg-foreground/8 border border-border"
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? "text-background" : "text-foreground/50"}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className={`font-semibold text-base truncate ${isActive ? "text-background" : "text-foreground"}`}>
                          {exp.company}
                        </p>
                        {exp.isCurrent && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wider shrink-0 ${
                            isActive ? "bg-background/25 text-background" : "bg-foreground text-background"
                          }`}>NOW</span>
                        )}
                      </div>
                      <p className={`text-sm truncate ${isActive ? "text-background/70" : "text-foreground/50"}`}>
                        {exp.role}
                      </p>
                      <p className={`text-xs mt-1 font-mono ${isActive ? "text-background/50" : "text-foreground/35"}`}>
                        {exp.period}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Detail panel */}
          <div className="lg:col-span-8 lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-border bg-foreground/[0.015] p-8 lg:p-10"
              >
                {/* Panel Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-border">
                  <div className="flex items-start gap-4">
                    {(() => {
                      const Icon = experiences[activeIndex].icon;
                      return (
                        <div className="w-14 h-14 rounded-2xl bg-foreground/8 border border-border flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-foreground/60" strokeWidth={1.5} />
                        </div>
                      );
                    })()}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold tracking-wider ${typeColors[experiences[activeIndex].type]}`}>
                          {experiences[activeIndex].type}
                        </span>
                        {experiences[activeIndex].isCurrent && (
                          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight">
                        {experiences[activeIndex].company}
                      </h3>
                      <p className="text-foreground/60 font-medium mt-0.5">{experiences[activeIndex].role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-foreground/50 shrink-0">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {experiences[activeIndex].period}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {experiences[activeIndex].location}
                    </span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {experiences[activeIndex].tags.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full border border-border text-foreground/60 font-medium tracking-wide hover:border-foreground/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div>{experiences[activeIndex].description}</div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Section number marker */}
      <div className="hidden xl:flex absolute right-8 lg:right-12 top-0 flex-col items-center">
        <div className="w-px h-24 bg-border mb-6" />
        <span className="text-3xl font-heading font-medium mb-6 tracking-tight text-foreground/20">03</span>
        <span
          className="text-[10px] font-semibold tracking-[0.2em] text-foreground/40 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Experience
        </span>
      </div>
    </section>
  );
}
