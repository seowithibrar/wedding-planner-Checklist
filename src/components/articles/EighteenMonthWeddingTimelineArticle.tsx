import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { QuickAnswerBox } from '../blog/QuickAnswerBox';
import { ExpertTip, CommonMistake, ProTip, ChecklistItem } from '../blog/CalloutBoxes';
import { ArticleCTA } from '../blog/ArticleCTA';

export function EighteenMonthWeddingTimelineArticle() {
  return (
    <BlogArticleLayout
      slug="18-month-wedding-planning-timeline"
      title="Complete 18-Month Wedding Planning Timeline: Month-by-Month Guide"
      category="Planning"
      readTime="18 Min Read"
      updatedAt="August 2026"
      heroImage="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200"
      heroImageAlt="Complete 18-Month Wedding Planning Timeline"
      metaDescription="The ultimate 18-month wedding planning timeline. Complete month-by-month guide, vendor booking schedules, budget breakdown, and multi-day cultural event planning."
      introduction={
        <p>
          Planning a wedding is one of life's most exciting milestones—but it can also feel overwhelming if you don't have a clear roadmap. Whether you're dreaming of an intimate ceremony or a grand celebration with hundreds of guests, one question always comes up: How much time do I actually need?
          <br /><br />
          The answer is simple: <strong>18 months is the ideal wedding planning timeline</strong>. This allows you to make thoughtful decisions without rushing, book top-tier vendors without settling, and enjoy your engagement stress-free.
        </p>
      }
      keyTakeaways={[
        "18 months provides breathing room without procrastination.",
        "Secure first pick of popular venues and in-demand vendors 12-18 months out.",
        "Spread expenses across a year and a half to ease financial pressure.",
        "Easily integrate multi-day cultural events like Mehndi, Baraat, and Walima."
      ]}
      tableOfContents={[
        { id: 'why-18-months', label: '1. Why 18 Months Is Ideal' },
        { id: 'foundation-phase', label: '2. Months 18-15: Foundation Phase' },
        { id: 'vendor-booking-phase', label: '3. Months 14-10: Vendor Booking' },
        { id: 'details-phase', label: '4. Months 9-6: The Details Phase' },
        { id: 'refinement-phase', label: '5. Months 5-3: Refinement Phase' },
        { id: 'finalization-phase', label: '6. Months 2-1: Finalization Phase' },
        { id: 'budget-breakdown', label: '7. Budget Breakdown by Phase' },
        { id: 'cultural-integration', label: '8. Cultural Ceremonies Integration' },
        { id: 'common-mistakes', label: '9. Common Timeline Mistakes' },
        { id: 'faq', label: '10. Frequently Asked Questions' }
      ]}
      faqs={[
        {
          q: "Is 18 months enough time to plan a wedding?",
          a: "Yes, 18 months is the ideal timeframe. It provides ample time for venue selection, vendor bookings, and attire customization without decision fatigue or rushing."
        },
        {
          q: "What should I do first when starting an 18-month timeline?",
          a: "Start by defining your overall budget range, drafting a preliminary guest count, and creating your aesthetic vision board before touring any venues."
        },
        {
          q: "When should I book my wedding venue?",
          a: "Book your venue between Months 16 and 15. In-demand venues often fill up 12 to 18 months in advance for peak wedding seasons."
        },
        {
          q: "How does an 18-month timeline work for multi-day South Asian weddings?",
          a: "An 18-month timeline is perfect for multi-day weddings (Mehndi, Baraat, Walima) because it gives you dedicated buffer months to secure separate venues, caterers, and outfits for each event."
        },
        {
          q: "What is the most expensive phase of wedding planning?",
          a: "Months 14-10 (Vendor Booking Phase) requires the largest cash outlay—typically 40% of your total budget—as venue, caterer, photographer, and florist deposits come due."
        },
        {
          q: "When should wedding invitations be sent out?",
          a: "Send save-the-dates around Month 11 and mail formal invitations in Month 9, setting an RSVP deadline 4 to 6 weeks prior to the wedding."
        },
        {
          q: "Can this 18-month timeline be shortened if needed?",
          a: "Yes, the logical sequence remains the same, but compressing below 12 months requires rapid decision-making and flexibility on vendor availability."
        },
        {
          q: "When should bridal hair and makeup trials be scheduled?",
          a: "Book your beauty team around Month 13 and schedule your trials around Months 7 to 4 to lock in your final look with confidence."
        }
      ]}
      conclusion={
        <p>
          Planning an 18-month wedding might seem like a long journey, but when followed month-by-month, it transforms from overwhelming to deeply enjoyable. Stay organized, trust the timeline, lean on your partner, and savor every milestone along the way to your big day!
        </p>
      }
    >
      <section className="space-y-6 text-left">
        <QuickAnswerBox title="What is the 18-month wedding planning timeline?">
          The 18-month timeline is structured into 4 core phases: <strong>Foundation Phase (Months 18-15)</strong> for budget & venue, <strong>Vendor Booking Phase (Months 14-10)</strong> for core professionals, <strong>Details Phase (Months 9-6)</strong> for decor & invitations, and <strong>Finalization Phase (Months 5-1)</strong> for logistics, fittings, & RSVPs.
        </QuickAnswerBox>

        {/* Section 1 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="why-18-months">
          <span className="text-brand-pink mr-2">01.</span> Why 18 Months Is the Ideal Planning Timeline
        </h2>
        <p className="text-slate-700 leading-relaxed">
          You might wonder: <em>Can't I plan a wedding in 6 months? What about 12 months? Why specifically 18?</em> The truth is that 18 months gives you something special that shorter timelines can't deliver: <strong>breathing room without procrastination</strong>.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Here is why an 18-month checklist works so effortlessly:
        </p>
        <div className="my-6 space-y-3">
          <ChecklistItem><strong>Thoughtful Research:</strong> Rushing into venue decisions means you might miss better options. 18 months lets you compare alternatives confidently.</ChecklistItem>
          <ChecklistItem><strong>First Pick of Top Vendors:</strong> Premier photographers, caterers, and florists book 12-18 months in advance during peak season.</ChecklistItem>
          <ChecklistItem><strong>Unbeatable Buffer Time:</strong> Surprises happen. An 18-month window allows you to handle vendor cancellations or garment alterations without stress.</ChecklistItem>
          <ChecklistItem><strong>Multi-Event Flexibility:</strong> Essential for Indian, Pakistani, or destination weddings requiring coordination for multiple functions.</ChecklistItem>
        </div>

        {/* AI Image Placeholder 1 */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 my-8 text-center space-y-3">
          <div className="text-xs font-bold text-brand-rosegold uppercase tracking-widest">Image Placeholder (1 / 6)</div>
          <p className="text-sm font-semibold text-slate-800">Alt Text: Elegant 18-Month Wedding Planning Notebook and Vision Board</p>
          <p className="text-xs text-slate-500">Filename: 18-month-wedding-planning-timeline-vision-board.webp</p>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 text-left">
            <strong>AI Image Prompt:</strong> Flatlay photography of a luxury wedding planner binder, gold pen, swatch cards of dusty rose and sage green, ring box, and silk ribbon on marble background, bright natural lighting, 8k resolution.
          </div>
        </div>

        {/* Section 2 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="foundation-phase">
          <span className="text-brand-pink mr-2">02.</span> Months 18-15: The Foundation Phase (Setting the Stage)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The first four months after engagement are dedicated to establishing your aesthetic vision, finalizing financial boundaries, and locking in your primary venue.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Month 18: Engagement & Vision Setting</h3>
        <p className="text-slate-700 leading-relaxed">
          Announce your engagement to family and close friends. Sit down with your partner to discuss your dream wedding style: intimate or grand? Traditional or modern? Destination or local? Create a shared Pinterest board and set a preliminary overall budget range.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Month 17: Core Framework & Budget Allocation</h3>
        <p className="text-slate-700 leading-relaxed">
          Build a master budget spreadsheet breaking down allocations for venue, catering, photography, attire, and a 10% emergency buffer. Draft your preliminary guest list to understand required venue capacities.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Month 16: Venue Research & Site Visits</h3>
        <p className="text-slate-700 leading-relaxed">
          Shortlist 8-10 potential venues that match your guest count and budget. Tour each site in person, assessing ceremony backdrops, reception acoustics, kitchen facilities, and Plan B indoor options.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Month 15: Major Bookings</h3>
        <p className="text-slate-700 leading-relaxed">
          Sign your venue contract and pay the deposit. With your wedding date locked, immediately book your lead photographer and videographer.
        </p>

        <ExpertTip title="The Golden Rule of Venue Visits">
          Never sign a venue contract until you have physically toured the Plan B indoor rain space and verified that catering kitchen policies match your menu vision.
        </ExpertTip>

        {/* AI Image Placeholder 2 */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 my-8 text-center space-y-3">
          <div className="text-xs font-bold text-brand-rosegold uppercase tracking-widest">Image Placeholder (2 / 6)</div>
          <p className="text-sm font-semibold text-slate-800">Alt Text: Luxurious Outdoor Wedding Venue Tour during Sunset</p>
          <p className="text-xs text-slate-500">Filename: luxury-outdoor-wedding-venue-tour.webp</p>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 text-left">
            <strong>AI Image Prompt:</strong> Sun-drenched garden wedding venue with floral arches, wooden chairs, manicured green lawn, soft sunset bokeh, ultra-detailed architectural photography.
          </div>
        </div>

        {/* Section 3 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="vendor-booking-phase">
          <span className="text-brand-pink mr-2">03.</span> Months 14-10: The Vendor Booking Phase (Securing Services)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          During this critical 5-month phase, secure the core creative team that will execute your wedding vision.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Month 14: Catering & Hotel Blocks</h3>
        <p className="text-slate-700 leading-relaxed">
          Schedule food tastings with top caterers. Secure room blocks at 2-3 nearby hotels for out-of-town guests and negotiate group discount rates.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Month 13: Creative Vendors & Beauty Team</h3>
        <p className="text-slate-700 leading-relaxed">
          Contract your florist, event decorator, bridal makeup artist, and hair stylist. Ensure your beauty team can accommodate your entire bridal party.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Month 12: Wedding Attire Shopping</h3>
        <p className="text-slate-700 leading-relaxed">
          Shop for your wedding gown, lehenga, or tuxedos. Custom bridal wear requires 4-6 months for production and multi-stage alterations.
        </p>

        <h3 className="font-heading text-xl font-bold text-brand-dark mt-6">Months 11-10: Invitations & Confirmations</h3>
        <p className="text-slate-700 leading-relaxed">
          Finalize your guest list, select your bridal party, design invitation suites, and conduct mid-way check-ins with all booked vendors.
        </p>

        <CommonMistake title="Ordering Attire Too Late">
          Custom bridal gowns and intricate hand-embroidered South Asian garments take up to 6 months to manufacture. Waiting past Month 11 risks heavy rush fees.
        </CommonMistake>

        {/* AI Image Placeholder 3 */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 my-8 text-center space-y-3">
          <div className="text-xs font-bold text-brand-rosegold uppercase tracking-widest">Image Placeholder (3 / 6)</div>
          <p className="text-sm font-semibold text-slate-800">Alt Text: Custom Bridal Gown Fitting and Embroidery Detail</p>
          <p className="text-xs text-slate-500">Filename: bridal-gown-fitting-embroidery.webp</p>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 text-left">
            <strong>AI Image Prompt:</strong> Close-up photography of intricate lace and beadwork on a bridal gown in a high-end boutique studio, soft natural window light, elegant aesthetic.
          </div>
        </div>

        {/* Section 4 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="details-phase">
          <span className="text-brand-pink mr-2">04.</span> Months 9-6: The Details Phase (Bringing Vision to Life)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          With core vendors locked in, shift your focus to guest communications, styling, and ceremony design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-brand-dark mb-2">Month 9: Mail Invitations</h4>
            <p className="text-xs text-slate-600">Mail official invitation suites. Set an RSVP deadline 4-6 weeks before the wedding and track responses in a master sheet.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-brand-dark mb-2">Month 8: Program & Music</h4>
            <p className="text-xs text-slate-600">Finalize ceremony readings, musical playlists with your DJ, cocktail hour entertainment, and reception order of events.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-brand-dark mb-2">Month 7: Garment Fittings</h4>
            <p className="text-xs text-slate-600">Attend your first bridal attire fitting with your wedding shoes and undergarments on hand for accurate hemming.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-brand-dark mb-2">Month 6: Decor Mockups</h4>
            <p className="text-xs text-slate-600">Approve centerpiece mockups with your florist, select linens, chargers, and finalize printed paper goods.</p>
          </div>
        </div>

        {/* AI Image Placeholder 4 */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 my-8 text-center space-y-3">
          <div className="text-xs font-bold text-brand-rosegold uppercase tracking-widest">Image Placeholder (4 / 6)</div>
          <p className="text-sm font-semibold text-slate-800">Alt Text: Elegant Wedding Table Setting with Florals and Place Cards</p>
          <p className="text-xs text-slate-500">Filename: wedding-table-setting-decor-mockup.webp</p>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 text-left">
            <strong>AI Image Prompt:</strong> Close-up shot of a luxury wedding reception table setting, tall floral centerpiece with white roses and eucalyptus, gold chargers, glass goblets, handwritten place card, ambient candlelight.
          </div>
        </div>

        {/* Section 5 & 6 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="refinement-phase">
          <span className="text-brand-pink mr-2">05.</span> Months 5-1: Refinement & Finalization Phase
        </h2>
        <p className="text-slate-700 leading-relaxed">
          The final trimester is dedicated to seating arrangements, vendor walk-throughs, day-of kits, and final payments.
        </p>
        <div className="space-y-3 my-6">
          <ChecklistItem><strong>Month 5 (Guest Headcount):</strong> Submit final RSVP counts to caterer and venue. Confirm shuttle logistics for out-of-town guests.</ChecklistItem>
          <ChecklistItem><strong>Month 4 (Beauty Trials):</strong> Conduct complete hair & makeup trial runs. Finalize morning getting-ready timeline.</ChecklistItem>
          <ChecklistItem><strong>Month 3 (Seating Chart):</strong> Build seating arrangements, print place cards, and review contingency plans for bad weather.</ChecklistItem>
          <ChecklistItem><strong>Month 2 (Final Walkthrough):</strong> Walk through venue with planner and coordinator. Envelope vendor final cash tips.</ChecklistItem>
          <ChecklistItem><strong>Month 1 (Pack & Rest):</strong> Assemble emergency beauty kit, pack attire, attend rehearsal dinner, and get plenty of rest!</ChecklistItem>
        </div>

        {/* AI Image Placeholder 5 */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 my-8 text-center space-y-3">
          <div className="text-xs font-bold text-brand-rosegold uppercase tracking-widest">Image Placeholder (5 / 6)</div>
          <p className="text-sm font-semibold text-slate-800">Alt Text: Bride Getting Hair and Makeup Touch-ups on Wedding Day</p>
          <p className="text-xs text-slate-500">Filename: bridal-beauty-hair-makeup-prep.webp</p>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 text-left">
            <strong>AI Image Prompt:</strong> Candid portrait of a bride in a silk robe getting final hair and makeup touch-ups in a bright bridal suite, soft focus background, elegant glowing lighting.
          </div>
        </div>

        {/* Section 7 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="budget-breakdown">
          <span className="text-brand-pink mr-2">07.</span> Budget Breakdown by Planning Phase
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Understanding cash flow timing helps prevent financial strain during your 18-month engagement:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden border border-slate-200 text-sm">
            <thead>
              <tr className="bg-brand-pink/20 text-brand-dark font-bold">
                <th className="p-4 border-b border-slate-200">Phase</th>
                <th className="p-4 border-b border-slate-200">% of Budget</th>
                <th className="p-4 border-b border-slate-200">Primary Expenses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-brand-dark">Months 18-15 (Foundation)</td>
                <td className="p-4">10%</td>
                <td className="p-4">Planner retainer, engagement photos, vision research</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-brand-dark">Months 14-10 (Booking)</td>
                <td className="p-4">40%</td>
                <td className="p-4">Venue, catering, photography, & florist deposits</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-brand-dark">Months 9-6 (Details)</td>
                <td className="p-4">25%</td>
                <td className="p-4">Bridal attire, invitation printing, jewelry, decor balances</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-brand-dark">Months 5-3 (Refinement)</td>
                <td className="p-4">15%</td>
                <td className="p-4">Beauty trials, tailoring alterations, printed paper goods</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-brand-dark">Months 2-1 (Finalization)</td>
                <td className="p-4">10%</td>
                <td className="p-4">Final vendor balances, cash tips, last-minute emergencies</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 8 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="cultural-integration">
          <span className="text-brand-pink mr-2">08.</span> Cultural Ceremonies Integration (Mehndi, Baraat, & Walima)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          If you're planning an Indian or Pakistani celebration, insert specific milestones into your timeline:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Mehndi (3-4 Weeks Prior):</strong> Finalize henna artist by Month 9; order vibrant decor by Month 6.</li>
          <li><strong>Baraat (Wedding Day):</strong> Coordinate procession timing, horse/car arrival, and sound equipment by Month 8.</li>
          <li><strong>Walima (Reception):</strong> Secure separate reception hall and distinct catering menu by Month 10.</li>
        </ul>

        {/* AI Image Placeholder 6 */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 my-8 text-center space-y-3">
          <div className="text-xs font-bold text-brand-rosegold uppercase tracking-widest">Image Placeholder (6 / 6)</div>
          <p className="text-sm font-semibold text-slate-800">Alt Text: Traditional South Asian Mehndi Celebration Decor and Henna Design</p>
          <p className="text-xs text-slate-500">Filename: south-asian-mehndi-celebration-henna-decor.webp</p>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 text-left">
            <strong>AI Image Prompt:</strong> Vibrant South Asian Mehndi setup with yellow and marigold drapery, intricate henna designs on bride's hands, colorful cushions, fairy lights background, 8k resolution.
          </div>
        </div>

        <ArticleCTA 
          type="download"
          title="Master Your 18-Month Timeline"
          description="Download our free interactive 18-month spreadsheet template with built-in deposit notifications and progress tracking."
          buttonText="Get Free 18-Month Checklist"
          link="/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding"
        />
      </section>
    </BlogArticleLayout>
  );
}
