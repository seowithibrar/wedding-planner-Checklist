import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // Commonly used

export function WeddingVenueArticle() {
  return (
    <BlogArticleLayout
      slug="how-to-choose-wedding-venue"
      title="How to Choose the Perfect Wedding Venue"
      category="Venues"
      readTime="8 Min Read"
      updatedAt="June 2026"
      heroImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200"
      heroImageAlt="Elegant wedding venue layout"
      introduction={
        <p>
          Welcome to our comprehensive guide on How to Choose the Perfect Wedding Venue. We've gathered the best tips and advice to help you plan the perfect wedding.
        </p>
      }
      keyTakeaways={[
        "Read through our comprehensive guide.",
        "Use our free planning tools and checklists.",
        "Bookmark this page for future reference."
      ]}
      tableOfContents={[
        { id: 'section-1', label: 'Main Section' }
      ]}
      faqs={[]}
      conclusion={
        <p>Thanks for reading our guide on How to Choose the Perfect Wedding Venue. Happy planning!</p>
      }
    >
      
          <section id="hook" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">01.</span> Setting the Scene & Writing the Hook
            </h2>
            <p>
              Choosing your wedding venue is the single most critical decision you will make. It determines your wedding date, your general aesthetic theme, your guest count capacity, and a significant portion of your budget. Start by searching for spaces that resonate with your personal style as a couple.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section id="guest-capacity" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">02.</span> Assessing Guest Capacity & Logistics
            </h2>
            <p>
              Do not fall in love with a venue before you draft a preliminary guest list. If a venue has a maximum capacity of 150 guests and your list has 200, you will face stressful cuts. Make sure the venue can comfortably accommodate your guests, table arrangements, and dance floor.
            </p>
            
            <div className="my-8">
              <div className="bg-white p-3 rounded-[24px] border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" 
                  alt="Wedding table configurations in venue" 
                  className="w-full h-80 object-cover rounded-[16px]"
                />
                <p className="text-center text-xs text-slate-400 mt-3 italic">
                  Figure 1: Choosing a venue with plenty of natural lighting and open spaces creates a breathtaking atmosphere.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Premium Pull Quote Box */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-rose-500 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute right-4 bottom-2 opacity-5 text-rose-500">
              <Quote size={80} />
            </div>
            <p className="text-lg italic text-slate-900 font-semibold leading-relaxed relative z-10">
              "The right venue will not only frame your ceremony; it will set the entire mood and simplify the planning of every other single vendor."
            </p>
            <span className="text-xs uppercase font-bold text-rose-500 mt-3 block tracking-widest">— Wedding Planning Checklists Team</span>
          </div>

          <section id="hidden-costs" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">03.</span> Checking for Hidden Costs
            </h2>
            <p>
              Always ask what is included in the rental fee. Some venues seem cheap but charge extra for tables, chairs, cleanup, security, or garbage disposal. Others require you to use their preferred list of caterers, which might be more expensive than your budget allows.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section id="venue-checklist" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">04.</span> Site Visit Checklist & Questions
            </h2>
            <p>
              Before signing a venue contract, review the backup weather plan for outdoor ceremonies, the parking situations, noise restrictions, and deposit refund policies.
            </p>
          </section>

          {/* Custom Styled Checklist Card */}
          <div className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100 space-y-4">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="text-rose-500" size={20} /> Venue Questions Checklist
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Weather Contingency Plan:</strong> Is there an indoor backup space that you love just as much?</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Vendor Restrictions:</strong> Are you locked into specific exclusive vendors?</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Access Hours:</strong> What time can setup begin, and when must cleanup be completed?</span>
              </li>
            </ul>
          </div>
        
    </BlogArticleLayout>
  );
}
