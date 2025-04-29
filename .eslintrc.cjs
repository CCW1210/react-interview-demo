// <project-root>/.eslintrc.cjs
module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    // **不指定** project，避免所有 type-aware 錯誤
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: [
    "airbnb",
    "airbnb/hooks",
    // 不使用 airbnb-typescript，也不載入任何 type-aware 規則
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],

  plugins: [
    "simple-import-sort",
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
  ],

  rules: {
    // 用核心 ESLint 的 dot-notation，關閉 TS 版版本
    "dot-notation": ["error"],
    "@typescript-eslint/dot-notation": "off",

    // React 17+ 不需顯式 import React
    "react/react-in-jsx-scope": "off",

    // 排版與格式化
    "prettier/prettier": ["error"],

    // JSX 副檔名警告
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx", ".jsx"] }],

    // 關閉 import 副檔名檢查
    "import/extensions": "off",

    // 禁用 console.log
    "no-console": "warn",

    // 自動排序 import
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/order": "off",

    // TS 語法檢查：禁用未使用變數規則，改用 TS 版
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-unused-vars": "off",
  },

  overrides: [
    {
      // 針對設定檔關閉依賴檢查
      files: ["vite.config.ts", "*.config.{js,ts}"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],

  settings: {
    react: { version: "detect" },
    "import/resolver": {
      node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      typescript: {},
    },
  },
};
