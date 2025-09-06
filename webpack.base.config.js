'use strict';
const path = require('path');
const { webpack, DefinePlugin } = require('webpack');
var env = process.env.WEBPACK_BUILD || 'development';

var { CleanWebpackPlugin } = require('clean-webpack-plugin');
const libraryName = 'bbcode-to-react';

module.exports = function (env) {
  let outputFile;
  const plugins = [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ];

  if (env === 'production') {
    outputFile = libraryName.toLowerCase() + '.min.js';
  } else {
    outputFile = libraryName.toLowerCase() + '.js';
  }

  const config = {
    mode: 'production',
    devtool: 'source-map',
    entry: [__dirname + '/src/index.js'],
    output: {
      path: __dirname + '/dist',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        }
      },
      {
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom'
        }
      }
    ],
    module: {
      rules: [
        {
          test: /\.(json)$/,
          use: 'json-loader'
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader'
        }
      ]
    },
    resolve: {
      alias: {
        'bbcode-to-react': 'src/index'
      },
      extensions: ['', '.js', '.json'],
    },
    plugins: plugins
  };

  return config;
};
