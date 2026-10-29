/**
 * ESLint 8 config for the versions already in devDependencies
 * (@typescript-eslint 5, eslint-plugin-react-hooks 4, eslint-plugin-react-refresh 0.3).
 *
 * ESLint 9 would want a flat `eslint.config.js` instead; this stays on the
 * .eslintrc format to match the installed major version.
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  ignorePatterns: ['dist', 'node_modules', '.ssr-build', 'coverage', '*.cjs'],
  rules: {
    // The installed react-refresh plugin is 0.3.x, which has no options
    // (allowConstantExport arrived in 0.4), so this is the bare rule.
    'react-refresh/only-export-components': 'warn',
    // tsc already enforces these with noUnusedLocals/noUnusedParameters, and its
    // version understands the TS syntax better than the ESLint rule does.
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      // Node-side build tooling and tests run outside the browser.
      files: ['scripts/**/*.mts', 'tests/**/*.ts', 'tests/**/*.tsx', 'vite.config.ts', 'vitest.config.ts'],
      env: { browser: true, node: true, es2020: true },
    },
    {
      // Tests assert on indexed access and query results where `!` is the clearest
      // way to say "this exists"; src/ keeps the rule on.
      files: ['tests/**/*.ts', 'tests/**/*.tsx'],
      rules: { '@typescript-eslint/no-non-null-assertion': 'off' },
    },
    {
      // Vitest globals (describe/it/expect) are injected by `globals: true`.
      files: ['tests/**/*.ts', 'tests/**/*.tsx'],
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
  ],
};
