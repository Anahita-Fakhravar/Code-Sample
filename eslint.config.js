import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import typescript from '@typescript-eslint/eslint-plugin';

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
    ],
    languageOptions: {
      parser,
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
    },
    plugins: {
      'react-hooks': reactHooks,
      prettier,
      'unused-imports': unusedImports,
      import: importPlugin,
      '@typescript-eslint': typescript,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
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
