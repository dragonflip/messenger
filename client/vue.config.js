const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  productionSourceMap: false,
  // css: {
  //   extract: false,
  // },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
};
