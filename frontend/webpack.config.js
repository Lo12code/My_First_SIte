const path = require("path");
const webpack = require("webpack");
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "static/frontend"),
    filename: "[name].js",
    clean: true,
    publicPath: "/", 
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "eval-source-map",
  devServer: {
    proxy: [
      {
        context: ['/api', '/spotify'],
        target: 'http://backend:8000',
        changeOrigin: true,
        logLevel: 'debug',
      }
    ],
    port: 8080, // você pode explicitar a porta se quiser
    hot: true,  // para hot reloading
    historyApiFallback: true, // se usar React Router
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/frontend/index.html', // seu template de HTML de entrada
      filename: 'index.html',       // nome do arquivo de saída
    }),
  ],
};
