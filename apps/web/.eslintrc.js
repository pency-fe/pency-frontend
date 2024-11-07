/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@pency/eslint-config/next.js", "plugin:@tanstack/query/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
