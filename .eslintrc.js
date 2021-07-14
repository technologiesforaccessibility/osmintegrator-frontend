module.exports = {
  root: true,
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: {
    // enable additional rules
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],

    // override configuration set by extending "eslint:recommended"
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],

  },
};
