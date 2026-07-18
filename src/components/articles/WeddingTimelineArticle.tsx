import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { QuickAnswerBox } from '../blog/QuickAnswerBox';
import { ExpertTip, CommonMistake, ProTip, ChecklistItem } from '../blog/CalloutBoxes';
import { ArticleCTA } from '../blog/ArticleCTA';

export function WeddingTimelineArticle() {
  return (
    <BlogArticleLayout
      slug="how-to-plan-a-wedding-timeline"
      title="How to Plan a Wedding Timeline: Step-by-Step Guide"
      category="Planning"
      readTime="12 Min Read"
      updatedAt="July 2026"
      heroImage="/How to Plan a Wedding Timeline.webp"
      heroImageAlt="Wedding Timeline Planning Documents"
      introduction={
        <p>
          Figuring out how to plan a wedding timeline is one of the first things every engaged couple needs to sort out, and it's also one of the most overwhelming. Between booking vendors, choosing a venue, and managing family expectations, it's easy to lose track of what should happen when.
          <br /><br />
          A clear wedding timeline solves that problem. It tells you exactly what to do each month leading up to the big day, how your wedding day itself should flow hour by hour, and when your deposits need to go out the door. This guide breaks down everything you need to build a flawless chronological plan.
        </p>
      }
      keyTakeaways={[
        "Start 12+ months in advance",
        "Book vendors in strict order",
        "Build a day-of buffer",
        "Share timeline with vendors"
      ]}
      tableOfContents={[
        { id: 'month-by-month', label: '1. Month-by-Month Plan' },
        { id: 'step-by-step', label: '2. Day-Of Timeline Framework' },
        { id: 'expert-tips', label: '3. Expert Scheduling Tips' },
        { id: 'common-mistakes', label: '4. Common Mistakes' },
        { id: 'faq', label: 'Frequently Asked Questions' }
      ]}
      faqs={[
        {
          q: "Can I plan a wedding in under 6 months?",
          a: "Yes. For short engagements, you must prioritize booking your venue, photographer, and caterer immediately, as their availability will dictate your date. Then work through the remaining checklist tasks in parallel."
        },
        {
          q: "When should I send out save-the-dates?",
          a: "Save-the-dates should ideally be sent 6 to 8 months before your wedding. For a destination wedding or a holiday weekend, aim for 10 to 12 months in advance."
        },
        {
          q: "How much time should I allocate for hair and makeup?",
          a: "Generally, allocate 45 minutes per bridesmaid and 60 to 90 minutes for the bride. Always add 30 minutes of total buffer time at the end to prevent rushing."
        },
        {
          q: "When should the photographer arrive?",
          a: "Your photographer should arrive during the final 30 to 45 minutes of hair and makeup to capture getting-ready shots, detail shots (rings, invitation suite), and candids."
        },
        {
          q: "How long does a typical wedding ceremony last?",
          a: "Secular ceremonies usually last 20 to 30 minutes. Traditional or religious ceremonies can take 45 to 60 minutes depending on the customs."
        },
        {
          q: "How far in advance should I share the final timeline?",
          a: "Distribute your finalized day-of timeline to all vendors, the bridal party, and immediate family exactly two weeks before the wedding day."
        }
      ]}
      conclusion={
        <p>
          Knowing how to plan a wedding timeline takes the guesswork out of one of the most stressful parts of getting married. Start with the broad month-by-month plan, layer in your specific hour-by-hour day-of schedule closer to the date, and keep your budget tracker running alongside it the whole way through.
        </p>
      }
    >
      
      <section className="space-y-6 text-left">
        <QuickAnswerBox title="What is the best wedding planning timeline?">
          The best timeline starts <strong>12 months out</strong> with securing the venue and photographer. At <strong>9 months</strong>, book the caterer and secure the dress. At <strong>6 months</strong>, book the florist and send save-the-dates. At <strong>3 months</strong>, send formal invitations. At <strong>1 month</strong>, finalize headcounts and distribute your hour-by-hour day-of timeline to all vendors.
        </QuickAnswerBox>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="month-by-month">
          <span className="text-brand-pink mr-2">01.</span> The Month-by-Month Wedding Planning Timeline
        </h2>
        <p className="text-slate-700 leading-relaxed">
          This is the core of your planning process: breaking the engagement period into manageable phases so you don't burn out.
        </p>
        
        <figure className="my-8">
          <img src="/The Month-by-Month Wedding Planning Timeline.webp" alt="Month by Month Timeline" className="w-full h-auto rounded-3xl shadow-xl border border-slate-100 object-cover" loading="lazy" width="800" height="500" />
          <figcaption className="text-center text-sm text-slate-500 mt-3 font-medium">A visual overview of the monthly planning phases.</figcaption>
        </figure>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-8">12+ Months Before</h3>
        <div className="space-y-3 my-4">
          <ChecklistItem>Set your wedding date and rough budget</ChecklistItem>
          <ChecklistItem>Choose your wedding style and vision</ChecklistItem>
          <ChecklistItem>Start your guest list draft</ChecklistItem>
          <ChecklistItem>Research and book your venue</ChecklistItem>
        </div>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-8">9-11 Months Before</h3>
        <div className="space-y-3 my-4">
          <ChecklistItem>Book your photographer and videographer</ChecklistItem>
          <ChecklistItem>Choose your wedding party</ChecklistItem>
          <ChecklistItem>Start dress and suit shopping</ChecklistItem>
          <ChecklistItem>Hire a caterer if not included with your venue</ChecklistItem>
        </div>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-8">6-8 Months Before</h3>
        <div className="space-y-3 my-4">
          <ChecklistItem>Book florist, DJ or band</ChecklistItem>
          <ChecklistItem>Send save-the-dates</ChecklistItem>
          <ChecklistItem>Plan your honeymoon</ChecklistItem>
        </div>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-8">1 Month Before</h3>
        <div className="space-y-3 my-4">
          <ChecklistItem>Finalize headcount and seating chart</ChecklistItem>
          <ChecklistItem>Confirm final payments with vendors</ChecklistItem>
          <ChecklistItem>Have your final dress or suit fitting</ChecklistItem>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="step-by-step">
          <span className="text-brand-pink mr-2">02.</span> Day-Of Timeline Framework
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Building your wedding day timeline is crucial. Here is a standard step-by-step framework to plan your actual wedding day hour by hour.
        </p>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm my-6 space-y-4">
          <p className="text-slate-700 text-sm"><strong>Morning:</strong> Schedule hair, makeup, and getting-ready photos (allow 2-3 hours).</p>
          <hr className="border-slate-50" />
          <p className="text-slate-700 text-sm"><strong>Pre-ceremony:</strong> Plan for a first look, wedding party photos, and family photos.</p>
          <hr className="border-slate-50" />
          <p className="text-slate-700 text-sm"><strong>Ceremony:</strong> Block out 20-45 minutes depending on your tradition.</p>
          <hr className="border-slate-50" />
          <p className="text-slate-700 text-sm"><strong>Cocktail hour:</strong> Guests transition while the couple finishes remaining photos.</p>
          <hr className="border-slate-50" />
          <p className="text-slate-700 text-sm"><strong>Dinner service:</strong> Allocate 45-60 minutes for meal service.</p>
          <hr className="border-slate-50" />
          <p className="text-slate-700 text-sm"><strong>Speeches and toasts:</strong> Keep these strictly to 15-20 minutes total.</p>
        </div>

        <ExpertTip title="Work Backward from Venue Curfew">
          When building your reception timeline, always work backward from your venue's strict end time or noise curfew to ensure you don't run out of time for open dancing.
        </ExpertTip>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="expert-tips">
          <span className="text-brand-pink mr-2">03.</span> Expert Scheduling Tips
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The biggest mistake couples make when planning their wedding day timeline is not building in buffer time. Hair and makeup almost always run longer than expected, and photo sessions get delayed by weather or family logistics. 
        </p>
        <p className="text-slate-700 leading-relaxed">
          Always add a 15 to 30-minute cushion between major blocks. Furthermore, map your financial budget against your timeline to prevent the common surprise of multiple massive final payments landing in the exact same month.
        </p>

        <figure className="my-8">
          <img src="/Tying Your Timeline to Your Wedding Checklist.webp" alt="Tying Your Timeline to Your Wedding Checklist" className="w-full h-auto rounded-3xl shadow-xl border border-slate-100 object-cover" loading="lazy" width="800" height="400" />
        </figure>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="common-mistakes">
          <span className="text-brand-pink mr-2">04.</span> Common Timeline Mistakes
        </h2>
        
        <div className="space-y-4 my-6">
          <CommonMistake title="Booking Out of Order">
            Booking florists or entertainment before you have locked in your venue and date leads to massive deposit losses if your venue isn't available.
          </CommonMistake>
          <CommonMistake title="Not Feeding Vendors">
            Always allocate time and budget to feed any vendors working through the reception, such as your photographer, videographer, and planner. They need a 30-minute break!
          </CommonMistake>
        </div>

        <ArticleCTA 
          type="download"
          title="Download the Master Timeline"
          description="Get our free, fully customizable month-by-month and hour-by-hour spreadsheet templates."
          buttonText="Get Free Templates"
          link="/blog/The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding"
        />

      </section>
    </BlogArticleLayout>
  );
}
