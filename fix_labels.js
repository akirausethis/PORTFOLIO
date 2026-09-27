import * as fs from 'fs';

let content = fs.readFileSync('src/data/creative.ts', 'utf8');

content = content.replace(
  'export const categoryLabels: Record<CreativeCategory, string> = {\n  photography: "Photography",\n  "graphic-design": "Graphic Design",\n  "video-editing": "Video Editing",\n  "motion-design": "Motion Design",\n};',
  'export const categoryLabels: Record<CreativeCategory, string> = {\n  photography: "Photography",\n  "video-editing": "Video Editing",\n  "motion-editing": "Motion Editing",\n};'
);

fs.writeFileSync('src/data/creative.ts', content);
console.log("fixed categoryLabels");
