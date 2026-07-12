const fs = require('fs');
const marked = require('marked');

// Run the generate_template first if not already done
require('./generate_template.cjs');

const md = fs.readFileSync('content.md', 'utf8');

// The markdown parser will output standard HTML. 
// We want to add classes to certain tags to match the Tailwind prose.
// However, 'prose prose-lg' on the <article> tag handles most of this automatically in Tailwind.
// We just need to parse the markdown and replace the inner content of <article>.

let htmlContent = marked.parse(md);

// Customizing specific tags if needed (e.g. h2 styles)
htmlContent = htmlContent.replace(/<h2/g, '<h2 class="font-heading text-2xl sm:text-3xl font-bold text-brand-dark"');

let templateHtml = fs.readFileSync('pakistani-wedding-hairstyles.html', 'utf8');

// Replace everything inside the <article> tag.
const articleRegex = /(<article class="col-span-1 lg:col-span-9 prose prose-lg max-w-none text-brand-text\/90">)[\s\S]*?(<\/article>)/;

// Wait, the template has <section class="space-y-6 text-left"> inside <article>. We should wrap our HTML in it.
const finalContent = `$1\n<section class="space-y-6 text-left">\n${htmlContent}\n</section>\n$2`;

templateHtml = templateHtml.replace(articleRegex, finalContent);

fs.writeFileSync('pakistani-wedding-hairstyles.html', templateHtml);
console.log('Successfully injected markdown content into the template!');
