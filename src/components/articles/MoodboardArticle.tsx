import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // Commonly used

export function MoodboardArticle() {
  return (
    <BlogArticleLayout
      slug="moodboard-layout"
      title="Chic & Modern Aesthetic: Visual Moodboard Layout"
      category="Design"
      readTime="5 Min Read"
      updatedAt="June 2026"
      heroImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400"
      heroImageAlt="Venue decor"
      introduction={
        <p>
          Welcome to our comprehensive guide on Chic & Modern Aesthetic: Visual Moodboard Layout. We've gathered the best tips and advice to help you plan the perfect wedding.
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
        <p>Thanks for reading our guide on Chic & Modern Aesthetic: Visual Moodboard Layout. Happy planning!</p>
      }
    >
      
    </BlogArticleLayout>
  );
}
