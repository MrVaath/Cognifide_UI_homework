// Webpack uses this to work with directories
const path = require('path');

// Simplifies creation of HTML files to serve your webpack bundles
const HTMLWebpackPlugin = require('html-webpack-plugin');

// This plugin extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // fallback to style-loader in development
          process.env.npm_lifecycle_event !== 'build-prod'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.bundle.css',
    }),
  ],
};
