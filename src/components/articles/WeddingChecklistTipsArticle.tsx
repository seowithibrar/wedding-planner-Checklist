import React from 'react';
import { BlogArticleLayout } from '../layout/BlogArticleLayout';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // Commonly used

export function WeddingChecklistTipsArticle() {
  return (
    <BlogArticleLayout
      slug="wedding-planning-checklist-tips"
      title="20 Tips for Your Wedding Planning Checklist"
      category="Checklists"
      readTime="10 Min Read"
      updatedAt="June 2026"
      heroImage="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200"
      heroImageAlt="Couple looking at wedding planning checklist documents"
      introduction={
        <p>
          Welcome to our comprehensive guide on 20 Tips for Your Wedding Planning Checklist. We've gathered the best tips and advice to help you plan the perfect wedding.
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
        <p>Thanks for reading our guide on 20 Tips for Your Wedding Planning Checklist. Happy planning!</p>
      }
    >
      
          <section className="space-y-4">
            <p className="text-lg font-medium text-slate-900 leading-relaxed text-left">
              Most couples underestimate how many decisions a wedding actually involves. What starts as an exciting announcement quickly turns into a mountain of choices, deadlines, and details.
            </p>
            <p className="text-left">
              A solid wedding planning checklist changes everything. It gives you a clear roadmap. It reduces stress. And it helps you enjoy the journey instead of dreading it.
            </p>
            <p className="text-left">
              In this guide, you will find 20 practical, proven tips. Each one is designed to keep you organized, on budget, and on track — from your engagement day to the final send-off.
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 1: Early Planning */}
          <section id="early" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">01.</span> Start Your Wedding Planning Checklist Early
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">1</span>
                  Tip 1: Begin planning 12 to 18 months in advance
                </h3>
                <p>
                  Most couples think six months is enough. However, popular venues book 12 to 18 months ahead. Starting early gives you first pick.
                </p>
                <p>
                  Create your master list the week you get engaged. Break it into phases: 12 months out, 9 months, 6 months, 3 months, and 30 days. This structure alone prevents last-minute panic.
                </p>
                
                {/* Pro Tip Callout */}
                <div className="mt-4 bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 items-start">
                  <Lightbulb size={20} className="text-rose-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-800">
                    <strong className="block font-bold mb-0.5">Pro Tip:</strong>
                    Couples who start planning at least 12 months early spend an average of 14% less on vendors, according to The Knot's annual wedding survey.
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">2</span>
                  Tip 2: Set Your Priorities Before Anything Else
                </h3>
                <p>
                  Ask each other one simple question: <em>"What does our perfect wedding look like?"</em> Your answers reveal what matters most. For example, one partner may prioritize food while the other cares about photography.
                </p>
                <p>
                  Knowing your top three priorities helps you allocate budget wisely. Therefore, you avoid overspending on things you don't actually value.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2: Budget Planning */}
          <section id="budget" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">02.</span> Budget Planning: The Foundation of Every Wedding Checklist
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">3</span>
                  Tip 3: Build your budget before you book anything
                </h3>
                <p>
                  A budget is not a limit — it is a tool. Set your total number first. Then divide it across categories like venue, catering, photography, flowers, and attire.
                </p>
                <p>
                  The average UK wedding costs around £20,000. The average Pakistani wedding in major cities ranges from PKR 2 million to PKR 10 million. Knowing the typical splits in your market helps you plan realistically.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">4</span>
                  Tip 4: Add a 10% Contingency Buffer
                </h3>
                <p>
                  Unexpected costs are not rare — they are guaranteed. A broken zipper, forgotten stationery, or last-minute vendor change costs money. Build a 10% buffer into your budget from day one.
                </p>
                <p>
                  Therefore, if your total budget is £20,000, keep £2,000 unallocated. This buffer is your peace of mind.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">5</span>
                  Tip 5: Track Every Expense in One Place
                </h3>
                <p>
                  Use a spreadsheet or a dedicated wedding budgeting app. Log every deposit, payment, and refund. This habit prevents 'budget creep' — the slow drain of small unexpected costs that together become a big problem.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 3: Guest List Management */}
          <section id="guests" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">03.</span> Guest List Management on Your Wedding Planning Checklist
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">6</span>
                  Tip 6: Create your guest list before choosing a venue
                </h3>
                <p>
                  Your guest count drives almost every other decision. Venue capacity, catering cost, stationery quantity — all depend on how many people attend.
                </p>
                <p>
                  Start with your absolute must-invite list. Then add a secondary list of people you would like to include if space allows. This two-tier system prevents awkward last-minute cuts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">7</span>
                  Tip 7: Collect RSVPs with a Deadline
                </h3>
                <p>
                  Send invitations at least eight weeks before your wedding. Set a firm RSVP deadline of three weeks before the event. This gives caterers the accurate headcount they need.
                </p>
                <p>
                  For example, if your wedding is on 15 August, your RSVP deadline should fall no later than 25 July. Stick to it — chasing late responses wastes your time.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 4: Venue and Vendor Booking */}
          <section id="vendors" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">04.</span> Venue and Vendor Booking Tips
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">8</span>
                  Tip 8: Visit at least three venues before committing
                </h3>
                <p>
                  Every venue looks beautiful in photos. However, photos hide poor acoustics, awkward layouts, and unreliable parking. Always visit in person.
                </p>
                <p>
                  When you visit, bring your checklist. Ask about catering exclusivity, noise curfews, vendor restrictions, and setup times. These details often reveal hidden costs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">9</span>
                  Tip 9: Book Your Vendors in This Exact Order
                </h3>
                <p>
                  The most in-demand vendors book up fastest. Therefore, secure them in this order:
                </p>
                
                <ol className="space-y-3 pl-4">
                  {[
                    { title: "Venue", desc: "This date anchors everything else" },
                    { title: "Photographer and videographer", desc: "Top ones book 12 months ahead" },
                    { title: "Caterer", desc: "Especially if the venue does not provide one" },
                    { title: "Band or DJ", desc: "Live music acts often have only one booking per date" },
                    { title: "Florist", desc: "Allow 6 to 9 months lead time for peak season" }
                  ].map((v, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="font-bold text-rose-500 text-sm">{i+1}.</span>
                      <div>
                        <strong>{v.title}</strong> — {v.desc}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">10</span>
                  Tip 10: Always Sign Contracts with Every Vendor
                </h3>
                <p>
                  A verbal agreement protects no one. Every vendor relationship — no matter how friendly — needs a written contract. It should cover the date, services, total cost, payment schedule, and cancellation policy.
                </p>
                <p>
                  However, do not just sign what they hand you. Read every clause. Ask for amendments if something feels unclear.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 5: Bridal Party */}
          <section id="bridal-party" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">05.</span> Your Wedding Day Checklist for the Bridal Party
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">11</span>
                  Tip 11: Give every bridal party member a written role sheet
                </h3>
                <p>
                  Bridesmaids and groomsmen want to help. The problem is that most do not know what 'helping' actually means on the day.
                </p>
                <p>
                  Create a one-page role sheet for each person. Include their arrival time, responsibilities, and emergency contact. Distribute it two weeks before the wedding. This single action prevents at least a dozen day-of problems.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">12</span>
                  Tip 12: Schedule a Rehearsal — No Exceptions
                </h3>
                <p>
                  A wedding rehearsal is not optional. It is a dry run for the most important performance of your life. Walk through the full ceremony at least once, ideally the evening before.
                </p>
                
                {/* Stats Callout */}
                <div className="mt-4 bg-rose-50/50 border border-rose-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-rose-100 text-rose-600 font-black text-2xl shrink-0 shadow-inner">
                    <span>40%</span>
                  </div>
                  <div className="text-sm">
                    <strong className="block text-slate-900 text-base mb-1">Fewer Ceremony Mishaps</strong>
                    <p className="text-slate-600 text-left">
                      Couples who rehearse report 40% fewer ceremony mishaps, according to a WeddingWire survey of 1,200 newlyweds. That statistic alone makes rehearsal time well spent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 6: Paperwork & Legalities */}
          <section id="legal" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">06.</span> Wedding Planning Checklist for Paperwork and Legalities
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">13</span>
                  Tip 13: Confirm your legal marriage requirements early
                </h3>
                <p>
                  The paperwork side of marriage varies by country, region, and religion. Many couples discover requirements too late and scramble at the last minute.
                </p>
                <p>
                  In the UK, you must give notice at your local register office at least 28 days before the ceremony. In Pakistan, a Nikah Nama must be signed by both parties and two witnesses. Confirm your specific requirements at least six months out.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">14</span>
                  Tip 14: Organise Post-Wedding Name Change Tasks
                </h3>
                <p>
                  If either partner changes their name, create a post-wedding task list. Start with your passport and driving licence. Then move to bank accounts, insurance, and professional registrations.
                </p>
                <p>
                  This process takes time. Starting it the week after your honeymoon saves you weeks of confusion.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 7: Food, Drinks, and Dietary Needs */}
          <section id="food" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">07.</span> Food, Drinks, and Dietary Needs on Your Checklist
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">15</span>
                  Tip 15: Collect dietary requirements with your RSVP
                </h3>
                <p>
                  Ask every guest about allergies and dietary preferences on the RSVP form. Do not assume. Even small oversights — like serving a dish with nuts — can turn a beautiful evening into a medical emergency.
                </p>
                <p>
                  Pass this data directly to your caterer at least four weeks before the event. Confirm the count one week before.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">16</span>
                  Tip 16: Plan for an Evening Food Station
                </h3>
                <p>
                  Wedding meals often run long. Guests who arrived at 5pm may not eat a full meal until 9pm. An evening food station — sandwiches, a cheese board, or a dessert table — keeps energy high and guests happy.
                </p>
                <p>
                  Therefore, budget a small amount for late-night snacks. Your guests will remember it fondly.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 8: Seating, Décor, and Day-Of Logistics */}
          <section id="logistics" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">08.</span> Seating, Décor, and Day-Of Logistics
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">17</span>
                  Tip 17: Finalise your seating chart at least two weeks before
                </h3>
                <p>
                  Seating charts stress more couples out than almost any other task. However, leaving it too late makes it ten times harder.
                </p>
                <p>
                  Use a digital tool to map tables. Group guests by relationship, not just familiarity. Consider placing elderly or less mobile guests near entrances.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">18</span>
                  Tip 18: Create a Detailed Day-of Timeline
                </h3>
                <p>
                  Your vendors need a minute-by-minute schedule. Include hair and makeup start times, ceremony start, cocktail hour, first dance, speeches, cake cutting, and last dance.
                </p>
                
                {/* Premium Vertical Timeline Component */}
                <div className="mt-6 border-l-2 border-rose-100 ml-4 pl-6 space-y-6 relative">
                  {[
                    { time: "10:00 AM", event: "Hair and makeup begins for bridal party" },
                    { time: "1:00 PM", event: "Photographer arrives for getting-ready shots" },
                    { time: "3:30 PM", event: "First look photos" },
                    { time: "5:30 PM", event: "Guests begin arriving" },
                    { time: "6:00 PM", event: "Ceremony begins" },
                    { time: "6:45 PM", event: "Cocktail hour" },
                    { time: "8:00 PM", event: "Reception dinner" },
                    { time: "11:30 PM", event: "Last dance" }
                  ].map((item, idx) => (
                    <div key={idx} className="relative group text-left">
                      {/* Circle indicator */}
                      <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-rose-300 bg-white group-hover:bg-rose-500 transition-colors" />
                      
                      <div className="text-xs text-rose-500 font-bold mb-0.5">{item.time}</div>
                      <div className="text-sm font-semibold text-slate-800">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">19</span>
                  Tip 19: Appoint a Day-of Coordinator
                </h3>
                <p>
                  You should not manage logistics on your own wedding day. Hire a professional coordinator, or assign a trusted, organised friend or family member.
                </p>
                <p>
                  Give this person your full vendor contact list, timeline, and a printed floor plan. They become the point of contact for every vendor so you stay present and relaxed.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 9: Final Week */}
          <section id="final" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">09.</span> Final Week Wedding Planning Checklist Tasks
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs">20</span>
                  Tip 20: Conduct a final vendor confirmation call three days before
                </h3>
                <p>
                  Call or message every vendor. Confirm arrival time, setup location, and any last-minute details.
                </p>
                <p>
                  This single step catches problems before they become day-of disasters. For example, a florist once delivered to the wrong venue because of an address typo on a contract. A confirmation call the day before caught the error in time.
                </p>
                
                {/* Emergency Kit Highlight */}
                <div className="mt-4 bg-slate-950 text-white rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10 space-y-3 text-left">
                    <h4 className="text-base font-bold flex items-center gap-2 text-rose-400">
                      <Sparkles size={18} /> Emergency Kit Checklist
                    </h4>
                    <p className="text-xs text-slate-300">
                      Pack an emergency kit for the wedding day. It takes five minutes to gather and can save the day:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                      {[
                        "Safety pins", "Stain pen",
                        "Painkillers", "Phone charger",
                        "Breath mints", "Small sewing kit"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-200">
                          <Check size={12} className="text-rose-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Conclusion */}
          <section className="space-y-6 text-left">
            <h2 className="text-2xl font-bold text-slate-900">
              Conclusion: Your Wedding Planning Checklist Is Your Best Friend
            </h2>
            <p>
              Planning a wedding is genuinely one of life's most joyful — and most complex — experiences. A well-built wedding planning checklist transforms overwhelming chaos into manageable steps.
            </p>
            <p>
              You now have 20 proven tips that cover every major area: budget, vendors, guests, legalities, food, logistics, and the final countdown. Use them in order. Adapt them to your culture and context. And always keep your checklist updated.
            </p>
            
            {/* Final Quote */}
            <div className="bg-white border border-slate-200 border-l-4 border-l-rose-500 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute right-4 bottom-2 opacity-5 text-rose-500">
                <Quote size={80} />
              </div>
              <p className="text-lg italic text-slate-900 font-semibold leading-relaxed relative z-10">
                "Remember: no wedding is perfect. However, every couple who plans carefully ends up with a day they will treasure forever."
              </p>
              <span className="text-xs uppercase font-bold text-rose-500 mt-3 block tracking-widest">— Wedding Planning Checklists Team</span>
            </div>
          </section>

        
    </BlogArticleLayout>
  );
}
