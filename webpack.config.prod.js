'use strict';

const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.config');

// 清除打包路径
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

baseWebpackConfig.plugins.push(
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  })
  /*
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
    }
  })*/
  //new webpack.optimize.OccurenceOrderPlugin()
)

module.exports = baseWebpackConfig
