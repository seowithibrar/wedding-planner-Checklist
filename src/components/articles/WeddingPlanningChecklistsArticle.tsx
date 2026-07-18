import React from 'react';
import { Calendar, Clock, User, Facebook, Twitter, Instagram, List, ArrowRight } from 'lucide-react';

export function WeddingPlanningChecklistsArticle() {
  return (
    <div className="bg-white min-h-screen">
      

    {/*  Reading Progress Bar  */}
    <div id="reading-progress" className="fixed top-20 left-0 h-1 bg-gradient-to-r from-brand-rosegold to-brand-gold z-[60] transition-all duration-150 shadow-sm" ></div>

    
    
    
    
    
    
    
    {/*  Navigation  */}
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer">
          <a href="/"><img src="/logo.png" alt="Wedding Planning Checklists" className="h-12 w-auto object-contain" /></a>
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          <a href="/" className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Home</a>
          <a href="/about-us" className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">About Us</a>
          <a href="/guide" className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Wedding Planning Checklists</a>
          <a href="/blog" className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Blog</a>
          <a href="/contact" className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors">Contact Us</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="/" className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-rose-500 transition-all shadow-lg shadow-slate-100">
            Get Started
          </a>
          <button className="lg:hidden p-2 text-slate-600" onClick={() => { /* document.getElementById('mobile-menu').classList.toggle('hidden') */ }}>
             <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
      
      {/*  Mobile Menu  */}
      <div id="mobile-menu" className="hidden lg:hidden bg-white border-b border-slate-100 overflow-hidden">
        <div className="p-6 flex flex-col gap-6">
          <a href="/" className="block text-left text-sm font-bold text-slate-500">Home</a>
          <a href="/about-us" className="block text-left text-sm font-bold text-slate-500">About Us</a>
          <a href="/guide" className="block text-left text-sm font-bold text-slate-500">Wedding Planning Checklists</a>
          <a href="/blog" className="block text-left text-sm font-bold text-slate-500">Blog</a>
          <a href="/contact" className="block text-left text-sm font-bold text-slate-500">Contact Us</a>
          
          <a href="/" className="w-full text-center bg-slate-900 text-white py-3.5 rounded-xl text-sm font-black mt-2">
            Get Started
          </a>
        </div>
      </div>
    </header>


    {/*  Blog Header / Hero  */}
    <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center bg-gradient-to-b from-brand-pink/20 to-transparent rounded-b-[4rem]">
        <div className="mb-6 flex justify-center items-center gap-2 text-sm font-medium text-brand-rosegold">
            <span className="bg-brand-pink px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Checklists</span>
            <span>•</span>
            <span>By Wedding Planning Checklists</span>
            <span>•</span>
            <span>Oct 15, 2026</span>
            <span>•</span>
            <span>15 min read</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-tight mb-8">
            The Ultimate Wedding Planning Checklists Guide for a Stress-Free Wedding
        </h1>
        <p className="text-lg text-brand-text/80 leading-relaxed max-w-3xl mx-auto mb-6">
            This comprehensive wedding planning guide provides everything couples need to organize a successful wedding. From creating a wedding budget planner to managing guests and following a detailed timeline, these checklists simplify every stage.
        </p>
        
        <nav className="flex justify-center items-center gap-2 text-xs text-brand-text/50 mt-10" aria-label="Breadcrumb">
            <a href="/" className="hover:text-brand-rosegold transition-colors">Home</a>
            <i data-lucide="chevron-right" className="w-3 h-3"></i>
            <a href="/blog" className="hover:text-brand-rosegold transition-colors">Blog</a>
            <i data-lucide="chevron-right" className="w-3 h-3"></i>
            <span className="text-brand-text/80 font-medium">Ultimate Guide to Wedding Checklists</span>
        </nav>
    </section>

    {/*  Featured Image  */}
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl relative">
            <img src="/images/blog/feature-post.jpg" alt="A couple organizing their stress-free wedding with a wedding planning checklist" className="w-full h-auto object-cover max-h-[600px]" />
        </div>
    </section>

    {/*  Blog Content Grid  */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/*  Sticky Sidebar Navigation  */}
        <aside className="col-span-1 lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-brand-pink/30 shadow-sm">
                    <h4 className="font-heading font-bold text-base text-brand-dark mb-4 pb-2 border-b border-brand-pink/20 flex items-center gap-2">
                        <i data-lucide="list" className="w-4 h-4 text-brand-rosegold"></i> Table of Contents
                    </h4>
                    <nav className="space-y-2.5 text-xs font-semibold text-brand-text/70" id="toc-nav">
                        <a href="#essential" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Why Checklists Are Essential</a>
                        <a href="#included" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">What's Included</a>
                        <a href="#when-to-start" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">When to Start</a>
                        <a href="#budget" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Budget Planner</a>
                        <a href="#venue" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Choosing a Venue</a>
                        <a href="#vendors" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Booking Vendors</a>
                        <a href="#guests" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Guest List Management</a>
                        <a href="#bridal" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Bridal Checklist</a>
                        <a href="#timeline" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Month-by-Month Timeline</a>
                        <a href="#mistakes" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Common Mistakes</a>
                        <a href="#printable" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Printable Checklists</a>
                        <a href="#final" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Final Wedding Day List</a>
                        <a href="#faqs" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">FAQs</a>
                        <a href="#conclusion" className="block hover:text-brand-rosegold transition-colors border-l-2 border-transparent hover:border-brand-rosegold pl-3">Conclusion</a>
                    </nav>
                </div>

                {/*  Quick Tools Sidebar Box  */}
                <div className="bg-gradient-to-br from-brand-dark to-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-2xl shadow-brand-dark/20 border border-white/10 text-left hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden mt-6">
                    <h5 className="font-heading font-bold text-lg text-brand-pink">Planning Tools</h5>
                    <p className="text-xs text-white/70 leading-relaxed">
                        Keep every wedding detail perfectly organized with our free checklist and budget tools.
                    </p>
                    <a href="planner.html" className="block text-center bg-gradient-to-r from-brand-rosegold to-brand-gold text-white text-xs font-bold py-3 rounded-full hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(183,110,121,0.4)] transition-all duration-300">Start Free Planning</a>
                </div>

            </div>
        </aside>

        {/*  Main Blog Post Article  */}
        <article className="col-span-1 lg:col-span-9 prose prose-lg max-w-none text-brand-text/90">
        
        <p>Planning a wedding involves hundreds of decisions, deadlines, and moving parts. Without a clear system, it's easy to forget important tasks or feel overwhelmed. That's why <strong>Wedding Planning Checklists</strong> have become an essential tool for modern couples. A well-structured wedding checklist helps organize every detail, from setting a budget to booking vendors and preparing for the big day. Whether you're planning a small intimate ceremony or a grand celebration, this comprehensive wedding planning guide will help you stay organized, reduce stress, and create the wedding you've always envisioned.</p>

    {/*  Quick Answer Box  */}
    <div className="bg-brand-pink/30 border-l-4 border-brand-rosegold p-6 rounded-r-2xl mb-10 shadow-sm">
        <h3 className="text-lg font-bold text-brand-dark mb-2 flex items-center gap-2">
            <i data-lucide="zap" className="w-5 h-5 text-brand-gold"></i> Quick Answer
        </h3>
        <p className="text-sm font-medium leading-relaxed max-w-3xl">
            This guide provides essential tips and strategies tailored to help you plan effectively. You'll learn how to avoid common mistakes, ensure every detail is perfect, and organize your approach. Always rely on professional vendors and stick to a reliable timeline for a stress-free experience.
        </p>
    </div>
    

        <h2 id="essential" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">Why Are Wedding Planning Checklists Essential?</h2>
        <p>Wedding planning is essentially a large-scale project involving budgeting, scheduling, guest management, vendor coordination, and event execution.</p>
        <p>A wedding checklist helps you:</p>
        <ul className="space-y-2 mb-8 list-disc pl-5">
            <li>Stay organized</li>
            <li>Meet important deadlines</li>
            <li>Avoid costly mistakes</li>
            <li>Manage wedding expenses</li>
            <li>Coordinate with vendors</li>
            <li>Reduce stress</li>
            <li>Keep family members informed</li>
        </ul>
        <p>Without a structured wedding preparation list, many couples discover missing details only days before their wedding. Transitioning from excitement to execution becomes much easier when every task is documented and prioritized.</p>

        <h2 id="included" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">What Is Included in a Wedding Planning Checklist?</h2>
        <p>A complete wedding planning checklist covers every stage of the engagement-to-wedding journey.</p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Budget Planning Tasks</h3>
        <p>Your wedding budget planner should include:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 list-disc pl-5">
            <li>Venue costs</li>
            <li>Catering expenses</li>
            <li>Photography packages</li>
            <li>Wedding attire</li>
            <li>Entertainment</li>
            <li>Decorations</li>
            <li>Invitations</li>
            <li>Transportation</li>
            <li>Emergency contingency funds</li>
        </ul>
        <p className="bg-brand-pink/50 p-4 rounded-xl border-l-4 border-brand-rosegold italic">Most experts recommend allocating 5-10% of your budget for unexpected expenses.</p>

        {/*  Second Image  */}
        <figure className="my-12">
            <img src="/images/blog/budget-planning.jpg" alt="Creating a detailed wedding budget planner and organizing wedding expenses" className="rounded-2xl shadow-lg w-full" />
            <figcaption className="text-center text-sm text-brand-text/60 mt-3">Tracking every expense ensures you stay within your wedding budget.</figcaption>
        </figure>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Venue Selection Tasks</h3>
        <p>Wedding venue planning includes:</p>
        <ul className="space-y-2 mb-6 list-disc pl-5">
            <li>Defining guest capacity</li>
            <li>Comparing venue packages</li>
            <li>Reviewing contracts</li>
            <li>Checking availability</li>
            <li>Understanding restrictions</li>
            <li>Scheduling site visits</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Vendor Booking Tasks</h3>
        <p>A wedding vendors checklist typically includes:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 list-disc pl-5">
            <li>Photographer</li>
            <li>Videographer</li>
            <li>Caterer</li>
            <li>Florist</li>
            <li>DJ or Band</li>
            <li>Makeup Artist</li>
            <li>Transportation Services</li>
            <li>Officiant</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Guest List Management</h3>
        <p>Guest management involves:</p>
        <ul className="space-y-2 mb-6 list-disc pl-5">
            <li>Creating preliminary guest lists</li>
            <li>Tracking RSVPs</li>
            <li>Seating arrangements</li>
            <li>Dietary requirements</li>
            <li>Accommodation coordination</li>
        </ul>
        <p>Each of these areas contributes significantly to a successful event.</p>

        <h2 id="when-to-start" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">When Should You Start Wedding Planning?</h2>
        <p>The ideal wedding timeline begins 12 to 18 months before your wedding date. Starting early allows you to secure preferred venues and vendors while reducing last-minute pressure.</p>

        <div className="space-y-6 my-8">
            <div className="glass p-6 rounded-2xl border-l-4 border-brand-rosegold">
                <h4 className="font-bold text-lg mb-2">12 Months Before the Wedding</h4>
                <ul className="list-none space-y-1 p-0 m-0 text-sm md:text-base">
                    <li>✓ Set wedding budget</li>
                    <li>✓ Choose wedding style</li>
                    <li>✓ Create guest list</li>
                    <li>✓ Book venue</li>
                    <li>✓ Hire wedding planner</li>
                    <li>✓ Research event management services</li>
                </ul>
            </div>
            <div className="glass p-6 rounded-2xl border-l-4 border-brand-rosegold/80">
                <h4 className="font-bold text-lg mb-2">9 Months Before the Wedding</h4>
                <ul className="list-none space-y-1 p-0 m-0 text-sm md:text-base">
                    <li>✓ Book major vendors</li>
                    <li>✓ Shop for wedding attire</li>
                    <li>✓ Reserve accommodations</li>
                    <li>✓ Create wedding website</li>
                </ul>
            </div>
            <div className="glass p-6 rounded-2xl border-l-4 border-brand-rosegold/60">
                <h4 className="font-bold text-lg mb-2">6 Months Before the Wedding</h4>
                <ul className="list-none space-y-1 p-0 m-0 text-sm md:text-base">
                    <li>✓ Send save-the-dates</li>
                    <li>✓ Finalize catering menu</li>
                    <li>✓ Schedule engagement photos</li>
                    <li>✓ Plan honeymoon</li>
                </ul>
            </div>
            <div className="glass p-6 rounded-2xl border-l-4 border-brand-rosegold/40">
                <h4 className="font-bold text-lg mb-2">3 Months Before the Wedding</h4>
                <ul className="list-none space-y-1 p-0 m-0 text-sm md:text-base">
                    <li>✓ Send invitations</li>
                    <li>✓ Confirm vendors</li>
                    <li>✓ Schedule beauty appointments</li>
                    <li>✓ Create seating plan</li>
                </ul>
            </div>
            <div className="glass p-6 rounded-2xl border-l-4 border-brand-rosegold/20">
                <h4 className="font-bold text-lg mb-2">1 Month Before the Wedding</h4>
                <ul className="list-none space-y-1 p-0 m-0 text-sm md:text-base">
                    <li>✓ Final dress fitting</li>
                    <li>✓ Confirm guest count</li>
                    <li>✓ Review vendor contracts</li>
                    <li>✓ Prepare wedding day emergency kit</li>
                </ul>
            </div>
            <div className="bg-brand-dark text-white p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-2 text-white">Wedding Week Tasks</h4>
                <ul className="list-none space-y-1 p-0 m-0 text-sm md:text-base text-white/80">
                    <li>✓ Confirm all bookings</li>
                    <li>✓ Pack essentials</li>
                    <li>✓ Distribute timeline</li>
                    <li>✓ Rehearse ceremony</li>
                </ul>
            </div>
        </div>
        <p>Proper planning ensures fewer surprises and smoother coordination.</p>

        {/*  Third Image  */}
        <figure className="my-12">
            <img src="/images/blog/timeline-planning.jpg" alt="A month-by-month wedding timeline guide mapping out tasks before the big day" className="rounded-2xl shadow-lg w-full" />
            <figcaption className="text-center text-sm text-brand-text/60 mt-3">A structured timeline keeps planning manageable from engagement to your wedding day.</figcaption>
        </figure>

        <h2 id="budget" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">How to Create a Wedding Budget Planner</h2>
        <p>Money management is one of the biggest wedding planning challenges. Follow these steps:</p>
        
        <h4 className="font-bold mt-6">Step 1: Determine Total Budget</h4>
        <p>Identify contributions from the couple, parents, and family members.</p>
        
        <h4 className="font-bold mt-6">Step 2: Prioritize Spending</h4>
        <p>Decide what matters most: Venue, Food, Photography, or Entertainment.</p>
        
        <h4 className="font-bold mt-6">Step 3: Track Every Expense</h4>
        <p>Use spreadsheets, budget apps, or printable wedding checklist templates.</p>
        
        <h4 className="font-bold mt-6">Step 4: Maintain Emergency Funds</h4>
        <p>Reserve at least 10% for unexpected costs. A realistic budget reduces stress throughout the planning process.</p>

        <h2 id="venue" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">How Do You Choose the Right Wedding Venue?</h2>
        <p>The venue influences nearly every other wedding decision. Consider guest capacity, location accessibility, parking availability, indoor and outdoor options, weather backup plans, and catering policies.</p>
        <p>Visit multiple venues before making a final decision. Many couples find that venue planning becomes easier when they create a detailed comparison checklist.</p>

        <h2 id="vendors" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">What Wedding Vendors Should You Book First?</h2>
        <p>Vendor availability often determines the success of your wedding timeline. Start with the most in-demand professionals.</p>
        
        <h4 className="font-bold mt-6">Photographer & Videographer</h4>
        <p>Book 9-12 months in advance. Review their portfolio, packages, reviews, and backup equipment policies.</p>
        
        <h4 className="font-bold mt-6">Caterer</h4>
        <p>Food significantly impacts guest satisfaction. Schedule tastings before signing contracts.</p>
        
        <h4 className="font-bold mt-6">Entertainment</h4>
        <p>Whether you hire a DJ or live band, secure entertainment early. Popular dates fill quickly.</p>
        
        <h4 className="font-bold mt-6">Florist & Decor Team</h4>
        <p>Décor planning affects the overall wedding atmosphere. Discuss floral themes, color palettes, ceremony decorations, and reception centerpieces.</p>
        <p>Professional vendors help transform your vision into reality.</p>

        {/*  Fourth Image  */}
        <figure className="my-12">
            <img src="/images/blog/bridal-prep.jpg" alt="A complete bridal checklist for hair, makeup, dress fittings, and personal essentials" className="rounded-2xl shadow-lg w-full" />
            <figcaption className="text-center text-sm text-brand-text/60 mt-3">A prepared bride enjoys the wedding day with greater confidence and peace of mind.</figcaption>
        </figure>

        <h2 id="guests" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">How to Manage Your Wedding Guest List Effectively?</h2>
        <p>Guest management can quickly become complicated. Best practices include:</p>
        <ul className="space-y-2 mb-6 list-disc pl-5">
            <li>Categorize guests by priority</li>
            <li>Track RSVPs digitally</li>
            <li>Create seating charts early</li>
            <li>Plan for last-minute changes</li>
        </ul>
        <p>Many couples use wedding planning software to streamline guest communication. Good organization prevents confusion and improves the guest experience.</p>

        <h2 id="bridal" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">The Complete Bridal Checklist Before the Big Day</h2>
        <p>A bridal checklist helps ensure personal preparations are not overlooked. Include:</p>
        
        <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-brand-text/10">
                <h4 className="font-bold mb-3 text-brand-rosegold">Beauty Preparation</h4>
                <ul className="list-disc pl-4 text-sm space-y-1 m-0">
                    <li>Hair trial</li>
                    <li>Makeup trial</li>
                    <li>Skincare routine</li>
                    <li>Nail appointment</li>
                </ul>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-brand-text/10">
                <h4 className="font-bold mb-3 text-brand-rosegold">Wardrobe Prep</h4>
                <ul className="list-disc pl-4 text-sm space-y-1 m-0">
                    <li>Wedding dress fitting</li>
                    <li>Shoes & Jewelry</li>
                    <li>Veil</li>
                    <li>Accessories</li>
                </ul>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-brand-text/10">
                <h4 className="font-bold mb-3 text-brand-rosegold">Personal Essentials</h4>
                <ul className="list-disc pl-4 text-sm space-y-1 m-0">
                    <li>Marriage license</li>
                    <li>Emergency kit</li>
                    <li>Vows</li>
                    <li>Contact list</li>
                </ul>
            </div>
        </div>

        <h2 id="timeline" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">Wedding Timeline: Month-by-Month Planning Guide</h2>
        <p>An effective wedding tasks timeline includes:</p>
        
        <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden shadow-sm">
                <thead>
                    <tr className="bg-brand-dark text-white">
                        <th className="p-4 font-heading font-semibold">Timeframe</th>
                        <th className="p-4 font-heading font-semibold">Key Tasks</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-brand-text/10">
                    <tr><td className="p-4 font-medium">12 Months</td><td className="p-4">Budget, venue, guest list</td></tr>
                    <tr className="bg-brand-cream/50"><td className="p-4 font-medium">9 Months</td><td className="p-4">Vendors, attire</td></tr>
                    <tr><td className="p-4 font-medium">6 Months</td><td className="p-4">Invitations, catering</td></tr>
                    <tr className="bg-brand-cream/50"><td className="p-4 font-medium">3 Months</td><td className="p-4">RSVPs, seating chart</td></tr>
                    <tr><td className="p-4 font-medium">1 Month</td><td className="p-4">Confirmations, fittings</td></tr>
                    <tr className="bg-brand-cream/50"><td className="p-4 font-medium">1 Week</td><td className="p-4">Rehearsal, final review</td></tr>
                    <tr><td className="p-4 font-bold text-brand-rosegold">Wedding Day</td><td className="p-4 font-medium">Enjoy the celebration</td></tr>
                </tbody>
            </table>
        </div>
        <p>This structured timeline keeps planning manageable and organized.</p>

        <h2 id="mistakes" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">Common Wedding Planning Mistakes to Avoid</h2>
        <p>Even organized couples can make mistakes. Avoid:</p>
        <ul className="space-y-2 mb-8 list-disc pl-5">
            <li>Starting too late</li>
            <li>Ignoring the budget</li>
            <li>Not reading vendor contracts</li>
            <li>Overcomplicating décor</li>
            <li>Inviting too many guests</li>
            <li>Skipping contingency plans</li>
        </ul>
        <p>Learning from common mistakes can save time, money, and stress.</p>

        <div className="bg-brand-beige/30 border-2 border-brand-gold p-8 rounded-3xl my-12">
            <h2 className="text-2xl font-bold mb-2 text-brand-dark mt-0">STEP 3: ENGAGEMENT ELEMENT</h2>
            <h3 className="text-xl font-semibold mb-6 text-brand-dark">Wedding Planning Checklist Self-Assessment Tool</h3>
            <p className="mb-4">Score yourself (5 Points for Yes, 0 for No):</p>
            
            <ul className="space-y-3 mb-6">
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Have you set a wedding budget?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Have you booked your venue?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Have you selected major vendors?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Have invitations been sent?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Have RSVPs been tracked?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Do you have a wedding timeline?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Is your bridal checklist complete?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Have you confirmed vendor contracts?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Do you have an emergency backup plan?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
                <li className="flex justify-between items-center bg-white p-3 rounded-lg"><span className="flex-1">Have you scheduled final fittings?</span> <div className="flex gap-4"><label className="cursor-pointer text-sm font-medium"><input type="checkbox" className="mr-1 text-brand-rosegold rounded focus:ring-brand-rosegold" />Yes</label></div></li>
            </ul>
            
            <h4 className="font-bold mb-3">Score Interpretation</h4>
            <div className="space-y-2 text-sm md:text-base bg-white p-5 rounded-xl">
                <p><strong>0-20 Points:</strong> Planning just started. Focus on foundational tasks.</p>
                <p><strong>25-40 Points:</strong> Good progress. Continue following your wedding preparation list.</p>
                <p><strong>45-50 Points:</strong> Excellent. You're nearly ready for your wedding day.</p>
            </div>
        </div>

        <h2 id="printable" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">Why Use Printable Wedding Planning Checklists?</h2>
        <p>Printable checklists provide:</p>
        <ul className="space-y-2 mb-6 list-disc pl-5">
            <li>Easy tracking</li>
            <li>Better accountability</li>
            <li>Reduced stress</li>
            <li>Improved communication</li>
            <li>Clear deadlines</li>
        </ul>
        <p>Many couples combine printable worksheets with digital planning tools for maximum efficiency.</p>

        <h2 id="final" className="text-3xl font-bold mt-12 mb-6 text-brand-dark scroll-mt-24">Final Wedding Day Checklist</h2>
        <p>Before leaving for the venue, confirm:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 list-disc pl-5">
            <li>Rings packed</li>
            <li>Marriage license ready</li>
            <li>Vendor contacts available</li>
            <li>Emergency kit prepared</li>
            <li>Payment envelopes organized</li>
            <li>Wedding attire packed</li>
            <li>Timeline distributed</li>
            <li>Transportation confirmed</li>
        </ul>
        <p>Completing this final review helps ensure a smooth wedding day experience.</p>

        {/*  FAQs Section  */}
        <div id="faqs" className="mt-16 pt-12 border-t border-brand-text/10 scroll-mt-24" x-data="{ activeAccordion: null }">
            <h2 className="text-3xl font-bold mb-8 text-brand-dark text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                
                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 1 ? null : 1" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">1. How to plan a wedding checklist from scratch?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 1 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 1" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            Start by setting a wedding budget, creating a guest list, selecting a venue, and establishing a wedding timeline. Then organize tasks into monthly milestones and prioritize vendor bookings. A structured wedding checklist ensures nothing important is overlooked and keeps planning manageable throughout the engagement period.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 2 ? null : 2" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">2. What is included in a wedding planning checklist?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 2 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 2" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            A wedding planning checklist typically includes budgeting, venue selection, vendor booking, guest management, bridal preparation, décor planning, invitation management, transportation arrangements, and wedding-day coordination. It acts as a complete roadmap from engagement to the wedding ceremony.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 3 ? null : 3" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">3. When should you start wedding planning?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 3 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 3" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            Most wedding professionals recommend starting 12 to 18 months before the wedding date. Early planning provides more venue options, better vendor availability, and additional time to compare services, manage budgets, and handle unexpected changes.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 4 ? null : 4" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">4. Why is a wedding timeline important?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 4 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 4" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            A wedding timeline helps organize tasks according to deadlines and milestones. It prevents last-minute stress, improves communication among vendors, and ensures critical planning activities are completed on time.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 5 ? null : 5" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">5. How much should a wedding budget planner include?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 5 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 5" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            A wedding budget planner should include all expected expenses such as venue rental, catering, attire, photography, entertainment, flowers, transportation, invitations, and a contingency reserve. Tracking these costs helps avoid overspending.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 6 ? null : 6" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">6. What vendors should be booked first?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 6 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 6" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            The venue, photographer, videographer, caterer, and entertainment providers should usually be booked first. These services often have limited availability, especially during peak wedding seasons.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 7 ? null : 7" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">7. How do you organize a wedding guest list?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 7 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 7" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            Begin with a master guest list, categorize guests by priority, track RSVPs digitally, and update seating arrangements regularly. Effective guest management improves event logistics and communication.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 8 ? null : 8" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">8. What should be on a bridal checklist?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 8 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 8" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            A bridal checklist should include dress fittings, beauty appointments, accessories, marriage license preparation, vows, emergency supplies, and transportation arrangements. These details help ensure a smooth wedding day experience.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 9 ? null : 9" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">9. Are printable wedding planning checklists better than apps?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 9 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 9" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            Both options offer advantages. Printable checklists provide visual tracking and accessibility, while apps offer automation, reminders, and collaboration features. Many couples successfully use a combination of both.
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl overflow-hidden shadow-sm">
                    <button @click="activeAccordion = activeAccordion === 10 ? null : 10" className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
                        <span className="font-medium text-lg text-brand-dark">10. Can a wedding planner replace a wedding checklist?</span>
                        <i data-lucide="chevron-down" className="w-5 h-5 text-brand-rosegold transition-transform duration-300" :className="activeAccordion === 10 ? 'rotate-180' : ''"></i>
                    </button>
                    <div x-show="activeAccordion === 10" x-collapse x-cloak>
                        <div className="px-6 pb-5 text-brand-text/80 leading-relaxed">
                            A professional wedding planner can manage many tasks, but a wedding checklist remains valuable for tracking progress, reviewing deadlines, and ensuring both the couple and planner stay aligned throughout the planning process.
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <hr className="border-brand-pink/20 my-10" />

        {/*  Conclusion  */}
        <section id="conclusion" className="space-y-6 scroll-mt-24 text-left">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark">Conclusion</h2>
            <p>
                A wedding planning checklist isn't just a list of tasks; it's a roadmap to a memorable and stress-free celebration. By breaking down the process into manageable steps and prioritizing your budget and vendor bookings, you can enjoy the journey from engagement to "I do."
            </p>
            <p>
                Keep this guide handy, refer back to your timeline, and remember that careful planning allows you to be fully present on your special day.
            </p>
        </section>

        
            <hr className="border-brand-pink/20 my-10" />

            {/*  Related Articles  */}
            <section id="related-articles" className="space-y-6 scroll-mt-24 text-left">
                <h3 className="font-heading text-2xl font-bold text-brand-dark">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <a href="/20-tips-for-your-wedding-planning-checklist.html" className="block group">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink/20 transition-all hover:shadow-md">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600" alt="Wedding planning tips" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="p-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rosegold bg-brand-pink px-2 py-1 rounded-full">Planning</span>
                                <h4 className="font-bold text-brand-dark text-sm mt-2 group-hover:text-brand-rosegold transition-colors">20 Tips for Your Wedding Planning Checklist</h4>
                                <p className="text-xs text-brand-text/70 mt-1">8 min read</p>
                            </div>
                        </div>
                    </a>
                    <a href="/how-to-plan-a-wedding-timeline.html" className="block group">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink/20 transition-all hover:shadow-md">
                            <img src="public/How to Plan a Wedding Timeline.webp" alt="Wedding Timeline" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="p-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rosegold bg-brand-pink px-2 py-1 rounded-full">Timeline</span>
                                <h4 className="font-bold text-brand-dark text-sm mt-2 group-hover:text-brand-rosegold transition-colors">How to Plan a Wedding Timeline</h4>
                                <p className="text-xs text-brand-text/70 mt-1">7 min read</p>
                            </div>
                        </div>
                    </a>
                    <a href="/wedding-planning-checklists.html" className="block group">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-pink/20 transition-all hover:shadow-md">
                            <img src="/images/blog/feature-post.jpg" alt="Wedding planning checklists" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="p-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rosegold bg-brand-pink px-2 py-1 rounded-full">Checklists</span>
                                <h4 className="font-bold text-brand-dark text-sm mt-2 group-hover:text-brand-rosegold transition-colors">Ultimate Guide to Wedding Checklists</h4>
                                <p className="text-xs text-brand-text/70 mt-1">15 min read</p>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            <hr className="border-brand-pink/20 my-10" />

            {/*  Newsletter CTA  */}
            <section className="bg-brand-pink/30 border border-brand-rosegold/30 rounded-3xl p-8 text-center my-10">
                <h3 className="font-heading text-2xl font-bold text-brand-dark mb-3">Don't Miss a Single Wedding Detail</h3>
                <p className="text-sm text-brand-text/80 max-w-xl mx-auto mb-6">Join our newsletter to receive weekly wedding tips, aesthetic ideas, and exclusive planning checklists directly in your inbox.</p>
                <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                    <input type="email" placeholder="Enter your email address" className="flex-1 bg-white border border-brand-pink rounded-full px-5 py-3 text-sm focus:outline-none focus:border-brand-rosegold shadow-sm" required />
                    <button type="submit" className="bg-brand-rosegold text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all hover:shadow-md">Subscribe</button>
                </form>
            </section>

            {/*  Author Box  */}
            <section className="bg-white border border-brand-pink/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm mt-12 mb-10 text-left">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-brand-pink shadow-sm">
                    <img src="https://ui-avatars.com/api/?name=Wedding+Planning+Checklists&background=fcecf0&color=B76E79&size=200" alt="Wedding Planning Checklists Team" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="font-bold text-brand-dark text-lg mb-1">Wedding Planning Checklists Team</h4>
                    <p className="text-xs font-semibold text-brand-rosegold uppercase tracking-wider mb-3">Wedding Planning Experts</p>
                    <p className="text-sm text-brand-text/80 leading-relaxed">
                        The Wedding Planning Checklists Team is dedicated to helping couples plan the wedding of their dreams without the stress. We combine industry expertise, modern aesthetics, and practical advice to bring you the best in wedding planning resources.
                    </p>
                </div>
            </section>

        </article>
    </div>

    
    
    
    {/*  Footer  */}
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center cursor-pointer">
              <a href="/"><img src="/logo.png" alt="Wedding Planning Checklists" className="h-10 w-auto object-contain" /></a>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your ultimate companion for stress-free wedding planning. We provide couples with the tools, timelines, and templates they need to organize their dream wedding flawlessly.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Platform</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/" className="hover:text-rose-500 transition-colors">Home</a></li>
              <li><a href="/guide" className="hover:text-rose-500 transition-colors">Checklists & Tools</a></li>
              <li><a href="/about-us" className="hover:text-rose-500 transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-rose-500 transition-colors">Wedding Blog</a></li>
              <li><a href="/how-to-plan-a-wedding-timeline.html" className="hover:text-rose-500 transition-colors">Wedding Timeline</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Support & Legal</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="/contact" className="hover:text-rose-500 transition-colors">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-rose-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-rose-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Get In Touch</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li className="flex items-start gap-3">
                <i data-lucide="mail" className="w-4 h-4 text-rose-500 mt-0.5"></i>
                <span>support@weddingplanningchecklists.org</span>
              </li>
              <li className="flex items-start gap-3">
                <i data-lucide="map-pin" className="w-4 h-4 text-rose-500 mt-0.5"></i>
                <span>Available worldwide for your planning needs.</span>
              </li>
              <li className="flex items-start gap-3">
                <i data-lucide="sparkles" className="w-4 h-4 text-rose-500 mt-0.5"></i>
                <span>Always free, always organized.</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-400">
          <p>© 2026 Wedding Planning Checklists. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <i data-lucide="heart" className="w-3.5 h-3.5 text-rose-500 mx-1 fill-current"></i> for couples everywhere.
          </p>
        </div>
      </div>
    </footer>



    
    {/*  Initialize Icons  */}
    

    {/*  UI & UX Scripts  */}
    

    </div>
  );
}
