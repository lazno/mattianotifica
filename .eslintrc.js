module.exports = {
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es2022": true,
    "node": true,
    "browser": true
  },
  "plugins": ["react"],
  // "extends": [
  //   "eslint:recommended",
  //   "plugin:react/recommended"
  // ],
  // "rules": {
  //   "no-console": "off",
  //   "no-undef": "off"
  // },
  "parser": "@babel/eslint-parser"
};

