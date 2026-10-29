import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: false,
    restoreMocks: true,
    testTimeout: 20_000,
    hookTimeout: 30_000,
    // jsdom + React in every worker is memory-hungry; uncapped parallelism on an
    // 11-core machine starves workers and turns slow tests into flaky failures.
    // (Vitest 5 removed `poolOptions`; these are the top-level replacements.)
    maxWorkers: 4,
    minWorkers: 1,
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/main.tsx'],
    },
  },
});
