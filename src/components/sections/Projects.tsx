"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Filter, X, Sparkles } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { projectsData } from "@/data/projects";
import DisclaimerModal from "@/components/ui/DisclaimerModal";
import TiltCard from "@/components/ui/TiltCard";

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Listen to filter-tech event triggered from CommandPalette or Skills section
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedTech(customEvent.detail);
      }
    };
    window.addEventListener("filter-tech", handleFilter as EventListener);
    return () => window.removeEventListener("filter-tech", handleFilter as EventListener);
  }, []);

  const handleSourceCodeClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRepo(url);
    setModalOpen(true);
  };

  const handleConfirmRedirect = () => {
    if (selectedRepo) window.open(selectedRepo, "_blank");
  };

  // Filter projects by selected tech if any
  const displayedProjects = useMemo(() => {
    if (!selectedTech) return projectsData;
    return projectsData.filter((p) => {
      const allTech = [
        ...(p.technologies.frontend ?? []),
        ...(p.technologies.backend ?? []),
        ...(p.technologies.database ?? []),
        ...(p.technologies.apis ?? []),
      ];
      return allTech.some((t) => t.toLowerCase() === selectedTech.toLowerCase());
    });
  }, [selectedTech]);

  const hero = displayedProjects[0] || projectsData[0];
  const rest = displayedProjects.slice(1);

  // Most common technologies across all projects for quick filtering
  const featuredTechs = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Firebase"];

  return (
    <section id="projects" className="py-32 w-full bg-background border-t border-border">
      <DisclaimerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmRedirect}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-foreground/50 font-semibold border border-border rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 inline-block" />
              Selected Work
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-foreground leading-[1.05]">
              Featured<br />
              <span className="text-foreground/25">Projects</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-foreground/50 font-light max-w-xs text-right hidden md:block"
          >
            {projectsData.length} projects — click any to read the full case study.
          </motion.p>
        </div>

        {/* ── Technology Filter Bar (Interactive Skills Linker) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2 mb-12 p-3 sm:p-4 rounded-2xl border border-border bg-foreground/[0.015]"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-foreground/40 mr-1.5 flex items-center gap-1.5 pl-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Tech:</span>
          </span>

          <button
            onClick={() => setSelectedTech(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedTech === null
                ? "bg-foreground text-background font-semibold shadow-sm"
                : "border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 bg-background"
            }`}
          >
            All Projects ({projectsData.length})
          </button>

          {featuredTechs.map((tech) => {
            const count = projectsData.filter((p) => {
              const allTech = [
                ...(p.technologies.frontend ?? []),
                ...(p.technologies.backend ?? []),
                ...(p.technologies.database ?? []),
              ];
              return allTech.some((t) => t.toLowerCase() === tech.toLowerCase());
            }).length;

            if (count === 0) return null;
            const isSelected = selectedTech?.toLowerCase() === tech.toLowerCase();

            return (
              <button
                key={tech}
                onClick={() => setSelectedTech(isSelected ? null : tech)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30 bg-background"
                }`}
              >
                <span>{tech}</span>
                <span className={`text-[10px] font-mono ${isSelected ? "text-background/70" : "text-foreground/40"}`}>
                  {count}
                </span>
              </button>
            );
          })}

          {selectedTech && (
            <button
              onClick={() => setSelectedTech(null)}
              className="ml-auto flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground font-mono px-2 py-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset filter</span>
            </button>
          )}
        </motion.div>

        {/* ── Active Filter Feedback Notice ── */}
        {selectedTech && (
          <div className="mb-6 flex items-center justify-between px-4 py-2 rounded-xl bg-foreground/5 border border-border text-xs font-mono text-foreground/70">
            <span>
              Showing {displayedProjects.length} {displayedProjects.length === 1 ? "project" : "projects"} built with <strong className="text-foreground">{selectedTech}</strong>
            </span>
            <button
              onClick={() => setSelectedTech(null)}
              className="text-foreground/40 hover:text-foreground underline"
            >
              Show all
            </button>
          </div>
        )}

        {/* ── HERO card (first project, full-width) ── */}
        <motion.div
          key={hero.slug}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group mb-12"
        >
          <Link href={`/work/${hero.slug}`} className="block">
            <TiltCard>
              <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-foreground/5" style={{ aspectRatio: "16/7" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hero.images[0] || "/placeholder.jpg"}
                  alt={hero.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Crect fill='%23f5f5f5' width='800' height='400'/%3E%3C/svg%3E`;
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <span className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase border border-foreground text-foreground px-6 py-3 rounded-full bg-background/80">
                  View Case Study <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
              {/* Index badge */}
              <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center text-xs font-mono text-foreground/60">
                01
              </div>
            </div>
          </TiltCard>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mt-7">
              <div className="flex-1">
                <p className="text-xs font-mono tracking-widest text-foreground/40 uppercase mb-2">{hero.category} · {hero.year}</p>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight group-hover:text-foreground/70 transition-colors">
                  {hero.title}
                </h3>
                <p className="text-foreground/60 font-light text-lg mt-3 max-w-2xl">{hero.shortDescription}</p>
              </div>
              <div className="flex items-center gap-3 md:pt-8 shrink-0">
                {hero.links.demo && (
                  <a
                    href={hero.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:bg-foreground/85 transition-all shadow-sm relative z-10"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {hero.links.github && (
                  <button
                    onClick={(e) => handleSourceCodeClick(e, hero.links.github as string)}
                    className="p-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors relative z-10"
                    title="View Source Code"
                  >
                    <SiGithub className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-4 relative z-10">
              {[...(hero.technologies.frontend ?? []), ...(hero.technologies.backend ?? [])].map((t) => (
                <button
                  key={t}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedTech(selectedTech?.toLowerCase() === t.toLowerCase() ? null : t);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    selectedTech?.toLowerCase() === t.toLowerCase()
                      ? "bg-foreground text-background border-foreground font-semibold"
                      : "border-border text-foreground/55 font-medium hover:border-foreground/40 hover:text-foreground hover:bg-foreground/5"
                  }`}
                  title={`Filter projects by ${t}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Link>
        </motion.div>

        {/* ── Divider ── */}
        <div className="border-t border-border mb-12" />

        {/* ── Grid: remaining projects ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {rest.map((project, i) => {
            const index = i + 1; // visual index (02–05)
            const isHovered = hoveredIndex === i;
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group flex flex-col ${i % 2 !== 0 ? "md:mt-20" : ""}`}
              >
                <Link href={`/work/${project.slug}`} className="block">
                  {/* Image */}
                  <TiltCard>
                    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-foreground/5 mb-6" style={{ aspectRatio: "4/3" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.images[0] || "/placeholder.jpg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 600'%3E%3Crect fill='%23f5f5f5' width='800' height='600'/%3E%3C/svg%3E`;
                        }}
                      />
                      <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                        <span className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase border border-foreground text-foreground px-5 py-2.5 rounded-full bg-background/80">
                          Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      {/* Index badge */}
                      <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/90 border border-border flex items-center justify-center text-xs font-mono text-foreground/50">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </TiltCard>

                  {/* Meta row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono tracking-widest text-foreground/40 uppercase mb-1.5">{project.category} · {project.year}</p>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight group-hover:text-foreground/65 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-foreground/55 font-light text-sm mt-2 leading-relaxed">{project.shortDescription}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-medium hover:bg-foreground/85 transition-all relative z-10"
                          title="View Live Demo"
                        >
                          <span>Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.links.github && (
                        <button
                          onClick={(e) => handleSourceCodeClick(e, project.links.github as string)}
                          className="p-2.5 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors relative z-10"
                          title="View Source Code"
                        >
                          <SiGithub className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tech tags (interactive filter trigger) */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/60">
                    {[...(project.technologies.frontend ?? []), ...(project.technologies.backend ?? [])].map((t) => (
                      <button
                        key={t}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedTech(selectedTech?.toLowerCase() === t.toLowerCase() ? null : t);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                          selectedTech?.toLowerCase() === t.toLowerCase()
                            ? "bg-foreground text-background border-foreground font-semibold"
                            : "border-border text-foreground/50 font-medium hover:border-foreground/40 hover:text-foreground hover:bg-foreground/5"
                        }`}
                        title={`Filter projects by ${t}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
