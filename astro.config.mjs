import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  site: 'https://www.weddingplanningchecklists.org',
  adapter: vercel(),
  output: 'static',
  redirects: {
    '/how-to-plan-a-wedding-timeline.html': '/blog/how-to-plan-a-wedding-timeline',
    '/how-to-plan-a-wedding-timeline': '/blog/how-to-plan-a-wedding-timeline',
    '/how-to-plan-wedding-timeline.html': '/blog/how-to-plan-a-wedding-timeline',
    '/how-to-plan-wedding-timeline': '/blog/how-to-plan-a-wedding-timeline',
    '/blog/how-to-plan-wedding-timeline': '/blog/how-to-plan-a-wedding-timeline',
    '/blog/how-to-plan-wedding-timeline.html': '/blog/how-to-plan-a-wedding-timeline',
    '/blog/how-to-plan-a-wedding-timeline.html': '/blog/how-to-plan-a-wedding-timeline',
    '/blog/how-to-make-wedding-moodboard': '/blog/moodboard-layout',
    '/how-to-make-wedding-moodboard': '/blog/moodboard-layout',
    '/how-to-make-wedding-moodboard.html': '/blog/moodboard-layout',
    '/blog/how-to-make-wedding-moodboard.html': '/blog/moodboard-layout',
    '/18-month-wedding-planning-timeline.html': '/blog/18-month-wedding-planning-timeline',
    '/14-month-wedding-timeline.html': '/blog/14-month-wedding-planning-timeline',
    '/4-month-wedding-planning-timeline.html': '/blog/4-month-wedding-planning-timeline',
    '/wedding-outfits.html': '/blog/wedding-outfits',
    '/pakistani-wedding-outfits.html': '/blog/pakistani-wedding-outfits',
    '/hairstyles-for-wedding.html': '/blog/hairstyles-for-wedding',
    '/20-tips-for-your-wedding-planning-checklist.html': '/blog/20-tips-for-your-wedding-planning-checklist',
    '/wedding-planning-checklists.html': '/blog/the-ultimate-wedding-planning-checklists-guide-for-a-stress-free-wedding',
    '/pakistani-wedding-hairstyles.html': '/blog/pakistani-wedding-hairstyles',
    '/indian-wedding-hairstyles-guide.html': '/blog/indian-wedding-hairstyles-guide',
    '/regional-indian-wedding-hairstyles.html': '/blog/regional-indian-wedding-hairstyles',
    '/wedding-budget-tips.html': '/blog/wedding-budget-tips',
    '/perfect-guest-list-guide.html': '/blog/perfect-guest-list-guide',
    '/how-to-choose-wedding-venue.html': '/blog/how-to-choose-wedding-venue',
    '/tools/wedding-budget-planner': '/tools/budget-calculator',
    '/tools/wedding-seating-chart-maker': '/tools/guest-list-manager',
    '/tools/wedding-invitation-timeline': '/tools/wedding-planning-timeline',
    '/tools/wedding-photography-shot-list': '/checklists/wedding-day-of-timeline-checklist',
    '/tools/rehearsal-dinner-planning-guide': '/checklists/wedding-day-of-timeline-checklist'
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  integrations: [
    mdx(),
    react()
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        cookie: require.resolve('cookie')
      }
    },
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
          }
        }
      }
    }
  }
});
