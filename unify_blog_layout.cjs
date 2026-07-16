const fs = require('fs');

const sidebarCTA = `
                <!-- Quick Tools Sidebar Box -->
                <div class="bg-gradient-to-br from-brand-dark to-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-2xl shadow-brand-dark/20 border border-white/10 text-left hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden mt-6">
                    <h5 class="font-heading font-bold text-lg text-brand-pink">Planning Tools</h5>
                    <p class="text-xs text-white/70 leading-relaxed">
                        Keep every wedding detail perfectly organized with our free checklist and budget tools.
                    </p>
                    <a href="planner.html" class="block text-center bg-gradient-to-r from-brand-rosegold to-brand-gold text-white text-xs font-bold py-3 rounded-full hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(183,110,121,0.4)] transition-all duration-300">Start Free Planning</a>
                </div>`;

const bottomSections = `
            <hr class="border-brand-pink/20 my-10" />

            <!-- Related Articles -->
            <section id="related-articles" class="space-y-6 scroll-mt-24 text-left">
                <h3 class="font-heading text-2xl font-bold text-brand-dark">Related Articles</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <a href="/20-tips-for-your-wedding-planning-checklist.html" class="block group">
                        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink/20 transition-all hover:shadow-md">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600" alt="Wedding planning tips" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="p-4">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-brand-rosegold bg-brand-pink px-2 py-1 rounded-full">Planning</span>
                                <h4 class="font-bold text-brand-dark text-sm mt-2 group-hover:text-brand-rosegold transition-colors">20 Tips for Your Wedding Planning Checklist</h4>
                                <p class="text-xs text-brand-text/70 mt-1">8 min read</p>
                            </div>
                        </div>
                    </a>
                    <a href="/how-to-plan-a-wedding-timeline.html" class="block group">
                        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink/20 transition-all hover:shadow-md">
                            <img src="public/How to Plan a Wedding Timeline.webp" alt="Wedding Timeline" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="p-4">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-brand-rosegold bg-brand-pink px-2 py-1 rounded-full">Timeline</span>
                                <h4 class="font-bold text-brand-dark text-sm mt-2 group-hover:text-brand-rosegold transition-colors">How to Plan a Wedding Timeline</h4>
                                <p class="text-xs text-brand-text/70 mt-1">7 min read</p>
                            </div>
                        </div>
                    </a>
                    <a href="/wedding-planning-checklists.html" class="block group">
                        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink/20 transition-all hover:shadow-md">
                            <img src="/images/blog/feature-post.jpg" alt="Wedding planning checklists" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="p-4">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-brand-rosegold bg-brand-pink px-2 py-1 rounded-full">Checklists</span>
                                <h4 class="font-bold text-brand-dark text-sm mt-2 group-hover:text-brand-rosegold transition-colors">Ultimate Guide to Wedding Checklists</h4>
                                <p class="text-xs text-brand-text/70 mt-1">15 min read</p>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <hr class="border-brand-pink/20 my-10" />

            <!-- Newsletter CTA -->
            <section class="bg-brand-pink/30 border border-brand-rosegold/30 rounded-3xl p-8 text-center my-10">
                <h3 class="font-heading text-2xl font-bold text-brand-dark mb-3">Don't Miss a Single Wedding Detail</h3>
                <p class="text-sm text-brand-text/80 max-w-xl mx-auto mb-6">Join our newsletter to receive weekly wedding tips, aesthetic ideas, and exclusive planning checklists directly in your inbox.</p>
                <form class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                    <input type="email" placeholder="Enter your email address" class="flex-1 bg-white border border-brand-pink rounded-full px-5 py-3 text-sm focus:outline-none focus:border-brand-rosegold shadow-sm" required>
                    <button type="submit" class="bg-brand-rosegold text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all hover:shadow-md">Subscribe</button>
                </form>
            </section>

            <!-- Author Box -->
            <section class="bg-white border border-brand-pink/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm mt-12 mb-10 text-left">
                <div class="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-brand-pink shadow-sm">
                    <img src="https://ui-avatars.com/api/?name=Wedding+Planning+Checklists&background=fcecf0&color=B76E79&size=200" alt="Wedding Planning Checklists Team" class="w-full h-full object-cover">
                </div>
                <div>
                    <h4 class="font-bold text-brand-dark text-lg mb-1">Wedding Planning Checklists Team</h4>
                    <p class="text-xs font-semibold text-brand-rosegold uppercase tracking-wider mb-3">Wedding Planning Experts</p>
                    <p class="text-sm text-brand-text/80 leading-relaxed">
                        The Wedding Planning Checklists Team is dedicated to helping couples plan the wedding of their dreams without the stress. We combine industry expertise, modern aesthetics, and practical advice to bring you the best in wedding planning resources.
                    </p>
                </div>
            </section>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Inject Sidebar CTA if missing
  if (!content.includes('Planning Tools</h5>')) {
      // Find the end of the TOC div inside the aside
      const tocEndRegex = /(<\/nav>\s*<\/div>)(?=\s*<\/div>\s*<\/aside>)/;
      content = content.replace(tocEndRegex, `$1\n${sidebarCTA}\n`);
  }

  // 2. Inject Bottom Sections if missing
  if (!content.includes('<!-- Author Box -->')) {
      // Find the closing article tag and inject right before it
      content = content.replace(/(<\/article>)/, `\n${bottomSections}\n        $1`);
  } else {
      // If it has Author box but is missing Newsletter or Related Articles, we can replace the existing bottom blocks to ensure they are identical.
      // Easiest way is to remove existing Related Articles, Newsletter, Author Box and re-inject.
      // We will look for <!-- Related Articles --> or <hr> before it, down to </article>.
      
      const parts = content.split(/<hr[^>]*>\s*<!-- Related Articles -->|<!-- Related Articles -->/);
      if (parts.length > 1) {
          // Rebuild content
          content = parts[0] + bottomSections + '\n        </article>' + content.split('</article>')[1];
      } else {
         const parts2 = content.split(/<!-- Newsletter CTA -->/);
         if(parts2.length > 1) {
             // Find last <hr> before Newsletter
             let preNews = parts2[0];
             let lastHr = preNews.lastIndexOf('<hr');
             if(lastHr !== -1) preNews = preNews.substring(0, lastHr);
             
             content = preNews + bottomSections + '\n        </article>' + content.split('</article>')[1];
         }
      }
  }

  fs.writeFileSync(file, content);
  console.log('Unified layout for', file);
}
