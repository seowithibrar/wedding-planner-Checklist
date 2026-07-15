const fs = require('fs');
let code = fs.readFileSync('src/components/Blog.tsx', 'utf8');

if (!code.includes("'indian-wedding-hairstyles-guide': 'indian-wedding-hairstyles-guide'")) {
  code = code.replace(
    "'how-to-plan-a-wedding-timeline': 'how-to-plan-a-wedding-timeline'",
    "'how-to-plan-a-wedding-timeline': 'how-to-plan-a-wedding-timeline',\n    'indian-wedding-hairstyles-guide': 'indian-wedding-hairstyles-guide'"
  );
}

if (!code.includes("else if (postId === 'indian-wedding-hairstyles-guide')")) {
  code = code.replace(
    "else if (postId === 'how-to-plan-a-wedding-timeline') dest = '/blog/how-to-plan-a-wedding-timeline';",
    "else if (postId === 'how-to-plan-a-wedding-timeline') dest = '/blog/how-to-plan-a-wedding-timeline';\n    else if (postId === 'indian-wedding-hairstyles-guide') dest = '/blog/indian-wedding-hairstyles-guide';"
  );
}

const componentCode = fs.readFileSync('component.txt', 'utf8');
const startIndex = code.indexOf('export function IndianWeddingHairstylesArticle() {');
if (startIndex !== -1) {
    code = code.substring(0, startIndex);
}
code += componentCode;
fs.writeFileSync('src/components/Blog.tsx', code);