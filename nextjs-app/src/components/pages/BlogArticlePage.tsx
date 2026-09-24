import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MdxRenderer from '../mdx/MdxRenderer';
import BlogArticleClient from '../blog/BlogArticleClient';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema, generateHowToSchema } from '@/lib/schema';
import { useTranslations, localizeUrl, getArticleI18n, SITE_URL } from '@/i18n/utils';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';
import type { BlogPost } from '@/lib/blog';

export interface BlogArticlePageProps {
  post: BlogPost;
  slug: string;
  allPosts: BlogPost[];
  lang?: string;
}

export default function BlogArticlePage({
  post,
  slug,
  allPosts,
  lang = DEFAULT_LANGUAGE,
}: BlogArticlePageProps) {
  const currentLang = (lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const { common } = useTranslations(currentLang);

  // Check if there is localized metadata for this article
  const postI18n = getArticleI18n(slug, currentLang);
  const articleTitle = postI18n?.title || post.data.title;
  const articleDescription = postI18n?.description || post.data.description;
  const articleCategory = postI18n?.category || post.data.category;

  const canonicalUrl =
    currentLang === DEFAULT_LANGUAGE
      ? `${SITE_URL}/blog/${slug}`
      : `${SITE_URL}/${currentLang}/blog/${slug}`;

  const articleSchema = generateArticleSchema({
    title: articleTitle,
    description: articleDescription,
    url: canonicalUrl,
    image: post.data.heroImage,
    dateModified: post.data.dateModified || '2026-09-20',
    datePublished: post.data.pubDate ? new Date(post.data.pubDate).toISOString().split('T')[0] : undefined,
  });

  const faqSchema = post.data.faqs ? generateFAQSchema(post.data.faqs) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: common.nav.home, item: localizeUrl('/', currentLang) },
    { name: common.nav.blog, item: localizeUrl('/blog', currentLang) },
    { name: articleTitle, item: canonicalUrl },
  ]);

  const howToSchema = post.data.howTo
    ? generateHowToSchema({
        name: post.data.howTo.name,
        description: post.data.howTo.description,
        url: canonicalUrl,
        steps: post.data.howTo.step,
      })
    : null;

  const schemas = [articleSchema, faqSchema, breadcrumbSchema, howToSchema].filter(Boolean);
  const combinedSchema = `[${schemas.join(', ')}]`;

  // Build TOC items from frontmatter or defaults
  const tocItems =
    post.data.tableOfContents && post.data.tableOfContents.length > 0
      ? post.data.tableOfContents
      : [
          ...(post.data.quickAnswer ? [{ id: 'quick-answer', label: common.ui.quickAnswer }] : []),
          ...(post.data.keyTakeaways && post.data.keyTakeaways.length > 0
            ? [{ id: 'key-takeaways', label: common.ui.keyTakeaways }]
            : []),
          { id: 'main-content', label: 'Full Guide' },
          ...(post.data.faqs && post.data.faqs.length > 0 ? [{ id: 'faq', label: common.ui.faqs }] : []),
          { id: 'author', label: common.ui.author },
        ];

  const displayDate = post.data.updatedDate || 'September 2026';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combinedSchema }}
      />

      <Header lang={currentLang} />

      {/* ═══════════════════════════════════════════════
           READING PROGRESS BAR
           ═══════════════════════════════════════════════ */}
      <div id="reading-progress" className="reading-progress-bar" style={{ width: '0%' }}></div>

      {/* ═══════════════════════════════════════════════
           HERO SECTION
           ═══════════════════════════════════════════════ */}
      <header className="relative pt-10 pb-14 bg-gradient-to-b from-[#FCECF0]/60 via-white to-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FCECF0]/40 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#F3E8EA]/30 to-transparent rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          {/* 1. Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <a href={localizeUrl('/', currentLang)} className="hover:text-[#B76E79] transition-colors inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              {common.nav.home}
            </a>
            <svg className="w-3 h-3 text-slate-300 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <a href={localizeUrl('/blog', currentLang)} className="hover:text-[#B76E79] transition-colors">
              {common.nav.blog}
            </a>
            <svg className="w-3 h-3 text-slate-300 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="text-[#B76E79] truncate max-w-[200px] sm:max-w-xs">{articleTitle}</span>
          </nav>

          {/* Multilingual Notice (When browsing non-English) */}
          {currentLang !== DEFAULT_LANGUAGE && (
            <div className="inline-flex items-center gap-2 bg-white border border-[#F3E8EA] px-4 py-1.5 rounded-full text-xs text-slate-600 shadow-sm">
              <span>🌐</span>
              <span>{common.ui.translationNotice}</span>
            </div>
          )}

          {/* 2. Category Badge & Read Time */}
          <div className="flex items-center justify-center gap-3 text-xs font-bold">
            <span className="bg-gradient-to-r from-[#B76E79] to-[#a25d66] text-white px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {articleCategory}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {post.data.readTime}
            </span>
          </div>

          {/* 3. H1 Title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-tight tracking-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {articleTitle}
          </h1>

          {/* 4. Author & Date Meta */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#B76E79] to-[#a25d66] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                W
              </div>
              {common.ui.by} <strong className="text-[#1A1A1A]">{post.data.author}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {common.ui.updated} {displayDate}
            </span>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
           HERO IMAGE
           ═══════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12 relative">
        <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-white/60 bg-white group">
          <img
            src={post.data.heroImage}
            alt={post.data.heroImageAlt || articleTitle}
            className="w-full h-auto max-h-[520px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
            loading="eager"
          />
        </div>
        {post.data.heroImageAlt && (
          <p className="text-center text-[10px] text-slate-400 mt-2 italic">{post.data.heroImageAlt}</p>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
           MOBILE TABLE OF CONTENTS DRAWER
           ═══════════════════════════════════════════════ */}
      <div className="lg:hidden max-w-5xl mx-auto px-4 sm:px-6 mb-8">
        <button
          id="mobile-toc-toggle"
          className="w-full flex items-center justify-between bg-white border border-[#F3E8EA] rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
          aria-expanded="false"
          aria-controls="mobile-toc-panel"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
            <svg className="w-4 h-4 text-[#B76E79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
            {common.ui.tableOfContents}
          </span>
          <svg id="mobile-toc-chevron" className="w-4 h-4 text-slate-400 faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div id="mobile-toc-panel" className="mobile-toc-panel bg-white border border-t-0 border-[#F3E8EA] rounded-b-2xl shadow-sm">
          <nav className="p-4 space-y-1">
            {tocItems.map((item: { id: string; label: string }) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm font-medium text-slate-600 hover:text-[#B76E79] transition-colors py-1.5 pl-3 border-l-2 border-transparent hover:border-[#B76E79] rounded-r-lg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
           MAIN 2-COLUMN CONTENT GRID
           ═══════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 flex-grow">
        {/* ─── STICKY SIDEBAR (LEFT) ─── */}
        <aside className="col-span-1 lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Dynamic Table of Contents */}
            <div className="bg-white p-5 rounded-2xl border border-[#F3E8EA] shadow-sm">
              <h3 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4AF37]"></span>
                {common.ui.tableOfContents}
              </h3>
              <nav id="sidebar-toc" className="space-y-0.5 text-xs font-semibold text-slate-600">
                {tocItems.map((item: { id: string; label: string }) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="toc-link block py-1.5 pl-3 rounded-r-lg"
                    data-toc-id={item.id}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Download / CTA Banner Card */}
            <div className="bg-gradient-to-br from-[#1A1A1A] via-slate-900 to-[#2d2d2d] text-white p-6 rounded-2xl text-center space-y-4 shadow-lg relative overflow-hidden">
              <div className="absolute top-2 right-2 w-16 h-16 bg-[#B76E79]/10 rounded-full blur-xl"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">Free Download</span>
              <h4 className="font-bold text-sm leading-snug relative">Printable Wedding Checklist Suite</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed relative">
                Get instant access to month-by-month planning sheets, budget templates, and vendor trackers.
              </p>
              <a
                href={localizeUrl('/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding', currentLang)}
                className="block w-full bg-gradient-to-r from-[#B76E79] to-[#a25d66] hover:from-[#a25d66] hover:to-[#B76E79] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md relative"
              >
                Download Free →
              </a>
            </div>
          </div>
        </aside>

        {/* ─── MAIN ARTICLE COLUMN (RIGHT) ─── */}
        <article className="col-span-1 lg:col-span-9 space-y-10">
          {/* ═══ QUICK ANSWER BOX ═══ */}
          {post.data.quickAnswer && (
            <section
              id="quick-answer"
              className="relative bg-gradient-to-r from-[#FCECF0] via-white to-[#FCECF0]/50 border border-[#F3E8EA] p-6 sm:p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#B76E79] to-[#a25d66] text-white flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1A1A1A] uppercase tracking-wider mb-2">{common.ui.quickAnswer}</h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">{post.data.quickAnswer}</p>
                </div>
              </div>
            </section>
          )}

          {/* ═══ KEY TAKEAWAYS ═══ */}
          {post.data.keyTakeaways && post.data.keyTakeaways.length > 0 && (
            <section
              id="key-takeaways"
              className="bg-white border border-[#F3E8EA] p-6 sm:p-8 rounded-2xl shadow-sm space-y-4 relative overflow-hidden"
            >
              <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B76E79] via-[#D4AF37] to-[#B76E79]"></div>
              <h3 className="font-bold text-sm text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2 pl-4 rtl:pl-0 rtl:pr-4">
                <span className="text-[#D4AF37] text-lg">⚡</span> {common.ui.keyTakeaways}
              </h3>
              <ul className="space-y-3 pl-4 rtl:pl-0 rtl:pr-4">
                {post.data.keyTakeaways.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ MAIN MDX ARTICLE CONTENT ═══ */}
          <div id="main-content" className="article-content prose prose-lg prose-rose max-w-none">
            <MdxRenderer content={post.content} />
          </div>

          {/* ═══ FAQ ACCORDION SECTION ═══ */}
          {post.data.faqs && post.data.faqs.length > 0 && (
            <section id="faq" className="pt-10 border-t border-[#F3E8EA] space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B76E79] to-[#a25d66] text-white flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {common.ui.faqs}
                </h2>
              </div>
              <div className="space-y-3" id="faq-list">
                {post.data.faqs.map((faq: { q: string; a: string }, index: number) => (
                  <div
                    key={index}
                    className="bg-white border border-[#F3E8EA] rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden faq-item"
                    data-faq-index={index}
                  >
                    <button
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left rtl:text-right cursor-pointer faq-toggle"
                      aria-expanded="false"
                    >
                      <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] pr-4 rtl:pr-0 rtl:pl-4 flex items-center gap-2">
                        <span className="shrink-0 w-7 h-7 rounded-lg bg-[#FCECF0] text-[#B76E79] flex items-center justify-center text-[10px] font-extrabold">
                          Q
                        </span>
                        {faq.q}
                      </h3>
                      <svg className="w-5 h-5 text-[#B76E79] shrink-0 faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div className="faq-answer">
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══ AUTHOR BOX ═══ */}
          <section id="author" className="bg-white border border-[#F3E8EA] p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79]"></div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
              <div className="shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#FCECF0] shadow-sm bg-gradient-to-br from-[#B76E79] to-[#a25d66] text-white flex items-center justify-center font-bold text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  W
                </div>
              </div>
              <div className="space-y-2 text-center sm:text-left rtl:sm:text-right">
                <h3 className="font-bold text-lg text-[#1A1A1A]">{post.data.author}</h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#B76E79] to-[#a25d66] px-3 py-1 rounded-full uppercase tracking-wider">
                    Certified Experts
                  </span>
                  <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Verified Publisher
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                  The Wedding Planning Checklists Team is dedicated to helping engaged couples plan their dream wedding without stress. We deliver expert timeline templates, budget trackers, and cultural planning advice backed by years of wedding industry experience.
                </p>
              </div>
            </div>
          </section>

          {/* ═══ RELATED ARTICLES GRID ═══ */}
          {allPosts && allPosts.length > 0 && (
            <section className="pt-10 border-t border-[#F3E8EA] space-y-6">
              <h2 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {common.ui.relatedArticles}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allPosts.map((rel: BlogPost) => {
                  const relSlug = rel.slug;
                  const relI18n = getArticleI18n(relSlug, currentLang);
                  const relTitle = relI18n?.title || rel.data.title;
                  const relCategory = relI18n?.category || rel.data.category;
                  return (
                    <a
                      key={relSlug}
                      href={localizeUrl(`/blog/${relSlug}`, currentLang)}
                      className="block bg-white rounded-2xl overflow-hidden border border-[#F3E8EA] shadow-sm hover:shadow-lg transition-all group relative"
                    >
                      <div className="h-44 overflow-hidden bg-slate-100 relative">
                        <img
                          src={rel.data.heroImage}
                          alt={rel.data.heroImageAlt || relTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <span className="absolute bottom-3 left-3 text-[9px] font-bold text-white bg-[#B76E79]/90 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {relCategory}
                        </span>
                      </div>
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                        <h3 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors line-clamp-2 leading-snug">
                          {relTitle}
                        </h3>
                        <span className="text-xs font-bold text-[#B76E79] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          <span>{common.buttons.readMore}</span>
                          <svg className="w-3 h-3 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* ═══ NEWSLETTER CTA BANNER ═══ */}
          <section className="relative bg-gradient-to-br from-[#1A1A1A] via-slate-900 to-[#2d2d2d] text-white p-8 sm:p-12 rounded-2xl text-center space-y-5 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B76E79]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

            <div className="relative space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                Free Wedding Planning Tips
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Join Thousands of Happy Couples
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                Get monthly wedding checklist reminders, budget savings tips, and exclusive printable templates straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 text-sm outline-none focus:ring-2 focus:ring-[#B76E79] border border-white/10 focus:border-[#B76E79] transition-all"
                />
                <button className="bg-gradient-to-r from-[#B76E79] to-[#a25d66] hover:from-[#a25d66] hover:to-[#B76E79] text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md whitespace-nowrap cursor-pointer">
                  Subscribe Free
                </button>
              </div>
              <p className="text-[10px] text-slate-500">No spam. Unsubscribe anytime.</p>
            </div>
          </section>
        </article>
      </div>

      {/* ═══════════════════════════════════════════════
           SOCIAL SHARE FLOATING BAR (Desktop only)
           ═══════════════════════════════════════════════ */}
      <div id="social-share" className="social-share-bar hidden lg:flex">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(articleTitle)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on Twitter"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on Facebook"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
          </svg>
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(canonicalUrl)}&description=${encodeURIComponent(articleTitle)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on Pinterest"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"></path>
          </svg>
        </a>
        <button className="share-btn cursor-pointer" title="Copy Link" id="copy-link-btn">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════
           BACK TO TOP BUTTON
           ═══════════════════════════════════════════════ */}
      <button id="back-to-top" className="back-to-top cursor-pointer" title="Back to top" aria-label="Scroll to top">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
        </svg>
      </button>

      {/* Interactive Client Effects */}
      <BlogArticleClient />

      <Footer lang={currentLang} />
    </div>
  );
}
