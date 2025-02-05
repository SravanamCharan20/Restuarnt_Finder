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
        secure: false
      },
      '/api/analyze-image': {
        target: process.env.VITE_API_URL || 'http://localhost:6969',
        changeOrigin: true,
        secure: false
      },
      '/restaurant': {
        target: process.env.VITE_API_URL || 'http://localhost:6969',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})