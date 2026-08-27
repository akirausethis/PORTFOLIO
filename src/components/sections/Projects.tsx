"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { projectsData } from "@/data/projects";
import DisclaimerModal from "@/components/ui/DisclaimerModal";

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");

  const handleSourceCodeClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setSelectedRepo(url);
    setModalOpen(true);
  };

  const handleConfirmRedirect = () => {
    if (selectedRepo) {
      window.open(selectedRepo, "_blank");
    }
  };

  return (
    <section id="projects" className="py-32 w-full bg-background border-t border-border">
      <DisclaimerModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleConfirmRedirect} 
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <p className="text-sm font-mono tracking-widest text-foreground/50 mb-4 uppercase">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground">
              Featured Projects
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col ${index % 2 !== 0 ? "md:mt-32" : ""}`}
            >
              <Link href={`/work/${project.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden bg-foreground/5 mb-8 border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.images[0] || "/placeholder.jpg"} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%25" height="100%25" viewBox="0 0 800 600"%3E%3Crect fill="%23111" width="800" height="600"/%3E%3Ctext fill="%23555" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E' + project.title + '%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-foreground text-sm font-medium tracking-widest uppercase border border-foreground px-6 py-3 rounded-full bg-background/80">
                    View Case Study
                  </span>
                </div>
              </Link>
              
              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-mono tracking-widest text-foreground/50 uppercase">
                    {project.category}
                  </p>
                  <div className="flex items-center space-x-2">
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noreferrer" className="p-2 border border-border rounded-full hover:bg-foreground/5 transition-colors text-foreground" title="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.links.github && (
                      <button onClick={(e) => handleSourceCodeClick(e, project.links.github as string)} className="p-2 border border-border rounded-full hover:bg-foreground/5 transition-colors text-foreground" title="Source Code">
                        <SiGithub className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <Link href={`/work/${project.slug}`}>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 group-hover:text-foreground/70 transition-colors text-foreground">
                    {project.title}
                  </h3>
                </Link>
                
                <p className="text-foreground/70 font-light text-lg mb-6 flex-grow">
                  {project.shortDescription}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.frontend?.map(tech => (
                    <span key={tech} className="text-xs font-medium px-3 py-1 bg-foreground/5 border border-border rounded-full text-foreground/80">{tech}</span>
                  ))}
                  {project.technologies.backend?.map(tech => (
                    <span key={tech} className="text-xs font-medium px-3 py-1 bg-foreground/5 border border-border rounded-full text-foreground/80">{tech}</span>
                  ))}
                </div>

                {/* Key Features (Just show first 2 for brevity on card) */}
                <div className="border-t border-border pt-6 mt-auto">
                  <p className="text-xs font-semibold tracking-widest text-foreground/40 uppercase mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {project.features.slice(0, 2).map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-foreground/70">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {project.features.length > 2 && (
                      <li className="text-sm text-foreground/40 italic pl-3">+ {project.features.length - 2} more</li>
                    )}
                  </ul>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
