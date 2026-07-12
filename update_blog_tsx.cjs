const fs = require('fs');

let content = fs.readFileSync('src/components/Blog.tsx', 'utf8');

const insertionPoint = content.indexOf('const articles: BlogPost[] = [') + 'const articles: BlogPost[] = ['.length;

const newArticle = `
  {
    id: 'pakistani-wedding-hairstyles',
    title: 'Pakistani Wedding Hairstyles Guide: 45+ Styles',
    category: 'Style Guide',
    date: 'July 2026',
    readTime: '10 Min Read',
    author: 'Wedding Planning Checklists',
    excerpt: 'Your complete guide to Pakistani wedding hairstyles. 45+ authentic styles for mehndi, baraat, and walima, organized by face shape and outfit.',
    image: '/pakistani-wedding-hairstyles.webp',
    layout: 'standard'
  },`;

content = content.substring(0, insertionPoint) + newArticle + content.substring(insertionPoint);

fs.writeFileSync('src/components/Blog.tsx', content);
console.log('Added to Blog.tsx');
