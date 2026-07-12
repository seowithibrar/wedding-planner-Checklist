const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir);

(async () => {
  for (const file of files) {
    if (file.endsWith('.jpeg') || file.endsWith('.jpg')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.jpe?g$/, '.webp'));
      
      console.log(`Converting ${file} to webp...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`Deleting ${file}...`);
      fs.unlinkSync(inputPath);
    }
  }
  console.log('Done converting images!');
})();
