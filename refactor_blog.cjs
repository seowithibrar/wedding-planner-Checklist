const fs = require('fs');
const path = require('path');

const blogFile = 'src/components/Blog.tsx';
let blogContent = fs.readFileSync(blogFile, 'utf8');

const articlesToExtract = [
  { func: 'BudgetTipsArticle', file: 'BudgetTipsArticle.tsx', category: 'Budgeting', readTime: '5 Min Read', updated: 'June 2026', slug: 'wedding-budget-tips' },
  { func: 'WeddingVenueArticle', file: 'WeddingVenueArticle.tsx', category: 'Venues', readTime: '8 Min Read', updated: 'June 2026', slug: 'how-to-choose-wedding-venue' },
  { func: 'GuestListArticle', file: 'GuestListArticle.tsx', category: 'Planning', readTime: '6 Min Read', updated: 'June 2026', slug: 'perfect-guest-list-guide' },
  { func: 'MoodboardArticle', file: 'MoodboardArticle.tsx', category: 'Design', readTime: '5 Min Read', updated: 'June 2026', slug: 'moodboard-layout' },
  { func: 'WeddingChecklistTipsArticle', file: 'WeddingChecklistTipsArticle.tsx', category: 'Checklists', readTime: '10 Min Read', updated: 'June 2026', slug: 'wedding-planning-checklist-tips' },
  { func: 'WeddingHairstylesArticle', file: 'WeddingHairstylesArticle.tsx', category: 'Style Guide', readTime: '15 Min Read', updated: 'July 2026', slug: 'hairstyles-for-wedding' },
  { func: 'WeddingTimelineArticle', file: 'WeddingTimelineArticle.tsx', category: 'Planning', readTime: '12 Min Read', updated: 'July 2026', slug: 'how-to-plan-a-wedding-timeline' },
  { func: 'IndianWeddingHairstylesArticle', file: 'IndianWeddingHairstylesArticle.tsx', category: 'Style Guide', readTime: '10 Min Read', updated: 'July 2026', slug: 'indian-wedding-hairstyles-guide' }
];

articlesToExtract.forEach(art => {
  // Try to find the function block
  const startRegex = new RegExp(`export function ${art.func}\\(\\) \\{|function ${art.func}\\(\\) \\{`);
  const match = blogContent.match(startRegex);
  if (!match) {
    console.log(`Could not find ${art.func}`);
    return;
  }
  
  const startIndex = match.index;
  let endIndex = startIndex;
  let bracketCount = 0;
  let started = false;
  
  for (let i = startIndex; i < blogContent.length; i++) {
    if (blogContent[i] === '{') {
      bracketCount++;
      started = true;
    } else if (blogContent[i] === '}') {
      bracketCount--;
      if (started && bracketCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  
  const funcBody = blogContent.slice(startIndex, endIndex);
  
  // Extract Title (from h1)
  const titleMatch = funcBody.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].trim() : art.func;
  
  // Extract Hero Image
  const imgMatch = funcBody.match(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/);
  const heroImage = imgMatch ? imgMatch[1] : '';
  const heroImageAlt = imgMatch ? imgMatch[2] : '';
  
  // Extract Content (everything after the header and hero image block, inside the <article> tag if exists, else guess)
  let contentHtml = '';
  const articleMatch = funcBody.match(/<article[^>]*>([\s\S]*?)<\/article>/);
  if (articleMatch) {
    contentHtml = articleMatch[1];
  } else {
    // If no article tag, just take the grid
    const gridMatch = funcBody.match(/<div className="grid[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*\)\s*;\s*\}\s*$/);
    if (gridMatch) {
      contentHtml = gridMatch[1];
    }
  }

  // Generate the new file
  const newFileContent = `import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // Commonly used

export function ${art.func}() {
  return (
    <BlogArticleLayout
      slug="${art.slug}"
      title="${title}"
      category="${art.category}"
      readTime="${art.readTime}"
      updatedAt="${art.updated}"
      heroImage="${heroImage}"
      heroImageAlt="${heroImageAlt}"
      introduction={
        <p>
          Welcome to our comprehensive guide on ${title}. We've gathered the best tips and advice to help you plan the perfect wedding.
        </p>
      }
      keyTakeaways={[
        "Read through our comprehensive guide.",
        "Use our free planning tools and checklists.",
        "Bookmark this page for future reference."
      ]}
      tableOfContents={[
        { id: 'section-1', label: 'Main Section' }
      ]}
      faqs={[]}
      conclusion={
        <p>Thanks for reading our guide on ${title}. Happy planning!</p>
      }
    >
      ${contentHtml}
    </BlogArticleLayout>
  );
}
`;
  
  fs.writeFileSync(path.join('src', 'components', 'articles', art.file), newFileContent);
  console.log(`Generated ${art.file}`);
  
  // Remove from Blog.tsx
  blogContent = blogContent.replace(funcBody, '');
  // add import if not there
  if (!blogContent.includes(`import { ${art.func} }`)) {
    blogContent = blogContent.replace(
      `import { Footer } from './Footer';`,
      `import { Footer } from './Footer';\nimport { ${art.func} } from './articles/${art.func}';`
    );
  }
});

fs.writeFileSync(blogFile, blogContent);
console.log('Updated Blog.tsx');
