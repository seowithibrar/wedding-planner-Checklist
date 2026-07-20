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
import { IndianWeddingHairstylesArticle } from './articles/IndianWeddingHairstylesArticle';
import { WeddingTimelineArticle } from './articles/WeddingTimelineArticle';
import { WeddingHairstylesArticle } from './articles/WeddingHairstylesArticle';
import { WeddingChecklistTipsArticle } from './articles/WeddingChecklistTipsArticle';
import { MoodboardArticle } from './articles/MoodboardArticle';
import { GuestListArticle } from './articles/GuestListArticle';
import { WeddingVenueArticle } from './articles/WeddingVenueArticle';
import { BudgetTipsArticle } from './articles/BudgetTipsArticle';
import { PakistaniWeddingHairstylesArticle } from './articles/PakistaniWeddingHairstylesArticle';
import { RegionalIndianWeddingHairstylesArticle } from './articles/RegionalIndianWeddingHairstylesArticle';

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

export interface BlogPost {
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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'indian-wedding-hairstyles-guide',
    title: 'Indian Wedding Hairstyles: Complete 2026 Guide by Function & Face Shape',
    category: 'Style Guide',
    date: 'July 2026',
    readTime: '10 Min Read',
    author: 'Wedding Planning Checklists',
    excerpt: 'Plan every bridal hairstyle from haldi to reception � by face shape, hair type, and region � plus real trial timelines and cost ranges for Indian weddings.',
    image: '/images/indian-wedding-hairstyles-hero.jpg',
    layout: 'standard'
  },
  {
    id: 'pakistani-wedding-hairstyles',
    title: 'Pakistani Wedding Hairstyles Guide: 45+ Styles',
    category: 'Style Guide',
    date: 'July 2026',
    readTime: '10 Min Read',
    author: 'Wedding Planning Checklists',
    excerpt: 'Your complete guide to Pakistani wedding hairstyles. 45+ authentic styles for mehndi, baraat, and walima, organized by face shape and outfit.',
    image: '/pakistani-wedding-hairstyles.webp',
    layout: 'standard'
  },
  {
    id: 'checklists-guide',
    title: 'The Ultimate Wedding Planning Checklists Guide for a Stress-Free Wedding',
    category: 'Planning',
    date: 'June 2026',
    readTime: '10 Min Read',
    author: 'Wedding Planning Checklists',
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
    author: 'Wedding Planning Checklists',
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
    author: 'Wedding Planning Checklists',
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
    author: 'Wedding Planning Checklists',
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
    author: 'Charlotte',
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
    author: 'Charlotte',
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
    author: 'Wedding Planning Checklists',
    excerpt: 'From classic bridal buns and Hollywood waves to South Asian wedding traditions and 2026\'s hottest trends — your complete guide to choosing the perfect wedding hairstyle.',
    image: '/50-hairstyles-for-wedding.webp',
    layout: 'standard'
  },
  {
    id: 'how-to-plan-a-wedding-timeline',
    title: 'How to Plan a Wedding Timeline: A Complete Step-by-Step Guide',
    category: 'Planning',
    date: 'June 2026',
    readTime: '7 Min Read',
    author: 'Wedding Planning Checklists',
    excerpt: 'Learn how to plan a wedding timeline from engagement to wedding day, including a wedding day timeline, reception timeline, and budget timeline.',
    image: '/How to Plan a Wedding Timeline.webp',
    layout: 'standard'
  },
  {
    id: 'regional-indian-wedding-hairstyles',
    title: 'Regional Indian Wedding Hairstyles: A Complete Guide to Bridal Hair by Tradition',
    category: 'Style Guide',
    date: 'January 2025',
    readTime: '10 Min Read',
    author: 'Wedding Planning Checklists',
    excerpt: 'Explore 5 major Indian and Pakistani bridal hairstyle traditions, including North Indian buns, South Indian temple curls, and Bengali waves. Get expert styling tips.',
    image: '/regional-hero-bridal-hairstyles.png',
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
    'how-to-plan-a-wedding-timeline': 'how-to-plan-a-wedding-timeline',
    'indian-wedding-hairstyles-guide': 'indian-wedding-hairstyles-guide',
    'pakistani-wedding-hairstyles': 'pakistani-wedding-hairstyles',
    'regional-indian-wedding-hairstyles': 'regional-indian-wedding-hairstyles'
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
    'how-to-plan-a-wedding-timeline': 'how-to-plan-a-wedding-timeline',
    'indian-wedding-hairstyles-guide': 'indian-wedding-hairstyles-guide',
    'pakistani-wedding-hairstyles': 'pakistani-wedding-hairstyles',
    'regional-indian-wedding-hairstyles': 'regional-indian-wedding-hairstyles'
  };
  return mapping[normalizedSlug] || null;
};

