"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Download,
  Eye,
  Copy,
  Check,
  Building2,
  Calendar,
  Hash,
  ShieldCheck,
  Maximize2,
  X,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

interface Certificate {
  id: string;
  title: string;
  category: "All" | "Eterna" | "IBM" | "Kaggle";
  program: string;
  issuer: string;
  issuerShort: string;
  partnerInstitution?: string;
  credentialId: string;
  issueDate: string;
  role: string;
  description: string;
  image: string;
  pdfUrl?: string;
  verifyUrl: string;
  skills: string[];
  themeColor: string;
}

const certificatesData: Certificate[] = [
  {
    id: "eterna-2026",
    title: "Certificate of Accomplishment",
    category: "Eterna",
    program: "Eterna Indonesia Internship Program 2026",
    issuer: "Eterna Indonesia (PT Daya Abadi Indonesia)",
    issuerShort: "Eterna Indonesia",
    partnerInstitution: "Ciputra University",
    credentialId: "02/ETERNA-UC/INT/X/2026",
    issueDate: "October 13, 2026",
    role: "Full Stack Developer Intern",
    description:
      "Awarded in recognition of successfully completing the internship program as a Full Stack Developer Intern at Eterna Indonesia, demonstrating technical growth and meaningful engineering contributions to real-world production systems.",
    image: "/certificates/eterna-internship-certificate.jpg",
    pdfUrl: "/certificates/eterna-internship-certificate.pdf",
    verifyUrl: "https://eternaindonesia.com",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "CI/CD"],
    themeColor: "from-emerald-500/10 to-teal-500/5 text-emerald-700 border-emerald-500/20",
  },
  {
    id: "ibm-python-101",
    title: "Python 101 for Data Science",
    category: "IBM",
    program: "IBM Developer Skills Network (PY0101EN)",
    issuer: "IBM SkillsBuild",
    issuerShort: "IBM",
    credentialId: "4e069175d1804dcdb6189693169d918b",
    issueDate: "May 16, 2025",
    role: "Course Graduate",
    description:
      "Certified by IBM SkillsBuild for successfully completing Python programming fundamentals, data structures, logic flow, and data science libraries.",
    image: "/certificates/ibm-python-101.jpg",
    verifyUrl:
      "https://courses.skillsbuild.skillsnetwork.site/certificates/4e069175d1804dcdb6189693169d918b",
    skills: ["Python", "Data Science", "Jupyter", "Algorithms"],
    themeColor: "from-blue-500/10 to-indigo-500/5 text-blue-700 border-blue-500/20",
  },
  {
    id: "ibm-data-analysis",
    title: "Data Analysis with Python",
    category: "IBM",
    program: "IBM Developer Skills Network (DA0101EN)",
    issuer: "IBM SkillsBuild",
    issuerShort: "IBM",
    credentialId: "4d8b75fa085047168ca159a60cb2f34b",
    issueDate: "May 16, 2025",
    role: "Course Graduate",
    description:
      "Certified by IBM SkillsBuild for data wrangling, exploratory data analysis, statistical model development, and predictive evaluation using Python.",
    image: "/certificates/ibm-data-analysis.jpg",
    verifyUrl:
      "https://courses.skillsbuild.skillsnetwork.site/certificates/4d8b75fa085047168ca159a60cb2f34b",
    skills: ["Pandas", "NumPy", "Data Wrangling", "Scikit-Learn"],
    themeColor: "from-blue-500/10 to-indigo-500/5 text-blue-700 border-blue-500/20",
  },
  {
    id: "ibm-data-visualization",
    title: "Data Visualization with Python",
    category: "IBM",
    program: "IBM Developer Skills Network (DV0101EN)",
    issuer: "IBM SkillsBuild",
    issuerShort: "IBM",
    credentialId: "02cd3781f8a34e9f9555280af5728170",
    issueDate: "May 16, 2025",
    role: "Course Graduate",
    description:
      "Certified by IBM SkillsBuild for creating visual data dashboards, statistical plots, interactive charts, and maps using Matplotlib, Seaborn, and Folium.",
    image: "/certificates/ibm-data-visualization.jpg",
    verifyUrl:
      "https://courses.skillsbuild.skillsnetwork.site/certificates/02cd3781f8a34e9f9555280af5728170",
    skills: ["Matplotlib", "Seaborn", "Folium", "Visual Analytics"],
    themeColor: "from-blue-500/10 to-indigo-500/5 text-blue-700 border-blue-500/20",
  },
  {
    id: "kaggle-intro-programming",
    title: "Intro to Programming",
    category: "Kaggle",
    program: "Kaggle Learn Certification",
    issuer: "Kaggle (Alexis Cook, Head of Kaggle Learn)",
    issuerShort: "Kaggle",
    credentialId: "Kaggle Learn Verified",
    issueDate: "February 21, 2025",
    role: "Course Graduate",
    description:
      "Certificate of completion from Kaggle demonstrating mastery of core programmatic reasoning, arithmetic functions, conditional statements, and Python structures.",
    image: "/certificates/kaggle-intro-programming.jpg",
    verifyUrl: "https://www.kaggle.com/learn",
    skills: ["Python", "Control Flow", "Functions", "Data Types"],
    themeColor: "from-sky-500/10 to-cyan-500/5 text-sky-700 border-sky-500/20",
  },
];

