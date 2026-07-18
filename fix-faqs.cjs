const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('question:') || content.includes('answer:')) {
    content = content.replace(/question:/g, 'q:').replace(/answer:/g, 'a:');
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${file}`);
  }
}
