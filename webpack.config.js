'use strict';
const path = require('path');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './src'),
  entry: {
    javascript: './index.jsx',
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
