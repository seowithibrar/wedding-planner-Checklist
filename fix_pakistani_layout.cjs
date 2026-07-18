const fs = require('fs');

const path = 'src/components/articles/PakistaniWeddingHairstylesArticle.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the sticky reading progress bar
content = content.replace(/<div id="reading-progress"[\s\S]*?><\/div>/, '');

// 2. Remove the fixed header navigation
content = content.replace(/<header className="fixed top-0[\s\S]*?<\/header>/, '');

// 3. Remove the footer
content = content.replace(/<footer className="bg-brand-dark[\s\S]*?<\/footer>/, '');

// 4. Change the root div class to match the SEO layout
content = content.replace(/<div className="bg-white min-h-screen">/, '<div className="max-w-7xl mx-auto px-6 py-12 bg-white">');

fs.writeFileSync(path, content);
console.log("Fixed PakistaniWeddingHairstylesArticle layout!");
