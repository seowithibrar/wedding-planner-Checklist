import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { QuickAnswerBox } from '../blog/QuickAnswerBox';
import { ExpertTip, CommonMistake, ProTip, ChecklistItem } from '../blog/CalloutBoxes';
import { ArticleCTA } from '../blog/ArticleCTA';

export function WeddingChecklistTipsArticle() {
  return (
    <BlogArticleLayout
      slug="wedding-planning-checklist-tips"
      title="20 Tips for Your Wedding Planning Checklist"
      category="Checklists"
      readTime="10 Min Read"
      updatedAt="July 2026"
      heroImage="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200"
      heroImageAlt="Couple looking at wedding planning checklist documents"
      introduction={
        <p>
          Most couples severely underestimate how many decisions a wedding actually involves. What starts as an exciting engagement announcement quickly turns into a mountain of vendor choices, deposit deadlines, and intricate logistical details.
          <br /><br />
          A solid wedding planning checklist changes everything. It provides a clear roadmap, reduces stress, and helps you actually enjoy your engagement. In this comprehensive guide, we've compiled 20 practical, proven tips designed to keep you organized, on budget, and on track—from the day you say "Yes" to your final send-off.
        </p>
      }
      keyTakeaways={[
        "Start 12-18 months early",
        "Build budget before booking",
        "Book vendors in strict order",
        "Appoint a day-of coordinator"
      ]}
      tableOfContents={[
        { id: 'early', label: '1. Early Planning' },
        { id: 'budget', label: '2. Budget Planning' },
        { id: 'guests', label: '3. Guest List Management' },
        { id: 'vendors', label: '4. Venue and Vendor Booking' },
        { id: 'bridal-party', label: '5. Bridal Party Logistics' },
        { id: 'legal', label: '6. Paperwork & Legalities' },
        { id: 'logistics', label: '7. Day-Of Logistics' },
        { id: 'faq', label: 'Frequently Asked Questions' }
      ]}
      faqs={[
        {
          q: "When should I start my wedding planning checklist?",
          a: "You should start your checklist 12 to 18 months before your desired wedding date. This ensures you have first pick of popular venues and in-demand vendors."
        },
        {
          q: "What is the very first thing to plan for a wedding?",
          a: "The very first step is defining your top three priorities as a couple and drafting a preliminary budget. Do not book a venue or hire a planner until you have a budget."
        },
        {
          q: "How do I keep track of all my wedding vendors?",
          a: "Use a master spreadsheet that lists every vendor's contact information, total contract price, deposit paid, balance due date, and day-of arrival time."
        },
        {
          q: "Is a day-of coordinator really necessary?",
          a: "Yes. You cannot manage catering issues, missing boutonnieres, or lost DJs while wearing a wedding dress. If you can't hire a professional, assign the role to a highly organized friend."
        },
        {
          q: "When do I need to finalize the seating chart?",
          a: "Finalize your seating chart two weeks before the wedding. Send it to your caterer and stationer immediately so they can print place cards and organize meal distribution."
        }
      ]}
      conclusion={
        <p>
          Remember: no wedding is absolutely perfect, but every couple who plans carefully ends up with a day they will treasure forever. Use these 20 tips, adapt them to your specific culture and context, and most importantly, lean on your partner when the planning gets tough!
        </p>
      }
    >
      
      <section className="space-y-6 text-left">
        <QuickAnswerBox title="What should be on a wedding planning checklist?">
          Your wedding planning checklist must be broken down chronologically. At the <strong>12-18 month mark</strong>, focus on budget, venue, and guest list. At the <strong>6-9 month mark</strong>, book florists, attire, and stationers. At the <strong>3 month mark</strong>, finalize the menu, rings, and honeymoon. At the <strong>1 month mark</strong>, finalize seating charts, vendor timelines, and final payments.
        </QuickAnswerBox>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="early">
          <span className="text-brand-pink mr-2">01.</span> Early Planning
        </h2>
        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 1: Start 12 to 18 months in advance</h3>
        <p className="text-slate-700 leading-relaxed">
          Most couples think six months is enough. However, popular venues book 12 to 18 months ahead. Starting early gives you first pick. Create your master list the week you get engaged and break it into chronological phases.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 2: Set Your Priorities Before Anything Else</h3>
        <p className="text-slate-700 leading-relaxed">
          Ask each other: <em>"What does our perfect wedding look like?"</em> Knowing your top three priorities helps you allocate budget wisely and prevents overspending on things you don't actually value.
        </p>

        <ExpertTip title="The 14% Savings Rule">
          Couples who start planning at least 12 months early spend an average of 14% less on vendors, simply because they have the time to negotiate and compare quotes without rushing.
        </ExpertTip>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="budget">
          <span className="text-brand-pink mr-2">02.</span> Budget Planning
        </h2>
        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 3: Build your budget before you book</h3>
        <p className="text-slate-700 leading-relaxed">
          A budget is not a limit—it is a tool. Set your total number first. Then divide it across categories like venue, catering, photography, flowers, and attire based on standard industry percentages.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 4: Add a 10% Contingency Buffer</h3>
        <p className="text-slate-700 leading-relaxed">
          Unexpected costs are guaranteed. A broken zipper, forgotten stationery, or last-minute vendor change costs money. If your total budget is £20,000, keep £2,000 unallocated from day one.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 5: Track Every Expense</h3>
        <p className="text-slate-700 leading-relaxed">
          Use a spreadsheet or a dedicated wedding app. Log every deposit, payment, and refund to prevent 'budget creep'—the slow drain of small unexpected costs.
        </p>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="guests">
          <span className="text-brand-pink mr-2">03.</span> Guest List Management
        </h2>
        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 6: Guest list dictates the venue</h3>
        <p className="text-slate-700 leading-relaxed">
          Your guest count drives almost every decision. Start with your absolute must-invite list. Then add a secondary list of people you would like to include if space allows.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 7: Collect RSVPs with a Deadline</h3>
        <p className="text-slate-700 leading-relaxed">
          Send invitations eight weeks before your wedding. Set a firm RSVP deadline of three weeks prior. Stick to it—chasing late responses wastes your time and delays catering finalization.
        </p>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="vendors">
          <span className="text-brand-pink mr-2">04.</span> Venue and Vendor Booking
        </h2>
        
        <div className="space-y-4 my-6">
          <ChecklistItem>
            <strong>Tip 8: Visit at least three venues:</strong> Photos hide poor acoustics, awkward layouts, and unreliable parking. Always visit in person.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Tip 9: Book in strict order:</strong> Venue first, then Photographer/Videographer, Caterer, DJ/Band, and finally Florist.
          </ChecklistItem>
          <ChecklistItem>
            <strong>Tip 10: Sign Contracts:</strong> A verbal agreement protects no one. Read every clause regarding cancellations and hidden fees.
          </ChecklistItem>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="bridal-party">
          <span className="text-brand-pink mr-2">05.</span> Bridal Party Logistics
        </h2>
        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 11: Written Role Sheets</h3>
        <p className="text-slate-700 leading-relaxed">
          Create a one-page role sheet for each person in your bridal party. Include their arrival time, responsibilities, and emergency contacts. Distribute it two weeks before the wedding.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-4">Tip 12: Schedule a Rehearsal</h3>
        <p className="text-slate-700 leading-relaxed">
          A wedding rehearsal is not optional. Walk through the full ceremony at least once. Couples who rehearse report 40% fewer ceremony mishaps.
        </p>

        <CommonMistake title="Forgetting the Legalities">
          <strong>Tip 13: Legal Marriage Requirements.</strong> The paperwork side of marriage varies wildly. Confirm your specific marriage license requirements at least six months out to avoid a disaster.
        </CommonMistake>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="legal">
          <span className="text-brand-pink mr-2">06.</span> Paperwork & Food
        </h2>
        <p className="text-slate-700 leading-relaxed">
          <strong>Tip 14: Name Change Tasks.</strong> If changing names, create a post-wedding task list starting with passports and driving licenses.
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Tip 15: Dietary Requirements.</strong> Ask every guest about allergies on the RSVP form. Pass this data directly to your caterer four weeks before the event.
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Tip 16: Evening Food Station.</strong> Wedding meals run long. Budget a small amount for late-night snacks to keep energy high.
        </p>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="logistics">
          <span className="text-brand-pink mr-2">07.</span> Day-Of Logistics
        </h2>
        <p className="text-slate-700 leading-relaxed">
          <strong>Tip 17: Finalise Seating Two Weeks Prior.</strong> Use a digital tool to map tables and group guests logically.
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Tip 18: Detailed Timeline.</strong> Your vendors need a minute-by-minute schedule covering makeup start times, cocktail hour, and the last dance.
        </p>
        <p className="text-slate-700 leading-relaxed">
          <strong>Tip 19: Appoint a Coordinator.</strong> You should not manage logistics in a wedding dress. Hand the timeline to a professional or a trusted friend.
        </p>

        <ProTip title="The Final Vendor Call">
          <strong>Tip 20: Confirm everything 3 days out.</strong> Call every vendor to confirm arrival time and setup location. This single step catches addressing typos and timing miscommunications before they become disasters.
        </ProTip>

        <ArticleCTA 
          type="download"
          title="The Ultimate Wedding Checklist"
          description="Don't miss a single detail. Download our comprehensive 12-month wedding planning checklist."
          buttonText="Download Free Checklist"
          link="/blog/The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding"
        />

      </section>
    </BlogArticleLayout>
  );
}
