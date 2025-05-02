// <project-root>/.eslintrc.cjs
module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },

  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },

  extends: [
    "airbnb",
    "airbnb/hooks",
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
    "dot-notation": ["error"],
    "@typescript-eslint/dot-notation": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx", ".jsx"] }],
    "import/extensions": "off",
    "no-console": "warn",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/order": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-unused-vars": "off",
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] },
    ],
  },

  overrides: [
    {
      // 設定檔範圍
      files: ["vite.config.ts", "*.config.{js,ts}"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      // 所有 test 檔、setupTests.ts、test‐utils 皆可使用 devDependencies，
      // 且關閉空函式、無用 constructor、class-methods-use-this 規則
      files: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "src/setupTests.ts",
        "src/test-utils/**/*.{ts,tsx}",
      ],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-empty-function": "off",
        "class-methods-use-this": "off",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "func-names": "off",
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
