import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Contact Us — Wedding Planning Checklists',
  description:
    'Get in touch with the Wedding Planning Checklists team for inquiries, guide suggestions, or media features.',
  alternates: {
    canonical: 'https://www.weddingplanningchecklists.org/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1A1A1A]">Contact Us</h1>
          <p className="text-slate-600 text-sm">
            Have questions, feedback, or partnership ideas? Send us a message below.
          </p>
        </div>

        <form className="bg-white p-8 rounded-3xl border border-[#F3E8EA] shadow-sm space-y-6 max-w-xl mx-auto">
          <div>
            <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Your Email</label>
            <input
              type="email"
              placeholder="jane@example.com"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#B76E79] mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="How can we help you?"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:border-[#B76E79] text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1A1A1A] hover:bg-[#B76E79] text-white p-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
