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
    'plugin:jest/all',
    'plugin:lodash/recommended',
  ],
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.ts'],
      rules: {
        'jest/require-hook': ERROR,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'lodash',
  ],
  rules: {
    'no-console': ERROR,
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

    'id-length': [
      ERROR,
      {
        exceptions: [
          'a',
          'b',
          '_',
          'i',
          'j',
          'as',
          'id',
          'is',
          'OR',
          'mx',
          'me',
          'ME',
          'by',
          'in',
          'S3',
          'sx',
          'fs',
          'x',
          'y',
          'E',
          'S',
          'G',
          'to',
          'at',
          'on',
          'xs',
          'sm',
          'md',
          'lg',
          'up'
        ],
        min: 3,
      },
    ],
    'jest/no-hooks': OFF,
    'jest/require-hook': OFF,

    
    'lodash/prefer-lodash-method': OFF,
    'lodash/prefer-lodash-typecheck': OFF,
    'lodash/prefer-is-nil': OFF,
    'lodash/prefer-constant': OFF,
    'lodash/prefer-noop': OFF,
    'lodash/prefer-includes': OFF,
    'lodash/prefer-matches': OFF,
  },
  ignorePatterns: ['dist'],
}
