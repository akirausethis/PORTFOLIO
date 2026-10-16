"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import clsx from "clsx";

interface ServicePackage {
  tier: string;
  badge?: string;
  tagline: string;
  priceTitle: string;
  priceSubtitle: string;
  features: string[];
  featured?: boolean;
  ctaText: string;
}

const packages: ServicePackage[] = [
  {
    tier: "STARTER",
    tagline: "Simple needs, high-converting landing pages, and first projects.",
    priceTitle: "Pricing tailored to your needs",
    priceSubtitle: "Determined together once the project scope is clear.",
    features: [
      "Custom Landing Page or Company Profile (1–3 pages)",
      "Responsive UI/UX design & smooth scroll animations",
      "2 rounds of structured revisions",
      "Estimated 3–7 business days turnaround",
      "Consultation via chat & domain/hosting deployment",
    ],
    ctaText: "Choose Starter",
  },
  {
    tier: "PROFESSIONAL",
    badge: "Most Popular",
    tagline: "Full-stack web applications, e-commerce, and interactive 3D sites.",
    priceTitle: "Pricing tailored to your needs",
    priceSubtitle: "Fixed-price or milestone quote based on feature scope.",
    features: [
      "Full-Stack Web App, E-Commerce, or 3D Web Experience",
      "Custom Backend API, Database (PostgreSQL) & Admin Dashboard",
      "4 rounds of revisions + SEO & performance optimization",
      "Estimated 2–4 weeks turnaround",
      "1-on-1 discovery call, progress demos & cloud setup",
    ],
    featured: true,
    ctaText: "Choose Professional",
  },
  {
    tier: "CUSTOM & AI",
    tagline: "Bespoke systems, AI automation workflows, and creative production.",
    priceTitle: "Pricing tailored to your needs",
    priceSubtitle: "Scoped collaboratively around your custom architecture.",
    features: [
      "Custom AI Agents, RAG Pipelines, or Scalable SaaS Product",
      "End-to-End Engineering + Creative Visual/Motion Production",
      "Flexible iterative revisions across development sprints",
      "Timeline tailored to your product roadmap",
      "Priority communication, technical docs & post-launch support",
    ],
    ctaText: "Discuss Custom Scope",
  },
];

export default function Packages() {
  const handleSelectPackage = (tierName: string) => {
    window.dispatchEvent(
      new CustomEvent("select-package", {
        detail: `${tierName} Package Inquiry`,
      })
    );
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="packages"
      className="py-24 md:py-32 w-full border-t border-border bg-background relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ── Centered Header (Matches reference screenshot) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-foreground/[0.06] border border-border/80 mb-6">
            <span className="text-xs font-bold tracking-[0.06em] text-foreground">
              Service Packages
            </span>
          </div>

          {/* Two-Tone Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight leading-[1.15] mb-5">
            <span className="text-foreground">Clear scope, </span>
            <span className="text-foreground/45">pricing discussed together</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-foreground/60 font-normal leading-relaxed">
            I don&apos;t lock projects into rigid flat rates because every build
            has a different scope. Choose the package closest to your needs, and
            we&apos;ll craft the right proposal together.
          </p>
        </motion.div>

        {/* ── 3 Package Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.tier}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={clsx(
                "relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300",
                pkg.featured
                  ? "bg-white border-2 border-foreground shadow-[0_20px_50px_rgba(0,0,0,0.06)] lg:-translate-y-2"
                  : "bg-white/85 border border-border shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:border-foreground/30"
              )}
            >
              {/* Subtle Corner Dot Matrix Pattern (Matches reference card top-right texture) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 w-44 h-44 opacity-[0.14]"
                style={{
                  backgroundImage:
                    "radial-gradient(#111111 1.25px, transparent 1.25px)",
                  backgroundSize: "12px 12px",
                  maskImage:
                    "radial-gradient(circle at top right, black 20%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at top right, black 20%, transparent 75%)",
                }}
              />

              <div>
                {/* Tier Label & Optional Popular Pill */}
                <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
                  <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-foreground/65">
                    {pkg.tier}
                  </span>
                  {pkg.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-semibold tracking-wide">
                      <Sparkles className="w-3 h-3" />
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Short Tagline */}
                <p className="text-sm sm:text-[15px] text-foreground/65 leading-relaxed mb-6 relative z-10">
                  {pkg.tagline}
                </p>

                {/* Tinted Pricing Callout Box */}
                <div className="rounded-2xl bg-foreground/[0.04] border border-border/60 p-4 sm:p-5 mb-6 relative z-10">
                  <p className="text-base sm:text-[17px] font-bold text-foreground mb-1">
                    {pkg.priceTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                    {pkg.priceSubtitle}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-border/80 my-6" />

                {/* Features Checklist */}
                <ul className="space-y-3.5 mb-8 relative z-10">
                  {pkg.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-sm sm:text-[15px] text-foreground/80 leading-snug"
                    >
                      <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-foreground shrink-0 mt-0.5 stroke-[2.2]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Button */}
              <div className="relative z-10 pt-2">
                <button
                  type="button"
                  onClick={() => handleSelectPackage(pkg.tier)}
                  className={clsx(
                    "w-full py-3.5 px-5 rounded-2xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer group",
                    pkg.featured
                      ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                      : "bg-transparent text-foreground border border-border hover:border-foreground hover:bg-foreground/[0.03]"
                  )}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
