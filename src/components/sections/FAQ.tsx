"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "I offer end-to-end digital product development—including Full-Stack Web Applications (Next.js, TypeScript, PostgreSQL), Interactive 3D & Motion Websites (Three.js, GSAP, Framer Motion), AI Engineering & Workflow Automation (LLM integrations, RAG pipelines, computer vision), and Creative Visual Production.",
  },
  {
    question: "How do we start a project together?",
    answer:
      "Simply reach out via WhatsApp or the contact form below with a brief overview of your project idea, goals, and timeline. We will schedule a quick discovery chat to align on scope, architecture, and deliverables before kicking off design and development.",
  },
  {
    question: "How does your pricing work?",
    answer:
      "Pricing is tailored to your project's scope, complexity, and timeline. After our initial discovery conversation, I provide a clear, transparent fixed-price quote or milestone-based breakdown so you know the exact investment upfront with zero hidden fees.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A high-converting landing page or interactive portfolio typically takes 1–2 weeks. Custom full-stack web applications, e-commerce platforms, or AI-integrated systems generally take 3–6 weeks depending on feature complexity and integrations.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes! Every project includes dedicated revision rounds during both the design/prototyping stage and final development review to ensure the finished product matches your vision down to the finest detail.",
  },
  {
    question: "Are domain and hosting included?",
    answer:
      "I handle the complete deployment, cloud hosting setup (Vercel, AWS, or VPS), SSL security, and custom domain routing at no extra setup charge. Domain purchase and any paid cloud tiers can either be included in the package or registered directly under your own account for 100% ownership.",
  },
  {
    question: "Do you take on custom projects?",
    answer:
      "Absolutely. Whether you need a custom e-commerce experience, an interactive 3D web showcase, a bespoke internal dashboard, or an automated AI workflow tailored to your business operations, I build custom solutions from the ground up.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 w-full border-t border-border bg-background relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left Column: Header & WhatsApp CTA (Matches reference layout on mobile & sticky split on desktop) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-foreground/[0.06] border border-border/80 mb-6">
              <span className="text-xs font-bold tracking-[0.08em] uppercase text-foreground">
                FAQ
              </span>
            </div>

            {/* Heading with two-tone emphasis */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight leading-[1.15] mb-5">
              <span className="text-foreground">Frequently </span>
              <span className="text-foreground/45">asked questions</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-foreground/60 font-normal leading-relaxed mb-7 max-w-md">
              Haven&apos;t found the answer you&apos;re looking for? Ask me
              directly via WhatsApp, and I&apos;ll get back to you as soon as
              possible.
            </p>

            {/* Direct WhatsApp CTA Link */}
            <a
              href="https://wa.me/6282336007731"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold text-foreground hover:text-foreground/70 transition-colors group"
            >
              <span>Ask via WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </motion.div>

          {/* ── Right Column: Rounded Bordered Accordion Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl sm:rounded-3xl border border-border bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.03)] divide-y divide-border overflow-hidden">
              {faqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "transition-colors duration-200",
                      isOpen ? "bg-foreground/[0.015]" : "hover:bg-foreground/[0.01]"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left cursor-pointer"
                    >
                      <span className="text-base sm:text-[17px] font-semibold text-foreground leading-snug pr-2">
                        {item.question}
                      </span>

                      {/* Plus Icon in Rounded Square Badge */}
                      <span
                        className={clsx(
                          "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                          isOpen
                            ? "bg-foreground text-background"
                            : "bg-foreground/[0.06] text-foreground/80"
                        )}
                      >
                        <Plus
                          className={clsx(
                            "w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 ease-out",
                            isOpen && "rotate-45"
                          )}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.2 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-7 pb-6 pt-0 text-sm sm:text-base text-foreground/65 leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
