/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/restaurants-by-cuisine': {
        target: process.env.VITE_API_URL || 'http://localhost:6969',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/restaurants-by-cuisine/, '/restaurants-by-cuisine')
      },
      '/api/analyze-image': {
        target: process.env.VITE_API_URL || 'http://localhost:6969',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/analyze-image/, '/api/analyze-image')
      },
      '/restaurant': {
        target: process.env.VITE_API_URL || 'http://localhost:6969',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/restaurant/, '/restaurant')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})