const categories = ["All", "Eterna", "IBM", "Kaggle"] as const;

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCerts = useMemo(() => {
    if (selectedCategory === "All") return certificatesData;
    return certificatesData.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const copyCredential = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalCert(null);
    };
    if (activeModalCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalCert]);

  return (
    <section
      id="certificates"
      className="py-16 md:py-20 w-full border-t border-border bg-background relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ── Compact Header & Category Filter Bar ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-border/60">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground/50 mb-2">
              <Award className="w-3.5 h-3.5 text-foreground/60" />
              <span>Verified Credentials ({certificatesData.length})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
              Certificates &amp; Accomplishments
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? certificatesData.length
                  : certificatesData.filter((c) => c.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 shrink-0 cursor-pointer",
                    isSelected
                      ? "bg-foreground text-background shadow-xs font-semibold"
                      : "bg-foreground/[0.04] text-foreground/60 hover:text-foreground hover:bg-foreground/[0.08]"
                  )}
                >
                  <span>{cat}</span>
                  <span className="ml-1.5 text-[11px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Compact Cards Grid (impactful, responsive, no scroll bloat) ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalCert(cert)}
                className="group relative rounded-2xl border border-border bg-white p-4 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-foreground/30 transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Thumbnail Preview with Subtle Hover Action */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5 border border-border/60 mb-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Verified Badge Overlay */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-black/5 text-[10px] font-semibold text-emerald-700 shadow-xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{cert.issuerShort}</span>
                      </span>
                    </div>

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="p-2 rounded-full bg-white text-zinc-950 shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div className="mb-2">
                    <p className="text-[11px] font-mono font-medium text-foreground/45 uppercase tracking-wider mb-1">
                      {cert.program}
                    </p>
                    <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-foreground/75 transition-colors line-clamp-1">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded bg-foreground/[0.03] text-foreground/60 border border-border/50"
                      >
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-foreground/40 font-mono">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Issue date & Quick View */}
                <div className="pt-2.5 border-t border-border/50 flex items-center justify-between text-xs text-foreground/50">
                  <span className="text-[11px] font-medium">{cert.issueDate}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-foreground text-[11px] group-hover:translate-x-0.5 transition-transform">
                    <span>View Credential</span>
                    <ChevronRight className="w-3.5 h-3.5 text-foreground/60" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── 4K Lightbox Modal (High-Res Inspection & Verification) ── */}
      <AnimatePresence>
        {activeModalCert && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalCert(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-zinc-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-zinc-900/80">
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white leading-tight truncate">
                      {activeModalCert.title}
                    </h4>
                    <p className="text-xs text-white/50 truncate">
                      {activeModalCert.issuer} · {activeModalCert.issueDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeModalCert.pdfUrl && (
                    <a
                      href={activeModalCert.pdfUrl}
                      download="Kelvin-Marcello-Eterna-Certificate.pdf"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  )}

                  <a
                    href={activeModalCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Verify</span>
                  </a>

                  <button
                    onClick={() => setActiveModalCert(null)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Viewport */}
              <div className="overflow-auto p-4 sm:p-6 flex items-center justify-center bg-zinc-900/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModalCert.image}
                  alt={activeModalCert.title}
                  className="max-w-full max-h-[65vh] w-auto h-auto rounded-xl shadow-2xl object-contain border border-white/10 select-none"
                />
              </div>

              {/* Modal Bottom Metadata Row */}
              <div className="px-5 sm:px-6 py-3 border-t border-white/10 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
                <div className="flex items-center gap-2 min-w-0">
                  <Hash className="w-3.5 h-3.5 text-white/40 shrink-0" />
                  <span className="font-mono text-[11px] truncate text-white/60">
                    ID: {activeModalCert.credentialId}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyCredential(
                        activeModalCert.id,
                        activeModalCert.credentialId
                      )
                    }
                    className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                    title="Copy Credential ID"
                  >
                    {copiedId === activeModalCert.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeModalCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
