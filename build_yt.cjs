const https = require('https');
const fs = require('fs');

const ads = [
  "EuOfGCIwPKQ", "cqES8zBbBZQ", "q5XcTVWp2oM", "iwj6lHyHO7w",
  "6l2VzHbVVGY", "lQwnj2RLDF0", "3BoVPcyJw3A", "53Er2yniAos"
];
const recaps = [
  "3k2Vcrz8PHQ", "gMpVkfrAasw", "njg9biKAzuE", 
  "18MQfYhH5U8", "OMn297ALgzU", "Ck4arpx1LUY"
];
const amvs = [
  "iuB8iASP3so", "RNxvo8Rlw24", "WAJHcbXO4Es", "2HKBxCgTB_0",
  "T1BJ8B1eBpo", "uKWtphm-nlk", "p79bOFRDmKQ", "j-rK08JCXRw"
];

const fetchTitle = (id) => {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).title);
        } catch(e) {
          resolve("Untitled Video");
        }
      });
    }).on('error', () => resolve("Untitled Video"));
  });
};

async function build() {
  const works = [];
  let idCounter = 1;

  // 1. GFX
  const gfxFiles = [
    "GFX - Azusa.jpg", "GFX - Camellya.jpg", "GFX - Firefly.jpg", "GFX - Ganyu.jpg", 
    "GFX - Miyabi.jpg", "GFX - Ruan.jpg", "GFX - Silverwolf.jpg", "GFX - Yelan.jpg"
  ];
  for (const f of gfxFiles) {
    const name = f.replace("GFX - ", "").replace(".jpg", "");
    works.push(`  {
    id: "motion-${idCounter++}",
    title: "${name}",
    category: "motion-design",
    image: "/creative/Motion Design/GFX/${f}",
    year: "2024",
    tools: ["After Effects", "Photoshop"],
  }`);
  }

  // 2. ADS
  for (const id of ads) {
    const title = await fetchTitle(id);
    works.push(`  {
    id: "video-ads-${idCounter++}",
    title: "${title.replace(/"/g, '\\"')}",
    category: "video-editing",
    image: "https://img.youtube.com/vi/${id}/maxresdefault.jpg",
    link: "https://youtu.be/${id}",
    year: "2024",
    tools: ["Premiere Pro", "CapCut"],
  }`);
  }

  // 3. RECAPS
  for (const id of recaps) {
    const title = await fetchTitle(id);
    works.push(`  {
    id: "video-recap-${idCounter++}",
    title: "${title.replace(/"/g, '\\"')}",
    category: "video-editing",
    image: "https://img.youtube.com/vi/${id}/maxresdefault.jpg",
    link: "https://youtu.be/${id}",
    year: "2023",
    tools: ["Premiere Pro"],
  }`);
  }

  // 4. AMVS
  for (const id of amvs) {
    const title = await fetchTitle(id);
    works.push(`  {
    id: "video-amv-${idCounter++}",
    title: "${title.replace(/"/g, '\\"')}",
    category: "video-editing",
    image: "https://img.youtube.com/vi/${id}/maxresdefault.jpg",
    link: "https://youtu.be/${id}",
    year: "2023",
    tools: ["Alight Motion", "After Effects"],
  }`);
  }

  const content = `export type CreativeCategory = "photography" | "graphic-design" | "video-editing" | "motion-design";

export interface CreativeWork {
  id: string;
  title: string;
  category: CreativeCategory;
  image: string;
  link?: string;
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
  console.log('Finished generating creative.ts!');
}

build();
