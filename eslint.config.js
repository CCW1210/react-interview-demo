// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'

// 插件物件
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tsEslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  // 1) 忽略 dist, node_modules
  { ignores: ['dist', 'node_modules'] },

  // 2) 主設定，跑在所有 .js/.jsx/.ts/.tsx
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.browser,
      // 用 typescript-eslint 解析 TS／TSX
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
    },

    // flat‑config 要用物件格式載入 plugin
    plugins: {
      react,                 // eslint-plugin-react
      'react-hooks': reactHooks,
      '@typescript-eslint': tsEslint.plugin,
    },

    // 只 extend 平面格式的 config 物件，不用字串、不用 legacy shareable config
    extends: [
      js.configs.recommended,                    // eslint:recommended
      react.configs.recommended,                 // plugin:react/recommended
      ...tsEslint.configs.recommended,           // plugin:@typescript-eslint/recommended
      prettier,                                  // eslint-config-prettier
    ],

    settings: {
      react: { version: 'detect' },
    },

    rules: {
      // 合併 React Hooks 的建議規則
      ...reactHooks.configs.recommended.rules,

      // 這邊可以再放更多自訂規則
    },
  },
]
