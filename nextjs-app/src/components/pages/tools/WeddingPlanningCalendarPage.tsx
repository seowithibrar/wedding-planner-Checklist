import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PlanningCalendar } from '@/components/tools/PlanningCalendar';
import { AccordionFaqList } from '@/components/ui/AccordionFaqList';
import { generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

export const seo = {
  title: "Wedding Planning Calendar (2026)",
  description: "Monthly planning calendar for scheduling vendor meetings, fittings, tastings, and wedding events with auto-sync date countdown.",
  canonical: "https://www.weddingplanningchecklists.org/tools/wedding-planning-calendar",
  image: ""
};

const breadcrumbItems = [
  { name: 'Home', item: 'https://www.weddingplanningchecklists.org' },
  { name: 'Tools', item: `${'https://www.weddingplanningchecklists.org'}/tools/budget-calculator` },
  { name: 'Planning Calendar', item: seo.canonical }
];

export const faqs = [];

const combinedSchema = `[${[
  generateWebApplicationSchema({ name: 'Wedding Planning Calendar', description: seo.description, url: seo.canonical }),
  generateBreadcrumbSchema(breadcrumbItems)
].filter(Boolean).join(',')}]`;;

export default function WeddingPlanningCalendarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {typeof combinedSchema !== 'undefined' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof combinedSchema === 'string' ? combinedSchema : JSON.stringify(combinedSchema)
          }}
        />
      )}
      <Header lang="en" />
      <div className="flex-grow">
        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
      <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Free Planning Tool</span>
      <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A]">Wedding Planning Calendar</h1>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        Schedule vendor meetings, dress fittings, and key events on a full interactive calendar.
      </p>
    </div>
    {/* SEO Intro Copy */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center text-slate-600 text-sm leading-relaxed">
      This interactive Wedding Planning Calendar helps you stay completely organized and on top of your wedding planning process. Simply enter your details below, and the tool will automatically adjust to fit your specific wedding needs. Save time, reduce stress, and ensure no detail is overlooked with this free resource.
    </div>
    <PlanningCalendar lang="en" />
  </main>
      </div>
      <Footer lang="en" />
    </div>
  );
}
