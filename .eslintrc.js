module.exports = {
  root: true,
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: {
    // enable additional rules
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],

  },
};
