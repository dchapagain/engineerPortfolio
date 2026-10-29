import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

import { htmlMetaPlugin } from './vite/html-meta-plugin'
import { prerenderPlugin } from './vite/prerender-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Unset: chat Api falls back to relative /api/query -> static host -> 405.
  // Fail the build instead.
  if (mode === 'prod' && !env.VITE_DOMAIN_URL) {
    throw new Error(
      'VITE_DOMAIN_URL is required for prod builds. Set it in .env locally ' +
        'or as a Cloudflare Pages environment variable (Production and Preview).',
    )
  }

  return {
    plugins: [react(), htmlMetaPlugin(), prerenderPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
