const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Quick Answer Box
    const quickAnswerHTML = `
    <!-- Quick Answer Box -->
    <div class="bg-brand-pink/30 border-l-4 border-brand-rosegold p-6 rounded-r-2xl mb-10 shadow-sm">
        <h3 class="text-lg font-bold text-brand-dark mb-2 flex items-center gap-2">
            <i data-lucide="zap" class="w-5 h-5 text-brand-gold"></i> Quick Answer
        </h3>
        <p class="text-sm font-medium leading-relaxed max-w-3xl">
            This guide provides essential tips and strategies tailored to help you plan effectively. You'll learn how to avoid common mistakes, ensure every detail is perfect, and organize your approach. Always rely on professional vendors and stick to a reliable timeline for a stress-free experience.
        </p>
    </div>
    `;
    
    if (!content.includes('<!-- Quick Answer Box -->')) {
        // Find the <article> tag and insert after the first <p> or heading
        if (content.includes('<article')) {
             content = content.replace(/(<article[^>]*>[\s\S]*?<p[^>]*>[\s\S]*?<\/p>)/i, `$1\n${quickAnswerHTML}`);
        }
    }

    // 2. Author Box, Related Posts, Categories, Tags
    const footerWidgetsHTML = `
        <!-- Author Box -->
        <div class="bg-white border border-brand-pink/40 p-8 rounded-3xl shadow-sm mt-16 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            <img src="/author-ibrar.jpg" alt="Ibrar" onerror="this.src='https://ui-avatars.com/api/?name=SEO+With+Ibrar&background=B76E79&color=fff'" class="w-24 h-24 rounded-full object-cover shadow-md border-4 border-brand-pink">
            <div>
                <h4 class="font-heading text-xl font-bold text-brand-dark">SEO With Ibrar</h4>
                <p class="text-xs text-brand-rosegold font-bold uppercase tracking-wider mb-2">Senior Wedding Planner & SEO Strategist • 10+ Years Experience</p>
                <p class="text-sm text-brand-text/80 mb-4 leading-relaxed">Ibrar is a seasoned wedding planner helping couples craft their perfect day. With over a decade of experience in South Asian weddings, he shares expert insights on everything from timeline planning to bridal aesthetics.</p>
                <div class="flex gap-3 justify-center sm:justify-start">
                    <a href="#" class="text-brand-text/50 hover:text-brand-rosegold transition-colors"><i data-lucide="instagram" class="w-5 h-5"></i></a>
                    <a href="#" class="text-brand-text/50 hover:text-brand-rosegold transition-colors"><i data-lucide="twitter" class="w-5 h-5"></i></a>
                </div>
            </div>
        </div>

        <!-- Categories & Tags -->
        <div class="mt-8 pt-8 border-t border-brand-pink/20 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-brand-dark">Category:</span>
                <a href="/blog/category/wedding-guides" class="text-sm font-semibold text-brand-rosegold hover:underline">Wedding Guides</a>
            </div>
            <div class="flex gap-2 flex-wrap justify-center">
                <span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-brand-pink hover:text-brand-rosegold cursor-pointer transition-colors">#WeddingPlanning</span>
                <span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-brand-pink hover:text-brand-rosegold cursor-pointer transition-colors">#BridalGuide</span>
                <span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-brand-pink hover:text-brand-rosegold cursor-pointer transition-colors">#Checklist</span>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-12 bg-gradient-to-br from-brand-dark to-slate-900 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-brand-rosegold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <h3 class="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">Ready to Plan Your Dream Wedding?</h3>
            <p class="text-white/80 mb-8 max-w-2xl mx-auto relative z-10">Download our comprehensive, step-by-step wedding planning checklist to ensure you never miss a detail.</p>
            <a href="/guide" class="inline-block bg-gradient-to-r from-brand-rosegold to-brand-gold text-white font-bold py-4 px-8 rounded-full hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(183,110,121,0.3)] relative z-10">Download Free Checklist</a>
        </div>

        <!-- Related Posts -->
        <div class="mt-16">
            <h3 class="font-heading text-2xl font-bold text-brand-dark mb-6">Related Articles</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="/blog/20-tips-for-your-wedding-planning-checklist" class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand-pink/30">
                    <div class="h-40 bg-slate-200 overflow-hidden">
                        <img src="/20-tips-for-your-wedding-planning-checklist.webp" onerror="this.src='https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80'" alt="Wedding Planning" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="p-5">
                        <span class="text-[10px] font-bold text-brand-rosegold uppercase tracking-wider">Planning</span>
                        <h4 class="font-bold text-brand-dark mt-1 group-hover:text-brand-rosegold transition-colors">20 Essential Tips for Your Wedding Planning Checklist</h4>
                    </div>
                </a>
                <a href="/blog/how-to-plan-a-wedding-timeline" class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand-pink/30">
                    <div class="h-40 bg-slate-200 overflow-hidden">
                        <img src="/how-to-plan-a-wedding-timeline.webp" onerror="this.src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80'" alt="Wedding Timeline" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="p-5">
                        <span class="text-[10px] font-bold text-brand-rosegold uppercase tracking-wider">Timeline</span>
                        <h4 class="font-bold text-brand-dark mt-1 group-hover:text-brand-rosegold transition-colors">How to Plan a Flawless Wedding Timeline</h4>
                    </div>
                </a>
            </div>
        </div>
    `;

    if (!content.includes('<!-- Author Box -->')) {
        content = content.replace(/<\/article>/i, `${footerWidgetsHTML}\n        </article>`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated structure for ${filePath}`);
}

const files = fs.readdirSync(__dirname);
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'indian-wedding-hairstyles-guide.html') {
        processFile(file);
    }
});
