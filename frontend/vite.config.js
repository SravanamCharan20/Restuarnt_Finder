import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/restaurants-by-cuisine': {
        // eslint-disable-next-line no-undef
        target: process.env.VITE_API_URL || 'http://localhost:6969',
        changeOrigin: true
      },
      '/api/analyze-image': {
        // eslint-disable-next-line no-undef
        target: process.env.VITE_API_URL || 'http://localhost:6969',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})