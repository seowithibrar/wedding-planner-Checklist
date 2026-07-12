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

const footerHTML = `
    <!-- Footer -->
    <footer class="bg-slate-50 pt-20 pb-10 border-t border-slate-100 font-sans">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div class="space-y-6 lg:col-span-1">
            <div class="flex items-center cursor-pointer">
              <a href="/"><img src="/logo.png" alt="Wedding Planning Checklists" class="h-10 w-auto object-contain" /></a>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed">
              Your ultimate companion for stress-free wedding planning. We provide couples with the tools, timelines, and templates they need to organize their dream wedding flawlessly.
            </p>
          </div>

          <div>
            <h3 class="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Platform</h3>
            <ul class="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/" class="hover:text-rose-500 transition-colors">Home</a></li>
              <li><a href="/guide" class="hover:text-rose-500 transition-colors">Checklists & Tools</a></li>
              <li><a href="/about-us" class="hover:text-rose-500 transition-colors">About Us</a></li>
              <li><a href="/blog" class="hover:text-rose-500 transition-colors">Wedding Blog</a></li>
              <li><a href="/how-to-plan-a-wedding-timeline.html" class="hover:text-rose-500 transition-colors">Wedding Timeline</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Support & Legal</h3>
            <ul class="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/contact" class="hover:text-rose-500 transition-colors">Contact Us</a></li>
              <li><a href="/privacy-policy" class="hover:text-rose-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" class="hover:text-rose-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Get In Touch</h3>
            <ul class="space-y-4 text-sm font-medium text-slate-500">
              <li class="flex items-start gap-3">
                <i data-lucide="mail" class="w-4 h-4 text-rose-500 mt-0.5"></i>
                <span>support@weddingplanningchecklists.org</span>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="map-pin" class="w-4 h-4 text-rose-500 mt-0.5"></i>
                <span>Available worldwide for your planning needs.</span>
              </li>
              <li class="flex items-start gap-3">
                <i data-lucide="sparkles" class="w-4 h-4 text-rose-500 mt-0.5"></i>
                <span>Always free, always organized.</span>
              </li>
            </ul>
          </div>

        </div>

        <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-400">
          <p>© 2026 Wedding Planning Checklists. All rights reserved.</p>
          <p class="flex items-center gap-1">
            Made with <i data-lucide="heart" class="w-3.5 h-3.5 text-rose-500 mx-1 fill-current"></i> for couples everywhere.
          </p>
        </div>
      </div>
    </footer>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace Nav
  // The nav might be `<nav...` down to `</nav>`
  content = content.replace(/<!-- Navigation -->[\s\S]*?<\/nav>/g, headerHTML);
  // Also handle if there is an <header> instead of <nav> in the old ones:
  content = content.replace(/<!-- Navigation -->[\s\S]*?<\/header>/g, headerHTML);

  // Replace Footer
  content = content.replace(/<!-- (8\. )?Footer -->[\s\S]*?<\/footer>/g, footerHTML);

  fs.writeFileSync(file, content);
  console.log('Updated', file);
}
