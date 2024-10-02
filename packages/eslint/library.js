import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginOnlyWarn from 'eslint-plugin-only-warn';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default ts.config(
  {
    ignores: ['.*.js', 'node_modules/', 'dist/', '*.config.ts', '*.config.js'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      ['only-warn']: eslintPluginOnlyWarn,
    },
  },
  js.configs.recommended,
  ...compat.extends('turbo'),
  ...ts.config({
    files: ['**/*.js?(x)', '**/*.ts?(x)'],
    extends: [...ts.configs.recommended],
  }),
  eslintPluginPrettierRecommended
);
