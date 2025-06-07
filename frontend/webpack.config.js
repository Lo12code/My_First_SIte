const path = require("path");
const webpack = require("webpack");
require('dotenv').config();

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    clean: true,
  },
  mode: process.env.NODE_ENV || "development", 
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
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],  // Ensure Webpack resolves .jsx files
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
    }),
  ],
};
