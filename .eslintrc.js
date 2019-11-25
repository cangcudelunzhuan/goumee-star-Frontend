/*
 * @Description: file content
 * @Author: 白青
 * @Date: 2019-11-25 10:40:10
 * @LastEditTime: 2019-11-25 13:05:44
 * @LastEditors: 白青
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-before-function-paren": "off",
    singlequote: "off",
    quotes: "off",
    camelcase: "off"
    // semi: ["error", "always"]
  },
  globals: {
    Vue: false,
    echarts: false,
    ElementUI: false
  }
};
