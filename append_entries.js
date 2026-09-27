import * as fs from 'fs';
import * as path from 'path';

let content = fs.readFileSync('src/data/creative.ts', 'utf8');
let newEntries = [];

// Motion Design files
const mdDir = 'public/creative/Motion Editing/Motion Design';
if (fs.existsSync(mdDir)) {
  const folders = fs.readdirSync(mdDir);
  for (const folder of folders) {
    const folderPath = path.join(mdDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg')) {
          const title = file.replace(/\.[^/.]+$/, "");
          newEntries.push(`  {
    id: "motion-design-${Date.now()}-${Math.floor(Math.random() * 1000)}",
    title: "${title}",
    category: "motion-editing",
    subcategory: "motion-design",
    image: "/creative/Motion Editing/Motion Design/${folder}/${file}",
    year: "2023",
    tools: ["After Effects", "Photoshop"],
  },`);
        }
      }
    }
  }
}

// Photography files
const photoDir = 'public/creative/Photography';
if (fs.existsSync(photoDir)) {
  const files = fs.readdirSync(photoDir);
  let idx = 1;
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      newEntries.push(`  {
    id: "photo-${Date.now()}-${Math.floor(Math.random() * 1000)}",
    title: "Photography ${idx}",
    category: "photography",
    image: "/creative/Photography/${file}",
    year: "2023",
    tools: ["Lightroom", "Photoshop"],
  },`);
      idx++;
    }
  }
}

// Ensure we only replace the final array closing bracket
content = content.replace(/\n\];(\s*)$/, '\n' + newEntries.join('\n') + '\n];$1');
fs.writeFileSync('src/data/creative.ts', content);
console.log("Appended new entries to creative.ts");
