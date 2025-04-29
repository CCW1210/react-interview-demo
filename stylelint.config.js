// stylelint.config.js
module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-scss"],
  rules: {
    // 允許空註解
    "scss/comment-no-empty": null,

    // SCSS 全域函式白名單（不要攔截 lighten/darken）
    "function-no-unknown": [true, { ignoreFunctions: ["lighten", "darken"] }],

    // 不要再對屬性值做未知函式檢查
    "declaration-property-value-no-unknown": null,

    // 關閉強制使用 color.adjust 的提示
    "scss/no-global-function-names": null,

    // 允許 partial 檔案下面劃線開頭
    "scss/load-no-partial-leading-underscore": null,

    // 關閉選擇器特異性倒序警告
    "no-descending-specificity": null,
  },
};
