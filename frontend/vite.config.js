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
        target: 'http://localhost:6969',
        changeOrigin: true
      },
      '/api/analyze-image': {
        target: 'http://localhost:6969',
        changeOrigin: true
      }
    }
  }
})