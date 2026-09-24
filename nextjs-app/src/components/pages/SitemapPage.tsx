import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import categorizedChecklists from '@/data/categorized-checklists.json';
import toolRegistry from '@/data/tool-registry.json';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';
import { localizeUrl, SITE_URL } from '@/i18n/utils';

export interface SitemapPageProps {
  lang?: string;
}

export default function SitemapPage({ lang = DEFAULT_LANGUAGE }: SitemapPageProps) {
  const currentLang = (lang as SupportedLanguage) || DEFAULT_LANGUAGE;

  const breadcrumbItems = [
    { name: 'Home', item: SITE_URL },
    { name: 'Sitemap', item: `${SITE_URL}/sitemap` },
  ];

  const schemaScript = `[${generateBreadcrumbSchema(breadcrumbItems)}]`;

  const corePages = [
    { title: 'Home', url: '/', desc: 'Master homepage with full planning suites, tools, and featured guides.' },
    { title: 'Blog & Articles Hub', url: '/blog', desc: 'Expert articles on timelines, budgeting, venues, outfits, and hairstyles.' },
    { title: 'About Us', url: '/about-us', desc: 'Learn about the Wedding Planning Checklists mission and certified editorial team.' },
    { title: 'Contact Us', url: '/contact', desc: 'Get in touch with our team for questions, suggestions, or editorial feedback.' },
    { title: 'Privacy Policy', url: '/privacy-policy', desc: 'Our policies on data privacy and user information protection.' },
    { title: 'Terms of Service', url: '/terms-of-service', desc: 'Terms governing the use of our planning tools, templates, and content.' },
  ];

  const blogArticles = [
    { title: '18-Month Wedding Planning Timeline: Month-by-Month Guide', url: '/blog/18-month-wedding-planning-timeline', cat: 'Planning' },
    { title: '14-Month Wedding Planning Timeline: Month-by-Month Guide', url: '/blog/14-month-wedding-planning-timeline', cat: 'Planning' },
    { title: 'How to Plan a Wedding Timeline: Professional Framework', url: '/blog/how-to-plan-a-wedding-timeline', cat: 'Planning' },
    { title: 'The Ultimate Wedding Planning Checklists Guide', url: '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding', cat: 'Checklists' },
    { title: '20 Essential Tips for Your Wedding Planning Checklist', url: '/blog/20-tips-for-your-wedding-planning-checklist', cat: 'Tips' },
    { title: 'How to Choose the Perfect Wedding Venue', url: '/blog/how-to-choose-wedding-venue', cat: 'Venues' },
    { title: 'Wedding Budget Tips & Savings Strategies', url: '/blog/wedding-budget-tips', cat: 'Budget' },
    { title: 'The Perfect Wedding Guest List Guide', url: '/blog/perfect-guest-list-guide', cat: 'Guests' },
    { title: 'Wedding Outfits: The Complete Style Guide', url: '/blog/wedding-outfits', cat: 'Attire' },
    { title: 'Pakistani Wedding Outfits: Bridal & Groom Attire', url: '/blog/pakistani-wedding-outfits', cat: 'Cultural' },
    { title: '50 Best Hairstyles for Wedding: Ultimate Bridal Hair Guide', url: '/blog/hairstyles-for-wedding', cat: 'Beauty' },
    { title: 'Pakistani Wedding Hairstyles: Traditional to Modern', url: '/blog/pakistani-wedding-hairstyles', cat: 'Beauty' },
    { title: 'Indian Wedding Hairstyles: Complete Cultural Guide', url: '/blog/indian-wedding-hairstyles-guide', cat: 'Beauty' },
    { title: 'Regional Indian Bridal Hairstyles by State & Tradition', url: '/blog/regional-indian-wedding-hairstyles', cat: 'Beauty' },
    { title: 'How to Create an Inspiring Wedding Moodboard', url: '/blog/moodboard-layout', cat: 'Design' },
    { title: '4-Month Wedding Planning Timeline: Week-by-Week Checklist', url: '/blog/4-month-wedding-planning-timeline', cat: 'Planning' },
  ];

  const groupedCategories = categorizedChecklists.checklists.reduce(
    (acc: Record<string, any>, chk: any) => {
      if (!acc[chk.category]) {
        let catIcon = '📋';
        if (chk.category === 'Timeline') catIcon = '📅';
        else if (chk.category === 'Budget') catIcon = '💰';
        else if (chk.category === 'Cultural') catIcon = '🪔';
        else if (chk.category === 'Style') catIcon = '🥂';
        else if (chk.category === 'Day-Of') catIcon = '⏰';
        else if (chk.category === 'Organizers') catIcon = '📑';

        acc[chk.category] = {
          title: chk.category + ' Checklists',
          icon: catIcon,
          checklists: [],
        };
      }
      acc[chk.category].checklists.push(chk);
      return acc;
    },
    {}
  );

  const categoriesArray = Object.values(groupedCategories);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaScript }}
      />
      <Header lang={currentLang} />

      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 flex-grow">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href={localizeUrl('/', currentLang)} className="hover:text-[#B76E79] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li className="font-semibold text-[#B76E79]">Visual Sitemap</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-[#FCECF0] text-[#B76E79] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            Visual Site Directory
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Website <span className="text-[#B76E79]">Sitemap &amp; Directory</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Easily explore and navigate every interactive planning tool, categorized checklist, and
            expert timeline guide across WeddingPlanningChecklists.org.
          </p>

          {/* Raw XML Link */}
          <div className="pt-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#B76E79] bg-white border border-[#F3E8EA] hover:border-[#B76E79] px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              View Formatted XML Sitemap (/sitemap.xml)
            </a>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-blue-600 flex items-center justify-center text-xl font-bold">
              🛠️
            </div>
            <div>
              <div className="text-2xl font-black text-[#1A1A1A]">8</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Interactive Tools</div>
            </div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-xl font-bold">
              📋
            </div>
            <div>
              <div className="text-2xl font-black text-[#1A1A1A]">20</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Planning Checklists</div>
            </div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-amber-600 flex items-center justify-center text-xl font-bold">
              📖
            </div>
            <div>
              <div className="text-2xl font-black text-[#1A1A1A]">15</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Expert Guides</div>
            </div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-[#F3E8EA] shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl font-bold">
              🌐
            </div>
            <div>
              <div className="text-2xl font-black text-[#1A1A1A]">49+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Total Indexed Pages</div>
            </div>
          </div>
        </div>

        {/* Section 1: Interactive Planning Tools */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-[#F3E8EA] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛠️</span>
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#1A1A1A]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Interactive Planning Tools
                </h2>
                <p className="text-xs text-slate-500">
                  Free calculators, schedule generators, guest managers, and dashboard
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#B76E79] bg-[#FCECF0] px-3 py-1 rounded-full">
              8 Tools
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolRegistry.tools.map(tool => (
              <Link
                key={tool.id}
                href={localizeUrl(tool.href, currentLang)}
                className="p-5 bg-white rounded-2xl border border-[#F3E8EA] hover:border-[#B76E79] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{tool.icon}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#B76E79] inline-flex items-center gap-1 group-hover:gap-2 transition-all pt-2 border-t border-slate-50">
                  Open Tool →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Categorized Wedding Planning Checklists */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center justify-between border-b border-[#F3E8EA] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#1A1A1A]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Categorized Planning Checklists
                </h2>
                <p className="text-xs text-slate-500">
                  Milestone checklists organized by timeline phases, budget tiers, and specialized styles
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#B76E79] bg-[#FCECF0] px-3 py-1 rounded-full">
              20 Checklists
            </span>
          </div>

          <div className="space-y-8">
            {categoriesArray.map((category: any) => (
              <div key={category.title} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">{category.icon}</span>
                  <h3 className="font-bold text-base text-[#1A1A1A]">{category.title}</h3>
                  <span className="text-xs text-slate-400 font-semibold">
                    ({category.checklists.length})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.checklists.map((chk: any) => (
                    <Link
                      key={chk.slug}
                      href={localizeUrl(`/checklists/${chk.slug}`, currentLang)}
                      className="p-4 bg-white rounded-2xl border border-[#F3E8EA] hover:border-[#B76E79] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-2"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-base">{chk.icon}</span>
                          <span className="text-[9px] font-bold text-[#B76E79] bg-[#FCECF0] px-2 py-0.5 rounded-full uppercase">
                            {chk.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors leading-snug">
                          {chk.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#B76E79] transition-colors pt-1">
                        Read Checklist →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Expert Wedding Planning Blog Articles */}
        <section className="space-y-6 pt-8">
          <div className="flex items-center justify-between border-b border-[#F3E8EA] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#1A1A1A]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Expert Wedding Planning Articles
                </h2>
                <p className="text-xs text-slate-500">
                  Comprehensive editorial guides on timelines, budgeting, fashion, hairstyles, and culture
                </p>
              </div>
            </div>
            <Link
              href={localizeUrl('/blog', currentLang)}
              className="text-xs font-bold text-[#B76E79] hover:underline"
            >
              View Blog Hub →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogArticles.map(art => (
              <Link
                key={art.url}
                href={localizeUrl(art.url, currentLang)}
                className="p-4 bg-white rounded-2xl border border-[#F3E8EA] hover:border-[#B76E79] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-2"
              >
                <div>
                  <span className="inline-block text-[9px] font-bold text-[#B76E79] uppercase tracking-wider mb-1">
                    {art.cat}
                  </span>
                  <h3 className="font-bold text-xs text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-[#B76E79] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all pt-1">
                  Read Guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: Core Pages & Company Directory */}
        <section className="space-y-6 pt-8 pb-4">
          <div className="flex items-center justify-between border-b border-[#F3E8EA] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏢</span>
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#1A1A1A]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Company &amp; Legal Directory
                </h2>
                <p className="text-xs text-slate-500">About the platform, policies, terms, and contact</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">6 Pages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {corePages.map(page => (
              <Link
                key={page.url}
                href={localizeUrl(page.url, currentLang)}
                className="p-5 bg-white rounded-2xl border border-[#F3E8EA] hover:border-[#B76E79] shadow-sm hover:shadow-md transition-all group space-y-2"
              >
                <h3 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors">
                  {page.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{page.desc}</p>
                <span className="text-xs font-bold text-slate-400 group-hover:text-[#B76E79] inline-block pt-1">
                  Visit {page.title} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
