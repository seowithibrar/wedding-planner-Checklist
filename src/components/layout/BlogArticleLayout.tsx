import React, { useEffect } from 'react';
import { Calendar, Clock, User, Facebook, Twitter, Instagram, List, ChevronRight, Zap } from 'lucide-react';

export interface TOCItem {
  id: string;
  label: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface BlogArticleLayoutProps {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  updatedAt: string;
  heroImage: string;
  heroImageAlt?: string;
  introduction: React.ReactNode;
  keyTakeaways: React.ReactNode[];
  tableOfContents: TOCItem[];
  faqs: FAQItem[];
  conclusion: React.ReactNode;
  children: React.ReactNode;
}

export function BlogArticleLayout({
  slug,
  title,
  category,
  readTime,
  updatedAt,
  heroImage,
  heroImageAlt = "Blog post featured image",
  introduction,
  keyTakeaways,
  tableOfContents,
  faqs,
  conclusion,
  children
}: BlogArticleLayoutProps) {
  
  // Update document title for SEO
  useEffect(() => {
    document.title = `${title} | Wedding Planning Checklists`;
  }, [title]);

  return (
    <div className="bg-white min-h-screen">
      {/* Blog Header / Hero */}
      <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center bg-gradient-to-b from-brand-pink/20 to-transparent rounded-b-[4rem]">
        
        {/* 1. Breadcrumb Navigation */}
        <nav className="flex justify-center items-center gap-2 text-xs text-brand-text/50 mb-8" aria-label="Breadcrumb">
          <a href="/" className="hover:text-brand-rosegold transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/blog" className="hover:text-brand-rosegold transition-colors">Blog</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-text/80 font-medium">{title}</span>
        </nav>

        {/* 2. Featured Hero Image */}
        <figure className="mb-12 max-w-5xl mx-auto">
          <img 
            src={heroImage} 
            alt={heroImageAlt} 
            className="w-full h-auto max-h-[500px] rounded-3xl shadow-2xl object-cover hover:shadow-[0_20px_50px_rgba(183,110,121,0.3)] hover:-translate-y-2 transition-all duration-500" 
            fetchPriority="high" 
          />
        </figure>

        {/* 3. Category Badge & 5. Article Metadata */}
        <div className="mb-6 flex justify-center items-center gap-2 text-sm font-medium text-brand-rosegold">
          <span className="bg-brand-pink px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{category}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {readTime} read</span>
        </div>

        {/* 4. H1 Title */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight mb-6">
          {title}
        </h1>

        <div className="flex items-center justify-center gap-6 text-sm text-brand-text/60 border-y border-brand-pink/30 py-4 max-w-xl mx-auto mb-8">
          <span className="flex items-center gap-1"><Calendar size={14} className="text-brand-rosegold" /> Updated {updatedAt}</span>
          <span className="flex items-center gap-1"><User size={14} className="text-brand-rosegold" /> Wedding Planning Checklists</span>
        </div>
        
        {/* 6. Short Introduction */}
        <div className="text-lg text-brand-text/80 leading-relaxed max-w-3xl mx-auto font-medium">
          {introduction}
        </div>
      </section>

      {/* Blog Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
        
        {/* 8. Sticky Table of Contents (Sidebar) */}
        <aside className="col-span-1 lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 space-y-6">
            {tableOfContents.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-brand-pink/30 shadow-sm">
                <h4 className="font-heading font-bold text-base text-brand-dark mb-4 pb-2 border-b border-brand-pink/20 flex items-center gap-2">
                  <List className="w-4 h-4 text-brand-rosegold" /> Table of Contents
                </h4>
                <nav className="space-y-2.5 text-xs font-semibold text-brand-text/70" id="toc-nav">
                  {tableOfContents.map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`} 
                      className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}
            
            {/* Share Box */}
            <div className="bg-white p-6 rounded-3xl border border-brand-pink/30 shadow-sm text-center space-y-3">
              <span className="text-[10px] font-bold tracking-wider text-brand-text/50 uppercase block">Share Guide</span>
              <div className="flex justify-center gap-2">
                <button className="w-8 h-8 rounded-full bg-brand-pink/50 hover:bg-brand-rosegold hover:text-white text-brand-text/60 flex items-center justify-center transition-all"><Facebook size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-brand-pink/50 hover:bg-brand-rosegold hover:text-white text-brand-text/60 flex items-center justify-center transition-all"><Twitter size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-brand-pink/50 hover:bg-brand-rosegold hover:text-white text-brand-text/60 flex items-center justify-center transition-all"><Instagram size={14} /></button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <article className="col-span-1 lg:col-span-9 text-brand-text/90 text-base sm:text-lg leading-relaxed space-y-8">
          
          {/* 7. Quick Summary / Key Takeaways */}
          {keyTakeaways.length > 0 && (
            <div className="bg-brand-pink/30 border-l-4 border-brand-rosegold p-6 rounded-r-2xl mb-10 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-gold" /> Key Takeaways
              </h3>
              <ul className="space-y-2 text-sm font-medium">
                {keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-brand-rosegold font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 9. Main Content */}
          <div className="prose prose-lg prose-rose max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-dark prose-a:text-brand-rosegold prose-img:rounded-2xl">
            {children}
          </div>

          <hr className="border-brand-pink/30 my-12" />

          {/* 10. FAQ Section */}
          {faqs.length > 0 && (
            <section className="mb-12" id="faq">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-brand-pink/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <h4 className="font-bold text-brand-dark text-lg mb-2">{faq.q}</h4>
                    <p className="text-sm text-brand-text/80">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <hr className="border-brand-pink/30 my-12" />

          {/* 11. Conclusion */}
          {conclusion && (
            <section className="bg-brand-pink/20 p-8 rounded-3xl border border-brand-pink/50 mb-12">
              <h2 className="font-heading text-2xl font-bold text-brand-dark mb-4">Conclusion</h2>
              <div className="text-brand-text/90">
                {conclusion}
              </div>
            </section>
          )}

          {/* 12. Related Articles (Placeholder for now, can be populated via generic data) */}
          
          {/* 13. Newsletter / Download CTA */}
          <section className="bg-brand-dark text-white rounded-3xl p-8 text-center my-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200')] opacity-10 bg-cover bg-center"></div>
            <div className="relative z-10">
              <h3 className="font-heading text-2xl font-bold mb-3 text-brand-pink">Get Free Wedding Planning Checklists</h3>
              <p className="text-sm text-white/80 max-w-xl mx-auto mb-6">Join thousands of couples planning their dream wedding. Download our comprehensive month-by-month timeline and budget trackers.</p>
              <a href="/guide" className="inline-block bg-brand-rosegold text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-500/25">
                Download Free Tools
              </a>
            </div>
          </section>

          {/* 14. Author Box */}
          <section className="bg-white border border-brand-pink/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm mb-10 text-left">
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-brand-pink shadow-sm">
              <img src="https://ui-avatars.com/api/?name=Wedding+Planning+Checklists&background=fcecf0&color=B76E79&size=200" alt="Wedding Planning Checklists Team" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-lg mb-1">Wedding Planning Checklists Team</h4>
              <p className="text-xs font-semibold text-brand-rosegold uppercase tracking-wider mb-3">Wedding Planning Experts</p>
              <p className="text-sm text-brand-text/80 leading-relaxed">
                The Wedding Planning Checklists Team is dedicated to helping couples plan the wedding of their dreams without the stress. We combine industry expertise, modern aesthetics, and practical advice to bring you the best in wedding planning resources.
              </p>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}
