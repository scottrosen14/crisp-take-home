module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'off',
    'prefer-const': 'warn',
    'no-var': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'react/jsx-max-props-per-line': ['error', { 'maximum': 3, 'when': 'multiline' }]
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
}; 