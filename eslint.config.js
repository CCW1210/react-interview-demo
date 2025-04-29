module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: { browser: true, es2021: true, node: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
    'import/extensions': ['error', 'never'],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'function-declaration' }
    ],
    'no-console': 'warn'
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': { node: { extensions: ['.js','.jsx','.ts','.tsx'] } }
  }
};
