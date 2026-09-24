import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import toolRegistry from '@/data/tool-registry.json';
import { generateBreadcrumbSchema, generateWebApplicationSchema } from '@/lib/schema';
import { useTranslations, localizeUrl, SITE_URL } from '@/i18n/utils';
import { DEFAULT_LANGUAGE, type SupportedLanguage } from '@/i18n/config';

import { BudgetCalculator } from '../tools/BudgetCalculator';
import { TimelineGenerator } from '../tools/TimelineGenerator';
import { GuestListManager } from '../tools/GuestListManager';
import { ChecklistGenerator } from '../tools/ChecklistGenerator';
import { PlanningTimeline } from '../tools/PlanningTimeline';
import { PlanningCalendar } from '../tools/PlanningCalendar';
import { WeddingCountdown } from '../tools/WeddingCountdown';
import { PlanningDashboard } from '../tools/PlanningDashboard';

export interface ToolPageProps {
  toolId: string;
  lang?: string;
}

export default function ToolPage({ toolId, lang = DEFAULT_LANGUAGE }: ToolPageProps) {
  const currentLang = (lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const { common, tools } = useTranslations(currentLang);

  const baseTool = toolRegistry.tools.find(t => t.id === toolId) || toolRegistry.tools[0];
  const localizedTool = ((tools as any).tools as any)?.[toolId] || baseTool;

  const title = localizedTool.title || baseTool.title;
  const description = localizedTool.description || baseTool.description;
  const category = localizedTool.category || baseTool.category;
  const intro = localizedTool.intro || description;

  const canonicalUrl =
    currentLang === DEFAULT_LANGUAGE
      ? `${SITE_URL}/tools/${toolId}`
      : `${SITE_URL}/${currentLang}/tools/${toolId}`;

  const breadcrumbItems = [
    { name: common.nav.home, item: localizeUrl('/', currentLang) },
    { name: common.footer.suiteTitle, item: localizeUrl('/tools/wedding-planning-dashboard', currentLang) },
    { name: title, item: canonicalUrl },
  ];

  const schema = `[${[
    generateWebApplicationSchema({ name: title, description, url: canonicalUrl }),
    generateBreadcrumbSchema(breadcrumbItems),
  ]
    .filter(Boolean)
    .join(',')}]`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

      <Header lang={currentLang} />

      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Breadcrumbs */}
        <nav className="max-w-4xl mx-auto mb-8" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            {breadcrumbItems.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <span aria-hidden="true" className="rtl-flip">/</span>}
                {idx === breadcrumbItems.length - 1 ? (
                  <span className="font-semibold text-[#B76E79]">{crumb.name}</span>
                ) : (
                  <a href={crumb.item} className="hover:text-[#B76E79] transition-colors">
                    {crumb.name}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Tool Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <span className="text-xs font-bold text-[#B76E79] uppercase tracking-wider bg-[#FCECF0] px-3 py-1 rounded-full">
            {category} • {common.ui.freePlanningTool}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight">{title}</h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {currentLang !== DEFAULT_LANGUAGE && (
            <div className="inline-flex items-center gap-2 bg-white border border-[#F3E8EA] px-4 py-1.5 rounded-full text-xs text-slate-600 shadow-sm mt-2">
              <span>🌐</span>
              <span>{common.ui.translationNotice}</span>
            </div>
          )}
        </div>

        {/* SEO Intro Copy */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 text-center text-slate-600 text-xs sm:text-sm leading-relaxed">
          {intro}
        </div>

        {/* Dynamic Interactive Tool Component Mount */}
        <div className="mt-4">
          {toolId === 'budget-calculator' && <BudgetCalculator lang={currentLang} />}
          {toolId === 'timeline-generator' && <TimelineGenerator lang={currentLang} />}
          {toolId === 'guest-list-manager' && <GuestListManager lang={currentLang} />}
          {(toolId === 'wedding-checklist-generator' || toolId === 'checklist-generator') && (
            <ChecklistGenerator lang={currentLang} />
          )}
          {(toolId === 'wedding-planning-timeline' || toolId === 'planning-timeline') && (
            <PlanningTimeline lang={currentLang} />
          )}
          {(toolId === 'wedding-planning-calendar' || toolId === 'planning-calendar') && (
            <PlanningCalendar lang={currentLang} />
          )}
          {toolId === 'wedding-countdown' && <WeddingCountdown lang={currentLang} />}
          {(toolId === 'wedding-planning-dashboard' || toolId === 'planning-dashboard') && (
            <PlanningDashboard lang={currentLang} />
          )}
        </div>
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
