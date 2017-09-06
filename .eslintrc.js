// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended'
  ],
  plugins: [
    'react',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      }
    },
  },
  rules:{
    'class-methods-use-this': 0,
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true
    }],
    'function-paren-newline': 'off',
    'import/no-unresolved': 'off', // for jest test
  }
};