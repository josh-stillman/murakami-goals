// @ts-check

import eslint from '@eslint/js';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist', 'bin', 'build', 'node_modules'],
  },
  js.configs.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,

        ...globals.jest,
      },
    },
    plugins: { react, 'react-hooks': reactHooks },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      ...reactHooks.configs.recommended.rules,
    },
  }
);
