import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { QuickAnswerBox } from '../blog/QuickAnswerBox';
import { ExpertTip, CommonMistake, ProTip, ChecklistItem } from '../blog/CalloutBoxes';
import { ArticleCTA } from '../blog/ArticleCTA';

export function FourteenMonthWeddingTimelineArticle() {
  return (
    <BlogArticleLayout
      slug="14-month-wedding-planning-timeline"
      title="The 14-Month Wedding Planning Timeline: Your Complete Month-by-Month Checklist"
      category="Planning"
      readTime="12 Min Read"
      updatedAt="July 2026"
      heroImage="/14-Month Wedding Planning Timeline.webp"
      heroImageAlt="The 14-Month Wedding Planning Timeline & Checklist"
      introduction={
        <p>
          You just got engaged, and somewhere between the celebration calls and the ring photos, a quieter thought creeps in: <em>where do we even start?</em> If your wedding is roughly 14 months away, you're in a genuinely good spot. It's enough time to book the venue and photographer you actually want, spread the cost across more paychecks, and make decisions without panic — without so much time that planning drags on for two years and loses momentum.
          <br /><br />
          This guide breaks that 14 months into a month-by-month checklist, explains the order vendors should actually be booked in, gives you a real budget breakdown, and includes a variant for multi-day South Asian celebrations, where the same 14 months has to stretch across several events instead of one.
        </p>
      }
      keyTakeaways={[
        "14 months is the sweet spot to secure in-demand venues and vendors without planning fatigue.",
        "Follow a strict vendor booking order: Venue & date first, followed immediately by photographer, caterer, and planner.",
        "Allocate 40-50% of your budget to venue & catering, and reserve a 5%+ contingency buffer from day one.",
        "South Asian and multi-day weddings should extend front-end planning to 15-18 months for secondary event venues and custom outfits."
      ]}
      tableOfContents={[
        { id: 'why-14-months', label: '1. Why 14 Months Is the Sweet Spot' },
        { id: 'month-by-month-timeline', label: '2. Month-by-Month Timeline' },
        { id: 'vendor-booking-order', label: '3. What Order to Book Wedding Vendors' },
        { id: 'wedding-budget-breakdown', label: '4. Wedding Budget Breakdown' },
        { id: 'multi-day-south-asian-wedding', label: '5. Multi-Day South Asian Wedding Adjustments' },
        { id: 'behind-schedule', label: '6. What If You\'re Behind Schedule?' },
        { id: 'faq', label: '7. Frequently Asked Questions' }
      ]}
      faqs={[
        {
          q: "Is 14 months too long to plan a wedding?",
          a: "No — 14 months is on the longer end of typical but gives real breathing room, especially for in-demand venues, popular dates, and multi-vendor coordination. Couples with less time simply compress the same task order."
        },
        {
          q: "What's the very first thing I should do when planning a wedding?",
          a: "Set a realistic budget and rough guest count before anything else. Venue and vendor options only make sense once you know roughly how many people and how much you're working with."
        },
        {
          q: "How far in advance should I book my wedding venue?",
          a: "Most popular venues get booked 10-14 months out, and earlier still for peak-season Saturday dates."
        },
        {
          q: "When should I book my wedding photographer?",
          a: "Around the same window as your venue, 10-12 months out, since strong photographers and videographers are often booked before couples realize it."
        },
        {
          q: "Can you plan a wedding in 6 months?",
          a: "Yes, though it means compressing the same task sequence and staying flexible on peak-demand vendors and dates rather than skipping steps."
        },
        {
          q: "What order should I book my wedding vendors in?",
          a: "Venue and date first, then photographer/videographer and caterer, then florist and attire, then smaller vendors like hair/makeup and transportation closer to the date."
        },
        {
          q: "How much of my budget should go toward the venue and catering?",
          a: "Venue and catering together typically take the largest single share of a wedding budget, commonly cited in the 40-50% range across wedding-industry budget breakdowns."
        },
        {
          q: "When should wedding invitations go out?",
          a: "Roughly 6-8 weeks before the wedding for most guests, earlier if a large share of guests are traveling from out of town."
        },
        {
          q: "What if I'm already behind on my wedding planning timeline?",
          a: "Prioritize venue, date, and the vendors with the longest lead times first, then work backward on lower-lead-time tasks like favors and final fittings."
        },
        {
          q: "How does the timeline change for a multi-day South Asian wedding?",
          a: "Add 2-4 months to the front end of the timeline to account for multiple ceremonies (mehndi, sangeet, haldi, main ceremony, reception/walima), since each event needs its own venue, vendor, and outfit coordination."
        }
      ]}
      conclusion={
        <p>
          You don't need to hold this entire 14-month timeline in your head at once — bookmark the master checklist table above and work through it one month at a time. If you're planning a multi-day celebration, start with the South Asian timeline adjustments before locking your first venue date, since that decision shapes everything downstream. Next, read our full breakdown of vendor booking order, or dig into the budget guide to plan your numbers before you start touring venues.
        </p>
      }
    >
      <section className="space-y-8 text-left">
        
        <QuickAnswerBox title="The 14-Month Wedding Planning Summary">
          <p className="mb-2">
            A 14-month timeline gives you maximum vendor availability and financial flexibility. Start with budget and venue in <strong>Months 14–13</strong>, lock top priority vendors (photographer, caterer) in <strong>Months 12–10</strong>, design details and order attire in <strong>Months 9–7</strong>, handle logistics and invitations in <strong>Months 6–3</strong>, and execute final countdown confirmations in <strong>Months 2–1</strong>.
          </p>
        </QuickAnswerBox>

        {/* Section 1 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="why-14-months">
          <span className="text-brand-pink mr-2">01.</span> Why 14 Months Is the Sweet Spot for Wedding Planning
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Fourteen months gives you enough runway to secure in-demand venues and vendors before they're booked out, spread costs over more paychecks instead of a compressed few months, and avoid the rushed decisions that cause most planning regrets — without so much lead time that the process stalls out. Most couples land somewhere between 12 and 18 months, and the tasks below work the same way regardless of exactly where you fall in that range; you're just compressing or stretching the same order.
        </p>

        <ExpertTip title="Why 14 Months Works Best">
          It hits the perfect balance: long enough to secure prime Saturday dates and custom bridal wear, but short enough to keep your excitement high without decision fatigue setting in.
        </ExpertTip>

        {/* Section 2 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="month-by-month-timeline">
          <span className="text-brand-pink mr-2">02.</span> The 14-Month Wedding Planning Timeline, Month by Month
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Here's the full timeline as a single reference table, followed by the reasoning behind each phase. Bookmark this table — it's the spine of everything else in this guide.
        </p>

        <figure className="my-8">
          <img 
            src="/Wedding Planning Checklist.webp" 
            alt="Wedding Planning Checklist Table" 
            className="w-full h-auto rounded-3xl shadow-xl border border-slate-100 object-cover" 
            loading="lazy" 
          />
          <figcaption className="text-center text-sm text-slate-500 mt-3 font-medium">
            Month-by-month wedding checklist roadmap.
          </figcaption>
        </figure>

        {/* Master Table */}
        <div className="overflow-x-auto my-8 border border-brand-pink/30 rounded-2xl shadow-sm bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-brand-pink/20 text-brand-dark font-heading font-bold">
              <tr>
                <th className="p-4 border-b border-brand-pink/30">Month</th>
                <th className="p-4 border-b border-brand-pink/30">Key Tasks</th>
                <th className="p-4 border-b border-brand-pink/30">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 14</td>
                <td className="p-4">Set budget, draft guest list, choose wedding party, start venue research</td>
                <td className="p-4"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">Foundation</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 13</td>
                <td className="p-4">Tour and book venue, set the date, book a wedding planner if using one</td>
                <td className="p-4"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">Foundation</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 12</td>
                <td className="p-4">Book photographer and videographer, start dress/suit shopping</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Vendor Booking</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 11</td>
                <td className="p-4">Book caterer, book officiant, research florists and décor vendors</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Vendor Booking</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 10</td>
                <td className="p-4">Book florist, book DJ/band, book hair and makeup artist</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Vendor Booking</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 9</td>
                <td className="p-4">Order bridesmaid/groomsmen attire, plan honeymoon, launch wedding website</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Vendor Booking</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 8</td>
                <td className="p-4">Design and order invitations, schedule menu tasting</td>
                <td className="p-4"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">Details & Design</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 7</td>
                <td className="p-4">Book transportation, finalize décor plan, register for gifts</td>
                <td className="p-4"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">Details & Design</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 6</td>
                <td className="p-4">Plan rehearsal dinner, book hotel blocks for out-of-town guests</td>
                <td className="p-4"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">Details & Design</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 5</td>
                <td className="p-4">First dress fitting, finalize ceremony details with officiant</td>
                <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">Logistics</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 4</td>
                <td className="p-4">Mail invitations, confirm vendor contracts, plan day-of transportation</td>
                <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">Logistics</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 3</td>
                <td className="p-4">Track RSVPs, order wedding favors, apply for marriage license (check timing)</td>
                <td className="p-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">Logistics</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 2</td>
                <td className="p-4">Final dress fitting, confirm final headcount, finalize seating chart</td>
                <td className="p-4"><span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-semibold">Final Countdown</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Month 1</td>
                <td className="p-4">Confirm all vendor timelines, break in shoes, prepare final payments</td>
                <td className="p-4"><span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-semibold">Final Countdown</span></td>
              </tr>
              <tr className="hover:bg-brand-pink/5 bg-brand-pink/10">
                <td className="p-4 font-semibold text-brand-dark">Wedding Week</td>
                <td className="p-4 font-medium">Rehearsal, delegate day-of tasks, pack for honeymoon, breathe</td>
                <td className="p-4"><span className="bg-rose-200 text-rose-900 px-2 py-1 rounded text-xs font-semibold">Final Countdown</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-700 leading-relaxed">
          Everything in this timeline starts with three decisions: your budget, your rough guest count, and your venue. Talk through your budget honestly — including who's contributing what — before you fall in love with a venue that doesn't fit it, and start touring venues immediately. For detailed steps on selecting a venue, read our guide on <a href="/blog/how-to-choose-the-perfect-wedding-venue" className="text-brand-pink hover:underline font-medium">how to choose the perfect wedding venue</a>.
        </p>
        <p className="text-slate-700 leading-relaxed">
          Once your date and venue are locked, book the vendors with the longest lead times next — photographer, videographer, and caterer — since strong photographers in particular get booked far ahead of when most couples expect. This is also when dress or suit shopping should start, since alterations and custom orders can take several months on their own.
        </p>
        <p className="text-slate-700 leading-relaxed">
          With the big vendors locked, the middle stretch is about the details that shape how the day feels: invitation design, décor direction, and your menu tasting, plus launching a wedding website so out-of-town guests have somewhere to check details early.
        </p>
        <p className="text-slate-700 leading-relaxed">
          As invitations go out and RSVPs start coming back, the day takes real shape on paper — refer to our guide on <a href="/blog/mastering-your-guest-list-and-seating-charts" className="text-brand-pink hover:underline font-medium">mastering your guest list & seating charts</a> to manage guest counts and seating effortlessly.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The final stretch is about confirmation, not new decisions: final headcount, final payments, final fittings, and a clear rundown for your wedding party and vendors so nothing depends on you remembering it that week.
        </p>

        {/* Section 3 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="vendor-booking-order">
          <span className="text-brand-pink mr-2">03.</span> What Order to Book Your Wedding Vendors (And Why It Matters)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Booking order isn't arbitrary — it follows lead time. Vendors who get booked out furthest in advance (venues, photographers) go first; vendors with more flexible availability closer to the date (favors, transportation) can wait. Booking out of this order is the single most common cause of "we couldn't get who we wanted" regret.
        </p>

        <figure className="my-8">
          <img 
            src="/What Order to Book Your Wedding Vendors.webp" 
            alt="Vendor Booking Order Timeline" 
            className="w-full h-auto rounded-3xl shadow-xl border border-slate-100 object-cover" 
            loading="lazy" 
          />
          <figcaption className="text-center text-sm text-slate-500 mt-3 font-medium">
            Visual guide to wedding vendor lead times and booking windows.
          </figcaption>
        </figure>

        <div className="overflow-x-auto my-8 border border-brand-pink/30 rounded-2xl shadow-sm bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-brand-pink/20 text-brand-dark font-heading font-bold">
              <tr>
                <th className="p-4 border-b border-brand-pink/30">Vendor</th>
                <th className="p-4 border-b border-brand-pink/30">Ideal Booking Window</th>
                <th className="p-4 border-b border-brand-pink/30">Why This Timing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Venue</td>
                <td className="p-4">12-14 months out</td>
                <td className="p-4">Popular venues and Saturday dates book furthest ahead</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Wedding planner (if using one)</td>
                <td className="p-4">12-13 months out</td>
                <td className="p-4">Best planners fill their calendar early, especially in peak season</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Photographer/Videographer</td>
                <td className="p-4">10-12 months out</td>
                <td className="p-4">Highly sought after and often booked before couples expect</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Caterer</td>
                <td className="p-4">10-11 months out</td>
                <td className="p-4">Menu planning and headcount logistics need long lead time</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Officiant</td>
                <td className="p-4">9-11 months out</td>
                <td className="p-4">Especially important if you want a specific person to officiate</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Florist</td>
                <td className="p-4">8-10 months out</td>
                <td className="p-4">Seasonal flower planning benefits from earlier commitment</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">DJ/Band</td>
                <td className="p-4">8-10 months out</td>
                <td className="p-4">Popular acts for your date can book out early in peak season</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Hair & makeup artist</td>
                <td className="p-4">8-9 months out</td>
                <td className="p-4">Trial scheduling needs to happen well before the big day</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Transportation</td>
                <td className="p-4">3-4 months out</td>
                <td className="p-4">More flexible availability closer to the date</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Favors & small décor</td>
                <td className="p-4">2-3 months out</td>
                <td className="p-4">Low lead-time items that don't need early commitment</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CommonMistake title="Booking Vendors Out of Order">
          Do not pick out bridesmaids' dresses or finalize florists before locking down your venue and date. Your venue sets the style, capacity, and lighting conditions for every other vendor!
        </CommonMistake>

        {/* Section 4 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="wedding-budget-breakdown">
          <span className="text-brand-pink mr-2">04.</span> Wedding Budget Breakdown: What Your 14 Months Will Actually Cost
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Wedding costs vary enormously by city, guest count, and season, so treat the percentages below as a planning starting point, not a promise — industry surveys such as <a href="https://www.theknot.com/content/wedding-checklist" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:underline font-medium">The Knot Real Weddings Study</a> consistently show venue and catering taking the largest single share, with the rest distributed across photography, attire, florals, and details. To maximize your budget, check out our guide on <a href="/blog/10-budget-saving-tips-every-couple-needs-to-know" className="text-brand-pink hover:underline font-medium">10 budget-saving tips every couple needs to know</a>.
        </p>

        <figure className="my-8">
          <img 
            src="/Secondary  alternative visual for Wedding Budget Breakdown.webp" 
            alt="Wedding Budget Breakdown" 
            className="w-full h-auto rounded-3xl shadow-xl border border-slate-100 object-cover" 
            loading="lazy" 
          />
          <figcaption className="text-center text-sm text-slate-500 mt-3 font-medium">
            Category percentages for realistic wedding budget allocation.
          </figcaption>
        </figure>

        <div className="overflow-x-auto my-8 border border-brand-pink/30 rounded-2xl shadow-sm bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-brand-pink/20 text-brand-dark font-heading font-bold">
              <tr>
                <th className="p-4 border-b border-brand-pink/30">Category</th>
                <th className="p-4 border-b border-brand-pink/30">% of Total Budget</th>
                <th className="p-4 border-b border-brand-pink/30">Typical Range Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Venue & catering</td>
                <td className="p-4 font-bold text-brand-rosegold">40-50%</td>
                <td className="p-4">Largest single share of most budgets</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Photography & videography</td>
                <td className="p-4 font-bold text-brand-rosegold">10-15%</td>
                <td className="p-4">Often the second-largest line item</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Attire (dress, suit, alterations)</td>
                <td className="p-4 font-bold text-brand-rosegold">8-10%</td>
                <td className="p-4">Includes fittings and accessories</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Florals & décor</td>
                <td className="p-4 font-bold text-brand-rosegold">8-10%</td>
                <td className="p-4">Varies most by season and style</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Music/entertainment</td>
                <td className="p-4 font-bold text-brand-rosegold">8-10%</td>
                <td className="p-4">DJ, band, or both</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Invitations & stationery</td>
                <td className="p-4 font-bold text-brand-rosegold">2-3%</td>
                <td className="p-4">Design, printing, postage</td>
              </tr>
              <tr className="hover:bg-brand-pink/5 bg-amber-50">
                <td className="p-4 font-semibold text-amber-900">Contingency buffer</td>
                <td className="p-4 font-bold text-amber-700">5%+</td>
                <td className="p-4 text-amber-900">Set aside from day one for last-minute costs</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ProTip title="Build Your Buffer Early">
          Build a contingency buffer into your budget from the very start rather than treating it as an afterthought — add-ons accumulate quietly over 14 months, from extra guests to upgraded catering choices, and a buffer keeps small surprises from becoming stressful ones.
        </ProTip>

        {/* Section 5 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="multi-day-south-asian-wedding">
          <span className="text-brand-pink mr-2">05.</span> Planning a Multi-Day South Asian Wedding? Adjust Your Timeline Like This
        </h2>
        <p className="text-slate-700 leading-relaxed">
          If you're planning an Indian, Pakistani, or broader South Asian wedding, the timeline above still applies — but it has to stretch across several distinct events instead of one ceremony. A typical celebration spans two to five days: mehndi, sangeet or haldi, the main ceremony (nikah or wedding), and a reception or walima, each with its own venue, vendors, and guest coordination. That's the single biggest reason South Asian weddings benefit from starting 15-18 months out rather than 12, especially for guest counts above 150 or celebrations with more than three events.
        </p>

        <figure className="my-8">
          <img 
            src="/Planning a Multi-Day South Asian Wedding.webp" 
            alt="Multi-Day South Asian Wedding Timeline" 
            className="w-full h-auto rounded-3xl shadow-xl border border-slate-100 object-cover" 
            loading="lazy" 
          />
          <figcaption className="text-center text-sm text-slate-500 mt-3 font-medium">
            Multi-day South Asian event timeline coordination.
          </figcaption>
        </figure>

        <div className="overflow-x-auto my-8 border border-brand-pink/30 rounded-2xl shadow-sm bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-brand-pink/20 text-brand-dark font-heading font-bold">
              <tr>
                <th className="p-4 border-b border-brand-pink/30">Event</th>
                <th className="p-4 border-b border-brand-pink/30">Standalone Timing</th>
                <th className="p-4 border-b border-brand-pink/30">Combined-Event Timing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Main venue & date</td>
                <td className="p-4">12-14 months out</td>
                <td className="p-4">15-18 months out (secondary event venues need booking too)</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Mehndi/sangeet venue</td>
                <td className="p-4 text-slate-400">N/A (single event)</td>
                <td className="p-4">12-15 months out, alongside main venue</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Photographer/videographer</td>
                <td className="p-4">10-12 months out</td>
                <td className="p-4">12-15 months out — premium teams covering multiple days book earliest</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Bridal outfits (per event)</td>
                <td className="p-4">6-8 months out</td>
                <td className="p-4">Start 6+ months earlier per outfit; top designers can have 6-month delivery timelines alone</td>
              </tr>
              <tr className="hover:bg-brand-pink/5">
                <td className="p-4 font-semibold text-brand-dark">Décor & floristry (per event)</td>
                <td className="p-4">6-8 months out</td>
                <td className="p-4">10-14 months out, coordinated across all venues</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-700 leading-relaxed">
          Two practical differences worth planning around: first, invitations for South Asian weddings often need to communicate multiple event dates and dress codes at once, so design and printing benefit from starting earlier than the 8-month mark suggested above. Second, because each additional event adds its own vendor set, the contingency buffer from the budget section above is worth increasing — many planners recommend closer to 15% for multi-event weddings, since add-ons compound across every additional celebration.
        </p>

        {/* Section 6 */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mt-12" id="behind-schedule">
          <span className="text-brand-pink mr-2">06.</span> What If You're Behind Schedule?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          If you're reading this with less than 14 months left, don't panic — the task order above still applies, you're just compressing it. Prioritize the vendors with the longest lead times first (venue, photographer, caterer) and be flexible on peak-season dates or in-demand vendors if your timeline is genuinely tight. A wedding planned in 6 months is entirely possible; it just means less room for a second-choice venue to become available if your first choice falls through.
        </p>

        <div className="my-6 space-y-3">
          <ChecklistItem><strong>Compress, Don't Skip:</strong> Keep the same logical sequence: Venue & Date → High-demand vendors → Attire & design → Final logistics.</ChecklistItem>
          <ChecklistItem><strong>Be Flexible on Dates:</strong> Fridays, Sundays, or off-peak months often have immediate venue and photographer availability.</ChecklistItem>
          <ChecklistItem><strong>Delegate Early:</strong> Involve your partner or a coordinator to manage concurrent vendor inquiries.</ChecklistItem>
        </div>

        <ArticleCTA 
          title="Ready to organize your wedding timeline?" 
          description="Use our free interactive wedding planning tools and customized checklists to keep every month on track effortlessly."
          buttonText="Explore Free Wedding Checklists"
        />

      </section>
    </BlogArticleLayout>
  );
}
