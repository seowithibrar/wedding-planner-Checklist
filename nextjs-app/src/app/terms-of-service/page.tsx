import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — Wedding Planning Checklists',
  description:
    'Terms of Service for using WeddingPlanningChecklists.org guides and planning tools.',
  alternates: {
    canonical: 'https://www.weddingplanningchecklists.org/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />

      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700">
        <h1 className="text-4xl font-bold text-[#1A1A1A]">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
        <div className="prose max-w-none space-y-4">
          <p>
            By accessing WeddingPlanningChecklists.org, you agree to comply with our usage guidelines and
            copyright terms.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
