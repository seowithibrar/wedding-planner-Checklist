import React from 'react';
import { 
  Heart, 
  CheckCircle2, 
  Users, 
  Calendar, 
  BarChart3, 
  Store,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import { LandingNav } from './LandingNav';
import { Footer } from './Footer';

interface LandingPageProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onBlog: () => void;
  onContact: () => void;
  couple: { partner1: string; partner2: string };
}

export function LandingPage({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onBlog, onContact, couple }: LandingPageProps) {

  const features = [
    {
      title: 'Smart Checklist',
      description: 'Manage every detail with our priority-sorted task manager.',
      icon: CheckCircle2,
      color: 'bg-rose-50 text-rose-500'
    },
    {
      title: 'Guest List',
      description: 'Keep track of RSVPs, dietary needs, and plus-ones easily.',
      icon: Users,
      color: 'bg-blue-50 text-blue-500'
    },
    {
      title: 'Budget Tracker',
      description: 'Never overspend with real-time allocation and tracking.',
      icon: BarChart3,
      color: 'bg-emerald-50 text-emerald-500'
    },
    {
      title: 'Vendor Marketplace',
      description: 'Book and manage your favorite vendors in one place.',
      icon: Store,
      color: 'bg-amber-50 text-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} onPrivacy={onPrivacy} onBlog={onBlog} onContact={onContact} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles size={14} />
              The Ultimate Planning Experience
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              Planning your <span className="text-rose-500 underline decoration-rose-200 underline-offset-8">Perfect Day</span> is now easy.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 font-medium leading-relaxed"
            >
              Welcome, {couple.partner1} & {couple.partner2}. We\'ve built a dedicated suite of tools to help you manage your guest list, tracks budgets, and book vendors without the stress.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button 
                onClick={onStart}
                className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Start Planning Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-colors">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Your Planning Command Center</h2>
            <p className="text-slate-500 font-medium">Everything you need to orchestrate the wedding of your dreams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.color)}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-rose-500 rounded-[48px] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-2xl space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Join 10,000+ couples planning their dream wedding with us.</h2>
              <div className="flex gap-12">
                <div>
                  <p className="text-3xl font-bold">120k+</p>
                  <p className="text-rose-100 text-sm font-medium">Tasks Completed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50k+</p>
                  <p className="text-rose-100 text-sm font-medium">Guests Managed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">$20M+</p>
                  <p className="text-rose-100 text-sm font-medium">Budgets Saved</p>
                </div>
              </div>
              <button 
                onClick={onStart}
                className="bg-white text-rose-500 px-8 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-colors shadow-lg"
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-16 text-slate-600">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Plan Your Dream Wedding Without Missing a Single Detail</h2>
            <p className="text-lg leading-relaxed">Planning a wedding is one of the most exciting journeys of your life — and one of the most overwhelming. With hundreds of tasks, dozens of vendors, and thousands of decisions to make, even the most organized couples can feel lost. That is exactly why having a well-structured wedding planning checklist is the single most important tool you can use from the moment you get engaged.</p>
            <p className="text-lg leading-relaxed">Our complete wedding planning checklists guide covers everything — from setting your budget 12 months out to packing your bridal emergency kit the night before your big day. Whether you are planning a grand ballroom celebration, a destination wedding, a cozy backyard ceremony, or a traditional Pakistani wedding, this checklist keeps every task, timeline, and vendor organized in one place.</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">What Is a Wedding Planning Checklist and Why Do You Need One?</h3>
            <p className="text-lg leading-relaxed">A wedding planning checklist is a structured, step-by-step to-do list that organizes every task involved in planning your wedding — sorted by priority, timeline, and category.</p>
            <p className="text-lg leading-relaxed">Without one, couples often:</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>Forget to book vendors until it is too late</li>
              <li>Overspend because there is no budget tracking</li>
              <li>Miss deadlines for invitations, RSVPs, or final payments</li>
              <li>Feel stressed and overwhelmed in the final weeks</li>
            </ul>
            <p className="text-lg leading-relaxed font-medium text-slate-800">With a proper wedding planner checklist, you always know exactly what needs to be done next, what has been completed, and what requires your attention today.</p>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">The Ultimate Month-by-Month Wedding Planning Checklist</h2>
            <p className="text-lg leading-relaxed">This is the most comprehensive month-by-month wedding checklist available — organized from engagement day to honeymoon morning.</p>

            <div className="bg-rose-50 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-rose-900">✅ 12 Months Before the Wedding</h3>
              <p className="text-rose-800">This is the foundation stage. The decisions you make now save you thousands of dollars and enormous stress later.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-rose-900 mb-3">Budget & Vision</h4>
                  <ul className="list-disc pl-5 space-y-2 text-rose-800">
                    <li>Set your total wedding budget</li>
                    <li>Decide how many guests to invite</li>
                    <li>Define your wedding style and theme</li>
                    <li>Discuss must-haves vs. nice-to-haves as a couple</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-rose-900 mb-3">Venue & Date</h4>
                  <ul className="list-disc pl-5 space-y-2 text-rose-800">
                    <li>Research and visit potential wedding venues</li>
                    <li>Book your ceremony and reception venue</li>
                    <li>Lock in your official wedding date</li>
                    <li>Check local event permits if required</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-bold text-rose-900 mb-3">Key Vendors to Book Now</h4>
                  <ul className="list-disc pl-5 space-y-2 text-rose-800">
                    <li>Wedding photographer</li>
                    <li>Wedding videographer</li>
                    <li>Band or DJ</li>
                    <li>Wedding coordinator or full-service planner</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/60 p-4 rounded-xl mt-6 border border-rose-100">
                <p className="text-sm font-medium text-rose-900"><strong className="font-bold">Pro Tip:</strong> The best photographers, videographers, and venues book out 12–18 months in advance, especially for peak wedding season. This is the most critical time on your entire wedding planning timeline.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">✅ 9 Months Before the Wedding</h3>
              <p className="text-slate-600">With your venue secured, it is time to build out the rest of your vendor team and finalize your aesthetic.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Wedding Dress & Attire</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Begin shopping for your wedding dress (Allow 4–6 months for production)</li>
                    <li>Choose bridesmaids&apos; attire and groomsmen suits</li>
                    <li>Research wedding jewelry and accessories</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Vendors</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Hire your florist and discuss floral vision</li>
                    <li>Book your caterer or confirm venue catering</li>
                    <li>Research and book your wedding cake designer</li>
                    <li>Hire a makeup artist and hair stylist</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-bold text-slate-900 mb-3">Stationery & Branding</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Design and order save-the-dates</li>
                    <li>Begin creating your wedding website</li>
                    <li>Start your wedding registry</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">✅ 6 Months Before the Wedding</h3>
              <p className="text-slate-600">The halfway mark is where planning shifts into high gear. Your wedding preparation checklist for this phase focuses on communication and confirmation.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Invitations</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Finalize your guest list</li>
                    <li>Order wedding invitations and envelopes</li>
                    <li>Write and proofread all invitation content</li>
                    <li>Mail invitations (aim for 6–8 weeks before the wedding)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Planning Details</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Book honeymoon travel and accommodations</li>
                    <li>Arrange hotel room blocks for out-of-town guests</li>
                    <li>Plan and book rehearsal dinner venue</li>
                    <li>Schedule hair and makeup trials</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-bold text-slate-900 mb-3">Décor</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Finalize wedding color palette and décor theme</li>
                    <li>Book wedding rentals (chairs, linens, lighting, arches)</li>
                    <li>Begin DIY décor projects if applicable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">✅ 3 Months Before the Wedding</h3>
              <p className="text-slate-600">Now it is time for confirmations, contracts, and final decisions.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Guest & RSVP Management</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Track RSVPs as they arrive</li>
                    <li>Finalize headcount and share with caterer</li>
                    <li>Create seating chart and table assignments</li>
                    <li>Order place cards, table numbers, and menu cards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Final Vendor Confirmations</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Confirm all vendor bookings in writing</li>
                    <li>Create a wedding day contact sheet for all vendors</li>
                    <li>Review all vendor contracts and payment schedules</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-bold text-slate-900 mb-3">Ceremony Planning</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Write or finalize wedding vows</li>
                    <li>Plan ceremony order of events</li>
                    <li>Book officiant and confirm ceremony structure</li>
                    <li>Plan readings, music, and special rituals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">✅ 1 Month Before the Wedding</h3>
              <p className="text-slate-600">The final stretch. Your wedding day checklist begins forming now.</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Logistics</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Confirm arrival times with all vendors</li>
                    <li>Finalize ceremony and reception timeline</li>
                    <li>Attend wedding rehearsal & host rehearsal dinner</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Personal Preparation</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Pick up wedding dress after final alterations</li>
                    <li>Prepare wedding day emergency kit</li>
                    <li>Break in wedding shoes</li>
                    <li>Arrange transportation for wedding party</li>
                  </ul>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-bold text-slate-900 mb-3">Administration</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Obtain your marriage license</li>
                    <li>Confirm honeymoon bookings and pack documents</li>
                    <li>Prepare tip envelopes for vendors</li>
                    <li>Delegate wedding day tasks to trusted people</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white">✅ Wedding Week Checklist</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-3">Monday–Thursday</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Final venue walkthrough</li>
                    <li>Confirm all vendor arrival times</li>
                    <li>Deliver items to venue (guestbook, favors, décor)</li>
                    <li>Rest and practice self-care</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">Day Before</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Attend wedding rehearsal</li>
                    <li>Charge all devices (phone, camera backup)</li>
                    <li>Lay out everything you need for the next day</li>
                    <li>Pack your bridal emergency kit</li>
                    <li>Get a good night&apos;s sleep</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">Wedding Morning</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Eat a proper breakfast</li>
                    <li>Begin hair and makeup on schedule</li>
                    <li>Designate someone to handle vendor questions</li>
                    <li>Give rings to your ring bearer or best man</li>
                    <li>Breathe, smile, and enjoy every moment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">The Essential Bridal Emergency Kit Checklist</h2>
            <p className="text-lg leading-relaxed">Every bride needs a bridal emergency kit. Pack these essentials the night before:</p>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Category</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200">Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900">Beauty</td>
                    <td className="px-6 py-4 text-slate-600">Lipstick/gloss, bobby pins, hairspray, blotting papers, safety pins</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900">Health</td>
                    <td className="px-6 py-4 text-slate-600">Pain reliever, antacids, allergy medication, bandages</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900">Wardrobe</td>
                    <td className="px-6 py-4 text-slate-600">Stain remover pen, fashion tape, needle and thread, extra earring backs</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900">Practical</td>
                    <td className="px-6 py-4 text-slate-600">Phone charger, cash, vendor contact list, marriage license reminder</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-slate-900">Comfort</td>
                    <td className="px-6 py-4 text-slate-600">Breath mints, snacks, water bottle, comfortable backup shoes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Wedding Budget Checklist: Know Where Every Rupee Goes</h2>
            <p className="text-lg leading-relaxed">A wedding budget checklist prevents overspending and ensures you allocate wisely. Here is a standard budget breakdown by category:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Venue & Catering', value: '40–45%' },
                { label: 'Photography & Video', value: '10–12%' },
                { label: 'Music & Entertainment', value: '5–8%' },
                { label: 'Flowers & Décor', value: '8–10%' },
                { label: 'Wedding Attire', value: '5–8%' },
                { label: 'Stationery', value: '2–3%' },
                { label: 'Transportation', value: '2–3%' },
                { label: 'Hair & Makeup', value: '2–3%' },
                { label: 'Honeymoon', value: '8–10%' },
                { label: 'Emergency Buffer', value: '5–10%' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                  <span className="font-semibold text-slate-900">{item.label}</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-rose-500 shadow-sm">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-lg leading-relaxed font-medium mt-4 bg-rose-50 p-4 rounded-xl text-rose-900">Always keep 5–10% of your total budget as a buffer. Unexpected costs are guaranteed — being prepared for them is what separates stress-free planning from last-minute panic.</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Wedding Vendor Checklist: Every Supplier You Need to Book</h2>
            <p className="text-lg leading-relaxed">Your wedding vendor checklist should cover all of the following categories. Book the high-demand vendors first.</p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Must-Book Vendors (12+ Months Out)</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Wedding venue</li>
                  <li>Photographer & Videographer</li>
                  <li>Band or DJ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Book 6–9 Months Out</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Caterer & Florist</li>
                  <li>Wedding cake designer</li>
                  <li>Makeup artist and hair stylist</li>
                  <li>Wedding coordinator</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Book 3–6 Months Out</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Officiant</li>
                  <li>Transportation (limo, car service)</li>
                  <li>Photo booth & Wedding rentals company</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Book 1–3 Months Out</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>Rehearsal dinner venue</li>
                  <li>Hair and makeup trial</li>
                  <li>Final dress fittings</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Wedding Stationery Checklist</h2>
            <p className="text-lg leading-relaxed">Your wedding stationery checklist covers all printed and digital materials:</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-3">Pre-Wedding</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                  <li>Save-the-dates</li>
                  <li>Wedding invitations</li>
                  <li>RSVP cards and envelopes</li>
                  <li>Directions / accommodation insert cards</li>
                  <li>Wedding website URL card</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-3">Day-of Stationery</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                  <li>Ceremony programs</li>
                  <li>Table numbers & Place cards</li>
                  <li>Menu cards</li>
                  <li>Seating chart display</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-3">Post-Wedding</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                  <li>Thank-you cards</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Wedding Checklists for Every Type of Wedding</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Pakistani & Muslim Wedding Checklist</h4>
                <p className="text-slate-600 leading-relaxed">Pakistan and Muslim weddings often span multiple events — Mehndi, Baraat, Nikkah, and Walima. Your checklist needs to cover vendor bookings, outfits, and logistics for each separate event in addition to the main ceremony.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Destination Wedding Checklist</h4>
                <p className="text-slate-600 leading-relaxed">Add passport renewals, travel insurance, venue visits, and guest travel coordination to your standard checklist. Book everything 18 months out due to travel logistics.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Backyard Wedding Checklist</h4>
                <p className="text-slate-600 leading-relaxed">Your checklist must include permits, restroom rental, power/generator access, tent rental, and catering logistics that a standard venue would typically handle.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Intimate / Small Wedding Checklist</h4>
                <p className="text-slate-600 leading-relaxed">With fewer guests, focus your checklist on elevated details — personalized touches, premium catering, and premium photography rather than large-scale logistics.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">DIY Wedding Checklist</h4>
                <p className="text-slate-600 leading-relaxed">Add dedicated timelines for each DIY project with completion dates. Assign helpers. Build in extra buffer time — DIY always takes longer than expected.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">How to Use Our Free Printable Wedding Checklist</h2>
            <p className="text-lg leading-relaxed">Our free printable wedding checklist is designed for real couples managing real budgets and real timelines. Here is how to make the most of it:</p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-slate-600">
              <li>Download and print your complete checklist or use it digitally</li>
              <li>Assign dates to every task based on your wedding date</li>
              <li>Check off items as you complete them — the dopamine hit is real</li>
              <li>Share with your partner so planning stays collaborative</li>
              <li>Review weekly every Sunday to stay on track</li>
            </ul>
          </div>

          <div className="space-y-6 border-t border-slate-200 pt-12">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">How far in advance should I start using a wedding planning checklist?</h4>
                <p className="text-slate-600 leading-relaxed">Ideally the day after you get engaged. If your wedding is 12+ months away, you have the luxury of a relaxed pace. If it is 6 months away, start immediately — especially for venue and photographer bookings.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">What is the most important thing on a wedding checklist?</h4>
                <p className="text-slate-600 leading-relaxed">Booking your venue and date is the single most critical task. Everything else — vendors, invitations, décor — flows from that one decision.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Can I use a wedding checklist for a small or intimate wedding?</h4>
                <p className="text-slate-600 leading-relaxed">Absolutely. A small wedding still requires most of the same tasks. The checklist simply scales — fewer guests but the same vendor needs, stationery needs, and timeline requirements.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Do I need a wedding planner if I have a checklist?</h4>
                <p className="text-slate-600 leading-relaxed">A great checklist reduces your dependence on a full-service planner, but a day-of coordinator is always recommended. They manage the timeline on the day itself so you can actually enjoy your wedding.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 mb-2">Where can I download a free wedding planning checklist?</h4>
                <p className="text-slate-600 leading-relaxed">Our free printable wedding checklist PDF is available above — covering every task from 12 months out through the wedding day itself.</p>
              </div>
            </div>
          </div>

          <div className="bg-rose-500 rounded-3xl p-12 text-center text-white space-y-6 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold">Start Planning Your Wedding Today — Stress-Free</h2>
            <p className="text-rose-100 text-lg max-w-2xl mx-auto leading-relaxed">The difference between a stressful wedding planning experience and a joyful one comes down to one thing: organization. A complete, well-structured wedding planning checklist keeps you in control at every stage — so instead of chasing down vendors and missing deadlines, you are enjoying the process of building the most memorable day of your life.</p>
            <p className="text-rose-100 text-lg max-w-2xl mx-auto leading-relaxed pb-4">Use our free wedding planning checklist, budget tracker, timeline planner, and vendor organizer to plan your perfect wedding — one task at a time.</p>
            <button 
              onClick={onStart}
              className="bg-white text-rose-500 px-8 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-colors shadow-lg inline-block"
            >
              Start Your Free Checklist
            </button>
          </div>

        </div>
      </section>

      <Footer 
        onHome={onGoHome} 
        onAbout={onAbout} 
        onGuide={onOpenGuide} 
        onBlog={onBlog} 
        onContact={onContact} 
        onPrivacy={onPrivacy} 
        onTerms={onTerms} 
      />
    </div>
  );
}
