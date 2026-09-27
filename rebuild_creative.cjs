const fs = require("fs");
const path = require("path");

// ── Helpers ──────────────────────────────────────────────────────────────────
let uid = 1;
function id(prefix) { return `${prefix}-${uid++}`; }

function encodeImagePath(p) {
  // URL-encode everything after /creative/ for paths with spaces
  const rel = p.replace(/\\/g, "/").replace(/^.*\/public/, "");
  return rel.split("/").map((seg, i) => i === 0 ? seg : encodeURIComponent(seg)).join("/");
}

// ── Build entries ─────────────────────────────────────────────────────────────
const works = [];

// 1. GFX (Motion Editing/GFX) — correct path
const gfxDir = "public/creative/Motion Editing/GFX";
if (fs.existsSync(gfxDir)) {
  for (const file of fs.readdirSync(gfxDir).sort()) {
    if (!/\.(jpg|png)$/i.test(file)) continue;
    const title = file.replace(/^GFX - /, "").replace(/\.[^.]+$/, "");
    works.push({
      id: id("gfx"),
      title,
      category: "motion-editing",
      subcategory: "gfx",
      image: `/creative/Motion Editing/GFX/${file}`,
      year: "2024",
      tools: ["After Effects", "Photoshop"],
    });
  }
}

