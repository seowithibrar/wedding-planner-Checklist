import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Wedding Planning Checklists',
  description:
    'Privacy Policy for WeddingPlanningChecklists.org regarding data collection, cookies, and privacy rights.',
  alternates: {
    canonical: 'https://www.weddingplanningchecklists.org/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700">
        <h1 className="text-4xl font-bold text-[#1A1A1A]">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
        <div className="prose max-w-none space-y-4">
          <p>
            Your privacy is important to us. WeddingPlanningChecklists.org does not sell or rent personal
            information to third parties.
          </p>
          <h2 className="text-xl font-bold text-[#1A1A1A]">Information We Collect</h2>
          <p>
            We collect minimal analytical information to improve user experience and deliver requested
            digital tools.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
