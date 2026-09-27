import * as fs from 'fs';

let content = fs.readFileSync('src/data/creative.ts', 'utf8');

// Update categories
content = content.replace(
  'export type CreativeCategory = "photography" | "graphic-design" | "video-editing" | "motion-design";',
  'export type CreativeCategory = "photography" | "video-editing" | "motion-editing";'
);

content = content.replace(
  '  category: CreativeCategory;',
  '  category: CreativeCategory;\n  subcategory?: string;'
);

// Rename 'motion-design' to 'motion-editing'
content = content.replace(/category: "motion-design"/g, 'category: "motion-editing"');

// Set subcategory for existing GFX
content = content.replace(/category: "motion-editing",\n    image: "\/creative\/Motion Design\/GFX\//g, 'category: "motion-editing",\n    subcategory: "gfx",\n    image: "/creative/Motion Editing/GFX/');

// Set subcategory for videos based on ID
content = content.replace(/id: "video-ads-\d+",\n    title: "(.*?)",\n    category: "video-editing",/g, 'id: "$&",\n    title: "$1",\n    category: "video-editing",\n    subcategory: "ads",');
content = content.replace(/id: "video-recap-\d+",\n    title: "(.*?)",\n    category: "video-editing",/g, 'id: "$&",\n    title: "$1",\n    category: "video-editing",\n    subcategory: "recap",');
content = content.replace(/id: "video-amv-\d+",\n    title: "(.*?)",\n    category: "video-editing",/g, 'id: "$&",\n    title: "$1",\n    category: "video-editing",\n    subcategory: "amv",');

fs.writeFileSync('src/data/creative.ts', content);
console.log("updated creative.ts");
