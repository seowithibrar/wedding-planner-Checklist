import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // Commonly used

export function BudgetTipsArticle() {
  return (
    <BlogArticleLayout
      slug="wedding-budget-tips"
      title="10 Budget-Saving Tips Every Couple Needs to Know"
      category="Budgeting"
      readTime="5 Min Read"
      updatedAt="June 2026"
      heroImage="https://images.unsplash.com/photo-1507504038482-76214343e547?auto=format&fit=crop&q=80&w=1200"
      heroImageAlt="Wedding budget planning table"
      introduction={
        <p>
          Welcome to our comprehensive guide on 10 Budget-Saving Tips Every Couple Needs to Know. We've gathered the best tips and advice to help you plan the perfect wedding.
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
        <p>Thanks for reading our guide on 10 Budget-Saving Tips Every Couple Needs to Know. Happy planning!</p>
      }
    >
      
          <section id="priorities" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">01.</span> Focus on Priorities
            </h2>
            <p>
              The easiest way to save money on a wedding is to identify your top 3 priorities. If you care deeply about fine food and great music, then cut back on elaborate florist arrangements or expensive designer wedding invitations. Prioritizing ensures you spend money where it truly impacts your experience, rather than trying to pay for every popular trend.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section id="off-peak" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">02.</span> Consider Off-Peak Dates and Days
            </h2>
            <p>
              Saturday evenings in June or September carry the highest venue rental premiums. By hosting your wedding on a Friday, Sunday, or choosing an off-peak month (like November or January), you can save up to 30% on venue rentals and catering minimums. Some venues also offer deep discounts for morning brunches, which can feel incredibly intimate and fresh.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Premium Pull Quote Box */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-rose-500 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute right-4 bottom-2 opacity-5 text-rose-500">
              <Quote size={80} />
            </div>
            <p className="text-lg italic text-slate-900 font-semibold leading-relaxed relative z-10">
              "A wedding budget is not about restricting your imagination; it is about channeling your creativity to build the details that matter most to you as a couple."
            </p>
            <span className="text-xs uppercase font-bold text-rose-500 mt-3 block tracking-widest">— Wedding Planning Checklists Team</span>
          </div>

          <section id="decor-hacks" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">03.</span> Decor and Flower Hacks
            </h2>
            <p>
              Florists represent one of the most expensive categories in wedding decor. To save money, repurpose your ceremony flowers for your reception tables. Talk to your florist about using local, in-season blooms rather than importing exotic flowers. Additionally, incorporating elements like tall candles, lanterns, and lush greenery is much more cost-effective than elaborate floral centerpieces.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section id="tracking" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">04.</span> Track Daily Spending
            </h2>
            <p>
              It's not the major venue fee that causes couples to go over budget—it's the hundreds of micro-transactions like stamps, favors, signs, and hair trials. Keep your finances completely organized by updating your deposits, payments, and estimates in our interactive tools on a weekly basis.
            </p>
          </section>

          {/* Custom Styled Checklist Card */}
          <div className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100 space-y-4">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="text-rose-500" size={20} /> Recommended Action Steps
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Confirm Your Venue Budget Limit:</strong> Establish this prior to doing any site visits.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Draft Your Guest Count Tiers:</strong> Calculate minimum and maximum guest capacities.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Map Your Essential Vendor Priority List:</strong> Select the top three vendors you will commit the most capital to.</span>
              </li>
            </ul>
          </div>
        
    </BlogArticleLayout>
  );
}
