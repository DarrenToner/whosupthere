import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/whosupthere/',  // This is the correct base path for GitHub Pages
});
