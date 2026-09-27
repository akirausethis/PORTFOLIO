import * as fs from 'fs';

let content = fs.readFileSync('src/data/creative.ts', 'utf8');

content = content.replace(
  /export const categoryLabels: Record<CreativeCategory, string> = \{.*?\};/s,
  `export const categoryLabels: Record<CreativeCategory, string> = {
  photography: "Photography",
  "video-editing": "Video Editing",
  "motion-editing": "Motion Editing",
};`
);

fs.writeFileSync('src/data/creative.ts', content);
console.log("fixed categoryLabels in creative.ts again");
