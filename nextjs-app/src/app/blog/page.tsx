import React from 'react';
import type { Metadata } from 'next';
import BlogListPage from '@/components/pages/BlogListPage';

export const metadata: Metadata = {
  title: 'Wedding Planning Blog & Guides — Wedding Planning Checklists',
  description:
    'Expert advice, detailed checklists, and timeline planning guides to help you create a stress-free wedding day.',
  alternates: {
    canonical: 'https://www.weddingplanningchecklists.org/blog',
  },
};

export default function BlogIndexPage() {
  return <BlogListPage lang="en" />;
}
