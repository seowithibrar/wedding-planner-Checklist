import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BudgetCalculator } from '@/components/tools/BudgetCalculator';
import { AccordionFaqList } from '@/components/ui/AccordionFaqList';
import { generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

export const seo = {
  title: "Wedding Budget Calculator (2026)",
  description: "Use our free wedding budget calculator to estimate costs by category, allocate spending by guest count, and track your wedding budget in one place.",
  canonical: "https://www.weddingplanningchecklists.org/tools/budget-calculator",
  image: ""
};

const breadcrumbItems = [
  { name: 'Home', item: 'https://www.weddingplanningchecklists.org' },
  { name: 'Planning Tools', item: `${'https://www.weddingplanningchecklists.org'}/tools/wedding-planning-dashboard` },
  { name: 'Wedding Budget Calculator', item: seo.canonical }
];

export const faqs = [
  {
    q: 'What is a wedding budget calculator?',
    a: "It's a tool that lets you set a total wedding budget, split it across expense categories, and track estimated versus actual costs as vendors are booked."
  },
  {
    q: 'How do I calculate my wedding budget?',
    a: 'Start with what you can realistically afford, add contributions, set your guest count, then allocate funds by category using either a percentage-based split or itemized vendor quotes.'
  },
  {
    q: 'How much should I budget for a wedding?',
    a: "There's no universal number — it depends on your savings, contributions, guest count, location, and priorities. Base it on what you can afford, not a national average."
  },
  {
    q: 'How much does a wedding cost per guest?',
    a: 'Wedding cost per guest is your total variable, per-person costs (catering, rentals, favors, stationery) divided by guest count. It varies widely by caterer, venue, and region.'
  },
  {
    q: 'How should I divide my wedding budget?',
    a: 'A common approach is percentage-based allocation — roughly 45–50% for venue and catering, 10–15% for photo and video, 8–10% each for attire, flowers, and entertainment, and 5–10% for contingency buffer.'
  },
  {
    q: 'What percentage of my budget should go to the venue?',
    a: 'Venue and catering together often make up the largest share of a wedding budget (45–50%), but the exact percentage depends heavily on your venue type, catering inclusions, and location.'
  },
  {
    q: 'Can I use a wedding budget calculator for 100 guests?',
    a: 'Yes — enter 100 as your guest count and the calculator will scale per-guest categories like catering, favors, and stationery accordingly.'
  },
  {
    q: 'What expenses should be included in a wedding budget?',
    a: 'Venue, catering, photography, videography, attire, florals, entertainment, cake, stationery, transportation, beauty, rings, and a contingency fund.'
  },
  {
    q: 'Should I include taxes and tips in my wedding budget?',
    a: 'Yes — taxes, service fees, and gratuity are often quoted separately from a vendor’s base price and can add 18–30% on top of initial quotes.'
  },
  {
    q: 'How much should I keep for unexpected wedding expenses?',
    a: 'Many couples set aside roughly 5–10% of their total budget as a contingency fund, though the right amount depends on how firm your other estimates are.'
  }
];

const schemas = [
  generateWebApplicationSchema({
    name: 'Wedding Budget Calculator',
    description: seo.description,
    url: seo.canonical,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All'
  }),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema(breadcrumbItems)
];

const combinedSchema = `[${schemas.filter(Boolean).join(',')}]`;

export default function BudgetCalculatorPage() {
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
    {/* Breadcrumb Navigation */}
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
        {breadcrumbItems.map((crumb, idx) => (
          <li className="flex items-center gap-1.5">
            {idx > 0 && <span aria-hidden="true" className="text-slate-300">/</span>}
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
    <section className="pt-8 pb-12 lg:pt-12 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <span className="inline-block bg-[#FCECF0] text-[#B76E79] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
          Interactive Financial Tool
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Wedding Budget <span className="text-[#B76E79]">Calculator</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Planning a wedding means juggling dozens of moving costs at once, and it's easy to lose track of where the money is actually going. A wedding budget calculator gives you one place to set a total budget, break it into categories, and see exactly how much room you have left as bookings and deposits come in.
        </p>
      </div>

      {/* React Interactive Tool Island */}
      {/* SEO Intro Copy */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center text-slate-600 text-sm leading-relaxed">
        This interactive Wedding Budget Calculator helps you stay completely organized and on top of your wedding planning process. Simply enter your details below, and the tool will automatically adjust to fit your specific wedding needs. Save time, reduce stress, and ensure no detail is overlooked with this free resource.
      </div>
      <BudgetCalculator lang="en" />
    </section>

    {/* Content Guide Section */}
    <section className="py-12 bg-gradient-to-b from-white via-[#FCECF0]/20 to-white border-t border-[#F3E8EA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section: How to Use */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Step-by-Step Instructions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How to Use the Wedding Budget Calculator
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            The calculator is built to be updated throughout planning, not filled out once and forgotten. Instead of guessing, you get a running, numbers-based picture of your wedding budget planner:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-xs">1</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Enter your total wedding budget</h3>
              <p className="text-xs text-slate-600 leading-relaxed">The maximum amount you're comfortable spending overall across all vendors and expenses.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-xs">2</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Add your estimated guest count</h3>
              <p className="text-xs text-slate-600 leading-relaxed">This single number drives per-guest costs like catering, table rentals, favors, and stationery.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-xs">3</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Review pre-loaded spending categories</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Venue, catering, photography, attire, and decor are pre-loaded with industry benchmark percentage weights.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-xs">4</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Enter estimates & switch to actuals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Log quotes as estimates first, then swap in actual costs once signed vendor contracts are finalized.</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm text-xs text-slate-700">
            <strong className="text-[#1A1A1A]">Track your remaining budget:</strong> The calculator recalculates automatically so you always know what's left to allocate. Treat it as a living wedding expense tracker you return to every few weeks, especially right after each vendor deposit.
          </div>
        </div>

        {/* Section: What Does a Calculator Include */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Line Item Scoping</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Does a Wedding Budget Calculator Include?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Most wedding budgets break down into these core categories, which is why they're pre-loaded into the calculator:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">🏰</span> <span>Venue rental & site fees</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">🍽️</span> <span>Catering & bar service</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">📸</span> <span>Photography services</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">🎥</span> <span>Videography coverage</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">👗</span> <span>Bridal gown & groom attire</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">💐</span> <span>Florals & venue decor</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">🎵</span> <span>DJ, band & sound lighting</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">🎂</span> <span>Wedding cake & dessert bar</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">💌</span> <span>Invitations & stationery</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">🚗</span> <span>Shuttles & transportation</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">💄</span> <span>Hair & bridal makeup</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">💍</span> <span>Wedding bands & jewelry</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">📜</span> <span>Ceremony officiant & permits</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#F3E8EA] flex items-center gap-2.5">
              <span className="text-base">🪑</span> <span>Reception rentals & favors</span>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#B76E79]/40 bg-[#FCECF0]/40 flex items-center gap-2.5 font-bold text-[#B76E79]">
              <span className="text-base">🛡️</span> <span>Contingency & safety buffer</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            The exact split between these categories will differ based on your priorities and wedding style — the categories above are a starting point, not a fixed formula.
          </p>
        </div>

        {/* Section: Breakdown Table */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Expense Strategy</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wedding Budget Breakdown by Category
            </h2>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#FCECF0] to-white border-b border-[#F3E8EA] text-[#1A1A1A]">
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">What It Covers</th>
                  <th className="py-3.5 px-4 font-bold">Budget Considerations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Venue</td>
                  <td className="py-3.5 px-4">Rental fee, ceremony fee, tables/chairs, sometimes catering minimums</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Often the single largest line item — confirm exactly what's included before comparing quotes</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Catering</td>
                  <td className="py-3.5 px-4">Food, drinks, bar package, service staff, tableware rentals</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Priced per guest, so your guest count changes this cost quickly</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Photography</td>
                  <td className="py-3.5 px-4">Photographer's hours, second shooter, edited digital gallery, albums</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Coverage hours usually affect price more than the package name does</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Videography</td>
                  <td className="py-3.5 px-4">Filming, audio recording, cinematic editing, highlight reels</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Often bundled with photography packages for significant multi-service discounts</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Attire</td>
                  <td className="py-3.5 px-4">Wedding dress or suit, alterations, veil, shoes, accessories</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Alterations are one of the most commonly underbudgeted line items ($300–$800+)</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Florals & Decor</td>
                  <td className="py-3.5 px-4">Bouquets, boutonnieres, ceremony arch, centerpieces, lighting</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Costs generally scale with guest count and total table count</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Entertainment</td>
                  <td className="py-3.5 px-4">DJ or live band, sound equipment, microphones, dance lighting</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Compare hourly rates and overtime fees, not just the base quote</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Cake & Desserts</td>
                  <td className="py-3.5 px-4">Wedding cake, dessert table, cutting fee, display stands</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Cake cutting and plate fees ($1.50–$3/person) are easy to overlook</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Stationery</td>
                  <td className="py-3.5 px-4">Save-the-dates, invitations, postage, day-of menus, signage</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">Digital RSVPs can reduce postage and printing costs by up to 50%</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">Transportation</td>
                  <td className="py-3.5 px-4">Guest shuttles, getaway car, wedding party transport</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">More relevant for destination weddings or venues far from guest hotels</td>
                </tr>
                <tr className="hover:bg-slate-50/70 bg-[#FCECF0]/30">
                  <td className="py-3.5 px-4 font-bold text-[#B76E79]">Miscellaneous / Buffer</td>
                  <td className="py-3.5 px-4">Price adjustments, service gratuities, emergency fixes</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 font-semibold">Fund this buffer category before finalizing every other line item</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Use this table to prioritize: decide which two or three categories matter most to you as a couple, and let the calculator show you the trade-offs elsewhere.
          </p>
        </div>

        {/* Section: Guest Count Scaling */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Per-Person Variable Costs</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wedding Budget Calculator by Guest Count
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Guest count is one of the biggest cost drivers in a wedding budget because so many line items are priced per person: catering, rentals (tables, chairs, linens), invitations, cake servings, favors, and often transportation all scale with headcount. This relationship is usually described as the <strong>wedding cost per guest</strong> — your total variable, per-person costs divided by your guest count.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Use our interactive <a href="/tools/guest-list-manager" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">guest list manager tool</a> alongside our <a href="/checklists/wedding-guest-list-organizer" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">guest list and RSVP checklist</a> to monitor your headcount accurately across these illustrative planning tiers:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-[#1A1A1A]">50 Guests (Intimate / Micro)</h3>
                <span className="text-[10px] font-bold bg-[#FCECF0] text-[#B76E79] px-2.5 py-0.5 rounded-full">Intimate</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">A smaller venue capacity is usually enough, and catering and rental costs scale down, though fixed costs like photography and entertainment minimums stay roughly the same.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-[#1A1A1A]">100 Guests (Mid-Size Benchmark)</h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">Standard</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">A common mid-size wedding size where per-guest costs — catering, favors, stationery — start to make up a larger share of the total budget.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-[#1A1A1A]">150 Guests (Large Celebration)</h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">Expanded</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">Venue capacity and catering minimums become bigger constraints, and rental needs (extra tables, linens, chairs, bar staff) increase significantly.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-[#1A1A1A]">200+ Guests (Grand / Multi-Day)</h3>
                <span className="text-[10px] font-bold bg-[#D4AF37]/20 text-[#997d26] px-2.5 py-0.5 rounded-full">Grand</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">Typically requires a banquet venue with higher capacity, more service staff, and higher total per-guest catering and rental allocations.</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            Run a few guest-count scenarios through the calculator above before finalizing your list — it's often the fastest way to see how much flexibility you actually have.
          </p>
        </div>

        {/* Section: Budget by Percentage */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Benchmark Percentages</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wedding Budget Calculator by Percentage
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Percentage-based allocation is a useful sanity check once you have a total budget: instead of pricing every vendor from scratch, you divide your total wedding budget across categories and see if any one area is taking an outsized share. Below is one illustrative example of how a total budget could be split — treat it as a starting point to adjust, not a rigid rule:
          </p>
          <div className="p-6 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-3">
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold">🏰 Venue & catering</span>
                <span className="font-bold text-[#B76E79]">roughly 45–50%</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold">📸 Photography & videography</span>
                <span className="font-bold text-[#B76E79]">roughly 10–15%</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold">👗 Attire & beauty</span>
                <span className="font-bold text-[#B76E79]">roughly 8–10%</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold">💐 Florals & decor</span>
                <span className="font-bold text-[#B76E79]">roughly 8–10%</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold">🎵 Entertainment (DJ/Band)</span>
                <span className="font-bold text-[#B76E79]">roughly 8–10%</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold">💌 Stationery & paper goods</span>
                <span className="font-bold text-[#B76E79]">roughly 2–3%</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold">🛡️ Miscellaneous & contingency buffer</span>
                <span className="font-bold text-[#B76E79]">roughly 5–10%</span>
              </li>
            </ul>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            These percentages will shift based on your location, guest count, wedding style, and personal priorities — a couple prioritizing photography, for example, might reasonably shift that allocation higher and trim elsewhere.
          </p>
        </div>

        {/* Section: How Much Should I Budget & External Link */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Realistic Expectations</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How Much Should I Budget for a Wedding?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            There's no single correct wedding budget, and chasing a national "average" figure can be misleading since costs vary enormously by region, metropolitan density, and venue type. According to industry research from <a href="https://www.theknot.com/content/average-wedding-cost" target="_blank" rel="noopener noreferrer" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">The Knot Real Weddings Study</a>, national wedding spend figures reflect broad aggregates; your actual total should always be anchored in what you can comfortably finance without accumulating high-interest debt.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Base your total figure on what you can realistically afford, factoring in:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
            <div className="p-3 bg-white rounded-xl border border-[#F3E8EA]">✓ Available savings</div>
            <div className="p-3 bg-white rounded-xl border border-[#F3E8EA]">✓ Monthly cash flow</div>
            <div className="p-3 bg-white rounded-xl border border-[#F3E8EA]">✓ Family contributions</div>
            <div className="p-3 bg-white rounded-xl border border-[#F3E8EA]">✓ Target guest count</div>
            <div className="p-3 bg-white rounded-xl border border-[#F3E8EA]">✓ Geographic location</div>
            <div className="p-3 bg-white rounded-xl border border-[#F3E8EA]">✓ Wedding formality & style</div>
          </div>
        </div>

        {/* Section: 10-Step Calculation Framework */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Financial Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How to Calculate Your Wedding Budget
            </h2>
          </div>
          <ol className="space-y-3 text-xs sm:text-sm text-slate-700 list-decimal pl-5 leading-relaxed font-medium">
            <li><strong>Determine the maximum amount you can realistically afford</strong> without taking on unmanageable debt.</li>
            <li><strong>Identify all financial contributions</strong> from personal savings, family gifts, or partner accounts.</li>
            <li><strong>Set your realistic guest count</strong>, since headcount dictates roughly 50% of your total variable expenses.</li>
            <li><strong>Prioritize your must-have non-negotiable expenses</strong> before pricing secondary decorative accents.</li>
            <li><strong>Allocate money across categories</strong> using the category breakdown table above as your starting framework.</li>
            <li><strong>Estimate vendor costs by requesting 2–3 written quotes</strong> for each major category before booking.</li>
            <li><strong>Add taxes, service fees, and gratuity</strong>, which are frequently quoted separately from base vendor packages.</li>
            <li><strong>Set aside a strict 7–10% contingency buffer</strong> to absorb unforeseen overtime or emergency items.</li>
            <li><strong>Track deposits and scheduled payment deadlines</strong> as contracts are officially executed.</li>
            <li><strong>Update the budget continuously</strong> as actual signed invoice amounts replace preliminary quotes.</li>
          </ol>
        </div>

        {/* Section: Wedding Budget Tips */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Expert Advice</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wedding Budget Tips
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Explore our in-depth guide to <a href="/blog/wedding-budget-tips" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">wedding budget-saving tips</a> alongside these core financial habits:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] space-y-1">
              <strong className="text-[#1A1A1A] block">Prioritize top 3 expenses</strong>
              <p className="text-slate-600 text-xs">Decide what matters most (e.g. food, photo, music) and be comfortable trimming other line items.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] space-y-1">
              <strong className="text-[#1A1A1A] block">Compare vendor quotes</strong>
              <p className="text-slate-600 text-xs">Request itemized pricing from at least 2 or 3 reputable vendors in each category before placing deposits.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] space-y-1">
              <strong className="text-[#1A1A1A] block">Track deposits immediately</strong>
              <p className="text-slate-600 text-xs">Record payment dates the day contracts are signed rather than attempting to reconcile invoices months later.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] space-y-1">
              <strong className="text-[#1A1A1A] block">Watch service fees & taxes</strong>
              <p className="text-slate-600 text-xs">Service charges (20–25%) and municipal sales taxes can add thousands of dollars to catering totals.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] space-y-1">
              <strong className="text-[#1A1A1A] block">Protect the contingency fund</strong>
              <p className="text-slate-600 text-xs">Treat your emergency cushion as untouchable until final week logistics and last-minute balance adjustments.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] space-y-1">
              <strong className="text-[#1A1A1A] block">Conduct monthly budget audits</strong>
              <p className="text-slate-600 text-xs">Review total committed funds with your partner once per month to ensure you stay on track.</p>
            </div>
          </div>
        </div>

        {/* Section: FAQs Accordion */}
        <div className="space-y-6 pt-6 border-t border-[#F3E8EA]">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Quick Answers</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wedding Budget Calculator FAQs
            </h2>
          </div>
          
          <div className="space-y-3" id="budget-faq-list">
            <AccordionFaqList items={faqs} idPrefix="tool-faq" />
          </div>
        </div>

        {/* Section: CTA & Next Step Navigation */}
        <div className="bg-gradient-to-br from-[#1A1A1A] via-slate-900 to-[#2d2d2d] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B76E79]/10 rounded-full blur-3xl"></div>
          <div className="relative space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">Next Planning Steps</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Start Planning Your Wedding Budget
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A wedding budget calculator only works if you keep coming back to it — update it every time a quote turns into a signed contract, and revisit your category allocations whenever your guest count or priorities shift.
            </p>

            {/* Tiered Checklist Cards */}
            <div className="pt-4">
              <span className="text-[11px] font-bold text-slate-400 block mb-3 uppercase tracking-wider">Select Your Budget-Specific Checklist:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <a href="/checklists/wedding-budget-calculator-10k" className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold text-white transition-all text-center">
                  $10K wedding budget checklist →
                </a>
                <a href="/checklists/wedding-budget-calculator-20k" className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold text-white transition-all text-center">
                  $20K budget checklist →
                </a>
                <a href="/checklists/wedding-budget-calculator-30k" className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold text-white transition-all text-center">
                  $30K wedding budget checklist →
                </a>
                <a href="/checklists/wedding-budget-calculator-50k" className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold text-white transition-all text-center">
                  $50K+ luxury wedding checklist →
                </a>
              </div>
            </div>

            {/* Supporting Tools Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-3 text-xs">
              <a href="/checklists/wedding-vendor-booking-checklist" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                vendor booking and contract checklist
              </a>
              <span className="text-slate-600">•</span>
              <a href="/checklists/printable-wedding-planning-checklist" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                printable wedding planning checklist
              </a>
              <span className="text-slate-600">•</span>
              <a href="/tools/wedding-planning-dashboard" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                wedding planning dashboard
              </a>
              <span className="text-slate-600">•</span>
              <a href="/tools/wedding-planning-timeline" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                wedding planning timeline tool
              </a>
              <span className="text-slate-600">•</span>
              <a href="/tools/wedding-checklist-generator" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                wedding checklist generator
              </a>
            </div>
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
