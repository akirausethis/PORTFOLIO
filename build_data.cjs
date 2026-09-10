const fs = require('fs');

const works = [];

const gfx = [
  "GFX - Azusa.jpg", "GFX - Camellya.jpg", "GFX - Firefly.jpg", "GFX - Ganyu.jpg", 
  "GFX - Miyabi.jpg", "GFX - Ruan.jpg", "GFX - Silverwolf.jpg", "GFX - Yelan.jpg"
];

const ads = [
  "ADS - AutoPump.mp4", "ADS - ConfortSculpt.mp4", "ADS - DirectMeds.mp4", "ADS - Drops.mp4", 
  "ADS - Manly.mp4", "ADS - Pawable.mp4", "ADS - Titan.mp4", "ADS - Wellife.mp4", "ADS - Willow.mp4"
];

const amv = [
  "AMV - Hitori.mp4", "AMV - Robin.mp4", "AMV - Ruby.mp4", "AMV - Sachi.mp4", 
  "AMV - Sajuna.mp4", "AMV - Siesta.mp4", "AMV - Suisei.mp4", "AMV - Yuki.mp4"
];

const recap = [
  "RECAP - Academic Odyssey.mp4", "RECAP - Digital Entrepreneurship.mp4", 
  "RECAP - Inauguration Night.mp4", "RECAP - Insight Design.mp4", "RECAP - Pulse.mp4"
];

let idCounter = 1;

gfx.forEach(f => {
  const name = f.replace("GFX - ", "").replace(".jpg", "");
  works.push(`  {
    id: "motion-${idCounter++}",
    title: "${name}",
    category: "motion-design",
    image: "/creative/Motion Design/GFX/${f}",
    year: "2024",
    tools: ["After Effects", "Photoshop"],
  }`);
});

ads.forEach(f => {
  const name = f.replace("ADS - ", "").replace(".mp4", "");
  works.push(`  {
    id: "video-ads-${idCounter++}",
    title: "${name} (Ad)",
    category: "video-editing",
    image: "/creative/Video Editing/ADS/${f}",
    year: "2024",
    tools: ["Premiere Pro", "CapCut"],
  }`);
});

amv.forEach(f => {
  const name = f.replace("AMV - ", "").replace(".mp4", "");
  works.push(`  {
    id: "video-amv-${idCounter++}",
    title: "${name} (AMV)",
    category: "video-editing",
    image: "/creative/Video Editing/AMV/${f}",
    year: "2023",
    tools: ["Alight Motion", "After Effects"],
  }`);
});

recap.forEach(f => {
  const name = f.replace("RECAP - ", "").replace(".mp4", "");
  works.push(`  {
    id: "video-recap-${idCounter++}",
    title: "${name} (Recap)",
    category: "video-editing",
    image: "/creative/Video Editing/RECAP/${f}",
    year: "2023",
    tools: ["Premiere Pro"],
  }`);
});

const content = `export type CreativeCategory = "photography" | "graphic-design" | "video-editing" | "motion-design";

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
${works.join(',\n')}
];

export const categoryLabels: Record<CreativeCategory, string> = {
  photography: "Photography",
  "graphic-design": "Graphic Design",
  "video-editing": "Video Editing",
  "motion-design": "Motion Design",
};
`;

fs.writeFileSync('src/data/creative.ts', content);
console.log('Done!');
