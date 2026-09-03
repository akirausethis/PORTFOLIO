import { getProjectBySlug, projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import SourceCodeButton from "@/components/ui/SourceCodeButton";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Kelvin`,
    description: project.shortDescription,
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background text-foreground pb-32 font-sans selection:bg-foreground selection:text-background">
      
      {/* Back Button */}
      <div className="w-full pt-32 lg:pt-40 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Link href="/#projects" className="group inline-flex items-center space-x-3 text-[15px] font-medium text-foreground/70 hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Index</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 lg:pt-12">
        
        {/* 01 Overview */}
        <header className="mb-24 lg:mb-32 relative">
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-foreground/50 uppercase mb-8">
            01 — Overview
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-heading font-bold tracking-tight mb-12 leading-[0.95]">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-16 max-w-3xl">
            {project.shortDescription}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
            <div className="p-6 md:p-8 border-r border-b border-border flex flex-col justify-between min-h-[140px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40 mb-4">Role</p>
              <p className="text-lg font-medium tracking-tight">{project.role}</p>
            </div>
            <div className="p-6 md:p-8 border-r border-b border-border flex flex-col justify-between min-h-[140px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40 mb-4">Timeline</p>
              <p className="text-lg font-medium tracking-tight">{project.year}</p>
            </div>
            <div className="p-6 md:p-8 border-r border-b border-border flex flex-col justify-between min-h-[140px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40 mb-4">Type</p>
              <p className="text-lg font-medium tracking-tight">{project.category}</p>
            </div>
            <div className="p-6 md:p-8 border-r border-b border-border flex flex-col justify-between min-h-[140px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40 mb-4">Links</p>
              {project.links.github ? (
                <SourceCodeButton url={project.links.github} />
              ) : (
                <span className="text-lg font-medium text-foreground/40 tracking-tight">N/A</span>
              )}
            </div>
          </div>
        </header>

        {/* Main Project Visual */}
        <div className="mb-32 lg:mb-48 w-full flex justify-center bg-foreground/5 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.images[0]} alt={project.title} className="w-full h-auto object-contain" />
        </div>

        {/* 02 The Context */}
        <section className="mb-32 lg:mb-48 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-foreground/50 uppercase sticky top-32">
              02 — The Context
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-6">The Problem</h3>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">{project.problem}</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-6">The Solution</h3>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">{project.solution}</p>
            </div>
          </div>
        </section>

        {/* 03 Technical */}
        <section className="mb-32 lg:mb-48 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-foreground/50 uppercase sticky top-32">
              03 — Technical
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-16">
            {project.architecture && (
              <div>
                <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-6">Architecture</h3>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">{project.architecture}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-10">Technologies Used</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-l border-border">
                {Object.entries(project.technologies).map(([category, techs]) => {
                  if (!techs || techs.length === 0) return null;
                  return (
                    <div key={category} className="p-8 border-r border-b border-border flex flex-col justify-between">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40 mb-8">{category}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {techs.map((tech) => (
                          <span key={tech} className="text-xl font-heading font-medium tracking-tight">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 04 Execution */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-foreground/50 uppercase sticky top-32">
              04 — Execution
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-6">Challenges</h3>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">{project.challenges}</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-6">Results & Impact</h3>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">{project.results}</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight mb-6">Key Insights</h3>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">{project.insights}</p>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
