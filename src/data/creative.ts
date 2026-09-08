export type CreativeCategory = "photography" | "graphic-design" | "video-editing";

export interface CreativeWork {
  id: string;
  title: string;
  category: CreativeCategory;
  image: string; // URL or /images/... path
  year: string;
  description?: string;
  tools?: string[];
}

// Replace placeholder entries with your real work.
// Set `image` to a public URL (Google Drive direct link, Cloudinary, etc.)
// or drop files into /public/creative/ and use "/creative/filename.jpg"
export const creativeWorks: CreativeWork[] = [
  // ── Photography ───────────────────────────────────────────────
  {
    id: "photo-01",
    title: "Untitled — Coming Soon",
    category: "photography",
    image: "",
    year: "2024",
    description: "Replace this with your photo.",
    tools: ["Camera"],
  },
  {
    id: "photo-02",
    title: "Untitled — Coming Soon",
    category: "photography",
    image: "",
    year: "2024",
    tools: ["Camera"],
  },
  {
    id: "photo-03",
    title: "Untitled — Coming Soon",
    category: "photography",
    image: "",
    year: "2023",
    tools: ["Camera", "Photoshop"],
  },
  {
    id: "photo-04",
    title: "Untitled — Coming Soon",
    category: "photography",
    image: "",
    year: "2023",
    tools: ["Camera"],
  },
  // ── Graphic Design ────────────────────────────────────────────
  {
    id: "design-01",
    title: "Untitled — Coming Soon",
    category: "graphic-design",
    image: "",
    year: "2024",
    tools: ["Canva"],
  },
  {
    id: "design-02",
    title: "Untitled — Coming Soon",
    category: "graphic-design",
    image: "",
    year: "2024",
    tools: ["Photoshop"],
  },
  {
    id: "design-03",
    title: "Untitled — Coming Soon",
    category: "graphic-design",
    image: "",
    year: "2023",
    tools: ["Canva", "Pixellab"],
  },
  {
    id: "design-04",
    title: "Untitled — Coming Soon",
    category: "graphic-design",
    image: "",
    year: "2023",
    tools: ["Photoshop"],
  },
  // ── Video Editing ─────────────────────────────────────────────
  {
    id: "video-01",
    title: "Untitled — Coming Soon",
    category: "video-editing",
    image: "",
    year: "2024",
    tools: ["CapCut"],
  },
  {
    id: "video-02",
    title: "Untitled — Coming Soon",
    category: "video-editing",
    image: "",
    year: "2024",
    tools: ["After Effects", "CapCut"],
  },
  {
    id: "video-03",
    title: "Untitled — Coming Soon",
    category: "video-editing",
    image: "",
    year: "2023",
    tools: ["Alight Motion"],
  },
  {
    id: "video-04",
    title: "Untitled — Coming Soon",
    category: "video-editing",
    image: "",
    year: "2023",
    tools: ["After Effects", "Alight Motion"],
  },
];

export const categoryLabels: Record<CreativeCategory, string> = {
  photography: "Photography",
  "graphic-design": "Graphic Design",
  "video-editing": "Video Editing",
};
