import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// runs api/contact.js under `npm run dev`, so the form works without `vercel dev`.
// Vercel serves /api/* itself in production; this only touches the dev server.
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      // server-only values from .env (no VITE_ prefix), as Vercel would provide them
      Object.assign(process.env, loadEnv(server.config.mode, server.config.root, ''))

      server.middlewares.use('/api/contact', async (req, res) => {
        const { POST } = await server.ssrLoadModule('/api/contact.js')
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)

        const response = await POST(
          new Request(`http://${req.headers.host}/api/contact`, {
            method: 'POST',
            headers: req.headers,
            body: Buffer.concat(chunks),
          }),
        )
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(await response.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApi()],
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
