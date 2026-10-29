// Adds jest-dom matchers to Vitest's expect via setupFiles.
import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Testing Library registers cleanup itself only when a global afterEach exists,
// and this project does not enable Vitest globals.
afterEach(cleanup)
