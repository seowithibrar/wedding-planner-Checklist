import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogArticleClient from '@/components/blog/BlogArticleClient';
import { AccordionFaqList } from '@/components/ui/AccordionFaqList';
import { DEFAULT_LANGUAGE } from '@/i18n/config';

export const metadata: Metadata = {
  title: 'Pakistani Wedding Checklist: Multi-Day Muslim Wedding Guide (2026)',
  description:
    'Free Pakistani wedding checklist for Dholki, Mayun, Mehndi, Baraat, Nikkah and Walima. Track venues, vendors, outfits, budget, and guest lists day by day.',
  alternates: {
    canonical: 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist',
  },
  openGraph: {
    title: 'Pakistani Wedding Checklist: Multi-Day Muslim Wedding Guide',
    description:
      'Free Pakistani wedding checklist for Dholki, Mayun, Mehndi, Baraat, Nikkah and Walima. Track venues, vendors, outfits, budget, and guest lists day by day.',
    url: 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist',
    type: 'article',
    images: [{ url: 'https://www.weddingplanningchecklists.org/pakistani-wedding-checklist-flatlay.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pakistani Wedding Checklist: Multi-Day Muslim Wedding Guide',
    description:
      'Free Pakistani wedding checklist for Dholki, Mayun, Mehndi, Baraat, Nikkah and Walima. Track venues, vendors, outfits, budget, and guest lists day by day.',
    images: ['https://www.weddingplanningchecklists.org/pakistani-wedding-checklist-flatlay.jpg'],
  },
};

const breadcrumbItems = [
  { name: 'Home', item: 'https://www.weddingplanningchecklists.org/' },
  { name: 'Checklists', item: 'https://www.weddingplanningchecklists.org/#categorized-checklists' },
  { name: 'Pakistani & Muslim Multi-Day Wedding Checklist', item: 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist' },
];

const faqs = [
  {
    q: 'What should a Pakistani wedding checklist include?',
    a: "It should cover each function you're holding, such as Dholki, Mayun, Mehndi, Baraat, Nikkah, and Walima. For each, list the venue, guest list, menu, decor, outfits, and vendors. It should also include budget tracking, Nikkah paperwork, guest RSVPs, and a wedding-week confirmation list.",
  },
  {
    q: 'How many days does a Pakistani wedding last?',
    a: "There's no fixed length. Many families run three to five days, with events like Dholki stretching over a week or more beforehand. Smaller families may combine Mayun and Mehndi, or hold the Nikkah and Baraat on the same day.",
  },
  {
    q: 'How far in advance should I start planning?',
    a: 'Twelve months gives you room to book the best venues and vendors. If you have less time, use the 6-month or 3-month checklist and make venue and caterer decisions in the first few weeks.',
  },
  {
    q: 'What is the difference between Nikkah, Baraat, and Walima?',
    a: "The Nikkah is the Islamic marriage contract. The Baraat is the groom's procession and the bride's send-off, usually with a large dinner. The Walima is the reception hosted by the groom's family after the marriage.",
  },
  {
    q: 'Who pays for which event?',
    a: "Traditionally the bride's family hosts the Baraat and the groom's family hosts the Walima. Many families now split costs or share hosting. Agree on this early and record it, so nobody is surprised later.",
  },
  {
    q: 'What paperwork do I need for a Nikkah?',
    a: 'Typically you will need valid ID for the bride, groom, and witnesses, an agreed mahr recorded in the Nikah Nama, and a registrar or officiant. Rules vary by province and country, so confirm with your local registrar.',
  },
  {
    q: "Can I use this checklist for a Muslim wedding that isn't Pakistani?",
    a: 'Yes. This Pakistani wedding checklist shares its Nikkah, Walima, halal catering, and prayer-time planning with most Muslim weddings. Swap in your own cultural events and outfits for the rest.',
  },
  {
    q: 'Is this Pakistani wedding checklist free?',
    a: 'Yes. You can use it, print it, and pair it with our interactive planning tools at no cost.',
  },
];

const fullSchemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist#article',
      headline: 'Pakistani & Muslim Multi-Day Wedding Checklist',
      description: 'A step-by-step Pakistani wedding checklist covering Dholki, Mayun, Mehndi, Baraat, Nikkah, and Walima.',
      author: {
        '@type': 'Person',
        name: 'Sarah Jenkins',
      },
      publisher: {
        '@type': 'Organization',
        name: 'WeddingPlanningChecklists.org',
        url: 'https://www.weddingplanningchecklists.org/',
      },
      dateModified: '2026-09-25',
      mainEntityOfPage: 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist',
      image: 'https://www.weddingplanningchecklists.org/pakistani-wedding-checklist-flatlay.jpg',
      inLanguage: 'en',
    },
    {
      '@type': 'HowTo',
      '@id': 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist#howto',
      name: 'How to use the Pakistani & Muslim Multi-Day Wedding Checklist',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Complete the foundation tasks',
          text: 'Agree which functions you are holding, set the date, split the budget across events, draft a guest list per function, and book the largest venue first.',
        },
        {
          '@type': 'HowToStep',
          name: 'Work through each event',
          text: 'Move through Mangni, Dholki, Mayun, Mehndi, Baraat and Rukhsati, Nikkah, and Walima, completing the venue, menu, decor, outfit, and vendor tasks for each.',
        },
        {
          '@type': 'HowToStep',
          name: 'Lock everything down in wedding week',
          text: 'Reconfirm vendors, send final headcounts, prepare labeled payment envelopes, pack outfits per event, and print the schedule for each function.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist#faq',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.weddingplanningchecklists.org/checklists/pakistani-wedding-checklist#breadcrumb',
      itemListElement: breadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.item,
      })),
    },
  ],
};

