import React from 'react';
import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { DEFAULT_LANGUAGE } from '@/i18n/config';

export const metadata: Metadata = {
  title: 'Wedding Planning Checklist, Timelines & Free Tools',
  description:
    'Free wedding planning checklist, step-by-step guide, budget calculator & 14 planning tools. Timelines for every stage, incl. Pakistani & Indian weddings.',
  alternates: {
    canonical: 'https://www.weddingplanningchecklists.org/',
  },
  openGraph: {
    title: 'Wedding Planning Checklist & Free Wedding Planning Tools',
    description:
      'Plan your wedding step by step with a free checklist, budget calculator, timelines, and 14 interactive tools — including Pakistani and Indian wedding checklists.',
    url: 'https://www.weddingplanningchecklists.org/',
    images: [{ url: 'https://www.weddingplanningchecklists.org/wedding-planning-checklist-hero.jpg' }],
  },
};

export default function RootHomePage() {
  return <HomePage lang={DEFAULT_LANGUAGE} />;
}
