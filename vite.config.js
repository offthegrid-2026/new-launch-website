import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// runs the api/ form functions under `npm run dev`, so the forms work without `vercel dev`.
// Vercel serves /api/* itself in production; this only touches the dev server.
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      // server-only values from .env (no VITE_ prefix), as Vercel would provide them
      Object.assign(process.env, loadEnv(server.config.mode, server.config.root, ''))

      for (const name of ['contact', 'register']) mount(server, name)
    },
  }
}

function mount(server, name) {
  server.middlewares.use(`/api/${name}`, async (req, res) => {
    const handler = (await server.ssrLoadModule(`/api/${name}.js`))[req.method]
    if (!handler) {
      res.statusCode = 405
      return res.end()
    }
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)

    const response = await handler(
      new Request(`http://${req.headers.host}/api/${name}`, {
        method: req.method,
        headers: req.headers,
        body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
      }),
    )
    res.statusCode = response.status
    res.setHeader('Content-Type', 'application/json')
    res.end(await response.text())
  })
}

// Vite writes every imported image to dist even when the code that used it was dropped
// (e.g. the whole site during maintenance, see src/main.jsx). Leave out the ones nothing links to.
function dropUnusedAssets() {
  return {
    name: 'drop-unused-assets',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const files = Object.values(bundle)
      const sources = files.map((f) => (f.type === 'chunk' ? f.code : String(f.source)))
      for (const f of files) {
        if (f.type !== 'asset' || /\.(html|css)$/.test(f.fileName)) continue
        const name = f.fileName.split('/').pop()
        if (!sources.some((src) => src.includes(name))) delete bundle[f.fileName]
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApi(), dropUnusedAssets()],
  build: {
    rollupOptions: {
      // home page, the legal pages and the pass application, each built to <dir>/index.html
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        terms: resolve(import.meta.dirname, 'terms/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        conduct: resolve(import.meta.dirname, 'code-of-conduct/index.html'),
        register: resolve(import.meta.dirname, 'register/index.html'),
      },
    },
  },
})
