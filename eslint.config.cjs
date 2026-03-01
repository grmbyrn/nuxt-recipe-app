// Minimal flat config for ESLint v9 that closely matches the project's legacy .eslintrc.cjs
// This avoids requiring additional compatibility packages. It intentionally does not
// re-implement `extends` sets (eslint:recommended, plugin:vue/vue3-recommended, etc.),
// but it provides the parser, parserOptions, plugins and the project's custom rules.
module.exports = [
  {
    ignores: ['node_modules/**', '.nuxt/**', '.output/**', 'dist/**', 'build/**'],
    languageOptions: {
      parser: require('vue-eslint-parser'),
      parserOptions: {
        parser: require('@typescript-eslint/parser'),
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: require('eslint-plugin-vue'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
];
