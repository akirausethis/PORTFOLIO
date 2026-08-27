"use client";

import { motion } from "framer-motion";
import { User, Code2, Cpu } from "lucide-react";

export default function About() {
  const focuses = [
    {
      title: "Software Development",
      description: "Building robust web and mobile applications using modern frameworks.",
      icon: Code2,
    },
    {
      title: "User-Centered UI/UX",
      description: "Creating digital solutions with a focus on intuitive and clean interfaces.",
      icon: User,
    },
    {
      title: "AI Integration",
      description: "Exploring and integrating the latest AI APIs into practical applications.",
      icon: Cpu,
    },
  ];

  return (
    <section id="about" className="relative w-full py-32 border-t border-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Massive Statement */}
        <div className="max-w-5xl mb-24 lg:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight text-foreground leading-[1.1] mb-12"
          >
            I build digital experiences that blend modern technology with intuitive, user-centered design.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-4xl text-lg text-foreground/80 font-light leading-relaxed"
          >
            <p>
              Currently studying Informatics, I am passionate about software engineering that solves real-world problems. I focus on writing clean, maintainable code rather than just chasing industry trends.
            </p>
            <p>
              My expertise centers around full-stack ecosystems, particularly Next.js, React, and TypeScript. I am also continuously exploring how AI can be integrated to elevate standard software experiences.
            </p>
          </motion.div>
        </div>

        {/* 3-Column Service Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-border"
        >
          {focuses.map((item, index) => (
            <div 
              key={index} 
              className="group flex flex-col p-8 lg:p-12 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 hover:bg-foreground/[0.02] transition-colors"
            >
              <item.icon className="w-8 h-8 text-foreground/60 mb-8 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-foreground mb-4">{item.title}</h3>
              <p className="text-foreground/70 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Far Right Vertical Marker */}
        <div className="hidden xl:flex absolute right-8 lg:right-12 top-0 flex-col items-center">
          <div className="w-px h-24 bg-border mb-6" />
          <span className="text-3xl font-heading font-medium mb-6 tracking-tight text-foreground/20">02</span>
          <span 
            className="text-[10px] font-semibold tracking-[0.2em] text-foreground/40 uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            About
          </span>
        </div>

      </div>
    </section>
  );
}
