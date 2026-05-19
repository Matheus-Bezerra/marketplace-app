const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'react/display-name': 'off',

      // Prettier só no "npm run format" — no save ele apaga linha em branco dentro do JSX
      'prettier/prettier': 'off',

      // No save: corrige indentação sem remover linhas em branco
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/jsx-indent-props': ['error', 2],

      // Até 2 linhas em branco seguidas (organização visual)
      'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0, maxBOF: 0 }],
    },
  },
]);
