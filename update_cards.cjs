const fs = require('fs');

const files = [
  'how-to-plan-a-wedding-timeline.html',
  '20-tips-for-your-wedding-planning-checklist.html',
  'wedding-planning-checklists.html'
];

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  
  // The regex matches the Unsplash img tag specifically for the 50+ Hairstyles article card
  // The alt might be different, but it's usually "Bridal hairstyle"
  // Let's just match any Unsplash image that precedes the "50+ Hairstyles for Wedding" h4
  
  const regex = /<img src="https:\/\/images\.unsplash\.com\/[^"]+"([^>]*)>(\s*<div class="p-4">\s*<span[^>]*>[^<]*<\/span>\s*<h4[^>]*>50\+ Hairstyles for Wedding<\/h4>)/g;
  
  const original = html;
  html = html.replace(regex, '<img src="/50-hairstyles-for-wedding.webp"$1>$2');
  
  if (original !== html) {
    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
  }
});
