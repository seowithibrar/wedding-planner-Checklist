import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { QuickAnswerBox } from '../blog/QuickAnswerBox';
import { ExpertTip, CommonMistake, ProTip, ChecklistItem } from '../blog/CalloutBoxes';
import { ArticleCTA } from '../blog/ArticleCTA';

export function MoodboardArticle() {
  return (
    <BlogArticleLayout
      slug="moodboard-layout"
      title="How to Create a Wedding Moodboard: Chic & Modern Design"
      category="Design"
      readTime="5 Min Read"
      updatedAt="July 2026"
      heroImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200"
      heroImageAlt="Chic modern wedding venue decor"
      introduction={
        <p>
          Before you book a florist, pick a dress, or design your invitations, you need a cohesive vision. A wedding moodboard is the foundation of your entire event's aesthetic. It communicates your style to your vendors faster and more accurately than words ever could.
          <br /><br />
          This guide teaches you how to curate a chic, modern wedding moodboard that looks professional. You'll learn how to source inspiration beyond Pinterest, establish a unique color palette, and translate digital concepts into physical decor without losing the essence of your design.
        </p>
      }
      keyTakeaways={[
        "Define 3 core aesthetic words",
        "Source beyond Pinterest",
        "Create a strict color palette",
        "Share with all vendors"
      ]}
      tableOfContents={[
        { id: 'core-words', label: '1. Defining Your Core Words' },
        { id: 'sourcing', label: '2. Sourcing Inspiration' },
        { id: 'color-palette', label: '3. Establishing a Color Palette' },
        { id: 'texture', label: '4. The Importance of Texture' },
        { id: 'faq', label: 'Frequently Asked Questions' }
      ]}
      faqs={[
        {
          q: "What should be included in a wedding moodboard?",
          a: "A complete moodboard should include color swatches, floral inspiration, typography (for invitations), venue architecture styles, and examples of fashion and lighting."
        },
        {
          q: "Is Pinterest good for wedding planning?",
          a: "Pinterest is a great starting point, but it can lead to 'trend overload.' Use it to gather initial ideas, but curate a strict, smaller moodboard using Canva or Milanote for your vendors."
        },
        {
          q: "How many colors should be in a wedding palette?",
          a: "A professional color palette consists of 3 to 5 colors: one dominant color, two secondary colors, and one or two metallic or neutral accent colors."
        },
        {
          q: "Do I need a moodboard if I have a wedding planner?",
          a: "Yes! A moodboard helps your planner understand your brain. It ensures they pitch venues and vendors that actually align with your personal style."
        },
        {
          q: "When should I finalize my moodboard?",
          a: "Finalize your moodboard immediately after booking your venue, but before booking your florist, rental company, or stationer."
        },
        {
          q: "How do I communicate my moodboard to vendors?",
          a: "Export your final moodboard as a PDF and attach it to every single vendor inquiry email. This ensures everyone is on the exact same page from day one."
        }
      ]}
      conclusion={
        <p>
          Creating a wedding moodboard is not just a fun design exercise; it is a critical communication tool that ensures all your vendors are working towards the same aesthetic goal. Keep it curated, focused, and true to your personal style as a couple.
        </p>
      }
    >
      
      <section className="space-y-6 text-left">
        <QuickAnswerBox title="How do you make a wedding moodboard?">
          To make a professional wedding moodboard, start by defining <strong>three core aesthetic words</strong> (e.g., "Moody, Romantic, Industrial"). Gather 15-20 highly curated images that represent florals, fashion, textures, and architecture. Next, extract a strict <strong>3-5 color palette</strong> from those images. Finally, arrange these elements digitally in a tool like Canva or Milanote, and export it as a PDF to share with all your vendors.
        </QuickAnswerBox>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="core-words">
          <span className="text-brand-pink mr-2">01.</span> Defining Your Core Words
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A successful moodboard is highly focused. Before saving a single image, sit down with your partner and agree on three core words that describe how you want your wedding to <em>feel</em>. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Words like "Modern, Minimalist, Elegant" will result in a completely different design than "Whimsical, Vintage, Maximalist." Every image you add to your board must pass the test of aligning with these three core words.
        </p>

        <ExpertTip title="Focus on Feelings, Not Just Looks">
          When defining your core words, include at least one word that describes an emotion or atmosphere. "Joyful," "Intimate," or "High-Energy" will guide lighting and layout decisions just as much as colors will.
        </ExpertTip>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="sourcing">
          <span className="text-brand-pink mr-2">02.</span> Sourcing Inspiration Beyond Pinterest
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Pinterest is fantastic, but it is an echo chamber of the same ten trending weddings. To create a truly unique chic and modern aesthetic, you must source inspiration from outside the wedding industry.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Look at interior design magazines, high-fashion runway shows, boutique hotel lobbies, and even cinematic color grading in your favorite films. Pulling from architecture and fashion ensures your design looks timeless rather than trendy.
        </p>

        <CommonMistake title="Pinning Without Purpose">
          Do not dump 500 images onto a board and hand it to a florist. A moodboard with too many conflicting ideas is useless. Curate ruthlessly. Limit your final presentation board to exactly 15-20 highly specific images.
        </CommonMistake>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="color-palette">
          <span className="text-brand-pink mr-2">03.</span> Establishing a Color Palette
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Your color palette is the glue that holds your moodboard together. A modern color palette should be intentional. Avoid picking two random favorite colors (like purple and green) without considering their undertones.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Instead, establish one dominant base color, two complementary secondary colors, and one metallic or neutral accent (like champagne gold or matte charcoal). Use a tool like Adobe Color to extract a balanced palette directly from your favorite inspiration image.
        </p>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="texture">
          <span className="text-brand-pink mr-2">04.</span> The Importance of Texture
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A truly modern and chic aesthetic relies heavily on texture, not just color. Include images that showcase physical materials on your moodboard. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Will your tables feature rough-spun raw silk runners or crisp, pressed satin? Will your invitations be printed on handmade cotton rag paper or sleek, modern acrylic? Texture gives a design depth and makes a space feel expensive.
        </p>

        <div className="space-y-4 my-6">
          <ChecklistItem>
            <strong>Include an architectural element:</strong> Show the physical structure of your venue or the type of arch you want.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Include a fashion element:</strong> Add an image of a fabric drape, a tuxedo cut, or a dress silhouette.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Include typography:</strong> Pick a font style (e.g., modern serif, romantic calligraphy) to guide your stationer.
          </ChecklistItem>
        </div>

        <ArticleCTA 
          type="guide"
          title="Start Designing Today"
          description="Access our free Canva Moodboard Templates designed specifically for modern weddings."
          buttonText="Get Free Templates"
          link="/blog/The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding"
        />

      </section>
    </BlogArticleLayout>
  );
}