const functionsList = [
  {
    name: 'Mangni (engagement)',
    what: 'Families formally agree to the match, rings or gifts exchanged',
    host: 'Either family',
    task: 'Deciding guest size',
  },
  {
    name: 'Dholki',
    what: 'Informal evenings of dholak, singing, and dancing at home, usually in the weeks before',
    host: 'Both families, separately',
    task: 'Schedule and food for many nights',
  },
  {
    name: 'Mayun / Ubtan',
    what: 'Bride wears yellow, ubtan is applied, often kept simple and private',
    host: "Bride's family",
    task: 'Outfit, ubtan, photographer',
  },
  {
    name: 'Mehndi',
    what: 'Henna night with music, dance, and dinner',
    host: "Bride's family, often with a separate groom-side Mehndi",
    task: 'Stage, sound, henna artists',
  },
  {
    name: 'Baraat and Rukhsati',
    what: "The groom's procession arrives, dinner is served, and the bride leaves with her new family",
    host: "Bride's family",
    task: 'Venue, catering, timing',
  },
  {
    name: 'Nikkah',
    what: 'The Islamic marriage contract, with consent, mahr, and witnesses',
    host: 'Varies: home, mosque, or the Baraat venue',
    task: 'Paperwork and officiant',
  },
  {
    name: 'Walima',
    what: 'Reception that celebrates the marriage',
    host: "Groom's family",
    task: 'Venue, menu, outfits',
  },
];

const timelinePhases = [
  { when: '9 to 12 months out', focus: 'Budget, date, event list, first guest list, book venues' },
  { when: '6 to 9 months out', focus: 'Caterer, photographer, decor, makeup artist, start outfit shopping' },
  { when: '3 to 6 months out', focus: 'Jewelry, tailoring, invitations, Nikkah paperwork, hotels for guests' },
  { when: '1 to 3 months out', focus: 'Fittings, menu tastings, RSVPs, run of show for each event' },
  { when: 'Final week', focus: 'Vendor confirmations, final headcounts, payments, emergency kit' },
];

export default function PakistaniWeddingChecklistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchemaGraph) }}
      />

      {/* Reading Progress Indicator */}
      <div id="reading-progress" className="reading-progress-bar" style={{ width: '0%' }} />

      <Header lang={DEFAULT_LANGUAGE} />

      <main className="flex-grow">
        {/* Breadcrumb Navigation */}
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            {breadcrumbItems.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <span aria-hidden="true" className="text-slate-300">/</span>}
                {idx === breadcrumbItems.length - 1 ? (
                  <span className="font-semibold text-[#B76E79]">{crumb.name}</span>
                ) : (
                  <Link href={crumb.item} className="hover:text-[#B76E79] transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Hero Section */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-12">
          <header className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#FCECF0] text-[#B76E79] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>🕌</span>
              <span>Cultural & Multi-Day Master Checklist</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] leading-tight tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pakistani & Muslim Multi-Day Wedding Checklist
            </h1>

            {/* Author / Publication Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-2 border-y border-slate-100 py-3">
              <span className="font-semibold text-slate-700">By Sarah Jenkins</span>
              <span>•</span>
              <span>Updated September 25, 2026</span>
              <span>•</span>
              <span className="text-[#B76E79] font-medium">100% Free Complete Planning Guide</span>
            </div>

            {/* 100-word opening summary */}
            <div className="bg-[#FAF7F5] border border-[#F3E8EA] p-6 rounded-3xl text-left text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
              <p>
                This Pakistani &amp; Muslim Multi-Day Wedding Checklist walks you through every function, from Dholki and Mayun to Mehndi, Baraat, Nikkah, and Walima. Use this Pakistani wedding checklist to track venues, guest lists, catering, bridal jewelry, outfit fittings, henna artists, stage decor, and vendor deposits in one place. It suits brides, grooms, and families planning a South Asian or Muslim wedding across several days. Follow the phases, tick tasks off as you go, and pair it with our free{' '}
                <Link href="/tools/wedding-planning-dashboard" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                  Wedding Planning Dashboard
                </Link>{' '}
                to keep your Pakistani wedding planning organized, on budget, and calm from the first deposit to the Walima.
              </p>
            </div>

            {/* Hero Image */}
            <figure className="rounded-3xl overflow-hidden border border-[#F3E8EA] shadow-xl mt-6">
              <img
                src="/pakistani-wedding-checklist-flatlay.jpg"
                alt="Pakistani wedding checklist notebook with henna cone and gold bangles"
                className="w-full h-auto object-cover max-h-[500px]"
                loading="eager"
                fetchPriority="high"
              />
              <figcaption className="p-3 bg-white text-xs text-slate-500 border-t border-slate-100 text-center">
                Flat-lay planning setup with wedding checklist notebook, henna cone, gold bangles, and marigolds.
              </figcaption>
            </figure>
          </header>

          {/* Section: What Is a Pakistani Wedding Checklist? */}
          <section className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Is a Pakistani Wedding Checklist?
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              A Pakistani wedding checklist is a task list built around how Pakistani and Muslim weddings actually run: several events over several days, each with its own venue, guest list, menu, outfit, and vendors. A standard{' '}
              <Link href="/checklists/12-month-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                12-month wedding planning checklist
              </Link>{' '}
              assumes one ceremony and one party. Yours has six or seven.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              That changes the work. You aren't planning one wedding, you're planning a small festival, and the tasks overlap. The henna artist you book for Mehndi needs to know the Baraat date. The tailor stitching your Walima outfit is also stitching your Mayun yellow.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Use this Pakistani wedding checklist in three passes. Start with the foundation tasks below. Then work through each event. Finally, use the wedding-week list to lock everything down. Every family runs things a little differently, so treat this as a solid base and add your own customs.
            </p>
          </section>

          {/* Section: Pakistani Wedding Checklist: The Functions at a Glance */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pakistani Wedding Checklist: The Functions at a Glance
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Not every family holds every function. A Punjabi family, a Pashtun family, and a Muhajir family may each add, merge, or skip events. Here is the usual line-up.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FCECF0] text-[#1A1A1A] font-bold border-b border-[#F3E8EA]">
                  <tr>
                    <th className="p-3.5 sm:p-4">Function</th>
                    <th className="p-3.5 sm:p-4">What it is</th>
                    <th className="p-3.5 sm:p-4">Commonly hosted by</th>
                    <th className="p-3.5 sm:p-4">Biggest planning task</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {functionsList.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-[#B76E79] whitespace-nowrap">{row.name}</td>
                      <td className="p-3.5 sm:p-4 text-slate-700">{row.what}</td>
                      <td className="p-3.5 sm:p-4 text-slate-600">{row.host}</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-800">{row.task}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Infographic Image */}
            <figure className="rounded-3xl overflow-hidden border border-[#F3E8EA] shadow-md my-6 max-w-xl mx-auto">
              <img
                src="/pakistani-wedding-functions-checklist.jpg"
                alt="Illustrated sequence of Pakistani wedding functions from Dholki to Walima"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <figcaption className="p-3 bg-white text-xs text-slate-500 border-t border-slate-100 text-center">
                Illustrated sequence of Pakistani wedding functions from Dholki to Walima.
              </figcaption>
            </figure>
          </section>

          {/* Section: When to Start Your Pakistani Wedding Checklist */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              When to Start Your Pakistani Wedding Checklist
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Twelve months is comfortable. Six months is workable. Three months is possible if you decide fast and book early. Pick the{' '}
              <Link href="/checklists/18-month-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">18-month</Link>,{' '}
              <Link href="/checklists/12-month-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">12-month</Link>,{' '}
              <Link href="/checklists/6-month-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">6-month</Link>, or{' '}
              <Link href="/checklists/3-month-wedding-planning-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">3-month</Link>{' '}
              master checklist that matches your runway, then layer this page on top for the cultural tasks.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Two calendar points catch people out. First, Islamic dates move about ten or eleven days earlier each year on the Gregorian calendar, so a date that worked last year may land in Ramadan this year. Many families also avoid Ramadan and Muharram for wedding events, so ask your elders early. Second, in many cities the winter months are popular for weddings, and good halls book out well ahead.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
              Here is a simple phase guide:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#F3E8EA] shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF7F5] text-[#1A1A1A] font-bold border-b border-[#F3E8EA]">
                  <tr>
                    <th className="p-3.5 sm:p-4 w-1/3">When</th>
                    <th className="p-3.5 sm:p-4">Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {timelinePhases.map((phase, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-[#B76E79]">{phase.when}</td>
                      <td className="p-3.5 sm:p-4 text-slate-700">{phase.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              If you'd rather see the whole runway as a sequence, our{' '}
              <Link href="/blog/14-month-wedding-planning-timeline" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                14-month wedding planning timeline
              </Link>{' '}
              shows how the tasks stack up week by week.
            </p>
          </section>

          {/* Section: Foundation */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Early Planning Phase</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Pakistani Wedding Checklist Foundation: Your First 30 Days
              </h2>
            </div>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              These decisions shape everything after them. Get them settled before you pay a single deposit.
            </p>

            <div className="bg-white rounded-2xl border border-[#F3E8EA] p-6 shadow-sm space-y-3.5">
              {[
                'Agree which functions you\'re holding and who hosts each one',
                'Choose a date after checking family calendars, Ramadan, Muharram, exams, and weather',
                'Set a total budget, then split it across events',
                'Draft a guest list for each function, not just one master list',
                'Name one point person on each side of the family',
                'Shortlist venues and book the biggest one first, usually the Baraat hall',
                'Decide whether you\'ll hire a wedding planner or coordinate through family',
                'Open a shared folder for contracts, receipts, and quotes',
              ].map((task, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-sm sm:text-base text-slate-700">{task}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Put your working budget into the{' '}
              <Link href="/tools/budget-calculator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                wedding budget calculator
              </Link>{' '}
              early. It's far easier to adjust a plan than to explain an overspend to two families.
            </p>
          </section>

          {/* Section: Event-by-Event */}
          <section className="space-y-10 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Event-by-Event Pakistani Wedding Checklist
            </h2>

            {/* Mangni */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#B76E79]">1.</span> Mangni (Engagement)
              </h3>
              <div className="bg-slate-50/60 rounded-2xl border border-[#F3E8EA] p-5 space-y-3">
                {[
                  'Confirm the date with both families and pick a venue or home',
                  'Fix the guest list, keeping it close family only if you can',
                  'Arrange rings, sweets, and gift exchanges',
                  'Plan outfits so the photographs suit both sides',
                  'Book a photographer if you want the day documented',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#F3E8EA] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dholki */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#B76E79]">2.</span> Dholki
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Dholki tends to grow. What starts as a few evenings with cousins can become two weeks of nightly gatherings. Decide the number of nights early.
              </p>
              <div className="bg-slate-50/60 rounded-2xl border border-[#F3E8EA] p-5 space-y-3">
                {[
                  'Fix a schedule and a rotation between homes',
                  'Arrange a dholak, speakers, and a playlist of songs the family knows',
                  'Plan snacks and chai for each night so nobody scrambles',
                  'Assign someone to collect and coordinate the songs and performances',
                  'Set clear end times, especially when neighbors are close by',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#F3E8EA] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mayun / Ubtan */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#B76E79]">3.</span> Mayun / Ubtan
              </h3>
              <div className="bg-slate-50/60 rounded-2xl border border-[#F3E8EA] p-5 space-y-3">
                {[
                  'Buy or book the yellow outfit and matching accessories',
                  'Prepare or order the ubtan and confirm any skin sensitivities beforehand',
                  'Decide who is in the room and who isn\'t',
                  'Arrange yellow floral decor, marigolds, and seating',
                  'Book a photographer, or ask a relative if it\'s a small gathering',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#F3E8EA] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
              <figure className="rounded-2xl overflow-hidden border border-[#F3E8EA] shadow-sm my-4">
                <img
                  src="/mayun-ubtan-setup.jpg"
                  alt="Mayun setup with yellow dupatta, marigolds and ubtan bowl"
                  className="w-full h-auto object-cover max-h-[420px]"
                  loading="lazy"
                />
                <figcaption className="p-2.5 bg-white text-xs text-slate-500 text-center">
                  Mayun setup with yellow dupatta, marigolds, and traditional ubtan paste.
                </figcaption>
              </figure>
            </div>

            {/* Mehndi */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#B76E79]">4.</span> Mehndi
              </h3>
              <div className="bg-slate-50/60 rounded-2xl border border-[#F3E8EA] p-5 space-y-3">
                {[
                  'Book the venue, stage designer, and sound system',
                  'Hire a henna artist for the bride and separate artists for guests if needed',
                  'Confirm dance performances and rehearsal times',
                  'Plan the menu and a chai or dessert counter',
                  'Finalize the Mehndi outfits, often in green, yellow, or bright colors',
                  'Prepare the mehndi thaals and small favors',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#F3E8EA] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
              <figure className="rounded-2xl overflow-hidden border border-[#F3E8EA] shadow-sm my-4">
                <img
                  src="/mehndi-ceremony-tradition.jpg"
                  alt="Bridal henna hands holding a decorated mehndi thaal"
                  className="w-full h-auto object-cover max-h-[420px]"
                  loading="lazy"
                />
                <figcaption className="p-2.5 bg-white text-xs text-slate-500 text-center">
                  Mehndi celebration decor and bridal henna detailing.
                </figcaption>
              </figure>
            </div>

            {/* Baraat and Rukhsati */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#B76E79]">5.</span> Baraat and Rukhsati
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                This is usually the largest event, so it needs the most lead time.
              </p>
              <div className="bg-slate-50/60 rounded-2xl border border-[#F3E8EA] p-5 space-y-3">
                {[
                  'Confirm venue capacity, stage, parking, and separate entrances if required',
                  'Lock the menu, tasting date, and serving schedule',
                  'Arrange the groom\'s arrival: car, flowers, and any band or dhol',
                  'Plan the Rukhsati moment with the photographer and family',
                  'Prepare bridal transport and a car for the couple\'s departure',
                  'Assign family members to greet guests and manage seating',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#F3E8EA] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nikkah */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#B76E79]">6.</span> Nikkah
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The Nikkah is the religious and legal heart of the wedding, so keep it on the checklist even if it feels quiet next to the parties.
              </p>
              <div className="bg-slate-50/60 rounded-2xl border border-[#F3E8EA] p-5 space-y-3">
                {[
                  'Choose the date, time, and place: home, mosque, or the wedding venue',
                  'Confirm the nikah khwan or officiant',
                  'Agree on the mahr in advance and have it written into the Nikah Nama',
                  'Arrange two adult Muslim witnesses, following your family\'s tradition',
                  'Bring CNICs or valid ID for the bride, groom, and witnesses',
                  'Plan the moment for consent (ijab and qubool) and the dua afterward',
                  'Check local registration requirements, because these differ by province and country',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#F3E8EA] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                If you're marrying abroad, also check whether your Nikkah is legally recognized where you live, or whether a separate civil registration is needed. Ask the registrar directly rather than relying on a cousin's memory.
              </p>
              <figure className="rounded-2xl overflow-hidden border border-[#F3E8EA] shadow-sm my-4">
                <img
                  src="/pakistani-indian-wedding-planning-checklist.jpg"
                  alt="Nikkah paperwork with pen, rose petals and Quran on a stand"
                  className="w-full h-auto object-cover max-h-[420px]"
                  loading="lazy"
                />
                <figcaption className="p-2.5 bg-white text-xs text-slate-500 text-center">
                  Nikkah ceremony preparation, contract signing, and witness documentation.
                </figcaption>
              </figure>
            </div>

            {/* Walima */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#B76E79]">7.</span> Walima
              </h3>
              <div className="bg-slate-50/60 rounded-2xl border border-[#F3E8EA] p-5 space-y-3">
                {[
                  'Confirm the venue, menu, and guest count, which is usually smaller than the Baraat',
                  'Arrange the couple\'s outfits, often in softer shades',
                  'Plan the stage, seating, and the couple\'s entrance',
                  'Coordinate with the groom\'s family on hosting duties',
                  'Book the photographer for family portraits',
                ].map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-white border border-[#F3E8EA] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Pakistani Bridal and Groom Attire Checklist */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pakistani Bridal and Groom Attire Checklist
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Attire eats more time than people expect. A bridal outfit can take months to design, embroider, and fit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bride */}
              <div className="bg-[#FAF7F5] rounded-3xl p-6 border border-[#F3E8EA] space-y-4">
                <h3 className="text-lg font-bold text-[#B76E79] uppercase tracking-wide flex items-center gap-2">
                  <span>👗</span> For the bride
                </h3>
                <div className="space-y-3">
                  {[
                    'Order the Baraat lehnga, gharara, or sharara early',
                    'Choose separate outfits for Mayun, Mehndi, Nikkah, and Walima',
                    'Schedule at least two fittings, and one final fitting near the date',
                    'Confirm dupattas, blouses, and any custom embroidery',
                    'Buy or rent the jewelry sets: gold, kundan, tikka, jhoomar, matha patti',
                    'Arrange safe storage and insurance for valuable pieces',
                    'Book a makeup and hairstyle trial',
                    'Select your wedding styling look from expert curated Pakistani wedding guides',
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#B76E79] font-bold mt-0.5">✓</span>
                      <span className="text-xs sm:text-sm text-slate-700">{task}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#F3E8EA] text-xs text-slate-600 space-y-1.5">
                  <p>
                    Book a makeup and hairstyle trial, then choose the final look from our{' '}
                    <Link href="/blog/pakistani-wedding-hairstyles" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                      Pakistani wedding hairstyles
                    </Link>{' '}
                    guide.
                  </p>
                  <p>
                    Browse ideas in our{' '}
                    <Link href="/blog/pakistani-wedding-outfits" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                      Pakistani wedding outfits for brides
                    </Link>{' '}
                    article.
                  </p>
                </div>
              </div>

              {/* Groom */}
              <div className="bg-[#FAF7F5] rounded-3xl p-6 border border-[#F3E8EA] space-y-4">
                <h3 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-wide flex items-center gap-2">
                  <span>🤵</span> For the groom
                </h3>
                <div className="space-y-3">
                  {[
                    'Order the sherwani, kulla or turban, and khussa for the Baraat',
                    'Choose a waistcoat or prince coat for the Walima',
                    'Plan Mehndi and Mayun outfits that coordinate with the bride',
                    'Schedule tailoring appointments with buffer time for alterations',
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-slate-800 font-bold mt-0.5">✓</span>
                      <span className="text-xs sm:text-sm text-slate-700">{task}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#F3E8EA] text-xs text-slate-600">
                  <p>
                    Pack a{' '}
                    <Link href="/checklists/bridal-emergency-kit-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                      bridal emergency kit
                    </Link>{' '}
                    for each event. Safety pins, tissues, blotting sheets, and a sewing kit have saved many a Baraat.
                  </p>
                </div>
              </div>
            </div>

            <figure className="rounded-2xl overflow-hidden border border-[#F3E8EA] shadow-sm my-4">
              <img
                src="/pakistani-wedding-outfits-hero.jpg"
                alt="Pakistani bridal outfit and kundan jewelry laid out for the Baraat"
                className="w-full h-auto object-cover max-h-[460px]"
                loading="lazy"
              />
              <figcaption className="p-2.5 bg-white text-xs text-slate-500 text-center">
                Pakistani bridal outfit and kundan jewelry laid out for the Baraat.
              </figcaption>
            </figure>
          </section>

          {/* Section: Vendor Checklist */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Vendor Checklist
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Multi-day weddings mean many contracts, so vendors sit near the top of any Pakistani wedding checklist, and the wrong booking order creates problems. Our{' '}
              <Link href="/checklists/wedding-vendor-booking-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                vendor booking order and contract checklist
              </Link>{' '}
              covers the full sequence. For a Pakistani wedding, these are the vendors that matter most:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm">
              {[
                'Venue or marquee for each function',
                'Caterer with halal certification and a menu tasting',
                'Photographer and videographer, ideally booked for all events',
                'Stage and decor designer',
                'Makeup artist and hairstylist, including a female team if your family prefers',
                'Henna artist for Mehndi',
                'Dholak performers, DJ, or sound provider',
                'Invitation designer and printer',
                'Transport for the Baraat, bridal car, and guest shuttles',
              ].map((vendor, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-2xl border border-[#F3E8EA] shadow-xs flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#FCECF0] text-[#B76E79] flex items-center justify-center font-bold text-[10px] shrink-0">✓</span>
                  <span className="text-slate-700 font-medium">{vendor}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              When you sign, check the deposit amount, the cancellation terms, overtime charges, and the exact dates listed. A contract that names only one event can leave you exposed on the others.
            </p>
          </section>

          {/* Section: Budget Across Multiple Events */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Budget Across Multiple Events
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              The mistake most couples make is budgeting for the Baraat and forgetting everything else. Dholki nights, Mayun, and the Nikkah look small, but the costs add up.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              A good Pakistani wedding checklist gives every function its own budget line. Set a ceiling for each function, then keep a buffer of around ten percent for surprises. Log every deposit the day you pay it. If your total is fixed, use the{' '}
              <Link href="/tools/budget-calculator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                wedding budget calculator
              </Link>{' '}
              to see where the split leaves you, or start from the nearest tier:{' '}
              <Link href="/checklists/wedding-budget-calculator-10k" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">$10,000</Link>,{' '}
              <Link href="/checklists/wedding-budget-calculator-20k" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">$20,000</Link>,{' '}
              <Link href="/checklists/wedding-budget-calculator-30k" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">$30,000</Link>, or{' '}
              <Link href="/checklists/wedding-budget-calculator-50k" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">$50,000+</Link>. For trimming costs without ruining the day, our{' '}
              <Link href="/blog/wedding-budget-tips" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                wedding budget tips
              </Link>{' '}
              are a good next read.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Agree early on who pays for what. Traditionally the bride's family hosts the Baraat and the groom's family hosts the Walima, though many families now share costs. Have that conversation once, calmly, and write it down.
            </p>
          </section>

          {/* Section: Guest List, RSVPs, and Seating */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Guest List, RSVPs, and Seating
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Pakistani weddings often carry large guest lists, and each event has a different one, so your Pakistani wedding checklist should track them separately. The Baraat might include extended family and neighbors. The Walima might include colleagues. The Mayun might be twelve people.
            </p>

            <div className="bg-white rounded-2xl border border-[#F3E8EA] p-6 shadow-sm space-y-3">
              {[
                'Build a separate list for every function',
                'Track each guest\'s RSVP per event, not overall',
                'Note dietary needs and accessibility needs for elderly relatives',
                'Decide on seating style: mixed, separate, or family-based',
                'Book hotel blocks for out-of-town guests',
                'Assign someone to follow up on missing RSVPs',
              ].map((task, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-slate-700">{task}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              The{' '}
              <Link href="/tools/guest-list-manager" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                guest list manager
              </Link>{' '}
              handles the tracking, and our{' '}
              <Link href="/blog/perfect-guest-list-guide" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                wedding guest list and seating chart guide
              </Link>{' '}
              explains how to structure the lists. For the full task sequence, see the{' '}
              <Link href="/checklists/wedding-guest-list-organizer" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                guest list and RSVP master checklist
              </Link>.
            </p>
          </section>

          {/* Section: Food, Catering, and Prayer Timing */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Food, Catering, and Prayer Timing
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Food is the center of a Pakistani wedding, and guests will remember the menu more than the flowers. Book a tasting at least six weeks before the first event.
            </p>

            <div className="bg-white rounded-2xl border border-[#F3E8EA] p-6 shadow-sm space-y-3">
              {[
                'Confirm that the caterer is halal and can handle your guest count',
                'Choose a menu with traditional mains such as biryani and korma, plus BBQ, naan, and desserts like kheer',
                'Plan a chai or Kashmiri chai station for late evenings',
                'Ask about vegetarian and allergy options',
                'Agree on serving times, so the main dish doesn\'t arrive at midnight',
              ].map((task, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-slate-700">{task}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Prayer times deserve a line on the schedule too. If an event runs through Maghrib or Isha, leave a gap and set aside a clean prayer space. Guests notice it, and they appreciate it.
            </p>
          </section>

          {/* Section: Venue and Decor */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Venue and Decor
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Choose the venue by capacity, parking, kitchen access, and how easily the bride's party can enter without crossing the crowd. Our guide to{' '}
              <Link href="/blog/how-to-choose-wedding-venue" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                choosing the perfect wedding venue
              </Link>{' '}
              lists the questions to ask before you sign. For stage design, florals, and lighting, use the{' '}
              <Link href="/checklists/wedding-decor-flowers-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                decor and floral checklist
              </Link>, and build a{' '}
              <Link href="/blog/moodboard-layout" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                moodboard
              </Link>{' '}
              so every function feels connected without looking identical.
            </p>
          </section>

          {/* Section: Wedding Week and Day-Of Checklist */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Wedding Week and Day-Of Checklist
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              The last seven days of your Pakistani wedding checklist are about confirmation, not new decisions.
            </p>

            <div className="bg-white rounded-2xl border border-[#F3E8EA] p-6 shadow-sm space-y-3">
              {[
                'Reconfirm every vendor with time, address, and contact number',
                'Send final headcounts to caterers and venues',
                'Prepare labeled envelopes for final vendor payments',
                'Pack outfits, jewelry, and accessories for each event in separate bags',
                'Print the schedule for each function and give copies to your point people',
                'Charge phones, cameras, and power banks',
                'Rest. Sleep matters more than one more decor tweak',
              ].map((task, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-slate-700">{task}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Build the run of show with the{' '}
              <Link href="/tools/timeline-generator" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                day-of timeline generator
              </Link>, and use the{' '}
              <Link href="/checklists/wedding-day-of-timeline-checklist" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                day-of schedule and timeline checklist
              </Link>{' '}
              as a cross-check. Put your first event date into the{' '}
              <Link href="/tools/wedding-countdown" className="text-[#B76E79] font-bold underline hover:text-[#a25d66]">
                wedding countdown
              </Link>{' '}
              so the whole family sees the same number of days left.
            </p>

            <figure className="rounded-2xl overflow-hidden border border-[#F3E8EA] shadow-sm my-4">
              <img
                src="/wedding-countdown-timer-calendar.jpg"
                alt="Wedding week checklist with labeled vendor envelopes and countdown"
                className="w-full h-auto object-cover max-h-[440px]"
                loading="lazy"
              />
              <figcaption className="p-2.5 bg-white text-xs text-slate-500 text-center">
                Wedding week checklist with labeled vendor envelopes and live countdown.
              </figcaption>
            </figure>
          </section>

          {/* Section: Common Pakistani Wedding Planning Mistakes to Avoid */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Common Pakistani Wedding Planning Mistakes to Avoid
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Booking one venue and stopping', desc: 'Every function needs a confirmed place and date.' },
                { title: 'Skipping the Nikkah paperwork', desc: 'Check forms, ID, and registration well ahead.' },
                { title: 'Leaving tailoring late', desc: 'Bridal work often needs several months and multiple fittings.' },
                { title: 'No single point of contact', desc: 'Two families giving contradictory instructions to a caterer is a recipe for stress.' },
                { title: 'Forgetting small events in the budget', desc: 'Dholki and Mayun spending is easy to ignore until the bills arrive.' },
                { title: 'Ignoring out-of-town guests', desc: 'Hotels, transport, and directions need planning too.' },
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm space-y-1.5">
                  <h3 className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                    <span className="text-rose-500 font-bold">✕</span> {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Frequently Asked Questions */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Quick Answers</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h2>
            </div>
            <AccordionFaqList items={faqs} idPrefix="pakistani-wedding-faq" />
          </section>

          {/* Section: Start Your Pakistani Wedding Checklist Today */}
          <section className="bg-gradient-to-br from-[#1A1A1A] via-slate-900 to-[#2d2d2d] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden mt-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B76E79]/15 rounded-full blur-3xl" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">Get Started Now</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Start Your Pakistani Wedding Checklist Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A multi-day wedding feels huge until it's written down. Once every function has a date, a venue, an owner, and a budget line, the pile turns into a plan.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Keep your Pakistani wedding checklist in one place: start with the foundation tasks, move through your events one at a time, and keep everything in one place. Open the{' '}
                <Link href="/tools/wedding-planning-dashboard" className="text-[#D4AF37] underline font-semibold hover:text-white">
                  Wedding Planning Dashboard
                </Link>{' '}
                to track tasks live, or generate a personalized list with the{' '}
                <Link href="/tools/wedding-checklist-generator" className="text-[#D4AF37] underline font-semibold hover:text-white">
                  wedding checklist generator
                </Link>. Then explore the wider{' '}
                <Link href="/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding" className="text-[#D4AF37] underline font-semibold hover:text-white">
                  Wedding Planning Checklists guide
                </Link>{' '}
                for everything else on your list.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href="/tools/wedding-planning-dashboard"
                  className="bg-[#B76E79] hover:bg-[#a25d66] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md"
                >
                  Open Planning Dashboard →
                </Link>
                <Link
                  href="/tools/wedding-checklist-generator"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full text-xs font-bold transition-all"
                >
                  Generate Custom Checklist
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer lang={DEFAULT_LANGUAGE} />
      <BlogArticleClient />
    </div>
  );
}
