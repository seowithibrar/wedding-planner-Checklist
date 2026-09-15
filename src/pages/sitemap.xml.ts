import type { APIRoute } from 'astro';
import { NON_DEFAULT_LANGUAGES, SUPPORTED_LANGUAGES } from '../i18n/config';

interface SitemapEntry {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod: string;
}

const siteUrl = 'https://www.weddingplanningchecklists.org';
const lastmod = '2026-09-06';

const entries: SitemapEntry[] = [
  // CORE PAGES
  { path: '', changefreq: 'weekly', priority: '1.0', lastmod },
  { path: '/blog', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/sitemap', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/about-us', changefreq: 'monthly', priority: '0.5', lastmod },
  { path: '/contact', changefreq: 'monthly', priority: '0.5', lastmod },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3', lastmod },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3', lastmod },

  // INTERACTIVE PLANNING TOOLS
  { path: '/tools/budget-calculator', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/tools/timeline-generator', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/tools/guest-list-manager', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/tools/wedding-checklist-generator', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/tools/wedding-planning-timeline', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/tools/wedding-task-generator', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/wedding-milestone-tracker', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/wedding-planning-calendar', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/daily-wedding-planner', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/weekly-wedding-planner', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/monthly-wedding-planner', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/wedding-countdown', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/wedding-progress-tracker', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/tools/wedding-planning-dashboard', changefreq: 'weekly', priority: '0.9', lastmod },

  // WEDDING PLANNING CHECKLISTS
  { path: '/checklists/12-month-wedding-planning-checklist', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/checklists/18-month-wedding-planning-checklist', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/checklists/6-month-wedding-planning-checklist', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/checklists/3-month-wedding-planning-checklist', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/checklists/wedding-budget-calculator-10k', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-budget-calculator-20k', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-budget-calculator-30k', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-budget-calculator-50k', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/pakistani-wedding-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/indian-wedding-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/destination-wedding-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/backyard-wedding-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/intimate-small-wedding-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/bridal-emergency-kit-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-day-of-timeline-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-guest-list-organizer', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-vendor-booking-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-reception-planning-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/wedding-decor-flowers-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/checklists/printable-wedding-planning-checklist', changefreq: 'weekly', priority: '0.8', lastmod },

  // BLOG ARTICLES & TIMELINE GUIDES
  { path: '/blog/18-month-wedding-planning-timeline', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/blog/14-month-wedding-planning-timeline', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/blog/how-to-plan-a-wedding-timeline', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding', changefreq: 'weekly', priority: '0.9', lastmod },
  { path: '/blog/20-tips-for-your-wedding-planning-checklist', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/how-to-choose-wedding-venue', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/wedding-budget-tips', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/perfect-guest-list-guide', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/wedding-outfits', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/pakistani-wedding-outfits', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/hairstyles-for-wedding', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/pakistani-wedding-hairstyles', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/indian-wedding-hairstyles-guide', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/regional-indian-wedding-hairstyles', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/how-to-make-wedding-moodboard', changefreq: 'weekly', priority: '0.8', lastmod },
  { path: '/blog/4-month-wedding-planning-timeline', changefreq: 'weekly', priority: '0.8', lastmod }
];

function buildAlternatesXml(path: string): string {
  const enUrl = `${siteUrl}${path || '/'}`;
  const lines: string[] = [];

  // Default English
  lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`);

  // Localized languages
  for (const lang of NON_DEFAULT_LANGUAGES) {
    const locUrl = `${siteUrl}/${lang}${path}`;
    lines.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${locUrl}"/>`);
  }

  // x-default
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`);

  return lines.join('\n');
}

export const GET: APIRoute = async () => {
  const urlNodes: string[] = [];

  // 1. Generate English entries
  for (const entry of entries) {
    const loc = `${siteUrl}${entry.path || '/'}`;
    const alternates = buildAlternatesXml(entry.path);
    urlNodes.push(`  <url>
    <loc>${loc}</loc>
${alternates}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`);
  }

  // 2. Generate Localized entries for non-default languages
  for (const lang of NON_DEFAULT_LANGUAGES) {
    for (const entry of entries) {
      const loc = `${siteUrl}/${lang}${entry.path}`;
      const alternates = buildAlternatesXml(entry.path);
      urlNodes.push(`  <url>
    <loc>${loc}</loc>
${alternates}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${(parseFloat(entry.priority) * 0.9).toFixed(1)}</priority>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlNodes.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
};
