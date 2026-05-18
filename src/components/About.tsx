import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { LandingNav } from './LandingNav';

interface AboutProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onBlog: () => void;
  onContact: () => void;
}

export function About({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onBlog, onContact }: AboutProps) {
  useEffect(() => {
    // Set Meta Title and Description for SEO
    document.title = "About Us | Wedding Planning Checklists — Who We Are & Why We Built This";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Meet the team behind the most complete wedding planning checklist platform. We help brides, grooms, and couples plan stress-free weddings with free tools, templates, and timelines.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} onPrivacy={onPrivacy} onBlog={onBlog} onContact={onContact} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-50/50 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            About Us — <span className="text-rose-500">The Team</span> Behind Your Wedding Planning Checklist
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            We are a team of wedding enthusiasts, planners, and organizers who have seen firsthand how quickly the joy of getting engaged turns into the stress of managing vendors, budgets, and deadlines.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 space-y-16 text-slate-600">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">We Built the Wedding Planning Tool We Wished We Had</h2>
            <p className="text-lg leading-relaxed">
              Planning a wedding should feel exciting. Instead, for most couples, it feels like managing a full-time project without a job description. That is exactly the problem we set out to solve.
            </p>
            <p className="text-lg leading-relaxed">
              We are a team of wedding enthusiasts, planners, and organizers who have seen firsthand how quickly the joy of getting engaged turns into the stress of managing vendor calls, budget spreadsheets, guest lists, and dozens of overlapping deadlines — all at the same time.
            </p>
            <p className="text-lg leading-relaxed font-medium text-slate-800">
              So we built Wedding Planning Checklists — a free, all-in-one platform designed to keep every couple organized, on budget, and genuinely excited throughout the entire planning process.
            </p>
          </div>

          <div className="bg-rose-50 rounded-3xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-rose-900 tracking-tight">Our Mission</h2>
            <p className="text-lg leading-relaxed text-rose-800">
              Our mission is simple: make wedding planning accessible, organized, and stress-free for every couple — regardless of budget, wedding size, or background.
            </p>
            <p className="text-lg leading-relaxed text-rose-800">
              We believe every couple deserves a beautiful wedding without the chaos that usually comes with planning one. Whether you are organizing an intimate backyard ceremony, a grand ballroom reception, a destination wedding abroad, or a traditional multi-day Pakistani or Muslim wedding, our tools and checklists are built to work for you.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">What We Offer</h2>
            <p className="text-lg leading-relaxed">
              We created this platform because we noticed a gap in what was available online. Most wedding resources were either too generic, buried behind expensive subscriptions, or built only for large Western-style weddings. We wanted something different — something practical, free, and genuinely useful from day one.
            </p>
            <p className="text-lg leading-relaxed font-medium">Here is what you will find on our platform:</p>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li><strong className="font-bold text-slate-800">Complete Wedding Planning Checklists</strong> — Month-by-month task lists covering every stage from engagement to honeymoon.</li>
              <li><strong className="font-bold text-slate-800">Free Printable Templates</strong> — Download and print your checklist, guest list, timeline, and vendor tracker.</li>
              <li><strong className="font-bold text-slate-800">Wedding Budget Calculator</strong> — Set your total budget, allocate by category, and track every expense.</li>
              <li><strong className="font-bold text-slate-800">Vendor Organizer</strong> — Keep all your vendor contacts, contracts, and payment schedules in one place.</li>
              <li><strong className="font-bold text-slate-800">Guest List & RSVP Manager</strong> — Track invitations, responses, dietary requirements, and seating.</li>
              <li><strong className="font-bold text-slate-800">Wedding Timeline Planner</strong> — Build a custom month-by-month schedule based on your exact wedding date.</li>
              <li><strong className="font-bold text-slate-800">Wedding Day Schedule</strong> — Create a detailed minute-by-minute run-of-show for the big day itself.</li>
            </ul>
            <div className="bg-slate-900 text-white p-6 rounded-2xl text-center font-bold text-lg mt-8">
              Everything is free to use. No hidden fees. No subscription required.
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Built for Every Couple, Every Culture, Every Wedding</h2>
            <p className="text-lg leading-relaxed">
              One thing that sets us apart is our commitment to cultural inclusivity. Wedding traditions vary widely — and your planning tools should reflect that.
            </p>
            <p className="text-lg leading-relaxed font-medium">Our checklists and guides cover:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <p className="text-slate-800 text-sm font-medium">Traditional Pakistani and South Asian weddings with multi-event planning (Mehndi, Baraat, Nikkah, Walima)</p>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <p className="text-slate-800 text-sm font-medium">Muslim wedding ceremonies with Nikkah-specific planning guides</p>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <p className="text-slate-800 text-sm font-medium">Destination weddings requiring travel logistics and international vendor coordination</p>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <p className="text-slate-800 text-sm font-medium">Small and intimate ceremonies where personal details matter most</p>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <p className="text-slate-800 text-sm font-medium">DIY weddings where budget creativity meets organized execution</p>
              </div>
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                <p className="text-slate-800 text-sm font-medium">Luxury weddings where no detail is too small to track</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed font-medium text-slate-800 mt-4">
              No matter what kind of wedding you are planning, our platform meets you where you are.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Why Couples Trust Us</h2>
            <p className="text-lg leading-relaxed">
              Since launching, thousands of couples have used our wedding planning checklists to stay organized, save money, and actually enjoy the planning process. Here is what makes our platform different from a simple Google search or a basic PDF download:
            </p>
            <ul className="space-y-6 mt-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center font-black">1</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Everything is in one place.</h4>
                  <p className="text-slate-600 leading-relaxed">You do not need five different apps, three spreadsheets, and a notebook. Our platform consolidates your checklist, budget, vendor list, guest list, and timeline into a single organized dashboard.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center font-black">2</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">It is built around real timelines.</h4>
                  <p className="text-slate-600 leading-relaxed">Our month-by-month structure reflects how real wedding planning actually works — not an idealized version of it. We account for vendor lead times, dress production windows, invitation mailing deadlines, and last-minute reality.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center font-black">3</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">It works for any budget.</h4>
                  <p className="text-slate-600 leading-relaxed">Whether you are planning a wedding for 50 people or 500, spending lavishly or carefully, our tools scale to your situation without judgment.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-rose-500 rounded-3xl p-12 text-center text-white space-y-6 mt-16 shadow-xl shadow-rose-200">
            <h2 className="text-3xl md:text-4xl font-bold">Start Planning Today</h2>
            <p className="text-rose-100 text-lg max-w-2xl mx-auto leading-relaxed">
              You got engaged. That is the best part. Now let us handle the organization so you can focus on the joy. Explore our free wedding planning checklists, download your printable templates, and start building a wedding that feels exactly like you — without the stress.
            </p>
            <p className="text-xl font-bold text-white mb-6">
              Your dream wedding is one checklist away.
            </p>
            <button 
              onClick={onStart}
              className="bg-white text-rose-500 px-8 py-4 rounded-2xl font-bold hover:bg-rose-50 transition-colors shadow-lg inline-block"
            >
              Start Planning Now
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onGoHome}>
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="text-lg font-black tracking-tight">Wedding Planner<span className="text-rose-500 ml-1">Checklists</span></span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onPrivacy(); }} className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); onTerms(); }} className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="/about-us" onClick={(e) => { e.preventDefault(); onAbout(); }} className="hover:text-slate-600 transition-colors">About Us</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); onContact(); }} className="hover:text-slate-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
