const fs = require('fs');

const template = fs.readFileSync('hairstyles-for-wedding.html', 'utf8');

const title = "Pakistani Wedding Hairstyles Guide: 45+ Styles for Bride, Mehndi, Baraat & Walima";
const description = "Your complete guide to Pakistani wedding hairstyles. 45+ authentic styles for mehndi, baraat, and walima, organized by face shape and outfit.";
const heroImage = "/pakistani-wedding-hairstyles.webp";

// Extract sections
const headRegex = /(<title>).*?(<\/title>)/;
const metaDescRegex = /(<meta name="description" content=").*?(")/;
const h1Regex = /(<h1[^>]*>)\s*50\+ Hairstyles for Wedding\s*(<\/h1>)/;
const heroImgRegex = /(<img src=")\/50-hairstyles-for-wedding\.webp(" alt=")[^"]+(" class="w-full h-auto rounded-3xl shadow-2xl object-cover" fetchpriority="high">)/;

// Update Metadata
let html = template
  .replace(headRegex, `$1${title} – Wedding Planning Checklists$2`)
  .replace(metaDescRegex, `$1${description}$2`)
  .replace(h1Regex, `$1\n            Pakistani Wedding Hairstyles Guide\n        $2`)
  .replace(heroImgRegex, `$1${heroImage}$2Pakistani Wedding Hairstyles$3`);

// Update the breadcrumb
html = html.replace(
  /<span class="text-brand-text\/80 font-medium">Hairstyles for Wedding<\/span>/,
  '<span class="text-brand-text/80 font-medium">Pakistani Wedding Hairstyles</span>'
);

// Update excerpt below H1
const excerptRegex = /(<p class="text-base text-brand-text\/80 leading-relaxed max-w-3xl mx-auto mb-6">\s*)[\s\S]*?(\s*<\/p>)/;
html = html.replace(excerptRegex, `$1Your wedding hairstyle is your crown. It frames your face for hundreds of photographs, stays in place through hours of dancing, and showcases the jewelry and traditions that make your look distinctly yours.$2`);

// Replace TOC
const tocRegex = /(<nav class="space-y-2.5 text-xs font-semibold text-brand-text\/70" id="toc-nav">\s*)[\s\S]*?(\s*<\/nav>)/;
const newToc = `$1
                        <a href="#quick-style-finder" id="toc-link-1" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Quick Style Finder</a>
                        <a href="#mehndi-hairstyles" id="toc-link-2" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Mehndi Hairstyles</a>
                        <a href="#baraat-hairstyles" id="toc-link-3" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Baraat Hairstyles</a>
                        <a href="#wedding-day-hairstyles" id="toc-link-4" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Wedding Day Hairstyles</a>
                        <a href="#walima-hairstyles" id="toc-link-5" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Walima Hairstyles</a>
                        <a href="#hairstyles-by-face-shape" id="toc-link-6" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">By Face Shape</a>
                        <a href="#regional-hairstyles" id="toc-link-7" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Regional Styles</a>
                        <a href="#hairstyles-by-outfit" id="toc-link-8" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">By Outfit Type</a>
                        <a href="#hair-care-before-wedding" id="toc-link-9" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Pre-Wedding Hair Care</a>
                        <a href="#common-mistakes" id="toc-link-10" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Common Mistakes</a>
                        <a href="#faq" id="toc-link-11" class="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">FAQs</a>$2`;
html = html.replace(tocRegex, newToc);

fs.writeFileSync('pakistani-wedding-hairstyles.html', html);
console.log('Template created!');