export function Blog({ onStart, onOpenGuide, onGoHome, onAbout, onPrivacy, onTerms, onContact, onBlog }: BlogProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => {
    const path = window.location.pathname;
    const pathLower = path.toLowerCase();
    
    if (path.startsWith('/blog/')) {
      const slug = path.substring(6);
      const postId = getPostIdFromSlug(slug);
      if (postId && postId !== 'checklists-guide') {
        return postId;
      }
    } else if (pathLower.includes('hairstyles-for-wedding')) {
      return 'hairstyles-for-wedding';
    } else if (pathLower.includes('indian-wedding-hairstyles-guide')) {
      return 'indian-wedding-hairstyles-guide';
    } else if (pathLower.includes('pakistani-wedding-hairstyles')) {
      return 'pakistani-wedding-hairstyles';
    } else if (pathLower.includes('regional-indian-wedding-hairstyles')) {
      return 'regional-indian-wedding-hairstyles';
    } else if (pathLower.includes('how-to-plan-a-wedding-timeline')) {
      return 'how-to-plan-a-wedding-timeline';
    } else if (pathLower.includes('20-tips-for-your-wedding-planning-checklist')) {
      return 'wedding-planning-checklist-tips';
    }
    return null;
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const pathLower = path.toLowerCase();
      
      if (path.startsWith('/blog/')) {
        const slug = path.substring(6);
        const postId = getPostIdFromSlug(slug);
        if (postId && postId !== 'checklists-guide') {
          setSelectedPostId(postId);
        } else {
          setSelectedPostId(null);
        }
      } else if (pathLower.includes('hairstyles-for-wedding')) {
        setSelectedPostId('hairstyles-for-wedding');
      } else if (pathLower.includes('indian-wedding-hairstyles-guide')) {
        setSelectedPostId('indian-wedding-hairstyles-guide');
      } else if (pathLower.includes('pakistani-wedding-hairstyles')) {
        setSelectedPostId('pakistani-wedding-hairstyles');
      } else if (pathLower.includes('regional-indian-wedding-hairstyles')) {
        setSelectedPostId('regional-indian-wedding-hairstyles');
      } else if (pathLower.includes('how-to-plan-a-wedding-timeline')) {
        setSelectedPostId('how-to-plan-a-wedding-timeline');
      } else if (pathLower.includes('20-tips-for-your-wedding-planning-checklist')) {
        setSelectedPostId('wedding-planning-checklist-tips');
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
    let dest = '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding';
    if (postId === 'checklists-guide') dest = '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding';
    else if (postId === 'wedding-planning-checklist-tips') dest = '/blog/20-tips-for-your-wedding-planning-checklist';
    else if (postId === 'hairstyles-for-wedding') dest = '/blog/hairstyles-for-wedding';
    else if (postId === 'how-to-plan-a-wedding-timeline') dest = '/blog/how-to-plan-a-wedding-timeline';
    else if (postId === 'pakistani-wedding-hairstyles') dest = '/blog/pakistani-wedding-hairstyles';
    else if (postId === 'indian-wedding-hairstyles-guide') dest = '/blog/indian-wedding-hairstyles-guide';
    else if (postId === 'regional-indian-wedding-hairstyles') dest = '/blog/regional-indian-wedding-hairstyles';
    window.location.href = dest;
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
            {selectedPostId === 'indian-wedding-hairstyles-guide' && <IndianWeddingHairstylesArticle />}
            {selectedPostId === 'pakistani-wedding-hairstyles' && <PakistaniWeddingHairstylesArticle />}
            {selectedPostId === 'regional-indian-wedding-hairstyles' && <RegionalIndianWeddingHairstylesArticle />}
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


/* =========================================================================
   ARTICLE 2: HOW TO CHOOSE THE PERFECT WEDDING VENUE (Standard Layout)
   ========================================================================= */


/* =========================================================================
   ARTICLE 3: MASTERING YOUR GUEST LIST & SEATING CHARTS (Minimalist)
   ========================================================================= */


/* =========================================================================
   ARTICLE 4: CHIC & MODERN AESTHETIC: VISUAL MOODBOARD LAYOUT (Gallery)
   ========================================================================= */


/* =========================================================================
   ARTICLE 5: 20 TIPS FOR YOUR WEDDING PLANNING CHECKLIST (Standard Layout)
   ========================================================================= */


/* =========================================================================
   ARTICLE 6: 50+ HAIRSTYLES FOR WEDDING (Standard Layout)
   ========================================================================= */


/* =========================================================================
   ARTICLE 7: HOW TO PLAN A WEDDING TIMELINE (Standard Layout)
   ========================================================================= */


function BlogFooter() {
  return (
    <div className="max-w-4xl mx-auto pb-24 mt-12">
      <hr className="border-slate-200 mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Subscribe to our Newsletter</h3>
          <p className="text-sm text-slate-500 mb-6">Get the latest wedding tips and trends delivered straight to your inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-rose-500" />
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">Subscribe</button>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=150" alt="Author" className="w-20 h-20 rounded-full object-cover shadow-sm" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">Wedding Planning Checklists</h3>
            <p className="text-sm text-slate-500 mt-1">Passionate about helping couples plan their dream weddings with zero stress and maximum joy.</p>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/20-tips-for-your-wedding-planning-checklist.html" className="block group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="h-32 bg-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800" alt="20 Tips" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-500 transition-colors line-clamp-2">20 Tips for Your Wedding Planning Checklist</h4>
            <p className="text-xs text-slate-500 mt-2">8 Min Read</p>
          </div>
        </a>
        <a href="/how-to-plan-a-wedding-timeline.html" className="block group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="h-32 bg-slate-100 overflow-hidden">
            <img src="/How to Plan a Wedding Timeline.webp" alt="Wedding Timeline" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-500 transition-colors line-clamp-2">How to Plan a Wedding Timeline</h4>
            <p className="text-xs text-slate-500 mt-2">7 Min Read</p>
          </div>
        </a>
        <a href="/hairstyles-for-wedding.html" className="block group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="h-32 bg-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1591555200577-059798e70a6c?auto=format&fit=crop&q=80&w=800" alt="Hairstyles" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-500 transition-colors line-clamp-2">50+ Hairstyles for Wedding</h4>
            <p className="text-xs text-slate-500 mt-2">9 Min Read</p>
          </div>
        </a>
      </div>
    </div>
  );
}





