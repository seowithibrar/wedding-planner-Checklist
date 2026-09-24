import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllBlogPosts } from '@/lib/blog';
import { useTranslations, localizeUrl, getArticleI18n } from '@/i18n/utils';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';

export interface BlogListPageProps {
  lang?: string;
}

export default function BlogListPage({ lang = DEFAULT_LANGUAGE }: BlogListPageProps) {
  const currentLang = lang as SupportedLanguage;
  const { common, home } = useTranslations(currentLang);

  const posts = getAllBlogPosts();
  const featuredPost =
    posts.find((p) => p.meta.slug.includes('the-ultimate-wedding-planning-checklists-guide')) ||
    posts.find((p) => p.meta.featured) ||
    posts[0];
  const otherPosts = posts.filter((p) => p.meta.slug !== featuredPost?.meta.slug);

  const featuredSlug = featuredPost?.meta.slug || '';
  const featuredI18n = featuredSlug ? getArticleI18n(featuredSlug, currentLang) : null;
  const featuredTitle = featuredI18n?.title || featuredPost?.meta.title;
  const featuredDescription = featuredI18n?.description || featuredPost?.meta.description;
  const featuredCategory = featuredI18n?.category || featuredPost?.meta.category;

  return (
    <>
      <Header lang={currentLang} />

      <main className="pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">
            {home.blogSection.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A]">{home.blogSection.title}</h1>
          <p className="text-slate-600 text-base">{home.blogSection.subtitle}</p>
        </div>

        {featuredPost && (
          <div className="bg-white rounded-3xl border border-[#F3E8EA] shadow-sm overflow-hidden mb-16 grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 sm:h-96 lg:h-auto overflow-hidden">
              <img
                src={featuredPost.meta.heroImage}
                alt={featuredPost.meta.heroImageAlt || featuredTitle}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="bg-[#FCECF0] text-[#B76E79] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {featuredCategory || 'Featured Guide'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-4 mb-4">
                  <Link
                    href={localizeUrl(`/blog/${featuredSlug}`, currentLang)}
                    className="hover:text-[#B76E79] transition-colors"
                  >
                    {featuredTitle}
                  </Link>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {featuredDescription}
                </p>
              </div>
              <div>
                <Link
                  href={localizeUrl(`/blog/${featuredSlug}`, currentLang)}
                  className="inline-flex items-center gap-1.5 bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#B76E79] transition-all"
                >
                  <span>{common.buttons.readMore}</span>
                  <span className="rtl-flip">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => {
            const slug = post.meta.slug;
            const postI18n = getArticleI18n(slug, currentLang);
            const title = postI18n?.title || post.meta.title;
            const description = postI18n?.description || post.meta.description;
            const category = postI18n?.category || post.meta.category;

            return (
              <div
                key={slug}
                className="bg-white rounded-3xl border border-[#F3E8EA] shadow-sm overflow-hidden hover:shadow-md hover:border-[#B76E79]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.meta.heroImage}
                      alt={post.meta.heroImageAlt || title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="bg-[#FCECF0] text-[#B76E79] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {category}
                    </span>
                    <h3 className="font-bold text-lg text-[#1A1A1A] mt-3 mb-2 hover:text-[#B76E79] transition-colors">
                      <Link href={localizeUrl(`/blog/${slug}`, currentLang)}>{title}</Link>
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#B76E79]">
                  <span>{post.meta.readTime}</span>
                  <Link
                    href={localizeUrl(`/blog/${slug}`, currentLang)}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>{common.buttons.readMore}</span>
                    <span className="rtl-flip">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer lang={currentLang} />
    </>
  );
}
