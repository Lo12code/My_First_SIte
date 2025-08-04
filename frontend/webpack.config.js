const path = require("path");
const webpack = require("webpack");
require('dotenv').config();

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "static/frontend"),
    filename: "[name].js",
    clean: true,
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],  // Ensure Webpack resolves .jsx files
  },
};
