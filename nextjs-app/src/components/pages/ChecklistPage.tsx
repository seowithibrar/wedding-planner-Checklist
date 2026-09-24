import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import checklistsData from '@/data/categorized-checklists.json';
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema } from '@/lib/schema';
import { useTranslations, localizeUrl, SITE_URL } from '@/i18n/utils';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';

export interface ChecklistItemData {
  slug: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  icon: string;
  badge: string;
  keyTakeaways: string[];
}

export interface ChecklistPageProps {
  checklist: ChecklistItemData;
  lang?: string;
}

export default function ChecklistPage({
  checklist,
  lang = DEFAULT_LANGUAGE,
}: ChecklistPageProps) {
  const currentLang = (lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const { common, checklists } = useTranslations(currentLang);

  const canonicalUrl =
    currentLang === DEFAULT_LANGUAGE
      ? `${SITE_URL}/checklists/${checklist.slug}`
      : `${SITE_URL}/${currentLang}/checklists/${checklist.slug}`;

  const breadcrumbItems = [
    { name: common.nav.home, item: localizeUrl('/', currentLang) },
    { name: 'Checklists', item: localizeUrl('/#categorized-checklists', currentLang) },
    { name: checklist.title, item: canonicalUrl },
  ];

  const faqs = [
    {
      q: `How do I use the ${checklist.title}?`,
      a: `Start by reviewing the key takeaways and timeline stages outlined in this guide. Combine it with our free interactive tools to track your RSVPs, budget, and daily to-do lists.`,
    },
    {
      q: `Is the ${checklist.title} completely free?`,
      a: `Yes! All checklist templates and interactive planning tools on WeddingPlanningChecklists.org are 100% free to access, download, and print.`,
    },
    {
      q: `Can I customize this checklist for my wedding style?`,
      a: `Absolutely. You can tailor every task by using our interactive Wedding Task Generator and Dashboard to add or remove custom items.`,
    },
  ];

  const articleSchema = generateArticleSchema({
    title: checklist.title,
    description: checklist.description,
    url: canonicalUrl,
    image: `${SITE_URL}/favicon.png`,
    datePublished: '2026-01-01',
    dateModified: '2026-09-06',
    authorName: 'Sarah Jenkins',
  });

  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const combinedSchema = `[${[articleSchema, faqSchema, breadcrumbSchema].filter(Boolean).join(',')}]`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combinedSchema }}
      />

      <Header lang={currentLang} />

      <main className="space-y-12 flex-grow">
        {/* Breadcrumbs */}
        <nav className="max-w-[1300px] mx-auto px-4 pt-6 text-xs text-slate-500 flex items-center gap-2">
          <a href={localizeUrl('/', currentLang)} className="hover:text-[#B76E79]">
            {common.nav.home}
          </a>
          <span>/</span>
          <a href={localizeUrl('/#categorized-checklists', currentLang)} className="hover:text-[#B76E79]">
            Checklists
          </a>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{checklist.title}</span>
        </nav>

        {/* Page Header Hero */}
        <header className="max-w-[1300px] mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FCECF0] text-[#B76E79] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>{checklist.icon}</span>
            <span>{checklist.category} Guide</span>
            <span>•</span>
            <span>{checklist.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
            {checklist.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {checklist.description}
          </p>

          {currentLang !== DEFAULT_LANGUAGE && (
            <div className="inline-flex items-center gap-2 bg-white border border-[#F3E8EA] px-4 py-1.5 rounded-full text-xs text-slate-600 shadow-sm">
              <span>🌐</span>
              <span>{common.ui.translationNotice}</span>
            </div>
          )}

          {/* Authorship & Date Meta */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2">
            <span className="inline-flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#B76E79] text-white flex items-center justify-center font-bold text-[9px]">
                SJ
              </div>
              {common.ui.by} <strong className="text-[#1A1A1A]">Sarah Jenkins</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span>{common.ui.updated}: September 6, 2026</span>
          </div>
        </header>

        {/* Main Content Grid */}
        <section className="max-w-[1300px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <article className="lg:col-span-2 bg-white rounded-3xl border border-[#F3E8EA] p-6 sm:p-10 shadow-sm space-y-8">
            {checklist.slug === '12-month-wedding-planning-checklist' && (
              <div className="bg-gradient-to-r from-[#FCECF0]/60 to-white border border-[#F3E8EA] p-4 rounded-2xl text-xs sm:text-sm text-slate-600 flex items-center gap-2.5 shadow-xs">
                <span className="text-[#B76E79] font-bold">💡 Tip:</span>
                <span>
                  Planning on an accelerated or custom timeline? Learn{' '}
                  <a
                    href={localizeUrl('/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding', currentLang)}
                    className="text-[#B76E79] font-bold hover:underline"
                  >
                    how to choose the right wedding checklist
                  </a>{' '}
                  for your target wedding date.
                </span>
              </div>
            )}

            {/* Summary Box */}
            <div className="bg-[#FCECF0]/30 border border-[#B76E79]/20 p-6 rounded-2xl space-y-2">
              <h2 className="text-lg font-bold text-[#B76E79]">{checklists.overviewTitle || 'Overview'}</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{checklist.summary}</p>
            </div>

            {/* Key Takeaways & Stages */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">Key Execution Steps & Stages</h2>
              <div className="space-y-3">
                {checklist.keyTakeaways.map((takeaway: string, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#B76E79] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-[#F3E8EA]" />

            {/* Deep Dive Guidance */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1A1A1A]">Pro Tips for Using This Checklist</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Organizing your wedding with a dedicated checklist ensures peace of mind. Combine this guide with our interactive planning tools to assign priorities, set deadlines, and track vendor budgets automatically.
              </p>
              <ul className="list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-2 text-sm text-slate-600">
                <li>
                  <strong>Set Clear Priorities:</strong> Focus 60% of your initial planning time on the venue, caterer, and photographer.
                </li>
                <li>
                  <strong>Keep Budgets Updated:</strong> Log every deposit immediately to prevent unexpected cost overruns.
                </li>
                <li>
                  <strong>Delegate Tasks:</strong> Assign specific checklist items to your partner, maid of honor, or family members.
                </li>
              </ul>
            </div>

            {/* FAQs */}
            <div className="space-y-4 pt-4 border-t border-[#F3E8EA]">
              <h2 className="text-xl font-bold text-[#1A1A1A]">{common.ui.faqs}</h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl space-y-1">
                    <h3 className="font-bold text-sm text-[#1A1A1A]">{faq.q}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar Column */}
          <aside className="space-y-6">
            {/* Interactive Tool CTA Box */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white rounded-3xl p-6 shadow-md space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E79] bg-[#FCECF0]/20 px-2.5 py-1 rounded-full">
                {common.ui.freePlanningTool}
              </span>
              <h3 className="text-xl font-bold">Track This Checklist Live</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use our interactive Wedding Planning Dashboard to check off tasks, track RSVPs, and save your progress in real-time.
              </p>
              <a
                href={localizeUrl('/tools/wedding-planning-dashboard', currentLang)}
                className="block text-center bg-[#B76E79] hover:bg-[#a25d66] text-white font-bold py-3 px-4 rounded-full text-xs transition-all shadow-md"
              >
                {common.buttons.useTool} →
              </a>
            </div>

            {/* Quick Tools Links */}
            <div className="bg-white rounded-3xl border border-[#F3E8EA] p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#1A1A1A]">Related Planning Tools</h3>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <a
                    href={localizeUrl('/tools/guest-list-manager', currentLang)}
                    className="text-slate-600 hover:text-[#B76E79] flex items-center justify-between py-1.5 border-b border-slate-100"
                  >
                    <span>👥 {common.nav.guestList}</span>
                    <span className="rtl-flip">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href={localizeUrl('/tools/budget-calculator', currentLang)}
                    className="text-slate-600 hover:text-[#B76E79] flex items-center justify-between py-1.5 border-b border-slate-100"
                  >
                    <span>💰 {common.nav.budgetCalculator}</span>
                    <span className="rtl-flip">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href={localizeUrl('/tools/timeline-generator', currentLang)}
                    className="text-slate-600 hover:text-[#B76E79] flex items-center justify-between py-1.5 border-b border-slate-100"
                  >
                    <span>📅 {common.footer.timelineGenerator}</span>
                    <span className="rtl-flip">→</span>
                  </a>
                </li>
                <li>
                  <a
                    href={localizeUrl('/tools/wedding-countdown', currentLang)}
                    className="text-slate-600 hover:text-[#B76E79] flex items-center justify-between py-1.5"
                  >
                    <span>⏰ {common.footer.weddingCountdown}</span>
                    <span className="rtl-flip">→</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        {/* Related Checklists Navigation */}
        <section className="max-w-[1300px] mx-auto px-4 py-8">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A1A]">Explore Other Categorized Checklists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {checklistsData.checklists
                .filter(c => c.slug !== checklist.slug)
                .slice(0, 4)
                .map(item => (
                  <a
                    key={item.slug}
                    href={localizeUrl(`/checklists/${item.slug}`, currentLang)}
                    className="bg-white rounded-2xl p-4 border border-[#F3E8EA] shadow-sm hover:border-[#B76E79]/40 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-[10px] font-bold text-[#B76E79] uppercase">{item.category}</span>
                    </div>
                    <h3 className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
