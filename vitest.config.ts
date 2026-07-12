import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'

// Separate test config avoids prod build guards; mirrors `@` alias.
// Vitest handles the automatic JSX runtime without the React plugin.
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
