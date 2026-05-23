import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vitest config for component-level smoke tests.
 *
 * Scope: stateful React components in `src/components/` (filters, toggles,
 * charts) where regressions are silent. We deliberately don't try to test
 * MDX content rendering — that's covered by `npm run lint` + the Playwright
 * sitemap sweep.
 *
 * Tests live next to components as `*.test.tsx` and import directly from
 * the source file. The `@site/...` alias mirrors Docusaurus's so component
 * code doesn't need conditional imports.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
  resolve: {
    alias: {
      '@site': path.resolve(__dirname, '.'),
      '@docusaurus/Link': path.resolve(__dirname, 'src/test/stubs/Link.tsx'),
      '@docusaurus/useDocusaurusContext': path.resolve(__dirname, 'src/test/stubs/useDocusaurusContext.ts'),
    },
  },
});
