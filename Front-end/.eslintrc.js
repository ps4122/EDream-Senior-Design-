module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    semi: ["error", "always"],
    "no-var": ["error"],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    eqeqeq: ["error"],
    "no-multi-spaces": ["error"],
    "no-lone-blocks": ["error"],
    "no-self-compare": ["error"],
    "no-unused-expressions": ["error"],
    "no-useless-call": ["error"],
    // 'camelcase': ['error', {properties: 'never'}],
    "func-call-spacing": ["error"],
    "no-lonely-if": ["error"],
    "array-bracket-spacing": ["error"],
    "react/prop-types": "off",
  },
};
