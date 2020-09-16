const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: isProd ? "./" : "/",
  transpileDependencies: [
    "indent-string",
    "vue-ele-form-dynamic",
    "vue-ele-form/lib",
    "vuedraggable"
  ],
  configureWebpack: {
    devtool: "source-map",
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
