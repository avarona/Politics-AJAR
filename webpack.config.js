'use strict';

const path = require('path');
process.traceDeprecation = true;

module.exports = {
  mode: 'development',
  entry: './app/origin.jsx',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        }
      }, {
        test: /\.(css|scss|sass)$/,
        exclude: path.join(__dirname, 'node_modules/react-toolbox'),
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(css|scss|sass)$/,
        include: path.join(__dirname, 'node_modules/react-toolbox'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          'sass-loader'
        ]
      }
    ]
  }
};
