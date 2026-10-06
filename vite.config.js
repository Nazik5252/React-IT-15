import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Запросы /api проксируются на Spring Boot бэкенд (equipment-rental), чтобы не настраивать CORS.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
