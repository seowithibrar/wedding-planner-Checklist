import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { TimelineGenerator } from '@/components/tools/TimelineGenerator';
import { AccordionFaqList } from '@/components/ui/AccordionFaqList';
import { generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

export const seo = {
  title: "Wedding Day Timeline Generator - Free & Editable",
  description: "Build a minute-by-minute wedding day timeline in minutes. Enter your ceremony time, edit any block, and share it with vendors free.",
  canonical: "https://www.weddingplanningchecklists.org/tools/timeline-generator",
  image: ""
};

const breadcrumbItems = [
  { name: 'Home', item: 'https://www.weddingplanningchecklists.org' },
  { name: 'Planning Tools', item: `${'https://www.weddingplanningchecklists.org'}/tools/budget-calculator` },
  { name: 'Timeline Generator', item: seo.canonical }
];

export const faqs = [
  {
    q: "How do I create a wedding day timeline?",
    a: "Start from your ceremony start time and work in both directions: backward through hair and makeup, portraits, and travel, and forward through cocktail hour, dinner, and the send-off. A generator does this math for you; building it by hand means estimating each block yourself and padding every transition by 10-15 minutes."
  },
  {
    q: "How far in advance should I send my timeline to vendors?",
    a: "Share a draft four to six weeks out so your photographer and planner can flag anything unrealistic, then send the finalized version two to four weeks before the wedding. Avoid sending multiple revisions in the final week — a vendor working from an outdated copy is a bigger risk than a small imperfection in the schedule."
  },
  {
    q: "How much buffer time should I add between events?",
    a: "Plan for 10-15 minutes between major blocks, plus a full 30-minute cushion before the ceremony. Every wedding runs a few minutes long somewhere; buffer time is what keeps a late hair appointment from pushing back the ceremony itself."
  },
  {
    q: "Do I still need a timeline if I have a wedding planner?",
    a: "Yes, in a lighter form. Your planner will build the detailed, vendor-facing version, but you and your wedding party still benefit from a simplified personal copy so everyone knows where to be without asking the planner every hour."
  },
  {
    q: "How long should hair and makeup take?",
    a: "Budget 45-60 minutes per person for hair and 30-45 minutes for makeup for each member of the wedding party getting professional styling. For a party of four to six, that usually means starting four to five hours before the ceremony."
  },
  {
    q: "Should I do a first look?",
    a: "A first look lets you complete most portraits before the ceremony, which frees up cocktail hour for you to actually attend it. Skipping it preserves the traditional aisle reveal, but pushes formal photos into a tighter cocktail-hour window — plan for 75-90 minutes if you go that route."
  },
  {
    q: "What's the difference between a wedding timeline and a wedding itinerary?",
    a: "The terms are used interchangeably in most planning contexts. Both describe the same hour-by-hour (or minute-by-minute) schedule of the wedding day, though 'itinerary' sometimes extends to guest-facing details like parking and dress code."
  }
];

const schemas = [
  generateWebApplicationSchema({
    name: 'Wedding Timeline Generator',
    description: seo.description,
    url: seo.canonical
  }),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema(breadcrumbItems)
];

const combinedSchema = `[${schemas.filter(Boolean).join(',')}]`;

export default function TimelineGeneratorPage() {
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
        <main>
    {/* Breadcrumbs */}
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
        {breadcrumbItems.map((crumb, idx) => (
          <li className="flex items-center gap-1.5">
            {idx > 0 && <span aria-hidden="true">/</span>}
            {idx === breadcrumbItems.length - 1 ? (
              <span className="font-semibold text-[#B76E79]">{crumb.name}</span>
            ) : (
              <a href={crumb.item} className="hover:text-[#B76E79] transition-colors">{crumb.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>

    {/* Hero Section */}
    <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="inline-block bg-[#FCECF0] text-[#B76E79] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Free Planning Tool
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] leading-tight">
          Wedding Timeline <span className="text-[#B76E79]">Generator</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Build a minute-by-minute wedding day timeline. Enter your ceremony time, and it lays out the rest of your day in minutes. Edit any block, and share it with vendors free.
        </p>
      </div>

      {/* Image: Hero / What It Does */}
      <div className="max-w-4xl mx-auto mb-16">
        <img src="/images/wedding-day-timeline-generator-hero.jpg" alt="Wedding day timeline generator showing a sample schedule on a tablet" className="w-full rounded-2xl shadow-lg border border-[#F3E8EA]" loading="eager" fetchPriority="high" decoding="async" />
      </div>

      {/* React Island */}
      {/* SEO Intro Copy */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center text-slate-600 text-sm leading-relaxed">
        This interactive Timeline Generator helps you stay completely organized and on top of your wedding planning process. Simply enter your details below, and the tool will automatically adjust to fit your specific wedding needs. Save time, reduce stress, and ensure no detail is overlooked with this free resource.
      </div>
      <TimelineGenerator lang="en" />
    </section>

    {/* Content Guide Section */}
    <section className="py-12 bg-gradient-to-b from-white via-[#FCECF0]/20 to-white border-t border-[#F3E8EA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section: Intro */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Complete Guide</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Build Your Minute-by-Minute Schedule
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Your ceremony starts at 5:00 p.m. Work backward from there and every other block of the day — hair and makeup, first look, family formals, cocktail hour, dinner, the last dance — has to fit into hours you probably haven't counted yet. That's the math Wedding Timeline Generator does for you.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Most couples build a timeline the hard way: a blank document, a rough sense of "morning stuff, then the wedding, then the party," and a nagging worry they've forgotten something. A generator flips that around. You start from the one time that's already fixed — your ceremony — and let the tool fill in everything else with realistic durations, then you adjust from there.
          </p>
        </div>

        {/* Section: What It Does */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">The Basics</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What a Wedding Day Timeline Generator Actually Does
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A wedding day timeline generator turns a single fixed point — your ceremony start time — into a full, ordered schedule for the day: when hair and makeup begins, when the wedding party needs to be dressed, when portraits happen, and how the evening unfolds from cocktail hour to send-off. Instead of estimating each block from scratch, you get a realistic draft to edit rather than a blank page to fill.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            It isn't a replacement for a wedding planner's detailed, vendor-specific version. Think of it as the fast first draft: the skeleton that gets 80% of the guesswork out of the way so you, your planner, or your coordinator can spend your time on the 20% that's actually specific to your wedding. <a href="/tools/budget-calculator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Wedding budget planning</a> is often tied to these timeline decisions, as vendor hours drive your overall cost.
          </p>
        </div>

        {/* Section: How It Works */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Step-by-Step Instructions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How It Works
            </h2>
          </div>
          <div className="max-w-3xl mx-auto mb-8">
            <img src="/images/how-wedding-timeline-generator-works.jpg" alt="Three steps to generate a wedding day timeline: enter time, edit, share" className="w-full rounded-2xl shadow-sm border border-[#F3E8EA]" loading="lazy" decoding="async" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-xs">1</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Enter your start time</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Enter your ceremony start time, venue setup (one location or two), and whether you're planning a first look.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-xs">2</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Review blocks</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Review the generated blocks — hair and makeup, portraits, ceremony, cocktail hour, reception — each with a suggested duration.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-xs">3</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Edit & share</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Edit any time or label, add anything specific to your day, and export or share the result.</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            That's the whole flow. Most of the actual thinking — how long formals realistically take, how much buffer to leave before the ceremony, how long cocktail hour needs to run if you skipped a first look — is baked into the defaults, so you're adjusting a plan instead of inventing one.
          </p>
        </div>

        {/* Section: What Your Generated Timeline Includes */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Example Schedule</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Your Generated Timeline Includes
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Here's what a generated schedule looks like for a 5:00 p.m. ceremony with a first look. Times shift earlier or later depending on your own ceremony time, but the order and proportions hold for most weddings. As your <a href="/tools/guest-list-manager" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">guest list</a> changes, your catering and formals timing may need to adjust slightly.
          </p>
          
          <div className="space-y-8">
            <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm bg-white">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1A1A1A] to-[#2d2d2d] text-white">
                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px]">Time</th>
                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px]">Block</th>
                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[10px]">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">11:00 AM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Hair & makeup begins</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">4-6 people; 45-60 min/person hair, 30-45 makeup</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">1:30 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Getting-ready photos</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">Detail shots, dress on, first-look prep</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">2:00 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">First look + portraits</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">Optional; frees up cocktail hour later</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">2:45 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Wedding party & family formals</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">Ask photographer for a real time estimate</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">3:30 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Buffer / travel to ceremony site</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">10-15 min cushion, more if changing venues</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">4:00 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Guests seated</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500"></td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">5:00 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Ceremony</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">30 min including processional and recessional</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">5:30 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Cocktail hour</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">60-90 min if formals weren't done pre-ceremony</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">6:30 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Reception entrance</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">Links to <a href="/tools/guest-list-manager" className="text-[#B76E79] underline">seating arrangements</a></td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">7:00 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Dinner</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500"></td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">8:00 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Toasts & cake</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500"></td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">8:30 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Open dancing</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500"></td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">10:30 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Last call</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500"></td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A] whitespace-nowrap">11:00 PM</td>
                    <td className="py-3.5 px-4 text-[#4a5568] font-medium">Grand exit</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="max-w-xl mx-auto">
              <img src="/images/wedding-timeline-blocks-infographic.jpg" alt="Infographic of wedding day timeline blocks from getting ready to send-off" className="w-full rounded-2xl shadow-sm border border-[#F3E8EA]" loading="lazy" decoding="async" />
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Every block is editable. If your photographer needs 45 minutes for formals instead of the default 30, or your venue requires breakdown to finish by midnight, you change that block and everything downstream should shift with it.
          </p>
        </div>

        {/* Section: Why a Timeline Beats a Mental Checklist */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Importance</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why a Timeline Beats a Mental Checklist
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A wedding day is the one day where a 20-minute delay doesn't stay a 20-minute delay. A ceremony that starts late pushes portraits into cocktail hour. A cocktail hour that runs long means dinner comes out cold. A first dance at 9:30 instead of 8:30 means half the room has mentally checked out before the dancing starts. None of that is dramatic on its own — it's just what happens when nobody has written down what "on time" actually means for this specific day. Using a <a href="/tools/wedding-checklist-generator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">day-of checklist</a> complements the timeline with task-level detail.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A timeline that exists only in your head isn't a plan; it's an assumption everyone involved is making differently. Your photographer is assuming one pace, your caterer another, and your maid of honor has no idea what either of them is assuming. A written, shared timeline is what makes those assumptions match.
          </p>
        </div>

        {/* Section: Build Backward */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Strategy</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Build Backward From Your Ceremony Time
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Here's where most DIY timelines go wrong: couples start planning from the morning — "we'll wake up, have breakfast, start hair and makeup around 10" — and work forward, hoping it lands somewhere near the ceremony. It rarely does. The better approach, and the one a generator forces by design, is to anchor everything to the ceremony time and work outward in both directions. Ensure your <a href="/tools/wedding-planning-timeline" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">invitations</a> match the exact ceremony time on the generated timeline.
          </p>
          <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm text-sm text-slate-700">
            A 4:00 p.m. ceremony and a 6:00 p.m. ceremony don't just shift the whole day by two hours — the gap is mostly absorbed by the morning. Hair and makeup for a bridal party of four to six typically needs four to five hours before the ceremony, so a later ceremony buys you a slower morning, not a shorter one. Anchoring to the ceremony time first is what keeps that math honest.
          </div>
        </div>

        {/* Section: Sharing With Vendors */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Communication</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sharing Your Timeline With Vendors
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A timeline only helps if the right people actually see it. The general pattern that works for most weddings:
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Share a rough draft with your photographer and planner four to six weeks out and ask them to flag anything unrealistic — they've seen more wedding days than you have. Note: check your <a href="/checklists/wedding-day-of-timeline-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">photography planning</a> shot list to ensure portrait blocks are sufficient.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Send the finalized version to every vendor two to four weeks before the wedding: photographer, videographer, florist, caterer, DJ or band, officiant, hair and makeup team, and transportation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Give your maid of honor, best man, and both sets of parents the full timeline, not just their piece of it.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Avoid sending multiple revisions in the final week. A vendor working from an outdated copy is a bigger risk than a small imperfection in your schedule.</span>
            </li>
          </ul>
        </div>

        {/* Section: Common Mistakes */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Expert Advice</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Common Timeline Mistakes to Avoid
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Skipping buffer time</strong>
              <p className="text-slate-600 text-xs">Add 10-15 minutes between major blocks and a full 30-minute cushion before the ceremony.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Guessing photography timing</strong>
              <p className="text-slate-600 text-xs">Ask your photographer directly how long formals and portraits actually take instead of guessing.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">One master document for all</strong>
              <p className="text-slate-600 text-xs">Give each person only the information relevant to their role to avoid confusion.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Finalizing too late</strong>
              <p className="text-slate-600 text-xs">Aim for a draft four to six weeks out to give vendors time to flag conflicts.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1 sm:col-span-2">
              <strong className="text-[#1A1A1A] block">Forgetting the night-before basics</strong>
              <p className="text-slate-600 text-xs"><a href="/checklists/wedding-day-of-timeline-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Rehearsal planning</a>, marriage license location, and a rain-plan call time if part of the day is outdoors.</p>
            </div>
          </div>
        </div>

        {/* Section: FAQs Accordion */}
        <div className="space-y-6 pt-6 border-t border-[#F3E8EA]">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Quick Answers</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Timeline FAQs
            </h2>
          </div>
          
          <div className="space-y-3" id="timeline-faq-list">
            <AccordionFaqList items={faqs} idPrefix="tool-faq" />
          </div>
        </div>
      </div>
    </section>

  </main>

  

  {/* Interactive Accordion Script */}
      </div>
      <Footer lang="en" />
    </div>
  );
}
