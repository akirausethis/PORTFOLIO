"use client";

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
  SiFigma
} from "@icons-pack/react-simple-icons";

const allSkills = [
  { name: "React", Icon: SiReact, desc: "Component-based UI library" },
  { name: "Next.js", Icon: SiNextdotjs, desc: "React framework for production" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, desc: "Utility-first CSS framework" },
  { name: "HTML", Icon: SiHtml5, desc: "Web markup foundation" },
  { name: "CSS", Icon: SiCss, desc: "Styling the web" },
  { name: "Flutter", Icon: SiFlutter, desc: "Cross-platform mobile UI" },
  { name: "Dart", Icon: SiDart, desc: "Language optimized for UI" },
  { name: "Kotlin", Icon: SiKotlin, desc: "Modern Android development" },
  { name: "Laravel", Icon: SiLaravel, desc: "PHP web application framework" },
  { name: "TypeScript", Icon: SiTypescript, desc: "Strongly typed JavaScript" },
  { name: "MySQL", Icon: SiMysql, desc: "Relational database management" },
  { name: "PostgreSQL", Icon: SiPostgresql, desc: "Advanced open source database" },
  { name: "Firebase", Icon: SiFirebase, desc: "Backend-as-a-Service platform" },
  { name: "GitHub", Icon: SiGithub, desc: "Code hosting & collaboration" },
  { name: "VS Code", Icon: SiVscodium, desc: "Powerful source code editor" },
  { name: "Figma", Icon: SiFigma, desc: "Collaborative interface design" },
];

const topRow = allSkills.slice(0, 8);
const bottomRow = allSkills.slice(8, 16);

// Duplicate the lists so the marquee has enough content to scroll infinitely
const topRowDuplicated = [...topRow, ...topRow, ...topRow, ...topRow, ...topRow, ...topRow];
const bottomRowDuplicated = [...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 w-full border-t border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 mb-16 lg:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium tracking-tight text-foreground"
        >
          Technical Arsenal
        </motion.h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Marquee Container with Border Radius */}
        <div className="relative w-full flex flex-col gap-6 lg:gap-10 py-12 border border-border rounded-[2.5rem] overflow-hidden bg-surface/30 backdrop-blur-sm">
          
          {/* Top Row (Scrolls Left) */}
          <div className="flex w-full overflow-hidden group">
            <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused] gap-6 lg:gap-10 px-3 lg:px-5">
              {topRowDuplicated.map((skill, idx) => (
                <div 
                  key={idx}
                  className="relative group/skill flex items-center space-x-4 px-8 py-5 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300 bg-background text-foreground shrink-0 cursor-default"
                >
                  <skill.Icon className="w-6 h-6 lg:w-8 lg:h-8" />
                  <span className="text-xl lg:text-3xl font-heading font-medium tracking-tight whitespace-nowrap">
                    {skill.name}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-12 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="bg-foreground text-background text-xs font-medium px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
                      {skill.desc}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-foreground rotate-45" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row (Scrolls Right) */}
          <div className="flex w-full overflow-hidden group">
            <div className="flex w-max animate-marquee-right group-hover:[animation-play-state:paused] gap-6 lg:gap-10 px-3 lg:px-5">
              {bottomRowDuplicated.map((skill, idx) => (
                <div 
                  key={idx}
                  className="relative group/skill flex items-center space-x-4 px-8 py-5 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300 bg-background text-foreground shrink-0 cursor-default"
                >
                  <skill.Icon className="w-6 h-6 lg:w-8 lg:h-8" />
                  <span className="text-xl lg:text-3xl font-heading font-medium tracking-tight whitespace-nowrap">
                    {skill.name}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="bg-foreground text-background text-xs font-medium px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
                      {skill.desc}
                      <div className="absolute left-1/2 -translate-x-1/2 top-[-4px] w-2 h-2 bg-foreground rotate-45" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
