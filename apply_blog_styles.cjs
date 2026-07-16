const fs = require('fs');

const headerHTML = `
    <!-- Navigation -->
    <header class="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center cursor-pointer">
          <a href="/"><img src="/logo.png" alt="Wedding Planning Checklists" class="h-12 w-auto object-contain" /></a>
        </div>

        <nav class="hidden lg:flex items-center gap-10">
          <a href="/" class="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Home</a>
          <a href="/about-us" class="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">About Us</a>
          <a href="/guide" class="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Wedding Planning Checklists</a>
          <a href="/blog" class="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Blog</a>
          <a href="/contact" class="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Contact Us</a>
        </nav>

        <div class="flex items-center gap-4">
          <a href="/" class="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-rose-500 transition-all shadow-lg shadow-slate-100">
            Get Started
          </a>
          <button class="lg:hidden p-2 text-slate-600" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
             <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden lg:hidden bg-white border-b border-slate-100 overflow-hidden">
        <div class="p-6 flex flex-col gap-6">
          <a href="/" class="block text-left text-sm font-bold text-slate-500">Home</a>
          <a href="/about-us" class="block text-left text-sm font-bold text-slate-500">About Us</a>
          <a href="/guide" class="block text-left text-sm font-bold text-slate-500">Wedding Planning Checklists</a>
          <a href="/blog" class="block text-left text-sm font-bold text-slate-500">Blog</a>
          <a href="/contact" class="block text-left text-sm font-bold text-slate-500">Contact Us</a>
          
          <a href="/" class="w-full text-center bg-slate-900 text-white py-3.5 rounded-xl text-sm font-black mt-2">
            Get Started
          </a>
        </div>
      </div>
    </header>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Clean up duplicated header blocks
  // Find everything between "<!-- Navigation -->" and "<!-- Blog Header / Hero -->" 
  // or "<section class=\"pt-32" (if comments are missing)
  const navStart = content.indexOf('<!-- Navigation -->');
  let navEnd = content.indexOf('<!-- Blog Header / Hero -->');
  if (navEnd === -1) {
    navEnd = content.indexOf('<section class="pt-32');
  }
  if (navEnd === -1) {
    // some files might just have <section class="space-y-6 text-left">
    navEnd = content.indexOf('<section class="space-y-6');
  }

  if (navStart !== -1 && navEnd !== -1) {
    content = content.substring(0, navStart) + headerHTML + "\n\n    " + content.substring(navEnd);
  } else if (navStart !== -1) {
      // fallback regex for multiple </header> tags
      content = content.replace(/<!-- Navigation -->[\s\S]*?(<\/header>\s*)+(?=<section|<div|<main)/g, headerHTML + "\n\n");
  }

  // Ensure article has the correct prose classes from the styles
  content = content.replace(/<article class="[^"]*"/g, '<article class="col-span-1 lg:col-span-9 prose prose-lg max-w-none text-brand-text/90"');

  // Also replace any old `<article class="` with the new one
  if (!content.includes('col-span-1 lg:col-span-9 prose prose-lg')) {
    content = content.replace(/<article\s*>/g, '<article class="col-span-1 lg:col-span-9 prose prose-lg max-w-none text-brand-text/90">');
  }

  fs.writeFileSync(file, content);
  console.log('Cleaned up styles and navigation in', file);
}
