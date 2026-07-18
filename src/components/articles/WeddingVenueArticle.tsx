import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { QuickAnswerBox } from '../blog/QuickAnswerBox';
import { ExpertTip, CommonMistake, ProTip, ChecklistItem } from '../blog/CalloutBoxes';
import { ArticleCTA } from '../blog/ArticleCTA';

export function WeddingVenueArticle() {
  return (
    <BlogArticleLayout
      slug="how-to-choose-wedding-venue"
      title="How to Choose the Perfect Wedding Venue: The Ultimate Guide"
      category="Venues"
      readTime="8 Min Read"
      updatedAt="July 2026"
      heroImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200"
      heroImageAlt="Elegant wedding venue layout"
      introduction={
        <p>
          Choosing your wedding venue is the single most critical decision you will make. It dictates your wedding date, establishes your aesthetic theme, limits your guest count, and consumes a significant portion of your budget. 
          <br /><br />
          This guide is designed for newly engaged couples feeling overwhelmed by endless venue options. You'll learn exactly how to assess guest capacity, uncover hidden fees, and ask the right questions during site visits to ensure you find a space that perfectly resonates with your style and budget.
        </p>
      }
      keyTakeaways={[
        "Determine guest list first",
        "Watch for hidden fees",
        "Check vendor restrictions",
        "Ask about backup plans"
      ]}
      tableOfContents={[
        { id: 'hook', label: '1. Setting the Scene' },
        { id: 'guest-capacity', label: '2. Assessing Guest Capacity' },
        { id: 'hidden-costs', label: '3. Checking for Hidden Costs' },
        { id: 'venue-checklist', label: '4. Site Visit Checklist' },
        { id: 'faq', label: 'Frequently Asked Questions' }
      ]}
      faqs={[
        {
          q: "When should I book my wedding venue?",
          a: "You should book your venue 12 to 18 months in advance. Popular venues book up extremely fast, especially for prime dates in the spring and fall."
        },
        {
          q: "How much of my budget should go to the venue?",
          a: "Typically, the venue rental and catering (if provided in-house) will consume 40% to 50% of your total wedding budget."
        },
        {
          q: "What is an all-inclusive wedding venue?",
          a: "An all-inclusive venue provides everything in-house, including catering, tables, chairs, linens, and sometimes even the cake and decor. They are often more cost-effective and stress-free."
        },
        {
          q: "Can I bring my own alcohol to a wedding venue?",
          a: "This depends entirely on the venue. Some allow 'BYOB' with a corkage fee, which saves thousands. Others require you to purchase expensive beverage packages through them."
        },
        {
          q: "What happens if it rains at an outdoor venue?",
          a: "You must always ask about the venue's 'Plan B'. If they do not have a beautiful, guaranteed indoor space in case of bad weather, you should look elsewhere."
        },
        {
          q: "Are venue prices negotiable?",
          a: "Yes, especially if you are booking an off-peak date (like a Friday or a Sunday) or getting married during a slower month (like January or February)."
        }
      ]}
      conclusion={
        <p>
          The right venue will not only frame your ceremony; it will set the entire mood and simplify the planning of every other single vendor. Take your time, ask the hard questions, and don't sign a contract until you are absolutely certain it checks all of your major boxes. Happy venue hunting!
        </p>
      }
    >
      
      <section className="space-y-6 text-left">
        <QuickAnswerBox title="How do I choose a wedding venue?">
          To choose the perfect wedding venue, you must first <strong>draft your guest list</strong> and <strong>set a strict budget</strong>. Never tour a venue before knowing these two numbers. When visiting, look for hidden fees, ask about vendor restrictions (like required caterers), and ensure they have a solid indoor backup plan in case of bad weather.
        </QuickAnswerBox>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="hook">
          <span className="text-brand-pink mr-2">01.</span> Setting the Scene
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Choosing your wedding venue is the single most critical decision you will make. It determines your wedding date, your general aesthetic theme, your guest count capacity, and a significant portion of your budget. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Start by searching for spaces that resonate with your personal style as a couple. Are you looking for a rustic barn, a modern industrial warehouse, an elegant ballroom, or a scenic outdoor garden? 
        </p>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="guest-capacity">
          <span className="text-brand-pink mr-2">02.</span> Assessing Guest Capacity & Logistics
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Do not fall in love with a venue before you draft a preliminary guest list. If a venue has a maximum capacity of 150 guests and your list has 200, you will face extremely stressful cuts. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Make sure the venue can comfortably accommodate your guests, table arrangements, and the dance floor without feeling cramped. A venue that is too large can feel empty, while a venue that is too small can be uncomfortably tight.
        </p>
        
        <figure className="my-8">
          <div className="bg-white p-3 rounded-[24px] border border-slate-200 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" 
              alt="Wedding table configurations in venue" 
              className="w-full h-80 object-cover rounded-[16px]"
              loading="lazy"
              width="800"
              height="320"
            />
            <figcaption className="text-center text-sm text-slate-500 mt-3 font-medium">
              Choosing a venue with plenty of natural lighting and open spaces creates a breathtaking atmosphere.
            </figcaption>
          </div>
        </figure>

        <ExpertTip title="The 20% Rule">
          When a venue says their maximum capacity is 200, they often mean a very tight fit. To ensure your guests are comfortable, aim to invite about 20% fewer guests than the absolute maximum capacity.
        </ExpertTip>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="hidden-costs">
          <span className="text-brand-pink mr-2">03.</span> Checking for Hidden Costs
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Always ask what is included in the rental fee. Some venues seem incredibly cheap upfront but will charge you extra for tables, chairs, cleanup, security, or garbage disposal. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Others require you to use their "preferred" or exclusive list of caterers. These exclusive vendors might be significantly more expensive than your budget allows, essentially trapping you into a higher overall cost.
        </p>

        <CommonMistake title="Ignoring the Service Charge">
          Don't forget the service charge! Most venues and caterers add a mandatory 20% to 22% service charge on top of the food and beverage minimum. This is not a tip; it's an administrative fee.
        </CommonMistake>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="venue-checklist">
          <span className="text-brand-pink mr-2">04.</span> Site Visit Checklist & Questions
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Before signing a venue contract and handing over a massive deposit, you need to review their policies. Check the backup weather plan for outdoor ceremonies, the parking situations, noise restrictions, and deposit refund policies.
        </p>

        <div className="space-y-4 my-6">
          <ChecklistItem>
            <strong>Weather Contingency Plan:</strong> Is there an indoor backup space that you love just as much? Never assume it won't rain on your wedding day.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Vendor Restrictions:</strong> Are you locked into specific exclusive vendors? If so, get quotes from those vendors before signing the venue contract.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Access Hours:</strong> What time can setup begin, and when must cleanup be completed? Short access windows often require paying vendors extra for rushed setup.
          </ChecklistItem>
        </div>

        <ArticleCTA 
          type="download"
          title="Compare Venues Like a Pro"
          description="Download our Venue Comparison Matrix to track capacities, hidden fees, and restrictions side-by-side."
          buttonText="Download Venue Matrix"
          link="/blog/The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding"
        />

      </section>
    </BlogArticleLayout>
  );
}
