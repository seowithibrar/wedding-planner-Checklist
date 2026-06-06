import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ChevronRight, 
  Quote, 
  Check, 
  Lightbulb, 
  Instagram, 
  Globe, 
  Facebook, 
  Twitter, 
  Send, 
  List, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
  ExternalLink,
  MessageCircle,
  Share2
} from 'lucide-react';
import { LandingNav } from './LandingNav';
import { Footer } from './Footer';

interface BlogProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onGoHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onContact: () => void;
  onBlog: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  image: string;
  layout: 'standard' | 'minimalist' | 'gallery';
  featured?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'checklists-guide',
    title: 'The Ultimate Wedding Planning Checklists Guide for a Stress-Free Wedding',
    category: 'Planning',
    date: 'June 2026',
    readTime: '10 Min Read',
    author: 'Evera Editorial',
    excerpt: 'Planning a wedding involves hundreds of decisions, deadlines, and moving parts. Without a clear system, it\'s easy to forget important tasks. Our comprehensive guide walks you through setting budgets, venues, and guest lists.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    layout: 'standard',
    featured: true
  },
  {
    id: 'how-to-choose-wedding-venue',
    title: 'How to Choose the Perfect Wedding Venue',
    category: 'Venues',
    date: 'June 2026',
    readTime: '6 Min Read',
    author: 'Evera Editorial',
    excerpt: 'A complete walkthrough on setting venue budgets, matching styles, and checking for hidden costs during site visits.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    layout: 'standard'
  },
  {
    id: 'wedding-budget-tips',
    title: '10 Budget-Saving Tips Every Couple Needs to Know',
    category: 'Budgeting',
    date: 'June 2026',
    readTime: '5 Min Read',
    author: 'Evera Editorial',
    excerpt: 'Learn how to save money on your dream wedding without sacrificing your style or the guest experience.',
    image: 'https://images.unsplash.com/photo-1507504038482-76214343e547?auto=format&fit=crop&q=80&w=800',
    layout: 'standard'
  },
  {
    id: 'perfect-guest-list-guide',
    title: 'Mastering Your Guest List & Seating Charts',
    category: 'Guest List',
    date: 'June 2026',
    readTime: '7 Min Read',
    author: 'Charlotte Evera',
    excerpt: 'Discover stress-free strategies to build your guest lists, track RSVPs, and organize seating arrangements effortlessly.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
    layout: 'minimalist'
  },
  {
    id: 'moodboard-layout',
    title: 'Chic & Modern Aesthetic: Visual Moodboard Layout',
    category: 'Style Guide',
    date: 'June 2026',
    readTime: '4 Min Read',
    author: 'Charlotte Evera',
    excerpt: 'A visual exploration of styling elements, color cards, decor details, and inspiring tablescapes for your mood boards.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    layout: 'gallery'
  }
];

