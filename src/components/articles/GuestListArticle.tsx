import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // Commonly used

export function GuestListArticle() {
  return (
    <BlogArticleLayout
      slug="perfect-guest-list-guide"
      title="Mastering Your Guest List & Seating Charts"
      category="Planning"
      readTime="6 Min Read"
      updatedAt="June 2026"
      heroImage="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800"
      heroImageAlt="Curated table arrangements and seating checklist"
      introduction={
        <p>
          Welcome to our comprehensive guide on Mastering Your Guest List & Seating Charts. We've gathered the best tips and advice to help you plan the perfect wedding.
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
        <p>Thanks for reading our guide on Mastering Your Guest List & Seating Charts. Happy planning!</p>
      }
    >
      
    </BlogArticleLayout>
  );
}
