const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  configureWebpack: {
    entry: path.resolve(__dirname, "./example/main.js"),
    resolve: {
      alias: {
        "f-render": path.resolve(__dirname, "./src/")
      }
    },
    plugins: [new LodashModuleReplacementPlugin()]
  },
  css: {
    extract: false
  }
};
