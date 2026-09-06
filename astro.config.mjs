import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  site: 'https://www.weddingplanningchecklists.org',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  output: 'static',
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
