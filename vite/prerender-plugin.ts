import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { Plugin } from 'vite'

/*
 * Writes the rendered page into dist/index.html after the browser build, so
 * crawlers that do not run JavaScript get more than an empty root div. Still
 * a static file.
 *
 * Stays string only: React types here would pull DOM into the Node program
 * and cost site.ts its no-DOM guard. The render is src/entry-server.tsx.
 */
const ROOT_DIV = '<div id="root"></div>'

export function prerenderPlugin(): Plugin {
  let root = process.cwd()
  let outFile = ''

  return {
    name: 'prerender',
    apply: 'build',
    enforce: 'post',

    configResolved(config) {
      root = config.root
      outFile = path.resolve(config.root, config.build.outDir, 'index.html')
    },

    async closeBundle() {
      // Not at module scope: keeps Vite's server half out of config load.
      const { createServer } = await import('vite')

      // configFile: false, or this recurses into the config running it.
      const server = await createServer({
        root,
        configFile: false,
        logLevel: 'warn',
        appType: 'custom',
        server: { middlewareMode: true, hmr: false },
        resolve: { alias: { '@': path.resolve(root, 'src') } },
      })

      try {
        const { renderApp } = (await server.ssrLoadModule('/src/entry-server.tsx')) as {
          renderApp: () => string
        }
        const markup = renderApp()

        const html = await readFile(outFile, 'utf8')
        if (!html.includes(ROOT_DIV)) {
          throw new Error(`prerender: no ${ROOT_DIV} to fill in ${outFile}`)
        }

        await writeFile(outFile, html.replace(ROOT_DIV, `<div id="root">${markup}</div>`))
      } finally {
        await server.close()
      }
    },
  }
}
