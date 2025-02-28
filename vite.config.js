import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['*/.mp3'], // Allow Vite to handle .mp3 files as static assets
  server: {
    port: 5174,
    hmr: {
      overlay: false, // Disable the error overlay in development
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});