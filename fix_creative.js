import * as fs from 'fs';

let content = fs.readFileSync('src/data/creative.ts', 'utf8');

// For GFX:
content = content.replace(/image: "\/creative\/Motion Design\/GFX\//g, 'subcategory: "gfx",\n    image: "/creative/Motion Design/GFX/');

// For Video Editing (Ads, Recap, AMV):
// We know they start with id: "video-ads-" etc.
content = content.replace(/id: "video-ads-/g, 'subcategory: "ads",\n    id: "video-ads-');
content = content.replace(/id: "video-recap-/g, 'subcategory: "recap",\n    id: "video-recap-');
content = content.replace(/id: "video-amv-/g, 'subcategory: "amv",\n    id: "video-amv-');

fs.writeFileSync('src/data/creative.ts', content);
console.log("fixed creative.ts");
