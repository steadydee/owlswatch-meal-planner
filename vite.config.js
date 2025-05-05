import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/build/',
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../public/build',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
