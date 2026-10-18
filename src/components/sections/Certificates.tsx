"use client";

import { useState, useEffect } from "react";
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
  Sparkles,
} from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  recipient: string;
  program: string;
  issuer: string;
  partnerInstitution: string;
  credentialId: string;
  issueDate: string;
  role: string;
  cohort: string;
  description: string;
  image: string;
  pdfUrl: string;
  issuerUrl: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: "eterna-2026",
    title: "Certificate of Accomplishment",
    recipient: "Kelvin Marcello Piter",
    program: "Eterna Indonesia Internship Program 2026",
    issuer: "Eterna Indonesia (PT Daya Abadi Indonesia)",
    partnerInstitution: "Ciputra University",
    credentialId: "02/ETERNA-UC/INT/X/2026",
    issueDate: "October 13, 2026",
    role: "Full Stack Developer Intern",
    cohort: "UC Interns 2026 Cohort",
    description:
      "Awarded in recognition of successfully completing the rigorous internship program as a Full Stack Developer Intern at Eterna Indonesia, demonstrating exceptional dedication, technical growth, and meaningful engineering contributions to real-world production systems.",
    image: "/certificates/eterna-internship-certificate.jpg",
    pdfUrl: "/certificates/eterna-internship-certificate.pdf",
    issuerUrl: "https://eternaindonesia.com",
    skills: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Discord API",
      "CI/CD Pipelines",
      "Full Stack Development",
    ],
  },
];

export default function Certificates() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalCert, setActiveModalCert] = useState<Certificate | null>(null);

  const copyCredential = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Close modal with Escape key
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
      className="py-28 md:py-36 w-full border-t border-border bg-background relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/[0.05] border border-border text-xs font-semibold tracking-wider text-foreground uppercase mb-6">
              <Award className="w-3.5 h-3.5 text-foreground/70" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-foreground leading-[1.1]">
              Certificates &amp; <br />
              <span className="text-foreground/35">Accomplishments</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-foreground/55 font-light max-w-sm"
          >
            Formal industry credentials and institutional validations testifying
            to real-world engineering impact and technical rigor.
          </motion.p>
        </div>

        {/* ── Certificates Display ── */}
        <div className="space-y-12">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-border bg-white shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* ── Left Column: Interactive Certificate Visual ── */}
                <div className="lg:col-span-7 bg-[#F4F4F6] p-6 sm:p-10 flex flex-col justify-center items-center relative group border-b lg:border-b-0 lg:border-r border-border">
                  {/* Subtle Background Pattern */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-[0.4]"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
                      `,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Top Status Pill */}
                  <div className="w-full flex items-center justify-between mb-5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 text-[11px] font-semibold text-emerald-700 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Industry Credential</span>
                    </span>
                    <span className="text-[11px] font-mono text-foreground/50 uppercase tracking-widest hidden sm:inline">
                      100% Authentic
                    </span>
                  </div>

                  {/* Certificate Frame with Hover Preview Effect */}
                  <div
                    onClick={() => setActiveModalCert(cert)}
                    className="relative w-full max-w-[620px] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-black/10 cursor-pointer transform transition-all duration-500 group-hover:scale-[1.015] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] z-10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto object-cover select-none"
                    />

                    {/* Hover Overlay with "Click to Expand" */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-xs tracking-wide shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-4 h-4 text-zinc-800" />
                        <span>Click to Expand High-Res</span>
                      </span>
                    </div>
                  </div>

                  {/* Bottom helper prompt */}
                  <p className="text-[11px] text-foreground/45 mt-4 z-10 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-foreground/40" />
                    <span>Click certificate image to inspect official seal and signatures in 4K</span>
                  </p>
                </div>

                {/* ── Right Column: Credential Metadata & Verification Details ── */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Header info */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                      <span className="text-xs text-foreground/40 font-mono">
                        {cert.cohort}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-semibold text-foreground/75 mb-6">
                      {cert.program}
                    </p>

                    {/* Official description quote block */}
                    <div className="relative pl-4 border-l-2 border-foreground/20 italic text-xs sm:text-[13px] text-foreground/70 leading-relaxed mb-8">
                      &ldquo;{cert.description}&rdquo;
                    </div>

                    {/* Metadata Key-Value Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-border">
                      <div className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/70">
                        <div className="flex items-center gap-1.5 text-foreground/40 text-[10px] uppercase font-bold tracking-wider mb-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Issuer</span>
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {cert.issuer}
                        </p>
                        <p className="text-[11px] text-foreground/50">
                          {cert.partnerInstitution}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/70">
                        <div className="flex items-center gap-1.5 text-foreground/40 text-[10px] uppercase font-bold tracking-wider mb-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Issued On</span>
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {cert.issueDate}
                        </p>
                        <p className="text-[11px] text-foreground/50">
                          Jakarta, Indonesia
                        </p>
                      </div>
                    </div>

                    {/* Credential ID with Copy Action */}
                    <div className="py-4 border-b border-border flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-0.5">
                          <Hash className="w-3 h-3" />
                          <span>Credential ID</span>
                        </div>
                        <p className="font-mono text-xs text-foreground font-semibold truncate">
                          {cert.credentialId}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          copyCredential(cert.id, cert.credentialId)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] transition-colors shrink-0 cursor-pointer"
                        title="Copy Credential ID"
                      >
                        {copiedId === cert.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Skills Tag Cloud */}
                    <div className="pt-4 mb-8">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-2">
                        Validated Competencies
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-foreground/[0.04] text-foreground/75 border border-border/60"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Action Buttons ── */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalCert(cert)}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-foreground/85 transition-all shadow-xs cursor-pointer group"
                    >
                      <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>View High-Res Certificate</span>
                    </button>

                    <a
                      href={cert.pdfUrl}
                      download="Kelvin-Marcello-Eterna-Certificate.pdf"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white text-xs font-semibold text-foreground hover:bg-foreground/[0.03] transition-colors"
                      title="Download Official PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-foreground/70" />
                      <span>Download PDF</span>
                    </a>

                    <a
                      href={cert.issuerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center p-3 rounded-xl border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03] transition-colors"
                      title="Visit Issuer Website (eternaindonesia.com)"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      <AnimatePresence>
        {activeModalCert && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8">
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-zinc-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {activeModalCert.title}
                    </h4>
                    <p className="text-xs text-white/50">
                      {activeModalCert.issuer} · ID: {activeModalCert.credentialId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeModalCert.pdfUrl}
                    download="Kelvin-Marcello-Eterna-Certificate.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download PDF</span>
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
              <div className="overflow-auto p-4 sm:p-6 flex items-center justify-center bg-zinc-900/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModalCert.image}
                  alt={activeModalCert.title}
                  className="max-w-full max-h-[72vh] w-auto h-auto rounded-xl shadow-2xl object-contain border border-white/10 select-none"
                />
              </div>

              {/* Modal Bottom Verification Footer */}
              <div className="px-6 py-3 border-t border-white/10 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Officially signed by COO Omar Mohammad Saleh Alatas</span>
                </div>
                <div className="font-mono text-[11px] text-white/40">
                  PT Daya Abadi Indonesia · SCBD Lot 28, Jakarta
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
