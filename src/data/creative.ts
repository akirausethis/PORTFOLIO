export type CreativeCategory = "photography" | "graphic-design" | "video-editing" | "motion-design";

export interface CreativeWork {
  id: string;
  title: string;
  category: CreativeCategory;
  image: string; // URL or /images/... path
  year: string;
  description?: string;
  tools?: string[];
}

export const creativeWorks: CreativeWork[] = [
  // ── Photography ───────────────────────────────────────────────
  {
    id: "photo-01",
    title: "Photography — Slot 1",
    category: "photography",
    image: "",
    year: "2024",
    tools: ["Camera"],
  },
  {
    id: "photo-02",
    title: "Photography — Slot 2",
    category: "photography",
    image: "",
    year: "2024",
    tools: ["Camera"],
  },
  // ── Graphic Design ────────────────────────────────────────────
  {
    id: "design-01",
    title: "Graphic Design — Slot 1",
    category: "graphic-design",
    image: "",
    year: "2024",
    tools: ["Photoshop"],
  },
  {
    id: "design-02",
    title: "Graphic Design — Slot 2",
    category: "graphic-design",
    image: "",
    year: "2024",
    tools: ["Canva"],
  },
  // ── Video Editing ─────────────────────────────────────────────
  {
    id: "video-01",
    title: "Video Editing — Slot 1",
    category: "video-editing",
    image: "",
    year: "2024",
    tools: ["CapCut"],
  },
  {
    id: "video-02",
    title: "Video Editing — Slot 2",
    category: "video-editing",
    image: "",
    year: "2024",
    tools: ["CapCut", "Premiere"],
  },
  // ── Motion Design ─────────────────────────────────────────────
  {
    id: "motion-01",
    title: "Motion Design — Slot 1",
    category: "motion-design",
    image: "",
    year: "2024",
    tools: ["After Effects"],
  },
  {
    id: "motion-02",
    title: "Motion Design — Slot 2",
    category: "motion-design",
    image: "",
    year: "2024",
    tools: ["Alight Motion"],
  },
];

export const categoryLabels: Record<CreativeCategory, string> = {
  photography: "Photography",
  "graphic-design": "Graphic Design",
  "video-editing": "Video Editing",
  "motion-design": "Motion Design",
};
