import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChecklistGenerator } from '@/components/tools/ChecklistGenerator';
import { AccordionFaqList } from '@/components/ui/AccordionFaqList';


export const seo = {
  title: "Free Wedding Checklist Generator | Custom Planning Tool",
  description: "Build a free, personalized wedding checklist in minutes. Enter your date to get a custom, month-by-month wedding planning checklist you can edit anytime.",
  canonical: "https://www.weddingplanningchecklists.org/tools/wedding-checklist-generator",
  image: "/images/wedding-checklist-generator-hero.jpg"
};

const breadcrumbItems = [
  { name: 'Home', item: 'https://www.weddingplanningchecklists.org' },
  { name: 'Planning Tools', item: `${'https://www.weddingplanningchecklists.org'}/tools/wedding-planning-dashboard` },
  { name: 'Wedding Checklist Generator', item: seo.canonical }
];

export const faqs = [
  {
    q: 'Is the wedding checklist generator really free?',
    a: 'Yes. The tool is completely free to use, with no account required to build or download your list.'
  },
  {
    q: 'Can I download my checklist as a PDF?',
    a: 'Yes. Once your personalized plan is generated, you can export it as a printable file, or use our printable wedding planning checklist for a formatted PDF version you can print at home.'
  },
  {
    q: 'Is there a wedding checklist Excel version?',
    a: 'The generator itself is browser-based rather than a spreadsheet, but you can export your task list and paste it into Excel or Google Sheets if you prefer working in a spreadsheet format.'
  },
  {
    q: 'How far in advance should I start planning?',
    a: 'Most couples begin twelve to eighteen months before the wedding, though the tool adjusts automatically whether you have a year to plan or just a few months left.'
  },
  {
    q: 'What should be the first item on a wedding checklist?',
    a: 'The earliest tasks are typically setting your budget, choosing your wedding date, and booking your venue, since nearly every other decision depends on these three.'
  },
  {
    q: 'Does the generator work for cultural or multi-day weddings?',
    a: 'Yes. You can add custom events, such as a mehndi, sangeet, or nikah, and the tool will schedule tasks around each one alongside your main ceremony and reception.'
  },
  {
    q: 'Can I share my plan with my partner or wedding party?',
    a: 'Yes. Your list can be shared so your partner, family, or wedding party can see upcoming tasks and deadlines without needing their own account.'
  },
  {
    q: 'Do I need a wedding checklist book if I use the generator?',
    a: 'Most couples don\'t. A book offers general advice, but the generator gives you a task list built around your actual date, budget, and venue, which a printed book cannot adjust to.'
  }
];

const combinedSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      'name': 'Wedding Checklist Generator',
      'url': seo.canonical,
      'applicationCategory': 'LifestyleApplication',
      'operatingSystem': 'Web Browser',
      'description': 'A free interactive tool that generates a personalized, month-by-month wedding checklist based on your wedding date, budget, and guest count.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'WeddingPlanningChecklists.org',
        'url': 'https://www.weddingplanningchecklists.org'
      }
    },
    {
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a
        }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbItems.map((crumb, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': crumb.name,
        'item': crumb.item
      }))
    }
  ]
});;

