import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  site: 'https://www.weddingplanningchecklists.org',
  integrations: [
    mdx(),
    react(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        cookie: require.resolve('cookie')
      }
    }
  },
  output: 'static'
});
