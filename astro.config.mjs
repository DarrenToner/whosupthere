import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astronauts.darrentoner.com',
  output: 'static',
  build: { format: 'directory' },
  vite: { build: { cssMinify: 'lightningcss' } },
});
