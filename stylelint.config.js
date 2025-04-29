module.exports = {
  extends: ['@shopify/stylelint-polaris', 'stylelint-config-recommended-scss'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'max-nesting-depth': 3,
    'order/order': [
      'custom-properties',
      'declarations',
      { type: 'at-rule', name: 'include' }
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  },
  ignoreFiles: ['node_modules/**', 'dist/**']
};
