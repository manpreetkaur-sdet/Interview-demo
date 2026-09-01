module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: ['report/**', 'node_modules/**'],
  overrides: [
    {
      files: ['tests/**/*.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@playwright/test',
                message:
                  'Import test/expect from setup/auth.fixtures to enforce framework fixtures.',
              },
            ],
          },
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector:
              "CallExpression[callee.property.name='locator'], CallExpression[callee.property.name='getByRole'], CallExpression[callee.property.name='getByText'], CallExpression[callee.property.name='getByTestId']",
            message: 'Direct locator usage in specs is disallowed. Use page object methods.',
          },
        ],
      },
    },
  ],
};
