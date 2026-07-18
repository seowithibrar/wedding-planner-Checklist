/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  CheckSquare, 
  Users, 
  Store, 
  LayoutDashboard, 
  Menu, 
  X,
  Heart,
  Calendar,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dashboard } from './components/Dashboard';
import { Tasks } from './components/Tasks';
import { CalendarView } from './components/CalendarView';
import { Budget } from './components/Budget';
import { Guests } from './components/Guests';
import { Vendors } from './components/Vendors';
import { cn } from './lib/utils';

// Global Types
export type Priority = 'low' | 'medium' | 'high';
export type GuestStatus = 'confirmed' | 'pending' | 'declined';

export interface Task {
  id: number;
  title: string;
  category: string;
  due: string;
  completed: boolean;
  priority: Priority;
}

export interface BudgetCategory {
  id: number;
  name: string;
  allocated: number;
  spent: number;
}

export interface Guest {
  id: number;
  name: string;
  phone: string;
  status: GuestStatus;
  meal: string;
  plusOne: boolean;
}

export interface Vendor {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  icon: string;
  location: string;
  booked: boolean;
  images: string[];
  phone?: string;
  email?: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Set wedding date', category: 'Planning', due: '2026-01-15', completed: true, priority: 'high' },
  { id: 2, title: 'Book venue', category: 'Venue', due: '2026-03-01', completed: true, priority: 'high' },
  { id: 3, title: 'Hire photographer', category: 'Vendors', due: '2026-04-15', completed: false, priority: 'high' },
  { id: 4, title: 'Order wedding dress', category: 'Attire', due: '2026-06-01', completed: false, priority: 'medium' },
  { id: 5, title: 'Create guest list', category: 'Guests', due: '2026-05-01', completed: false, priority: 'high' },
  { id: 6, title: 'Book catering', category: 'Catering', due: '2026-07-01', completed: false, priority: 'medium' },
  { id: 7, title: 'Design invitations', category: 'Decor', due: '2026-08-01', completed: false, priority: 'low' },
  { id: 8, title: 'Book DJ/Band', category: 'Music', due: '2026-09-01', completed: false, priority: 'medium' }
];

const INITIAL_BUDGET = {
  total: 2500000,
  categories: [
    { id: 1, name: 'Venue', allocated: 800000, spent: 750000 },
    { id: 2, name: 'Catering', allocated: 600000, spent: 0 },
    { id: 3, name: 'Photography', allocated: 300000, spent: 250000 },
    { id: 4, name: 'Attire', allocated: 250000, spent: 0 },
    { id: 5, name: 'Decor & Flowers', allocated: 200000, spent: 50000 },
    { id: 6, name: 'Music/DJ', allocated: 150000, spent: 0 },
    { id: 7, name: 'Miscellaneous', allocated: 200000, spent: 30000 }
  ]
};

const INITIAL_GUESTS: Guest[] = [
  { id: 1, name: 'John Smith', phone: '+1 555-0101', status: 'confirmed', meal: 'Vegetarian', plusOne: false },
  { id: 2, name: 'Emily Johnson', phone: '+1 555-0102', status: 'pending', meal: 'Vegan', plusOne: true },
  { id: 3, name: 'Michael Brown', phone: '+1 555-0103', status: 'declined', meal: 'None', plusOne: false },
  { id: 4, name: 'Sarah Davis', phone: '+1 555-0104', status: 'confirmed', meal: 'Gluten-Free', plusOne: true }
];

const INITIAL_VENDORS: Vendor[] = [
  { 
    id: 1, 
    name: 'Grand Palace Hotel', 
    category: 'Venue', 
    price: '₨1,000,000 - ₨2,500,000', 
    rating: 4.9, 
    icon: '🏛️', 
    location: 'Lahore', 
    booked: true, 
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800'
    ], 
    phone: '+92 42 111 222 333', 
    email: 'info@grandpalace.com' 
  },
  { 
    id: 2, 
    name: 'Royal Catering Services', 
    category: 'Catering', 
    price: '₨1,500 - ₨3,500 per head', 
    rating: 4.7, 
    icon: '🍽️', 
    location: 'Lahore', 
    booked: false, 
    images: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800'
    ], 
    phone: '+92 300 1234567', 
    email: 'sales@royalcatering.com' 
  },
  { 
    id: 3, 
    name: 'Lumina Photography', 
    category: 'Photography', 
    price: '₨150,000 - ₨500,000', 
    rating: 5.0, 
    icon: '📸', 
    location: 'Karachi', 
    booked: true, 
    images: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800'
    ], 
    phone: '+92 321 8889990', 
    email: 'hello@luminaphoto.com' 
  },
  { 
    id: 4, 
    name: 'Floral Fantasy', 
    category: 'Decor', 
    price: '₨100,000 - ₨800,000', 
    rating: 4.6, 
    icon: '🌸', 
    location: 'Islamabad', 
    booked: false, 
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522673607200-164881eeca48?auto=format&fit=crop&q=80&w=800'
    ], 
    phone: '+92 333 5556667', 
    email: 'design@floralfantasy.pk' 
  }
];

