import { renderToString } from 'react-dom/server'

import App from '@/App'

/*
 * Build-time entry, loaded by vite/prerender-plugin.ts. No client import, so
 * it never reaches a bundle.
 *
 * renderToString leaves the lazy stack band as its fallback, which is wanted:
 * rendering it costs 22 kB gzip to repeat the skills the JSON-LD already has.
 */
export function renderApp(): string {
  return renderToString(<App />)
}
