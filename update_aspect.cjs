const fs = require('fs');

let content = fs.readFileSync('src/data/creative.ts', 'utf8');

// Add aspect?: "auto" | "portrait" | "landscape" | "square"; to the interface
content = content.replace('link?: string;', 'link?: string;\n  aspect?: "auto" | "portrait" | "landscape" | "square";');

// For ADS (which are video-ads-), add aspect: "portrait"
content = content.replace(/id: "video-ads-\d+",\n    title: ".*",\n    category: "video-editing",\n    image: ".*",\n    link: ".*",\n    year: "\d{4}",/g, (match) => {
  return match + '\n    aspect: "portrait",';
});

// For AMVs (video-amv-), add aspect: "landscape"
content = content.replace(/id: "video-amv-\d+",\n    title: ".*",\n    category: "video-editing",\n    image: ".*",\n    link: ".*",\n    year: "\d{4}",/g, (match) => {
  return match + '\n    aspect: "landscape",';
});

// For RECAPS (video-recap-), add aspect: "landscape"
content = content.replace(/id: "video-recap-\d+",\n    title: ".*",\n    category: "video-editing",\n    image: ".*",\n    link: ".*",\n    year: "\d{4}",/g, (match) => {
  return match + '\n    aspect: "landscape",';
});

fs.writeFileSync('src/data/creative.ts', content);
console.log("Updated creative.ts");
