module.exports = {
  rules: {
    "vue/no-v-model-argument": "off",
    'jsx-a11y/label-has-associated-control': 'off',
    'arrow-body-style': 'off',
    'jsx-a11y/label-has-for': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 150 }],
    'linebreak-style': 0,
  },
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },

};
