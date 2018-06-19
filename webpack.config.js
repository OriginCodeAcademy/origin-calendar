'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './client'),
  entry: {
    javascript: './index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
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
    ],
  },
};
