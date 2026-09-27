import * as fs from 'fs';

let content = fs.readFileSync('src/app/creative/page.tsx', 'utf8');

// Update tabs array
content = content.replace(
  /const tabs: \{ id: FilterTab; label: string; dot\?: string \}.*?\];/s,
  `const tabs: { id: FilterTab; label: string; dot?: string }[] = [
  { id: "all", label: "All Work" },
  { id: "photography", label: "Photography", dot: "bg-sky-400" },
  { id: "video-editing", label: "Video Editing", dot: "bg-amber-400" },
  { id: "motion-editing", label: "Motion Editing", dot: "bg-emerald-400" },
];

const subTabs: Record<string, { id: string; label: string }[]> = {
  "video-editing": [
    { id: "all", label: "All" },
    { id: "ads", label: "ADS" },
    { id: "amv", label: "AMV" },
    { id: "recap", label: "RECAP" },
  ],
  "motion-editing": [
    { id: "all", label: "All" },
    { id: "gfx", label: "GFX" },
    { id: "motion-design", label: "Motion Design" },
  ],
};`
);

// Update categoryDot
content = content.replace(
  /const categoryDot: Record<CreativeCategory, string> = \{.*?\};/s,
  `const categoryDot: Record<CreativeCategory, string> = {
  photography: "bg-sky-400",
  "video-editing": "bg-amber-400",
  "motion-editing": "bg-emerald-400",
};`
);

// Update categoryBg
content = content.replace(
  /const categoryBg: Record<CreativeCategory, string> = \{.*?\};/s,
  `const categoryBg: Record<CreativeCategory, string> = {
  photography: "from-sky-500/20",
  "video-editing": "from-amber-500/20",
  "motion-editing": "from-emerald-500/20",
};`
);

// Update state and filtering logic
content = content.replace(
  /const \[activeTab, setActiveTab\] = useState<FilterTab>\("all"\);\s*const \[selectedWork, setSelectedWork\] = useState<CreativeWork \| null>\(null\);\s*const filtered =\s*activeTab === "all"\s*\?\s*creativeWorks\s*:\s*creativeWorks\.filter\(\(w\) => w\.category === activeTab\);/s,
  `const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [selectedWork, setSelectedWork] = useState<CreativeWork | null>(null);

  // When parent tab changes, reset sub-tab
  useEffect(() => {
    setActiveSubTab("all");
  }, [activeTab]);

  const filtered = creativeWorks.filter((w) => {
    if (activeTab !== "all" && w.category !== activeTab) return false;
    if (activeSubTab !== "all" && w.subcategory !== activeSubTab) return false;
    return true;
  });`
);

// Update Header stats
content = content.replace(
  /\{ n: creativeWorks\.filter\(w => w\.category === "motion-design"\)\.length, label: "GFX" \},\s*\{ n: creativeWorks\.length, label: "Total Pieces" \},/s,
  `{ n: creativeWorks.filter(w => w.category === "motion-editing").length, label: "Motion" },
                    { n: creativeWorks.filter(w => w.category === "photography").length, label: "Photos" },`
);

// Update Header tools
content = content.replace(
  /"Pixellab"/g,
  `"Pixellab", "Lightroom"`
);

// Update Filter bar structure
content = content.replace(
  /<div className="max-w-\[1400px\] mx-auto px-6 md:px-12">\s*<div className="bg-background\/85 backdrop-blur-2xl border border-border\/80 shadow-md rounded-2xl md:rounded-full flex items-center gap-0\.5 py-2 px-3 overflow-x-auto \[scrollbar-width:none\] pointer-events-auto">/s,
  `<div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-start gap-3">
          <div className="bg-background/85 backdrop-blur-2xl border border-border/80 shadow-md rounded-2xl md:rounded-full flex items-center gap-0.5 py-2 px-3 overflow-x-auto [scrollbar-width:none] pointer-events-auto max-w-full">`
);

// Add the subtab bar after the main filter bar closing div
content = content.replace(
  /\{filtered\.length\} pieces\s*<\/span>\s*<\/div>/s,
  `{filtered.length} pieces
            </span>
          </div>

          {/* Sub-tabs (only show if the active tab has them) */}
          <AnimatePresence>
            {activeTab !== "all" && subTabs[activeTab] && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-background/85 backdrop-blur-xl border border-border/60 shadow-sm rounded-full flex items-center gap-1 py-1.5 px-2 overflow-x-auto [scrollbar-width:none] pointer-events-auto max-w-full ml-2"
              >
                {subTabs[activeTab].map((subTab) => (
                  <button
                    key={subTab.id}
                    onClick={() => setActiveSubTab(subTab.id)}
                    className={clsx(
                      "relative px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 whitespace-nowrap",
                      activeSubTab === subTab.id
                        ? "text-foreground bg-foreground/10"
                        : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
                    )}
                  >
                    {subTab.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>`
);

fs.writeFileSync('src/app/creative/page.tsx', content);
console.log("updated page.tsx");
