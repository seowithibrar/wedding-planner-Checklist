import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ToolPage from '@/components/pages/ToolPage';
import toolRegistry from '@/data/tool-registry.json';
import { SITE_URL } from '@/i18n/utils';
import { DEFAULT_LANGUAGE } from '@/i18n/config';

import BudgetCalculatorPage, { seo as budgetSeo } from '@/components/pages/tools/BudgetCalculatorPage';
import TimelineGeneratorPage, { seo as timelineSeo } from '@/components/pages/tools/TimelineGeneratorPage';
import GuestListManagerPage, { seo as guestListSeo } from '@/components/pages/tools/GuestListManagerPage';
import WeddingChecklistGeneratorPage, { seo as checklistGenSeo } from '@/components/pages/tools/WeddingChecklistGeneratorPage';
import WeddingCountdownPage, { seo as countdownSeo } from '@/components/pages/tools/WeddingCountdownPage';
import WeddingPlanningCalendarPage, { seo as calendarSeo } from '@/components/pages/tools/WeddingPlanningCalendarPage';
import WeddingPlanningDashboardPage, { seo as dashboardSeo } from '@/components/pages/tools/WeddingPlanningDashboardPage';
import WeddingPlanningTimelinePage, { seo as timelineToolSeo } from '@/components/pages/tools/WeddingPlanningTimelinePage';

interface Props {
  params: Promise<{
    tool: string;
  }>;
}

export async function generateStaticParams() {
  return toolRegistry.tools.map(tool => ({
    tool: tool.id,
  }));
}

const toolSeoMap: Record<string, { title: string; description: string; canonical: string }> = {
  'budget-calculator': budgetSeo,
  'timeline-generator': timelineSeo,
  'guest-list-manager': guestListSeo,
  'wedding-checklist-generator': checklistGenSeo,
  'wedding-countdown': countdownSeo,
  'wedding-planning-calendar': calendarSeo,
  'wedding-planning-dashboard': dashboardSeo,
  'wedding-planning-timeline': timelineToolSeo,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool } = await params;
  const toolSeo = toolSeoMap[tool];

  if (toolSeo) {
    return {
      title: toolSeo.title,
      description: toolSeo.description,
      alternates: {
        canonical: toolSeo.canonical,
      },
      openGraph: {
        title: toolSeo.title,
        description: toolSeo.description,
        url: toolSeo.canonical,
      },
    };
  }

  const toolItem = toolRegistry.tools.find(t => t.id === tool);
  if (!toolItem) return {};

  const title = `${toolItem.title} (2026)`;
  const canonicalUrl = `${SITE_URL}/tools/${tool}`;

  return {
    title,
    description: toolItem.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: toolItem.description,
      url: canonicalUrl,
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { tool } = await params;

  if (tool === 'budget-calculator') return <BudgetCalculatorPage />;
  if (tool === 'timeline-generator') return <TimelineGeneratorPage />;
  if (tool === 'guest-list-manager') return <GuestListManagerPage />;
  if (tool === 'wedding-checklist-generator') return <WeddingChecklistGeneratorPage />;
  if (tool === 'wedding-countdown') return <WeddingCountdownPage />;
  if (tool === 'wedding-planning-calendar') return <WeddingPlanningCalendarPage />;
  if (tool === 'wedding-planning-dashboard') return <WeddingPlanningDashboardPage />;
  if (tool === 'wedding-planning-timeline') return <WeddingPlanningTimelinePage />;

  const toolItem = toolRegistry.tools.find(t => t.id === tool);
  if (!toolItem) {
    notFound();
  }

  return <ToolPage toolId={tool} lang={DEFAULT_LANGUAGE} />;
}