import { LandingPage } from './components/LandingPage';
import { Guide } from './components/Guide';
import { About } from './components/About';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Modal } from './components/ui/Modal';
import { CURRENCY_SYMBOLS } from './lib/constants';

type Tab = 'home' | 'about' | 'privacy' | 'terms' | 'blog' | 'contact' | 'guide' | 'dashboard' | 'tasks' | 'budget' | 'guests' | 'vendors' | 'calendar';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const path = window.location.pathname;
    const pathLower = path.toLowerCase().replace(/\/$/, '');
    if (path === '/about-us') return 'about';
    if (path === '/privacy-policy') return 'privacy';
    if (pathLower === '/guide' || pathLower === '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding' || pathLower === '/wedding-planning-checklists.html' || pathLower === '/wedding-planning-checklists') return 'guide';
    if (path.startsWith('/blog') || pathLower.includes('hairstyles') || pathLower.includes('timeline') || pathLower.includes('tips')) return 'blog';
    if (path === '/' || path === '') return 'home';
    const cleanPath = path.replace('/', '') as Tab;
    const validTabs: Tab[] = ['home', 'about', 'privacy', 'terms', 'blog', 'contact', 'guide', 'dashboard', 'tasks', 'budget', 'guests', 'vendors', 'calendar'];
    return validTabs.includes(cleanPath) ? cleanPath : 'home';
  });

  useEffect(() => {
    let path = '/';
    if (activeTab === 'about') path = '/about-us';
    else if (activeTab === 'privacy') path = '/privacy-policy';
    else if (activeTab === 'terms') path = '/terms-of-service';
    else if (activeTab === 'blog') {
      if (window.location.pathname.startsWith('/blog/')) {
        return;
      }
      path = '/blog';
    }
    else if (activeTab === 'contact') path = '/contact';
    else if (activeTab === 'guide') path = '/blog/The-Ultimate-Wedding-Planning-Checklists-Guide-for-a-Stress-Free-Wedding';
    else if (activeTab !== 'home') path = `/${activeTab}`;
    
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const pathLower = path.toLowerCase().replace(/\/$/, '');
      if (path === '/about-us') setActiveTab('about');
      else if (path === '/privacy-policy') setActiveTab('privacy');
      else if (path === '/terms-of-service') setActiveTab('terms');
      else if (pathLower === '/guide' || pathLower === '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding' || pathLower === '/wedding-planning-checklists.html' || pathLower === '/wedding-planning-checklists') setActiveTab('guide');
      else if (path.startsWith('/blog') || pathLower.includes('hairstyles') || pathLower.includes('timeline') || pathLower.includes('tips')) setActiveTab('blog');
      else if (path === '/contact') setActiveTab('contact');
      else if (path === '/' || path === '') setActiveTab('home');
      else {
        const cleanPath = path.replace('/', '') as Tab;
        const validTabs: Tab[] = ['home', 'about', 'privacy', 'terms', 'blog', 'contact', 'guide', 'dashboard', 'tasks', 'budget', 'guests', 'vendors', 'calendar'];
        setActiveTab(validTabs.includes(cleanPath) ? cleanPath : 'home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State for globals
  const [couple, setCouple] = useState({ 
    partner1: 'Zain', 
    partner2: 'Sarah',
    contactPerson: 'Zain',
    contactNumber: '+92 300 1234567',
    weddingDate: '2026-10-12'
  });
  const [currency, setCurrency] = useState('PKR');

  // State for all domain data
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);

  // Temp state for settings form
  const [settingsForm, setSettingsForm] = useState({ ...couple, currency, totalBudget: budget.total });

  const daysToWedding = Math.ceil((new Date(couple.weddingDate || '2026-10-12').getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const formattedWeddingDate = new Date(couple.weddingDate || '2026-10-12').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openSettings = () => {
    setSettingsForm({ ...couple, currency, totalBudget: budget.total });
    setIsSettingsOpen(true);
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouple({ 
      partner1: settingsForm.partner1, 
      partner2: settingsForm.partner2,
      contactPerson: settingsForm.contactPerson,
      contactNumber: settingsForm.contactNumber,
      weddingDate: settingsForm.weddingDate
    });
    setCurrency(settingsForm.currency);
    setBudget(prev => ({ ...prev, total: settingsForm.totalBudget }));
    setIsSettingsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'guide', label: 'Guide', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Checklist', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'budget', label: 'Budget', icon: BarChart3 },
    { id: 'guests', label: 'Guests', icon: Users },
    { id: 'vendors', label: 'Vendors', icon: Store },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage onStart={() => setActiveTab('dashboard')} onOpenGuide={() => setActiveTab('guide')} onGoHome={() => setActiveTab('home')} onAbout={() => setActiveTab('about')} onPrivacy={() => setActiveTab('privacy')} onTerms={() => setActiveTab('terms')} onBlog={() => setActiveTab('blog')} onContact={() => setActiveTab('contact')} couple={couple} />;
      case 'guide':
        return <Guide onStart={() => setActiveTab('dashboard')} onOpenGuide={() => setActiveTab('guide')} onGoHome={() => setActiveTab('home')} onAbout={() => setActiveTab('about')} onPrivacy={() => setActiveTab('privacy')} onTerms={() => setActiveTab('terms')} onBlog={() => setActiveTab('blog')} onContact={() => setActiveTab('contact')} />;
      case 'about':
        return <About onStart={() => setActiveTab('dashboard')} onOpenGuide={() => setActiveTab('guide')} onGoHome={() => setActiveTab('home')} onAbout={() => setActiveTab('about')} onPrivacy={() => setActiveTab('privacy')} onTerms={() => setActiveTab('terms')} onBlog={() => setActiveTab('blog')} onContact={() => setActiveTab('contact')} />;
      case 'privacy':
        return <PrivacyPolicy onStart={() => setActiveTab('dashboard')} onOpenGuide={() => setActiveTab('guide')} onGoHome={() => setActiveTab('home')} onAbout={() => setActiveTab('about')} onPrivacy={() => setActiveTab('privacy')} onTerms={() => setActiveTab('terms')} onBlog={() => setActiveTab('blog')} onContact={() => setActiveTab('contact')} />;
      case 'terms':
        return <TermsOfService onStart={() => setActiveTab('dashboard')} onOpenGuide={() => setActiveTab('guide')} onGoHome={() => setActiveTab('home')} onAbout={() => setActiveTab('about')} onPrivacy={() => setActiveTab('privacy')} onTerms={() => setActiveTab('terms')} onBlog={() => setActiveTab('blog')} onContact={() => setActiveTab('contact')} />;
      case 'blog':
        return <Blog onStart={() => setActiveTab('dashboard')} onOpenGuide={() => setActiveTab('guide')} onGoHome={() => setActiveTab('home')} onAbout={() => setActiveTab('about')} onPrivacy={() => setActiveTab('privacy')} onTerms={() => setActiveTab('terms')} onBlog={() => setActiveTab('blog')} onContact={() => setActiveTab('contact')} />;
      case 'contact':
        return <Contact onStart={() => setActiveTab('dashboard')} onOpenGuide={() => setActiveTab('guide')} onGoHome={() => setActiveTab('home')} onAbout={() => setActiveTab('about')} onPrivacy={() => setActiveTab('privacy')} onTerms={() => setActiveTab('terms')} onBlog={() => setActiveTab('blog')} onContact={() => setActiveTab('contact')} />;
      case 'dashboard':
        return (
          <Dashboard 
            tasks={tasks} 
            setTasks={setTasks}
            budget={budget} 
            guests={guests} 
            couple={couple} 
            currency={currency}
            onOpenSettings={openSettings} 
            onTabChange={setActiveTab}
          />
        );
      case 'tasks':
        return <Tasks tasks={tasks} setTasks={setTasks} />;
      case 'calendar':
        return <CalendarView tasks={tasks} />;
      case 'budget':
        return <Budget budget={budget} setBudget={setBudget} currency={currency} />;
      case 'guests':
        return <Guests guests={guests} setGuests={setGuests} />;
      case 'vendors':
        return <Vendors vendors={vendors} setVendors={setVendors} currency={currency} />;
      default:
        return (
          <Dashboard 
            tasks={tasks} 
            setTasks={setTasks}
            budget={budget} 
            guests={guests} 
            couple={couple} 
            currency={currency}
            onOpenSettings={openSettings} 
            onTabChange={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {activeTab !== 'home' && activeTab !== 'guide' && activeTab !== 'about' && activeTab !== 'privacy' && activeTab !== 'terms' && activeTab !== 'blog' && activeTab !== 'contact' && (
        <aside className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transition-transform duration-300 transform lg:sticky lg:top-0 lg:h-screen",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full flex flex-col">
            <div className="p-6 flex items-center cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <img src="/logo.png" alt="Wedding Planning Checklists" className="h-10 w-auto object-contain" />
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    activeTab === item.id 
                      ? "bg-rose-50 text-rose-600 shadow-sm shadow-rose-100" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    activeTab === item.id ? "text-rose-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="active-pill"
                      className="ml-auto w-1.5 h-1.5 bg-rose-500 rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="p-4 mt-auto">
              <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-rose-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Countdown</span>
                </div>
                <p className="text-2xl font-bold mb-1">{daysToWedding > 0 ? daysToWedding : 0} Days</p>
                <p className="text-[10px] text-slate-400">to the Big Day • {formattedWeddingDate}</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {activeTab !== 'home' && activeTab !== 'guide' && activeTab !== 'about' && activeTab !== 'privacy' && activeTab !== 'terms' && activeTab !== 'blog' && activeTab !== 'contact' && (
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
            <button 
              onClick={toggleSidebar}
              className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-semibold">{couple.partner1} & {couple.partner2}</span>
                <span className="text-[10px] text-slate-400 font-medium">Lahore, PK</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=150" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>
        )}

        <div className={cn(
          "p-0 w-full",
          activeTab !== 'home' && activeTab !== 'guide' && activeTab !== 'about' && activeTab !== 'privacy' && activeTab !== 'terms' && activeTab !== 'blog' && activeTab !== 'contact' && "p-4 sm:p-8"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Settings Modal */}
      <Modal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        title="Wedding Settings"
      >
        <form onSubmit={handleSettingsSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Partner 1</label>
              <input
                type="text"
                required
                value={settingsForm.partner1}
                onChange={e => setSettingsForm({ ...settingsForm, partner1: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Partner 2</label>
              <input
                type="text"
                required
                value={settingsForm.partner2}
                onChange={e => setSettingsForm({ ...settingsForm, partner2: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Primary Contact</label>
              <select
                value={settingsForm.contactPerson}
                onChange={e => setSettingsForm({ ...settingsForm, contactPerson: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
              >
                <option value={settingsForm.partner1}>{settingsForm.partner1}</option>
                <option value={settingsForm.partner2}>{settingsForm.partner2}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Contact Phone</label>
              <input
                type="tel"
                required
                value={settingsForm.contactNumber}
                onChange={e => setSettingsForm({ ...settingsForm, contactNumber: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Wedding Date</label>
            <input
              type="date"
              required
              value={settingsForm.weddingDate}
              onChange={e => setSettingsForm({ ...settingsForm, weddingDate: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Total Budget</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{CURRENCY_SYMBOLS[settingsForm.currency] || '₨'}</span>
              <input
                type="number"
                required
                value={settingsForm.totalBudget}
                onChange={e => setSettingsForm({ ...settingsForm, totalBudget: Number(e.target.value) })}
                className="w-full pl-10 pr-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Preferred Currency</label>
            <select
              value={settingsForm.currency}
              onChange={e => setSettingsForm({ ...settingsForm, currency: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all appearance-none"
            >
              {Object.keys(CURRENCY_SYMBOLS).map(code => (
                <option key={code} value={code}>
                  {code} ({CURRENCY_SYMBOLS[code]})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

