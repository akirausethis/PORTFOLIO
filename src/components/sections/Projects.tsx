"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { projectsData } from "@/data/projects";
import DisclaimerModal from "@/components/ui/DisclaimerModal";

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSourceCodeClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRepo(url);
    setModalOpen(true);
  };

  const handleConfirmRedirect = () => {
    if (selectedRepo) window.open(selectedRepo, "_blank");
  };

  // First project gets hero treatment, rest are in the grid
  const [hero, ...rest] = projectsData;

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

        {/* ── HERO card (first project, full-width) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group mb-12"
        >
          <Link href={`/work/${hero.slug}`} className="block">
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
                    className="p-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {hero.links.github && (
                  <button
                    onClick={(e) => handleSourceCodeClick(e, hero.links.github as string)}
                    className="p-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
                  >
                    <SiGithub className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[...(hero.technologies.frontend ?? []), ...(hero.technologies.backend ?? [])].map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-border text-foreground/55 font-medium">
                  {t}
                </span>
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

                  {/* Meta row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono tracking-widest text-foreground/40 uppercase mb-1.5">{project.category} · {project.year}</p>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight group-hover:text-foreground/65 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-foreground/55 font-light text-sm mt-2 leading-relaxed">{project.shortDescription}</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.links.github && (
                        <button
                          onClick={(e) => handleSourceCodeClick(e, project.links.github as string)}
                          className="p-2.5 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
                        >
                          <SiGithub className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tech tags */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                          {[...(project.technologies.frontend ?? []), ...(project.technologies.backend ?? [])].map((t) => (
                            <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border text-foreground/50 font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
