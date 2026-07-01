import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown, 
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
    id: 'wedding-planning-checklist-tips',
    title: '20 Tips for Your Wedding Planning Checklist',
    category: 'Planning',
    date: 'June 2026',
    readTime: '8 Min Read',
    author: 'Evera Editorial',
    excerpt: 'Use our wedding planning checklist to stress less and enjoy more. 20 proven tips to help engaged couples plan every detail with confidence.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800',
    layout: 'standard'
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
  },
  {
    id: 'hairstyles-for-wedding',
    title: '50+ Hairstyles for Wedding: Elegant Bridal Looks',
    category: 'Style Guide',
    date: 'June 2026',
    readTime: '9 Min Read',
    author: 'Evera Editorial',
    excerpt: 'From classic bridal buns and Hollywood waves to South Asian wedding traditions and 2026\'s hottest trends — your complete guide to choosing the perfect wedding hairstyle.',
    image: 'https://images.unsplash.com/photo-1591555200577-059798e70a6c?auto=format&fit=crop&q=80&w=800',
    layout: 'standard'
  },
  {
    id: 'how-to-plan-a-wedding-timeline',
    title: 'How to Plan a Wedding Timeline: A Complete Step-by-Step Guide',
    category: 'Planning',
    date: 'June 2026',
    readTime: '7 Min Read',
    author: 'Evera Editorial',
    excerpt: 'Learn how to plan a wedding timeline from engagement to wedding day, including a wedding day timeline, reception timeline, and budget timeline.',
    image: '/How to Plan a Wedding Timeline.webp',
    layout: 'standard'
  }
];

const getSlugFromPostId = (id: string): string => {
  const mapping: Record<string, string> = {
    'checklists-guide': 'The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding',
    'wedding-planning-checklist-tips': '20-Tips-for-Your-Wedding-Planning-Checklist',
    'how-to-choose-wedding-venue': 'How-to-Choose-the-Perfect-Wedding-Venue',
    'wedding-budget-tips': '10-Budget-Saving-Tips-Every-Couple-Needs-to-Know',
    'perfect-guest-list-guide': 'Mastering-Your-Guest-List-&-Seating-Charts',
    'moodboard-layout': 'Chic-&-Modern-Aesthetic:-Visual-Moodboard-Layout',
    'hairstyles-for-wedding': 'Hairstyles-for-Wedding',
    'how-to-plan-a-wedding-timeline': 'how-to-plan-a-wedding-timeline'
  };
  return mapping[id] || id;
};

const getPostIdFromSlug = (slug: string): string | null => {
  const normalizedSlug = decodeURIComponent(slug).toLowerCase().replace(/\/$/, '');
  const mapping: Record<string, string> = {
    'the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding': 'checklists-guide',
    '20-tips-for-your-wedding-planning-checklist': 'wedding-planning-checklist-tips',
    'how-to-choose-the-perfect-wedding-venue': 'how-to-choose-wedding-venue',
    '10-budget-saving-tips-every-couple-needs-to-know': 'wedding-budget-tips',
    'mastering-your-guest-list-&-seating-charts': 'perfect-guest-list-guide',
    'mastering-your-guest-list-and-seating-charts': 'perfect-guest-list-guide',
    'chic-&-modern-aesthetic:-visual-moodboard-layout': 'moodboard-layout',
    'chic-and-modern-aesthetic-visual-moodboard-layout': 'moodboard-layout',
    'hairstyles-for-wedding': 'hairstyles-for-wedding',
    'how-to-plan-a-wedding-timeline': 'how-to-plan-a-wedding-timeline'
  };
  return mapping[normalizedSlug] || null;
};

