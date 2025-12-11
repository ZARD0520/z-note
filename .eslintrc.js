const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    /* 'no-console': isProduction ? 'warn' : 'off',
    'no-debugger': isProduction ? 'warn' : 'off',
    'no-undef': 'error',
    'no-unused-vars': ['warn', { vars: 'all' }], */
  },
};