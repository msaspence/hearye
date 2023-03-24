const OFF = 0
const ERROR = 2

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:lodash/recommended',
    'plugin:vitest/recommended',
    'plugin:import/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint', 'lodash', 'vitest', 'import'
  ],
  rules: {
    'no-console': ERROR,
    'import/extensions': OFF,
    curly: [ERROR, 'multi-line'],
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': ERROR,
    'lodash/prefer-lodash-method': OFF,
    'lodash/prefer-lodash-typecheck': OFF,
    'lodash/prefer-is-nil': OFF,
    'lodash/prefer-constant': OFF,
    'lodash/prefer-noop': OFF,
    'lodash/prefer-includes': OFF,
    'lodash/prefer-matches': OFF,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        project: ['tsconfig.json'],
      },
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
  ignorePatterns: ['dist'],
}
