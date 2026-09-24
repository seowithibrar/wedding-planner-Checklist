import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found (404) — Wedding Planning Checklists',
  description:
    "The page you're looking for doesn't exist or has moved. Explore our wedding planning checklists, timeline guides, and free interactive tools.",
  robots: {
    index: false,
    follow: true,
  },
};

const popularGuides = [
  {
    title: 'How to Plan a Wedding Timeline',
    category: 'Featured Guide',
    desc: 'Professional 6-phase framework for stress-free wedding planning from 18 months to day-of.',
    href: '/blog/how-to-plan-a-wedding-timeline',
    icon: '📅',
  },
  {
    title: 'Wedding Budget Calculator',
    category: 'Interactive Tool',
    desc: 'Real-time budget allocation across venue, catering, photography, attire, and buffer.',
    href: '/tools/budget-calculator',
    icon: '💰',
  },
  {
    title: 'Day-of Timeline Generator',
    category: 'Interactive Tool',
    desc: 'Generate a customized hour-by-hour schedule based on your ceremony start time.',
    href: '/tools/timeline-generator',
    icon: '⏰',
  },
  {
    title: 'Guest List Manager',
    category: 'Interactive Tool',
    desc: 'Track RSVPs, meal preferences, plus-ones, and seating arrangements in one place.',
    href: '/tools/guest-list-manager',
    icon: '👥',
  },
  {
    title: '12-Month Wedding Checklist',
    category: 'Popular Checklist',
    desc: 'The golden standard month-by-month timeline for planning your wedding 1 year in advance.',
    href: '/checklists/12-month-wedding-planning-checklist',
    icon: '📋',
  },
  {
    title: 'Wedding Planning Dashboard',
    category: 'Central Hub',
    desc: 'All-in-one planning suite with live progress, countdown, and tool shortcuts.',
    href: '/tools/wedding-planning-dashboard',
    icon: '✨',
  },
];

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#FCECF0] text-[#B76E79] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>⚠️</span>
            <span>Error 404 • Page Not Found</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A1A] tracking-tight leading-tight">
            Lost in the <span className="text-[#B76E79]">Planning</span> Details?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The page you are looking for might have been moved, renamed, or doesn't exist. Don't worry — all our wedding planning checklists, tools, and guides are right here to get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/"
              className="bg-[#B76E79] hover:bg-[#a25d66] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Return to Homepage
            </Link>
            <Link
              href="/sitemap"
              className="bg-white hover:bg-slate-50 text-[#1A1A1A] border border-slate-200 px-8 py-3.5 rounded-full text-sm font-bold shadow-sm transition-all"
            >
              Browse Visual Sitemap
            </Link>
          </div>
        </div>

        {/* Popular Resources Grid */}
        <div className="mt-20 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Helpful Shortcuts</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">Popular Planning Resources</h2>
            <p className="text-sm text-slate-500">Jump directly to our most frequently used checklists and tools.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="bg-white rounded-3xl p-6 border border-[#F3E8EA] shadow-sm hover:shadow-md hover:border-[#B76E79]/40 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{guide.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E79] bg-[#FCECF0] px-2.5 py-0.5 rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#1A1A1A] group-hover:text-[#B76E79] transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{guide.desc}</p>
                </div>
                <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#B76E79] border-t border-slate-50 mt-4">
                  <span>Open Guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Need Help Notice */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-[#F3E8EA] shadow-sm text-center max-w-xl mx-auto space-y-3">
          <h3 className="font-bold text-base text-[#1A1A1A]">Looking for a specific checklist?</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            If you followed a link from an external website or email, please feel free to reach out to our team so we can help you find what you need.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="text-xs font-bold text-[#B76E79] hover:underline">
              Contact Editorial Team →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
