const https = require('https');
https.get('https://drive.google.com/drive/folders/1AZ_KBOcZh25dQojYul142MfG-U8_Kuif?usp=sharing', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // console.log(data.substring(0, 5000));
    
    // Using regex to find filenames in the massive JS blob
    const allStrings = data.match(/"([^"]+)"/g);
    if (allStrings) {
        const unique = [...new Set(allStrings)].filter(s => 
           s.includes('.jpg') || s.includes('.png') || s.includes('.mp4') ||
           s.toLowerCase().includes('photography') || s.toLowerCase().includes('design') || s.toLowerCase().includes('video') || s.toLowerCase().includes('graphic')
        );
        console.log("Potential matches:", unique.slice(0, 30));
    }
  });
});
