"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  FileText,
  ExternalLink,
  Briefcase,
  User,
  Cpu,
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  ArrowRight,
  GraduationCap,
  CornerDownLeft,
  X,
  Workflow,
  Mail,
  Layers,
  Code2,
} from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { projectsData } from "@/data/projects";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type CommandItem = {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projects" | "Quick Actions" | "Technologies";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
  badge?: string;
};

const EMAIL = "akirabusinessinq@gmail.com";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K and custom trigger event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const navigateTo = (url: string) => {
    setIsOpen(false);
    if (url.startsWith("/#") || url.startsWith("#")) {
      const id = url.replace("/#", "").replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(url);
  };

  const filterTech = (tech: string) => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("filter-tech", { detail: tech }));
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const allItems: CommandItem[] = useMemo(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-work",
        title: "Featured Work",
        subtitle: "View shipped client & personal projects",
        category: "Navigation",
        icon: Briefcase,
        action: () => navigateTo("/#projects"),
        keywords: ["projects", "portfolio", "case studies", "apps"],
      },
      {
        id: "nav-about",
        title: "About Me",
        subtitle: "Background, mindset, values & philosophy",
        category: "Navigation",
        icon: User,
        action: () => navigateTo("/#about"),
        keywords: ["bio", "info", "experience", "who am i"],
      },
      {
        id: "nav-how-i-work",
        title: "How do I work?",
        subtitle: "5-stage engineering & design methodology",
        category: "Navigation",
        icon: Workflow,
        action: () => navigateTo("/#how-i-work"),
        keywords: ["process", "methodology", "workflow", "steps", "planning", "execution"],
      },
      {
        id: "nav-experience",
        title: "Professional Record",
        subtitle: "Internships, career & university journey",
        category: "Navigation",
        icon: GraduationCap,
        action: () => navigateTo("/#experience"),
        keywords: ["jobs", "career", "eterna", "ciputra", "work"],
      },
      {
        id: "nav-skills",
        title: "Technical Arsenal",
        subtitle: "Frontend, backend, databases & tools",
        category: "Navigation",
        icon: Cpu,
        action: () => navigateTo("/#skills"),
        keywords: ["technologies", "stack", "react", "next.js", "typescript"],
      },
      {
        id: "nav-creative",
        title: "Creative Studio",
        subtitle: "Photography, motion design, video editing & graphics",
        category: "Navigation",
        icon: Sparkles,
        action: () => navigateTo("/creative"),
        keywords: ["photography", "design", "motion", "video", "photos", "reels"],
        badge: "Studio",
      },
      {
        id: "nav-comments",
        title: "Guestbook",
        subtitle: "Leave a public comment or note",
        category: "Navigation",
        icon: MessageSquare,
        action: () => navigateTo("/#comments"),
        keywords: ["guestbook", "feedback", "review", "messages"],
      },
      {
        id: "nav-faq",
        title: "Frequently Asked Questions",
        subtitle: "Services, pricing, timeline, revisions & hosting",
        category: "Navigation",
        icon: Layers,
        action: () => navigateTo("/#faq"),
        keywords: ["faq", "questions", "pricing", "services", "timeline", "revisions", "domain", "hosting"],
      },
      {
        id: "nav-contact",
        title: "Contact & Inquiries",
        subtitle: "Let's build something together",
        category: "Navigation",
        icon: Mail,
        action: () => navigateTo("/#contact"),
        keywords: ["hire", "email", "message", "collaborate", "talk"],
      },
    ];

    const projectItems: CommandItem[] = projectsData.map((project) => ({
      id: `project-${project.slug}`,
      title: project.title,
      subtitle: `${project.category} · ${project.year}`,
      category: "Projects",
      icon: Briefcase,
      action: () => navigateTo(`/work/${project.slug}`),
      keywords: [
        project.title.toLowerCase(),
        project.category.toLowerCase(),
        ...(project.technologies.frontend || []),
        ...(project.technologies.backend || []),
      ],
      badge: project.links.demo ? "Live Demo" : "Case Study",
    }));

    const actionItems: CommandItem[] = [
      {
        id: "action-copy-email",
        title: copied ? "Email Copied to Clipboard!" : "Copy Email Address",
        subtitle: EMAIL,
        category: "Quick Actions",
        icon: copied ? Check : Copy,
        action: copyEmail,
        keywords: ["email", "contact", "copy", "hire", "gmail"],
      },
      {
        id: "action-download-cv",
        title: "Download Resume / CV",
        subtitle: "PDF format · Kelvin Marcello",
        category: "Quick Actions",
        icon: FileText,
        action: () => {
          setIsOpen(false);
          const link = document.createElement("a");
          link.href = "/CV.pdf";
          link.download = "Kelvin_Marcello_CV.pdf";
          link.target = "_blank";
          link.click();
        },
        keywords: ["cv", "resume", "pdf", "hire", "credentials"],
      },
      {
        id: "action-github",
        title: "Visit GitHub Profile",
        subtitle: "github.com/akirausethis",
        category: "Quick Actions",
        icon: SiGithub,
        action: () => {
          setIsOpen(false);
          window.open("https://github.com/akirausethis", "_blank", "noreferrer");
        },
        keywords: ["github", "source code", "repositories", "git"],
      },
      {
        id: "action-linkedin",
        title: "Visit LinkedIn Profile",
        subtitle: "linkedin.com/in/kelvinmarcello",
        category: "Quick Actions",
        icon: LinkedInIcon,
        action: () => {
          setIsOpen(false);
          window.open("https://linkedin.com/in/kelvinmarcello", "_blank", "noreferrer");
        },
        keywords: ["linkedin", "profile", "connect", "social"],
      },
    ];

    const techItems: CommandItem[] = [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Node.js",
      "Firebase",
    ].map((tech) => ({
      id: `tech-${tech.toLowerCase()}`,
      title: `Filter Projects: ${tech}`,
      subtitle: `Highlight all projects built with ${tech}`,
      category: "Technologies",
      icon: Layers,
      action: () => filterTech(tech),
      keywords: ["tech", "filter", "skills", tech.toLowerCase()],
      badge: "Filter",
    }));

    return [...navItems, ...projectItems, ...actionItems, ...techItems];
  }, [copied]);

  // Filter items based on user query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subtitle?.toLowerCase().includes(q) ?? false;
      const matchKey = item.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false;
      return matchTitle || matchSub || matchKey;
    });
  }, [allItems, query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Handle keyboard navigation inside the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: { [cat: string]: CommandItem[] } = {};
    filteredItems.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[75vh] z-10"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface-elevated/40">
              <Search className="w-5 h-5 text-foreground/40 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search projects, skills, pages..."
                className="w-full bg-transparent text-foreground placeholder:text-foreground/35 text-base outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-foreground/40 hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-1 rounded bg-foreground/5 text-foreground/40 border border-border">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-2 divide-y divide-border/30 max-h-[50vh] scrollbar-thin"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-foreground/40">
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-foreground/30 mt-1">
                    Try searching for &quot;Aurora&quot;, &quot;Next.js&quot;, &quot;CV&quot;, or &quot;Creative&quot;
                  </p>
                </div>
              ) : (
                Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category} className="py-2 first:pt-1 last:pb-1">
                    <p className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-foreground/35">
                      {category}
                    </p>
                    <div className="space-y-0.5">
                      {items.map((item) => {
                        const globalIndex = filteredItems.findIndex((fi) => fi.id === item.id);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 ${
                              isSelected
                                ? "bg-foreground text-background shadow-sm"
                                : "text-foreground hover:bg-foreground/5"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                                  isSelected
                                    ? "bg-background text-foreground border-transparent"
                                    : "bg-foreground/5 text-foreground/50 border-border"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p
                                  className={`text-sm font-semibold truncate ${
                                    isSelected ? "text-background" : "text-foreground"
                                  }`}
                                >
                                  {item.title}
                                </p>
                                {item.subtitle && (
                                  <p
                                    className={`text-xs truncate ${
                                      isSelected ? "text-background/70" : "text-foreground/45"
                                    }`}
                                  >
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {item.badge && (
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md uppercase font-semibold ${
                                    isSelected
                                      ? "bg-background/20 text-background"
                                      : "bg-foreground/5 text-foreground/40 border border-border"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              {isSelected && (
                                <CornerDownLeft className="w-3.5 h-3.5 text-background/60" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Toolbar */}
            <div className="px-5 py-3 border-t border-border bg-surface-elevated/40 flex items-center justify-between text-[11px] font-mono text-foreground/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-foreground/5 border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-foreground/5 border border-border">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-foreground/5 border border-border">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span className="text-[10px] text-foreground/30">
                vinworkspace command palette
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
