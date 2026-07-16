const fs = require('fs');

const progressBarHTML = `
    <!-- Reading Progress Bar -->
    <div id="reading-progress" class="fixed top-20 left-0 h-1 bg-gradient-to-r from-brand-rosegold to-brand-gold z-[60] transition-all duration-150 shadow-sm" style="width: 0%"></div>
`;

const globalStyles = `
    <style>
        html { scroll-behavior: smooth; }
        .toc-active {
            color: #B76E79 !important; /* brand-rosegold */
            border-left-color: #B76E79 !important;
            font-weight: 700 !important;
        }
    </style>
</head>`;

const scriptHTML = `
    <!-- UI & UX Scripts -->
    <script>
        // Reading Progress Bar
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const progressBar = document.getElementById('reading-progress');
            if (progressBar) progressBar.style.width = scrolled + '%';
        });

        // Scroll Spy for Table of Contents
        document.addEventListener('DOMContentLoaded', () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        const links = document.querySelectorAll('#toc-nav a');
                        links.forEach(link => {
                            link.classList.remove('toc-active');
                            if (link.getAttribute('href') === '#' + id) {
                                link.classList.add('toc-active');
                            }
                        });
                    }
                });
            }, { rootMargin: '-120px 0px -60% 0px' });

            // Ensure H2s and H3s inside the article have IDs if they don't already
            const headings = document.querySelectorAll('article h2, article h3, section[id]');
            headings.forEach((heading, index) => {
                if (!heading.id && heading.tagName.match(/^H[23]$/)) {
                    heading.id = heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                }
                if (heading.id) {
                    observer.observe(heading);
                }
            });
        });
    </script>
</body>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Inject smooth scroll styles before </head>
  if (!content.includes('scroll-behavior: smooth')) {
      content = content.replace('</head>', globalStyles);
  }

  // 2. Inject Progress Bar just after <body ...>
  if (!content.includes('id="reading-progress"')) {
      content = content.replace(/(<body[^>]*>)/, `$1\n${progressBarHTML}`);
  }

  // 3. Inject JS Script before </body>
  if (!content.includes('UI & UX Scripts')) {
      content = content.replace('</body>', scriptHTML);
  }

  // 4. Upgrade Hero Section with soft gradient
  content = content.replace(/<section class="pt-32 pb-12 lg:pt-40 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">/g, 
      '<section class="pt-32 pb-12 lg:pt-40 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center bg-gradient-to-b from-brand-pink/20 to-transparent rounded-b-[4rem]">');

  // 5. Upgrade Featured Image (hover effects)
  // Searching for: w-full h-auto rounded-3xl shadow-2xl object-cover
  content = content.replace(/class="w-full h-auto rounded-3xl shadow-2xl object-cover"/g,
      'class="w-full h-auto rounded-3xl shadow-2xl object-cover hover:shadow-[0_20px_50px_rgba(183,110,121,0.3)] hover:-translate-y-2 transition-all duration-500"');

  // 6. Upgrade Sidebar CTA
  // Searching for: class="bg-brand-dark text-white p-6 rounded-3xl space-y-4 shadow-md text-left"
  content = content.replace(/class="bg-brand-dark text-white p-6 rounded-3xl space-y-4 shadow-md text-left"/g,
      'class="bg-gradient-to-br from-brand-dark to-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-2xl shadow-brand-dark/20 border border-white/10 text-left hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden"');
  
  // Add a shine effect element inside the sidebar CTA (optional, but looks premium)
  // This is a bit tricky with regex, we'll skip the shine element and just upgrade the button
  content = content.replace(/class="block text-center bg-brand-rosegold text-white text-xs font-bold py-2.5 rounded-full hover:bg-opacity-90 transition-all hover:shadow-lg"/g,
      'class="block text-center bg-gradient-to-r from-brand-rosegold to-brand-gold text-white text-xs font-bold py-3 rounded-full hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(183,110,121,0.4)] transition-all duration-300"');

  // 7. Add hover effects to "Quick Tip" boxes in the intro (if any exist)
  content = content.replace(/class="bg-white border border-brand-pink\/30 rounded-2xl p-5 flex gap-4 shadow-sm items-start"/g,
      'class="bg-white border border-brand-pink/30 rounded-2xl p-5 flex gap-4 shadow-sm items-start hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-pink/40 transition-all duration-300 group"');

  fs.writeFileSync(file, content);
  console.log('Upgraded UI/UX on', file);
}
