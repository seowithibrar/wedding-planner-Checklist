import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      { source: '/how-to-plan-a-wedding-timeline.html', destination: '/blog/how-to-plan-a-wedding-timeline', permanent: true },
      { source: '/how-to-plan-a-wedding-timeline', destination: '/blog/how-to-plan-a-wedding-timeline', permanent: true },
      { source: '/how-to-plan-wedding-timeline.html', destination: '/blog/how-to-plan-a-wedding-timeline', permanent: true },
      { source: '/how-to-plan-wedding-timeline', destination: '/blog/how-to-plan-a-wedding-timeline', permanent: true },
      { source: '/blog/how-to-plan-wedding-timeline', destination: '/blog/how-to-plan-a-wedding-timeline', permanent: true },
      { source: '/blog/how-to-plan-wedding-timeline.html', destination: '/blog/how-to-plan-a-wedding-timeline', permanent: true },
      { source: '/blog/how-to-plan-a-wedding-timeline.html', destination: '/blog/how-to-plan-a-wedding-timeline', permanent: true },
      { source: '/blog/how-to-make-wedding-moodboard', destination: '/blog/moodboard-layout', permanent: true },
      { source: '/how-to-make-wedding-moodboard', destination: '/blog/moodboard-layout', permanent: true },
      { source: '/how-to-make-wedding-moodboard.html', destination: '/blog/moodboard-layout', permanent: true },
      { source: '/blog/how-to-make-wedding-moodboard.html', destination: '/blog/moodboard-layout', permanent: true },
      { source: '/18-month-wedding-planning-timeline.html', destination: '/blog/18-month-wedding-planning-timeline', permanent: true },
      { source: '/14-month-wedding-timeline.html', destination: '/blog/14-month-wedding-planning-timeline', permanent: true },
      { source: '/4-month-wedding-planning-timeline.html', destination: '/blog/4-month-wedding-planning-timeline', permanent: true },
      { source: '/wedding-outfits.html', destination: '/blog/wedding-outfits', permanent: true },
      { source: '/pakistani-wedding-outfits.html', destination: '/blog/pakistani-wedding-outfits', permanent: true },
      { source: '/hairstyles-for-wedding.html', destination: '/blog/hairstyles-for-wedding', permanent: true },
      { source: '/20-tips-for-your-wedding-planning-checklist.html', destination: '/blog/20-tips-for-your-wedding-planning-checklist', permanent: true },
      { source: '/wedding-planning-checklists.html', destination: '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding', permanent: true },
      { source: '/pakistani-wedding-hairstyles.html', destination: '/blog/pakistani-wedding-hairstyles', permanent: true },
      { source: '/indian-wedding-hairstyles-guide.html', destination: '/blog/indian-wedding-hairstyles-guide', permanent: true },
      { source: '/regional-indian-wedding-hairstyles.html', destination: '/blog/regional-indian-wedding-hairstyles', permanent: true },
      { source: '/wedding-budget-tips.html', destination: '/blog/wedding-budget-tips', permanent: true },
      { source: '/perfect-guest-list-guide.html', destination: '/blog/perfect-guest-list-guide', permanent: true },
      { source: '/how-to-choose-wedding-venue.html', destination: '/blog/how-to-choose-wedding-venue', permanent: true },
      { source: '/tools/wedding-budget-planner', destination: '/tools/budget-calculator', permanent: true },
      { source: '/tools/wedding-seating-chart-maker', destination: '/tools/guest-list-manager', permanent: true },
      { source: '/tools/wedding-invitation-timeline', destination: '/tools/wedding-planning-timeline', permanent: true },
      { source: '/tools/wedding-photography-shot-list', destination: '/checklists/wedding-day-of-timeline-checklist', permanent: true },
      { source: '/tools/rehearsal-dinner-planning-guide', destination: '/checklists/wedding-day-of-timeline-checklist', permanent: true },
      { source: '/tools/wedding-task-generator', destination: '/tools/wedding-checklist-generator', permanent: true },
      { source: '/tools/wedding-milestone-tracker', destination: '/tools/wedding-planning-dashboard', permanent: true },
      { source: '/tools/wedding-progress-tracker', destination: '/tools/wedding-planning-dashboard', permanent: true },
      { source: '/tools/daily-wedding-planner', destination: '/tools/wedding-planning-calendar', permanent: true },
      { source: '/tools/weekly-wedding-planner', destination: '/tools/wedding-planning-calendar', permanent: true },
      { source: '/tools/monthly-wedding-planner', destination: '/tools/wedding-planning-calendar', permanent: true },
      { source: '/tools/checklist-generator', destination: '/tools/wedding-checklist-generator', permanent: true },
      { source: '/tools/planning-timeline', destination: '/tools/wedding-planning-timeline', permanent: true },
      { source: '/tools/planning-calendar', destination: '/tools/wedding-planning-calendar', permanent: true },
      { source: '/tools/planning-dashboard', destination: '/tools/wedding-planning-dashboard', permanent: true },
      { source: '/:lang(ur|hi|es|fr|de|ar)/tools/checklist-generator', destination: '/:lang/tools/wedding-checklist-generator', permanent: true },
      { source: '/:lang(ur|hi|es|fr|de|ar)/tools/planning-timeline', destination: '/:lang/tools/wedding-planning-timeline', permanent: true },
      { source: '/:lang(ur|hi|es|fr|de|ar)/tools/planning-calendar', destination: '/:lang/tools/wedding-planning-calendar', permanent: true },
      { source: '/:lang(ur|hi|es|fr|de|ar)/tools/planning-dashboard', destination: '/:lang/tools/wedding-planning-dashboard', permanent: true },
      { source: '/sitemap-index.xml', destination: '/sitemap.xml', permanent: true }
    ];
  }
};

export default nextConfig;
