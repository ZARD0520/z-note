const isProduction = process.env.NODE_ENV === 'production'

const config = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    /* 'no-console': isProduction ? 'warn' : 'off',
    'no-debugger': isProduction ? 'warn' : 'off',
    'no-undef': 'error',
    'no-unused-vars': ['warn', { vars: 'all' }], */
  },
}

module.exports = config
