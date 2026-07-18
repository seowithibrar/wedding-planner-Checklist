const fs = require('fs');
const path = require('path');

const file = 'src/components/articles/PakistaniWeddingHairstylesArticle.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file is currently raw HTML embedded in a component. 
// It has <article> ... </article>
const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/);
const contentHtml = articleMatch ? articleMatch[1] : '';

const newContent = `import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';

export function PakistaniWeddingHairstylesArticle() {
  return (
    <BlogArticleLayout
      slug="pakistani-wedding-hairstyles"
      title="Pakistani Wedding Hairstyles Guide"
      category="Style Guide"
      readTime="9 Min Read"
      updatedAt="July 2026"
      heroImage="/pakistani-wedding-hairstyles.webp"
      heroImageAlt="Pakistani Wedding Hairstyles"
      introduction={
        <p>
          Your wedding hairstyle is your crown. It frames your face for hundreds of photographs, stays in place through hours of dancing, and showcases the jewelry and traditions that make your look distinctly yours.
        </p>
      }
      keyTakeaways={[
        "50+ Styles Covered",
        "All Hair Types",
        "Indian & Pakistani Weddings",
        "2026 Trends"
      ]}
      tableOfContents={[
        { id: 'quick-style-finder', label: 'Quick Style Finder' },
        { id: 'mehndi-hairstyles', label: 'Mehndi Hairstyles' },
        { id: 'baraat-hairstyles', label: 'Baraat Hairstyles' },
        { id: 'wedding-day-hairstyles', label: 'Wedding Day Hairstyles' },
        { id: 'walima-hairstyles', label: 'Walima Hairstyles' }
      ]}
      faqs={[]}
      conclusion={
        <p>
          Finding the perfect Pakistani wedding hairstyle involves balancing tradition with personal style. Whether you opt for a dramatic Baraat updo or relaxed Mehndi waves, choose a look that makes you feel confident and comfortable throughout your celebrations.
        </p>
      }
    >
      ${contentHtml}
    </BlogArticleLayout>
  );
}
`;

fs.writeFileSync(file, newContent);
console.log('Refactored PakistaniWeddingHairstylesArticle');
