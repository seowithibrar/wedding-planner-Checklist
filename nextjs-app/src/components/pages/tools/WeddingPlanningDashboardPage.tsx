import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PlanningDashboard } from '@/components/tools/PlanningDashboard';
import { AccordionFaqList } from '@/components/ui/AccordionFaqList';
import { generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';

export const seo = {
  title: "Wedding Planning Dashboard: What to Track & How to Use One",
  description: "A wedding planning dashboard puts your countdown, tasks, RSVPs, and milestones in one view. Learn what to track and how to set yours up in 30 minutes.",
  canonical: "https://www.weddingplanningchecklists.org/tools/wedding-planning-dashboard",
  image: "https://www.weddingplanningchecklists.org/images/wedding-planning-dashboard-hero.jpg"
};

const breadcrumbItems = [
  { name: 'Home', item: 'https://www.weddingplanningchecklists.org' },
  { name: 'Planning Tools', item: `${'https://www.weddingplanningchecklists.org'}/tools/budget-calculator` },
  { name: 'Wedding Planning Dashboard', item: seo.canonical }
];

export const faqs = [
  {
    q: 'What is a wedding planning dashboard?',
    a: "A wedding planning dashboard is a single screen that summarizes your wedding progress: countdown, tasks, guest RSVPs, and milestones. It shows whether you're on track without making you open several separate tools."
  },
  {
    q: 'Is there a free wedding planning dashboard?',
    a: 'Yes. The Wedding Planning Dashboard on WeddingPlanningChecklists.org is free, like the site\'s other interactive tools. It links to the budget calculator, guest list manager, checklist generator, and the rest of the core suite.'
  },
  {
    q: 'What\'s the difference between a wedding planning dashboard and a wedding planner?',
    a: 'A wedding planner is a person who coordinates vendors and logistics. A dashboard is a tool that shows you where things stand. Couples who hire a planner can still use one to keep their own view of progress.'
  },
  {
    q: 'What should I put on my dashboard first?',
    a: 'Start with your wedding date, then your task list and total budget. Guest RSVPs and vendor deposits can come next, once you have a venue and a rough headcount.'
  },
  {
    q: 'How is a wedding planning dashboard different from a spreadsheet?',
    a: 'A spreadsheet stores detail, but you have to build it and read it. A dashboard summarizes the numbers that matter and points you to the next deadline, so it works well alongside a spreadsheet rather than instead of one.'
  },
  {
    q: 'Can I use a dashboard for a short engagement?',
    a: 'Absolutely. A shorter countdown makes a dashboard more useful, because there\'s less room for missed tasks. Pair it with the 3-month or 6-month checklist and review it every few days.'
  },
  {
    q: 'Does the dashboard save my progress?',
    a: 'The site\'s tools save your progress in your browser. Keep using the same browser and device, and back up key numbers in case you clear your browsing data.'
  }
];

const schemas = [
  generateWebApplicationSchema({
    name: 'Wedding Planning Dashboard',
    description: seo.description,
    url: seo.canonical,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All'
  }),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema(breadcrumbItems),
  generateArticleSchema({
    title: 'Wedding Planning Dashboard: What It Is, What to Track & How to Set One Up',
    description: seo.description,
    url: seo.canonical,
    image: seo.image,
    datePublished: '2026-09-22',
    dateModified: '2026-09-22'
  })
];

const combinedSchema = `[${schemas.filter(Boolean).join(',')}]`;

export default function WeddingPlanningDashboardPage() {
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
          All-In-One Planning Suite
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Wedding Planning Dashboard: <span className="text-[#B76E79]">What It Is, What to Track & How to Set One Up</span>
        </h1>
        
        {/* Quick Summary Box */}
        <div className="p-6 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm text-slate-700 text-sm sm:text-base leading-relaxed text-left space-y-2.5 my-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B76E79]">
            <span className="w-2 h-2 rounded-full bg-[#B76E79]"></span>
            Quick Summary
          </div>
          <p>
            A wedding planning dashboard is one screen, a kind of wedding planning tracker, that brings your wedding countdown, tasks, budget, guest RSVPs, and milestones together, so nothing hides in a spreadsheet or a screenshot. This guide explains what a wedding planning dashboard should track, how it differs from a wedding checklist or timeline, and how to set one up in about half an hour. You'll also get a weekly review routine, tips for multi-day Pakistani and Indian weddings, and a free <a href="/tools/wedding-planning-dashboard" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">wedding planning dashboard</a> you can open today to stay organized from engagement to the last dance, on any timeline.
          </p>
        </div>

        <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed text-left max-w-3xl mx-auto">
          <p>
            Around month four of planning, plenty of couples run into the same wall. The venue deposit sits in a banking app, the guest list lives in a spreadsheet, the florist's quote is buried in an email thread, and the to-do list is a sticky note on the fridge. Nothing is technically wrong; it just takes longer to find things than to do them.
          </p>
          <p>
            That gap is what a wedding planning dashboard closes. Below, you'll see what one is, what belongs on it, and how to build a routine that keeps it useful. If you'd rather try it first, the free dashboard is ready to open in another tab.
          </p>
        </div>
      </div>

      {/* Hero Visual */}
      <div className="max-w-4xl mx-auto mb-10">
        <img
          src="/images/wedding-planning-dashboard-hero.jpg"
          alt="A modern wedding planning dashboard on a tablet showing wedding countdown, task completion, budget overview, and RSVP tracker"
          className="w-full rounded-2xl shadow-lg border border-[#F3E8EA] object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <p className="text-center text-xs text-slate-500 mt-2 italic">
          A central wedding planning dashboard tracking your countdown, budget, RSVPs, and key milestones in one unified view.
        </p>
      </div>

      {/* SEO Intro Copy */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center text-slate-600 text-sm leading-relaxed">
        This interactive Wedding Planning Dashboard helps you stay completely organized and on top of your wedding planning process. Simply enter your details below, and the tool will automatically adjust to fit your specific wedding needs. Save time, reduce stress, and ensure no detail is overlooked with this free resource.
      </div>

      {/* React Island */}
      <PlanningDashboard lang="en" />
    </section>

    {/* Content Guide Section */}
    <section className="py-12 bg-gradient-to-b from-white via-[#FCECF0]/20 to-white border-t border-[#F3E8EA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section: What Is a Wedding Planning Dashboard? */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Overview</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Is a Wedding Planning Dashboard?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A wedding planning dashboard is a central screen that shows the current state of your whole wedding at a glance: days remaining, tasks finished, deadlines coming up, guest replies received, and milestones reached. It's the view from above, not another list to maintain. Some couples call it a wedding planning tracker or a wedding planning organizer, and the idea is the same.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            The important word is summary. A checklist tells you what to do, and a budget tool tells you what you've spent. A wedding planning dashboard sits over both and answers a simpler question: are we on track?
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            The dashboard on this site works that way. It's a central hub with at-a-glance stats, a countdown, a milestone tracker, a progress breakdown, and quick links into the other interactive wedding planning tools. Think of it as the front door to the rest of the suite.
          </p>
        </div>

        {/* Section: Why Use a Wedding Planning Dashboard Instead of Spreadsheets and Notes? */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Comparison</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Use a Wedding Planning Dashboard Instead of Spreadsheets and Notes?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Because planning information scatters, and scattered information causes missed deadlines. A wedding planning dashboard keeps the overall picture in one place, so you can spot a problem while it's still small.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            That doesn't make spreadsheets or notes bad. Each one has a job, and the table below shows where each shines and where it tends to struggle.
          </p>

          {/* Method Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FCECF0]/40 border-b border-[#F3E8EA]">
                  <th className="p-4 font-bold text-[#1A1A1A]">Method</th>
                  <th className="p-4 font-bold text-[#1A1A1A]">Works well for</th>
                  <th className="p-4 font-bold text-[#1A1A1A]">Where it breaks down</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E8EA] text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Paper binder</td>
                  <td className="p-4">Contracts, fabric swatches, printed checklists</td>
                  <td className="p-4">One copy, easy to lose, can't tell you what's overdue</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Spreadsheet</td>
                  <td className="p-4">Detailed budgets and guest data</td>
                  <td className="p-4">You build it yourself, formulas break, nothing flags a missed deadline</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Notes app</td>
                  <td className="p-4">Quick ideas and vendor questions</td>
                  <td className="p-4">Ideas pile up unsorted and progress is invisible</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-[#FCECF0]/10">
                  <td className="p-4 font-bold text-[#B76E79]">Wedding planning dashboard</td>
                  <td className="p-4 font-medium">Overall status: countdown, tasks, RSVPs, milestones</td>
                  <td className="p-4">Summarizes rather than replaces detailed records like signed contracts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
            Three practical benefits show up once you start using one.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm">1</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Fewer "where did I put that?" moments</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When the countdown, tasks, and RSVPs share a screen, you stop opening four apps to answer one question.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm">2</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Shared status without a meeting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You and your partner can look at the same numbers and agree on what's next, instead of relaying updates by text.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm">3</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Early warnings</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                An overdue task or a slow RSVP count is easy to ignore inside a long list. On a dashboard, it stares back at you.
              </p>
            </div>
          </div>
        </div>

        {/* Section: What Should a Wedding Planning Dashboard Track? */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Core Features</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Should a Wedding Planning Dashboard Track?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A good wedding planning dashboard tracks six things: your countdown, tasks and deadlines, budget, guest RSVPs, vendors, and milestones. Each answers a different question, and leaving one out creates a blind spot.
          </p>

          <div className="space-y-6">
            {/* Countdown */}
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <span className="text-[#B76E79]">⏱</span> Countdown to Your Wedding Date
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Everything else hangs off your date. Seeing the days and weeks left turns "we have plenty of time" into an actual number. The tools on this site sync with your wedding date, and the standalone <a href="/tools/wedding-countdown" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">wedding countdown</a> adds a live ticking timer if you like the visual.
              </p>
            </div>

            {/* Tasks and Deadlines */}
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <span className="text-[#B76E79]">📋</span> Tasks and Deadlines
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Separate what's due soon from what's merely someday. A dashboard that shows only the next few deadlines feels manageable, while a 200-item list feels like a verdict. Build the full list with the <a href="/tools/wedding-checklist-generator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Wedding Checklist Generator</a>, which sequences tasks backward from your date, then let the dashboard show your progress.
              </p>
            </div>

            {/* Budget */}
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <span className="text-[#B76E79]">💰</span> Budget
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Track three numbers: your total budget, what's already committed, and what's left. Category detail belongs in a dedicated tool such as the <a href="/tools/budget-calculator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">wedding budget calculator</a>, while the dashboard keeps the headline figures in view. A cushion of 5 to 10 percent for surprises is a sensible habit.
              </p>
            </div>

            {/* Guest RSVPs */}
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <span className="text-[#B76E79]">👥</span> Guest RSVPs
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Headcount drives catering, seating, and venue capacity, so it deserves a permanent spot. Watch how many people are invited, how many have replied, and how many said yes, no, or maybe. The <a href="/tools/guest-list-manager" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Guest List Manager</a> holds the detail, including meal preferences and plus-ones.
              </p>
            </div>

            {/* Vendors and Deposits */}
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <span className="text-[#B76E79]">🤝</span> Vendors and Deposits
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                For each vendor, note whether they're booked, what you've paid, and when the balance is due. Final payments are easy to miss because they land months after the contract was signed. The <a href="/checklists/wedding-vendor-booking-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">vendor booking order and contract checklist</a> shows which vendors to lock in first.
              </p>
            </div>

            {/* Milestones and Overall Progress */}
            <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-2">
              <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <span className="text-[#B76E79]">🎯</span> Milestones and Overall Progress
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Milestones are the big decisions everything else depends on: venue signed, photographer booked, attire ordered, invitations sent. A percentage-complete figure is motivating, but the milestone list is more honest. The <a href="/tools/wedding-milestone-tracker" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Wedding Milestone Tracker</a> follows those key decisions as you complete them.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Dashboard vs. Checklist vs. Timeline: What's the Difference? */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Tool Hierarchy</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Dashboard vs. Checklist vs. Timeline: What's the Difference?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            They overlap, but they aren't interchangeable. A checklist answers what needs doing, a timeline answers when, and a wedding planning dashboard answers whether you're on track. Here's how the pieces fit together.
          </p>

          {/* Difference Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FCECF0]/40 border-b border-[#F3E8EA]">
                  <th className="p-4 font-bold text-[#1A1A1A]">Tool</th>
                  <th className="p-4 font-bold text-[#1A1A1A]">The question it answers</th>
                  <th className="p-4 font-bold text-[#1A1A1A]">Where to find it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E8EA] text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Checklist</td>
                  <td className="p-4">What still needs doing?</td>
                  <td className="p-4"><a href="/checklists/12-month-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">12-Month Wedding Planning Checklist</a></td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Timeline</td>
                  <td className="p-4">When should each task happen?</td>
                  <td className="p-4"><a href="/tools/wedding-planning-timeline" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Wedding Planning Timeline</a></td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Calendar</td>
                  <td className="p-4">Which appointments are coming up?</td>
                  <td className="p-4"><a href="/tools/wedding-planning-calendar" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Wedding Planning Calendar</a></td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Budget calculator</td>
                  <td className="p-4">What can we spend, and where?</td>
                  <td className="p-4"><a href="/tools/budget-calculator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Budget Calculator</a></td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-[#FCECF0]/10">
                  <td className="p-4 font-bold text-[#B76E79]">Wedding planning dashboard</td>
                  <td className="p-4 font-medium">Are we on track overall?</td>
                  <td className="p-4"><a href="/tools/wedding-planning-dashboard" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Wedding Planning Dashboard</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            If you're starting from zero, work in roughly that order: date, checklist, timeline, budget, guest list. The dashboard gets more useful with every piece you add, which is why it works best as your home base rather than your first stop. For the full planning sequence, read our <a href="/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">ultimate wedding planning checklists guide</a>.
          </p>
        </div>

        {/* Section: How to Set Up Your Wedding Planning Dashboard in 30 Minutes */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Fast-Start Setup</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How to Set Up Your Wedding Planning Dashboard in 30 Minutes
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Setting up a wedding planning dashboard takes six steps: fix your date, generate your tasks, set your budget, load your guests, mark your milestones, and book a weekly review. Expect roughly half an hour if you already know your date and a ballpark budget.
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">1</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Fix your wedding date</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">A tentative date is fine, and you can change it later. Enter it first, because the site's tools sync with your wedding date.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">2</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Generate your task list</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Run the Wedding Checklist Generator for a personalized list, or pick a timeline that matches your countdown, such as the 12-month checklist above.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">3</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Set your budget ceiling</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Enter your total in the calculator to get category-level targets before you fall in love with a venue you can't afford.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">4</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Load your guest list</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">A rough list beats no list. Add names now and refine them as RSVPs arrive.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">5</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Mark your milestones</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Pick the five decisions that matter most this quarter, usually venue, photographer, caterer, attire, and invitations.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">6</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Schedule a weekly review</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Put 15 minutes on both calendars, then open your wedding planning dashboard for the first check-in. The habit matters more than the setup.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: How Often Should You Check Your Dashboard? */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Routine</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How Often Should You Check Your Dashboard?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Once a week is enough for most of the engagement, then every few days during the last two months. A short, regular check beats a long, occasional one.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
            Here's a 15-minute weekly routine that keeps things honest:
          </p>

          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Glance at the countdown and note how many weeks remain.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Clear or reschedule anything overdue.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Update RSVPs and vendor replies.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Pick the next three tasks and put dates on them.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#B76E79] mt-0.5">✓</span>
              <span>Compare remaining budget with what you've committed.</span>
            </li>
          </ul>

          <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm text-sm text-slate-700 leading-relaxed">
            Once a month, spend 30 minutes zooming out. Are milestones landing when your timeline says they should? If not, decide what to drop, delegate, or pay someone else to handle, then book the resulting appointments in your planning calendar.
          </div>
        </div>

        {/* Section: What to Focus On at Each Planning Stage */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Planning Stages</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What to Focus On at Each Planning Stage
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Your dashboard should look different at month twelve than at week three. This table shows where to point your attention.
          </p>

          {/* Stages Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FCECF0]/40 border-b border-[#F3E8EA]">
                  <th className="p-4 font-bold text-[#1A1A1A]">Time to wedding</th>
                  <th className="p-4 font-bold text-[#1A1A1A]">Dashboard focus</th>
                  <th className="p-4 font-bold text-[#1A1A1A]">Helpful next step</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E8EA] text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">12+ months</td>
                  <td className="p-4">Date, budget, venue, rough guest count</td>
                  <td className="p-4"><a href="/blog/how-to-choose-wedding-venue" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">How to choose a wedding venue</a></td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">6 to 11 months</td>
                  <td className="p-4">Core vendors, attire, save-the-dates</td>
                  <td className="p-4"><a href="/checklists/wedding-vendor-booking-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Vendor booking checklist</a></td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">3 to 5 months</td>
                  <td className="p-4">Invitations, RSVPs, menu, fittings</td>
                  <td className="p-4"><a href="/checklists/wedding-guest-list-organizer" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Guest List & RSVP Master Checklist</a></td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-[#1A1A1A]">Final month</td>
                  <td className="p-4">Final headcount, vendor payments, day-of plan</td>
                  <td className="p-4"><a href="/tools/timeline-generator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Day-of Timeline Generator</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Short on time? The <a href="/checklists/3-month-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">3-month express checklist</a> trims the task list, and the dashboard keeps that smaller list visible.
          </p>
        </div>

        {/* Section: Pakistani, Indian, and Multi-Day Weddings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Multi-Day Traditions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Using a Wedding Planning Dashboard for Pakistani, Indian, and Multi-Day Weddings
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Multi-day weddings need one adjustment: a single countdown isn't enough. A Pakistani wedding may include a Dholki, Mayun, Mehndi, Baraat, Nikkah, and Walima, while an Indian wedding may include a Haldi, Mehendi, Sangeet, Mandap ceremony, and reception. Each event has its own guest count, venue, outfits, and vendors.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            So build your wedding planning dashboard around events instead of one big day. In whatever task list you use, start each task with the function, like "Mehndi: confirm decorator" or "Walima: final headcount," so you can see at a glance which event is falling behind. Track guest numbers per function too, since they rarely match.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            The <a href="/checklists/pakistani-wedding-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Pakistani & Muslim multi-day wedding checklist</a> and the <a href="/checklists/indian-wedding-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Indian wedding master checklist</a> list tasks by function. Outfit fittings and hair trials for every event also deserve a place on your milestone list, and our guides to <a href="/blog/pakistani-wedding-outfits" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Pakistani wedding outfits</a> and <a href="/blog/pakistani-wedding-hairstyles" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Pakistani wedding hairstyles</a> will help you plan them.
          </p>
        </div>

        {/* Section: Sharing Your Dashboard */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Collaboration</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sharing Your Dashboard With a Partner, Family, or Planner
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            One practical detail: the tools on this site save your progress in your browser. That keeps things simple and private, but it also means your data lives on the device and browser you used.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            If two of you are planning, pick one keeper of the dashboard and share a quick summary after each weekly review. A screenshot works fine. As with any browser-based tool, clearing your browser data can remove saved progress, so keep a printed or screenshot copy of the figures that matter most, such as your total budget and confirmed headcount.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Professionals searching for a wedding planner dashboard can use the same approach for one couple at a time. If you juggle several weddings at once, a browser-saved tool is probably better as a personal working view than as a client portfolio system.
          </p>
        </div>

        {/* Section: Common Dashboard Mistakes to Avoid */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Best Practices</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Common Dashboard Mistakes to Avoid
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Using it as a dumping ground</strong>
              <p className="text-slate-600 text-xs">If every idea becomes a task, the dashboard stops showing what's urgent. Keep inspiration in a <a href="/blog/moodboard-layout" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">wedding moodboard</a> instead.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Skipping the date</strong>
              <p className="text-slate-600 text-xs">Without a wedding date, countdowns and task sequencing can't work.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Tracking everything</strong>
              <p className="text-slate-600 text-xs">Six headline numbers beat sixty.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Never reviewing</strong>
              <p className="text-slate-600 text-xs">A dashboard only helps if you open it on a schedule.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Treating it as your contract file</strong>
              <p className="text-slate-600 text-xs">Signed contracts and receipts still need their own folder.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1">
              <strong className="text-[#1A1A1A] block">Letting RSVPs go stale</strong>
              <p className="text-slate-600 text-xs">A headcount that's three weeks old is really a guess.</p>
            </div>
          </div>
        </div>

        {/* Section: Frequently Asked Questions */}
        <div className="space-y-6 pt-6 border-t border-[#F3E8EA]">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Quick Answers</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3" id="dashboard-faq-list">
            <AccordionFaqList items={faqs} idPrefix="tool-faq" />
          </div>
        </div>

        {/* Section: Start Your Wedding Planning Dashboard Today */}
        <div className="p-8 bg-gradient-to-br from-[#FCECF0]/40 to-white rounded-3xl border border-[#F3E8EA] shadow-sm space-y-4 text-center sm:text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Get Started</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Start Your Wedding Planning Dashboard Today
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A wedding planning dashboard won't plan the wedding for you. What it does is give you one honest view of where things stand, so decisions get made on time and nothing important slips through.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Start small. Enter your date, generate your checklist, and open the free <a href="/tools/wedding-planning-dashboard" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">Wedding Planning Dashboard</a> for your first weekly review. When you want the full picture of every stage, read our <a href="/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">full wedding planning checklists guide</a>, then come back and watch the progress add up.
          </p>
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
