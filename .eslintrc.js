const isProd = process.env.NODE_ENV === "production";
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-unused-vars": isProd ? "error" : "warn",
    "vue/no-unused-components": isProd ? "error" : "warn",
    "no-console": isProd ? ["error", { allow: ["warn", "error"] }] : "off",
    "no-debugger": isProd ? "warn" : "off"
  }
};
