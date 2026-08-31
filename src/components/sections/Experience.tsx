"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code2, GraduationCap, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ExperienceData = {
  role: string;
  company: string;
  period: string;
  description: React.ReactNode;
  icon: LucideIcon;
};

const experiences: ExperienceData[] = [
  {
    role: "Software Engineer Intern",
    company: "Eterna Indonesia",
    period: "June 2026 - Expected October 2026",
    icon: Code2,
    description: (
      <div className="space-y-6">
        <div>
          <strong className="text-foreground font-medium block mb-2 tracking-tight text-xl">Applicant Tracking System (ATS) & Recruitment Pipeline</strong>
          <ul className="list-disc pl-5 space-y-2 text-foreground/70 text-base md:text-lg font-light">
            <li><strong>Engineered the Candidate Review Pipeline:</strong> Expanded the recruitment funnel by building complex state-machine logic for candidate stages (e.g., Reviewed, CSM Test, Third Interview) and developed the manual timeline-advancement controls.</li>
            <li><strong>Built a Secure Video Proxy System:</strong> Developed a secure proxy video player to seamlessly stream Google Drive candidate introduction videos directly inside the portal without exposing raw URLs.</li>
            <li><strong>Revamped the Candidate Detail UI:</strong> Collaborated with the design team to rebuild the Candidate Details sticky action bar, implementing draft-saving, stage-advancement flows, and data-loss prevention modals.</li>
            <li><strong>Integrated Machine Learning Fallbacks:</strong> Built resilience into the UI by ensuring candidate profiles render flawlessly even if the external ML-scoring API timeouts or fails.</li>
          </ul>
        </div>
        <div>
          <strong className="text-foreground font-medium block mb-2 tracking-tight text-xl">Internal Ticketing System & Operations</strong>
          <ul className="list-disc pl-5 space-y-2 text-foreground/70 text-base md:text-lg font-light">
            <li><strong>Developed the Admin Routing Dashboard:</strong> Built a full-scale admin panel (/admin/routing) for HR to dynamically manage escalation groups and assign internal managers.</li>
            <li><strong>Integrated Discord Notifications:</strong> Connected the portal to Discord webhooks for real-time ticket escalation. Built strict Snowflake ID validation and developed a fallback mechanism that accurately tracks and logs "unreachable" users in the database instead of dropping them.</li>
            <li><strong>Built Ticket Satisfaction & File Uploads:</strong> Engineered the post-resolution feedback survey system and implemented secure file attachments for ticket chat threads.</li>
            <li><strong>Automated SLA Tracking:</strong> Updated the background cron jobs (sweep ticks) that automatically track ticket SLAs and deadlines.</li>
          </ul>
        </div>
        <div>
          <strong className="text-foreground font-medium block mb-2 tracking-tight text-xl">Engineering Excellence & CI/CD</strong>
          <ul className="list-disc pl-5 space-y-2 text-foreground/70 text-base md:text-lg font-light">
            <li><strong>Enforced CI/CD Strictness:</strong> Integrated and enforced strict TypeScript checking (tsc) into the CI pipeline, making type errors a blocking requirement for production deployments.</li>
            <li><strong>Performance & Stability Fixes:</strong> Diagnosed and resolved Out-of-Memory (OOM) deployment errors, resolved complex React hydration bugs, and fixed critical rules-of-hooks violations in data visualization charts.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    role: "Publication, Design, and Documentation",
    company: "Google Developer Groups",
    period: "June 2024 - August 2025",
    icon: Users,
    description: (
      <p className="text-lg text-foreground/70 leading-relaxed font-light max-w-3xl">
        Led the division, coordinating visual content and event documentation for community programs and technical workshops. Participated in hands-on learning sessions covering Java, Kotlin, HTML, and other software development topics.
      </p>
    )
  },
  {
    role: "Publication, Design, and Documentation Staff",
    company: "Student Union",
    period: "November 2024 - May 2025",
    icon: Briefcase,
    description: (
      <p className="text-lg text-foreground/70 leading-relaxed font-light max-w-3xl">
        Contributed by producing visual materials and documenting organizational activities. Frequently served as division lead for multiple programs, coordinating team members and ensuring successful execution of deliverables.
      </p>
    )
  },
  {
    role: "Informatics Multimedia and Technology",
    company: "Universitas Ciputra",
    period: "August 2023 - Expected 2027",
    icon: GraduationCap,
    description: (
      <p className="text-lg text-foreground/70 leading-relaxed font-light max-w-3xl">
        Currently pursuing a degree in Informatics, focusing on Software Development with hands-on experience building web and mobile applications.
      </p>
    )
  }
];

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-32 w-full border-t border-border overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Sticky Title */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight text-foreground leading-[1.1]"
            >
              Professional<br />Record
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-foreground/60 font-light text-lg max-w-sm hidden lg:block"
            >
              A timeline of my professional journey, focusing on software development, design, and technical leadership.
            </motion.p>
          </div>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-8 flex flex-col border-t border-border mt-12 lg:mt-0">
          {experiences.map((exp, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isDimmed = isAnyHovered && !isHovered;
            const Icon = exp.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isHovered ? null : index)}
                className={`group flex flex-col py-10 lg:py-14 border-b border-border transition-all duration-500 cursor-pointer relative
                  ${isDimmed ? "opacity-40" : "opacity-100"}`}
              >
                {/* Animated Left Line on Active */}
                <div className={`absolute left-[-1rem] lg:left-[-2rem] top-0 bottom-0 w-[2px] bg-foreground transform origin-top transition-transform duration-500 ${isHovered ? "scale-y-100" : "scale-y-0"}`} />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Icon container */}
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center shrink-0 border border-border rounded-full transition-all duration-500 ${isHovered ? "bg-foreground text-background scale-110" : "bg-transparent text-foreground/50"}`}>
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className={`text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight transition-transform duration-500 ${isHovered ? "lg:translate-x-4" : ""}`}>
                      {exp.company}
                    </h3>
                  </div>
                  
                  <span className={`text-xs md:text-sm tracking-widest text-foreground/50 font-mono uppercase whitespace-nowrap transition-transform duration-500 mt-2 md:mt-0 md:ml-4 ${isHovered ? "lg:-translate-x-4" : ""}`}>
                    {exp.period}
                  </span>
                </div>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 lg:pl-[5.5rem] lg:translate-x-4 transition-transform duration-500 max-w-4xl">
                        <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                          {exp.role}
                        </h4>
                        <div className="text-foreground/80">
                          {exp.description}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
