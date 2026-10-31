import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // home page plus the legal pages, each built to <dir>/index.html
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        terms: resolve(import.meta.dirname, 'terms/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        conduct: resolve(import.meta.dirname, 'code-of-conduct/index.html'),
      },
    },
  },
})
