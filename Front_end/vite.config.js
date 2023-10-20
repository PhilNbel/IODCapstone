import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:80,
    proxy: {
      '/api': 'http://localhost:3000/',
      '/img': 'http://localhost:3000/'
    }
  }
})