export function Blog({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onContact, onBlog }: BlogProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
      const slug = path.substring(6);
      const postId = getPostIdFromSlug(slug);
      if (postId && postId !== 'checklists-guide') {
        return postId;
      }
    }
    return null;
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const slug = path.substring(6);
        const postId = getPostIdFromSlug(slug);
        if (postId && postId !== 'checklists-guide') {
          setSelectedPostId(postId);
        } else {
          setSelectedPostId(null);
        }
      } else {
        setSelectedPostId(null);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

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
        if (post.id === 'hairstyles-for-wedding') {
          document.title = "50+ Hairstyles for Wedding: Elegant Bridal Looks";
        } else if (post.id === 'wedding-planning-checklist-tips') {
          document.title = "20 Tips for Your Wedding Planning Checklist";
        } else if (post.id === 'how-to-plan-a-wedding-timeline') {
          document.title = "How to Plan a Wedding Timeline: Step-by-Step Guide (2026)";
        } else {
          document.title = `${post.title} | Wedding Planning Checklists`;
        }

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          if (post.id === 'hairstyles-for-wedding') {
            metaDescription.setAttribute('content', 'Discover 50+ wedding hairstyles for every hair type and function. From classic bridal buns to Hollywood waves, South Asian gajra looks, and 2026 trends.');
          } else if (post.id === 'wedding-planning-checklist-tips') {
            metaDescription.setAttribute('content', 'Use our wedding planning checklist to stress less and enjoy more. 20 proven tips to help engaged couples plan every detail with confidence.');
          } else if (post.id === 'how-to-plan-a-wedding-timeline') {
            metaDescription.setAttribute('content', 'Learn how to plan a wedding timeline from engagement to wedding day, including a wedding day timeline, reception timeline, and budget timeline.');
          } else {
            metaDescription.setAttribute('content', post.excerpt);
          }
        }
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
      const slug = getSlugFromPostId(postId);
      const newPath = `/blog/${slug}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
      }
      setSelectedPostId(postId);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToBlog = () => {
    if (window.location.pathname !== '/blog') {
      window.history.pushState({}, '', '/blog');
    }
    setSelectedPostId(null);
    window.scrollTo(0, 0);
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
            {selectedPostId === 'wedding-planning-checklist-tips' && <WeddingChecklistTipsArticle />}
            {selectedPostId === 'wedding-budget-tips' && <BudgetTipsArticle />}
            {selectedPostId === 'how-to-choose-wedding-venue' && <WeddingVenueArticle />}
            {selectedPostId === 'perfect-guest-list-guide' && <GuestListArticle />}
            {selectedPostId === 'moodboard-layout' && <MoodboardArticle />}
            {selectedPostId === 'hairstyles-for-wedding' && <WeddingHairstylesArticle />}
            {selectedPostId === 'how-to-plan-a-wedding-timeline' && <WeddingTimelineArticle />}
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

/* =========================================================================
   ARTICLE 5: 20 TIPS FOR YOUR WEDDING PLANNING CHECKLIST (Standard Layout)
   ========================================================================= */
function WeddingChecklistTipsArticle() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="max-w-4xl mx-auto text-center space-y-6 mb-12">
        <div className="flex justify-center items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-500">
          <span>Planning</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
          20 Tips for Your Wedding Planning Checklist
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-y border-slate-100 py-4 max-w-xl mx-auto">
          <span className="flex items-center gap-1"><Calendar size={14} className="text-rose-500" /> Updated June 2026</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-rose-500" /> 8 Min Read</span>
          <span className="flex items-center gap-1"><User size={14} className="text-rose-500" /> Evera Editorial</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-white p-3 rounded-[32px] shadow-sm border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200" 
            alt="Couple looking at wedding planning checklist documents" 
            className="w-full max-h-[500px] object-cover rounded-[24px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Sticky Sidebar Navigation */}
        <aside className="col-span-1 lg:col-span-3 hidden lg:block">
          <div className="sticky top-40 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-slate-950 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <List size={16} className="text-rose-500" /> Checklist Sections
              </h4>
              <nav className="space-y-3 text-xs font-semibold text-slate-500">
                <a href="#early" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">1. Early Planning</a>
                <a href="#budget" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">2. Budget Planning</a>
                <a href="#guests" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">3. Guest List</a>
                <a href="#vendors" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">4. Venue & Vendors</a>
                <a href="#bridal-party" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">5. Bridal Party</a>
                <a href="#legal" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">6. Legal & Paperwork</a>
                <a href="#food" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">7. Food & Catering</a>
                <a href="#logistics" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">8. Day-Of Logistics</a>
                <a href="#final" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">9. Final Week Check</a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Article Body */}
        <article className="col-span-1 lg:col-span-9 space-y-12 text-slate-600 text-base leading-relaxed">
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
              <span className="text-xs uppercase font-bold text-rose-500 mt-3 block tracking-widest">— Evera Editorial Team</span>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}

/* =========================================================================
   ARTICLE 6: 50+ HAIRSTYLES FOR WEDDING (Standard Layout)
   ========================================================================= */
function WeddingHairstylesArticle() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Which hairstyle is best for a wedding?",
      a: "There is no single \"best\" wedding hairstyle — the right choice depends on your hair type, face shape, outfit, and wedding theme. However, the most universally flattering and enduring choices are the classic low chignon, half up half down with soft curls, and Hollywood waves. These styles photograph beautifully in virtually any setting and work across most hair types and lengths."
    },
    {
      q: "What hairstyle suits every face shape?",
      a: "Soft curls with face-framing layers, half up half down styles, and the low chignon are considered the most universally flattering across all face shapes. Oval faces have the most freedom, while round, square, and heart faces benefit from styles that add height or soften angles. Always consult with your stylist about what works best for your specific face shape."
    },
    {
      q: "How long does a bridal hairstyle last?",
      a: "A professionally done bridal hairstyle using quality products and pins should last 8–12 hours comfortably. Styles with updos and braids tend to hold longer than open curl styles. Using a strong-hold finishing spray and avoiding touching the hair throughout the day will maximize longevity."
    },
    {
      q: "Can short hair look elegant for weddings?",
      a: "Absolutely — short hair can be just as elegant, dramatic, and bridal as long hair. Pixie cuts embellished with crystal clips or pearl pins, defined finger waves, textured bobs with floral accessories, and sleek glass hair looks are all stunning options for short-haired brides. The key is choosing accessories that add bridal character to the shorter style."
    },
    {
      q: "Should brides wash their hair before styling?",
      a: "Most professional stylists recommend washing hair the night before rather than the morning of the wedding. Day-old hair has more natural texture and grip, which allows styles to hold better and longer. Clean, freshly washed hair can be too slippery for pins and products to hold effectively, particularly for updos and braids."
    },
    {
      q: "Are hair extensions worth it for weddings?",
      a: "Hair extensions can be transformative for brides who want added length, volume, or density on their wedding day. Clip-in extensions are the most common choice as they are temporary and easy to manage. It is important to match the extensions carefully to your natural hair colour, have them tested at the hair trial, and confirm with your stylist that your chosen style works with extensions before committing."
    },
    {
      q: "Which hairstyle works best with a veil?",
      a: "Updos — particularly low chignons, classic buns, and French twists — are the easiest styles to pair with veils because the veil comb can be placed cleanly beneath the updo without disrupting the style. Half up half down styles also work well, with the veil comb secured at the crown. Open, flowing hair styles can accommodate shorter veils but may tangle with longer cathedral-length veils."
    },
    {
      q: "What hairstyle is trending this wedding season?",
      a: "In 2026, the top bridal hair trends are pearl-embellished styles, minimal low buns, glass hair looks, bubble braids, Korean-inspired soft updos, and bow hairstyles. South Asian brides are also embracing wet look updos and floral crown braids for pre-wedding functions like Mehndi and Sangeet."
    },
    {
      q: "How early should bridal hair be done?",
      a: "Bridal hair typically takes 1.5–3 hours depending on the complexity of the style. Hair should generally be done before makeup, and the timing should be planned backward from the ceremony start. For a 5pm ceremony, hair should typically begin no later than 12–1pm to allow time for makeup, dressing, and photographs before the event."
    },
    {
      q: "Which hairstyle is best for outdoor weddings?",
      a: "For outdoor weddings, prioritize styles that are secure and resistant to wind and humidity. Braided updos, structured buns, crown braids, and half up styles with plenty of pins are all excellent choices. Loose, open styles can still work outdoors but require more finishing spray and touch-ups. Avoid styles that rely entirely on curls if the ceremony is in a humid climate."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-slate-800">
      <header className="max-w-4xl mx-auto text-center space-y-6 mb-12">
        <div className="flex justify-center items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-500">
          <span>Style Guide</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
          50+ Hairstyles for Wedding
        </h1>
        <p className="text-xl font-semibold text-rose-500 font-heading italic">
          Elegant Bridal Looks for Every Hair Type & Wedding Function
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-y border-slate-100 py-4 max-w-xl mx-auto">
          <span className="flex items-center gap-1"><Calendar size={14} className="text-rose-500" /> Updated June 2026</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-rose-500" /> 9 Min Read</span>
          <span className="flex items-center gap-1"><User size={14} className="text-rose-500" /> Evera Editorial</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-white p-3 rounded-[32px] shadow-sm border border-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1591555200577-059798e70a6c?auto=format&fit=crop&q=80&w=1200" 
            alt="Beautiful bridal hairstyle with floral details" 
            className="w-full max-h-[500px] object-cover rounded-[24px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Sticky Sidebar Navigation */}
        <aside className="col-span-1 lg:col-span-3 hidden lg:block">
          <div className="sticky top-40 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-sm text-slate-950 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <List size={16} className="text-rose-500" /> Guide Sections
              </h4>
              <nav className="space-y-3 text-xs font-semibold text-slate-500">
                <a href="#choose-style" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">1. Choosing Your Style</a>
                <a href="#updo-styles" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">2. Best Updo Hairstyles</a>
                <a href="#open-styles" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">3. Open Wedding Styles</a>
                <a href="#half-up" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">4. Half Up Half Down</a>
                <a href="#braids" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">5. Braided Hairstyles</a>
                <a href="#by-length" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">6. Styles by Length</a>
                <a href="#by-type" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">7. Styles by Hair Type</a>
                <a href="#face-shape-table" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">8. Styles by Face Shape</a>
                <a href="#indian" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">9. Indian Wedding Styles</a>
                <a href="#pakistani" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">10. Pakistani Wedding Styles</a>
                <a href="#outfit" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">11. Styles by Outfit</a>
                <a href="#trends" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">12. 2026 Trending Styles</a>
                <a href="#accessories" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">13. Hair Accessories</a>
                <a href="#care" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">14. Hair Care Tips</a>
                <a href="#mistakes" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">15. Mistakes to Avoid</a>
                <a href="#faq" className="block hover:text-rose-500 transition-colors border-l-2 border-transparent hover:border-rose-500 pl-3">16. Hairstyle FAQs</a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Article Body */}
        <article className="col-span-1 lg:col-span-9 space-y-12 text-slate-600 text-base leading-relaxed">
          <section className="space-y-4">
            <p className="text-lg font-medium text-slate-900 leading-relaxed text-left">
              Your wedding hairstyle is far more than a beauty decision — it is the crown you wear on one of the most photographed days of your life. Whether you envision a sleek bridal bun adorned with pearls, loose romantic curls cascading down your back, or an intricate braid woven with fresh jasmine, the right hairstyle frames your face, complements your outfit, and carries you through hours of celebration with confidence.
            </p>
            <p className="text-left">
              This guide covers 50+ hairstyles for weddings, organized by style, hair type, length, face shape, outfit, and cultural function — so no matter what kind of bride you are, you will find exactly the look you need. We have also included 2026's biggest bridal hair trends, expert hair care tips, and the mistakes most brides wish they had avoided.
            </p>
            <p className="text-left">
              Before diving in, use our free wedding planning tools to build your complete bridal beauty timeline, and visit our wedding planning homepage for checklists that keep every detail on track.
            </p>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 shadow-sm items-start">
                <span className="p-3 bg-rose-50 rounded-xl text-rose-500 shrink-0">
                  <Lightbulb size={24} />
                </span>
                <div className="text-left">
                  <h4 className="font-bold text-slate-950 text-sm mb-1">Book a Hair Trial</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">Always schedule at least one trial with your stylist 4–6 weeks before the wedding to test the look and products.</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 shadow-sm items-start">
                <span className="p-3 bg-rose-50 rounded-xl text-rose-500 shrink-0">
                  <Calendar size={24} />
                </span>
                <div className="text-left">
                  <h4 className="font-bold text-slate-950 text-sm mb-1">Start Hair Care Early</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">Begin deep conditioning treatments and hair masks 3 months before the big day for maximum shine and strength.</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 shadow-sm items-start">
                <span className="p-3 bg-rose-50 rounded-xl text-rose-500 shrink-0">
                  <Sparkles size={24} />
                </span>
                <div className="text-left">
                  <h4 className="font-bold text-slate-950 text-sm mb-1">Plan for Weather</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">Outdoor or humid-climate brides should choose humidity-resistant styles and use anti-frizz products for longevity.</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 shadow-sm items-start">
                <span className="p-3 bg-rose-50 rounded-xl text-rose-500 shrink-0">
                  <Heart size={24} />
                </span>
                <div className="text-left">
                  <h4 className="font-bold text-slate-950 text-sm mb-1">Match Your Neckline</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">Strapless gowns shine with updos; high necklines pair beautifully with open, flowing hair or side-swept styles.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 1: How to Choose */}
          <section id="choose-style" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">How to Choose the Perfect Wedding Hairstyle</h2>
            <p>
              With hundreds of bridal hairstyle options available, narrowing down the perfect look can feel overwhelming. These seven key factors will help you make a confident decision that you will love both in person and in photographs for decades.
            </p>

            <div className="space-y-4">
              {[
                { title: "Face Shape", desc: "Your face shape is one of the most important guides to a flattering hairstyle. Round faces benefit from volume at the crown and vertical height; heart-shaped faces look stunning with loose waves softening the forehead; square faces are balanced by soft, face-framing curls; and oval faces are the most versatile, suiting almost every bridal style. Regardless of shape, the goal is always to highlight your best features while creating harmony and proportion." },
                { title: "Hair Length", desc: "Long hair opens up the full spectrum of bridal styles — from grand updos to flowing cascades. Medium hair is perfect for half up half down looks, braided styles, and low chignons. Short hair, contrary to popular belief, can be just as elegant and dramatic, especially with the right accessories and embellishments. Shoulder-length hair is ideal for French twists, low buns, and voluminous curls." },
                { title: "Hair Texture", desc: "Work with your natural hair texture rather than against it. Naturally curly brides have a built-in advantage for boho and romantic styles; straight hair creates sleek, polished updos effortlessly; thick hair holds braids and buns beautifully without extra product; and fine hair benefits from volumizing techniques and strategic pinning that creates the illusion of fullness." },
                { title: "Wedding Dress Neckline", desc: "Your gown's neckline should always influence your hair decision. Sweetheart or strapless necklines pair perfectly with elegant updos that draw attention to your shoulders and décolletage. Off-shoulder gowns look breathtaking with half-up styles or loose waves. High necklines, including mandarin collars on lehengas or anarkalis, are best balanced with hair worn down or in a low, swept back style that doesn't compete with the neckline detail." },
                { title: "Wedding Theme", desc: "A beach wedding calls for relaxed, windswept waves or a loose boho braid. A royal ballroom wedding demands a structured chignon or embellished updo. Rustic garden ceremonies suit floral-woven braids and soft romantic curls. Modern minimalist weddings are elevated by glass hair, sleek buns, and clean wet-look styling. Let your venue and theme guide the formality and texture of your bridal hairstyle." },
                { title: "Indoor vs Outdoor Wedding", desc: "Indoor brides have the full range of styling options available without worrying about wind or humidity. Outdoor brides should prioritize secure, pin-based styles or styles that look beautiful even when slightly tousled — beach waves, braided updos, and structured buns all perform well outdoors. Always use a quality finishing spray for outdoor ceremonies." },
                { title: "Weather Considerations", desc: "Hot, humid climates can cause straight hair to revert and curls to become frizzy. In these conditions, prioritize updos, braids, and styles secured with plenty of pins. Cold or dry climates can cause static and frizz — use lightweight serums and anti-static sprays. If your wedding is during Pakistan's summer, or during monsoon season, plan your hairstyle with extra hold products and a backup plan with your stylist." }
              ].map((factor, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> {factor.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600">{factor.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2: Best Updo Hairstyles */}
          <section id="updo-styles" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Best Updo Hairstyles for Wedding</h2>
            <p>
              Updos remain the quintessential bridal hairstyle choice — they keep hair secure all day, photograph beautifully from every angle, and showcase necklines, earrings, and necklaces to full effect. Here are the most popular wedding updo styles and how to wear them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Classic Bridal Bun", desc: "The timeless bridal bun is a structured, polished knot placed at the nape of the neck or mid-crown. It works beautifully on all hair lengths (with extensions if needed) and provides a clean, elegant canvas for headpieces, veils, and pearl accessories.", best: "Best for: Ball gowns, lehengas, formal venues" },
                { name: "Low Chignon", desc: "A low chignon sits elegantly at the nape of the neck with a smooth, rolled finish. Romantic face-framing tendrils can be left loose to soften the look. It is one of the most universally flattering and enduringly popular wedding hairstyles.", best: "Best for: All face shapes, all necklines" },
                { name: "Sleek Bun", desc: "The sleek bun is high-gloss, ultra-smooth, and modern. Every strand is pulled back with precision for a geometric, architectural look that photographs strikingly well. Ideal for minimalist brides and contemporary venues.", best: "Best for: Modern weddings, minimalist brides" },
                { name: "Messy Bun", desc: "The messy bun offers effortless, romantic texture — loosely gathered with deliberately imperfect wisps framing the face. It works beautifully for boho, garden, and destination weddings where polished perfection would feel out of place.", best: "Best for: Outdoor, garden, boho weddings" },
                { name: "Twisted Bun", desc: "Hair is twisted elegantly into a coiled or knotted bun, creating a sculptural, artisan appearance with beautiful dimension. Crystal pins or hair vines threaded through the twists add a bridal sparkle that catches the light all day.", best: "Best for: Evening weddings, embellished looks" },
                { name: "French Twist", desc: "The iconic French twist sweeps all hair vertically up the back and tucks it into a smooth, vertical roll. It is one of the most sophisticated and photography-friendly styles available — a true classic that never ages.", best: "Best for: Classic brides, strapless gowns" },
                { name: "Royal Bridal Bun", desc: "Elevated with a tiara, maang tikka, or elaborate headpiece, the royal bridal bun is a high, voluminous knot that commands attention. It is the signature style for South Asian brides during their main wedding ceremony, pairing perfectly with heavy bridal jewellery.", best: "Best for: Barat, lehenga, South Asian ceremonies" },
                { name: "Floral Bun", desc: "Fresh or silk flowers are woven directly into a classic bun — jasmine for South Asian ceremonies, baby's breath or garden roses for Western weddings. The floral bun is romantic, fragrant (when fresh), and photographs with a natural warmth no accessory can replicate.", best: "Best for: Mehndi, garden weddings, boho style" }
              ].map((style, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2 text-left">
                    <h4 className="font-bold text-slate-900 text-lg">{style.name}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{style.desc}</p>
                  </div>
                  <span className="text-xs uppercase font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full w-fit mt-4 inline-block">{style.best}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 3: Open Hairstyles */}
          <section id="open-styles" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Open Hairstyles for Wedding</h2>
            <p>
              Open hairstyles exude romance, freedom, and modern bridal confidence. They are especially popular for beach weddings, cocktail receptions, and brides who want to showcase their natural hair. The key to making an open style work all day is proper product, technique, and the right finishing spray.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Hollywood Waves", desc: "Old Hollywood glamour at its finest — deep, structured S-waves that cascade to one side with high shine and drama. Created with a large-barrel curling iron and carefully combed out, this style photographs magnificently under candlelight and soft bridal lighting.", best: "Best for: Evening, glamour, reception looks" },
                { name: "Soft Curls", desc: "Loose, romantic curls that fall naturally around the face and shoulders. Less structured than Hollywood waves, soft curls create an ethereal, angelic bridal look. They work best on medium to long hair and pair beautifully with a cathedral veil.", best: "Best for: Romantic, outdoor, fairy-tale weddings" },
                { name: "Beach Waves", desc: "Relaxed, textured waves with a naturally tousled finish — effortless by design. Beach waves use sea-salt sprays and diffusers to create movement and texture. Perfect for destination weddings, casual ceremonies, and brides who want to look like themselves on their best day.", best: "Best for: Beach, destination, boho weddings" },
                { name: "Straight Hair Look", desc: "Sleek, glass-smooth straight hair worn down is a powerful modern bridal statement. Achieved with a flat iron and shine serum, this look is minimalist, contemporary, and works exceptionally well with geometric, modern gowns and editorial-style photography.", best: "Best for: Modern, minimalist brides" },
                { name: "Side Swept Curls", desc: "All hair and curls are gathered and draped over one shoulder in a romantic cascade. The exposed neck and opposite side add elegance and asymmetric interest — a style that looks intentional and stunning from every angle of the ceremony.", best: "Best for: One-shoulder gowns, oval and heart faces" }
              ].map((style, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2 text-left">
                    <h4 className="font-bold text-slate-900 text-lg">{style.name}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{style.desc}</p>
                  </div>
                  <span className="text-xs uppercase font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full w-fit mt-4 inline-block">{style.best}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 4: Half Up Half Down */}
          <section id="half-up" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Half Up Half Down Wedding Hairstyles</h2>
            <p>
              Half up half down is consistently one of the most requested bridal hair styles — it offers the elegance of an updo while keeping the romantic flow of open hair. The versatility of this style means it can be dressed up or down with the right accessories and finishing touches.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🌀", name: "Half Up with Curls", desc: "The upper section is secured at the crown while cascading curls flow freely beneath. Add a crystal clip or pearl barrette at the crown for a bridal finish." },
                { icon: "🔀", name: "Half Up with Braids", desc: "Dutch or French braids frame the crown section before being gathered at the back, with the lower hair left in waves. Ideal for boho and garden brides." },
                { icon: "🌸", name: "Half Up with Flowers", desc: "Fresh florals — jasmine, baby's breath, or small roses — are pinned along the gathered crown section for a natural, fragrant bridal look that photographs beautifully." },
                { icon: "🤍", name: "Half Up with Pearls", desc: "Pearl pins, pearl-studded clips, or a pearl vine are woven through the crown section for a luxurious, timeless finish. One of the biggest bridal trends of 2025–2026." }
              ].map((style, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-3 items-start text-left">
                  <span className="text-2xl shrink-0">{style.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-950 text-sm">{style.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tip Box */}
            <div className="bg-rose-50/50 border border-slate-200 border-l-4 border-l-rose-500 p-6 rounded-r-3xl mt-6 text-left">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Lightbulb className="text-rose-500" size={18} /> Pro Tip: The Veil & Half Up Combination
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Half up half down is one of the easiest styles to pair with a veil — simply secure the veil comb beneath the gathered crown section for a seamless finish. As the evening progresses, remove the veil and let the style shine on its own for the reception.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 5: Braided Styles */}
          <section id="braids" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Braided Wedding Hairstyles</h2>
            <p>
              Braids carry a timeless, artisanal quality that makes them especially popular for cultural, outdoor, and boho weddings. Each braid style creates a distinctly different effect — from the tight formality of a Dutch braid to the whimsical delicacy of a waterfall braid.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "French Braid", desc: "Hair is woven from the crown downward, gathering sections as it moves. A classic French braid worn as a single plait or as two framing braids is elegant, practical, and very secure — it holds up through ceremonies, receptions, and even outdoor conditions.", best: "Best for: Long hair, outdoor weddings" },
                { name: "Dutch Braid", desc: "An inverted French braid where strands cross underneath rather than over, creating a 3D raised braid that pops off the scalp. Also called the reverse French braid, it adds striking dimension and is especially stunning paired with floral or pearl pins.", best: "Best for: Boho, festival-style, destination weddings" },
                { name: "Crown Braid", desc: "Two braids — or one long braid — are wrapped around the head like a floral crown, creating a regal, goddess-like silhouette. No accessory required; the braid is the crown. Especially popular for Mehndi and garden ceremonies.", best: "Best for: All face shapes, South Asian functions" },
                { name: "Fishtail Braid", desc: "Created by weaving two sections together in alternating micro-sections, the fishtail braid creates an intricate, woven texture that looks far more complex than it is. A loose, slightly undone fishtail is one of the most romantic bridal looks available.", best: "Best for: Boho brides, beach weddings" },
                { name: "Waterfall Braid", desc: "A romantic variation where strands of hair \"fall\" through the braid rather than being incorporated, creating a cascading curtain of waves through a delicate French braid frame. It is the most whimsical and ethereal of all bridal braid styles.", best: "Best for: Romantic, fairy-tale, garden settings" }
              ].map((style, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2 text-left">
                    <h4 className="font-bold text-slate-900 text-lg">{style.name}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{style.desc}</p>
                  </div>
                  <span className="text-xs uppercase font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full w-fit mt-4 inline-block">{style.best}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 6: Length */}
          <section id="by-length" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Wedding Hairstyles by Hair Length</h2>
            <div className="space-y-4">
              {[
                { name: "Wedding Hairstyles for Long Hair", desc: "Long hair is the most versatile for bridal styling and opens up virtually every option in this guide. The most popular choices for long-haired brides include low chignons, Hollywood waves, fishtail braids, half up half down with flowing curls, French twists, and full romantic updos with cascading tendrils. For veil placement, long hair is ideal — the veil can be layered over any style without disturbing the hairstyle itself. Extensions are rarely needed, though they can add density and drama if desired." },
                { name: "Wedding Hairstyles for Medium Hair", desc: "Shoulder to mid-back length hair is perfect for French twists, sleek buns, boho half up styles, beach waves, and braided crown looks. Medium hair holds curls beautifully and responds well to both heat styling and braiding. If the hair falls between the chin and shoulder, a French twist or low chignon may require strategically placed hair extensions or padding to achieve full coverage — something to discuss at the trial appointment." },
                { name: "Wedding Hairstyles for Short Hair", desc: "Short hair brides have more options than ever. Pixie cuts can be embellished with crystal clips or a delicate floral crown for a modern, striking bridal look. Bob-length hair is perfect for defined waves, finger waves, and sleek Hollywood glamour styles. Adding a statement hair vine, tiara, or cluster of pearl pins elevates any short style to bridal status. Short hair also photographs beautifully, drawing attention directly to the face and jewellery." },
                { name: "Wedding Hairstyles for Shoulder Length Hair", desc: "Shoulder-length hair is ideal for the vast majority of bridal styles with slight modification. Half up half down, beach waves, French twists, low buns, and soft curls all work beautifully at this length. Clip-in extensions can easily extend the style to create longer looks if desired. At the trial, ask your stylist to demonstrate exactly how your length will behave on the day, including under veil weight." }
              ].map((style, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900 text-base">{style.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{style.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 7: Type */}
          <section id="by-type" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Wedding Hairstyles by Hair Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Straight Hair", desc: "Naturally straight hair is a gift for creating sleek, polished updos, glossy Hollywood waves, and glass hair looks. The challenge is holding curls, which require a strong-hold curl cream, smaller barrel size, and generous finishing spray. Straight-haired brides planning open curl styles should do a full curl longevity test at the hair trial to ensure styles hold through the entire event duration." },
                { name: "Curly Hair", desc: "Natural curls bring built-in texture, volume, and romance to wedding hair. Curly-haired brides can embrace their natural texture with defined curl styles, loose upswept coils, curly half up looks, or stretch their curls into soft waves with diffusing and stretching techniques. Avoid heavy flat ironing for the wedding day — let the natural texture shine and use a curl-defining cream to enhance definition while controlling frizz." },
                { name: "Thin Hair", desc: "Fine or thin hair benefits enormously from volume-building techniques: backcombing at the roots, volumizing sprays, padded bun forms, and the strategic use of clip-in extensions. Half up styles with volume at the crown, low buns built over a bun donut, and soft curls created with small-barrel irons all work beautifully. Avoid styles that pull hair extremely tight against the scalp, which can make thinness more visible." },
                { name: "Thick Hair", desc: "Thick hair is a bridal asset — it holds styles effortlessly, braids with beautiful density, and creates full, voluminous updos without extra products. The main consideration for thick-haired brides is weight management: heavy hair can pull styles downward over long events. Use plenty of pins and a strong-hold lacquer to ensure the style stays as beautiful at midnight as it was at the ceremony." },
                { name: "Wavy Hair", desc: "Natural waves sit beautifully between curly and straight, creating an effortless, textured look without much effort. Brides with wavy hair can enhance natural movement with a sea salt spray for beach waves, define waves with a diffuser for soft curl styles, or smooth them out with a light blow-dry and flat iron for sleeker looks. Wavy hair is particularly well suited to half up styles, boho braids, and low chignons." }
              ].map((type, idx) => (
                <div key={idx} className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2 ${idx === 4 ? "md:col-span-2" : ""}`}>
                  <h4 className="font-bold text-slate-900 text-base">{type.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 8: Face Shape Table */}
          <section id="face-shape-table" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Wedding Hairstyles by Face Shape</h2>
            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm my-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white text-sm">
                    <th className="p-4 font-bold">Face Shape</th>
                    <th className="p-4 font-bold">Flattering Features</th>
                    <th className="p-4 font-bold">Best Styles</th>
                    <th className="p-4 font-bold">Styles to Minimize</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm bg-white">
                  {[
                    { shape: "Round Face", features: "Add height and vertical length", best: "High bun, French twist, side-swept styles, voluminous crown styles", minimize: "Round buns centered on the head, blunt bobs at chin level" },
                    { shape: "Oval Face", features: "Most shapes are flattering — experiment freely", best: "All styles — crown braids, sleek buns, Hollywood waves, half up half down", minimize: "Very few restrictions; oval is the most versatile shape" },
                    { shape: "Square Face", features: "Soften the jawline with waves and curls", best: "Soft curls, side-swept waves, loose half up, romantic braids with tendrils", minimize: "Blunt, angular styles; tight buns with no face-framing" },
                    { shape: "Heart Face", features: "Balance a wider forehead with volume at the jaw", best: "Low chignon, side-parted waves, half up half down with lower volume, crown braids worn lower", minimize: "Very high topknots; heavy volume at the crown and temples" }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 !== 0 ? "bg-slate-50/50" : ""}>
                      <td className="p-4 font-bold text-slate-950">{row.shape}</td>
                      <td className="p-4 text-slate-600">{row.features}</td>
                      <td className="p-4 font-medium text-rose-500">{row.best}</td>
                      <td className="p-4 text-slate-500">{row.minimize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 9: Indian Weddings */}
          <section id="indian" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Indian Wedding Hairstyles</h2>
            <p>
              Indian weddings are among the most elaborate and visually rich celebrations in the world, and bridal hairstyles reflect that grandeur. From heavy maang tikkas to elaborate gajra traditions, Indian bridal hair is as much jewellery as it is styling.
            </p>

            <div className="my-6 rounded-3xl overflow-hidden border border-slate-200 p-2 bg-white shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1605497746444-ac9dbd50d9f8?auto=format&fit=crop&q=80&w=800" 
                alt="South Asian bridal hair look" 
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>

            <div className="space-y-4">
              {[
                { title: "Bridal Bun with Gajra", desc: "The gajra — a string of fresh jasmine flowers — is one of the most beloved and iconic elements of Indian bridal styling. Wound around a sleek or braided bun, the gajra adds fragrance, tradition, and breathtaking beauty. The look is particularly associated with South Indian and traditional North Indian ceremonies and works beautifully with both sarees and lehengas. For an authentic effect, ensure fresh jasmine is sourced on the morning of the wedding." },
                { title: "Maang Tikka Hairstyles", desc: "The maang tikka is a centrepiece hair accessory worn along the central parting of the hair, with a pendant resting on the forehead. Hairstyles worn with a maang tikka should have a clean, central part — whether the hair is left open in soft waves, gathered in a bun, or worn in a braided updo. The maang tikka should be secured firmly at the hair trial to ensure it does not slip during the ceremony." },
                { title: "Matha Patti Hairstyles", desc: "The matha patti is an elaborate forehead jewellery piece that extends from a central hair accessory to cover much of the forehead in intricate chain and stone work. It is particularly popular in Pakistani and North Indian bridal traditions. Hairstyles paired with a matha patti should be sleek and pulled back to allow the piece to be displayed fully. A high, tight bun or a pulled-back chignon are the most effective companions." },
                { title: "South Indian Bridal Hairstyles", desc: "South Indian brides traditionally wear their hair in a low bun or a long single braid adorned with jasmine (gajra), gold hair ornaments called netti chutti and rakthi chutti, and floral pins. The single long braid adorned with fresh flowers from crown to tip is a signature South Indian bridal look that is both traditional and stunningly photogenic. Modern South Indian brides also opt for structured low chignons embellished with temple jewellery." },
                { title: "North Indian Bridal Hairstyles", desc: "North Indian bridal styling tends toward more voluminous, decorated looks — high royal buns, elaborate gajra arrangements, maang tikka placements, and hair dressed with golden pins, pearls, and kundan pieces. Lehenga brides often pair their look with a high bun that accommodates both a dupatta and a maang tikka simultaneously. Loose, wavy open looks are increasingly popular for pre-wedding functions like haldi and sangeet." }
              ].map((style, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900">{style.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-600">{style.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 10: Pakistani Weddings */}
          <section id="pakistani" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Pakistani Wedding Hairstyles</h2>
            <p>
              Pakistani weddings typically span multiple events, each with its own aesthetic and dress code — and each demanding a different hairstyle. Understanding which look suits each function is essential for Pakistani brides planning a full wedding season.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Walima Hairstyles", desc: "The Walima is the post-wedding reception and is typically the most formal event for the bride. Sophisticated, polished styles work best — a sleek low bun, a structured chignon with pearl or crystal accessories, or Hollywood waves with a statement hairpiece. The Walima outfit is often a light, embellished lehenga or formal gown, so the hairstyle should complement the elegance without competing with it. Pearl pins and crystal clips are popular choices for 2026." },
                { name: "Barat Hairstyles", desc: "Barat is the main wedding ceremony and commands the most dramatic, bridal hairstyle of all functions. The traditional Pakistani bridal look for Barat centres on a high, decorated bun adorned with a matha patti or heavy maang tikka. The dupatta is typically placed over the head, framing the matha patti. Some modern brides opt for a half up style or loose waves draped with a heavily embellished dupatta, especially those wearing lighter bridal lehengas rather than traditional heavy sets." },
                { name: "Mehndi Hairstyles", desc: "Mehndi is a vibrant, joyful event where colourful outfits and playful hairstyles are celebrated. Crown braids woven with marigolds, rose petals, or artificial flowers are extremely popular. Open hair in beach waves styled with floral accessories, or a floral half up look with loose curls, perfectly matches the festive, organic energy of a Mehndi function. Keep the style relaxed and youthful — the Mehndi look should feel celebratory rather than formal." },
                { name: "Engagement Hairstyles", desc: "Pakistani engagement ceremonies range from intimate family gatherings to elaborate events that rival the Barat in scale. Medium-glamour styles work best — a low chignon with a statement hairpiece, Hollywood waves with pearl clips, or a braided half up look with floral pins. The engagement outfit is often a formal anarkali, sharara, or light lehenga, so the hairstyle should be polished but not as heavy as the Barat look. For more details on engagement-specific styling, see our related article on engagement hairstyles for brides." }
              ].map((func, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2 text-left">
                    <h4 className="font-bold text-slate-900 text-lg">{func.name}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{func.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 11: Outfit */}
          <section id="outfit" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Wedding Hairstyles by Outfit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "For Lehenga", desc: "The lehenga is the quintessential South Asian bridal outfit, and it calls for hairstyles with presence and structure. A high bridal bun with a matha patti is the classic choice. Modern brides also choose braided updos with gold pins, half up styles with heavy maang tikkas, or dramatic open waves draped with a net dupatta. The key is ensuring the hairstyle balances the visual weight of the heavy embroidery and jewellery without being overwhelmed by it." },
                { name: "For Saree", desc: "The saree is draped rather than tailored, giving the hairstyle a crucial structural role in completing the look. A low chignon at the nape of the neck — classic, clean, and deeply traditional — is the most popular pairing. South Indian brides typically choose the decorated braid. Modern saree brides are also opting for side-swept waves, high buns embellished with silk flowers, and braided updos. The bun should sit clearly above the saree pallu to avoid tangling." },
                { name: "For Gown", desc: "Western bridal gowns are paired most beautifully with Hollywood waves, romantic soft curls, elegant French twists, or sleek low chignons. The style choice depends heavily on the gown's neckline — strapless and sweetheart gowns invite updos, while off-shoulder and V-neck gowns look stunning with half up styles or flowing waves. Brides in gowns can also experiment with the structural updo styles most common in editorial bridal fashion." },
                { name: "For Anarkali", desc: "The anarkali's high, fitted bodice and long, flared silhouette creates a tall, flowing bridal line. Complement it with hairstyles that add height — a high bun, a voluminous half up with teased crown, or a structured chignon. Open hair can work for lighter anarkalis, but updos generally photograph better by maintaining the vertical flow of the garment. A statement hair accessory — maang tikka, hair vine, or crystal comb — is essential for completing the anarkali bridal look." }
              ].map((outfit, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900 text-base">{outfit.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{outfit.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 12: Trends */}
          <section id="trends" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Trending Wedding Hairstyles (2026)</h2>
            <p>
              Bridal hair in 2026 is defined by a beautiful tension between minimalism and maximalism — some brides are stripping everything back to glossy simplicity, while others are leaning into fully embellished, sculptural looks. Here are the top bridal hair trends dominating this wedding season.
            </p>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm font-semibold">
                {[
                  "Minimal Bridal Hairstyles", "Pearl Hairstyles", "Bow Hairstyles",
                  "Bubble Braid", "Textured Ponytail", "Glass Hair Look",
                  "Wet Look Bridal", "Romantic Curls", "Floral Updos",
                  "Korean-Inspired Bridal"
                ].map((trend, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-900">
                    <Check className="text-rose-500" size={14} />
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
              <hr className="border-slate-100" />
              <p className="text-sm leading-relaxed text-slate-500">
                Minimal Bridal Hairstyles continue to dominate 2026 — clean lines, low buns, and sleek chignons with no excess ornamentation appeal to modern brides who want their natural beauty to speak. Pearl hairstyles remain one of the season's biggest trends, with individual pearl pins scattered through braids, buns, and waves creating a delicate, heirloom feeling.
              </p>
              <p className="text-sm leading-relaxed text-slate-500">
                Bow hairstyles — worn as a hair bow formed from the bride's own hair rather than a ribbon accessory — are having a major fashion moment in 2026, seen on runways and increasingly on editorial bridal shoots. The bubble braid, with its segmented, voluminous appearance, adds playful dimension to wedding updos and half up styles. Glass hair — ultra-smooth, high-shine straight hair worn down — is the minimalist alternative to waves and curls, particularly popular in urban, contemporary wedding settings.
              </p>
              <p className="text-sm leading-relaxed text-slate-500">
                The wet look bridal hairstyle, achieved with styling gel or serum for a damp, sculpted appearance, is a bold editorial choice gaining mainstream traction. Korean-inspired bridal hairstyles — featuring soft, low buns with delicate face-framing pieces and minimal accessories — have been gaining significant popularity in South Asian markets, offering a beautiful fusion of Eastern and Western bridal aesthetics.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 13: Accessories */}
          <section id="accessories" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Wedding Hair Accessories</h2>
            <p>
              The right hair accessory transforms a beautiful hairstyle into an unforgettable bridal look. Choose accessories that complement rather than compete with your jewellery, and always test them at your hair trial to ensure they sit securely.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: "🌸", name: "Fresh Flowers", desc: "Jasmine, baby's breath, and small roses. Most fragrant and natural option." },
                { icon: "🌺", name: "Artificial Flowers", desc: "Silk or fabric blooms that last all day without wilting, available in any colour." },
                { icon: "🌿", name: "Hair Vines", desc: "Delicate metal vines with leaf, crystal, or pearl detailing woven through updos." },
                { icon: "📌", name: "Hair Pins", desc: "Crystal, pearl, or enamel pins scattered through styles for subtle sparkle." },
                { icon: "👑", name: "Bridal Crowns", desc: "Floral or metal crowns for boho and garden brides seeking a goddess aesthetic." },
                { icon: "🤍", name: "Pearl Clips", desc: "2026's defining bridal accessory — pearl cluster barrettes and bobby pin clusters." },
                { icon: "💎", name: "Crystal Clips", desc: "Statement crystal combs and clips for evening and reception glamour." },
                { icon: "🕊️", name: "Veils", desc: "Cathedral, chapel, elbow, and blusher lengths — the ultimate bridal accessory." },
                { icon: "✨", name: "Tiaras", desc: "From delicate single-row diamonds to full princess-style crowns for Barat looks." }
              ].map((acc, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between text-left">
                  <span className="text-xl">{acc.icon}</span>
                  <div className="mt-2">
                    <h5 className="font-bold text-slate-900 text-xs">{acc.name}</h5>
                    <p className="text-[10px] text-slate-500 leading-normal mt-1">{acc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 14: Hair Care */}
          <section id="care" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Wedding Hair Care Tips Before the Big Day</h2>
            <p>
              Beautiful bridal hair begins months before the wedding day, not the morning of. A consistent hair care routine in the weeks leading up to your wedding will make a visible, measurable difference in shine, strength, and style longevity.
            </p>

            <div className="space-y-4">
              {[
                { title: "Hair Spa Timeline", desc: "Begin professional hair spa treatments 3 months before the wedding. Schedule the final spa 2 weeks before the day — not in the last 5 days, as hair needs time to settle after treatments. A keratin treatment or deep conditioning spa restores moisture, reduces breakage, and gives hair the smooth, healthy baseline that photographs best." },
                { title: "Hair Trimming", desc: "Get a trim 6–8 weeks before the wedding to remove split ends and shape the hair. Avoid trimming in the final 2 weeks — you want maximum length for the wedding day, and freshly trimmed ends need a few weeks to blend naturally into the overall style." },
                { title: "Deep Conditioning", desc: "Use a deep conditioning mask weekly for 8–12 weeks before the wedding. Focus on mid-lengths and ends, which suffer the most damage from heat styling. Ingredients like argan oil, shea butter, and keratin will significantly improve hair health, manageability, and shine over consistent use." },
                { title: "Avoid Last-Minute Coloring", desc: "Never colour or chemically treat hair in the final 2–3 weeks before the wedding. New colour can react unexpectedly to styling products and heat. If you plan to colour your hair, do it 4–6 weeks out so the colour has time to settle to its true shade and the hair has time to recover." },
                { title: "Hair Trial Appointment", desc: "Book your hair trial 4–6 weeks before the wedding. Arrive with your accessories, headpieces, and even your dupatta if applicable. Take photos from every angle, test the style's longevity over several hours, and confirm all products being used are ones your hair responds well to." },
                { title: "Hair Extension Tips", desc: "If using extensions for the wedding, have them fitted 2–4 weeks before and wear them for several days to ensure comfort and test that they blend naturally. Confirm with your stylist whether clip-in or semi-permanent extensions are better suited to your chosen style and hair type." }
              ].map((tip, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <h4 className="font-bold text-slate-900 text-base">{tip.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 15: Mistakes */}
          <section id="mistakes" className="space-y-6 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900">Wedding Hairstyle Mistakes to Avoid</h2>
            <div className="space-y-4">
              {[
                { name: "Wrong Hair Accessories", desc: "Accessories that are too heavy for your hair type, or that clash with your jewellery in metal tone or style, are among the most common bridal hair mistakes. Always test accessories at the trial and ensure they are secured properly." },
                { name: "Ignoring Weather", desc: "Booking a humid outdoor summer ceremony with a style that cannot withstand humidity will result in frizz and wilted curls by the time you reach the altar. Always discuss the venue conditions with your stylist and plan the style accordingly." },
                { name: "Skipping Hair Trials", desc: "The most expensive mistake a bride can make is attempting a new, complex style on the wedding day without any prior practice. A trial is non-negotiable — it identifies what works, what doesn't, and how long the process takes." },
                { name: "Overusing Products", desc: "Too much hairspray, gel, or serum can leave hair looking flat, greasy, or stiff in photographs. Use a light hand with finishing products and let your stylist guide product quantities at the trial." },
                { name: "Choosing Style Over Comfort", desc: "A style that requires painful pins, constant adjustment, or restricts head movement will exhaust you over a long wedding day. Choose a style you can wear confidently and comfortably through ceremonies, photographs, and dancing." }
              ].map((mistake, idx) => (
                <div key={idx} className="bg-white border-l-4 border-l-yellow-500 p-5 rounded-r-2xl shadow-sm space-y-1 text-left">
                  <h4 className="font-bold text-slate-950 text-sm flex items-center gap-2">⚠️ {mistake.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{mistake.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 16: FAQ Accordion */}
          <section id="faq" className="space-y-8 scroll-mt-40 text-left">
            <h2 className="text-2xl font-bold text-slate-900 text-center">Wedding Hairstyle FAQs</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-150">
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : idx)} 
                      className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                    >
                      <span className="font-semibold text-slate-900 text-base sm:text-lg">{faq.q}</span>
                      <ChevronDown 
                        size={20} 
                        className={`text-rose-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}

/* =========================================================================
   ARTICLE 7: HOW TO PLAN A WEDDING TIMELINE (Standard Layout)
   ========================================================================= */
function WeddingTimelineArticle() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-slate-800">
      <header className="max-w-4xl mx-auto text-center space-y-6 mb-12">
        <div className="flex justify-center items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-500">
          <span>Planning</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
          How to Plan a Wedding Timeline: Step-by-Step Guide (2026)
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-y border-slate-100 py-4 max-w-xl mx-auto">
          <span className="flex items-center gap-1"><Calendar size={14} className="text-rose-500" /> Updated June 2026</span>
          <span className="flex items-center gap-1"><Clock size={14} className="text-rose-500" /> 7 Min Read</span>
          <span className="flex items-center gap-1"><User size={14} className="text-rose-500" /> Evera Editorial</span>
        </div>
      </header>
      
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-white p-3 rounded-[32px] shadow-sm border border-slate-200">
          <img 
            src="/How to Plan a Wedding Timeline.webp" 
            alt="Wedding Timeline" 
            className="w-full max-h-[500px] object-cover rounded-[24px]"
          />
        </div>
      </div>

      <article className="max-w-3xl mx-auto pb-24 prose prose-lg prose-headings:font-heading prose-headings:text-slate-900 prose-a:text-rose-500 hover:prose-a:text-rose-600 prose-p:text-slate-600 prose-li:text-slate-600">
      <p>Figuring out how to plan a wedding timeline is one of the first things every engaged couple needs to sort out, and it's also one of the most overwhelming. Between booking vendors, choosing a venue, and keeping family happy, it's easy to lose track of what should happen when. A clear wedding timeline solves that problem. It tells you exactly what to do each month leading up to the big day, how your wedding day itself should flow hour by hour, and when your money needs to go out the door.</p>
      
      <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900">Table of Contents</h2>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li><a href="#introduction" className="text-rose-500 hover:text-rose-600">Introduction</a></li>
        <li><a href="#main-topic" className="text-rose-500 hover:text-rose-600">The Month-by-Month Wedding Planning Timeline</a></li>
        <li><a href="#step-by-step" className="text-rose-500 hover:text-rose-600">Step-by-Step Guide</a></li>
        <li><a href="#expert-tips" className="text-rose-500 hover:text-rose-600">Expert Tips</a></li>
        <li><a href="#common-mistakes" className="text-rose-500 hover:text-rose-600">Common Mistakes</a></li>
        <li><a href="#faq" className="text-rose-500 hover:text-rose-600">Frequently Asked Questions</a></li>
        <li><a href="#conclusion" className="text-rose-500 hover:text-rose-600">Conclusion + CTA</a></li>
      </ul>

      <h2 id="introduction" className="text-3xl font-bold mt-12 mb-6 text-slate-900">Introduction</h2>
      <p>A wedding timeline is more than a to-do list. It's the framework that keeps every other part of your planning on schedule. Without one, couples tend to book vendors too late, forget deposits, or end up cramming a month's worth of decisions into a single stressful weekend. This guide breaks down everything you need: a month-by-month wedding planning timeline, a wedding day timeline, a wedding reception timeline, and a wedding budget timeline, so you have one complete system instead of four separate headaches.</p>

      <h2 id="main-topic" className="text-3xl font-bold mt-12 mb-6 text-slate-900">The Month-by-Month Wedding Planning Timeline</h2>
      <p>This is the core of how to plan a wedding timeline: breaking the engagement period into manageable phases.</p>
      <img src="/The Month-by-Month Wedding Planning Timeline.webp" alt="Month by Month Timeline" className="rounded-2xl shadow-sm border border-slate-200 my-8 w-full h-auto" />

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">12+ Months Before</h3>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li>Set your wedding date and rough budget</li>
        <li>Choose your wedding style and vision</li>
        <li>Start your guest list draft</li>
        <li>Research and book your venue</li>
        <li>Begin researching planners and photographers</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">9-11 Months Before</h3>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li>Book your photographer and videographer</li>
        <li>Choose your wedding party</li>
        <li>Start dress and suit shopping</li>
        <li>Hire a caterer if not included with your venue</li>
        <li>Reserve your officiant</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">6-8 Months Before</h3>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li>Book florist, DJ or band, and other entertainment</li>
        <li>Send save-the-dates</li>
        <li>Plan your honeymoon</li>
        <li>Begin registry setup</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">4-5 Months Before</h3>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li>Order invitations</li>
        <li>Finalize your menu and cake</li>
        <li>Book hair and makeup trials</li>
        <li>Arrange transportation</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">2-3 Months Before</h3>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li>Send invitations</li>
        <li>Finalize your wedding day timeline with vendors</li>
        <li>Apply for your marriage license</li>
        <li>Confirm accommodation blocks for out-of-town guests</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">1 Month Before</h3>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li>Finalize headcount and seating chart</li>
        <li>Confirm final payments with vendors</li>
        <li>Have your final dress or suit fitting</li>
        <li>Write vows and confirm ceremony details</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">Week Before and Day Before</h3>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li>Confirm pickup times with transportation vendors</li>
        <li>Pack for the wedding and honeymoon</li>
        <li>Rehearse the ceremony</li>
        <li>Hand off decor and signage to your coordinator</li>
      </ul>

      <h2 id="step-by-step" className="text-3xl font-bold mt-12 mb-6 text-slate-900">Step-by-Step Guide</h2>
      <p>Building your wedding day timeline is crucial. Here is a step-by-step framework to plan your actual wedding day:</p>
      <ol className="space-y-2 mb-6 list-decimal pl-5">
        <li><strong>Morning:</strong> Schedule hair, makeup, and getting-ready photos (allow 2-3 hours).</li>
        <li><strong>Pre-ceremony:</strong> Plan for a first look (optional), wedding party photos, and family photos.</li>
        <li><strong>Ceremony:</strong> Block out 20-45 minutes depending on your tradition.</li>
        <li><strong>Cocktail hour:</strong> Guests transition while the couple finishes any remaining photos.</li>
        <li><strong>Reception entrance:</strong> Coordinate the grand entrance and welcome toast.</li>
        <li><strong>Dinner service:</strong> Allocate 45-60 minutes for meal service.</li>
        <li><strong>Speeches and toasts:</strong> Keep these to 15-20 minutes total.</li>
        <li><strong>Dances:</strong> Schedule the first dance and parent dances (10-15 minutes).</li>
        <li><strong>Cake cutting:</strong> Allocate 5-10 minutes.</li>
        <li><strong>Open dancing:</strong> Leave 1.5-2 hours for guests to enjoy the dance floor.</li>
        <li><strong>Send-off:</strong> Plan a 10-15 minute grand exit.</li>
      </ol>

      <img src="/Tying Your Timeline to Your Wedding Checklist.webp" alt="Tying Your Timeline to Your Wedding Checklist" className="rounded-2xl shadow-sm border border-slate-200 my-8 w-full h-auto" />

      <h2 id="expert-tips" className="text-3xl font-bold mt-12 mb-6 text-slate-900">Expert Tips</h2>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li><strong>Add Buffer Time:</strong> The biggest mistake couples make when planning their wedding day timeline is not building in buffer time. Hair and makeup almost always run longer than expected, and photo sessions get delayed by weather or family logistics. Add 15-30 minutes of cushion between major blocks.</li>
        <li><strong>Share Early:</strong> Share the finalized timeline with every vendor at least two weeks before the wedding.</li>
        <li><strong>Work Backward:</strong> When building your reception timeline, work backward from your venue's end time.</li>
        <li><strong>Sync Budget:</strong> Map your budget against your timeline to prevent the common surprise of multiple large payments landing in the same month.</li>
      </ul>

      <h2 id="common-mistakes" className="text-3xl font-bold mt-12 mb-6 text-slate-900">Common Mistakes</h2>
      <ul className="space-y-2 mb-6 list-disc pl-5">
        <li><strong>Booking vendors out of order:</strong> Venue and photographer should be locked in before florals or entertainment.</li>
        <li><strong>Skipping buffer time:</strong> Not leaving enough time in the day-of schedule for delays.</li>
        <li><strong>Ignoring your budget timeline:</strong> Leading to multiple deposits due in the same month.</li>
        <li><strong>Not sharing the final timeline:</strong> Waiting until the last minute to communicate with vendors.</li>
        <li><strong>Treating the checklist and timeline as separate tools:</strong> Instead of one connected system.</li>
      </ul>

      <h2 id="faq" className="text-3xl font-bold mt-12 mb-6 text-slate-900">Frequently Asked Questions</h2>
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">1. What is the best wedding planning checklist timeline?</h3>
      <p>Most couples start planning 12 months before the wedding, but the right timeline depends on your guest count, venue flexibility, and vendor availability.</p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">2. Can I plan a wedding timeline for a short engagement?</h3>
      <p>Yes. For engagements under 6 months, prioritize venue and key vendor bookings first, then work through the remaining checklist tasks in parallel.</p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">3. How far in advance should I finalize my wedding day timeline?</h3>
      <p>Share your finalized wedding day and reception timeline with all vendors at least two weeks before the wedding.</p>
      
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">4. When should I send out save-the-dates?</h3>
      <p>Save-the-dates should ideally be sent 6 to 8 months before your wedding, or up to a year in advance for destination weddings.</p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">5. How much time should I allocate for hair and makeup?</h3>
      <p>Generally, allocate 45 minutes for bridesmaids and 60-90 minutes for the bride, plus 30 minutes of buffer time.</p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">6. When should the photographer arrive?</h3>
      <p>Your photographer should arrive during the last 30-45 minutes of hair and makeup to capture getting-ready shots.</p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">7. How long does a typical wedding ceremony last?</h3>
      <p>Secular ceremonies usually last 20-30 minutes, while religious ceremonies can take 45-60 minutes.</p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-slate-800">8. Do I need to feed my vendors?</h3>
      <p>Yes! Always allocate time and budget to feed any vendors working through the reception, such as your photographer, videographer, and planner.</p>

      <h2 id="conclusion" className="text-3xl font-bold mt-12 mb-6 text-slate-900">Conclusion + CTA</h2>
      <p>Knowing how to plan a wedding timeline takes the guesswork out of one of the most stressful parts of getting married. Start with the month-by-month plan, layer in your wedding day and reception timelines closer to the date, and keep your budget timeline running alongside it the whole way through.</p>
      <p>For the full task breakdown behind every stage of this timeline, explore our complete <a href="/">wedding planning checklist</a> and keep everything organized in one place!</p>
    </article>
    
    <BlogFooter />
    </div>
  );
}