export default function WeddingChecklistGeneratorPage() {
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
          Free Planning Tool
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Free Wedding Checklist Generator: <span className="text-[#B76E79]">Build Your Custom Wedding Planning Checklist</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Planning a wedding means juggling dozens of moving pieces at once, and a generic list rarely fits your actual day. Our free wedding checklist generator builds a personalized plan around your wedding date, budget, and guest count, then organizes every task into a clear, month-by-month schedule. Instead of adapting someone else's timeline to your celebration, you get a list that reflects your venue, your vendors, and your priorities from the first booking to the final thank-you note.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="max-w-4xl mx-auto mb-10">
        <img
          src="/images/wedding-checklist-generator-hero.jpg"
          alt="Free wedding checklist generator shown on a tablet screen"
          className="w-full rounded-2xl shadow-lg border border-[#F3E8EA] object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <p className="text-center text-xs text-slate-500 mt-2 italic">
          Generate an interactive, date-personalized wedding planning checklist in seconds.
        </p>
      </div>

      {/* React Interactive Tool Island */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 text-center text-slate-600 text-sm leading-relaxed">
        Select your wedding date below to automatically map out your customized milestones and tasks. Your progress is saved automatically.
      </div>
      <ChecklistGenerator lang="en" />
    </section>

    {/* Comprehensive Content Guide Section */}
    <section className="py-12 bg-gradient-to-b from-white via-[#FCECF0]/20 to-white border-t border-[#F3E8EA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Section 1: What Is the Wedding Checklist Generator? */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Tool Overview</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Is the Wedding Checklist Generator?
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            The wedding checklist generator is a free interactive tool that builds a wedding checklist based on the details you enter. Tell it your wedding date and how far along you are in planning, and it maps out everything remaining, from booking your venue to confirming final headcounts with your caterer. Unlike a static wedding checklist template you print once and forget, the generator adjusts automatically. Move your wedding date, and every deadline shifts with it. Add a task specific to your celebration, such as a mehndi night or a rehearsal dinner, and it slots into the correct week alongside your other wedding planning tasks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1.5">
              <span className="text-lg">📅</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Dynamic Date Alignment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Deadlines recalculate instantly when your wedding date changes.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1.5">
              <span className="text-lg">💾</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Auto-Save Progress</h3>
              <p className="text-xs text-slate-600 leading-relaxed">All checked tasks stay stored in your browser session automatically.</p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1.5">
              <span className="text-lg">📥</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Free Instant Export</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Print or export to CSV to share with vendors, planners, and family.</p>
            </div>
          </div>
        </div>

        {/* Section 2: How the Wedding Checklist Generator Works */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Step-by-Step Guide</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              How the Wedding Checklist Generator Works
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Building your personalized plan takes just a few minutes.
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">1</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Enter your wedding date</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">The tool calculates how many months you have left and sets realistic deadlines for each task on your list.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">2</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Add your wedding details</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Guest count, budget range, and venue type help tailor which items appear.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">3</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Review your organized task list</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Items are grouped by month, from twelve months out down to wedding week.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">4</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Check off tasks as you complete them</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Your progress saves automatically, so you can return anytime without starting over.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-sm shrink-0">5</span>
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">Export or share your results</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">Download a printable version or share it with your partner, planner, or wedding party.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <img
              src="/images/how-wedding-checklist-generator-works.jpg"
              alt="Four-step process for generating a personalized wedding checklist"
              className="w-full rounded-2xl shadow-sm border border-[#F3E8EA] object-cover max-h-96"
              loading="lazy"
              decoding="async"
            />
            <p className="text-center text-xs text-slate-500 mt-2 italic">
              From entering your date to checking off completed tasks, planning is streamlined into achievable milestones.
            </p>
          </div>
        </div>

        {/* Section 3: What's Included in Your Wedding Checklist */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Task Categories</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What's Included in Your Wedding Checklist
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A complete wedding checklist should cover every category of wedding planning, not just the obvious ones. The generator organizes tasks into these core areas:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                <span>💰</span> <h3>Budget and finances</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setting your overall budget, tracking deposits, and comparing vendor quotes.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                <span>🏰</span> <h3>Venue and ceremony</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Touring venues, booking your ceremony and reception sites, and confirming rain plans.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                <span>🤝</span> <h3>Vendors and contracts</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hiring your photographer, caterer, florist, and DJ or band, plus reviewing contract terms.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                <span>💌</span> <h3>Guest list and invitations</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building your guest list, sending save-the-dates, and tracking RSVPs with our dedicated <a href="/checklists/wedding-guest-list-organizer" className="text-[#B76E79] font-semibold underline hover:text-[#a25d66]">guest list and RSVP checklist</a>.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                <span>👗</span> <h3>Attire and beauty</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choosing wedding attire, scheduling fittings, and booking hair and makeup trials.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                <span>⏱️</span> <h3>Wedding day logistics</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Finalizing your day-of timeline, transportation, and seating chart.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1 sm:col-span-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                <span>📜</span> <h3>Legal and administrative</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applying for your marriage license (be sure to consult official state and county resources such as the <a href="https://www.usa.gov/marriage-certificate" target="_blank" rel="noopener noreferrer" className="text-[#B76E79] font-semibold underline hover:text-[#a25d66]">USA.gov Marriage Records & Certificate Guide</a> for jurisdictional legal waiting periods) and handling any name-change paperwork.
              </p>
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Because the generator pulls from all of these categories at once, nothing important gets pushed to the last minute.
          </p>

          <div className="pt-2">
            <img
              src="/images/wedding-checklist-task-categories.jpg"
              alt="Icons representing wedding checklist categories like budget, venue, and guests"
              className="w-full max-w-md mx-auto rounded-2xl shadow-sm border border-[#F3E8EA] object-cover"
              loading="lazy"
              decoding="async"
            />
            <p className="text-center text-xs text-slate-500 mt-2 italic">
              Comprehensive planning coverage across budget, venue, florals, guest lists, attire, and ceremony essentials.
            </p>
          </div>
        </div>

        {/* Section 4: Generator vs. PDF, Excel, and Book Checklists */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Format Comparison</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wedding Checklist Generator vs. PDF, Excel, and Book Checklists
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Many couples start their search looking for a wedding checklist pdf, a wedding checklist Excel spreadsheet, or a printed wedding checklist book. Each format has a place, but each comes with trade-offs the generator solves.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A wedding checklist pdf or printable wedding checklist template is easy to read but has to be manually updated every time your date, budget, or guest count changes. A wedding checklist Excel file gives you more flexibility to edit rows and columns, but formulas and formatting can be easy to break, and there is no built-in deadline tracking. A wedding checklist book offers curated advice, but it is written for a generic couple rather than your specific wedding, and it cannot check off tasks or adjust when your plans do.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#FCECF0] to-white border-b border-[#F3E8EA] text-[#1A1A1A]">
                  <th className="py-3.5 px-4 font-bold">Format</th>
                  <th className="py-3.5 px-4 font-bold">Editable</th>
                  <th className="py-3.5 px-4 font-bold">Auto-Updates Deadlines</th>
                  <th className="py-3.5 px-4 font-bold">Personalized to Your Date</th>
                  <th className="py-3.5 px-4 font-bold">Free</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E8EA]">
                <tr className="hover:bg-[#FCECF0]/30 transition-colors bg-[#FCECF0]/10 font-medium">
                  <td className="py-3.5 px-4 font-bold text-[#B76E79]">Wedding Checklist Generator</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Yes</td>
                </tr>
                <tr className="hover:bg-[#FCECF0]/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#1A1A1A]">Wedding Checklist PDF</td>
                  <td className="py-3.5 px-4 text-slate-500">Limited</td>
                  <td className="py-3.5 px-4 text-rose-600">No</td>
                  <td className="py-3.5 px-4 text-rose-600">No</td>
                  <td className="py-3.5 px-4 text-slate-700">Usually</td>
                </tr>
                <tr className="hover:bg-[#FCECF0]/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#1A1A1A]">Wedding Checklist Excel Template</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Yes</td>
                  <td className="py-3.5 px-4 text-rose-600">No</td>
                  <td className="py-3.5 px-4 text-slate-500">Manual only</td>
                  <td className="py-3.5 px-4 text-slate-700">Usually</td>
                </tr>
                <tr className="hover:bg-[#FCECF0]/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#1A1A1A]">Wedding Checklist Book</td>
                  <td className="py-3.5 px-4 text-rose-600">No</td>
                  <td className="py-3.5 px-4 text-rose-600">No</td>
                  <td className="py-3.5 px-4 text-rose-600">No</td>
                  <td className="py-3.5 px-4 text-rose-600">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            If you'd still like a downloadable format for printing or sharing offline, our <a href="/checklists/printable-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">printable wedding planning checklist</a> is built for exactly that, and it pairs well with the generator for couples who want both a digital and paper copy on hand. For couples looking for an expansive overview of all checklists across every milestone, explore our <a href="/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">ultimate wedding planning checklists guide</a>.
          </p>

          <div className="pt-2">
            <img
              src="/images/digital-vs-printable-wedding-checklist.jpg"
              alt="Comparison of a printed wedding checklist versus the digital generator"
              className="w-full rounded-2xl shadow-sm border border-[#F3E8EA] object-cover max-h-96"
              loading="lazy"
              decoding="async"
            />
            <p className="text-center text-xs text-slate-500 mt-2 italic">
              A dynamic digital generator replaces cluttered notebooks with auto-updating timelines.
            </p>
          </div>
        </div>

        {/* Section 5: A Wedding Checklist for Brides, Grooms, and Wedding Planners */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">User Perspectives</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Wedding Checklist for Brides, Grooms, and Wedding Planners
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            This wedding checklist works for anyone involved in the planning process. Brides often use it to track the tasks most tied to their vision, such as attire, beauty appointments, and decor decisions. Grooms use the same plan to stay on top of shared responsibilities like vendor contracts, the marriage license, and wedding day logistics. Wedding planners managing multiple clients use the generator to build a fresh plan for each couple in minutes, then customize it around that couple's specific venue, culture, and timeline.
          </p>

          <div className="pt-2">
            <img
              src="/images/couple-using-wedding-checklist-generator.jpg"
              alt="Engaged couple reviewing their personalized wedding checklist together"
              className="w-full rounded-2xl shadow-sm border border-[#F3E8EA] object-cover max-h-96"
              loading="lazy"
              decoding="async"
            />
            <p className="text-center text-xs text-slate-500 mt-2 italic">
              Couples collaborating together keep shared vendor milestones and logistics in sync.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Multi-Day & Cultural Wedding Celebrations
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Couples planning a multi-day celebration, including Pakistani, Indian, or other South Asian weddings, can add extra events like a mehndi, sangeet, or nikah directly into their plan, so every ceremony gets its own set of tasks and deadlines instead of being squeezed into a generic template.
            </p>
            <img
              src="/images/multi-day-wedding-checklist-planning.jpg"
              alt="Planning elements for a multi-day mehndi, sangeet, and wedding celebration"
              className="w-full rounded-xl shadow-sm border border-[#F3E8EA] object-cover max-h-80"
              loading="lazy"
              decoding="async"
            />
            <p className="text-center text-xs text-slate-500 italic">
              Multi-day celebrations require custom scheduling for pre-wedding rituals, decor setup, and catering coordination.
            </p>
          </div>
        </div>

        {/* Section 6: Tips for Using Your Free Wedding Checklist Generator */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Best Practices</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tips for Using Your Free Wedding Checklist Generator
            </h2>
          </div>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            A few habits make any wedding planning list more effective:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <span className="text-sm font-bold text-[#B76E79]">01</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Update When Details Change</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Update your plan as soon as details change, especially your wedding date or guest count, so deadlines stay accurate.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <span className="text-sm font-bold text-[#B76E79]">02</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Revisit Weekly</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Revisit your list weekly rather than only when a task feels urgent, so nothing sneaks up on you.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <span className="text-sm font-bold text-[#B76E79]">03</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Delegate Responsibilities</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Group tasks by who is responsible, such as you, your partner, or a family member helping with planning.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <span className="text-sm font-bold text-[#B76E79]">04</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Connect With Your Budget</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pair your checklist with a <a href="/tools/budget-calculator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">wedding budget calculator</a> so spending decisions and tasks stay connected.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <span className="text-sm font-bold text-[#B76E79]">05</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Keep Offline Backups</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keep a printed copy on hand for vendor meetings where pulling out a phone or laptop is inconvenient.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#F3E8EA] shadow-sm space-y-1">
              <span className="text-sm font-bold text-[#B76E79]">06</span>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Set Sunday Check-Ins</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Set a recurring reminder each Sunday to check off completed items and review what's coming up next.
              </p>
            </div>
          </div>
        </div>

        {/* Section 7: Frequently Asked Questions */}
        <div className="space-y-6 pt-6 border-t border-[#F3E8EA]">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Quick Answers</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3" id="checklist-faq-list">
            <AccordionFaqList items={faqs} idPrefix="tool-faq" />
          </div>
        </div>

        {/* Section 8: Start Your Wedding Checklist Today */}
        <div className="bg-gradient-to-br from-[#1A1A1A] via-slate-900 to-[#2d2d2d] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B76E79]/10 rounded-full blur-3xl"></div>
          <div className="relative space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">Get Started</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Start Your Wedding Checklist Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A wedding checklist only works if it fits the wedding you're actually having. Enter your date above to generate a personalized checklist in minutes, then pair it with our <a href="/tools/wedding-planning-dashboard" className="text-[#D4AF37] font-bold underline hover:text-white">wedding planning dashboard</a> to track your budget, guest list, and timeline in one place.
            </p>

            <div className="max-w-xs mx-auto pt-2">
              <img
                src="/images/start-wedding-checklist-today.jpg"
                alt="Starting a new personalized wedding checklist in the free generator"
                className="w-32 h-32 rounded-2xl mx-auto shadow-lg border border-white/20 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Supporting Resources & Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-3 text-xs">
              <a href="/checklists/12-month-wedding-planning-checklist" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                12-month wedding planning checklist
              </a>
              <span className="text-slate-600">•</span>
              <a href="/checklists/wedding-guest-list-organizer" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                guest list and RSVP checklist
              </a>
              <span className="text-slate-600">•</span>
              <a href="/checklists/printable-wedding-planning-checklist" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                printable wedding planning checklist
              </a>
              <span className="text-slate-600">•</span>
              <a href="/tools/budget-calculator" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                wedding budget calculator
              </a>
              <span className="text-slate-600">•</span>
              <a href="/tools/wedding-planning-dashboard" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                wedding planning dashboard
              </a>
              <span className="text-slate-600">•</span>
              <a href="/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding" className="text-slate-300 hover:text-[#D4AF37] underline font-medium">
                ultimate wedding planning checklists guide
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