// 2. Motion Design (Motion Editing/Motion Design/**/*)
const mdRoot = "public/creative/Motion Editing/Motion Design";
if (fs.existsSync(mdRoot)) {
  for (const folder of fs.readdirSync(mdRoot).sort()) {
    const folderPath = path.join(mdRoot, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;
    for (const file of fs.readdirSync(folderPath).sort()) {
      if (!/\.(jpg|png)$/i.test(file)) continue;
      const title = file.replace(/\.[^.]+$/, "");
      works.push({
        id: id("md"),
        title,
        category: "motion-editing",
        subcategory: "motion-design",
        image: `/creative/Motion Editing/Motion Design/${folder}/${file}`,
        year: "2023",
        tools: ["Photoshop", "Canva"],
      });
    }
  }
}

// 3. Photography
const photoDir = "public/creative/Photography";
if (fs.existsSync(photoDir)) {
  let idx = 1;
  for (const file of fs.readdirSync(photoDir).sort()) {
    if (!/\.(jpg|png)$/i.test(file)) continue;
    works.push({
      id: id("photo"),
      title: `Photography ${idx++}`,
      category: "photography",
      image: `/creative/Photography/${file}`,
      year: "2023",
      tools: ["Lightroom"],
    });
  }
}

// 4. Video Editing (YouTube links — keep existing)
const videos = [
  // ADS
  { id: "ads-1",  title: "ADS - ConfortSculpt", sub: "ads",   link: "https://youtu.be/EuOfGCIwPKQ", thumb: "EuOfGCIwPKQ", year: "2024", aspect: "portrait" },
  { id: "ads-2",  title: "ADS - AutoPump",      sub: "ads",   link: "https://youtu.be/cqES8zBbBZQ", thumb: "cqES8zBbBZQ", year: "2024", aspect: "portrait" },
  { id: "ads-3",  title: "ADS - Wellife",       sub: "ads",   link: "https://youtu.be/q5XcTVWp2oM", thumb: "q5XcTVWp2oM", year: "2024", aspect: "portrait" },
  { id: "ads-4",  title: "ADS - Titan",         sub: "ads",   link: "https://youtu.be/iwj6lHyHO7w", thumb: "iwj6lHyHO7w", year: "2024", aspect: "portrait" },
  { id: "ads-5",  title: "ADS - Pawable",       sub: "ads",   link: "https://youtu.be/6l2VzHbVVGY", thumb: "6l2VzHbVVGY", year: "2024", aspect: "portrait" },
  { id: "ads-6",  title: "ADS - Manly",         sub: "ads",   link: "https://youtu.be/lQwnj2RLDF0", thumb: "lQwnj2RLDF0", year: "2024", aspect: "portrait" },
  { id: "ads-7",  title: "ADS - Drops",         sub: "ads",   link: "https://youtu.be/3BoVPcyJw3A", thumb: "3BoVPcyJw3A", year: "2024", aspect: "portrait" },
  { id: "ads-8",  title: "ADS - DirectMeds",    sub: "ads",   link: "https://youtu.be/53Er2yniAos", thumb: "53Er2yniAos", year: "2024", aspect: "portrait" },
  // RECAP
  { id: "rec-1",  title: "RECAP - Insight Design",            sub: "recap", link: "https://youtu.be/3k2Vcrz8PHQ", thumb: "3k2Vcrz8PHQ", year: "2023" },
  { id: "rec-2",  title: "RECAP - Academic Odyssey",          sub: "recap", link: "https://youtu.be/gMpVkfrAasw", thumb: "gMpVkfrAasw", year: "2023" },
  { id: "rec-3",  title: "RECAP - Inauguration Night",        sub: "recap", link: "https://youtu.be/njg9biKAzuE", thumb: "njg9biKAzuE", year: "2023" },
  { id: "rec-4",  title: "RECAP - Red Carpet Night",          sub: "recap", link: "https://youtu.be/18MQfYhH5U8", thumb: "18MQfYhH5U8", year: "2023" },
  { id: "rec-5",  title: "RECAP - Pulse",                     sub: "recap", link: "https://youtu.be/OMn297ALgzU", thumb: "OMn297ALgzU", year: "2023" },
  { id: "rec-6",  title: "RECAP - Digital Entrepreneurship",  sub: "recap", link: "https://youtu.be/Ck4arpx1LUY", thumb: "Ck4arpx1LUY", year: "2023" },
  // AMV
  { id: "amv-1",  title: "AMV - Hitori",  sub: "amv", link: "https://youtu.be/iuB8iASP3so", thumb: "iuB8iASP3so", year: "2023" },
  { id: "amv-2",  title: "AMV - Robin",   sub: "amv", link: "https://youtu.be/RNxvo8Rlw24", thumb: "RNxvo8Rlw24", year: "2023" },
  { id: "amv-3",  title: "AMV - Suisei",  sub: "amv", link: "https://youtu.be/WAJHcbXO4Es", thumb: "WAJHcbXO4Es", year: "2023" },
  { id: "amv-4",  title: "AMV - Ruby",    sub: "amv", link: "https://youtu.be/2HKBxCgTB_0", thumb: "2HKBxCgTB_0", year: "2023" },
  { id: "amv-5",  title: "AMV - Sachi",   sub: "amv", link: "https://youtu.be/T1BJ8B1eBpo", thumb: "T1BJ8B1eBpo", year: "2023" },
  { id: "amv-6",  title: "AMV - Sajuna",  sub: "amv", link: "https://youtu.be/uKWtphm-nlk", thumb: "uKWtphm-nlk", year: "2023" },
  { id: "amv-7",  title: "AMV - Siesta",  sub: "amv", link: "https://youtu.be/p79bOFRDmKQ", thumb: "p79bOFRDmKQ", year: "2023" },
  { id: "amv-8",  title: "AMV - Yuki",    sub: "amv", link: "https://youtu.be/j-rK08JCXRw", thumb: "j-rK08JCXRw", year: "2023" },
];

for (const v of videos) {
  works.push({
    id: v.id,
    title: v.title,
    category: "video-editing",
    subcategory: v.sub,
    image: `https://img.youtube.com/vi/${v.thumb}/hqdefault.jpg`,
    link: v.link,
    year: v.year,
    ...(v.aspect ? { aspect: v.aspect } : {}),
    tools: ["CapCut", "After Effects"],
  });
}

// ── Serialize ────────────────────────────────────────────────────────────────
function serialize(obj, indent = "  ") {
  const lines = ["{"];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    const val = typeof v === "string" ? JSON.stringify(v)
              : Array.isArray(v) ? `[${v.map(x => JSON.stringify(x)).join(", ")}]`
              : JSON.stringify(v);
    lines.push(`${indent}  ${k}: ${val},`);
  }
  lines.push(`${indent}}`);
  return lines.join("\n");
}

const body = works.map(w => `  ${serialize(w)}`).join(",\n");

const output = `export type CreativeCategory = "photography" | "video-editing" | "motion-editing";

export interface CreativeWork {
  id: string;
  title: string;
  category: CreativeCategory;
  subcategory?: string;
  image: string;
  link?: string;
  aspect?: "auto" | "portrait" | "landscape" | "square";
  year: string;
  description?: string;
  tools?: string[];
}

export const creativeWorks: CreativeWork[] = [
${body}
];

export const categoryLabels: Record<CreativeCategory, string> = {
  photography: "Photography",
  "video-editing": "Video Editing",
  "motion-editing": "Motion Editing",
};
`;

fs.writeFileSync("src/data/creative.ts", output, "utf8");
console.log(`Done — ${works.length} items written.`);
console.log("  GFX:", works.filter(w => w.subcategory === "gfx").length);
console.log("  Motion Design:", works.filter(w => w.subcategory === "motion-design").length);
console.log("  Photography:", works.filter(w => w.category === "photography").length);
console.log("  Videos:", works.filter(w => w.category === "video-editing").length);