export function Blog({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onContact, onBlog }: BlogProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!selectedPostId) {
      document.title = "Blog | Wedding Planning Checklists";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Read the latest wedding planning tips, trends, and advice on our blog.');
      }
    } else {
      const post = BLOG_POSTS.find(p => p.id === selectedPostId);
      if (post) {
        document.title = `${post.title} | Wedding Planning Checklists`;
      }
    }
  }, [selectedPostId]);

  const categories = ['All', 'Planning', 'Venues', 'Budgeting', 'Guest List', 'Style Guide'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured);

  const handlePostClick = (postId: string) => {
    if (postId === 'checklists-guide') {
      onOpenGuide();
    } else {
      setSelectedPostId(postId);
    }
  };

  const handleBackToBlog = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900">
      <LandingNav onHome={onGoHome} onGuide={onOpenGuide} onStart={onStart} onAbout={onAbout} onPrivacy={onPrivacy} onBlog={onBlog} onContact={onContact} />

      <main className="flex-grow pt-20">
        {!selectedPostId ? (
          // Index View
          <div>
            <section className="relative pt-20 pb-12 overflow-hidden bg-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-50/40 rounded-full blur-3xl -z-10" />
              <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-xs">Inspiration & Advice</span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Our <span className="text-rose-500">Blog</span> & Guides
                </h1>
                <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                  Expert checklists, budgeting strategies, and stress-free timelines to help you navigate your wedding planning journey.
                </p>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">
              {/* Category Filter and Search */}
              <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                        activeCategory === cat 
                          ? 'bg-slate-950 text-white shadow-md' 
                          : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Columns: Blog Posts */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Featured Post (only shown when 'All' or 'Planning' is active and search is empty) */}
                  {featuredPost && activeCategory === 'All' && !searchQuery && (
                    <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                      <div className="relative h-64 sm:h-96 w-full overflow-hidden">
                        <img 
                          src={featuredPost.image} 
                          alt={featuredPost.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                          <Sparkles size={12} fill="currentColor" /> Featured Guide
                        </span>
                      </div>
                      <div className="p-8 flex-grow flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex gap-4 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {featuredPost.date}</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                            <button 
                              onClick={() => handlePostClick(featuredPost.id)} 
                              className="hover:text-rose-500 text-left transition-colors"
                            >
                              {featuredPost.title}
                            </button>
                          </h2>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            {featuredPost.excerpt}
                          </p>
                        </div>
                        <div className="pt-6">
                          <button 
                            onClick={() => handlePostClick(featuredPost.id)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors group"
                          >
                            Read Full Guide
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-grid of other posts */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredPosts.filter(p => !p.featured || activeCategory !== 'All' || searchQuery).map((post) => (
                      <div key={post.id} className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex gap-3 text-xs font-semibold text-slate-400">
                              <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                              <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 leading-snug line-clamp-2">
                              <button 
                                onClick={() => handlePostClick(post.id)} 
                                className="hover:text-rose-500 text-left transition-colors"
                              >
                                {post.title}
                              </button>
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="pt-4">
                            <button 
                              onClick={() => handlePostClick(post.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors group"
                            >
                              Read Article 
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredPosts.length === 0 && (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                      <p className="text-slate-500 font-medium">No articles found matching your criteria.</p>
                    </div>
                  )}
                </div>

                {/* Sidebar Tools Column */}
                <div className="space-y-8 lg:col-span-1">
                  <div className="bg-white border border-slate-200 p-8 rounded-[32px] flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                        <CheckCircle2 size={24} />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider block">Interactive Tool</span>
                      <h4 className="text-xl font-bold text-slate-900">Interactive Tasks Checklist</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Follow an auto-generated timeline checklist from 12+ months out right up to your wedding day.</p>
                    </div>
                    <div className="pt-6">
                      <button 
                        onClick={onStart}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-slate-900 transition-colors"
                      >
                        Open Checklist Tool <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950 text-white p-8 rounded-[32px] flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-6 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-rose-400">
                        <Heart size={24} />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block">Smart Calculator</span>
                      <h4 className="text-xl font-bold text-white">Smart Budget Planner</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Set budget boundaries, track wedding expenses, and monitor overspending alerts in real-time.</p>
                    </div>
                    <div className="pt-6 relative z-10">
                      <button 
                        onClick={onStart}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-white transition-colors"
                      >
                        Open Budget Planner <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          // Detail View
          <div className="bg-slate-50/50">
            {/* Header Navigation for Article */}
            <div className="bg-white border-b border-slate-100 py-4 sticky top-20 z-40">
              <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <button 
                  onClick={handleBackToBlog}
                  className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Blog
                </button>
                <div className="flex gap-2 text-slate-400 text-xs font-medium items-center">
                  <span>Blog</span>
                  <ChevronRight size={12} />
                  <span className="text-slate-900 truncate max-w-xs">{BLOG_POSTS.find(p => p.id === selectedPostId)?.title}</span>
                </div>
              </div>
            </div>

            {/* RENDER CHOSEN ARTICLE LAYOUT */}
            {selectedPostId === 'wedding-budget-tips' && <BudgetTipsArticle />}
            {selectedPostId === 'how-to-choose-wedding-venue' && <WeddingVenueArticle />}
            {selectedPostId === 'perfect-guest-list-guide' && <GuestListArticle />}
            {selectedPostId === 'moodboard-layout' && <MoodboardArticle />}
          </div>
        )}
      </main>

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

/* =========================================================================
   ARTICLE 1: 10 BUDGET-SAVING TIPS EVERY COUPLE NEEDS TO KNOW (Standard)
   ========================================================================= */
function BudgetTipsArticle() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="max-w-4xl mx-auto text-center space-y-6 mb-12">
        <div className="flex justify-center items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-500">
          <span>Budgeting</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
          10 Budget-Saving Tips Every Couple Needs to Know
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-y border-slate-100 py-4 max-w-xl mx-auto">
          <span className="flex items-center gap-1"><Calendar size={14} className="text-rose-500" /> Updated June 2026</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-rose-500" /> 5 Min Read</span>
          <span className="flex items-center gap-1"><User size={14} className="text-rose-500" /> Evera Editorial</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-white p-3 rounded-[32px] shadow-sm border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1507504038482-76214343e547?auto=format&fit=crop&q=80&w=1200" 
            alt="Wedding budget planning table" 
            className="w-full max-h-[500px] object-cover rounded-[24px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        <aside className="col-span-1 lg:col-span-3 hidden lg:block">
          <div className="sticky top-40 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-slate-950 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <List size={16} className="text-rose-500" /> Guide Sections
              </h4>
              <nav className="space-y-3 text-xs font-semibold text-slate-500">
                <a href="#priorities" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">1. Focus on Priorities</a>
                <a href="#off-peak" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">2. Off-Peak Options</a>
                <a href="#decor-hacks" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">3. Decor & Flower Hacks</a>
                <a href="#tracking" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">4. Track Daily Spending</a>
              </nav>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">Share Guide</span>
              <div className="flex justify-center gap-2">
                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center transition-all"><Facebook size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center transition-all"><Twitter size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center transition-all"><Instagram size={14} /></button>
              </div>
            </div>
          </div>
        </aside>

        <article className="col-span-1 lg:col-span-9 space-y-12 text-slate-600 text-base leading-relaxed">
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
            <span className="text-xs uppercase font-bold text-rose-500 mt-3 block tracking-widest">— Evera Editorial Team</span>
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
        </article>
      </div>
    </div>
  );
}

/* =========================================================================
   ARTICLE 2: HOW TO CHOOSE THE PERFECT WEDDING VENUE (Standard Layout)
   ========================================================================= */
function WeddingVenueArticle() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="max-w-4xl mx-auto text-center space-y-6 mb-12">
        <div className="flex justify-center items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-500">
          <span>Venues</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
          How to Choose the Perfect Wedding Venue
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-y border-slate-100 py-4 max-w-xl mx-auto">
          <span className="flex items-center gap-1"><Calendar size={14} className="text-rose-500" /> Updated June 2026</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-rose-500" /> 6 Min Read</span>
          <span className="flex items-center gap-1"><User size={14} className="text-rose-500" /> Evera Editorial</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-white p-3 rounded-[32px] shadow-sm border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
            alt="Elegant wedding venue layout" 
            className="w-full max-h-[500px] object-cover rounded-[24px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        <aside className="col-span-1 lg:col-span-3 hidden lg:block">
          <div className="sticky top-40 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-slate-950 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <List size={16} className="text-rose-500" /> Guide Sections
              </h4>
              <nav className="space-y-3 text-xs font-semibold text-slate-500">
                <a href="#hook" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">1. Introduction & Hook</a>
                <a href="#guest-capacity" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">2. Assesing Capacity</a>
                <a href="#hidden-costs" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">3. Hidden Costs</a>
                <a href="#venue-checklist" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">4. Site Visit Checklist</a>
              </nav>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">Share Guide</span>
              <div className="flex justify-center gap-2">
                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center transition-all"><Facebook size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center transition-all"><Twitter size={14} /></button>
                <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 flex items-center justify-center transition-all"><Instagram size={14} /></button>
              </div>
            </div>
          </div>
        </aside>

        <article className="col-span-1 lg:col-span-9 space-y-12 text-slate-600 text-base leading-relaxed">
          <section id="hook" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">01.</span> Setting the Scene & Writing the Hook
            </h2>
            <p>
              Choosing your wedding venue is the single most critical decision you will make. It determines your wedding date, your general aesthetic theme, your guest count capacity, and a significant portion of your budget. Start by searching for spaces that resonate with your personal style as a couple.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section id="guest-capacity" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">02.</span> Assessing Guest Capacity & Logistics
            </h2>
            <p>
              Do not fall in love with a venue before you draft a preliminary guest list. If a venue has a maximum capacity of 150 guests and your list has 200, you will face stressful cuts. Make sure the venue can comfortably accommodate your guests, table arrangements, and dance floor.
            </p>
            
            <div className="my-8">
              <div className="bg-white p-3 rounded-[24px] border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" 
                  alt="Wedding table configurations in venue" 
                  className="w-full h-80 object-cover rounded-[16px]"
                />
                <p className="text-center text-xs text-slate-400 mt-3 italic">
                  Figure 1: Choosing a venue with plenty of natural lighting and open spaces creates a breathtaking atmosphere.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Premium Pull Quote Box */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-rose-500 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute right-4 bottom-2 opacity-5 text-rose-500">
              <Quote size={80} />
            </div>
            <p className="text-lg italic text-slate-900 font-semibold leading-relaxed relative z-10">
              "The right venue will not only frame your ceremony; it will set the entire mood and simplify the planning of every other single vendor."
            </p>
            <span className="text-xs uppercase font-bold text-rose-500 mt-3 block tracking-widest">— Evera Editorial Team</span>
          </div>

          <section id="hidden-costs" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">03.</span> Checking for Hidden Costs
            </h2>
            <p>
              Always ask what is included in the rental fee. Some venues seem cheap but charge extra for tables, chairs, cleanup, security, or garbage disposal. Others require you to use their preferred list of caterers, which might be more expensive than your budget allows.
            </p>
          </section>

          <hr className="border-slate-100" />

          <section id="venue-checklist" className="space-y-4 scroll-mt-40">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="text-rose-500">04.</span> Site Visit Checklist & Questions
            </h2>
            <p>
              Before signing a venue contract, review the backup weather plan for outdoor ceremonies, the parking situations, noise restrictions, and deposit refund policies.
            </p>
          </section>

          {/* Custom Styled Checklist Card */}
          <div className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100 space-y-4">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="text-rose-500" size={20} /> Venue Questions Checklist
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Weather Contingency Plan:</strong> Is there an indoor backup space that you love just as much?</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Vendor Restrictions:</strong> Are you locked into specific exclusive vendors?</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="text-rose-500" size={12} /></div>
                <span><strong>Access Hours:</strong> What time can setup begin, and when must cleanup be completed?</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}

/* =========================================================================
   ARTICLE 3: MASTERING YOUR GUEST LIST & SEATING CHARTS (Minimalist)
   ========================================================================= */
function GuestListArticle() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-12 text-slate-700 text-lg leading-relaxed bg-white my-10 rounded-[32px] border border-slate-100 shadow-sm">
      <header className="text-center space-y-6">
        <nav className="flex justify-center items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-500">
          <span>Guest List</span>
        </nav>
        
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          Mastering Your Guest List & Seating Charts
        </h1>

        <p className="italic text-slate-500 max-w-2xl mx-auto leading-relaxed text-base">
          A story of wedding preparation, personal checklists, and creating unforgettable memories with minimalist grace.
        </p>
        
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 pt-4 border-t border-slate-100 max-w-lg mx-auto">
          <span className="flex items-center gap-1"><Calendar size={14} className="text-rose-500" /> June 2026</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-rose-500" /> 7 Min Read</span>
        </div>
      </header>

      {/* Drop Cap Paragraph */}
      <p className="first-letter:float-left first-letter:text-7xl first-letter:font-black first-letter:text-rose-500 first-letter:mr-3 first-letter:mt-2 text-slate-800">
        M<span className="text-slate-800">astering your guest list is often one of the most socially sensitive tasks of wedding planning. Balancing family expectations, friend circles, and budget constraints requires strategy, diplomacy, and organization. By stripping away standard templates, we leave a pure focus on copy and visual elegance.</span>
      </p>

      <p>
        When writing a storytelling piece, prioritize pacing. Break up paragraphs so they flow seamlessly, and integrate small header markers to transition between thoughts.
      </p>

      {/* Elegant Separator */}
      <div className="flex items-center justify-center gap-3 my-8 opacity-30">
        <div className="w-12 h-px bg-rose-500"></div>
        <Heart size={14} className="text-rose-500" fill="currentColor" />
        <div className="w-12 h-px bg-rose-500"></div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">The Power of Minimalist Elements</h3>
        <p>
          A clean page doesn't mean a boring page. Adding subtle design touches like blockquotes that stretch slightly wider than the content block, or custom-tinted highlight containers, adds premium visual pacing to long articles.
        </p>
      </div>

      {/* Centered Blockquote */}
      <blockquote className="text-center text-xl italic text-rose-500 my-12 max-w-2xl mx-auto leading-relaxed border-y border-rose-100 py-8 px-4 font-medium">
        "Simplicity is the ultimate sophistication. When you remove the unnecessary, the details that remain are allowed to speak with true elegance."
      </blockquote>

      <p>
        You can use the above blockquote format to highlight a powerful statement. It is centered, features a custom font size, and relies on subtle border lines to frame the text.
      </p>

      <figure className="my-10 space-y-3">
        <img 
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" 
          alt="Curated table arrangements and seating checklist" 
          className="w-full h-96 object-cover rounded-3xl shadow-sm border border-white"
        />
        <figcaption className="text-center text-xs text-slate-400 italic">Carefully curated invitations match the general wedding design theme.</figcaption>
      </figure>

      {/* Highlight Callout Box */}
      <div className="bg-rose-50/40 border border-rose-100 rounded-3xl p-8 my-8 flex items-start gap-4">
        <div className="p-3 bg-white rounded-2xl text-rose-500 shrink-0 shadow-sm">
          <Lightbulb size={24} />
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-slate-900">Planning Takeaway</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Always request physical paper samples from your stationer. The weight, texture, and ink-absorption can feel completely different in your hands compared to looking at a digital proof on a screen.
          </p>
        </div>
      </div>

      <p>
        Finally, conclude your editorial piece with a summary of the next steps or a reflection. Since stories feel more personal, ending with a small author biography links the content to a human face.
      </p>

      {/* Author Bio Section */}
      <div className="border-t border-slate-100 pt-12 mt-16">
        <div className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-rose-100 border-2 border-rose-500 flex items-center justify-center shrink-0 shadow-inner">
            <User size={40} className="text-rose-500" />
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
              <h5 className="font-bold text-lg text-slate-900">Written by Charlotte Evera</h5>
              <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">Lead Planner & Stylist</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Charlotte has over a decade of experience designing luxury, stress-free weddings. She writes on color palettes, vendor relations, and checklist management to help couples build their dream days.
            </p>
            <div className="flex justify-center sm:justify-start gap-3 pt-1">
              <a href="#" className="text-slate-400 hover:text-rose-500 transition-colors"><Instagram size={16} /></a>
              <a href="#" className="text-slate-400 hover:text-rose-500 transition-colors"><Globe size={16} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ARTICLE 4: CHIC & MODERN AESTHETIC: VISUAL MOODBOARD LAYOUT (Gallery)
   ========================================================================= */
function MoodboardArticle() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Visual Hero */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <nav className="flex justify-center lg:justify-start items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-500">
            <span>Style Guide</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Chic & Modern Aesthetic: Visual Moodboard Layout
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            A visual exploration of styling elements, color cards, decor details, and inspiring tablescapes for your mood boards.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1"><Calendar size={14} className="text-rose-500" /> Updated June 2026</span>
            <span className="flex items-center gap-1"><Clock size={14} className="text-rose-500" /> 4 Min Read</span>
          </div>
        </div>

        {/* Hero Grid Showcase */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
          <div className="space-y-4">
            <div className="bg-white p-2 rounded-2xl shadow-md rotate-[-2deg] hover:rotate-0 transition-transform duration-300 border border-slate-100">
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400" alt="Venue decor" className="w-full h-48 object-cover rounded-xl" />
            </div>
            <div className="bg-white p-2 rounded-2xl shadow-md rotate-[1deg] hover:rotate-0 transition-transform duration-300 border border-slate-100">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=400" alt="Stationery" className="w-full h-32 object-cover rounded-xl" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-white p-2 rounded-2xl shadow-md rotate-[2deg] hover:rotate-0 transition-transform duration-300 border border-slate-100">
              <img src="https://images.unsplash.com/photo-1507504038482-76214343e547?auto=format&fit=crop&q=80&w=400" alt="Tablescape" className="w-full h-44 object-cover rounded-xl" />
            </div>
          </div>
        </div>
      </header>

      {/* Palette Swatch Card */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold text-rose-500 tracking-widest">Inspiration Palette</span>
            <h3 className="text-2xl font-bold text-slate-900">Curated Color Story</h3>
            <p className="text-sm text-slate-500 max-w-lg mx-auto">Harmonious color codes selected by our editorial designers for a timeless, modern aesthetic.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 max-w-2xl mx-auto">
            {[
              { name: 'Rose Gold', hex: '#B76E79' },
              { name: 'Soft Pink', hex: '#FCECF0' },
              { name: 'Warm Gold', hex: '#D4AF37' },
              { name: 'Sage Green', hex: '#7A8B7B' },
              { name: 'Espresso', hex: '#2C2224' }
            ].map((swatch, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div 
                  className="w-16 h-16 rounded-full shadow-sm border-4 border-white transition-transform group-hover:scale-110" 
                  style={{ backgroundColor: swatch.hex }}
                />
                <span className="text-xs font-bold text-slate-900">{swatch.name}</span>
                <code className="text-[10px] text-slate-400 font-bold">{swatch.hex}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetrical Image Grid Showcase */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">The Visual Gallery</h3>
          <p className="text-sm text-slate-500 leading-relaxed">Hover over each card to explore detail titles, styling notes, and key photo credits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              category: 'Atmosphere', 
              title: 'Atmospheric Fairy Lights', 
              desc: 'Create high contrast warm tones against cool dusk skies using warm-yellow outdoor light strings.',
              img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600'
            },
            { 
              category: 'Table Setting', 
              title: 'Gold Cutlery & Elegant Roses', 
              desc: 'Combining warm metallic finishes with soft petal textures yields an instant luxury finish.',
              img: 'https://images.unsplash.com/photo-1507504038482-76214343e547?auto=format&fit=crop&q=80&w=600'
            },
            { 
              category: 'Paper Goods', 
              title: 'Textured Invitation Suites', 
              desc: 'Introduce custom deckled edges or velvet ribbons to set a tactile tone from the first mailout.',
              img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600'
            }
          ].map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[24px] bg-white p-3 border border-slate-200 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden rounded-[18px] h-80">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white text-left">
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-widest mb-1">{item.category}</span>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-Side: Image and Style Checklist */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
        <div className="lg:col-span-6">
          <div className="bg-white p-3 rounded-[32px] shadow-sm border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600" 
              alt="Style checklists guide" 
              className="w-full h-96 object-cover rounded-[24px]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-rose-500 tracking-wider">Style Check</span>
            <h3 className="text-3xl font-bold text-slate-900">Aesthetic Integrity Checklist</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Ensure you cover all essential styling anchors during planning sessions to keep the theme cohesive:</p>
          </div>

          <ul className="space-y-4">
            {[
              { title: 'Consistent Lighting Temperature', desc: 'Ensure all vendors match on warm/ambient bulb styling (typically 2700K temperature).' },
              { title: 'Harmonized Stationery Typography', desc: 'Align welcome boards, table numbers, place cards, and menus to use the same two brand fonts.' },
              { title: 'Floral Color Proportions', desc: 'Stick to a 60% dominant shade, 30% supporting tone, and 10% vivid metallic or accent color scheme.' }
            ].map((check, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5"><Check size={14} className="text-rose-500" /></div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">{check.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{check.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Styling Vendors */}
      <section className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold text-rose-500 tracking-widest">Featured Curations</span>
          <h3 className="text-2xl font-bold text-slate-900">Featured Styling Vendors</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { 
              cat: 'Florals', 
              name: 'Blossom & Oak Design', 
              desc: 'Custom tablescapes, ceiling floral installations, and delicate bridal bouquets matching warm pastel aesthetics.',
              loc: 'St. Helena, CA'
            },
            { 
              cat: 'Stationery', 
              name: 'Fine Line Calligraphy', 
              desc: 'Bespoke paper goods featuring handmade deckled finishes, metallic gold foil presses, and wax seals.',
              loc: 'San Francisco, CA'
            },
            { 
              cat: 'Tableware', 
              name: 'Rustic Heirloom Rentals', 
              desc: 'Curated cutlery, crystal glassware sets, and artisanal stoneware plate plates for luxury catering setups.',
              loc: 'Napa Valley, CA'
            }
          ].map((v, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3 text-left">
                <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full inline-block">{v.cat}</span>
                <h4 className="font-bold text-lg text-slate-950">{v.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold">{v.loc}</span>
                <button className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-slate-950 transition-colors">
                  View Work <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
