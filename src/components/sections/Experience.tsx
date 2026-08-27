"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    role: "Publication, Design, and Documentation",
    company: "Google Developer Groups",
    period: "June 2024 - August 2025",
    description: "Led the division, coordinating visual content and event documentation for community programs and technical workshops. Participated in hands-on learning sessions covering Java, Kotlin, HTML, and other software development topics."
  },
  {
    role: "Publication, Design, and Documentation Staff",
    company: "Student Union",
    period: "November 2024 - May 2025",
    description: "Contributed by producing visual materials and documenting organizational activities. Frequently served as division lead for multiple programs, coordinating team members and ensuring successful execution of deliverables."
  },
  {
    role: "Informatics Multimedia and Technology",
    company: "Universitas Ciputra",
    period: "August 2023 - Expected 2027",
    description: "Currently pursuing a degree in Informatics, focusing on Software Development with hands-on experience building web and mobile applications."
  }
];

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        <div className="lg:col-span-8 flex flex-col border-t border-border">
          {experiences.map((exp, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isDimmed = isAnyHovered && !isHovered;

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
                className={`group flex flex-col py-10 lg:py-14 border-b border-border transition-all duration-500 cursor-pointer lg:cursor-default relative
                  ${isDimmed ? "opacity-30" : "opacity-100"}`}
              >
                {/* Animated Left Line on Active */}
                <div className={`absolute left-[-1rem] lg:left-[-2rem] top-0 bottom-0 w-[2px] bg-foreground transform origin-top transition-transform duration-500 ${isHovered ? "scale-y-100" : "scale-y-0"}`} />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className={`text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight transition-transform duration-500 ${isHovered ? "lg:translate-x-4" : ""}`}>
                    {exp.company}
                  </h3>
                  <span className={`text-sm tracking-widest text-foreground/50 font-mono uppercase whitespace-nowrap transition-transform duration-500 ${isHovered ? "lg:-translate-x-4" : ""}`}>
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
                      <div className="pt-8 lg:translate-x-4 transition-transform duration-500">
                        <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                          {exp.role}
                        </h4>
                        <p className="text-lg text-foreground/70 leading-relaxed font-light max-w-2xl">
                          {exp.description}
                        </p>
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
