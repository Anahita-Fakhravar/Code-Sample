import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintReact from '@eslint-react/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import typescript from '@typescript-eslint/eslint-plugin';
import reactHooksExtra from 'eslint-plugin-react-hooks-extra';

export default defineConfig([
  globalIgnores([
    'dist',
    'build',
    '.husky',
    '.vscode',
    '.env',
    'public',
    'node_modules',
    'src/routeTree.gen.ts',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintReact.configs['recommended-typescript'],
    ],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-hooks-extra': reactHooksExtra,
      prettier,
      'unused-imports': unusedImports,
      import: importPlugin,
      '@typescript-eslint': typescript,
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Hooks Extra
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',

      // React Refresh — warn instead of off, allow constant exports (TanStack Router pattern)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Prettier
      'prettier/prettier': 'error',

      // Unused imports
      'unused-imports/no-unused-imports': 'error',

      // Import order
      'import/order': [
        'error',
        {
          groups: [
            ['builtin'],
            ['external'],
            ['internal'],
            ['sibling', 'parent', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/components',
              group: 'builtin',
              position: 'after',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],

      // Modern React rules (replaces eslint-plugin-react)
      '@eslint-react/jsx-no-useless-fragment': 'warn',
      '@eslint-react/no-nested-component-definitions': 'warn',
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
      '@eslint-react/dom-no-unknown-property': 'error',

      // No console logs in production code
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['*.js', '*.mjs', '*.cjs'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier,
]);
